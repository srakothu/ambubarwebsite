"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Ambulance,
  Beer,
  CalendarCheck2,
  CircleDollarSign,
  Coffee,
  GlassWater,
  MapPin,
  PartyPopper,
  ReceiptText,
  ShieldCheck,
  TentTree,
  UsersRound,
  Wine,
  type LucideIcon,
} from "lucide-react";

interface SectionHeadingProps {
  headingId?: string;
  eyebrow: string;
  title: string;
  description: string;
  descriptionBelow?: string;
  align?: "left" | "center";
}

function SectionHeading({
  headingId,
  eyebrow,
  title,
  description,
  descriptionBelow,
  align = "left",
}: SectionHeadingProps) {
  const alignmentClasses = align === "center" ? "mx-auto text-center" : "text-left";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`max-w-2xl ${alignmentClasses}`}
    >
      <p className="brand-subtitle">{eyebrow}</p>
      <h2 id={headingId} className="brand-heading mt-3 text-3xl font-semibold tracking-tight text-brand-black sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-brand-text-muted sm:text-lg sm:leading-8">{description}</p>
      {descriptionBelow ? (
        <p className="mt-3 text-base leading-7 text-brand-text-muted">{descriptionBelow}</p>
      ) : null}
    </motion.div>
  );
}

export function OverviewSection() {
  const highlights = [
    {
      eyebrow: "Firefighter roots",
      title: "Service you can count on",
      description:
        "After 32 years as a firefighter and first responder, our owner runs Ambu Bar with calm planning and fast, friendly service.",
      Icon: ShieldCheck,
    },
    {
      eyebrow: "Local energy",
      title: "Built for Pennsylvania events",
      description:
        "We show up ready with a converted ambulance, easy setup, and a beverage experience that keeps guests smiling.",
      Icon: MapPin,
    },
    {
      eyebrow: "Fun atmosphere",
      title: "A memorable mobile bar",
      description:
        "The ambulance is the centerpiece, and the menu options, including Dirty Soda service, are what guests remember.",
      Icon: PartyPopper,
    },
  ];

  return (
    <motion.section
      id="about"
      aria-labelledby="about-heading"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="brand-section"
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch lg:gap-8">
        <div className="flex items-center">
          <SectionHeading
            headingId="about-heading"
            eyebrow="About Ambu Bar"
            title="Built from a firefighter’s dedication to service."
            description="Ambu Bar began when a career firefighter and first responder converted a real ambulance into a mobile bar, bringing disciplined hospitality and a fun, memorable concept to events across Pennsylvania."
          />
        </div>

        <motion.aside
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }}
          className="brand-card relative flex min-h-72 flex-col justify-between overflow-hidden !border-brand-blue-dark !bg-brand-charcoal p-6 text-white sm:p-8 lg:p-10"
        >
          <div aria-hidden="true" className="absolute inset-x-0 top-0 grid h-1.5 grid-cols-3">
            <span className="bg-brand-blue" />
            <span className="bg-brand-gold" />
            <span className="bg-brand-blue" />
          </div>
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-brand-gold-soft">
            <Ambulance aria-hidden="true" size={25} strokeWidth={1.8} />
          </span>
          <div className="mt-8">
            <p className="brand-subtitle !text-brand-gold-soft">Our mission</p>
            <p className="mt-4 text-xl leading-8 text-white/90">
              We bring the same reliability and team-first care from the firehouse to your event, with a bar experience
              that feels polished, welcoming, and easy for hosts to manage.
            </p>
          </div>
        </motion.aside>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="brand-card mt-8 overflow-hidden sm:mt-10"
      >
        <div className="border-b border-brand-border bg-brand-surface px-6 py-5 sm:px-8">
          <p className="brand-subtitle !text-brand-blue">Why choose Ambu Bar</p>
          <h3 className="mt-2 text-xl font-semibold text-brand-black sm:text-2xl">
            Service-minded from setup to last call.
          </h3>
        </div>
        <div className="grid divide-y divide-brand-border md:grid-cols-3 md:divide-x md:divide-y-0">
          {highlights.map(({ eyebrow, title, description, Icon }) => (
            <article key={title} className="p-6 sm:p-8">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-surface text-brand-blue">
                <Icon aria-hidden="true" size={23} strokeWidth={1.8} />
              </span>
              <p className="brand-subtitle mt-5 !text-brand-blue">{eyebrow}</p>
              <h4 className="mt-2 text-xl font-semibold text-brand-black">{title}</h4>
              <p className="mt-3 text-base leading-7 text-brand-charcoal">{description}</p>
            </article>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}

export function ProcessSection() {
  const services: Array<{
    icon: LucideIcon;
    title: string;
    description: string;
  }> = [
    {
      icon: Ambulance,
      title: "Ambu Bar Experience",
      description:
        "A fully outfitted ambulance bar with our friendly E.M.T.s, branded setup, and a fun mobile presentation.",
    },
    {
      icon: Beer,
      title: "Beer & Wine Service",
      description:
        "Curated draft and bottle service for weddings, receptions, and community events.",
    },
    {
      icon: Coffee,
      title: "Mocktails & Coffee",
      description:
        "Premium non-alcoholic beverage service, including Dirty Soda options, that looks polished and keeps everyone included.",
    },
    {
      icon: Coffee,
      title: "Dirty Soda Bar",
      description:
        "A customizable non-alcoholic beverage experience with premium sodas, syrups, cream, fruit garnishes, and specialty toppings.",
    },
    {
      icon: PartyPopper,
      title: "Weddings & Celebrations",
      description:
        "A mobile bar experience designed to feel personal, smooth, and memorable for your guests.",
    },
    {
      icon: TentTree,
      title: "Festivals & Pop-ups",
      description:
        "Reliable on-site service for higher-volume crowds at markets, charity events, and outdoor showcases.",
    },
  ];

  return (
    <motion.section
      id="services"
      aria-labelledby="services-heading"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="brand-section brand-section--tight"
    >
      <SectionHeading
        headingId="services-heading"
        eyebrow="Services"
        title="Service options for every kind of event."
        description="From beer-and-wine service to full mobile bartending, our Emergency Mixology Technicians (E.M.T.s) help you create a beverage setup that fits your guest list, venue, and vibe."
        descriptionBelow="Our Emergency Mixology Technicians (E.M.T.s) are professionally trained bartenders dedicated to delivering exceptional hospitality and memorable beverage experiences."
      />
      <div className="mt-8 grid gap-5 sm:mt-10 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service, index) => (
          <motion.article
            key={service.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: index * 0.04, ease: "easeOut" }}
            className="brand-card p-6 sm:p-8"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-brand-surface text-brand-blue">
              <service.icon aria-hidden="true" size={28} strokeWidth={1.8} />
            </div>
            <h3 className="mt-6 text-xl font-semibold text-brand-black">{service.title}</h3>
            <p className="mt-3 text-base leading-7 text-brand-text-muted">{service.description}</p>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}

export function DirtySodaSection() {
  const signatureSodas = [
    {
      name: "Code Blue Razz",
      profile: "Blue raspberry syrup, vanilla syrup, lemon-lime soda, and cream.",
    },
    {
      name: "Smoke Condition",
      profile: "Vanilla syrup, root beer, and cream. Inspired by a classic root beer float.",
    },
    {
      name: "Pink Lady",
      profile: "Strawberry syrup, vanilla syrup, lemon-lime soda, and cream.",
    },
    {
      name: "Health Elixer",
      profile: "Strawberry syrup, banana syrup, banana puree, and lemon-lime soda.",
    },
    {
      name: "IV Drip",
      profile: "Coconut syrup, Dr Pepper, and cream.",
    },
  ] as const;

  return (
    <motion.section
      id="dirty-soda"
      aria-labelledby="dirty-soda-heading"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="brand-section brand-section--tight"
    >
      <SectionHeading
        headingId="dirty-soda-heading"
        eyebrow="Dirty Soda & Mocktail Upgrades"
        title="Signature recipes with emergency-room flair."
        description="Add a polished non-alcoholic beverage experience featuring premium sodas, flavored syrups, cream, fruit purees, and playful Ambu Bar recipes."
      />

      <motion.article
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="brand-card mt-8 overflow-hidden sm:mt-10"
      >
        <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
          <figure className="border-b border-brand-border bg-brand-charcoal p-4 sm:p-6 lg:border-b-0 lg:border-r lg:p-8">
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-brand-surface">
              <Image
                src="/images/dirty-soda/code-blue-razz.jpg"
                alt="Blue Code Blue Razz dirty soda topped with cream"
                fill
                sizes="(max-width: 1023px) calc(100vw - 5rem), 28rem"
                className="object-cover"
              />
            </div>
            <figcaption className="flex items-center gap-3 px-1 pb-1 pt-4 text-white">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-brand-gold-soft">
                <GlassWater aria-hidden="true" size={21} strokeWidth={1.8} />
              </span>
              <div>
                <p className="font-semibold">Code Blue Razz</p>
                <p className="mt-0.5 text-sm text-white/75">A bright, creamy signature Dirty Soda.</p>
              </div>
            </figcaption>
          </figure>

          <div className="relative overflow-hidden p-6 sm:p-8 lg:p-10">
            <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-brand-blue/10 blur-2xl" />
            <div className="pointer-events-none absolute -left-12 bottom-0 h-36 w-36 rounded-full bg-brand-gold/15 blur-2xl" />

            <p className="brand-subtitle !text-brand-blue">Signature menu</p>
            <h3 className="mt-4 text-2xl font-semibold text-brand-black sm:text-3xl">Dirty Soda Creations</h3>
            <p className="mt-3 max-w-2xl text-base leading-7 text-brand-charcoal">
              Choose a featured recipe or ask about including the Dirty Soda & Mocktail upgrade with your package.
            </p>

            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {signatureSodas.map((item, index) => (
                  <li
                    key={item.name}
                    className="relative flex gap-4 rounded-lg border border-brand-border bg-white p-5"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-surface text-xs font-bold tracking-[0.12em] text-brand-blue">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="text-base font-semibold text-brand-black">{item.name}</p>
                      <p className="mt-1 text-sm leading-6 text-brand-charcoal">{item.profile}</p>
                    </div>
                  </li>
                ))}
            </ul>

            <div className="mt-6 flex flex-col gap-4 rounded-lg bg-brand-charcoal p-5 text-white sm:flex-row sm:items-center sm:p-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-brand-gold-soft">
                <GlassWater aria-hidden="true" size={23} strokeWidth={1.8} />
              </span>
              <div>
                <p className="text-base font-semibold">Dirty Soda & Mocktail Upgrade</p>
                <p className="mt-1 text-sm leading-6 text-white/80">
                  $50 for Triage or $50 per 50 guests for B.L.S. and A.L.S.
                </p>
              </div>
            </div>

            <Link href="/#pricing" className="brand-button mt-6 w-full sm:w-auto">
              Compare Package Upgrades
            </Link>
          </div>
        </div>
      </motion.article>
    </motion.section>
  );
}

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
    <motion.section
      id="pricing"
      aria-labelledby="pricing-heading"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="brand-section brand-section--tight"
    >
      <SectionHeading
        headingId="pricing-heading"
        eyebrow="Pricing"
        title="Choose the package that fits your event."
        description="Compare guest counts, setup choices, hourly rates, staffing, and beverage service. Fees are listed separately so you can see exactly what applies."
      />
      <div className="mt-8 grid gap-5 sm:mt-10 sm:gap-6 xl:grid-cols-3">
        {plans.map((plan, index) => (
          <motion.article
            key={plan.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
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
          </motion.article>
        ))}
      </div>

      <section aria-labelledby="package-information-heading" className="brand-card mt-8 overflow-hidden sm:mt-10">
        <div className="border-b border-brand-border bg-brand-charcoal px-6 py-6 text-white sm:px-8">
          <p className="brand-subtitle !text-brand-gold-soft">Please review</p>
          <h3 id="package-information-heading" className="mt-2 text-2xl font-semibold">
            Included With Every Package
          </h3>
        </div>
        <div className="grid gap-px bg-brand-border md:grid-cols-2 xl:grid-cols-5">
          {packagePolicies.map(({ Icon, label, detail }) => (
            <article key={label} className="bg-white p-6">
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

      <motion.section
        aria-labelledby="booking-policy-heading"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mt-10 sm:mt-12"
      >
        <SectionHeading
          headingId="booking-policy-heading"
          eyebrow="Plan with confidence"
          title="Booking & Cancellation Policy"
          description="Review payment timing and cancellation terms before reserving your event date."
        />
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <article className="brand-card p-6 sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-surface text-brand-blue">
              <ReceiptText aria-hidden="true" size={24} strokeWidth={1.8} />
            </div>
            <h3 className="mt-5 text-xl font-semibold text-brand-black">Booking schedule</h3>
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
            <h3 className="mt-5 text-xl font-semibold text-brand-black">Cancellation terms</h3>
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
      </motion.section>
    </motion.section>
  );
}

export function ContactSection() {
  return (
    <motion.section
      id="contact"
      aria-labelledby="contact-heading"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="brand-section brand-section--tight"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="brand-card brand-card--soft p-6 sm:p-8 lg:p-10"
      >
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
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.35, delay: 0.05, ease: "easeOut" }}
          className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:justify-center"
        >
          <a href="mailto:AmbuBarLLC@gmail.com" className="brand-button w-full sm:w-auto">AmbuBarLLC@gmail.com</a>
          <a href="#home" className="brand-button brand-button--secondary w-full sm:w-auto">
            Back to top
          </a>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
