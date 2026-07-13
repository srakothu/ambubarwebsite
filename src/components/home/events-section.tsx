import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import { publicEvents, type PublicEvent } from "@/src/content/site-content";

interface EventsSectionProps {
  events?: readonly PublicEvent[];
}

export function EventsSection({ events = publicEvents }: EventsSectionProps) {
  return (
    <section id="events" aria-labelledby="events-heading" className="brand-section brand-section--tight">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="brand-subtitle">Events</p>
          <h2 id="events-heading" className="brand-heading mt-3 text-3xl font-semibold tracking-tight text-brand-black sm:text-4xl">
            Catch the Thirst Responders at a public event.
          </h2>
          <p className="mt-4 text-lg leading-8 text-brand-text-muted">
            Public appearances will be posted here as they are confirmed. Private events stay private, but their guests still get the full Ambu Bar experience.
          </p>
        </div>
      </div>

      {events.length > 0 ? (
        <ol className="mt-10 grid gap-5 lg:grid-cols-2">
          {events.map((event) => (
            <li key={event.id}>
              <article className="brand-card h-full p-6 sm:p-8">
                <p className="text-sm font-semibold text-brand-blue">{event.date}</p>
                <h3 className="mt-3 text-2xl font-semibold text-brand-black">{event.title}</h3>
                <p className="mt-3 flex items-center gap-2 text-sm text-brand-text-muted">
                  <MapPin aria-hidden="true" size={16} className="text-brand-blue" />
                  {event.location}
                </p>
                <p className="mt-4 text-base leading-7 text-brand-text-muted">{event.description}</p>
                {event.href ? (
                  <Link href={event.href} className="brand-button mt-6">
                    Event details
                  </Link>
                ) : null}
              </article>
            </li>
          ))}
        </ol>
      ) : (
        <div className="brand-card brand-card--soft mt-10 flex flex-col items-start gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex max-w-2xl items-start gap-4">
            <CalendarDays aria-hidden="true" size={28} className="mt-1 shrink-0 text-brand-blue" />
            <div>
              <h3 className="text-xl font-semibold text-brand-black">Public dates are on the way.</h3>
              <p className="mt-2 text-base leading-7 text-brand-text-muted">
                Follow along for public event announcements, or bring the ambulance bar to your own celebration.
              </p>
            </div>
          </div>
          <Link href="/contact" className="brand-button shrink-0">
            Bring Ambu Bar to Your Event
          </Link>
        </div>
      )}
    </section>
  );
}
