"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryItem {
  src: string;
  alt: string;
  title: string;
  description: string;
}

interface GallerySectionProps {
  items?: GalleryItem[];
}

const defaultItems: GalleryItem[] = [
  {
    src: "/images/Ambubar55logo.jpeg",
    alt: "Illustrated Ambu Bar mobile bar concept with a blue ambulance and open service window",
    title: "The Thirst Responders",
    description: "The mobile bar concept that puts the ambulance at the center of the celebration.",
  },
  {
    src: "/images/Ambu-Bar Concept.jpg",
    alt: "Ambu Bar ambulance concept with its service window open at an outdoor event",
    title: "Service-window concept",
    description: "A preview of the welcoming bar window and high-energy event setup.",
  },
  {
    src: "/images/ambuarTen.jpg",
    alt: "Ambu Bar branded event tent and service counter",
    title: "Event-ready setup",
    description: "A branded setup designed to feel at home at markets, festivals, and private events.",
  },
  {
    src: "/images/7c5f0b73-c4fd-4e3b-83dc-9b01a308904c.jpeg",
    alt: "Blue Ambu Bar Thirst Responder T-shirt with the Dial Wine-1-1 design",
    title: "First-response merch",
    description: "A glimpse at the branded apparel planned for the Ambu Bar shop.",
  },
  {
    src: "/images/5533a687-7fe0-462c-97b5-c7ba4cae07bb.jpeg",
    alt: "Black and white Ambu Bar Thirst Responder logo mark",
    title: "The original mark",
    description: "The heartbeat, cocktail, and emergency-service details behind the brand.",
  },
  {
    src: "/images/Ambubar77.jpg",
    alt: "Ambu Bar mobile bar promotional artwork featuring the Thirst Responders ambulance concept",
    title: "Ready when you are",
    description: "Coffee, mocktails, cocktails, and good vibes for events that deserve more personality.",
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
        {items.map((item, index) => (
          <motion.button
            key={item.src}
            type="button"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
            onClick={(event) => openModal(item, event)}
            aria-label={`View ${item.title}`}
            className={`brand-card brand-card--interactive block w-full overflow-hidden text-left ${index === 0 ? "sm:col-span-2 xl:col-span-1" : ""}`}
          >
            <div className="relative aspect-4/3 overflow-hidden">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                loading={item.src === "/images/Ambubar55logo.jpeg" ? "eager" : "lazy"}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="p-4">
              <p className="text-base font-semibold text-brand-black">{item.title}</p>
              <p className="mt-1 text-sm leading-6 text-brand-text-muted">{item.description}</p>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {activeImage ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 flex items-center justify-center bg-[rgba(9,22,43,0.9)] px-4 py-6"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                closeModal();
              }
            }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
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
              className="relative w-full max-w-4xl overflow-hidden rounded-lg border border-white/15 bg-brand-charcoal"
            >
              <div className="relative aspect-4/3">
                <Image
                  src={activeImage.src}
                  alt={activeImage.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 80vw"
                  className="object-cover"
                />
              </div>
              <div className="flex items-center justify-between gap-4 bg-[rgba(11,11,11,0.9)] px-6 py-4 text-white">
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
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
