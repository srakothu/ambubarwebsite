import Image from "next/image";
import Link from "next/link";
import { Building2 } from "lucide-react";
import { featuredPartners, type FeaturedPartner } from "@/src/content/site-content";

interface PartnersSectionProps {
  partners?: readonly FeaturedPartner[];
}

export function PartnersSection({ partners = featuredPartners }: PartnersSectionProps) {
  return (
    <section id="partners" aria-labelledby="partners-heading" className="brand-section brand-section--tight">
      <div className="max-w-2xl">
        <p className="brand-subtitle">Partners</p>
        <h2 id="partners-heading" className="brand-heading mt-3 text-3xl font-semibold tracking-tight text-brand-black sm:text-4xl">
          Partnered Wineries, Breweries & Spirits
        </h2>
        <p className="mt-4 text-lg leading-8 text-brand-text-muted">
          We collaborate with regional beverage partners to create memorable pairings, activations, and event experiences.
        </p>
      </div>

      <div className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
        {partners.map((partner) => (
          <article
            key={partner.id}
            className="brand-card brand-card--soft flex h-full flex-col gap-4 p-5 sm:gap-5 sm:p-6"
          >
            {partner.logoSrc ? (
              <div className="overflow-hidden rounded-md border border-brand-border bg-white p-2">
                <Image
                  src={partner.logoSrc}
                  alt={partner.logoAlt ?? `${partner.name} logo`}
                  width={420}
                  height={200}
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="h-20 w-full object-contain"
                />
              </div>
            ) : (
              <div className="flex h-20 items-center justify-center rounded-md border border-dashed border-brand-border bg-brand-surface px-3 text-center text-sm font-medium text-brand-text-muted">
                {partner.name} logo placeholder
              </div>
            )}

            <div className="flex items-start gap-3">
              <Building2 aria-hidden="true" size={22} className="mt-0.5 shrink-0 text-brand-blue" />
              <div>
                <p className="brand-subtitle">{partner.category}</p>
                <h3 className="mt-2 text-xl font-semibold text-brand-black">{partner.name}</h3>
              </div>
            </div>

            <p className="text-sm leading-6 text-brand-text-muted">{partner.summary}</p>

            <div className="mt-auto flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={partner.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="brand-button w-full sm:w-auto"
              >
                Visit Ridgewood Winery
              </a>
              {partner.facebookUrl ? (
                <a
                  href={partner.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brand-button brand-button--secondary w-full sm:w-auto"
                >
                  Follow on Facebook
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </div>
      <Link href="/contact" className="brand-button mt-7 w-full sm:mt-8 sm:w-auto">
        Explore a Partnership
      </Link>
    </section>
  );
}
