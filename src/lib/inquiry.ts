export interface InquiryValues {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  venue: string;
  guestCount: string;
  message: string;
}

export type InquiryErrors = Partial<Record<keyof InquiryValues, string>>;

export const inquiryFieldLimits = {
  name: 100,
  email: 254,
  phone: 30,
  venue: 200,
  guestCount: 100_000,
  message: 3_000,
} as const;

export const emptyInquiryValues: InquiryValues = {
  name: "",
  email: "",
  phone: "",
  eventDate: "",
  venue: "",
  guestCount: "",
  message: "",
};

const inquiryFields = ["name", "email", "phone", "eventDate", "venue", "guestCount", "message"] as const;

export function getBusinessToday(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));

  return `${values.year}-${values.month}-${values.day}`;
}

export function parseInquiryValues(input: unknown): InquiryValues | null {
  if (!input || typeof input !== "object") {
    return null;
  }

  const record = input as Record<string, unknown>;

  if (inquiryFields.some((field) => typeof record[field] !== "string")) {
    return null;
  }

  return {
    name: (record.name as string).trim(),
    email: (record.email as string).trim(),
    phone: (record.phone as string).trim(),
    eventDate: (record.eventDate as string).trim(),
    venue: (record.venue as string).trim(),
    guestCount: (record.guestCount as string).trim(),
    message: (record.message as string).trim(),
  };
}

export function validateInquiry(values: InquiryValues, today: string): InquiryErrors {
  const errors: InquiryErrors = {};
  const phoneDigits = values.phone.replace(/\D/g, "");
  const guestCount = Number(values.guestCount);
  const hasValidDateFormat = /^\d{4}-\d{2}-\d{2}$/.test(values.eventDate);
  const parsedEventDate = hasValidDateFormat ? Date.parse(`${values.eventDate}T00:00:00Z`) : Number.NaN;
  const hasValidCalendarDate =
    !Number.isNaN(parsedEventDate) && new Date(parsedEventDate).toISOString().slice(0, 10) === values.eventDate;

  if (!values.name.trim()) {
    errors.name = "Please enter your name.";
  } else if (values.name.length > inquiryFieldLimits.name) {
    errors.name = `Name must be ${inquiryFieldLimits.name} characters or fewer.`;
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (values.email.length > inquiryFieldLimits.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.phone.trim()) {
    errors.phone = "Please enter a phone number.";
  } else if (
    values.phone.length > inquiryFieldLimits.phone ||
    phoneDigits.length < 10 ||
    phoneDigits.length > 15
  ) {
    errors.phone = "Enter a valid phone number.";
  }

  if (!values.eventDate) {
    errors.eventDate = "Please choose your event date.";
  } else if (!hasValidDateFormat || !hasValidCalendarDate) {
    errors.eventDate = "Enter a valid event date.";
  } else if (values.eventDate < today) {
    errors.eventDate = "Choose an event date that is today or later.";
  }

  if (!values.venue.trim()) {
    errors.venue = "Please tell us where the event will be held.";
  } else if (values.venue.length > inquiryFieldLimits.venue) {
    errors.venue = `Venue must be ${inquiryFieldLimits.venue} characters or fewer.`;
  }

  if (!values.guestCount) {
    errors.guestCount = "Please estimate your guest count.";
  } else if (
    !Number.isInteger(guestCount) ||
    guestCount < 1 ||
    guestCount > inquiryFieldLimits.guestCount
  ) {
    errors.guestCount = `Guest count must be a whole number between 1 and ${inquiryFieldLimits.guestCount.toLocaleString("en-US")}.`;
  }

  if (!values.message.trim()) {
    errors.message = "Tell us a little about your beverage needs.";
  } else if (values.message.length > inquiryFieldLimits.message) {
    errors.message = `Beverage needs must be ${inquiryFieldLimits.message.toLocaleString("en-US")} characters or fewer.`;
  }

  return errors;
}

export function buildInquiryMailto(values: InquiryValues, recipient: string) {
  const query = new URLSearchParams({
    subject: `Ambu Bar inquiry from ${values.name.trim().replace(/[\r\n]+/g, " ")}`,
    body: [
      `Name: ${values.name.trim()}`,
      `Email: ${values.email.trim()}`,
      `Phone: ${values.phone.trim()}`,
      `Event date: ${values.eventDate}`,
      `Venue: ${values.venue.trim()}`,
      `Estimated guest count: ${values.guestCount}`,
      "",
      "Event details:",
      values.message.trim(),
    ].join("\n"),
  });

  return `mailto:${recipient}?${query.toString()}`;
}
