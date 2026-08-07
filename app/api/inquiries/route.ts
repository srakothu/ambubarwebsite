import { NextRequest, NextResponse } from "next/server";
import { deliverInquiry, InquiryDeliveryError, isInquiryDeliveryConfigured } from "@/src/lib/inquiry-delivery";
import { getBusinessToday, parseInquiryValues, validateInquiry } from "@/src/lib/inquiry";

export const runtime = "nodejs";

const MAX_BODY_LENGTH = 16_000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const MAX_RATE_LIMIT_ENTRIES = 5_000;
const SUBMISSION_ID_PATTERN = /^[A-Za-z0-9_-]{16,128}$/;

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const globalRateLimit = globalThis as typeof globalThis & {
  ambuBarInquiryRateLimit?: Map<string, RateLimitEntry>;
};
const rateLimitStore = globalRateLimit.ambuBarInquiryRateLimit ?? new Map<string, RateLimitEntry>();
globalRateLimit.ambuBarInquiryRateLimit = rateLimitStore;

function json(body: Record<string, unknown>, status: number, headers?: HeadersInit) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      ...headers,
    },
  });
}

function getClientKey(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim().slice(0, 64) || "unknown";
}

function applyRateLimit(request: NextRequest) {
  const now = Date.now();
  const clientKey = getClientKey(request);
  const current = rateLimitStore.get(clientKey);

  if (!current && rateLimitStore.size >= MAX_RATE_LIMIT_ENTRIES) {
    for (const [key, entry] of rateLimitStore) {
      if (entry.resetAt <= now) {
        rateLimitStore.delete(key);
      }
    }

    while (rateLimitStore.size >= MAX_RATE_LIMIT_ENTRIES) {
      const oldestKey = rateLimitStore.keys().next().value;

      if (typeof oldestKey !== "string") {
        break;
      }

      rateLimitStore.delete(oldestKey);
    }
  }

  if (!current || current.resetAt <= now) {
    const resetAt = now + RATE_LIMIT_WINDOW_MS;
    rateLimitStore.set(clientKey, { count: 1, resetAt });
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1, resetAt };
  }

  current.count += 1;
  rateLimitStore.set(clientKey, current);

  return {
    allowed: current.count <= RATE_LIMIT_MAX_REQUESTS,
    remaining: Math.max(0, RATE_LIMIT_MAX_REQUESTS - current.count),
    resetAt: current.resetAt,
  };
}

async function readRequestBody(request: NextRequest) {
  const reader = request.body?.getReader();

  if (!reader) {
    return "";
  }

  const decoder = new TextDecoder();
  let totalBytes = 0;
  let body = "";

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      return body + decoder.decode();
    }

    totalBytes += value.byteLength;

    if (totalBytes > MAX_BODY_LENGTH) {
      await reader.cancel().catch(() => undefined);
      return null;
    }

    body += decoder.decode(value, { stream: true });
  }
}

function hasAllowedOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");

  if (!origin) {
    return true;
  }

  try {
    const forwardedHost = request.headers.get("x-forwarded-host");
    const requestHost = forwardedHost || request.headers.get("host");
    return Boolean(requestHost && new URL(origin).host === requestHost);
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  if (!hasAllowedOrigin(request)) {
    return json({ ok: false, message: "This submission could not be accepted." }, 403);
  }

  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return json({ ok: false, message: "Submit the inquiry as JSON." }, 415);
  }

  const declaredBodyLength = Number(request.headers.get("content-length"));

  if (Number.isFinite(declaredBodyLength) && declaredBodyLength > MAX_BODY_LENGTH) {
    return json({ ok: false, message: "The inquiry is too large." }, 413);
  }

  const rateLimit = applyRateLimit(request);
  const rateLimitHeaders = {
    "X-RateLimit-Limit": String(RATE_LIMIT_MAX_REQUESTS),
    "X-RateLimit-Remaining": String(rateLimit.remaining),
    "X-RateLimit-Reset": String(Math.ceil(rateLimit.resetAt / 1_000)),
  };

  if (!rateLimit.allowed) {
    return json(
      { ok: false, message: "Too many inquiries were submitted. Please wait a few minutes and try again." },
      429,
      {
        ...rateLimitHeaders,
        "Retry-After": String(Math.max(1, Math.ceil((rateLimit.resetAt - Date.now()) / 1_000))),
      },
    );
  }

  let rawBody: string;

  try {
    const body = await readRequestBody(request);

    if (body === null) {
      return json({ ok: false, message: "The inquiry is too large." }, 413, rateLimitHeaders);
    }

    rawBody = body;
  } catch {
    return json({ ok: false, message: "The inquiry could not be read." }, 400, rateLimitHeaders);
  }

  let payload: unknown;

  try {
    payload = JSON.parse(rawBody);
  } catch {
    return json({ ok: false, message: "The inquiry contains invalid data." }, 400, rateLimitHeaders);
  }

  if (!payload || typeof payload !== "object") {
    return json({ ok: false, message: "The inquiry contains invalid data." }, 400, rateLimitHeaders);
  }

  const record = payload as Record<string, unknown>;

  if (typeof record.website === "string" && record.website.trim()) {
    return json({ ok: true }, 200, rateLimitHeaders);
  }

  if (typeof record.submissionId !== "string" || !SUBMISSION_ID_PATTERN.test(record.submissionId)) {
    return json({ ok: false, message: "The inquiry is missing a valid submission ID." }, 400, rateLimitHeaders);
  }

  const values = parseInquiryValues(record);

  if (!values) {
    return json({ ok: false, message: "The inquiry contains invalid fields." }, 400, rateLimitHeaders);
  }

  const errors = validateInquiry(values, getBusinessToday());

  if (Object.keys(errors).length > 0) {
    return json({ ok: false, message: "Please review the highlighted fields.", errors }, 422, rateLimitHeaders);
  }

  if (!isInquiryDeliveryConfigured()) {
    return json(
      { ok: false, message: "Online delivery is temporarily unavailable. Please use the email link below." },
      503,
      rateLimitHeaders,
    );
  }

  try {
    await deliverInquiry(values, record.submissionId);
    return json({ ok: true }, 200, rateLimitHeaders);
  } catch (error) {
    if (error instanceof InquiryDeliveryError) {
      console.error("Inquiry delivery failed", { status: error.status, message: error.message });
    } else {
      console.error("Unexpected inquiry delivery failure");
    }

    return json(
      { ok: false, message: "We could not send your inquiry right now. Please use the email link below." },
      502,
      rateLimitHeaders,
    );
  }
}
