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
  const [books, setBooks] = useState<Book[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/literal")
      .then((r) => r.json())
      .then((data) => setBooks(data.books ?? []))
      .catch(() => setBooks([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="border border-border rounded-xl p-4 hover:bg-ring transition-colors sm:col-span-2">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-sm">📚</span>
          <span className="text-xs font-medium text-muted uppercase tracking-wider">
            Reading
          </span>
        </div>
        <a
          href="https://literal.club/bielenberg"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted hover:text-foreground transition-colors"
          data-interactive
        >
          Literal &rarr;
        </a>
      </div>

      {loading && (
        <div className="flex items-center gap-3">
          <div className="w-12 h-16 rounded-md bg-ring animate-pulse" />
          <div className="space-y-1.5">
            <div className="h-3.5 w-40 bg-ring rounded animate-pulse" />
            <div className="h-3 w-24 bg-ring rounded animate-pulse" />
          </div>
        </div>
      )}

      {!loading && books && books.length === 0 && (
        <p className="text-sm text-muted">No books currently being read.</p>
      )}

      {!loading && books && books.length > 0 && (
        <div className="flex gap-4 overflow-x-auto -mx-1 px-1 pb-1">
          {books.map((book) => (
            <a
              key={book.id}
              href={`https://literal.club/book/${book.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group shrink-0 w-[140px]"
              data-interactive
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={book.cover}
                alt={book.title}
                className="w-[140px] h-[200px] rounded-md object-cover group-hover:scale-[1.02] transition-transform"
              />
              <p className="text-xs font-medium text-foreground mt-2 line-clamp-2 leading-tight">
                {book.title}
              </p>
              <p className="text-xs text-muted mt-0.5 line-clamp-1">
                {book.authors.map((a) => a.name).join(", ")}
              </p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
