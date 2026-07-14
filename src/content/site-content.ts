export const footerQuickLinks = [
      { label: "About", href: "/#about", isSectionLink: true },
      { label: "Team", href: "/#team", isSectionLink: true },
      { label: "Services", href: "/#services", isSectionLink: true },
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
  ownerExperience: "Retired firefighter and EMT with more than 32 years of service",
} as const;

export interface MerchandiseDetails {
  shopUrl: string | null;
}

export const merchandise: MerchandiseDetails = {
  // Replace this with the pop-up shop URL when the vendor provides it.
  shopUrl: null,
};

export const primaryNavigation = [
  { label: "Home", href: "/#home", isSectionLink: true },
  { label: "About", href: "/#about", isSectionLink: true },
  { label: "Team", href: "/#team", isSectionLink: true },
  { label: "Services", href: "/#services", isSectionLink: true },
  { label: "Pricing", href: "/#pricing", isSectionLink: true },
  { label: "Gallery", href: "/#gallery", isSectionLink: true },
  { label: "Partners", href: "/#partners", isSectionLink: true },
  { label: "Events", href: "/#events", isSectionLink: true },
  { label: "Merchandise", href: "/merchandise", isSectionLink: false },
  { label: "Contact", href: "/contact", isSectionLink: false },
] as const;

export interface PublicEvent {
  id: string;
  date: string;
  location: string;
  title: string;
  description: string;
  href?: string;
}

export const publicEvents: PublicEvent[] = [];

export interface PartnerOpportunity {
  id: string;
  title: string;
  description: string;
}

export const partnerOpportunities: PartnerOpportunity[] = [
  {
    id: "wineries",
    title: "Wineries & vineyards",
    description: "Pair thoughtful pours with a mobile setup that keeps guests moving.",
  },
  {
    id: "breweries",
    title: "Breweries & beverage makers",
    description: "Bring a memorable taproom-style presence to markets, releases, and festivals.",
  },
  {
    id: "venues",
    title: "Venues & event teams",
    description: "Offer hosts an experienced, turnkey beverage partner for the big day.",
  },
  {
    id: "community",
    title: "Community organizations",
    description: "Create crowd-friendly service for fundraisers, festivals, and local gatherings.",
  },
];
