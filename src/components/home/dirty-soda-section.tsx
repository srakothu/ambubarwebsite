import Image from "next/image";
import Link from "next/link";
import { GlassWater } from "lucide-react";
import {
  dirtySodaFavorites,
  featuredDirtySoda,
  mocktailSamples,
} from "@/src/content/site-content";
import { SectionHeading } from "./section-heading";

export function DirtySodaSection() {
  const [featuredMocktail, ...supportingMocktails] = mocktailSamples;

  return (
    <section
      id="dirty-soda"
      aria-labelledby="dirty-soda-heading"
      className="brand-section brand-section--tight"
    >
      <SectionHeading
        headingId="dirty-soda-heading"
        eyebrow="Dirty Soda & Mocktail Bar"
        title="Signature recipes with emergency-room flair."
        description="Explore Dirty Soda favorites and a few sample mocktails, all served with the playful details and polished presentation that make Ambu Bar memorable."
      />

      <article className="brand-card mt-8 overflow-hidden sm:mt-10">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
          <figure className="border-b border-brand-border bg-brand-charcoal p-4 sm:p-6 lg:border-b-0 lg:border-r lg:p-8">
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-brand-surface">
              <Image
                src={featuredDirtySoda.image.src}
                alt={featuredDirtySoda.image.alt}
                fill
                sizes="(max-width: 1023px) calc(100vw - 5rem), 28rem"
                className="object-cover"
              />
            </div>
            <figcaption className="flex items-center gap-3 px-1 pb-1 pt-4 text-white">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-brand-gold-soft">
                <GlassWater aria-hidden="true" size={21} strokeWidth={1.8} />
              </span>
              <div>
                <p className="font-semibold">{featuredDirtySoda.drink.name}</p>
                <p className="mt-0.5 text-sm text-white/75">A bright, creamy signature Dirty Soda.</p>
              </div>
            </figcaption>
          </figure>

          <div className="relative overflow-hidden p-6 sm:p-8 lg:p-10">
            <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-brand-blue/10 blur-2xl" />
            <div className="pointer-events-none absolute -left-12 bottom-0 h-36 w-36 rounded-full bg-brand-gold/15 blur-2xl" />

            <p className="brand-subtitle !text-brand-blue">Signature menu</p>
            <h3 className="mt-4 text-2xl font-semibold text-brand-black sm:text-3xl">Dirty Soda Favorites</h3>
            <p className="mt-3 max-w-2xl text-base leading-7 text-brand-charcoal">
              Choose a featured recipe or ask about including the Dirty Soda & Mocktail upgrade with your package.
            </p>

            <ul className="mt-6 flex flex-wrap justify-center gap-3">
              {dirtySodaFavorites.map((item, index) => (
                <li
                  key={item.name}
                  className="relative flex w-full gap-4 rounded-lg border border-brand-border bg-white p-5 sm:w-[calc(50%_-_0.375rem)]"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-surface text-xs font-bold tracking-[0.12em] text-brand-blue">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-base font-semibold text-brand-black">{item.name}</p>
                    <p className="mt-1 text-sm leading-6 text-brand-charcoal">{item.ingredients}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col gap-4 rounded-lg bg-brand-charcoal p-5 text-white sm:flex-row sm:items-center sm:p-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-brand-gold-soft">
                <GlassWater aria-hidden="true" size={23} strokeWidth={1.8} />
              </span>
              <div>
                <p className="text-base font-semibold">Dirty Soda & Mocktail Upgrade</p>
                <p className="mt-1 text-sm leading-6 text-white/80">
                  $50 for Triage or $50 per 50 guests for B.L.S. and A.L.S.
                </p>
              </div>
            </div>

            <Link href="/#pricing" className="brand-button mt-6 w-full sm:w-auto">
              Compare Package Upgrades
            </Link>
          </div>
        </div>
      </article>

      <article className="brand-card mt-6 overflow-hidden sm:mt-8">
        <div className="border-b border-brand-border bg-brand-surface px-6 py-6 sm:px-8 lg:px-10">
          <p className="brand-subtitle !text-brand-blue">Alcohol-free inspiration</p>
          <h3 className="mt-3 text-2xl font-semibold text-brand-black sm:text-3xl">Mocktail Samples</h3>
          <p className="mt-3 max-w-3xl text-base leading-7 text-brand-charcoal">
            A few examples of the alcohol-free drinks our E.M.T.s can create. Custom mocktail
            options may be tailored to your event.
          </p>
        </div>

        <div className="grid gap-4 p-4 sm:p-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:p-8">
          <figure className="overflow-hidden rounded-lg bg-brand-charcoal text-white sm:mx-auto sm:w-full sm:max-w-xl lg:mx-0 lg:max-w-none">
            <div className="relative aspect-[3/4] overflow-hidden bg-brand-charcoal">
              <Image
                src={featuredMocktail.image.src}
                alt={featuredMocktail.image.alt}
                fill
                sizes="(max-width: 767px) calc(100vw - 5rem), (max-width: 1023px) calc(100vw - 7rem), 34rem"
                className="object-cover object-center"
              />
            </div>
            <figcaption className="border-t border-white/15 p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-brand-gold-soft">
                  <GlassWater aria-hidden="true" size={21} strokeWidth={1.8} />
                </span>
                <div>
                  <p className="text-xl font-semibold">{featuredMocktail.name}</p>
                  <p className="mt-2 text-sm leading-6 text-white/80">{featuredMocktail.ingredients}</p>
                </div>
              </div>
            </figcaption>
          </figure>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:gap-6">
            {supportingMocktails.map((mocktail) => (
              <figure
                key={mocktail.name}
                className="grid overflow-hidden rounded-lg border border-brand-border bg-white lg:grid-cols-[0.82fr_1.18fr]"
              >
                <div className="relative aspect-[2/3] overflow-hidden bg-brand-charcoal lg:aspect-auto lg:min-h-72">
                  <Image
                    src={mocktail.image.src}
                    alt={mocktail.image.alt}
                    fill
                    sizes="(max-width: 767px) calc(100vw - 5rem), (max-width: 1023px) calc(50vw - 4rem), 15rem"
                    className="object-cover object-center"
                  />
                </div>
                <figcaption className="flex flex-col justify-center p-5 sm:p-6">
                  <p className="brand-subtitle !text-brand-blue">Sample mocktail</p>
                  <p className="mt-2 text-xl font-semibold text-brand-black">{mocktail.name}</p>
                  <p className="mt-2 text-sm leading-6 text-brand-charcoal">{mocktail.ingredients}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </article>
    </section>
  );
}
