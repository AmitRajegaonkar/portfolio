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

export const metadata: Metadata = {
  title: "Amit Rajegaonkar — Hardware + Software Builder",
  description:
    "Embedded hardware and IoT engineer. Face recognition for MP Police, a live RFID system, and a macropad with paying customers. I build hardware that ships.",
  openGraph: {
    title: "Amit Rajegaonkar — Hardware + Software Builder",
    description: "I build hardware that ships.",
    type: "website",
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
