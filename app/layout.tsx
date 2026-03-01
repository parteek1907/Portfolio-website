import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import SocialPill from "@/components/SocialPill";
import { LoadingProvider } from "@/components/LoadingContext";
import ScrollLock from "@/components/ScrollLock";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Parteek Garg",
  description: "Personal portfolio of a Data Science & AI Engineering student.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      {/* suppressHydrationWarning needed because of next-themes/localstorage hydration mismatch potential, good practice */}
      <body className={`${inter.variable} antialiased bg-black text-white selection:bg-white/20`}>
        <LoadingProvider>
          <ScrollLock />
          <ThemeProvider>
            {children}
            <SocialPill />
          </ThemeProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
