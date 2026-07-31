import "server-only";
import { business } from "../content/site-content";
import { buildInquiryEmailContent } from "./inquiry-email";
import type { InquiryValues } from "./inquiry";

const RESEND_API_URL = "https://api.resend.com/emails";
const DELIVERY_TIMEOUT_MS = 10_000;

export class InquiryDeliveryError extends Error {
  constructor(message: string, readonly status?: number) {
    super(message);
    this.name = "InquiryDeliveryError";
  }
}

export function isInquiryDeliveryConfigured() {
  return Boolean(process.env.RESEND_API_KEY?.trim());
}

export async function deliverInquiry(values: InquiryValues, submissionId: string) {
  const apiKey = process.env.RESEND_API_KEY?.trim();

  if (!apiKey) {
    throw new InquiryDeliveryError("Email delivery is not configured.");
  }

  const from = process.env.INQUIRY_FROM_EMAIL?.trim() || "Ambu Bar Website <onboarding@resend.dev>";
  const to = process.env.INQUIRY_TO_EMAIL?.trim() || business.email;
  const content = buildInquiryEmailContent(values);

  let response: Response;

  try {
    response = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `inquiry/${submissionId}`,
        "User-Agent": "AmbuBar-Website/1.6",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: values.email,
        subject: content.subject,
        text: content.text,
        html: content.html,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(DELIVERY_TIMEOUT_MS),
    });
  } catch (error) {
    throw new InquiryDeliveryError(
      error instanceof Error && error.name === "TimeoutError"
        ? "Email delivery timed out."
        : "Email delivery could not be reached.",
    );
  }

  if (!response.ok) {
    const providerMessage = await response.text().catch(() => "");
    console.error("Inquiry email provider rejected a submission", {
      status: response.status,
      providerMessage: providerMessage.slice(0, 500),
    });
    throw new InquiryDeliveryError("Email delivery was rejected.", response.status);
  }

  const result = (await response.json().catch(() => null)) as { id?: unknown } | null;

  if (!result || typeof result.id !== "string") {
    throw new InquiryDeliveryError("Email delivery returned an invalid response.", response.status);
  }

  return result.id;
}
