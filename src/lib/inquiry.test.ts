import { describe, expect, it } from "vitest";
import {
  buildInquiryMailto,
  emptyInquiryValues,
  getBusinessToday,
  inquiryFieldLimits,
  parseInquiryValues,
  validateInquiry,
  type InquiryValues,
} from "./inquiry";
import { buildInquiryEmailContent } from "./inquiry-email";

const validInquiry: InquiryValues = {
  name: "Taylor Guest",
  email: "taylor@example.com",
  phone: "(484) 555-0123",
  eventDate: "2099-08-14",
  venue: "Reading, Pennsylvania",
  guestCount: "75",
  message: "Beer, wine, and Dirty Soda service.",
};

describe("inquiry validation", () => {
  it("uses Ambu Bar's Eastern time zone for same-day bookings", () => {
    expect(getBusinessToday(new Date("2026-08-01T02:00:00Z"))).toBe("2026-07-31");
  });

  it("accepts a complete future inquiry", () => {
    expect(validateInquiry(validInquiry, "2099-01-01")).toEqual({});
  });

  it("rejects missing and invalid values", () => {
    const errors = validateInquiry(
      {
        ...emptyInquiryValues,
        email: "not-an-email",
        phone: "123",
        eventDate: "2099-02-31",
        guestCount: "1.5",
      },
      "2099-01-01",
    );

    expect(errors).toMatchObject({
      name: expect.any(String),
      email: expect.any(String),
      phone: expect.any(String),
      eventDate: expect.any(String),
      venue: expect.any(String),
      guestCount: expect.any(String),
      message: expect.any(String),
    });
  });

  it("enforces server-side field limits", () => {
    const errors = validateInquiry(
      { ...validInquiry, message: "x".repeat(inquiryFieldLimits.message + 1) },
      "2099-01-01",
    );

    expect(errors.message).toContain("3,000");
  });

  it("rejects non-decimal guest counts and control characters", () => {
    expect(validateInquiry({ ...validInquiry, guestCount: "1e2" }, "2099-01-01").guestCount).toBeTruthy();
    expect(validateInquiry({ ...validInquiry, guestCount: "0x10" }, "2099-01-01").guestCount).toBeTruthy();
    expect(validateInquiry({ ...validInquiry, phone: "call-me-4845550123" }, "2099-01-01").phone).toBeTruthy();
    expect(validateInquiry({ ...validInquiry, name: "Taylor\nGuest" }, "2099-01-01").name).toBeTruthy();
    expect(validateInquiry({ ...validInquiry, venue: "Reading\r\nPA" }, "2099-01-01").venue).toBeTruthy();
  });

  it("parses only complete string payloads", () => {
    expect(parseInquiryValues(validInquiry)).toEqual(validInquiry);
    expect(parseInquiryValues({ ...validInquiry, guestCount: 75 })).toBeNull();
    expect(parseInquiryValues(null)).toBeNull();
  });
});

describe("inquiry email output", () => {
  it("builds a useful plain-text and HTML message", () => {
    const content = buildInquiryEmailContent({
      ...validInquiry,
      name: "Taylor\r\nBcc: unwanted@example.com",
      message: "Cocktails <and> mocktails & soda",
    });

    expect(content.subject).toBe("New Ambu Bar event inquiry — Taylor Bcc: unwanted@example.com");
    expect(content.text).toContain("Estimated guest count: 75");
    expect(content.html).toContain("Cocktails &lt;and&gt; mocktails &amp; soda");
    expect(content.html).not.toContain("Cocktails <and>");
  });

  it("keeps a prefilled email fallback available", () => {
    const mailto = buildInquiryMailto(validInquiry, "AmbuBarLLC@gmail.com");

    expect(mailto).toMatch(/^mailto:AmbuBarLLC@gmail\.com\?/);
    expect(new URL(mailto).searchParams.get("body")).toContain("Estimated guest count: 75");
  });
});
