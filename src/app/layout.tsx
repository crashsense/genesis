import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "GENESIS \u2014 Idea Fusion Reactor",
  description:
    "Throw in two unrelated concepts. Watch as AI discovers hidden structural connections that nobody has ever seen before. The world's first cross-domain idea fusion engine.",
  keywords: [
    "AI",
    "idea generation",
    "cross-domain",
    "innovation",
    "knowledge fusion",
    "structural analogy",
    "creative AI",
  ],
  openGraph: {
    title: "GENESIS \u2014 Idea Fusion Reactor",
    description:
      "Fuse any two ideas. Discover hidden structural isomorphisms that nobody has ever seen before.",
    type: "website",
    siteName: "GENESIS",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "GENESIS \u2014 Idea Fusion Reactor",
    description:
      "Fuse any two ideas. Discover what nobody has.",
    creator: "@crashsense",
  },
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"
  ),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
