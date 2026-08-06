import { business, socialLinks } from "@/src/content/site-content";

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
    image: `${business.website}/images/Ambubar55logo.jpeg`,
    logo: `${business.website}/images/Ambu-Bar Main.jpeg`,
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
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
