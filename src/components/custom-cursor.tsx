"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
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
    };

    const leave = () => setVisible(false);

    const handleHover = () => {
      const checkHover = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const isInteractive =
          target.closest("a, button, [role='button'], input, textarea, select, [data-interactive]") !== null;
        setHovering(isInteractive);
      };
      document.addEventListener("mousemove", checkHover);
      return () => document.removeEventListener("mousemove", checkHover);
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    const cleanup = handleHover();

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      cleanup();
    };
  }, [cursorX, cursorY]);

  // Don't render on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  // Default cursor uses mix-blend-difference so it inverts on light/dark.
  // Hover cursor is a smaller solid orange dot (no blend mode so the color is true).
  return (
    <>
      {/* Default cursor */}
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

      {/* Hover cursor (50% larger than default, orange) */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{ x, y }}
        animate={{
          opacity: visible && hovering ? 1 : 0,
          scale: hovering ? 1 : 0.6,
        }}
        transition={{ duration: 0.15 }}
      >
        <div
          className="rounded-full bg-[#FF6A00]"
          style={{ width: 15, height: 15, marginLeft: -7.5, marginTop: -7.5 }}
        />
      </motion.div>
    </>
  );
}
