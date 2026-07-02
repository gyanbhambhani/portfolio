import type { Metadata } from "next";
import { Syne, EB_Garamond, DM_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import Nav from "@/components/Nav";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  display: "swap",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Gyan Bhambhani",
  description: "I build the future. Berkeley, AI, Venture.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${syne.variable} ${garamond.variable} ${dmMono.variable}`}
    >
      <head>
        {/* Anti-flash script: sets .dark class before hydration to prevent flicker */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{const t=localStorage.getItem('theme');const prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(t===null&&prefersDark))document.documentElement.classList.add('dark')}catch(e){document.documentElement.classList.add('dark')}`,
          }}
        />
      </head>
      <body className="bg-black text-white antialiased">
        <ThemeProvider>
          <Nav />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
