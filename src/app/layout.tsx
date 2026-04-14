import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { CustomCursor } from "@/components/custom-cursor";
import { CommandMenu } from "@/components/command-menu";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "David Bielenberg — Product Designer",
  description:
    "Strategic design partner for early-stage B2B startups. Co-founder of Permanent.",
  openGraph: {
    title: "David Bielenberg — Product Designer",
    description:
      "Strategic design partner for early-stage B2B startups. Co-founder of Permanent.",
    type: "website",
    url: "https://bielenberg.me",
  },
  twitter: {
    card: "summary",
    title: "David Bielenberg — Product Designer",
    description:
      "Strategic design partner for early-stage B2B startups. Co-founder of Permanent.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans">
        <ThemeProvider>
          <CustomCursor />
          <CommandMenu />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
