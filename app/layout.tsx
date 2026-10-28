import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import SocialPill from "@/components/SocialPill";
import BackToTop from "@/components/BackToTop";
import { LoadingProvider } from "@/components/LoadingContext";
import ScrollLock from "@/components/ScrollLock";
import CursorEffect from "@/components/CursorEffect";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import { Providers } from "@/components/Providers";
import DynamicTitle from "@/components/DynamicTitle";
import LegalModal from "@/components/LegalModal";
import SmoothScrolling from "@/components/SmoothScrolling";
import { WindowsProvider } from "@/components/windows/WindowsContext";
import WindowsDesktopLoader from "@/components/windows/WindowsDesktopLoader";

const oswald = Oswald({ subsets: ["latin"], variable: "--font-ui", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL('https://parteekgarg.in'),
  title: 'Parteek Garg | Portfolio',
  description: 'Second-year B.Tech CSE student at NMIMS Chandigarh building full-stack systems and exploring Data Science and AI. Creator of Veralon, Campus Care, and DNA Encoding.',
  authors: [{ name: 'Parteek Garg' }],
  keywords: ['Parteek Garg', 'portfolio', 'full-stack developer', 'data science', 'AI', 'NMIMS Chandigarh', 'React', 'TypeScript', 'Next.js'],
  openGraph: {
    type: 'website',
    url: 'https://parteekgarg.in',
    title: 'Parteek Garg | Portfolio',
    description: 'Second-year B.Tech CSE student at NMIMS Chandigarh building full-stack systems and exploring Data Science and AI.',
    siteName: 'Parteek Garg',
    locale: 'en_IN',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Parteek Garg-Portfolio',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Parteek Garg | Portfolio',
    description: 'Second-year B.Tech CSE student at NMIMS Chandigarh building full-stack systems and exploring Data Science and AI.',
    images: ['/og-image.png'],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

// Scroll restoration & early OS mode initialization to eliminate layout flashes
const scrollScript = `
(function() {
  if (typeof window !== 'undefined') {
    window.history.scrollRestoration = 'manual';
    var host = (window.location.hostname || '').toLowerCase();
    var params = new URLSearchParams(window.location.search);
    var isOs = host === 'os.parteekgarg.in' || host === 'os.localhost' || host.startsWith('os.') || host.startsWith('os-') || params.get('subdomain') === 'os' || params.get('view') === 'windows' || params.get('os') === 'true' || window.location.hash === '#windows';
    var isDesktop = window.innerWidth >= 1024 && window.innerHeight >= 500;
    if (isOs && isDesktop) {
      document.documentElement.classList.add('windows-mode-active');
      document.title = 'Parteek Garg | OS';
      window.scrollTo(0, 0);
    }
  }
})();
`;

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Parteek Garg",
  "url": "https://parteekgarg.in",
  "jobTitle": "Full-Stack Developer & Data Science Student",
  "alumniOf": {
    "@type": "EducationalOrganization",
    "name": "NMIMS Chandigarh"
  },
  "sameAs": [
    "https://www.linkedin.com/in/parteek1907/",
    "https://github.com/parteek1907",
    "https://twitter.com/parteek1907",
    "https://instagram.com/parteek1907"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
        <script dangerouslySetInnerHTML={{ __html: scrollScript }} />
      </head>
      <body className={`${oswald.variable} ${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        <Providers>
          <WindowsProvider>
            <LoadingProvider>
              <DynamicTitle />
              <LegalModal />
              <ScrollProgressBar />
              <ScrollLock />
              <CursorEffect />
              <SmoothScrolling>
                {children}
              </SmoothScrolling>
              <SocialPill />
              <BackToTop />
              <WindowsDesktopLoader />
            </LoadingProvider>
          </WindowsProvider>
        </Providers>
      </body>
    </html>
  );
}
