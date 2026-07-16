"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import {
  business,
  navigationCta,
  navigationDirectLinks,
  navigationGroups,
  type NavigationItem,
} from "@/src/content/site-content";

interface NavigationLinkProps {
  item: NavigationItem;
  className: string;
  onNavigate?: () => void;
  role?: "menuitem";
}

function NavigationLink({ item, className, onNavigate, role }: NavigationLinkProps) {
  if (item.isSectionLink) {
    return (
      <a href={item.href} className={className} onClick={onNavigate} role={role}>
        {item.label}
      </a>
    );
  }

  return (
    <Link href={item.href} className={className} onClick={onNavigate} role={role}>
      {item.label}
    </Link>
  );
}

export function SiteNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDesktopGroup, setOpenDesktopGroup] = useState<string | null>(null);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const desktopGroupButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 18);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const closeNavigationOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }

      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        setOpenMobileGroup(null);
        requestAnimationFrame(() => menuButtonRef.current?.focus());
      } else if (openDesktopGroup) {
        setOpenDesktopGroup(null);
        requestAnimationFrame(() => desktopGroupButtonRefs.current[openDesktopGroup]?.focus());
      }
    };

    window.addEventListener("keydown", closeNavigationOnEscape);

    return () => window.removeEventListener("keydown", closeNavigationOnEscape);
  }, [isMobileMenuOpen, openDesktopGroup]);

  useEffect(() => {
    if (!openDesktopGroup) {
      return;
    }

    const closeOnOutsidePress = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) {
        setOpenDesktopGroup(null);
      }
    };

    document.addEventListener("pointerdown", closeOnOutsidePress);

    return () => document.removeEventListener("pointerdown", closeOnOutsidePress);
  }, [openDesktopGroup]);

  const shellClasses = isScrolled
    ? "border-brand-border bg-brand-white/95 text-brand-charcoal shadow-[0_10px_35px_rgba(16,50,77,0.12)]"
    : "border-[rgba(255,255,255,0.14)] bg-brand-charcoal text-white";

  const linkClasses = isScrolled
    ? "text-brand-charcoal hover:text-brand-gold"
    : "text-white/95 hover:text-brand-gold-soft";

  const buttonClasses = isScrolled
    ? "border-brand-border text-brand-charcoal"
    : "border-white/70 text-white";

  const desktopMenuButtonClasses = isScrolled
    ? "text-brand-charcoal hover:text-brand-gold"
    : "text-white/95 hover:text-brand-gold-soft";

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenMobileGroup(null);
  };

  return (
    <header ref={headerRef} className={`sticky top-0 z-50 border-b transition-all duration-300 ease-out backdrop-blur-sm ${shellClasses}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
        <Link
          href="/#home"
          className="flex min-w-0 items-center gap-3"
          aria-label="Ambu Bar home"
          onClick={closeMobileMenu}
        >
          <span className="flex h-12 w-18 shrink-0 items-center justify-center overflow-hidden rounded-md border border-white/60 bg-white p-1 shadow-sm">
            <Image
              src="/images/5533a687-7fe0-462c-97b5-c7ba4cae07bb.jpeg"
              alt=""
              width={982}
              height={645}
              loading="eager"
              sizes="72px"
              className="h-full w-full object-contain"
            />
          </span>
          <span className="hidden text-sm font-semibold uppercase tracking-[0.35em] sm:block">
            Ambu Bar LLC
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-5 text-sm font-medium xl:flex">
          {navigationGroups.map((group) => {
            const isOpen = openDesktopGroup === group.label;
            const menuId = `desktop-${group.label.toLowerCase().replaceAll(" ", "-")}`;

            return (
              <div key={group.label} className="relative">
                <button
                  ref={(element) => {
                    desktopGroupButtonRefs.current[group.label] = element;
                  }}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={menuId}
                  aria-haspopup="menu"
                  className={`inline-flex min-h-11 items-center gap-1.5 px-1 transition-colors duration-200 ${desktopMenuButtonClasses}`}
                  onClick={() => setOpenDesktopGroup(isOpen ? null : group.label)}
                >
                  {group.label}
                  <ChevronDown
                    aria-hidden="true"
                    size={16}
                    className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen ? (
                  <div
                    id={menuId}
                    role="menu"
                    aria-label={group.label}
                    className="absolute left-0 top-full z-10 mt-3 min-w-60 rounded-md border border-brand-border bg-brand-white p-2 text-brand-charcoal shadow-[0_18px_38px_rgba(16,50,77,0.16)]"
                  >
                    {group.items.map((item) => (
                      <NavigationLink
                        key={item.label}
                        item={item}
                        role="menuitem"
                        className="block rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-brand-surface hover:text-brand-blue focus:bg-brand-surface focus:text-brand-blue"
                        onNavigate={() => setOpenDesktopGroup(null)}
                      />
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
          {navigationDirectLinks.map((item) => (
            <NavigationLink
              key={item.label}
              item={item}
              className={`inline-flex min-h-11 items-center px-1 transition-colors duration-200 ${linkClasses}`}
            />
          ))}
          <NavigationLink item={navigationCta} className="brand-button px-4 py-2 text-xs" />
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          className={`flex h-11 w-11 items-center justify-center rounded-full border transition-colors xl:hidden ${buttonClasses}`}
          onClick={() => {
            if (isMobileMenuOpen) {
              setOpenMobileGroup(null);
            }

            setIsMobileMenuOpen(!isMobileMenuOpen);
          }}
        >
          {isMobileMenuOpen ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
        </button>
      </div>

      {isMobileMenuOpen ? (
        <div id="mobile-navigation" className="border-t border-white/20 bg-brand-charcoal/95 px-6 py-5 xl:hidden">
          <nav aria-label="Mobile" className="mx-auto flex max-w-6xl flex-col text-sm font-medium text-white">
            <div className="grid grid-cols-2 gap-3 border-b border-white/15 pb-5">
              <NavigationLink item={navigationCta} className="brand-button px-3 py-3 text-xs" onNavigate={closeMobileMenu} />
              <a
                href={business.phoneHref}
                className="brand-button brand-button--secondary gap-2 px-3 py-3 text-xs"
              >
                <Phone aria-hidden="true" size={16} />
                Call
              </a>
            </div>

            <div className="divide-y divide-white/15">
              {navigationGroups.map((group) => {
                const isOpen = openMobileGroup === group.label;
                const panelId = `mobile-${group.label.toLowerCase().replaceAll(" ", "-")}`;

                return (
                  <div key={group.label}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="flex w-full items-center justify-between py-4 text-left text-base font-semibold transition-colors hover:text-brand-gold-soft"
                      onClick={() => setOpenMobileGroup(isOpen ? null : group.label)}
                    >
                      {group.label}
                      <ChevronDown
                        aria-hidden="true"
                        size={18}
                        className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {isOpen ? (
                      <div id={panelId} className="flex flex-col gap-1 pb-4 pl-3">
                        {group.items.map((item) => (
                          <NavigationLink
                            key={item.label}
                            item={item}
                            className="rounded-md px-3 py-2.5 text-white/85 transition-colors hover:bg-white/10 hover:text-white"
                            onNavigate={closeMobileMenu}
                          />
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>

            <div className="pt-4">
              {navigationDirectLinks.map((item) => (
                <NavigationLink
                  key={item.label}
                  item={item}
                  className="block rounded-md px-3 py-2.5 text-base font-semibold transition-colors hover:bg-white/10 hover:text-brand-gold-soft"
                  onNavigate={closeMobileMenu}
                />
              ))}
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
