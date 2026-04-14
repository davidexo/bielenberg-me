"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface SectionProps {
  id: string;
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Section({ id, title, children, className = "" }: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`py-12 sm:py-16 ${className}`}
    >
      {title && (
        <h2 className="text-xs font-medium uppercase tracking-widest text-muted mb-6">
          {title}
        </h2>
      )}
      {children}
    </motion.section>
  );
}
