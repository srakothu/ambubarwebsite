import Image from "next/image";
import Link from "next/link";
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
import {
  business,
  dirtySodaFavorites,
  featuredDirtySoda,
  mocktailSamples,
} from "@/src/content/site-content";

interface SectionHeadingProps {
  headingId?: string;
  eyebrow: string;
  title: string;
  description: string;
  descriptionBelow?: string;
  align?: "left" | "center";
  headingLevel?: "h2" | "h3";
}

function SectionHeading({
  headingId,
  eyebrow,
  title,
  description,
  descriptionBelow,
  align = "left",
  headingLevel = "h2",
}: SectionHeadingProps) {
  const alignmentClasses = align === "center" ? "mx-auto text-center" : "text-left";
  const Heading = headingLevel;

  return (
    <div className={`max-w-2xl ${alignmentClasses}`}>
      <p className="brand-subtitle">{eyebrow}</p>
      <Heading id={headingId} className="brand-heading mt-3 text-3xl font-semibold tracking-tight text-brand-black sm:text-4xl">
        {title}
      </Heading>
      <p className="mt-4 text-base leading-7 text-brand-text-muted sm:text-lg sm:leading-8">{description}</p>
      {descriptionBelow ? (
        <p className="mt-3 text-base leading-7 text-brand-text-muted">{descriptionBelow}</p>
      ) : null}
    </div>
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
            description="Ambu Bar began when a career firefighter and first responder converted a real ambulance into a mobile bar, bringing disciplined hospitality and a fun, memorable concept to events across Pennsylvania."
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

export function DirtySodaSection() {
  const [featuredMocktail, ...supportingMocktails] = mocktailSamples;

  return (
    <section
      id="dirty-soda"
      aria-labelledby="dirty-soda-heading"
      className="brand-section brand-section--tight"
    >
      <SectionHeading
        headingId="dirty-soda-heading"
        eyebrow="Dirty Soda & Mocktail Bar"
        title="Signature recipes with emergency-room flair."
        description="Explore Dirty Soda favorites and a few sample mocktails, all served with the playful details and polished presentation that make Ambu Bar memorable."
      />

      <article className="brand-card mt-8 overflow-hidden sm:mt-10">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
          <figure className="border-b border-brand-border bg-brand-charcoal p-4 sm:p-6 lg:border-b-0 lg:border-r lg:p-8">
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-brand-surface">
              <Image
                src={featuredDirtySoda.image.src}
                alt={featuredDirtySoda.image.alt}
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
                <p className="font-semibold">{featuredDirtySoda.drink.name}</p>
                <p className="mt-0.5 text-sm text-white/75">A bright, creamy signature Dirty Soda.</p>
              </div>
            </figcaption>
          </figure>

          <div className="relative overflow-hidden p-6 sm:p-8 lg:p-10">
            <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-brand-blue/10 blur-2xl" />
            <div className="pointer-events-none absolute -left-12 bottom-0 h-36 w-36 rounded-full bg-brand-gold/15 blur-2xl" />

            <p className="brand-subtitle !text-brand-blue">Signature menu</p>
            <h3 className="mt-4 text-2xl font-semibold text-brand-black sm:text-3xl">Dirty Soda Favorites</h3>
            <p className="mt-3 max-w-2xl text-base leading-7 text-brand-charcoal">
              Choose a featured recipe or ask about including the Dirty Soda & Mocktail upgrade with your package.
            </p>

            <ul className="mt-6 flex flex-wrap justify-center gap-3">
              {dirtySodaFavorites.map((item, index) => (
                <li
                  key={item.name}
                  className="relative flex w-full gap-4 rounded-lg border border-brand-border bg-white p-5 sm:w-[calc(50%_-_0.375rem)]"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-surface text-xs font-bold tracking-[0.12em] text-brand-blue">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-base font-semibold text-brand-black">{item.name}</p>
                    <p className="mt-1 text-sm leading-6 text-brand-charcoal">{item.ingredients}</p>
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
      </article>

      <article className="brand-card mt-6 overflow-hidden sm:mt-8">
        <div className="border-b border-brand-border bg-brand-surface px-6 py-6 sm:px-8 lg:px-10">
          <p className="brand-subtitle !text-brand-blue">Alcohol-free inspiration</p>
          <h3 className="mt-3 text-2xl font-semibold text-brand-black sm:text-3xl">Mocktail Samples</h3>
          <p className="mt-3 max-w-3xl text-base leading-7 text-brand-charcoal">
            A few examples of the alcohol-free drinks our E.M.T.s can create. Custom mocktail
            options may be tailored to your event.
          </p>
        </div>

        <div className="grid gap-4 p-4 sm:p-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:p-8">
          <figure className="overflow-hidden rounded-lg bg-brand-charcoal text-white sm:mx-auto sm:w-full sm:max-w-xl lg:mx-0 lg:max-w-none">
            <div className="relative aspect-[3/4] overflow-hidden bg-brand-charcoal">
              <Image
                src={featuredMocktail.image.src}
                alt={featuredMocktail.image.alt}
                fill
                sizes="(max-width: 767px) calc(100vw - 5rem), (max-width: 1023px) calc(100vw - 7rem), 34rem"
                className="object-cover object-center"
              />
            </div>
            <figcaption className="border-t border-white/15 p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-brand-gold-soft">
                  <GlassWater aria-hidden="true" size={21} strokeWidth={1.8} />
                </span>
                <div>
                  <p className="text-xl font-semibold">{featuredMocktail.name}</p>
                  <p className="mt-2 text-sm leading-6 text-white/80">{featuredMocktail.ingredients}</p>
                </div>
              </div>
            </figcaption>
          </figure>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:gap-6">
            {supportingMocktails.map((mocktail) => (
              <figure
                key={mocktail.name}
                className="grid overflow-hidden rounded-lg border border-brand-border bg-white lg:grid-cols-[0.82fr_1.18fr]"
              >
                <div className="relative aspect-[2/3] overflow-hidden bg-brand-charcoal lg:aspect-auto lg:min-h-72">
                  <Image
                    src={mocktail.image.src}
                    alt={mocktail.image.alt}
                    fill
                    sizes="(max-width: 767px) calc(100vw - 5rem), (max-width: 1023px) calc(50vw - 4rem), 15rem"
                    className="object-cover object-center"
                  />
                </div>
                <figcaption className="flex flex-col justify-center p-5 sm:p-6">
                  <p className="brand-subtitle !text-brand-blue">Sample mocktail</p>
                  <p className="mt-2 text-xl font-semibold text-brand-black">{mocktail.name}</p>
                  <p className="mt-2 text-sm leading-6 text-brand-charcoal">{mocktail.ingredients}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </article>
    </section>
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
