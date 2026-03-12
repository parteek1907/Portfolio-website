import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SocialPill from "@/components/SocialPill";
import BackToTop from "@/components/BackToTop";
import { LoadingProvider } from "@/components/LoadingContext";
import ScrollLock from "@/components/ScrollLock";
import CursorEffect from "@/components/CursorEffect";
import ScrollProgressBar from "@/components/ScrollProgressBar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Parteek Garg — Portfolio",
  description: "Parteek Garg — First-year B.Tech CSE student at NMIMS Chandigarh, building practical systems in Data Science and AI.",
  openGraph: {
    type: "website",
    url: "https://parteekgarg.me",
    title: "Parteek Garg — Portfolio",
    description: "First-year B.Tech CSE student at NMIMS Chandigarh, building practical systems in Data Science and AI.",
    images: ["https://parteekgarg.me/og-image.png"], /* Placeholder Image till deployed */
  },
  twitter: {
    card: "summary_large_image",
    title: "Parteek Garg — Portfolio",
    description: "First-year B.Tech CSE student at NMIMS Chandigarh, building practical systems in Data Science and AI.",
    images: ["https://parteekgarg.me/og-image.png"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
      </head>
      {/* suppressHydrationWarning needed because of next-themes/localstorage hydration mismatch potential, good practice */}
      <body className={`${inter.variable} antialiased bg-black text-white selection:bg-purple-500/30`}>
        <LoadingProvider>
          <ScrollProgressBar />
          <ScrollLock />
          <CursorEffect />
          {children}
          <SocialPill />
          <BackToTop />
        </LoadingProvider>
      </body>
    </html>
  );
}
