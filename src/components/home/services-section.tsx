import {
  Ambulance,
  Beer,
  Coffee,
  PartyPopper,
  TentTree,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "./section-heading";

export function ServicesSection() {
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
    <section
      id="services"
      aria-labelledby="services-heading"
      className="brand-section brand-section--tight"
    >
      <SectionHeading
        headingId="services-heading"
        eyebrow="Services"
        title="Service options for every kind of event."
        description="From beer-and-wine service to full mobile bartending, our Emergency Mixology Technicians (E.M.T.s) help you create a beverage setup that fits your guest list, venue, and vibe."
        descriptionBelow="Our E.M.T.s are professionally trained bartenders dedicated to delivering exceptional hospitality and memorable beverage experiences."
      />
      <div className="brand-card mt-8 grid gap-px overflow-hidden bg-brand-border p-px sm:mt-10 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <article
            key={service.title}
            className="bg-white p-6 sm:p-8"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-brand-surface text-brand-blue">
              <service.icon aria-hidden="true" size={28} strokeWidth={1.8} />
            </div>
            <h3 className="mt-6 text-xl font-semibold text-brand-black">{service.title}</h3>
            <p className="mt-3 text-base leading-7 text-brand-text-muted">{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
