import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

import { deliverInquiry, InquiryDeliveryError, isInquiryDeliveryConfigured } from "./inquiry-delivery";
import type { InquiryValues } from "./inquiry";

const inquiry: InquiryValues = {
  name: "Taylor Guest",
  email: "taylor@example.com",
  phone: "484-555-0123",
  eventDate: "2099-08-14",
  venue: "Reading, Pennsylvania",
  guestCount: "75",
  message: "Beer, wine, and Dirty Soda service.",
};

describe("inquiry delivery", () => {
  beforeEach(() => {
    vi.stubEnv("RESEND_API_KEY", "re_test_key");
    vi.stubEnv("INQUIRY_FROM_EMAIL", "Ambu Bar Website <bookings@ambubar.example>");
    vi.stubEnv("INQUIRY_TO_EMAIL", "AmbuBarLLC@gmail.com");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("sends a replyable, idempotent email to Ambu Bar", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ id: "email_123" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(deliverInquiry(inquiry, "submission-123456789")).resolves.toBe("email_123");
    expect(fetchMock).toHaveBeenCalledOnce();

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    const headers = init.headers as Record<string, string>;
    const body = JSON.parse(String(init.body)) as Record<string, unknown>;

    expect(url).toBe("https://api.resend.com/emails");
    expect(headers.Authorization).toBe("Bearer re_test_key");
    expect(headers["Idempotency-Key"]).toBe("inquiry/submission-123456789");
    expect(body).toMatchObject({
      from: "Ambu Bar Website <bookings@ambubar.example>",
      to: ["AmbuBarLLC@gmail.com"],
      reply_to: "taylor@example.com",
    });
  });

  it("reports provider failures without treating them as success", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response('{"message":"rejected"}', { status: 403 })),
    );

    await expect(deliverInquiry(inquiry, "submission-123456789")).rejects.toBeInstanceOf(InquiryDeliveryError);
  });

  it("requires a server-side API key", () => {
    vi.stubEnv("RESEND_API_KEY", "");
    expect(isInquiryDeliveryConfigured()).toBe(false);
  });
});
