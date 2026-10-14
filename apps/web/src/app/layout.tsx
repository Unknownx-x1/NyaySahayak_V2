import type { Metadata } from "next";
import { Inter, Source_Serif_4, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const editorial = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-editorial",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NyaySahayak 2.0 — Verified Legal Intelligence & Courtroom Arena",
  description:
    "Adversarial courtroom preparation and page-level evidentiary intelligence for Indian appellate advocates.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${editorial.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-paper-canvas text-ink-primary font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
