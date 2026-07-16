"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { business } from "@/src/content/site-content";

export function HeroSection() {
  return (
    <motion.section
      id="home"
      aria-labelledby="hero-heading"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="relative isolate overflow-hidden bg-brand-charcoal text-white"
    >
      <Image
        src="/images/Ambubar55logo.jpeg"
        alt=""
        fill
        loading="eager"
        sizes="100vw"
        className="object-cover object-center opacity-70"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,28,57,0.96)_0%,rgba(10,28,57,0.9)_45%,rgba(10,28,57,0.48)_100%)]" />

      <div className="relative mx-auto flex max-w-6xl items-center px-6 py-16 sm:min-h-168 sm:px-8 sm:py-20 lg:min-h-184 lg:px-8 lg:py-24">
        <div className="max-w-2xl space-y-6 sm:space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.4 }}
            className="w-44 overflow-hidden rounded-md border border-white/50 bg-white p-1.5 shadow-[0_12px_30px_rgba(0,0,0,0.2)] sm:w-56"
          >
            <Image
              src="/images/5533a687-7fe0-462c-97b5-c7ba4cae07bb.jpeg"
              alt="Ambu-Bar Thirst Responder logo"
              width={982}
              height={645}
              loading="eager"
              sizes="(max-width: 640px) 176px, 224px"
              className="h-auto w-full"
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="brand-subtitle text-brand-gold"
          >
            {business.tagline}
          </motion.p>
          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="brand-heading text-4xl font-semibold sm:text-5xl lg:text-6xl"
          >
            A retired ambulance turned into the bar your guests will remember.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="max-w-2xl text-base leading-7 text-brand-white/90 sm:text-lg"
          >
            Ambu Bar brings a one-of-a-kind mobile beverage experience to weddings, festivals, private parties, fundraisers, and corporate events across Pennsylvania.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="flex flex-col gap-3 sm:flex-row sm:gap-4"
          >
            <Link href="/contact" className="brand-button w-full sm:w-auto">
              Check Availability
            </Link>
            <a href="#services" className="brand-button brand-button--secondary w-full sm:w-auto">
              Explore Services
            </a>
          </motion.div>
          <motion.dl
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="grid gap-4 border-t border-white/25 pt-5 sm:grid-cols-3 sm:gap-5 sm:pt-6"
          >
            {[
              { label: "Service area", value: "PA and nearby communities" },
              { label: "What we serve", value: "Beer, wine, mocktails, coffee, Dirty Soda" },
              { label: "Built for", value: "Weddings, festivals, gatherings" },
            ].map((item) => (
              <div key={item.label}>
                <dt className="text-xs font-semibold uppercase text-brand-gold-soft">{item.label}</dt>
                <dd className="mt-2 text-sm font-semibold leading-6 text-white">{item.value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>
    </motion.section>
  );
}
