import { siteUrl } from "../lib/site-url";

export interface NavigationItem {
  label: string;
  href: string;
  isSectionLink: boolean;
  isExternal?: boolean;
}

export interface OnlineStoreConfig {
  onlineStoreUrl: string | null;
  onlineStoreIsLive: boolean;
}

export const onlineStore: OnlineStoreConfig = {
  // Supply the vendor URL and set this flag to true when the store launches.
  onlineStoreUrl: null,
  onlineStoreIsLive: false,
};

function getOnlineStoreDestination(config: OnlineStoreConfig) {
  if (config.onlineStoreIsLive && config.onlineStoreUrl) {
    try {
      const url = new URL(config.onlineStoreUrl);

      if (url.protocol === "https:" || url.protocol === "http:") {
        return { href: url.toString(), isExternal: true } as const;
      }
    } catch {
      // An incomplete or invalid vendor URL falls back to the local preview page.
    }
  }

  return { href: "/merchandise", isExternal: false } as const;
}

export const onlineStoreDestination = getOnlineStoreDestination(onlineStore);

export type MerchandiseAvailability =
  | "coming-soon"
  | "available-at-events"
  | "available-online";

export interface MerchandiseItem {
  id: string;
  title: string;
  description: string;
  availability: {
    status: MerchandiseAvailability;
    label: string;
  };
  image: {
    src: string;
    alt: string;
  } | null;
  price: string | null;
  onlineStoreUrl: string | null;
}

export const merchandiseItems: readonly MerchandiseItem[] = [
  {
    id: "ambu-bar-challenge-coins",
    title: "Ambu Bar Challenge Coins",
    description:
      "Official Ambu Bar challenge coins will be available for purchase at select Ambu Bar events.",
    availability: {
      status: "coming-soon",
      label: "Coming Soon",
    },
    image: null,
    price: null,
    onlineStoreUrl: null,
  },
];

export interface DirtySodaFavorite {
  name: string;
  ingredients: string;
}

export const dirtySodaFavorites: readonly DirtySodaFavorite[] = [
  {
    name: "Code Blue Razz",
    ingredients: "Blue raspberry syrup, vanilla syrup, lemon-lime soda, and cream.",
  },
  {
    name: "Firehouse Float",
    ingredients: "Vanilla syrup, root beer, and cream. Inspired by a classic root beer float.",
  },
  {
    name: "Strawberry Stat",
    ingredients: "Strawberry syrup, vanilla syrup, lemon-lime soda, and cream.",
  },
  {
    name: "Health Elixer",
    ingredients: "Strawberry syrup, banana syrup, banana puree, and lemon-lime soda.",
  },
  {
    name: "IV Drip",
    ingredients: "Coconut syrup, Dr Pepper, and cream.",
  },
];

export const featuredDirtySoda = {
  drink: dirtySodaFavorites[0],
  image: {
    src: "/images/dirty-soda/code-blue-razz.jpg",
    alt: "Blue Code Blue Razz dirty soda topped with cream",
  },
} as const;

export interface MocktailSample {
  name: string;
  ingredients: string;
  image: {
    src: string;
    alt: string;
  };
}

export const mocktailSamples: readonly MocktailSample[] = [
  {
    name: "Plasma Infusion",
    ingredients: "Blue curaçao syrup, coconut syrup, pineapple juice, and club soda.",
    image: {
      src: "/images/dirty-soda/plasma-infusion.jpg",
      alt: "Green Plasma Infusion mocktail with orange garnish",
    },
  },
  {
    name: "Medical No-jito",
    ingredients: "Fresh mint, mojito mix with lime juice, and club soda.",
    image: {
      src: "/images/dirty-soda/medical-no-jito.jpg",
      alt: "Medical No-jito mocktail with fresh mint and lime",
    },
  },
  {
    name: "Trauma Tonic",
    ingredients: "Blueberry syrup, lemon juice, and Sprite.",
    image: {
      src: "/images/dirty-soda/trauma-tonic.jpg",
      alt: "Trauma Tonic mocktail with blueberry syrup and lemon",
    },
  },
];

