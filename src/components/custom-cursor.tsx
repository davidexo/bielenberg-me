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

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
      style={{ x, y }}
      animate={{
        opacity: visible ? 1 : 0,
        scale: hovering ? 1.8 : 1,
      }}
      transition={{ scale: { duration: 0.2 }, opacity: { duration: 0.15 } }}
    >
      <div
        className="rounded-full bg-white"
        style={{
          width: hovering ? 20 : 10,
          height: hovering ? 20 : 10,
          marginLeft: hovering ? -10 : -5,
          marginTop: hovering ? -10 : -5,
          transition: "width 0.2s, height 0.2s, margin 0.2s",
        }}
      />
    </motion.div>
  );
}
