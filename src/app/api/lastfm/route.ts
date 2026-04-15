import { NextResponse } from "next/server";

const USERNAME = "exolyth";
const API_KEY = process.env.LASTFM_API_KEY || "ac0b226837bd0fc1c306b8f25f878a21";
const ENDPOINT = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USERNAME}&api_key=${API_KEY}&format=json&limit=1`;

export const revalidate = 60; // refresh once a minute

interface LastfmImage {
  size: string;
  "#text": string;
}

interface LastfmTrack {
  name: string;
  url: string;
  artist: { "#text": string };
  album: { "#text": string };
  image: LastfmImage[];
  date?: { "#text": string; uts: string };
  "@attr"?: { nowplaying?: string };
}

export async function GET() {
  try {
    const res = await fetch(ENDPOINT, { next: { revalidate: 60 } });
    if (!res.ok) return NextResponse.json({ track: null }, { status: 200 });

    const json = await res.json();
    const t: LastfmTrack | undefined = json?.recenttracks?.track?.[0];
    if (!t) return NextResponse.json({ track: null });

    const cover =
      t.image?.find((i) => i.size === "extralarge")?.["#text"] ||
      t.image?.[t.image.length - 1]?.["#text"] ||
      "";

    return NextResponse.json({
      track: {
        name: t.name,
        artist: t.artist["#text"],
        album: t.album["#text"],
        cover,
        url: t.url,
        nowPlaying: t["@attr"]?.nowplaying === "true",
        playedAt: t.date?.["#text"] ?? null,
      },
    });
  } catch {
    return NextResponse.json({ track: null }, { status: 200 });
  }
}
