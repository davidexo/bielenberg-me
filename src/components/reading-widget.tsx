"use client";

import { useEffect, useState } from "react";

interface Book {
  id: string;
  title: string;
  slug: string;
  cover: string;
  authors: { name: string }[];
}

export function ReadingWidget() {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/literal")
      .then((r) => r.json())
      .then((data) => setBook(data.books?.[0] ?? null))
      .catch(() => setBook(null))
      .finally(() => setLoading(false));
  }, []);

  return (
    <a
      href={
        book
          ? `https://literal.club/book/${book.slug}`
          : "https://literal.club/bielenberg"
      }
      target="_blank"
      rel="noopener noreferrer"
      className="block border border-border rounded-xl p-4 hover:bg-ring transition-colors sm:col-span-2"
      data-interactive
      data-cursor="Literal →"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm">📚</span>
        <span className="text-xs font-medium text-muted uppercase tracking-wider">
          Reading
        </span>
      </div>

      {loading && (
        <div className="flex items-center gap-3">
          <div className="w-12 h-16 rounded-md bg-ring animate-pulse" />
          <div className="space-y-1.5 flex-1">
            <div className="h-3.5 w-40 bg-ring rounded animate-pulse" />
            <div className="h-3 w-24 bg-ring rounded animate-pulse" />
          </div>
        </div>
      )}

      {!loading && !book && (
        <p className="text-sm text-muted">Not reading anything right now.</p>
      )}

      {!loading && book && (
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={book.cover}
            alt={book.title}
            className="w-12 h-16 rounded-md object-cover shrink-0"
          />
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {book.title}
            </p>
            <p className="text-xs text-muted mt-0.5 truncate">
              {book.authors.map((a) => a.name).join(", ")}
            </p>
          </div>
        </div>
      )}
    </a>
  );
}
