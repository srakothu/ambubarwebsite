import Link from "next/link";
import { business } from "@/src/content/site-content";
import { SectionHeading } from "./section-heading";

export function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="brand-section brand-section--tight"
    >
      <div className="brand-card brand-card--soft p-6 sm:p-8 lg:p-10">
        <SectionHeading
          headingId="contact-heading"
          align="center"
          eyebrow="Start a conversation"
          title="Ready for a beverage emergency?"
          description="Tell us about your date, guest count, and whether you want beer and wine, mocktails, coffee service, Dirty Soda options, or a full mobile bar. We serve weddings, private parties, festivals, and corporate events throughout Pennsylvania."
        />
        <div className="mt-6 space-y-3 text-sm leading-7 text-brand-text-muted">
          <p>
            <span className="font-semibold text-brand-charcoal">Service area:</span> Reading, Lancaster, York, Hershey, and surrounding Pennsylvania communities.
          </p>
          <p>
            <span className="font-semibold text-brand-charcoal">Popular questions:</span> Can you serve outdoors? Do you offer mocktails? Is setup included?
          </p>
        </div>
        <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:justify-center">
          <Link href="/contact" className="brand-button w-full sm:w-auto">Plan Your Event</Link>
          <a href={business.emailHref} className="brand-button brand-button--secondary w-full sm:w-auto">{business.email}</a>
          <a href="#home" className="brand-button brand-button--secondary w-full sm:w-auto">
            Back to top
          </a>
        </div>
      </div>
    </section>
  );
}
