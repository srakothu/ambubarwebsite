"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { X } from "lucide-react";

interface GalleryItem {
  src: string;
  alt: string;
  title: string;
  description: string;
  presentation?: "cover" | "contain";
  surface?: "dark" | "light";
}

interface GallerySectionProps {
  items?: readonly GalleryItem[];
}

const defaultItems: GalleryItem[] = [
  {
    src: "/images/Ambubar55logo.jpeg",
    alt: "Illustrated Ambu Bar mobile bar concept with a blue ambulance and open service window",
    title: "The Thirst Responders",
    description: "The mobile bar concept that puts the ambulance at the center of the celebration.",
    presentation: "contain",
    surface: "dark",
  },
  {
    src: "/images/Ambu-Bar Concept.jpg",
    alt: "Ambu Bar ambulance concept with its service window open at an outdoor event",
    title: "Service-window concept",
    description: "A preview of the welcoming bar window and high-energy event setup.",
  },
  {
    src: "/images/ambuarTen.jpg",
    alt: "Ambu Bar branded Triage Tent and service counter",
    title: "Event-ready setup",
    description: "A branded setup designed to feel at home at markets, festivals, and private events.",
  },
  {
    src: "/images/7c5f0b73-c4fd-4e3b-83dc-9b01a308904c.jpeg",
    alt: "Blue Ambu Bar Thirst Responder T-shirt with the Dial Wine-1-1 design",
    title: "First-response gear",
    description: "A glimpse at the branded apparel planned for the Ambu Bar Online Store.",
    presentation: "contain",
    surface: "light",
  },
  {
    src: "/images/5533a687-7fe0-462c-97b5-c7ba4cae07bb.jpeg",
    alt: "Black and white Ambu Bar Thirst Responder logo mark",
    title: "The original mark",
    description: "The heartbeat, cocktail, and emergency-service details behind the brand.",
    presentation: "contain",
    surface: "light",
  },
  {
    src: "/images/Ambubar77.jpg",
    alt: "Ambu Bar mobile bar promotional artwork featuring the Thirst Responders ambulance concept",
    title: "Ready when you are",
    description: "Coffee, mocktails, cocktails, and good vibes for events that deserve more personality.",
    presentation: "contain",
    surface: "dark",
  },
];

export function GallerySection({ items = defaultItems }: GallerySectionProps) {
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!activeImage) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveImage(null);
        requestAnimationFrame(() => triggerRef.current?.focus());
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);
    requestAnimationFrame(() => closeButtonRef.current?.focus());

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [activeImage]);

  const closeModal = () => {
    setActiveImage(null);
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  const openModal = (item: GalleryItem, event: MouseEvent<HTMLButtonElement>) => {
    triggerRef.current = event.currentTarget;
    setActiveImage(item);
  };

  return (
    <section id="gallery" aria-labelledby="gallery-heading" className="brand-section brand-section--tight">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="brand-subtitle">Gallery</p>
          <h2 id="gallery-heading" className="brand-heading mt-3 text-3xl font-semibold tracking-tight text-brand-black sm:text-4xl">
            The ambulance is the centerpiece. The experience is the reason guests remember it.
          </h2>
          <p className="mt-4 text-lg leading-8 text-brand-text-muted">
            Explore the Ambu Bar concept, branded event setup, and the details that make the Thirst Responders unmistakable.
          </p>
        </div>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <button
            key={item.src}
            type="button"
            onClick={(event) => openModal(item, event)}
            aria-label={`View ${item.title}`}
            className="brand-card brand-card--interactive group block w-full overflow-hidden text-left"
          >
            <span
              className={`relative block aspect-4/3 overflow-hidden ${item.surface === "dark" ? "bg-brand-charcoal" : "bg-white"}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className={
                  item.presentation === "contain"
                    ? "object-contain p-2 sm:p-3"
                    : "object-cover transition-transform duration-500 group-hover:scale-105"
                }
              />
            </span>
            <span className="block p-4">
              <span className="block text-base font-semibold text-brand-black">{item.title}</span>
              <span className="mt-1 block text-sm leading-6 text-brand-text-muted">{item.description}</span>
            </span>
          </button>
        ))}
      </div>

      {activeImage ? (
          <div
            className="gallery-backdrop fixed inset-0 z-60 flex items-center justify-center overflow-y-auto bg-[rgba(9,22,43,0.9)] px-4 py-4 sm:py-6"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                closeModal();
              }
            }}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="gallery-dialog-title"
              aria-describedby="gallery-dialog-description"
              onKeyDown={(event) => {
                if (event.key === "Tab") {
                  event.preventDefault();
                  closeButtonRef.current?.focus();
                }
              }}
              className="gallery-dialog relative flex max-h-[calc(100dvh-2rem)] w-full max-w-4xl flex-col overflow-hidden rounded-lg border border-white/15 bg-brand-charcoal sm:max-h-[calc(100dvh-3rem)]"
            >
              <div className="relative min-h-0 flex-1 basis-[60dvh] bg-black/25">
                <Image
                  src={activeImage.src}
                  alt={activeImage.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 80vw"
                  className="object-contain"
                />
              </div>
              <div className="flex shrink-0 items-center justify-between gap-4 bg-[rgba(11,11,11,0.9)] px-4 py-4 text-white sm:px-6">
                <div>
                  <h3 id="gallery-dialog-title" className="text-lg font-semibold text-white">{activeImage.title}</h3>
                  <p id="gallery-dialog-description" className="mt-1 text-sm text-zinc-300">{activeImage.description}</p>
                </div>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={closeModal}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 transition-colors hover:bg-white/10"
                  aria-label="Close image viewer"
                >
                  <X aria-hidden="true" size={20} />
                </button>
              </div>
            </div>
          </div>
        ) : null}
    </section>
  );
}
