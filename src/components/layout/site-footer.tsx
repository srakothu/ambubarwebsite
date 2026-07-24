import Link from "next/link";
import Image from "next/image";
import { ArrowUp, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import {
  business,
  footerQuickLinks,
  socialLinks,
  socialLinksComingSoon,
} from "@/src/content/site-content";

export function SiteFooter() {
  return (
    <footer className="border-t border-brand-border bg-brand-charcoal text-brand-white">
      <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div className="space-y-4">
            <Link
              href="/#home"
              className="block w-36 overflow-hidden rounded-md border border-white/30 bg-white p-1.5 shadow-sm"
              aria-label="Ambu Bar home"
            >
              <Image
                src="/images/5533a687-7fe0-462c-97b5-c7ba4cae07bb.jpeg"
                alt="Ambu-Bar Thirst Responder logo"
                width={982}
                height={645}
                sizes="144px"
                className="h-auto w-full"
              />
            </Link>
            <p className="brand-subtitle text-brand-gold-soft">{business.name}</p>
            <h2 className="brand-heading text-2xl sm:text-3xl">
              A real ambulance. A memorable bar. Service your guests can count on.
            </h2>
            <p className="max-w-md text-sm leading-7 text-zinc-300">
              {business.tagline}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-gold-soft">
              Quick links
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-zinc-300">
              {footerQuickLinks.map((link) => (
                <li key={link.label}>
                  {link.isSectionLink ? (
                    <a href={link.href} className="transition-colors hover:text-brand-gold-soft">
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href} className="transition-colors hover:text-brand-gold-soft">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-gold-soft">
              Contact
            </h3>
            <address className="space-y-1 text-sm not-italic">
              <a
                href={business.phoneHref}
                className="-mx-3 flex min-h-11 items-center gap-3 rounded-md px-3 text-white transition-colors hover:bg-white/10 focus-visible:outline-brand-gold"
                aria-label={`Call or text Ambu Bar at ${business.phone}`}
              >
                <Phone aria-hidden="true" size={18} className="shrink-0 text-brand-gold-soft" />
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-zinc-300">Call or text</span>
                  <span className="mt-0.5 block">{business.phone}</span>
                </span>
              </a>
              <a
                href={business.emailHref}
                className="-mx-3 flex min-h-11 items-center gap-3 rounded-md px-3 text-white transition-colors hover:bg-white/10 focus-visible:outline-brand-gold"
                aria-label={`Email Ambu Bar at ${business.email}`}
              >
                <Mail aria-hidden="true" size={18} className="shrink-0 text-brand-gold-soft" />
                <span className="min-w-0">
                  <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-zinc-300">Email</span>
                  <span className="mt-0.5 block break-all">{business.email}</span>
                </span>
              </a>
              <p className="-mx-3 flex min-h-11 items-center gap-3 px-3 text-zinc-300">
                <MapPin aria-hidden="true" size={18} className="shrink-0 text-brand-gold-soft" />
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-[0.14em]">Based in</span>
                  <span className="mt-0.5 block text-white">{business.location}</span>
                </span>
              </p>
            </address>
            <div className="pt-2">
              <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-gold-soft">
                Follow Ambu Bar
              </h4>
              <ul className="mt-3 grid grid-cols-2 gap-2 text-sm">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 w-full items-center justify-between gap-2 rounded-md border border-white/25 bg-white/5 px-3 font-semibold text-white transition-colors hover:border-brand-gold-soft hover:bg-white/10 focus-visible:outline-brand-gold"
                      aria-label={`Follow ${business.name} on ${link.label} (opens in a new tab)`}
                    >
                      {link.label}
                      <ExternalLink aria-hidden="true" size={15} />
                    </a>
                  </li>
                ))}
              </ul>
              {socialLinksComingSoon.length > 0 ? (
                <p className="mt-3 text-xs text-zinc-300">
                  {socialLinksComingSoon.join(", ")} updates coming soon.
                </p>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 {business.legalName}. All rights reserved.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-medium text-brand-gold-soft transition-colors hover:text-brand-white"
          >
            Back to top
            <ArrowUp aria-hidden="true" size={16} strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
