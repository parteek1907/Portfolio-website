import type { Metadata } from "next";
import "./globals.css";
import SocialPill from "@/components/SocialPill";
import BackToTop from "@/components/BackToTop";
import { LoadingProvider } from "@/components/LoadingContext";
import ScrollLock from "@/components/ScrollLock";
import CursorEffect from "@/components/CursorEffect";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  metadataBase: new URL('https://parteekgarg.me'),
  title: 'Parteek Garg — Building Practical Systems',
  description: 'First-year B.Tech CSE student at NMIMS Chandigarh building full-stack systems and exploring Data Science and AI. Creator of Veralon, Campus Care, and DNA Encoding.',
  authors: [{ name: 'Parteek Garg' }],
  keywords: ['Parteek Garg', 'portfolio', 'full-stack developer', 'data science', 'AI', 'NMIMS Chandigarh', 'React', 'TypeScript', 'Next.js'],
  openGraph: {
    type: 'website',
    url: 'https://parteekgarg.me',
    title: 'Parteek Garg — Building Practical Systems',
    description: 'First-year B.Tech CSE student at NMIMS Chandigarh building full-stack systems and exploring Data Science and AI.',
    siteName: 'Parteek Garg',
    locale: 'en_IN',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Parteek Garg — Building Practical Systems',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Parteek Garg — Building Practical Systems',
    description: 'First-year B.Tech CSE student at NMIMS Chandigarh building full-stack systems and exploring Data Science and AI.',
    images: ['/og-image.png'],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

// Scroll restoration script (theme flash handled by next-themes)
const scrollScript = `
(function() {
  if (typeof window !== 'undefined') {
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: scrollScript }} />
        <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <Providers>
          <LoadingProvider>
            <ScrollProgressBar />
            <ScrollLock />
            <CursorEffect />
            {children}
            <SocialPill />
            <BackToTop />
          </LoadingProvider>
        </Providers>
      </body>
    </html>
  );
}
