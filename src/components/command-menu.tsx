"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";

// Lucide-style inline icons (1.5px stroke, 16px box)
const Icon = {
  Search: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  ),
  User: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Folder: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
    </svg>
  ),
  Music: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  ),
  Sparkles: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    </svg>
  ),
  MessageCircle: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  ),
  Mail: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  Twitter: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  Linkedin: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  Instagram: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  ),
  Github: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  ),
  Sun: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  ),
  Moon: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  ),
};

const SECTIONS = [
  { id: "about", label: "About", icon: <Icon.User />, shortcut: "A" },
  { id: "projects", label: "Projects", icon: <Icon.Folder />, shortcut: "P" },
  { id: "currently", label: "Currently", icon: <Icon.Music />, shortcut: "C" },
  { id: "connect", label: "Connect", icon: <Icon.MessageCircle />, shortcut: "K" },
];

const PAGES = [
  { label: "Fun", path: "/fun", icon: <Icon.Sparkles />, shortcut: "F" },
  { label: "Home", path: "/", icon: <Icon.User />, shortcut: "H" },
];

const LINKS = [
  { label: "Email", url: "mailto:david@bielenbeck.me", icon: <Icon.Mail /> },
  { label: "X", url: "https://x.com/davidbielenberg", icon: <Icon.Twitter /> },
  { label: "LinkedIn", url: "https://linkedin.com/in/davidbielenberg", icon: <Icon.Linkedin /> },
  { label: "Instagram", url: "https://instagram.com/davidbielenberg", icon: <Icon.Instagram /> },
  { label: "GitHub", url: "https://github.com/davidexo/bielenberg-me", icon: <Icon.Github /> },
];

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
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

  // Auto-focus & reset search when menu opens
  useEffect(() => {
    if (open) {
      setSearch("");
      // Focus on next tick after framer-motion mounts the element
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  // Handle single-key shortcuts when input is empty
  const handleDialogKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }

      // Only intercept single character keys when input is empty
      if (search !== "" || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key.length !== 1) return;

      const key = e.key.toLowerCase();

      const section = SECTIONS.find((s) => s.shortcut.toLowerCase() === key);
      if (section) {
        e.preventDefault();
        scrollTo(section.id);
        return;
      }

      const page = PAGES.find((p) => p.shortcut.toLowerCase() === key);
      if (page) {
        e.preventDefault();
        setOpen(false);
        router.push(page.path);
        return;
      }
    },
    [search, scrollTo, router]
  );

  const itemClass =
    "flex items-center gap-2 px-2 py-1.5 rounded-sm text-sm text-foreground data-[selected=true]:bg-ring data-[selected=true]:text-foreground transition-colors outline-none";

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-[998]"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-[90%] max-w-[450px] z-[999]"
          >
            <Command
              className="bg-card border border-border rounded-lg overflow-hidden shadow-2xl"
              onKeyDown={handleDialogKeyDown}
            >
              {/* Input with search icon */}
              <div className="flex items-center border-b border-border px-3" data-cmdk-input-wrapper>
                <span className="text-muted mr-2 shrink-0">
                  <Icon.Search />
                </span>
                <Command.Input
                  ref={inputRef}
                  value={search}
                  onValueChange={setSearch}
                  autoFocus
                  placeholder="Type a command or search..."
                  className="flex h-11 w-full bg-transparent py-3 text-sm text-foreground placeholder:text-muted outline-none disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-1">
                <Command.Empty className="py-6 text-center text-sm text-muted">
                  No results found.
                </Command.Empty>

                <Command.Group
                  heading="Navigate"
                  className="overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted"
                >
                  {SECTIONS.map((s) => (
                    <Command.Item
                      key={s.id}
                      value={s.label}
                      onSelect={() => scrollTo(s.id)}
                      className={itemClass}
                    >
                      <span className="text-muted">{s.icon}</span>
                      <span>{s.label}</span>
                      <CommandShortcut>{s.shortcut}</CommandShortcut>
                    </Command.Item>
                  ))}
                </Command.Group>

                <Command.Separator className="-mx-1 h-px bg-border" />

                <Command.Group
                  heading="Pages"
                  className="overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted"
                >
                  {PAGES.map((p) => (
                    <Command.Item
                      key={p.label}
                      value={p.label}
                      onSelect={() => {
                        setOpen(false);
                        router.push(p.path);
                      }}
                      className={itemClass}
                    >
                      <span className="text-muted">{p.icon}</span>
                      <span>{p.label}</span>
                      <CommandShortcut>{p.shortcut}</CommandShortcut>
                    </Command.Item>
                  ))}
                </Command.Group>

                <Command.Separator className="-mx-1 h-px bg-border" />

                <Command.Group
                  heading="Links"
                  className="overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted"
                >
                  {LINKS.map((l) => (
                    <Command.Item
                      key={l.label}
                      value={l.label}
                      onSelect={() => {
                        setOpen(false);
                        window.open(
                          l.url,
                          l.url.startsWith("mailto") ? "_self" : "_blank"
                        );
                      }}
                      className={itemClass}
                    >
                      <span className="text-muted">{l.icon}</span>
                      <span>{l.label}</span>
                    </Command.Item>
                  ))}
                </Command.Group>

                <Command.Separator className="-mx-1 h-px bg-border" />

                <Command.Group
                  heading="Theme"
                  className="overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted"
                >
                  <Command.Item
                    value="Toggle theme"
                    onSelect={() => {
                      setTheme(theme === "dark" ? "light" : "dark");
                      setOpen(false);
                    }}
                    className={itemClass}
                  >
                    <span className="text-muted">
                      {theme === "dark" ? <Icon.Sun /> : <Icon.Moon />}
                    </span>
                    <span>Toggle {theme === "dark" ? "Light" : "Dark"} Mode</span>
                    <CommandShortcut>⌘T</CommandShortcut>
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

function CommandShortcut({ children }: { children: React.ReactNode }) {
  return (
    <span className="ml-auto text-xs tracking-widest text-muted font-mono">
      {children}
    </span>
  );
}
