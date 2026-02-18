import type { Metadata } from "next";
import { Syne, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source",
  display: "swap",
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Gyan Bhambhani",
  description: "I build things. Berkeley, AI, Venture.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${syne.variable} ${sourceSerif.variable}`}>
      <body className="bg-cream text-stone-800 antialiased selection:bg-terracotta/20">
        {children}
      </body>
    </html>
  );
}
