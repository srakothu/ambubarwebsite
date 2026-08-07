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
      <div className="brand-card overflow-hidden lg:grid lg:grid-cols-[0.82fr_1.18fr]">
        <div className="relative bg-brand-charcoal p-6 text-white sm:p-8 lg:p-10">
          <div aria-hidden="true" className="absolute inset-x-0 top-0 grid h-1.5 grid-cols-3">
            <span className="bg-brand-blue" />
            <span className="bg-brand-gold" />
            <span className="bg-brand-blue" />
          </div>
          <p className="brand-subtitle !text-brand-gold-soft">The Ambu Bar difference</p>
          <h2 id="experience-heading" className="brand-heading mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            A lively bar experience, backed by a serious commitment to service.
          </h2>
        </div>

        <div className="divide-y divide-brand-border bg-white px-6 sm:px-8 lg:px-10">
          {expectations.map(({ title, description, Icon }) => (
            <article key={title} className="flex gap-4 py-6 sm:gap-5 sm:py-8">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-surface text-brand-blue">
                <Icon aria-hidden="true" size={24} strokeWidth={1.8} />
              </span>
              <div>
                <h3 className="text-xl font-semibold text-brand-black">{title}</h3>
                <p className="mt-2 text-base leading-7 text-brand-text-muted">{description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
