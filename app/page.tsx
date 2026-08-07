import {
  ContactSection,
  DirtySodaSection,
  EventsSection,
  ExperienceSection,
  GallerySection,
  HeroSection,
  OnlineStoreSection,
  OverviewSection,
  PatchExchangeSection,
  PartnersSection,
  PricingSection,
  ServicesSection,
  TeamSection,
} from "@/src/components/home";
import { SiteShell } from "@/src/components/layout";

export default function Home() {
  return (
    <SiteShell>
      <HeroSection />
      <OverviewSection />
      <ServicesSection />
      <DirtySodaSection />
      <ExperienceSection />
      <PricingSection />
      <TeamSection />
      <GallerySection />
      <PartnersSection />
      <PatchExchangeSection />
      <EventsSection />
      <OnlineStoreSection />
      <ContactSection />
    </SiteShell>
  );
}
