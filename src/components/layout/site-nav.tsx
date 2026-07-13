"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { primaryNavigation } from "@/src/content/site-content";

export function SiteNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 18);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const closeMenuOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", closeMenuOnEscape);

    return () => window.removeEventListener("keydown", closeMenuOnEscape);
  }, []);

  const shellClasses = isScrolled
    ? "border-brand-border bg-brand-white/95 text-brand-charcoal shadow-[0_10px_35px_rgba(16,50,77,0.12)]"
    : "border-[rgba(255,255,255,0.14)] bg-brand-charcoal text-white";

  const linkClasses = isScrolled
    ? "text-brand-charcoal hover:text-brand-gold"
    : "text-white/95 hover:text-brand-gold-soft";

  const logoClasses = isScrolled
    ? "border-brand-gold bg-brand-surface text-brand-black"
    : "border-white/70 bg-white/10 text-white";

  const buttonClasses = isScrolled
    ? "border-brand-border text-brand-charcoal"
    : "border-white/70 text-white";

  return (
    <header className={`sticky top-0 z-50 border-b transition-all duration-300 ease-out backdrop-blur-sm ${shellClasses}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
        <Link
          href="/#home"
          className="flex items-center gap-3"
          aria-label="Ambu Bar home"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <span
            className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold uppercase tracking-[0.2em] ${logoClasses}`}
          >
            AB
          </span>
          <span className="text-sm font-semibold uppercase tracking-[0.35em]">
            Ambu Bar LLC
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 text-sm font-medium xl:flex">
          {primaryNavigation.map((item) =>
            item.isSectionLink ? (
              <a key={item.label} href={item.href} className={`transition-colors duration-200 ${linkClasses}`}>
                {item.label}
              </a>
            ) : (
              <Link key={item.label} href={item.href} className={`transition-colors duration-200 ${linkClasses}`}>
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <button
          type="button"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          className={`flex h-11 w-11 items-center justify-center rounded-full border transition-colors xl:hidden ${buttonClasses}`}
          onClick={() => setIsMobileMenuOpen((current) => !current)}
        >
          {isMobileMenuOpen ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
        </button>
      </div>

      {isMobileMenuOpen ? (
        <div id="mobile-navigation" className="border-t border-white/20 bg-brand-charcoal/95 px-6 py-4 xl:hidden">
          <nav aria-label="Mobile" className="flex flex-col gap-3 text-sm font-medium text-white">
            {primaryNavigation.map((item) =>
              item.isSectionLink ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="rounded-full px-3 py-2 transition-colors hover:bg-white/10"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="rounded-full px-3 py-2 transition-colors hover:bg-white/10"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
