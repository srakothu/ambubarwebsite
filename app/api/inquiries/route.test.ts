import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const deliveryState = vi.hoisted(() => ({
  configured: false,
  deliverInquiry: vi.fn(),
}));

vi.mock("server-only", () => ({}));
vi.mock("@/src/lib/inquiry-delivery", () => {
  class InquiryDeliveryError extends Error {
    constructor(message: string, readonly status?: number) {
      super(message);
      this.name = "InquiryDeliveryError";
    }
  }

  return {
    deliverInquiry: deliveryState.deliverInquiry,
    InquiryDeliveryError,
    isInquiryDeliveryConfigured: () => deliveryState.configured,
  };
});

import { POST } from "./route";

const validInquiry = {
  submissionId: "submission-123456789",
  name: "Taylor Guest",
  email: "taylor@example.com",
  phone: "484-555-0123",
  eventDate: "2099-08-14",
  venue: "Reading, Pennsylvania",
  guestCount: "75",
  message: "Beer, wine, and Dirty Soda service.",
};

let requestNumber = 0;

function createRequest(
  body: string,
  {
    contentType = "application/json",
    origin,
    clientKey,
    contentLength,
  }: {
    contentType?: string;
    origin?: string;
    clientKey?: string;
    contentLength?: string;
  } = {},
) {
  requestNumber += 1;
  const headers = new Headers({
    "Content-Type": contentType,
    Host: "ambubar.example",
    "X-Forwarded-For": clientKey ?? `test-client-${requestNumber}`,
  });

  if (origin) {
    headers.set("Origin", origin);
  }

  if (contentLength) {
    headers.set("Content-Length", contentLength);
  }

  return new NextRequest("https://ambubar.example/api/inquiries", {
    method: "POST",
    headers,
    body,
  });
}

async function readJson(response: Response) {
  return response.json() as Promise<Record<string, unknown>>;
}

describe("POST /api/inquiries", () => {
  beforeEach(() => {
    deliveryState.configured = false;
    deliveryState.deliverInquiry.mockReset();
    requestNumber = 0;

    const globalStore = globalThis as typeof globalThis & {
      ambuBarInquiryRateLimit?: Map<string, unknown>;
    };
    globalStore.ambuBarInquiryRateLimit?.clear();
  });

  it("rejects cross-origin, unsupported, and oversized requests", async () => {
    const crossOrigin = await POST(createRequest("{}", { origin: "https://example.com" }));
    expect(crossOrigin.status).toBe(403);

    const wrongMediaType = await POST(createRequest("{}", { contentType: "text/plain" }));
    expect(wrongMediaType.status).toBe(415);

    const declaredOversize = await POST(createRequest("{}", { contentLength: "16001" }));
    expect(declaredOversize.status).toBe(413);

    const streamedOversize = await POST(createRequest(JSON.stringify({ message: "x".repeat(16_100) })));
    expect(streamedOversize.status).toBe(413);
  });

  it("handles malformed payloads, bot traps, and field errors safely", async () => {
    const malformed = await POST(createRequest("{"));
    expect(malformed.status).toBe(400);

    const bot = await POST(createRequest(JSON.stringify({ website: "filled-by-a-bot" })));
    expect(bot.status).toBe(200);
    expect(await readJson(bot)).toEqual({ ok: true });

    const invalid = await POST(
      createRequest(
        JSON.stringify({
          ...validInquiry,
          name: "",
          email: "not-an-email",
          guestCount: "1e2",
        }),
      ),
    );
    const invalidBody = await readJson(invalid);

    expect(invalid.status).toBe(422);
    expect(invalidBody).toMatchObject({
      ok: false,
      errors: {
        name: expect.any(String),
        email: expect.any(String),
        guestCount: expect.any(String),
      },
    });
  });

  it("returns a safe unavailable response without attempting delivery", async () => {
    const response = await POST(createRequest(JSON.stringify(validInquiry)));

    expect(response.status).toBe(503);
    expect(await readJson(response)).toEqual({
      ok: false,
      message: "Online delivery is temporarily unavailable. Please use the email link below.",
    });
    expect(deliveryState.deliverInquiry).not.toHaveBeenCalled();
  });

  it("delivers configured inquiries without exposing the provider ID", async () => {
    deliveryState.configured = true;
    deliveryState.deliverInquiry.mockResolvedValue("provider-message-id");

    const response = await POST(createRequest(JSON.stringify(validInquiry)));

    expect(response.status).toBe(200);
    expect(await readJson(response)).toEqual({ ok: true });
    expect(deliveryState.deliverInquiry).toHaveBeenCalledWith(
      expect.objectContaining({ email: validInquiry.email }),
      validInquiry.submissionId,
    );
  });

  it("limits repeated requests from the same client", async () => {
    const clientKey = "rate-limit-client";

    for (let attempt = 0; attempt < 5; attempt += 1) {
      const response = await POST(
        createRequest(JSON.stringify({ website: "bot" }), { clientKey }),
      );
      expect(response.status).toBe(200);
    }

    const limited = await POST(
      createRequest(JSON.stringify({ website: "bot" }), { clientKey }),
    );
    expect(limited.status).toBe(429);
    expect(limited.headers.get("Retry-After")).toBeTruthy();
    expect(limited.headers.get("X-RateLimit-Remaining")).toBe("0");
  });
});
