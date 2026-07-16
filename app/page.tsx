import {
  ContactSection,
  DirtySodaSection,
  EventsSection,
  ExperienceSection,
  GallerySection,
  HeroSection,
  OverviewSection,
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
      <EventsSection />
      <PartnersSection />
      <ExperienceSection />
      <PricingSection />
      <ContactSection />
    </SiteShell>
  );
}