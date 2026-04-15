"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/section";
import { ThemeToggle } from "@/components/theme-toggle";
import { ReadingWidget } from "@/components/reading-widget";

const projects = [
  { name: "V7", description: "AI training data platform", url: "https://v7labs.com" },
  { name: "Pipe", description: "Revenue-based financing", url: "https://pipe.com" },
  { name: "Harmonic", description: "Search engine for VCs", url: "https://harmonic.ai" },
  { name: "Peec", description: "AI search analytics for marketing teams", url: "https://peec.ai" },
  { name: "Sazabi", description: "AI observability", url: "https://sazabi.com" },
];

const socials = [
  { name: "Twitter", url: "https://twitter.com/davidbielenberg" },
  { name: "LinkedIn", url: "https://linkedin.com/in/davidbielenberg" },
  { name: "Instagram", url: "https://instagram.com/davidbielenberg" },
  { name: "GitHub", url: "https://github.com/davidbielenberg" },
];

export default function Home() {
  return (
    <main className="flex-1">
      <div className="max-w-xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <header className="flex items-center justify-between pt-12 sm:pt-20 pb-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-base font-medium">David Bielenberg</h1>
            <p className="text-sm text-muted mt-0.5">Product Designer &middot; Berlin</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2"
          >
            <button
              onClick={() =>
                document.dispatchEvent(
                  new KeyboardEvent("keydown", { key: "k", metaKey: true })
                )
              }
              className="hidden sm:flex items-center gap-1.5 text-xs text-muted border border-border rounded-md px-2 py-1 hover:bg-ring transition-colors"
              data-interactive
            >
              <kbd className="font-mono">⌘K</kbd>
            </button>
            <ThemeToggle />
          </motion.div>
        </header>

        {/* About */}
        <Section id="about">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-[15px] leading-relaxed text-foreground">
              I&apos;m a product designer who partners with early-stage B2B startups to
              craft interfaces and digital experiences that ship. Based in Berlin,
              I work closely with founders to translate vision into polished,
              functional products.
            </p>
            <p className="text-[15px] leading-relaxed text-muted mt-4">
              Currently fully focused on{" "}
              <a
                href="https://permanent.design"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
                data-interactive
              >
                Permanent
              </a>
              , a design studio I co-founded to work with ambitious teams
              building the next generation of B2B tools. Let&apos;s ship great things
              together.
            </p>
          </motion.div>
        </Section>

        {/* Projects */}
        <Section id="projects" title="Selected Projects">
          <div className="space-y-1">
            {projects.map((project, i) => (
              <motion.a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="group flex items-center justify-between py-3 px-3 -mx-3 rounded-lg hover:bg-ring transition-colors"
                data-interactive
              >
                <div>
                  <span className="text-sm font-medium text-foreground">
                    {project.name}
                  </span>
                  <span className="text-sm text-muted ml-3">{project.description}</span>
                </div>
                <svg
                  className="w-4 h-4 text-muted opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </motion.a>
            ))}
          </div>
        </Section>

        {/* Currently */}
        <Section id="currently" title="Currently">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Spotify Widget */}
            <div className="border border-border rounded-xl p-4 hover:bg-ring transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-4 h-4 text-[#1DB954]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
                <span className="text-xs font-medium text-muted uppercase tracking-wider">Listening</span>
              </div>
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://i.scdn.co/image/ab67616d00004851b7a3ceeb53378568f95a3023"
                  alt="Hurry Up, We're Dreaming"
                  className="w-12 h-12 rounded-md object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-foreground">Midnight City</p>
                  <p className="text-xs text-muted mt-0.5">M83</p>
                </div>
              </div>
            </div>

            {/* Piano Widget */}
            <div className="border border-border rounded-xl p-4 hover:bg-ring transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm">🎹</span>
                <span className="text-xs font-medium text-muted uppercase tracking-wider">Learning on Piano</span>
              </div>
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://i.scdn.co/image/ab67616d00004851fe3b23913f1bfb4b6a4b4e86"
                  alt="The Lord of the Rings: The Fellowship of the Ring Soundtrack"
                  className="w-12 h-12 rounded-md object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-foreground">The Shire</p>
                  <p className="text-xs text-muted mt-0.5">Howard Shore — The Lord of the Rings</p>
                </div>
              </div>
            </div>

            {/* Reading Widget — pulls live from Literal */}
            <ReadingWidget />
          </div>
        </Section>

        {/* Fun */}
        <Section id="fun" title="Fun">
          <a
            href="/fun"
            className="group flex items-center justify-between border border-dashed border-border rounded-xl p-6 hover:bg-ring transition-colors"
            data-interactive
          >
            <p className="text-sm text-muted">
              Experiments, components, and interactions.
            </p>
            <svg
              className="w-4 h-4 text-muted group-hover:translate-x-0.5 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </Section>

        {/* Connect */}
        <Section id="connect" title="Connect">
          <p className="text-[15px] leading-relaxed text-muted mb-6">
            Always happy to connect with founders, designers, and builders.
            Feel free to reach out — let&apos;s make something great.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:david@bielenbeck.me"
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground border border-border rounded-lg px-4 py-2 hover:bg-ring transition-colors"
              data-interactive
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              david@bielenbeck.me
            </a>
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-muted border border-border rounded-lg px-4 py-2 hover:text-foreground hover:bg-ring transition-colors"
                data-interactive
              >
                {social.name}
              </a>
            ))}
          </div>
        </Section>

        {/* Footer */}
        <footer className="border-t border-border py-8 mt-4 mb-8">
          <div className="flex items-center justify-between text-xs text-muted">
            <span>&copy; {new Date().getFullYear()} David Bielenberg</span>
            <span className="hidden sm:block">
              Press{" "}
              <kbd className="font-mono border border-border rounded px-1.5 py-0.5 text-[10px]">
                ⌘K
              </kbd>{" "}
              to navigate
            </span>
          </div>
        </footer>
      </div>
    </main>
  );
}
