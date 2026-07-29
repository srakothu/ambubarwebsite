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
  ProcessSection,
  TeamSection,
} from "@/src/components/home";
import { SiteShell } from "@/src/components/layout";

export default function Home() {
  return (
    <SiteShell>
      <HeroSection />
      <OverviewSection />
      <TeamSection />
      <ProcessSection />
      <DirtySodaSection />
      <GallerySection />
      <OnlineStoreSection />
      <EventsSection />
      <PartnersSection />
      <PatchExchangeSection />
      <ExperienceSection />
      <PricingSection />
      <ContactSection />
    </SiteShell>
  );
}
