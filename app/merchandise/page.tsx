import Link from "next/link";
import Image from "next/image";
import { ExternalLink, PackageOpen, ShoppingBag } from "lucide-react";
import { SiteShell } from "@/src/components/layout";
import {
  merchandiseItems,
  onlineStore,
  onlineStoreDestination,
  type MerchandiseItem,
} from "@/src/content/site-content";
import { createPageMetadata } from "@/src/lib/page-metadata";

const onlineStoreIsLive =
  onlineStore.onlineStoreIsLive && onlineStoreDestination.isExternal;
const onlineStoreDescription = onlineStoreIsLive
  ? "Shop official Ambu Bar apparel, drinkware, and Thirst Responders gear."
  : "The Ambu Bar Online Store is coming soon, with Thirst Responders apparel, drinkware, and more on the way.";

export const metadata = createPageMetadata({
  title: "Online Store",
  socialTitle: "Ambu Bar Online Store",
  description: onlineStoreDescription,
  path: "/merchandise",
});

function MerchandiseMedia({ item }: { item: MerchandiseItem }) {
  if (item.image) {
    return (
      <div className="relative min-h-72 overflow-hidden bg-brand-surface sm:min-h-80">
        <Image
          src={item.image.src}
          alt={item.image.alt}
          fill
          sizes="(max-width: 767px) calc(100vw - 3rem), 32rem"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div className="relative flex min-h-64 items-center justify-center overflow-hidden bg-brand-charcoal p-8 text-center text-white sm:min-h-80">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 grid h-1.5 grid-cols-3">
        <span className="bg-brand-blue" />
        <span className="bg-brand-gold" />
        <span className="bg-brand-blue" />
      </div>
      <div className="relative flex flex-col items-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/10 text-brand-gold-soft">
          <PackageOpen aria-hidden="true" size={36} strokeWidth={1.6} />
        </span>
        <p className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-white/80">
          Product photo coming soon
        </p>
      </div>
    </div>
  );
}

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
              ) : null}
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
              fetchPriority="high"
              sizes="(max-width: 1023px) 100vw, 42vw"
              className="aspect-4/5 h-full w-full object-cover"
            />
          </div>
        </div>

        <section className="mt-14 border-t border-brand-border pt-12 sm:mt-16 sm:pt-14" aria-labelledby="merchandise-heading">
          <div className="max-w-3xl">
            <p className="brand-subtitle">Event merchandise</p>
            <h2 id="merchandise-heading" className="brand-heading mt-3 text-3xl font-semibold text-brand-black sm:text-4xl">
              Official Ambu Bar gear on the way.
            </h2>
            <p className="mt-4 text-base leading-7 text-brand-text-muted sm:text-lg sm:leading-8">
              Preview announced merchandise while products and event availability are still being prepared.
            </p>
          </div>

          <div className="mt-8 grid gap-6 sm:mt-10">
            {merchandiseItems.map((item) => (
              <article key={item.id} className="brand-card overflow-hidden md:grid md:grid-cols-[0.85fr_1.15fr] md:items-stretch">
                <MerchandiseMedia item={item} />
                <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                  <span className="inline-flex min-h-7 w-fit items-center rounded-full border border-brand-blue/30 bg-brand-blue/8 px-3 text-xs font-bold uppercase tracking-[0.14em] text-brand-blue">
                    {item.availability.label}
                  </span>
                  <h3 className="mt-5 text-2xl font-semibold text-brand-black sm:text-3xl">{item.title}</h3>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-brand-text-muted sm:text-lg sm:leading-8">
                    {item.description}
                  </p>
                  {item.availability.status !== "coming-soon" && item.price ? (
                    <p className="mt-5 text-xl font-semibold text-brand-black">{item.price}</p>
                  ) : null}
                  {item.availability.status === "available-online" && item.onlineStoreUrl ? (
                    <a
                      href={item.onlineStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="brand-button mt-6 w-full gap-2 sm:w-fit"
                    >
                      View in Online Store
                      <ExternalLink aria-hidden="true" size={16} />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </SiteShell>
  );
}
