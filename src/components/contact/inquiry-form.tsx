"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { business } from "@/src/content/site-content";
import {
  buildInquiryMailto,
  emptyInquiryValues,
  getBusinessToday,
  inquiryFieldLimits,
  type InquiryErrors,
  type InquiryValues,
  validateInquiry,
} from "@/src/lib/inquiry";

type FormStatus = "idle" | "validation-error" | "submitting" | "success" | "error";

interface InquiryApiResponse {
  ok?: boolean;
  message?: string;
  errors?: InquiryErrors;
}

const inputClassName =
  "w-full rounded-md border border-brand-border bg-white px-4 py-3 text-brand-charcoal outline-none transition placeholder:text-brand-text-muted focus:border-brand-blue";

export function InquiryForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const submissionIdRef = useRef("");
  const [values, setValues] = useState<InquiryValues>(emptyInquiryValues);
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [minimumEventDate] = useState(getBusinessToday);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const fieldName = event.target.name as keyof InquiryValues;
    const { value } = event.target;

    setValues((current) => ({ ...current, [fieldName]: value }));
    setStatus((current) => (current === "submitting" ? current : "idle"));
    setStatusMessage("");

    if (errors[fieldName]) {
      setErrors((current) => ({ ...current, [fieldName]: undefined }));
    }
  };

  const focusFirstInvalidField = (nextErrors: InquiryErrors) => {
    const firstInvalidField = Object.keys(nextErrors)[0];

    requestAnimationFrame(() => {
      const invalidControl = formRef.current?.elements.namedItem(firstInvalidField);

      if (invalidControl instanceof HTMLElement) {
        invalidControl.focus();
      }
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateInquiry(values, minimumEventDate);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("validation-error");
      focusFirstInvalidField(nextErrors);
      return;
    }

    const formData = new FormData(event.currentTarget);
    const company = String(formData.get("company") ?? "");

    if (!submissionIdRef.current) {
      submissionIdRef.current =
        typeof crypto.randomUUID === "function"
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;
    }

    setStatus("submitting");
    setStatusMessage("Sending your event inquiry securely…");

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 15_000);

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, company, submissionId: submissionIdRef.current }),
        cache: "no-store",
        signal: controller.signal,
      });
      const result = (await response.json().catch(() => ({}))) as InquiryApiResponse;

      if (!response.ok || !result.ok) {
        if (response.status === 422 && result.errors) {
          setErrors(result.errors);
          setStatus("validation-error");
          setStatusMessage(result.message || "Please review the highlighted fields.");
          focusFirstInvalidField(result.errors);
          return;
        }

        throw new Error(result.message || "We could not send your inquiry right now.");
      }

      setValues(emptyInquiryValues);
      setErrors({});
      setStatus("success");
      setStatusMessage("Your inquiry was sent to Ambu Bar. We’ll follow up using the contact information you provided.");
      submissionIdRef.current = "";
      formRef.current?.reset();
    } catch (error) {
      setStatus("error");
      setStatusMessage(
        error instanceof DOMException && error.name === "AbortError"
          ? "The request took too long. Your details are still here so you can try again or use the email link."
          : error instanceof Error
            ? error.message
            : "We could not send your inquiry right now.",
      );
    } finally {
      window.clearTimeout(timeoutId);
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="brand-card relative p-8 sm:p-10"
      aria-busy={status === "submitting"}
      noValidate
    >
      <div className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label htmlFor="name" className="space-y-2 text-sm font-medium text-brand-charcoal">
          <span>Name <span aria-hidden="true">*</span></span>
          <input
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            autoComplete="name"
            maxLength={inquiryFieldLimits.name}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={inputClassName}
            placeholder="Your name"
            required
          />
          {errors.name ? <p id="name-error" className="text-sm font-normal text-red-700">{errors.name}</p> : null}
        </label>

        <label htmlFor="email" className="space-y-2 text-sm font-medium text-brand-charcoal">
          <span>Email <span aria-hidden="true">*</span></span>
          <input
            id="email"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            autoComplete="email"
            inputMode="email"
            maxLength={inquiryFieldLimits.email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputClassName}
            placeholder="you@example.com"
            required
          />
          {errors.email ? <p id="email-error" className="text-sm font-normal text-red-700">{errors.email}</p> : null}
        </label>

        <label htmlFor="phone" className="space-y-2 text-sm font-medium text-brand-charcoal">
          <span>Phone <span aria-hidden="true">*</span></span>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={values.phone}
            onChange={handleChange}
            autoComplete="tel"
            inputMode="tel"
            maxLength={inquiryFieldLimits.phone}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={inputClassName}
            placeholder="(484) 555-0123"
            required
          />
          {errors.phone ? <p id="phone-error" className="text-sm font-normal text-red-700">{errors.phone}</p> : null}
        </label>

        <label htmlFor="eventDate" className="space-y-2 text-sm font-medium text-brand-charcoal">
          <span>Event date <span aria-hidden="true">*</span></span>
          <input
            id="eventDate"
            type="date"
            name="eventDate"
            value={values.eventDate}
            onChange={handleChange}
            min={minimumEventDate}
            aria-invalid={Boolean(errors.eventDate)}
            aria-describedby={errors.eventDate ? "event-date-error" : undefined}
            className={inputClassName}
            required
          />
          {errors.eventDate ? <p id="event-date-error" className="text-sm font-normal text-red-700">{errors.eventDate}</p> : null}
        </label>

        <label htmlFor="venue" className="space-y-2 text-sm font-medium text-brand-charcoal">
          <span>Venue or event area <span aria-hidden="true">*</span></span>
          <input
            id="venue"
            name="venue"
            value={values.venue}
            onChange={handleChange}
            autoComplete="street-address"
            maxLength={inquiryFieldLimits.venue}
            aria-invalid={Boolean(errors.venue)}
            aria-describedby={errors.venue ? "venue-error" : undefined}
            className={inputClassName}
            placeholder="Venue name, city, or event area"
            required
          />
          {errors.venue ? <p id="venue-error" className="text-sm font-normal text-red-700">{errors.venue}</p> : null}
        </label>

        <label htmlFor="guestCount" className="space-y-2 text-sm font-medium text-brand-charcoal md:col-span-2">
          <span>Estimated guest count <span aria-hidden="true">*</span></span>
          <input
            id="guestCount"
            type="number"
            min="1"
            max={inquiryFieldLimits.guestCount}
            step="1"
            name="guestCount"
            value={values.guestCount}
            onChange={handleChange}
            inputMode="numeric"
            aria-invalid={Boolean(errors.guestCount)}
            aria-describedby={errors.guestCount ? "guest-count-error" : undefined}
            className={inputClassName}
            placeholder="For example, 120"
            required
          />
          {errors.guestCount ? <p id="guest-count-error" className="text-sm font-normal text-red-700">{errors.guestCount}</p> : null}
        </label>

        <label htmlFor="message" className="space-y-2 text-sm font-medium text-brand-charcoal md:col-span-2">
          <span>Beverage needs <span aria-hidden="true">*</span></span>
          <textarea
            id="message"
            name="message"
            rows={5}
            maxLength={inquiryFieldLimits.message}
            value={values.message}
            onChange={handleChange}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={inputClassName}
            placeholder="Tell us about the event, beverage preferences, and anything else that matters."
            required
          />
          {errors.message ? <p id="message-error" className="text-sm font-normal text-red-700">{errors.message}</p> : null}
        </label>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          className="brand-button disabled:cursor-not-allowed disabled:opacity-60"
          type="submit"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Sending Inquiry…" : "Send Event Inquiry"}
        </button>
        {status === "validation-error" ? (
          <p className="text-sm font-medium text-red-700" role="alert">
            {statusMessage || "Please review the highlighted fields before sending your inquiry."}
          </p>
        ) : null}
        {status === "submitting" ? (
          <p className="text-sm font-medium text-brand-blue" aria-live="polite">{statusMessage}</p>
        ) : null}
        {status === "success" ? (
          <p className="text-sm font-medium text-green-800" role="status">{statusMessage}</p>
        ) : null}
        {status === "error" ? (
          <p className="text-sm font-medium text-red-700" role="alert">
            {statusMessage}{" "}
            <a href={buildInquiryMailto(values, business.email)} className="underline underline-offset-4">
              Send these details from your email app instead.
            </a>
          </p>
        ) : null}
      </div>
    </form>
  );
}
