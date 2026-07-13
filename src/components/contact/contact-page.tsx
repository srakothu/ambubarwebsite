"use client";

import Image from "next/image";
import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { CalendarDays, Mail, MapPin, Phone } from "lucide-react";
import { SiteShell } from "@/src/components/layout";
import { business, socialLinks } from "@/src/content/site-content";
import {
  buildInquiryMailto,
  emptyInquiryValues,
  type InquiryValues,
  validateInquiry,
} from "@/src/lib/inquiry";

type FormStatus = "idle" | "validation-error" | "email-draft-ready";

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

const inputClassName =
  "w-full rounded-md border border-brand-border bg-white px-4 py-3 text-brand-charcoal outline-none transition placeholder:text-brand-text-muted focus:border-brand-blue";

export function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<InquiryValues>(emptyInquiryValues);
  const [errors, setErrors] = useState<Partial<Record<keyof InquiryValues, string>>>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [minimumEventDate] = useState(getToday);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const fieldName = event.target.name as keyof InquiryValues;
    const { value } = event.target;

    setValues((current) => ({ ...current, [fieldName]: value }));
    setStatus("idle");

    if (errors[fieldName]) {
      setErrors((current) => ({ ...current, [fieldName]: undefined }));
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
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

    setStatus("email-draft-ready");
    window.location.assign(buildInquiryMailto(values, business.email));
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

            <form ref={formRef} onSubmit={handleSubmit} className="brand-card p-8 sm:p-10" noValidate>
              <div className="grid gap-4 md:grid-cols-2">
                <label htmlFor="name" className="space-y-2 text-sm font-medium text-brand-charcoal">
                  <span>Name <span aria-hidden="true">*</span></span>
                  <input
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    autoComplete="name"
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
                <button className="brand-button" type="submit">
                  Open Email Draft
                </button>
                {status === "validation-error" ? (
                  <p className="text-sm font-medium text-red-700" role="alert">
                    Please review the highlighted fields before opening your email draft.
                  </p>
                ) : null}
                {status === "email-draft-ready" ? (
                  <p className="text-sm font-medium text-brand-blue" aria-live="polite">
                    Your email app should open with your event details. If it does not, email us at {business.email}.
                  </p>
                ) : null}
              </div>
            </form>
          </div>

          <aside className="space-y-6" aria-label="Ambu Bar contact details">
            <article className="brand-card overflow-hidden">
              <Image
                src="/images/ambuarTen.jpg"
                alt="Ambu Bar's branded event tent and service counter setup"
                width={1080}
                height={1080}
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="aspect-video w-full object-cover object-center"
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
                    className="brand-button brand-button--secondary"
                  >
                    {item.label}
                  </a>
                ))}
                <a href={business.emailHref} className="brand-button brand-button--secondary">
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
