"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-8 w-[68px] rounded-full border border-border" />;
  }

  const isDark = theme === "dark";

  return (
    <div
      className="relative flex items-center h-8 w-[68px] rounded-full border border-border bg-card p-0.5"
      role="group"
      aria-label="Theme switch"
    >
      {/* Sliding pill */}
      <motion.div
        className="absolute top-0.5 bottom-0.5 w-[30px] rounded-full bg-ring"
        animate={{ left: isDark ? 34 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
      />

      {/* Light button */}
      <button
        type="button"
        onClick={() => setTheme("light")}
        aria-label="Light mode"
        aria-pressed={!isDark}
        className="relative z-10 flex-1 flex items-center justify-center text-foreground"
        data-interactive
        data-cursor="Light"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={isDark ? "opacity-50" : "opacity-100"}
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      </button>

      {/* Dark button */}
      <button
        type="button"
        onClick={() => setTheme("dark")}
        aria-label="Dark mode"
        aria-pressed={isDark}
        className="relative z-10 flex-1 flex items-center justify-center text-foreground"
        data-interactive
        data-cursor="Dark"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={isDark ? "opacity-100" : "opacity-50"}
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      </button>
    </div>
  );
}
