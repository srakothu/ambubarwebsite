import Image from "next/image";
import { CalendarDays, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { SiteShell } from "@/src/components/layout";
import { business, socialLinks } from "@/src/content/site-content";
import { InquiryForm } from "./inquiry-form";

export function ContactPage() {
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

            <InquiryForm />
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
                  aria-label={`Call Ambu Bar at ${business.phone}`}
                >
                  <Phone aria-hidden="true" size={16} />
                  Call
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
