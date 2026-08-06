import Link from "next/link";
import type { Metadata } from "next";
import { Siren } from "lucide-react";
import { SiteShell } from "@/src/components/layout";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you requested could not be found.",
};

export default function NotFound() {
  return (
    <SiteShell>
      <section className="brand-section flex min-h-[60vh] items-center">
        <div className="max-w-2xl">
          <Siren aria-hidden="true" size={42} className="text-brand-blue" />
          <p className="brand-subtitle mt-6">404</p>
          <h1 className="brand-heading mt-3 text-4xl font-semibold text-brand-black sm:text-5xl">
            This page did not make the call sheet.
          </h1>
          <p className="mt-5 text-lg leading-8 text-brand-text-muted">
            The address may have changed, or it may not exist. Head back to Ambu Bar and we will get you where you need to go.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/" className="brand-button">
              Return Home
            </Link>
            <Link href="/contact" className="brand-button brand-button--secondary">
              Contact Ambu Bar
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
