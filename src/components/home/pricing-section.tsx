import Link from "next/link";
import {
  Ambulance,
  CalendarCheck2,
  CircleDollarSign,
  Coffee,
  MapPin,
  ReceiptText,
  ShieldCheck,
  UsersRound,
  Wine,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "./section-heading";

export function PricingSection() {
  const plans = [
    {
      abbreviation: "Package 1",
      name: "Triage",
      summary: "Beer & Wine Service for Intimate Events",
      Icon: Wine,
      guestCount: "12-person minimum and 30-person maximum",
      setup: "Satellite Bar and optional Triage Tent only",
      fees: [
        { label: "First hour", value: "$100" },
        { label: "Each additional hour", value: "$100" },
        { label: "Minimum booking", value: "Two hours" },
        { label: "Supplies", value: "$65" },
        { label: "Bartender", value: "$50 per hour" },
      ],
      service: "Beer and wine service only",
      bartenderRule: "At least one RAMP-certified bartender is required, with one required for every 50 guests",
      addOn: "Dirty Soda & Mocktail add-on: $50",
      gratuity: null,
    },
    {
      abbreviation: "Package 2",
      name: "B.L.S. — Basic Liquor Service",
      summary: "For Events With 50 or More Guests",
      Icon: ShieldCheck,
      guestCount: "50 or more",
      setup: "Satellite Bar, Triage Tent, and AmbuBar ambulance as needed",
      fees: [
        { label: "First hour", value: "$250" },
        { label: "Each additional hour", value: "$125" },
        { label: "Minimum booking", value: "Three hours" },
        { label: "Supplies", value: "$100 per 50 guests" },
        { label: "Bartender", value: "$50 per hour" },
      ],
      service: "Beer and wine service only",
      bartenderRule: "One RAMP-certified bartender is required for every 50 guests",
      addOn: "Dirty Soda & Mocktail upgrade: $50 per 50 guests",
      gratuity: "The client may allow a tip jar. If a tip jar is not allowed, add 10% gratuity.",
    },
    {
      abbreviation: "Package 3",
      name: "A.L.S. — Advanced Liquor Service",
      summary: "For Events With 50 or More Guests",
      Icon: Ambulance,
      guestCount: "50 or more",
      setup: "AmbuBar ambulance, Triage Tent, and Satellite Bar as needed",
      fees: [
        { label: "First hour", value: "$250" },
        { label: "Each additional hour", value: "$125" },
        { label: "Minimum booking", value: "Three hours" },
        { label: "Supplies", value: "$100 per 50 guests" },
        { label: "Bartender", value: "$50 per hour" },
      ],
      service: "Beer and wine service plus a selection of 3–4 signature cocktails",
      bartenderRule: "One RAMP-certified bartender is required for every 50 guests",
      addOn: "Dirty Soda & Mocktail upgrade: $50 per 50 guests",
      gratuity: "The client may allow a tip jar. If a tip jar is not allowed, add 10% gratuity.",
    },
  ] as const;

  const packagePolicies: Array<{
    Icon: LucideIcon;
    label: string;
    detail: string;
  }> = [
    {
      Icon: UsersRound,
      label: "RAMP-certified staffing",
      detail: "Every package requires at least one RAMP-certified bartender for every 50 guests.",
    },
    {
      Icon: CalendarCheck2,
      label: "Setup & cleanup",
      detail: "Every package includes one hour of setup before the event and one hour of cleanup after the event.",
    },
    {
      Icon: Wine,
      label: "Preferred suppliers",
      detail:
        "AmbuBar has preferred suppliers for beer, wine, and spirits. Clients may use another supplier, but a 10% upcharge applies.",
    },
    {
      Icon: MapPin,
      label: "Travel",
      detail:
        "Thirty miles of travel are included. Additional mileage is $2 per mile beyond 30 miles, calculated one way only.",
    },
    {
      Icon: CircleDollarSign,
      label: "Service charge",
      detail: "A 10% service charge applies to the package total.",
    },
  ];

  const bookingPolicies = [
    {
      Icon: CircleDollarSign,
      title: "50% deposit",
      detail: "Required for bookings 30 days in advance.",
    },
    {
      Icon: CalendarCheck2,
      title: "Final balance",
      detail: "Due 10 days before the event.",
    },
  ];

  const cancellationPolicies = [
    {
      threshold: "More than 30 days",
      detail: "Full refund.",
    },
    {
      threshold: "Less than 14 days",
      detail: "50% of the deposit is refunded.",
    },
    {
      threshold: "Less than 7 days",
      detail: "No refund.",
    },
  ];

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="brand-section brand-section--tight"
    >
      <SectionHeading
        headingId="pricing-heading"
        eyebrow="Pricing"
        title="Choose the package that fits your event."
        description="Compare guest counts, setup choices, hourly rates, staffing, and beverage service. Fees are listed separately so you can see exactly what applies."
      />
      <div className="mt-8 grid gap-5 sm:mt-10 sm:gap-6 lg:grid-cols-3 lg:gap-4 xl:gap-6">
        {plans.map((plan) => (
          <article
            key={plan.name}
            className="brand-card flex h-full flex-col p-6 sm:p-8"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-surface text-brand-blue">
                <plan.Icon aria-hidden="true" size={24} strokeWidth={1.8} />
              </div>
              <div>
                <p className="brand-subtitle">{plan.abbreviation}</p>
                <h3 className="mt-2 text-xl font-semibold leading-7 text-brand-black">{plan.name}</h3>
              </div>
            </div>
            <p className="mt-5 text-base font-semibold leading-7 text-brand-charcoal">{plan.summary}</p>

            <dl className="mt-6 grid gap-4 rounded-lg border border-brand-border bg-brand-surface p-5">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-blue">Guest count</dt>
                <dd className="mt-1 text-sm leading-6 text-brand-charcoal">{plan.guestCount}</dd>
              </div>
              <div className="border-t border-brand-border pt-4">
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-blue">Setup options</dt>
                <dd className="mt-1 text-sm leading-6 text-brand-charcoal">{plan.setup}</dd>
              </div>
            </dl>

            <div className="mt-6">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-blue">Rates & supplies</p>
              <dl className="mt-4 divide-y divide-brand-border border-y border-brand-border">
                {plan.fees.map((fee) => (
                  <div key={fee.label} className="flex items-start justify-between gap-4 py-3">
                    <dt className="text-sm leading-6 text-brand-text-muted">{fee.label}</dt>
                    <dd className="text-right text-sm font-semibold leading-6 text-brand-charcoal">{fee.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-6 border-t border-brand-border pt-5">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-blue">Beverage service</p>
              <p className="mt-3 text-sm leading-6 text-brand-text-muted">{plan.service}</p>
            </div>

            <div className="mt-5 border-t border-brand-border pt-5">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-blue">Staffing requirement</p>
              <p className="mt-3 text-sm leading-6 text-brand-text-muted">{plan.bartenderRule}</p>
            </div>

            {plan.gratuity ? (
              <div className="mt-5 rounded-lg border border-brand-gold/70 bg-brand-gold/10 p-4">
                <p className="text-sm font-semibold text-brand-black">Gratuity option</p>
                <p className="mt-1 text-sm leading-6 text-brand-charcoal">{plan.gratuity}</p>
              </div>
            ) : null}

            <div className="mt-5 border-t border-brand-border pt-5">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-blue">Optional upgrade</p>
              <p className="mt-3 flex gap-2 text-sm leading-6 text-brand-text-muted">
                <Coffee aria-hidden="true" size={16} className="mt-1 shrink-0 text-brand-gold" />
                <span>{plan.addOn}</span>
              </p>
            </div>

            <div className="mt-5 border-t border-brand-border pt-5">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-blue">Additional charges</p>
              <dl className="mt-3 space-y-3 text-sm leading-6 text-brand-text-muted">
                <div>
                  <dt className="font-semibold text-brand-charcoal">Service charge</dt>
                  <dd>10% of the package total</dd>
                </div>
                <div>
                  <dt className="font-semibold text-brand-charcoal">Travel</dt>
                  <dd>Thirty miles included; $2 per additional mile beyond 30 miles, calculated one way only</dd>
                </div>
              </dl>
            </div>
            <div className="mt-auto pt-7">
              <Link href="/contact" className="brand-button w-full">
                Check availability
              </Link>
            </div>
          </article>
        ))}
      </div>

      <section aria-labelledby="package-information-heading" className="brand-card mt-8 overflow-hidden sm:mt-10">
        <div className="border-b border-brand-border bg-brand-charcoal px-6 py-6 text-white sm:px-8">
          <p className="brand-subtitle !text-brand-gold-soft">Please review</p>
          <h3 id="package-information-heading" className="mt-2 text-2xl font-semibold">
            Included With Every Package
          </h3>
        </div>
        <div className="flex flex-wrap justify-center gap-3 bg-brand-surface p-3 sm:p-4">
          {packagePolicies.map(({ Icon, label, detail }) => (
            <article
              key={label}
              className="w-full rounded-md border border-brand-border bg-white p-6 sm:w-[calc(50%_-_0.375rem)] lg:w-[calc(33.333%_-_0.5rem)] xl:w-[calc(20%_-_0.6rem)]"
            >
              <Icon aria-hidden="true" size={22} className="text-brand-blue" />
              <h4 className="mt-4 font-semibold text-brand-black">{label}</h4>
              <p className="mt-2 text-sm leading-6 text-brand-text-muted">{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <aside className="mt-6 rounded-lg border border-brand-gold/70 bg-brand-gold/10 p-5 sm:p-6">
        <h3 className="font-semibold text-brand-black">Public venue permit fees</h3>
        <p className="mt-1 text-sm leading-6 text-brand-charcoal">
          For bar service at a public venue, additional fees may apply for permits required for alcohol sales.
        </p>
      </aside>

      <section
        aria-labelledby="booking-policy-heading"
        className="mt-10 sm:mt-12"
      >
        <SectionHeading
          headingId="booking-policy-heading"
          headingLevel="h3"
          eyebrow="Plan with confidence"
          title="Booking & Cancellation Policy"
          description="Review payment timing and cancellation terms before reserving your event date."
        />
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <article className="brand-card p-6 sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-surface text-brand-blue">
              <ReceiptText aria-hidden="true" size={24} strokeWidth={1.8} />
            </div>
            <h4 className="mt-5 text-xl font-semibold text-brand-black">Booking schedule</h4>
            <dl className="mt-6 divide-y divide-brand-border border-y border-brand-border">
              {bookingPolicies.map(({ Icon, title, detail }) => (
                <div key={title} className="flex gap-3 py-4 first:pt-0 last:pb-0">
                  <Icon aria-hidden="true" size={19} className="mt-0.5 shrink-0 text-brand-blue" />
                  <div>
                    <dt className="font-semibold text-brand-charcoal">{title}</dt>
                    <dd className="mt-1 text-sm leading-6 text-brand-text-muted">{detail}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </article>

          <article className="brand-card p-6 sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-surface text-brand-blue">
              <CalendarCheck2 aria-hidden="true" size={24} strokeWidth={1.8} />
            </div>
            <h4 className="mt-5 text-xl font-semibold text-brand-black">Cancellation terms</h4>
            <dl className="mt-6 divide-y divide-brand-border border-y border-brand-border">
              {cancellationPolicies.map((policy) => (
                <div key={policy.threshold} className="py-4 first:pt-0 last:pb-0">
                  <dt className="font-semibold text-brand-charcoal">{policy.threshold}</dt>
                  <dd className="mt-1 text-sm leading-6 text-brand-text-muted">{policy.detail}</dd>
                </div>
              ))}
            </dl>
          </article>
        </div>
      </section>
    </section>
  );
}
