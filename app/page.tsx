import {
  ContactSection,
  EventsSection,
  ExperienceSection,
  GallerySection,
  HeroSection,
  OverviewSection,
  PartnersSection,
  PricingSection,
  ProcessSection,
} from "@/src/components/home";
import { SiteFooter, SiteHeader } from "@/src/components/layout";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-brand-surface text-brand-text-primary">
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <HeroSection />
        <OverviewSection />
        <ProcessSection />
        <GallerySection />
        <EventsSection />
        <PartnersSection />
        <ExperienceSection />
        <PricingSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
