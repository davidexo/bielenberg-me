"use client";

import { useEffect, useState } from "react";

interface Track {
  name: string;
  artist: string;
  album: string;
  cover: string;
  url: string;
  nowPlaying: boolean;
  playedAt: string | null;
}

export function ListeningWidget() {
  const [track, setTrack] = useState<Track | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = () =>
      fetch("/api/lastfm")
        .then((r) => r.json())
        .then((d) => setTrack(d.track))
        .catch(() => setTrack(null))
        .finally(() => setLoading(false));

    load();
    const id = setInterval(load, 60_000); // refresh every minute
    return () => clearInterval(id);
  }, []);

  return (
    <a
      href={track?.url ?? "https://www.last.fm/user/exolyth"}
      target="_blank"
      rel="noopener noreferrer"
      className="block border border-border rounded-xl p-4 hover:bg-ring transition-colors"
      data-interactive
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <svg
            className="w-4 h-4 text-[#1DB954]"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-label="Spotify"
          >
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
          <span className="text-xs font-medium text-muted uppercase tracking-wider">
            {loading
              ? "Loading…"
              : track?.nowPlaying
                ? "Now Playing"
                : "Last Played"}
          </span>
        </div>
        {track?.nowPlaying && (
          <span className="flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-[#1DB954] animate-pulse" />
            <span className="w-1 h-2 rounded-full bg-[#1DB954] animate-pulse [animation-delay:200ms]" />
            <span className="w-1 h-1.5 rounded-full bg-[#1DB954] animate-pulse [animation-delay:400ms]" />
          </span>
        )}
      </div>

      {loading && (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-md bg-ring animate-pulse" />
          <div className="space-y-1.5 flex-1">
            <div className="h-3.5 w-32 bg-ring rounded animate-pulse" />
            <div className="h-3 w-20 bg-ring rounded animate-pulse" />
          </div>
        </div>
      )}

      {!loading && track && (
        <div className="flex items-center gap-3">
          {track.cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={track.cover}
              alt={track.album || track.name}
              className="w-12 h-12 rounded-md object-cover shrink-0"
            />
          ) : (
            <div className="w-12 h-12 rounded-md bg-ring shrink-0" />
          )}
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {track.name}
            </p>
            <p className="text-xs text-muted mt-0.5 truncate">{track.artist}</p>
          </div>
        </div>
      )}

      {!loading && !track && (
        <p className="text-sm text-muted">Not listening to anything.</p>
      )}
    </a>
  );
}
