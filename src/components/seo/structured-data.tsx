import { business, socialLinks } from "@/src/content/site-content";
import { absoluteUrl } from "@/src/lib/site-url";

export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    legalName: business.legalName,
    description:
      "A retired ambulance converted into a mobile beverage bar serving weddings, festivals, private parties, fundraisers, and corporate events across Pennsylvania.",
    slogan: business.tagline,
    url: business.website,
    image: absoluteUrl("/images/Ambubar55logo.jpeg"),
    logo: absoluteUrl("/images/Ambubar55logo.jpeg"),
    telephone: business.phoneHref.replace("tel:", ""),
    email: business.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Reading",
      addressRegion: "PA",
      addressCountry: "US",
    },
    areaServed: [
      {
        "@type": "AdministrativeArea",
        name: "Pennsylvania",
      },
    ],
    sameAs: socialLinks.map((link) => link.href),
    makesOffer: [
      "Mobile beverage bar",
      "Beer and wine service",
      "Mocktails and coffee",
      "Dirty Soda bar",
    ].map((name) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name,
      },
    })),
  };

  const serializedData = JSON.stringify(data).replace(/</g, "\\u003c");

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializedData }} />;
}
