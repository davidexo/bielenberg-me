"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setVisible(true);

      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [role='button'], input, textarea, select, [data-interactive], [data-cursor]"
      ) as HTMLElement | null;

      setHovering(interactive !== null);

      // Read context label off any ancestor with [data-cursor]
      const labelled = target.closest("[data-cursor]") as HTMLElement | null;
      setLabel(labelled?.dataset.cursor ?? null);
    };

    const leave = () => setVisible(false);

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
    };
  }, [cursorX, cursorY]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* Default cursor — white dot, blend-difference for light/dark */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
        style={{ x, y }}
        animate={{
          opacity: visible && !hovering ? 1 : 0,
          scale: 1,
        }}
        transition={{ duration: 0.15 }}
      >
        <div
          className="rounded-full bg-white"
          style={{ width: 10, height: 10, marginLeft: -5, marginTop: -5 }}
        />
      </motion.div>

      {/* Hover cursor — orange dot when no label */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{ x, y }}
        animate={{
          opacity: visible && hovering && !label ? 1 : 0,
          scale: hovering && !label ? 1 : 0.6,
        }}
        transition={{ duration: 0.15 }}
      >
        <div
          className="rounded-full bg-[#FF6A00]"
          style={{ width: 15, height: 15, marginLeft: -7.5, marginTop: -7.5 }}
        />
      </motion.div>

      {/* Hover cursor — single pill with icon + label */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{ x, y }}
        animate={{
          opacity: visible && hovering && !!label ? 1 : 0,
          scale: hovering && !!label ? 1 : 0.85,
        }}
        transition={{ duration: 0.15 }}
      >
        <div
          className="flex items-center gap-1.5 bg-[#FF6A00] text-white pl-2 pr-2.5 py-1 rounded-full whitespace-nowrap shadow-lg"
          style={{ marginLeft: 6, marginTop: 6 }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17L17 7" />
            <path d="M7 7h10v10" />
          </svg>
          <span className="text-xs font-medium leading-none">
            {label?.replace(/\s*→\s*$/, "")}
          </span>
        </div>
      </motion.div>
    </>
  );
}
