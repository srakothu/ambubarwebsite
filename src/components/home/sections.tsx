"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Ambulance,
  Beer,
  CalendarCheck2,
  CircleDollarSign,
  Coffee,
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

interface FeatureCardProps {
  eyebrow: string;
  title: string;
  description: string;
}

function FeatureCard({ eyebrow, title, description }: FeatureCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="brand-card p-6 sm:p-8"
    >
      <p className="brand-subtitle">{eyebrow}</p>
      <h3 className="mt-4 text-xl font-semibold text-brand-black">{title}</h3>
      <p className="mt-3 text-base leading-7 text-brand-text-muted">{description}</p>
    </motion.article>
  );
}

export function OverviewSection() {
  const highlights = [
    {
      eyebrow: "Firefighter roots",
      title: "Service you can count on",
      description:
        "After 32 years as a firefighter and first responder, our owner runs Ambu Bar with calm planning and fast, friendly service.",
    },
    {
      eyebrow: "Local energy",
      title: "Built for Pennsylvania events",
      description:
        "We show up ready with a converted ambulance, easy setup, and a beverage experience that keeps guests smiling.",
    },
    {
      eyebrow: "Fun atmosphere",
      title: "A memorable mobile bar",
      description:
        "The ambulance is the centerpiece, and the menu options, including Dirty Soda service, are what guests remember.",
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
      <div className="grid gap-8 lg:gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="space-y-5 sm:space-y-6">
          <SectionHeading
            headingId="about-heading"
            eyebrow="About Ambu Bar"
            title="Built from a firefighter’s dedication to service."
            description="Ambu Bar began when a career firefighter and first responder converted a real ambulance into a mobile bar, bringing disciplined hospitality and a fun, memorable concept to events across Pennsylvania."
          />
          <div className="brand-card brand-card--soft p-8">
            <p className="brand-subtitle">Our mission</p>
            <p className="mt-3 text-lg leading-8 text-brand-text-muted">
              We bring the same reliability and team-first care from the firehouse to your event, with a bar experience that feels polished, welcoming, and easy for hosts to manage.
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }}
          className="brand-card p-6 sm:p-8 lg:p-10"
        >
          <p className="brand-subtitle">Why choose Ambu Bar</p>
          <ul className="mt-6 space-y-4 text-base leading-7 text-brand-text-muted">
            <li>• Firefighter-owned hospitality with dependable setup and execution.</li>
            <li>• Beverage options for every guest, from beer and wine to mocktails, coffee, and Dirty Soda.</li>
            <li>• A standout mobile bar concept that adds energy without creating extra work for the host.</li>
          </ul>
        </motion.div>
      </div>

      <div className="mt-8 grid gap-5 sm:mt-10 sm:gap-6 md:grid-cols-3">
        {highlights.map((item) => (
          <FeatureCard
            key={item.title}
            eyebrow={item.eyebrow}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
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
  const dirtySodaMenu = [
    "Dirty Dr Pepper",
    "Dirty Coke",
    "Dirty Sprite",
    "Dirty Mountain Dew",
    "Custom Dirty Soda Creations",
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
        eyebrow="Dirty Soda Bar"
        title="A customizable non-alcoholic beverage experience."
        description="A customizable non-alcoholic beverage experience featuring premium sodas, flavored syrups, cream, fruit garnishes, and specialty toppings."
      />

      <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
        {dirtySodaMenu.map((item, index) => (
          <motion.article
            key={item}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: index * 0.04, ease: "easeOut" }}
            className="brand-card brand-card--soft p-5 sm:p-6 lg:p-8"
          >
            <p className="brand-subtitle">Drink menu</p>
            <h3 className="mt-4 text-xl font-semibold text-brand-black">{item}</h3>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}

export function PricingSection() {
  const plans = [
    {
      abbreviation: "B.L.S.",
      name: "Basic Liquor Service",
      summary: "Beer and wine service for 12 to 30 guests.",
      Icon: Wine,
      options: [
        {
          name: "Satellite Bar & Tent",
          price: "$100 / hour",
          detail: "2-hour minimum",
        },
        {
          name: "B.L.S. Response",
          price: "$200 first hour",
          detail: "Actual Ambu-Bar; $100 each additional hour",
        },
      ],
      includes: ["Beer and wine service", "Supplies: $65", "Bartender: $50 / hour", "10% service charge"],
      addOns: ["Mocktails & Dirty Soda: $50", "Up to 3 signature cocktails: $75"],
    },
    {
      abbreviation: "A.L.S.",
      name: "Advanced Liquor Service",
      summary: "Satellite Bar & Tent service for parties of 50 or more.",
      Icon: ShieldCheck,
      options: [
        {
          name: "Satellite Bar & Tent",
          price: "$100 / hour",
          detail: "3-hour minimum",
        },
      ],
      includes: [
        "Beer and wine service with up to 3-4 signature cocktails",
        "Supplies: $100 per 50 guests",
        "Bartender: $50 / hour",
        "Tip jar allowed, or add 10% gratuity",
        "10% service charge",
      ],
      addOns: ["Dirty Sodas & Mocktails: $75"],
    },
    {
      abbreviation: "M.C.I.",
      name: "Mass Consumer Incident",
      summary: "Ambu-Bar service for parties of 50 or more.",
      Icon: Ambulance,
      options: [
        {
          name: "Ambu-Bar Response",
          price: "$250 first hour",
          detail: "Satellite Bar & Tent and seating area; $125 each additional hour; 3-hour minimum",
        },
      ],
      includes: [
        "Beer and wine service with up to 3-4 signature cocktails",
        "Supplies: $100 per 50 guests",
        "Bartender: $50 / hour",
        "Tip jar allowed, or add 10% gratuity",
        "10% service charge",
      ],
      addOns: ["Dirty Sodas & Mocktails: $75"],
    },
  ];

  const serviceDetails = [
    {
      Icon: CalendarCheck2,
      label: "Setup & cleanup",
      detail: "Up to 1 hour of setup plus breakdown and cleanup are included with every package.",
    },
    {
      Icon: UsersRound,
      label: "Bartending team",
      detail: "RAMP Certified Bartenders, with 1 bartender required for every 50 guests.",
    },
    {
      Icon: MapPin,
      label: "Travel & permits",
      detail: "B.L.S. includes 25 miles; A.L.S. and M.C.I. include 30 miles. Beyond the included distance, travel is $2 per mile one way. Alcohol service requires a $75 permit fee.",
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
        title="Choose the response level that fits your event."
        description="Each package is organized around your guest count, service setup, and beverage options so you can quickly see what applies to your celebration."
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
                <h3 className="mt-2 text-xl font-semibold text-brand-black">{plan.name}</h3>
              </div>
            </div>
            <p className="mt-5 text-base leading-7 text-brand-text-muted">{plan.summary}</p>

            <dl className="mt-6 divide-y divide-brand-border border-y border-brand-border">
              {plan.options.map((option) => (
                <div key={option.name} className="py-4 first:pt-0 last:pb-0">
                  <dt className="text-sm font-semibold text-brand-charcoal">{option.name}</dt>
                  <dd className="mt-2 text-lg font-semibold text-brand-blue">{option.price}</dd>
                  <p className="mt-1 text-sm leading-6 text-brand-text-muted">{option.detail}</p>
                </div>
              ))}
            </dl>

            <div className="mt-6">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-blue">
                Included fees & service
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-brand-text-muted">
                {plan.includes.map((item) => (
                  <li key={item} className="flex gap-2">
                    <Beer aria-hidden="true" size={16} className="mt-1 shrink-0 text-brand-gold" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 border-t border-brand-border pt-5">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-blue">Add-ons</p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-brand-text-muted">
                {plan.addOns.map((item) => (
                  <li key={item} className="flex gap-2">
                    <Coffee aria-hidden="true" size={16} className="mt-1 shrink-0 text-brand-gold" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Link href="/contact" className="brand-button mt-7 w-full">
              Check availability
            </Link>
          </motion.article>
        ))}
      </div>

      <div className="mt-6 grid gap-4 border-y border-brand-border py-6 sm:mt-8 sm:grid-cols-3 sm:gap-6">
        {serviceDetails.map(({ Icon, label, detail }) => (
          <div key={label} className="flex items-start gap-3">
            <Icon aria-hidden="true" size={20} className="mt-1 shrink-0 text-brand-blue" />
            <div>
              <h3 className="font-semibold text-brand-black">{label}</h3>
              <p className="mt-1 text-sm leading-6 text-brand-text-muted">{detail}</p>
            </div>
          </div>
        ))}
      </div>

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
