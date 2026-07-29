import Link from "next/link";
import { ExternalLink, ShoppingBag } from "lucide-react";
import {
  onlineStore,
  onlineStoreDestination,
} from "@/src/content/site-content";

export function OnlineStoreSection() {
  const isLive =
    onlineStore.onlineStoreIsLive && onlineStoreDestination.isExternal;
  const ctaLabel = isLive ? "Visit the Online Store" : "Preview the Online Store";

  return (
    <section
      id="online-store"
      aria-labelledby="online-store-heading"
      className="brand-section brand-section--tight"
    >
      <div className="brand-card relative overflow-hidden !border-brand-blue-dark !bg-brand-charcoal p-6 text-white sm:p-8 lg:p-10">
        <div
          aria-hidden="true"
          className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-brand-blue/35 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-24 left-1/3 h-52 w-52 rounded-full bg-brand-gold/15 blur-3xl"
        />

        <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <p className="brand-subtitle !text-brand-gold-soft">
                Ambu Bar Gear
              </p>
              {!isLive ? (
                <span className="inline-flex min-h-7 items-center rounded-full border border-brand-gold-soft/60 bg-brand-gold-soft/10 px-3 text-xs font-bold uppercase tracking-[0.14em] text-brand-gold-soft">
                  Coming Soon
                </span>
              ) : null}
            </div>
            <h2
              id="online-store-heading"
              className="brand-heading mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl"
            >
              {isLive
                ? "The Online Store is open."
                : "The Online Store is coming soon."}
            </h2>
            <p className="mt-4 text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
              {isLive
                ? "Shop Thirst Responders apparel, drinkware, and more."
                : "Thirst Responders apparel, drinkware, and more are on the way."}
            </p>
          </div>

          {onlineStoreDestination.isExternal ? (
            <a
              href={onlineStoreDestination.href}
              target="_blank"
              rel="noopener noreferrer"
              className="brand-button w-full gap-2 !bg-brand-gold !text-brand-blue-dark hover:!bg-brand-gold-soft lg:w-auto"
            >
              <ShoppingBag aria-hidden="true" size={18} />
              {ctaLabel}
              <ExternalLink aria-hidden="true" size={16} />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : (
            <Link
              href={onlineStoreDestination.href}
              className="brand-button w-full gap-2 !bg-brand-gold !text-brand-blue-dark hover:!bg-brand-gold-soft lg:w-auto"
            >
              <ShoppingBag aria-hidden="true" size={18} />
              {ctaLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
