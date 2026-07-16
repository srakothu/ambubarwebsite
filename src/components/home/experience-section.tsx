import { CheckCircle2, GlassWater, Siren } from "lucide-react";

const expectations = [
  {
    title: "Calm, capable coordination",
    description: "A retired firefighter and first responder brings more than 32 years of service-minded planning to every event conversation.",
    Icon: CheckCircle2,
  },
  {
    title: "A beverage plan for the whole crowd",
    description: "Beer, wine, mocktails, coffee, Dirty Soda, and flexible options help every guest feel considered.",
    Icon: GlassWater,
  },
  {
    title: "A standout arrival",
    description: "The converted ambulance creates an unforgettable focal point without adding more work for the host.",
    Icon: Siren,
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="brand-section brand-section--tight">
      <div className="max-w-2xl">
        <p className="brand-subtitle">The Ambu Bar difference</p>
        <h2 id="experience-heading" className="brand-heading mt-3 text-3xl font-semibold tracking-tight text-brand-black sm:text-4xl">
          A lively bar experience, backed by a serious commitment to service.
        </h2>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {expectations.map(({ title, description, Icon }) => (
          <article key={title} className="brand-card h-full p-6 sm:p-8">
            <Icon aria-hidden="true" size={26} className="text-brand-blue" />
            <h3 className="mt-5 text-xl font-semibold text-brand-black">{title}</h3>
            <p className="mt-3 text-base leading-7 text-brand-text-muted">{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}