export const footerQuickLinks: readonly NavigationItem[] = [
  { label: "About", href: "/#about", isSectionLink: true },
  { label: "Team", href: "/#team", isSectionLink: true },
  { label: "Services", href: "/#services", isSectionLink: true },
  { label: "Dirty Soda", href: "/#dirty-soda", isSectionLink: true },
  { label: "Gallery", href: "/#gallery", isSectionLink: true },
  {
    label: "Patch Exchange",
    href: "/#patch-exchange",
    isSectionLink: true,
  },
  {
    label: "Online Store",
    href: onlineStoreDestination.href,
    isSectionLink: false,
    isExternal: onlineStoreDestination.isExternal,
  },
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
  website: siteUrl,
  tagline: "For all of your beverage emergencies, call on us, your Thirst Responders.",
} as const;

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
      {
        label: "Preferred Partners",
        href: "/#partners",
        isSectionLink: true,
      },
      {
        label: "Patch Exchange",
        href: "/#patch-exchange",
        isSectionLink: true,
      },
      { label: "Ambu Bar Difference", href: "/#experience", isSectionLink: true },
    ],
  },
];

export const navigationDirectLinks: readonly NavigationItem[] = [
  {
    label: "Online Store",
    href: onlineStoreDestination.href,
    isSectionLink: false,
    isExternal: onlineStoreDestination.isExternal,
  },
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

export type PartnerCategory = "Winery" | "Brewery" | "Coffee" | "Spirits";

export interface PartnerMedia {
  src: string;
  alt: string;
  presentation: "logo" | "photo";
  surface?: "light" | "dark";
  inset?: "compact" | "standard";
  objectPosition?: string;
}

export interface FeaturedPartner {
  id: string;
  name: string;
  category: PartnerCategory;
  summary: string;
  websiteUrl: string;
  facebookUrl?: string;
  media: PartnerMedia;
  availabilityNote?: string;
  supportingMedia?: PartnerMedia;
}

export const featuredPartners: FeaturedPartner[] = [
  {
    id: "ridgewood-winery",
    name: "Ridgewood Winery",
    category: "Winery",
    summary:
      "An award-winning Berks County winery with tasting rooms in Birdsboro and Bechtelsville, Pennsylvania.",
    websiteUrl: "https://www.ridgewoodwinery.com/",
    facebookUrl: "https://www.facebook.com/ridgewoodwinery/",
    media: {
      src: "/images/partners/ridgewood-winery-logo.png",
      alt: "Ridgewood Winery logo",
      presentation: "logo",
      inset: "compact",
    },
  },
  {
    id: "firehouse-coffee",
    name: "Firehouse Coffee",
    category: "Coffee",
    summary:
      "Ambu Bar is proud to be part of Firehouse Coffee’s Bean Team. Firehouse Coffee is based in Maxatawny, Pennsylvania.",
    websiteUrl: "https://firehousecoffee.com/",
    media: {
      src: "/images/partners/firehouse-coffee-bean-team.jpg",
      alt: "Firehouse Coffee Bean Team display",
      presentation: "photo",
      objectPosition: "center 43%",
    },
  },
  {
    id: "boardroom-spirits",
    name: "Boardroom Spirits",
    category: "Spirits",
    summary:
      "A sustainable, family-owned distillery based in Lansdale, Pennsylvania, offering spirits and ready-to-drink cocktails.",
    availabilityNote:
      "Gamer Brewing beer is also available through Boardroom Spirits. Ask about availability for your event.",
    supportingMedia: {
      src: "/images/partners/gamer-brewing-beer-cans.jpg",
      alt: "Assorted Gamer Brewing beer cans",
      presentation: "photo",
      objectPosition: "center top",
    },
    websiteUrl: "https://boardroomspirits.com/",
    media: {
      src: "/images/partners/boardroom-spirits-logo.png",
      alt: "Boardroom Spirits logo",
      presentation: "logo",
      surface: "dark",
    },
  },
];
