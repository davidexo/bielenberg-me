"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";

const SECTIONS = [
  { id: "about", label: "About", icon: "👤" },
  { id: "projects", label: "Projects", icon: "🛠" },
  { id: "currently", label: "Currently", icon: "🎵" },
  { id: "connect", label: "Connect", icon: "💬" },
];

const PAGES = [
  { label: "Fun", path: "/fun", icon: "✨" },
];

const LINKS = [
  { label: "Twitter / X", url: "https://twitter.com/davidbielenberg", icon: "𝕏" },
  { label: "LinkedIn", url: "https://linkedin.com/in/davidbielenberg", icon: "in" },
  { label: "Instagram", url: "https://instagram.com/davidbielenberg", icon: "📷" },
  { label: "Email", url: "mailto:david@bielenbeck.me", icon: "✉" },
  { label: "GitHub", url: "https://github.com/davidbielenberg", icon: "⌘" },
];

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const scrollTo = useCallback((id: string) => {
    setOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[998]"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.15 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-[90%] max-w-[520px] z-[999]"
          >
            <Command
              className="bg-card border border-border rounded-xl overflow-hidden shadow-2xl"
              onKeyDown={(e) => {
                if (e.key === "Escape") setOpen(false);
              }}
            >
              <Command.Input
                placeholder="Type a command or search..."
                className="w-full px-5 py-4 text-[15px] bg-transparent text-foreground border-b border-border outline-none font-sans"
              />
              <Command.List className="max-h-[300px] overflow-y-auto p-2">
                <Command.Empty className="py-6 text-center text-sm text-muted">
                  No results found.
                </Command.Empty>

                <Command.Group heading="Navigate">
                  {SECTIONS.map((s) => (
                    <Command.Item
                      key={s.id}
                      value={s.label}
                      onSelect={() => scrollTo(s.id)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-foreground data-[selected=true]:bg-ring transition-colors"
                    >
                      <span className="w-5 text-center opacity-60">{s.icon}</span>
                      {s.label}
                    </Command.Item>
                  ))}
                </Command.Group>

                <Command.Separator className="h-px bg-border my-1" />

                <Command.Group heading="Pages">
                  {PAGES.map((p) => (
                    <Command.Item
                      key={p.label}
                      value={p.label}
                      onSelect={() => {
                        setOpen(false);
                        router.push(p.path);
                      }}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-foreground data-[selected=true]:bg-ring transition-colors"
                    >
                      <span className="w-5 text-center opacity-60">{p.icon}</span>
                      {p.label}
                    </Command.Item>
                  ))}
                </Command.Group>

                <Command.Separator className="h-px bg-border my-1" />

                <Command.Group heading="Links">
                  {LINKS.map((l) => (
                    <Command.Item
                      key={l.label}
                      value={l.label}
                      onSelect={() => {
                        setOpen(false);
                        window.open(l.url, l.url.startsWith("mailto") ? "_self" : "_blank");
                      }}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-foreground data-[selected=true]:bg-ring transition-colors"
                    >
                      <span className="w-5 text-center opacity-60 text-xs">{l.icon}</span>
                      {l.label}
                    </Command.Item>
                  ))}
                </Command.Group>

                <Command.Separator className="h-px bg-border my-1" />

                <Command.Group heading="Theme">
                  <Command.Item
                    value="Toggle dark mode"
                    onSelect={() => {
                      setTheme(theme === "dark" ? "light" : "dark");
                      setOpen(false);
                    }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-foreground data-[selected=true]:bg-ring transition-colors"
                  >
                    <span className="w-5 text-center opacity-60">
                      {theme === "dark" ? "☀" : "🌙"}
                    </span>
                    Toggle {theme === "dark" ? "Light" : "Dark"} Mode
                  </Command.Item>
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
