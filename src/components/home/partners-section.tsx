import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { featuredPartners, type FeaturedPartner } from "@/src/content/site-content";

interface PartnersSectionProps {
  partners?: readonly FeaturedPartner[];
}

export function PartnersSection({ partners = featuredPartners }: PartnersSectionProps) {
  return (
    <section id="partners" aria-labelledby="partners-heading" className="brand-section brand-section--tight">
      <div className="max-w-2xl">
        <p className="brand-subtitle !text-brand-blue">Community Connections</p>
        <h2 id="partners-heading" className="brand-heading mt-3 text-3xl font-semibold tracking-tight text-brand-black sm:text-4xl">
          Preferred Partners
        </h2>
        <p className="mt-4 text-lg leading-8 text-brand-charcoal">
          We’re proud to work with trusted local businesses across wine, coffee, and spirits. Explore our preferred partners below, with more to come as our network grows.
        </p>
      </div>

      <div className="brand-card mt-8 overflow-hidden sm:mt-10">
        <div aria-hidden="true" className="grid h-1.5 grid-cols-3">
          <span className="bg-brand-blue" />
          <span className="bg-brand-gold" />
          <span className="bg-brand-blue" />
        </div>

        <div className="grid divide-y divide-brand-border lg:grid-cols-3 lg:divide-x lg:divide-y-0">
          {partners.map((partner) => (
            <article key={partner.id} className="flex min-w-0 flex-col p-5 sm:p-7 lg:p-6 xl:p-7">
              <div
                className={`relative aspect-[16/9] overflow-hidden rounded-md border border-brand-border ${
                  partner.media.surface === "dark"
                    ? "bg-brand-charcoal"
                    : partner.media.presentation === "logo"
                      ? "bg-white"
                      : "bg-brand-surface"
                }`}
              >
                <Image
                  src={partner.media.src}
                  alt={partner.media.alt}
                  fill
                  sizes="(max-width: 640px) calc(100vw - 5.5rem), (max-width: 1023px) calc(100vw - 6rem), 21rem"
                  style={{ objectPosition: partner.media.objectPosition }}
                  className={
                    partner.media.presentation === "logo"
                      ? partner.media.inset === "compact"
                        ? "object-contain p-2 sm:p-3"
                        : "object-contain p-5 sm:p-6"
                      : "object-cover object-center"
                  }
                />
              </div>

              <div className="mt-6">
                <p className="brand-subtitle !text-brand-blue">{partner.category}</p>
                <h3 className="mt-2 text-xl font-semibold text-brand-black">{partner.name}</h3>
                <p className="mt-3 text-sm leading-6 text-brand-charcoal">{partner.summary}</p>
              </div>

              <div className="mt-auto flex flex-col gap-3 pt-6">
                <a
                  href={partner.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brand-button w-full gap-2 px-4 focus-visible:outline-brand-blue"
                >
                  Visit {partner.name}
                  <ExternalLink aria-hidden="true" size={16} />
                </a>
                {partner.facebookUrl ? (
                  <a
                    href={partner.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-3 text-sm font-semibold text-brand-blue underline decoration-brand-border underline-offset-4 transition-colors hover:text-brand-blue-dark focus-visible:outline-brand-blue"
                  >
                    Follow on Facebook
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
