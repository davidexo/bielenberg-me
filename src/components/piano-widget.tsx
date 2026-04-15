"use client";

import { useEffect, useState } from "react";

// Edit this to update the song you're learning.
const CURRENT_SONG = {
  title: "The Shire",
  artist: "Howard Shore",
  context: "The Lord of the Rings",
  searchQuery: "The Shire Howard Shore Lord of the Rings",
};

interface CoverResult {
  track: string;
  artist: string;
  album: string;
  cover: string;
  url: string;
}

export function PianoWidget() {
  const [cover, setCover] = useState<CoverResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/cover?q=${encodeURIComponent(CURRENT_SONG.searchQuery)}`)
      .then((r) => r.json())
      .then((d) => setCover(d.result))
      .catch(() => setCover(null))
      .finally(() => setLoading(false));
  }, []);

  return (
    <a
      href={cover?.url ?? "#"}
      target={cover?.url ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="block border border-border rounded-xl p-4 hover:bg-ring transition-colors"
      data-interactive
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm">🎹</span>
        <span className="text-xs font-medium text-muted uppercase tracking-wider">
          Learning on Piano
        </span>
      </div>
      <div className="flex items-center gap-3">
        {loading ? (
          <div className="w-12 h-12 rounded-md bg-ring animate-pulse shrink-0" />
        ) : cover?.cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cover.cover}
            alt={cover.album || CURRENT_SONG.title}
            className="w-12 h-12 rounded-md object-cover shrink-0"
          />
        ) : (
          <div className="w-12 h-12 rounded-md bg-ring shrink-0" />
        )}
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground truncate">
            {CURRENT_SONG.title}
          </p>
          <p className="text-xs text-muted mt-0.5 truncate">
            {CURRENT_SONG.artist} — {CURRENT_SONG.context}
          </p>
        </div>
      </div>
    </a>
  );
}
