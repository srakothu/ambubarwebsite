import Link from "next/link";
import { Beer, Building2, Handshake, Wine } from "lucide-react";
import { partnerOpportunities, type PartnerOpportunity } from "@/src/content/site-content";

interface PartnersSectionProps {
  partners?: readonly PartnerOpportunity[];
}

const partnerIcons = [Wine, Beer, Building2, Handshake];

export function PartnersSection({ partners = partnerOpportunities }: PartnersSectionProps) {
  return (
    <section id="partners" aria-labelledby="partners-heading" className="brand-section brand-section--tight">
      <div className="max-w-2xl">
        <p className="brand-subtitle">Partners</p>
        <h2 id="partners-heading" className="brand-heading mt-3 text-3xl font-semibold tracking-tight text-brand-black sm:text-4xl">
          Partnership opportunities are launching soon.
        </h2>
        <p className="mt-4 text-lg leading-8 text-brand-text-muted">
          Ambu Bar is building relationships with local businesses and community teams who want to create an event experience guests cannot miss.
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {partners.map((partner, index) => (
          <article
            key={partner.id}
            className="brand-card brand-card--soft flex min-h-52 items-start p-6"
          >
            <div>
              {(() => {
                const Icon = partnerIcons[index % partnerIcons.length];
                return <Icon aria-hidden="true" size={24} className="text-brand-blue" />;
              })()}
              <h3 className="mt-5 text-lg font-semibold text-brand-black">{partner.title}</h3>
              <p className="mt-3 text-sm leading-6 text-brand-text-muted">{partner.description}</p>
            </div>
          </article>
        ))}
      </div>
      <Link href="/contact" className="brand-button mt-8">
        Explore a Partnership
      </Link>
    </section>
  );
}
