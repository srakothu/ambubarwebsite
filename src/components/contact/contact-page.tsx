"use client";

import Image from "next/image";
import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { CalendarDays, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { SiteShell } from "@/src/components/layout";
import { business, socialLinks } from "@/src/content/site-content";
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
  "w-full rounded-md border border-brand-text-muted bg-white px-4 py-3 text-brand-charcoal outline-none transition placeholder:text-brand-text-muted focus:border-brand-blue disabled:cursor-wait disabled:bg-brand-surface";

export function ContactPage() {
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

    submissionIdRef.current = "";
    setValues((current) => ({ ...current, [fieldName]: value }));
    setStatus((current) => (current === "submitting" ? current : "idle"));
    setStatusMessage("");

    if (errors[fieldName]) {
      setErrors((current) => ({ ...current, [fieldName]: undefined }));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateInquiry(values, minimumEventDate);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("validation-error");
      const firstInvalidField = Object.keys(nextErrors)[0];

      requestAnimationFrame(() => {
        const invalidControl = formRef.current?.elements.namedItem(firstInvalidField);

        if (invalidControl instanceof HTMLElement) {
          invalidControl.focus();
        }
      });

      return;
    }

    const formData = new FormData(event.currentTarget);
    const website = String(formData.get("website") ?? "");

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
        body: JSON.stringify({ ...values, website, submissionId: submissionIdRef.current }),
        cache: "no-store",
        signal: controller.signal,
      });
      const result = (await response.json().catch(() => ({}))) as InquiryApiResponse;

      if (!response.ok || !result.ok) {
        if (response.status === 422 && result.errors) {
          setErrors(result.errors);
          setStatus("validation-error");
          setStatusMessage(result.message || "Please review the highlighted fields.");
          const firstInvalidField = Object.keys(result.errors)[0];

          requestAnimationFrame(() => {
            const invalidControl = formRef.current?.elements.namedItem(firstInvalidField);

            if (invalidControl instanceof HTMLElement) {
              invalidControl.focus();
            }
          });
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
    <SiteShell>
      <section className="brand-section brand-section--tight">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="space-y-6">
            <div>
              <p className="brand-subtitle">Contact</p>
              <h1 className="brand-heading mt-3 text-4xl font-semibold tracking-tight text-brand-black sm:text-5xl">
                Let&apos;s plan your next beverage emergency.
              </h1>
              <p className="mt-4 text-lg leading-8 text-brand-text-muted">
                Share your date, guest count, and beverage needs and we&apos;ll follow up with availability, pricing, and a setup that fits your event.
              </p>
            </div>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="brand-card relative p-6 sm:p-8 lg:p-10"
              aria-busy={status === "submitting"}
              noValidate
            >
              <div className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input id="website" name="website" tabIndex={-1} autoComplete="off" />
              </div>
              <fieldset disabled={status === "submitting"} className="grid min-w-0 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-brand-charcoal">
                    Name <span aria-hidden="true">*</span>
                  </label>
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
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-brand-charcoal">
                    Email <span aria-hidden="true">*</span>
                  </label>
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
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-brand-charcoal">
                    Phone <span aria-hidden="true">*</span>
                  </label>
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
                </div>

                <div className="space-y-2">
                  <label htmlFor="eventDate" className="block text-sm font-medium text-brand-charcoal">
                    Event date <span aria-hidden="true">*</span>
                  </label>
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
                </div>

                <div className="space-y-2">
                  <label htmlFor="venue" className="block text-sm font-medium text-brand-charcoal">
                    Venue or event area <span aria-hidden="true">*</span>
                  </label>
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
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="guestCount" className="block text-sm font-medium text-brand-charcoal">
                    Estimated guest count <span aria-hidden="true">*</span>
                  </label>
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
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="message" className="block text-sm font-medium text-brand-charcoal">
                    Beverage needs <span aria-hidden="true">*</span>
                  </label>
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
                </div>
              </fieldset>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  className="brand-button w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
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
                  <p className="text-sm font-medium text-brand-blue" role="status">
                    {statusMessage}
                  </p>
                ) : null}
                {status === "success" ? (
                  <p className="text-sm font-medium text-green-800" role="status">
                    {statusMessage}
                  </p>
                ) : null}
                {status === "error" ? (
                  <p className="text-sm font-medium text-red-700" role="alert">
                    {statusMessage}{" "}
                    <a
                      href={buildInquiryMailto(values, business.email)}
                      className="underline underline-offset-4"
                    >
                      Send these details from your email app instead.
                    </a>
                  </p>
                ) : null}
              </div>
            </form>
          </div>

          <aside className="space-y-6" aria-label="Ambu Bar contact details">
            <article className="brand-card overflow-hidden">
              <Image
                src="/images/ambuarTen.jpg"
                alt="Ambu Bar's branded Triage Tent and service counter setup"
                width={1080}
                height={1080}
                sizes="(max-width: 1023px) 100vw, 42vw"
                className="aspect-4/3 w-full bg-white object-contain object-center"
              />
              <div className="p-6 sm:p-8">
                <p className="brand-subtitle">Service area</p>
                <h2 className="mt-3 text-2xl font-semibold text-brand-black">Based in {business.location}</h2>
                <p className="mt-4 text-base leading-7 text-brand-text-muted">
                  We bring the Ambu Bar setup to weddings, private parties, festivals, fundraisers, and corporate events throughout {business.serviceArea}.
                </p>
                <dl className="mt-6 space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-brand-blue" />
                    <div>
                      <dt className="font-semibold text-brand-black">Starting point</dt>
                      <dd className="mt-1 text-brand-text-muted">{business.location}</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-brand-blue" />
                    <div>
                      <dt className="font-semibold text-brand-black">Call or text</dt>
                      <dd className="mt-1">
                        <a href={business.phoneHref} className="text-brand-blue underline underline-offset-4">{business.phone}</a>
                      </dd>
                    </div>
                  </div>
                </dl>
              </div>
            </article>

            <article className="brand-card brand-card--soft p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <CalendarDays aria-hidden="true" size={24} className="mt-1 shrink-0 text-brand-blue" />
                <div>
                  <p className="brand-subtitle">Planning availability</p>
                  <h2 className="mt-3 text-xl font-semibold text-brand-black">Events are booked by appointment.</h2>
                  <p className="mt-3 text-base leading-7 text-brand-text-muted">
                    The earlier you reach out, the more options we can offer for your date, venue, and beverage menu.
                  </p>
                </div>
              </div>
            </article>

            <article className="brand-card p-6 sm:p-8">
              <p className="brand-subtitle">Stay in the loop</p>
              <h2 className="mt-3 text-xl font-semibold text-brand-black">Follow the Thirst Responders.</h2>
              <div className="mt-5 flex flex-wrap gap-3">
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="brand-button brand-button--secondary gap-2 focus-visible:outline-brand-blue"
                    aria-label={`Follow ${business.name} on ${item.label} (opens in a new tab)`}
                  >
                    {item.label}
                    <ExternalLink aria-hidden="true" size={16} />
                  </a>
                ))}
                <a
                  href={business.phoneHref}
                  className="brand-button brand-button--secondary gap-2 focus-visible:outline-brand-blue"
                  aria-label={`Call or text Ambu Bar at ${business.phone}`}
                >
                  <Phone aria-hidden="true" size={16} />
                  Call or text
                </a>
                <a
                  href={business.emailHref}
                  className="brand-button brand-button--secondary gap-2 focus-visible:outline-brand-blue"
                  aria-label={`Email Ambu Bar at ${business.email}`}
                >
                  <Mail aria-hidden="true" size={16} />
                  Email
                </a>
              </div>
            </article>
          </aside>
        </div>
      </section>
    </SiteShell>
  );
}
