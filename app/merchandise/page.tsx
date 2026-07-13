import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { SiteShell } from "@/src/components/layout";

export const metadata: Metadata = {
  title: "Merchandise",
  description:
    "Ambu Bar merchandise is coming soon, including Thirst Responders apparel and event-ready gear.",
  alternates: {
    canonical: "/merchandise",
  },
  openGraph: {
    title: "Ambu Bar Merchandise",
    description: "Thirst Responders apparel and event-ready gear are coming soon.",
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
          <p className="brand-subtitle">Merchandise</p>
          <h1 className="brand-heading mt-3 text-4xl font-semibold tracking-tight text-brand-black sm:text-5xl">
            Thirst Responders merchandise is coming soon.
          </h1>
          <p className="mt-6 text-lg leading-8 text-brand-text-muted">
            We are preparing a small collection of branded shirts, hats, and event-ready gear for hosts and fans of the Ambu Bar experience. Reach out to get updates when the shop opens.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/contact" className="brand-button">
              Contact Us
            </Link>
            <Link href="/#home" className="brand-button brand-button--secondary">
              Back to home
            </Link>
          </div>
          </div>
          <div className="brand-card brand-card--soft overflow-hidden">
            <Image
              src="/images/7c5f0b73-c4fd-4e3b-83dc-9b01a308904c.jpeg"
              alt="Blue Ambu Bar Thirst Responder T-shirt"
              width={1125}
              height={1607}
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="aspect-4/5 h-full w-full object-cover"
            />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
