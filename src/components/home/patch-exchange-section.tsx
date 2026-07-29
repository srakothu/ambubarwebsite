import Link from "next/link";
import { Flame, HeartPulse, Shield, Tags } from "lucide-react";

const responderGroups = [
  { label: "Fire", Icon: Flame },
  { label: "EMS", Icon: HeartPulse },
  { label: "Police", Icon: Shield },
] as const;

export function PatchExchangeSection() {
  return (
    <section
      id="patch-exchange"
      aria-labelledby="patch-exchange-heading"
      className="brand-section brand-section--tight"
    >
      <div className="brand-card overflow-hidden">
        <div aria-hidden="true" className="grid h-1.5 grid-cols-3">
          <span className="bg-brand-blue" />
          <span className="bg-brand-gold" />
          <span className="bg-brand-blue" />
        </div>

        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-10 lg:p-10">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-surface text-brand-blue lg:h-20 lg:w-20">
            <Tags aria-hidden="true" size={34} strokeWidth={1.7} />
          </div>

          <div>
            <p className="brand-subtitle !text-brand-blue">
              Community Program
            </p>
            <h2
              id="patch-exchange-heading"
              className="brand-heading mt-3 text-3xl font-semibold tracking-tight text-brand-black sm:text-4xl"
            >
              Patch Exchange Program
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-brand-charcoal sm:text-lg sm:leading-8">
              Bring us a patch from your Fire, EMS, or Police department, and
              we’ll exchange it for an Ambu Bar patch.
            </p>

            <ul
              aria-label="First responder department types"
              className="mt-6 flex flex-wrap gap-3"
            >
              {responderGroups.map(({ label, Icon }) => (
                <li
                  key={label}
                  className="inline-flex min-h-10 items-center gap-2 rounded-full border border-brand-border bg-brand-surface px-4 text-sm font-semibold text-brand-blue-dark"
                >
                  <Icon aria-hidden="true" size={17} strokeWidth={1.9} />
                  {label}
                </li>
              ))}
            </ul>

            <Link
              href="/contact"
              className="brand-button brand-button--secondary mt-7 w-full sm:w-auto"
            >
              Ask About the Patch Exchange
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
