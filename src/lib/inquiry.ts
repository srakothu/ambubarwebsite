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

export const emptyInquiryValues: InquiryValues = {
  name: "",
  email: "",
  phone: "",
  eventDate: "",
  venue: "",
  guestCount: "",
  message: "",
};

export function validateInquiry(values: InquiryValues, today: string): InquiryErrors {
  const errors: InquiryErrors = {};
  const phoneDigits = values.phone.replace(/\D/g, "");
  const guestCount = Number(values.guestCount);

  if (!values.name.trim()) {
    errors.name = "Please enter your name.";
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.phone.trim()) {
    errors.phone = "Please enter a phone number.";
  } else if (phoneDigits.length < 10 || phoneDigits.length > 15) {
    errors.phone = "Enter a valid phone number.";
  }

  if (!values.eventDate) {
    errors.eventDate = "Please choose your event date.";
  } else if (values.eventDate < today) {
    errors.eventDate = "Choose an event date that is today or later.";
  }

  if (!values.venue.trim()) {
    errors.venue = "Please tell us where the event will be held.";
  }

  if (!values.guestCount) {
    errors.guestCount = "Please estimate your guest count.";
  } else if (!Number.isInteger(guestCount) || guestCount < 1) {
    errors.guestCount = "Guest count must be a whole number greater than zero.";
  }

  if (!values.message.trim()) {
    errors.message = "Tell us a little about your beverage needs.";
  }

  return errors;
}

export function buildInquiryMailto(values: InquiryValues, recipient: string) {
  const query = new URLSearchParams({
    subject: `Ambu Bar inquiry from ${values.name.trim()}`,
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