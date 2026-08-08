import {
  Ambulance,
  MapPin,
  PartyPopper,
  ShieldCheck,
} from "lucide-react";
import { SectionHeading } from "./section-heading";

export function OverviewSection() {
  const highlights = [
    {
      eyebrow: "Firefighter roots",
      title: "Service you can count on",
      description:
        "After 32 years as a firefighter and emergency medical technician, our owner runs Ambu Bar with calm planning and fast, friendly service.",
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
    <section
      id="about"
      aria-labelledby="about-heading"
      className="brand-section"
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch lg:gap-8">
        <div className="flex items-center">
          <SectionHeading
            headingId="about-heading"
            eyebrow="About Ambu Bar"
            title="Built from a firefighter’s dedication to service."
            description="Ambu Bar began when a career firefighter and emergency medical technician converted a real ambulance into a mobile bar, bringing disciplined hospitality and a fun, memorable concept to events across Pennsylvania."
          />
        </div>

        <aside
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
        </aside>
      </div>

      <div className="brand-card mt-8 overflow-hidden sm:mt-10">
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
      </div>
    </section>
  );
}
