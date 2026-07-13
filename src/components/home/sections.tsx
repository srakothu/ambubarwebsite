"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface SectionHeadingProps {
  headingId?: string;
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
}

function SectionHeading({
  headingId,
  eyebrow,
  title,
  description,
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
      <p className="mt-4 text-lg leading-8 text-brand-text-muted">{description}</p>
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
      className="brand-card p-8"
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
        "After 32 years as a firefighter and EMT, our owner runs Ambu Bar with calm planning and fast, friendly service.",
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
        "The ambulance is the centerpiece, and the service is the part your guests will actually remember.",
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
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="space-y-6">
          <SectionHeading
            headingId="about-heading"
            eyebrow="About Ambu Bar"
            title="Built from a firefighter’s dedication to service."
            description="Ambu Bar began when a career firefighter and EMT converted a real ambulance into a mobile bar, bringing disciplined hospitality and a fun, memorable concept to events across Pennsylvania."
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
          className="brand-card p-8 sm:p-10"
        >
          <p className="brand-subtitle">Why choose Ambu Bar</p>
          <ul className="mt-6 space-y-4 text-base leading-7 text-brand-text-muted">
            <li>• Firefighter-owned hospitality with dependable setup and execution.</li>
            <li>• Beverage options for every guest, from beer and wine to mocktails and coffee.</li>
            <li>• A standout mobile bar concept that adds energy without creating extra work for the host.</li>
          </ul>
        </motion.div>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
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
  const services = [
    {
      icon: "🚑",
      title: "Ambu Bar Experience",
      description:
        "A fully outfitted ambulance bar with service staff, branded setup, and a fun mobile presentation.",
    },
    {
      icon: "🍻",
      title: "Beer & Wine Service",
      description:
        "Curated draft and bottle service for weddings, receptions, and community events.",
    },
    {
      icon: "🥤",
      title: "Mocktails & Coffee",
      description:
        "Premium non-alcoholic beverage service that looks polished and keeps everyone included.",
    },
    {
      icon: "🎉",
      title: "Weddings & Celebrations",
      description:
        "A mobile bar experience designed to feel personal, smooth, and memorable for your guests.",
    },
    {
      icon: "🎪",
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
        description="From beer-and-wine service to full mobile bartending, we help you create a beverage setup that fits your guest list, venue, and vibe."
      />
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service, index) => (
          <motion.article
            key={service.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: index * 0.04, ease: "easeOut" }}
            className="brand-card p-8"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-surface text-2xl text-brand-blue">
              {service.icon}
            </div>
            <h3 className="mt-6 text-xl font-semibold text-brand-black">{service.title}</h3>
            <p className="mt-3 text-base leading-7 text-brand-text-muted">{service.description}</p>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}

export function PricingSection() {
  const plans = [
    {
      name: "Mobile Bar Drop",
      price: "Starting at $250",
      note: "Great for 25–75 guests",
      includes: ["Ambu Bar event setup", "Service options tailored to your menu", "Setup and breakdown"],
      cta: "Request a Quote",
    },
    {
      name: "Full Event Service",
      price: "Custom quote",
      note: "Weddings & larger events",
      includes: ["Dedicated service team", "Expanded beverage menu", "Flexible setup for indoor or outdoor venues"],
      cta: "Book a Consultation",
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
        title="Flexible packages built around your guest list and venue."
        description="We tailor pricing around service length, guest count, beverage menu, and whether you need a simple setup or full event support."
      />
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {plans.map((plan, index) => (
          <motion.article
            key={plan.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
            className="brand-card p-8 sm:p-10"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl font-semibold text-brand-black">{plan.name}</h3>
                <p className="mt-2 text-sm text-brand-text-muted">{plan.note}</p>
              </div>
              <span className="rounded-full bg-brand-blue text-white px-3 py-1 text-sm font-semibold">
                {plan.price}
              </span>
            </div>
            <div className="mt-8">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-blue">
                What&apos;s included
              </p>
              <ul className="mt-4 space-y-3 text-base leading-7 text-brand-text-muted">
                {plan.includes.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
            <Link href="/contact" className="brand-button mt-8">
              {plan.cta}
            </Link>
          </motion.article>
        ))}
      </div>
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
        className="brand-card brand-card--soft p-8 sm:p-10"
      >
        <SectionHeading
          headingId="contact-heading"
          align="center"
          eyebrow="Start a conversation"
          title="Ready for a beverage emergency?"
          description="Tell us about your date, guest count, and whether you want beer and wine, mocktails, coffee service, or a full mobile bar. We serve weddings, private parties, festivals, and corporate events throughout Pennsylvania."
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
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          <a href="mailto:AmbuBarLLC@gmail.com" className="brand-button">AmbuBarLLC@gmail.com</a>
          <a href="#home" className="brand-button brand-button--secondary">
            Back to top
          </a>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
