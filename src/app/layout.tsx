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
  title: "GENESIS — Idea Fusion Reactor",
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
    title: "GENESIS — Idea Fusion Reactor",
    description:
      "Discover impossible connections between any two concepts. AI-powered cross-domain structural analogy engine.",
    type: "website",
    siteName: "GENESIS",
  },
  twitter: {
    card: "summary_large_image",
    title: "GENESIS — Idea Fusion Reactor",
    description:
      "Discover impossible connections between any two concepts.",
  },
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
