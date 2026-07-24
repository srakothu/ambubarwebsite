export const footerQuickLinks = [
      { label: "About", href: "/#about", isSectionLink: true },
      { label: "Team", href: "/#team", isSectionLink: true },
      { label: "Services", href: "/#services", isSectionLink: true },
  { label: "Dirty Soda", href: "/#dirty-soda", isSectionLink: true },
      { label: "Gallery", href: "/#gallery", isSectionLink: true },
      { label: "Merchandise", href: "/merchandise", isSectionLink: false },
      { label: "Contact", href: "/contact", isSectionLink: false },
];

export const socialLinks = [
      { label: "Instagram", href: "https://www.instagram.com/ambubarllc" },
      { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61591806382668" },
  ] as const;

export const socialLinksComingSoon = ["TikTok"] as const;

export const business = {
  name: "Ambu Bar LLC",
  legalName: "Ambu Bar LLC",
  email: "AmbuBarLLC@gmail.com",
  emailHref: "mailto:AmbuBarLLC@gmail.com",
  phone: "+1 (484) 955-9368",
  phoneHref: "tel:+14849559368",
  location: "Reading, Pennsylvania",
  serviceArea: "Pennsylvania and nearby communities",
  website: "https://www.ambubar.com",
  tagline: "For all of your beverage emergencies, call on us, your Thirst Responders.",
} as const;

export interface MerchandiseDetails {
  shopUrl: string | null;
}

export const merchandise: MerchandiseDetails = {
  // Replace this with the pop-up shop URL when the vendor provides it.
  shopUrl: null,
};

export interface NavigationItem {
  label: string;
  href: string;
  isSectionLink: boolean;
}

export interface NavigationGroup {
  label: string;
  items: readonly NavigationItem[];
}

export const navigationGroups: readonly NavigationGroup[] = [
  {
    label: "Plan Your Event",
    items: [
      { label: "Services", href: "/#services", isSectionLink: true },
      { label: "Dirty Soda Bar", href: "/#dirty-soda", isSectionLink: true },
      { label: "Pricing", href: "/#pricing", isSectionLink: true },
      { label: "Contact", href: "/contact", isSectionLink: false },
    ],
  },
  {
    label: "Explore Ambu Bar",
    items: [
      { label: "About", href: "/#about", isSectionLink: true },
      { label: "Team", href: "/#team", isSectionLink: true },
      { label: "Gallery", href: "/#gallery", isSectionLink: true },
      { label: "Events", href: "/#events", isSectionLink: true },
      { label: "Ambu Bar Difference", href: "/#experience", isSectionLink: true },
    ],
  },
  {
    label: "Partners",
    items: [
      {
        label: "Wineries, Breweries & Spirits",
        href: "/#partners",
        isSectionLink: true,
      },
    ],
  },
];

export const navigationDirectLinks: readonly NavigationItem[] = [
  { label: "Merchandise", href: "/merchandise", isSectionLink: false },
];

export const navigationCta: NavigationItem = {
  label: "Book Now",
  href: "/contact",
  isSectionLink: false,
};

export interface PublicEvent {
  id: string;
  date: string;
  location: string;
  title: string;
  description: string;
  href?: string;
}

export const publicEvents: PublicEvent[] = [];

export type PartnerCategory = "Winery" | "Brewery" | "Spirits";

export interface FeaturedPartner {
  id: string;
  name: string;
  category: PartnerCategory;
  summary: string;
  websiteUrl: string;
  facebookUrl?: string;
  logoSrc?: string;
  logoAlt?: string;
}

export const featuredPartners: FeaturedPartner[] = [
  {
    id: "ridgewood-winery",
    name: "Ridgewood Winery",
    category: "Winery",
    summary:
      "Ridgewood Winery is an award-winning winery in Berks County with tasting room locations in Birdsboro and Bechtelsville, Pennsylvania.",
    websiteUrl: "https://www.ridgewoodwinery.com/",
    facebookUrl: "https://www.facebook.com/ridgewoodwinery/",
    logoSrc: "/images/image000000.heic",
    logoAlt: "Ridgewood Winery logo",
  },
];
