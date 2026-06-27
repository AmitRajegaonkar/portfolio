import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Cursor } from "@/components/cursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Custom display font (public/main_font.otf) used for all headings.
const heading = localFont({
  src: "../public/main_font.otf",
  variable: "--font-heading",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

// Resolve the canonical site URL: an explicit env var override, otherwise the
// real custom domain in production and localhost in dev. Used to make OG/social
// URLs absolute. (We avoid VERCEL_URL here so canonical links use the custom
// domain, not the *.vercel.app preview/production URL.)
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://amitbuilds.works"
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Amit Rajegaonkar — Hardware + Software Builder",
  description:
    "Embedded hardware and IoT engineer. Face recognition for MP Police, a live RFID system, and a macropad with paying customers. I build hardware that ships.",
  keywords: [
    "Amit Rajegaonkar",
    "embedded engineer",
    "IoT",
    "hardware",
    "ESP32",
    "RP2040",
    "firmware",
    "PCB design",
  ],
  authors: [{ name: "Amit Rajegaonkar" }],
  openGraph: {
    title: "Amit Rajegaonkar — Hardware + Software Builder",
    description: "I build hardware that ships.",
    type: "website",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Amit Rajegaonkar — Hardware + Software Builder",
    description: "I build hardware that ships.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${heading.variable} ${spaceMono.variable}`}
      >
        <Cursor />
        {children}
      </body>
    </html>
  );
}
