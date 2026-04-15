import { NextResponse } from "next/server";

const LITERAL_API = "https://api.literal.club/graphql/";
const PROFILE_ID = "cl6ovur4g9861920iwbcbtjkjqg"; // bielenberg

const QUERY = `
  query GetReading($profileId: String!, $limit: Int!, $offset: Int!) {
    booksByReadingStateAndProfile(
      readingStatus: IS_READING
      profileId: $profileId
      limit: $limit
      offset: $offset
    ) {
      id
      title
      slug
      cover
      authors { name }
    }
  }
`;

export const revalidate = 3600; // cache for 1 hour

export async function GET() {
  try {
    const res = await fetch(LITERAL_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: QUERY,
        variables: { profileId: PROFILE_ID, limit: 5, offset: 0 },
      }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json({ books: [] }, { status: 200 });
    }

    const json = await res.json();
    const books = json?.data?.booksByReadingStateAndProfile ?? [];
    return NextResponse.json({ books });
  } catch {
    return NextResponse.json({ books: [] }, { status: 200 });
  }
}
