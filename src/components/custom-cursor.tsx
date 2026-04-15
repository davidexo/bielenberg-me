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

      {/* Hover cursor — orange dot + optional context label */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] flex items-center"
        style={{ x, y }}
        animate={{
          opacity: visible && hovering ? 1 : 0,
          scale: hovering ? 1 : 0.6,
        }}
        transition={{ duration: 0.15 }}
      >
        <div
          className="rounded-full bg-[#FF6A00] shrink-0"
          style={{ width: 15, height: 15, marginLeft: -7.5, marginTop: -7.5 }}
        />
        {label && (
          <motion.span
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="ml-2 -mt-1 px-2 py-0.5 rounded-md bg-[#FF6A00] text-white text-xs font-medium whitespace-nowrap"
          >
            {label}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
