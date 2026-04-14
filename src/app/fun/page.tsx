"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function FunPage() {
  return (
    <main className="flex-1">
      <div className="max-w-xl mx-auto px-6 sm:px-8">
        <header className="flex items-center justify-between pt-12 sm:pt-20 pb-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/"
              className="text-sm text-muted hover:text-foreground transition-colors"
              data-interactive
            >
              &larr; Back
            </Link>
            <h1 className="text-base font-medium mt-4">Fun</h1>
            <p className="text-sm text-muted mt-0.5">
              Experiments, components, and interactions.
            </p>
          </motion.div>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="py-12 sm:py-16"
        >
          <div className="border border-dashed border-border rounded-xl p-12 text-center">
            <p className="text-sm text-muted">
              Nothing here yet. Check back soon.
            </p>
          </div>
        </motion.div>

        <footer className="border-t border-border py-8 mt-4 mb-8">
          <div className="text-xs text-muted">
            &copy; {new Date().getFullYear()} David Bielenberg
          </div>
        </footer>
      </div>
    </main>
  );
}
