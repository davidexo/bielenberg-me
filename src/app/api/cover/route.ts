import { NextRequest, NextResponse } from "next/server";

interface ITunesResult {
  trackName: string;
  artistName: string;
  collectionName: string;
  artworkUrl100: string;
  trackViewUrl: string;
}

export const revalidate = 86400; // 24h — covers don't change

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q");
  if (!q) {
    return NextResponse.json({ error: "Missing q param" }, { status: 400 });
  }

  try {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(
      q
    )}&entity=song&limit=1`;
    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) return NextResponse.json({ result: null });

    const json = await res.json();
    const r: ITunesResult | undefined = json?.results?.[0];
    if (!r) return NextResponse.json({ result: null });

    // Upgrade artwork from 100x100 to 600x600
    const cover = r.artworkUrl100.replace("100x100bb.jpg", "600x600bb.jpg");

    return NextResponse.json({
      result: {
        track: r.trackName,
        artist: r.artistName,
        album: r.collectionName,
        cover,
        url: r.trackViewUrl,
      },
    });
  } catch {
    return NextResponse.json({ result: null });
  }
}
