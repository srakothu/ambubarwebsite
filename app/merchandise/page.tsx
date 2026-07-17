import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ExternalLink, ShoppingBag } from "lucide-react";
import { SiteShell } from "@/src/components/layout";
import { merchandise } from "@/src/content/site-content";

const merchandiseDescription = merchandise.shopUrl
  ? "Shop official Ambu Bar apparel, drinkware, and Thirst Responders gear."
  : "Ambu Bar merchandise is on the way, including Thirst Responders apparel, drinkware, and more.";

export const metadata: Metadata = {
  title: "Merchandise",
  description: merchandiseDescription,
  alternates: {
    canonical: "/merchandise",
  },
  openGraph: {
    title: "Ambu Bar Merchandise",
    description: merchandiseDescription,
    type: "website",
    url: "/merchandise",
  },
};

export default function MerchandisePage() {
  const shopUrl = merchandise.shopUrl;

  return (
    <SiteShell>
      <section className="brand-section brand-section--tight">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="max-w-3xl">
          <p className="brand-subtitle">Merchandise</p>
          <h1 className="brand-heading mt-3 text-4xl font-semibold tracking-tight text-brand-black sm:text-5xl">
            {shopUrl ? "Suit up with the Thirst Responders." : "The Ambu Bar merch shop is on the way."}
          </h1>
          <p className="mt-6 text-lg leading-8 text-brand-text-muted">
            {shopUrl
              ? "Shop official Ambu Bar shirts, drinkware, and more—made for the people who know how to answer a beverage emergency in style."
              : "People have asked, and we are getting the Thirst Responders collection ready: branded shirts, drinkware, and more for fans of the Ambu Bar experience."}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            {shopUrl ? (
              <a
                href={shopUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="brand-button gap-2"
              >
                <ShoppingBag aria-hidden="true" size={17} />
                Shop merchandise
                <ExternalLink aria-hidden="true" size={15} />
              </a>
            ) : (
              <Link href="/contact" className="brand-button">
                Get shop updates
              </Link>
            )}
            <Link href="/#home" className="brand-button brand-button--secondary">
              Back to home
            </Link>
          </div>
          {!shopUrl ? (
            <p className="mt-5 text-sm leading-6 text-brand-text-muted">
              The shop button will appear here as soon as the pop-up store link is live.
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
