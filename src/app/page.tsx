"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/section";
import { ThemeToggle } from "@/components/theme-toggle";
import { ReadingWidget } from "@/components/reading-widget";
import { ListeningWidget } from "@/components/listening-widget";
import { PianoWidget } from "@/components/piano-widget";

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
            {/* Listening Widget — Last.fm */}
            <ListeningWidget />

            {/* Piano Widget — cover from iTunes Search */}
            <PianoWidget />

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
