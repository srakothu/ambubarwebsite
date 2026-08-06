"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface MotionRevealProps {
  as?: "article" | "aside" | "div" | "section";
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
  amount?: number;
  "aria-labelledby"?: string;
}

export function MotionReveal({
  as = "div",
  children,
  className,
  delay = 0,
  id,
  amount = 0.2,
  "aria-labelledby": ariaLabelledBy,
}: MotionRevealProps) {
  const motionProps = {
    className,
    initial: { opacity: 0, y: 16 },
    transition: { duration: 0.4, delay, ease: "easeOut" as const },
    viewport: { once: true, amount },
    whileInView: { opacity: 1, y: 0 },
  };

  if (as === "section") {
    return (
      <motion.section id={id} aria-labelledby={ariaLabelledBy} {...motionProps}>
        {children}
      </motion.section>
    );
  }

  if (as === "article") {
    return <motion.article {...motionProps}>{children}</motion.article>;
  }

  if (as === "aside") {
    return <motion.aside {...motionProps}>{children}</motion.aside>;
  }

  return <motion.div {...motionProps}>{children}</motion.div>;
}
