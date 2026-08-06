import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ExternalLink, ShoppingBag } from "lucide-react";
import { SiteShell } from "@/src/components/layout";
import {
  onlineStore,
  onlineStoreDestination,
} from "@/src/content/site-content";

const onlineStoreIsLive =
  onlineStore.onlineStoreIsLive && onlineStoreDestination.isExternal;
const onlineStoreDescription = onlineStoreIsLive
  ? "Shop official Ambu Bar apparel, drinkware, and Thirst Responders gear."
  : "The Ambu Bar Online Store is coming soon, with Thirst Responders apparel, drinkware, and more on the way.";

export const metadata: Metadata = {
  title: "Online Store",
  description: onlineStoreDescription,
  alternates: {
    canonical: "/merchandise",
  },
  openGraph: {
    title: "Ambu Bar Online Store",
    description: onlineStoreDescription,
    type: "website",
    url: "/merchandise",
  },
};

export default function MerchandisePage() {
  return (
    <SiteShell>
      <section className="brand-section brand-section--tight">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <p className="brand-subtitle">Online Store</p>
              {!onlineStoreIsLive ? (
                <span className="inline-flex min-h-7 items-center rounded-full border border-brand-blue/30 bg-brand-blue/8 px-3 text-xs font-bold uppercase tracking-[0.14em] text-brand-blue">
                  Coming Soon
                </span>
              ) : null}
            </div>
            <h1 className="brand-heading mt-3 text-4xl font-semibold tracking-tight text-brand-black sm:text-5xl">
              {onlineStoreIsLive
                ? "Suit up with the Thirst Responders."
                : "The Online Store is coming soon."}
            </h1>
            <p className="mt-6 text-lg leading-8 text-brand-text-muted">
              {onlineStoreIsLive
                ? "Shop official Ambu Bar shirts, drinkware, and more—made for the people who know how to answer a beverage emergency in style."
                : "People have asked, and we are getting the Thirst Responders collection ready: branded shirts, drinkware, and more for fans of the Ambu Bar experience."}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              {onlineStoreIsLive ? (
                <a
                  href={onlineStoreDestination.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brand-button gap-2"
                >
                  <ShoppingBag aria-hidden="true" size={17} />
                  Visit the Online Store
                  <ExternalLink aria-hidden="true" size={15} />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                <Link href="/contact" className="brand-button">
                  Get Online Store updates
                </Link>
              )}
              <Link href="/#home" className="brand-button brand-button--secondary">
                Back to home
              </Link>
            </div>
            {!onlineStoreIsLive ? (
              <p className="mt-5 text-sm leading-6 text-brand-text-muted">
                The Online Store button will appear here as soon as the store link is live.
              </p>
            ) : null}
          </div>
          <div className="brand-card brand-card--soft overflow-hidden">
            <Image
              src="/images/7c5f0b73-c4fd-4e3b-83dc-9b01a308904c.jpeg"
              alt="Blue Ambu Bar Thirst Responder T-shirt"
              width={1125}
              height={1607}
              loading="eager"
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="aspect-4/5 h-full w-full object-cover"
            />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
