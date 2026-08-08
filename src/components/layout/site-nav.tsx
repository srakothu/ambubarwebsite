"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ExternalLink, Mail, Menu, Phone, X } from "lucide-react";
import {
  business,
  navigationCta,
  navigationDirectLinks,
  navigationGroups,
  socialLinks,
  type NavigationItem,
} from "@/src/content/site-content";

interface NavigationLinkProps {
  item: NavigationItem;
  className: string;
  currentPath: string;
  onNavigate?: () => void;
}

function NavigationLink({ item, className, currentPath, onNavigate }: NavigationLinkProps) {
  if (item.isExternal) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onNavigate}
      >
        {item.label}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  if (item.isSectionLink) {
    return (
      <a href={item.href} className={className} onClick={onNavigate}>
        {item.label}
      </a>
    );
  }

  return (
    <Link
      href={item.href}
      className={className}
      onClick={onNavigate}
      aria-current={currentPath === item.href ? "page" : undefined}
    >
      {item.label}
    </Link>
  );
}

export function SiteNav() {
  const pathname = usePathname();
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

  const buttonClasses = isScrolled
    ? "border-brand-border text-brand-charcoal"
    : "border-white/70 text-white";

  const desktopMenuButtonClasses = isScrolled
    ? "text-brand-charcoal hover:text-brand-blue"
    : "text-white/95 hover:text-brand-gold-soft";

  const storeLinkClasses = isScrolled
    ? "border-brand-blue/35 bg-brand-blue/8 text-brand-blue hover:border-brand-blue hover:bg-brand-blue hover:text-white"
    : "border-brand-gold-soft/65 bg-white/10 text-brand-gold-soft hover:bg-brand-gold-soft hover:text-brand-blue-dark";

  const logoFrameClasses = isScrolled ? "border-brand-border" : "border-white/60";

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenMobileGroup(null);
  };

  return (
    <header ref={headerRef} className={`sticky top-0 z-50 border-b transition-all duration-300 ease-out backdrop-blur-sm ${shellClasses}`}>
      <nav aria-label="Contact and social media" className="bg-brand-blue text-white">
        <div className="mx-auto flex min-h-10 max-w-6xl items-center justify-between gap-3 px-4 text-xs font-semibold sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-1 sm:gap-2">
            <a
              href={business.phoneHref}
              className="inline-flex min-h-9 items-center gap-2 rounded-md px-2 transition-colors hover:bg-white/10 focus-visible:outline-brand-gold"
              aria-label={`Call Ambu Bar at ${business.phone}`}
            >
              <Phone aria-hidden="true" size={15} />
              <span className="sm:hidden">Call</span>
              <span className="hidden sm:inline">{business.phone}</span>
            </a>
            <a
              href={business.emailHref}
              className="hidden min-h-9 items-center gap-2 rounded-md px-2 transition-colors hover:bg-white/10 focus-visible:outline-brand-gold md:inline-flex"
              aria-label={`Email Ambu Bar at ${business.email}`}
            >
              <Mail aria-hidden="true" size={15} />
              {business.email}
            </a>
          </div>

          <ul className="flex shrink-0 items-center gap-1 sm:gap-2">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-9 items-center gap-1.5 rounded-md px-2 transition-colors hover:bg-white/10 focus-visible:outline-brand-gold"
                  aria-label={`Follow ${business.name} on ${link.label} (opens in a new tab)`}
                >
                  {link.label}
                  <ExternalLink aria-hidden="true" size={13} className="hidden sm:block" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
        <Link
          href="/#home"
          className="flex min-w-0 items-center gap-3"
          aria-label="Ambu Bar home"
          aria-current={pathname === "/" ? "page" : undefined}
          onClick={closeMobileMenu}
        >
          <span className={`flex h-12 w-18 shrink-0 items-center justify-center overflow-hidden rounded-md border bg-white p-1 shadow-sm ${logoFrameClasses}`}>
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
              <div
                key={group.label}
                className="relative"
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) {
                    setOpenDesktopGroup(null);
                  }
                }}
              >
                <button
                  ref={(element) => {
                    desktopGroupButtonRefs.current[group.label] = element;
                  }}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={menuId}
                  className={`inline-flex min-h-11 items-center gap-1.5 px-1 transition-colors duration-200 ${desktopMenuButtonClasses}`}
                  onClick={() => setOpenDesktopGroup(isOpen ? null : group.label)}
                  onKeyDown={(event) => {
                    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") {
                      return;
                    }

                    event.preventDefault();
                    setOpenDesktopGroup(group.label);
                    requestAnimationFrame(() => {
                      const links = document.getElementById(menuId)?.querySelectorAll<HTMLAnchorElement>("a");
                      const target = event.key === "ArrowUp" ? links?.item(links.length - 1) : links?.item(0);
                      target?.focus();
                    });
                  }}
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
                    className="absolute left-0 top-full z-10 mt-3 min-w-60 rounded-md border border-brand-border bg-brand-white p-2 text-brand-charcoal shadow-[0_18px_38px_rgba(16,50,77,0.16)]"
                  >
                    {group.items.map((item) => (
                      <NavigationLink
                        key={item.label}
                        item={item}
                        currentPath={pathname}
                        className="block rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-brand-surface hover:text-brand-blue focus:bg-brand-surface focus:text-brand-blue aria-[current=page]:bg-brand-surface aria-[current=page]:text-brand-blue"
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
              currentPath={pathname}
              className={`inline-flex min-h-11 items-center rounded-md border px-3 text-xs font-bold uppercase tracking-[0.12em] transition-colors duration-200 ${storeLinkClasses}`}
              onNavigate={() => setOpenDesktopGroup(null)}
            />
          ))}
          <NavigationLink
            item={navigationCta}
            currentPath={pathname}
            className="brand-button px-4 py-2 text-xs"
            onNavigate={() => setOpenDesktopGroup(null)}
          />
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
        <div id="mobile-navigation" className="max-h-[calc(100dvh-7.5rem)] overflow-y-auto overscroll-contain border-t border-white/20 bg-brand-charcoal/95 px-6 py-5 xl:hidden">
          <nav aria-label="Mobile" className="mx-auto flex max-w-6xl flex-col text-sm font-medium text-white">
            <div className="grid grid-cols-2 gap-3 border-b border-white/15 pb-5">
              <NavigationLink item={navigationCta} currentPath={pathname} className="brand-button px-3 py-3 text-xs" onNavigate={closeMobileMenu} />
              <a
                href={business.phoneHref}
                className="brand-button brand-button--secondary gap-2 px-3 py-3 text-xs"
                onClick={closeMobileMenu}
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
                            currentPath={pathname}
                            className="rounded-md px-3 py-2.5 text-white/85 transition-colors hover:bg-white/10 hover:text-white aria-[current=page]:bg-white/10 aria-[current=page]:text-white"
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
                  currentPath={pathname}
                  className="block rounded-md border border-brand-gold-soft/50 bg-white/5 px-3 py-3 text-center text-sm font-bold uppercase tracking-[0.12em] text-brand-gold-soft transition-colors hover:bg-white/10 hover:text-white"
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
