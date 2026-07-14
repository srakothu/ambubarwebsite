import Image from "next/image";
import { HeartHandshake, Megaphone } from "lucide-react";

export function TeamSection() {
  return (
    <section id="team" aria-labelledby="team-heading" className="brand-section brand-section--tight">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div className="brand-card overflow-hidden">
          <div className="relative aspect-3/4">
            <Image
              src="/images/mary-ann-biancone-team.jpeg"
              alt="Mary Ann Biancone with the Ambu Bar founder in front of a fire engine"
              fill
              sizes="(max-width: 1024px) 100vw, 38vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="brand-card p-8 sm:p-10">
          <p className="brand-subtitle">Our team</p>
          <h2 id="team-heading" className="brand-heading mt-3 text-3xl font-semibold tracking-tight text-brand-black sm:text-4xl">
            Service-minded people behind every memorable pour.
          </h2>

          <div className="mt-8 flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-surface text-brand-blue">
              <Megaphone aria-hidden="true" size={24} strokeWidth={1.8} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-brand-black">Mary Ann Biancone</h3>
              <p className="mt-1 font-medium text-brand-blue">Director of Marketing and Social Media</p>
              <p className="mt-4 text-base leading-7 text-brand-text-muted">
                An RN nurse manager at a skilled nursing facility with more than 20 years of experience in the medical field, Mary Ann brings a calm, people-first perspective to Ambu Bar&apos;s marketing and social media.
              </p>
              <p className="mt-4 text-base leading-7 text-brand-text-muted">
                She helps share the Thirst Responders&apos; story, strengthen community connections, and make sure each touchpoint feels as welcoming as the service at the bar.
              </p>
            </div>
          </div>

          <div className="mt-8 flex items-start gap-3 border-t border-brand-border pt-6 text-sm leading-6 text-brand-text-muted">
            <HeartHandshake aria-hidden="true" size={20} className="mt-0.5 shrink-0 text-brand-gold" />
            <p>
              Together since 2017, Mary Ann and the Ambu Bar founder bring a family-first perspective to every event.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
