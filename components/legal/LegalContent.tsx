import React from 'react';

export function PrivacyContent() {
    return (
        <div className="space-y-8" style={{ color: "var(--color-text-secondary)" }}>
            <section>
                <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}>1. Information We Collect</h2>
                <p className="mb-2">We collect minimal information necessary to provide and improve our services. The types of personal information we may collect include:</p>
                <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Contact Information:</strong> Name, email address, and any messages you provide when using our contact form.</li>
                    <li><strong>Usage Data:</strong> Information about how you navigate and interact with our website, collected via analytics tools.</li>
                    <li><strong>Technical Data:</strong> IP address, browser type, device information, and operating system details collected automatically by hosting providers.</li>
                </ul>
            </section>
            <section>
                <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}>2. How We Use Your Information</h2>
                <p className="mb-2">The information collected is used solely for the following purposes:</p>
                <ul className="list-disc pl-5 space-y-1">
                    <li>To respond to your inquiries and communications via the contact form.</li>
                    <li>To analyze website usage trends and improve user experience.</li>
                    <li>To ensure the security and functionality of the website.</li>
                </ul>
            </section>
            <section>
                <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}>3. Third-Party Services</h2>
                <p>We use minimal analytics services to understand traffic without tracking individual users across the web. Our hosting providers may collect standard access logs for operations.</p>
            </section>
            <section>
                <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}>4. Data Retention</h2>
                <p>We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy.</p>
            </section>
        </div>
    );
}

export function TermsContent() {
    return (
        <div className="space-y-8" style={{ color: "var(--color-text-secondary)" }}>
            <section>
                <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}>1. Acceptance of Terms</h2>
                <p>By accessing and using this website, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use this service.</p>
            </section>
            <section>
                <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}>2. Intellectual Property</h2>
                <p>The website and its original content, features, functionality, and design are owned by Parteek Garg and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.</p>
            </section>
            <section>
                <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}>3. Website Usage</h2>
                <p>You agree to use the website only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website.</p>
            </section>
            <section>
                <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}>4. Limitation of Liability</h2>
                <p>In no event shall Parteek Garg be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or use of the website.</p>
            </section>
        </div>
    );
}

export function CookiesContent() {
    return (
        <div className="space-y-8" style={{ color: "var(--color-text-secondary)" }}>
            <section>
                <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}>1. Necessary Cookies</h2>
                <p>These cookies are essential for the website to function properly. They enable basic functions like page navigation, theme preferences, and access to secure areas of the website. The website cannot function properly without these cookies.</p>
            </section>
            <section>
                <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}>2. Analytics Cookies</h2>
                <p>We use analytics cookies to understand how visitors interact with our website. These cookies collect and report information anonymously to help us improve the user experience.</p>
            </section>
            <section>
                <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}>3. Managing Cookies</h2>
                <p>You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, please note that some parts of this website may become inaccessible or not function properly.</p>
            </section>
        </div>
    );
}

export function CreditsContent() {
    return (
        <div className="space-y-8" style={{ color: "var(--color-text-secondary)" }}>
            <section>
                <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}>1. Technologies Used</h2>
                <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Next.js:</strong> React framework for production.</li>
                    <li><strong>Tailwind CSS:</strong> Utility-first CSS framework for rapid UI development.</li>
                    <li><strong>Framer Motion:</strong> Production-ready motion library for React.</li>
                    <li><strong>Three.js / React Three Fiber:</strong> Used for the cinematic neural background effects.</li>
                </ul>
            </section>
            <section>
                <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}>2. Fonts & Typography</h2>
                <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Georgia / Serif:</strong> Used for primary headings and identity.</li>
                    <li><strong>Inter:</strong> Used for readable body copy.</li>
                    <li><strong>Oswald:</strong> Used for uppercase UI elements and labels.</li>
                </ul>
            </section>
            <section>
                <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}>3. Icons & Assets</h2>
                <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Lucide React:</strong> Clean, consistent SVG icons.</li>
                    <li><strong>React Icons:</strong> For brand icons like LeetCode.</li>
                </ul>
            </section>
        </div>
    );
}

export function ChangelogContent() {
    const H = ({ children }: { children: React.ReactNode }) => (
        <h2 className="text-xl font-semibold mb-1" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}>{children}</h2>
    );
    const Sub = ({ children }: { children: React.ReactNode }) => (
        <p className="text-sm mb-4 italic" style={{ color: "var(--color-text-secondary)", opacity: 0.7 }}>{children}</p>
    );

    return (
        <div className="space-y-10" style={{ color: "var(--color-text-secondary)" }}>

            <section>
                <H>v1.3.0 — July 2026</H>
                <Sub>The Editorial Overhaul</Sub>
                <ul className="list-disc pl-5 space-y-1.5">
                    <li>Sliding legal modal — all legal pages now float up as an overlay instead of navigating away.</li>
                    <li>Editorial tab navigation inside the modal with Framer Motion <code>layoutId</code> underline glide.</li>
                    <li>Dynamic browser tab titles — rotating messages when the tab is inactive, restores on return.</li>
                    <li>Custom smooth scroll engine with ease-out quint curve, replaces native browser scrolling.</li>
                    <li>Scroll animation cancellation — user input instantly aborts programmatic scroll.</li>
                    <li>Unified 3px hairline scrollbar system across the entire site.</li>
                    <li>Consistent serif typography system — all headings now use Georgia globally.</li>
                    <li>Footer links redesigned with animated underlines matching Hero CTA behavior.</li>
                    <li>Footer name scaled for better visual balance.</li>
                </ul>
            </section>

            <section>
                <H>v1.2.0 — June 13, 2026</H>
                <Sub>The Polish Sprint</Sub>
                <ul className="list-disc pl-5 space-y-1.5">
                    <li>Layout-driven crossfade for project cards — resolved 0-height rendering flashes.</li>
                    <li>Hero tagline updated to highlight AI and Data Science focus.</li>
                    <li>Perfectly smooth Framer Motion crossfade without layout jumps on project transitions.</li>
                    <li>Fixed navbar anchor scrolling and <code>layoutId</code> animation glitch.</li>
                    <li>Bypassed Next.js router for smooth hash-based scrolling on the hero page.</li>
                    <li>Static editorial labels and Framer Motion contact buttons.</li>
                    <li>Horizontal dividers between all major sections for visual rhythm.</li>
                    <li>Certificate modal text clipping fixed with <code>flex-wrap</code>.</li>
                    <li>Scroll margin offsets added to Projects, Skills, and About sections for precise anchor targeting.</li>
                    <li>Updated project modal and certificate modal styling for consistency.</li>
                </ul>
            </section>

            <section>
                <H>v1.1.0 — June 11, 2026</H>
                <Sub>The Modal Architecture</Sub>
                <ul className="list-disc pl-5 space-y-1.5">
                    <li>Full project modal system — dynamic overlay modals replaced separate project pages.</li>
                    <li>Auto-scrolling project screenshot gallery with lightbox zoom.</li>
                    <li>Certification showcase with PDF-compatible lightbox using <code>react-pdf</code>.</li>
                    <li>Native canvas rendering for flawless mobile PDF scaling.</li>
                    <li>Dynamically loaded <code>react-pdf</code> to prevent <code>DOMMatrix</code> SSR failure during production builds.</li>
                    <li>Synchronized close button exit animations across all modals.</li>
                    <li>Resolved sticky scrolling block in ProjectModal and restored natural mobile layout order.</li>
                    <li>Fixed footer element overlap on mobile viewports.</li>
                    <li>Hero layout refined — emojis replaced with Lucide icons.</li>
                    <li>Comprehensive project screenshots, issuer logos, and certification PDFs added as assets.</li>
                    <li>About Me section centered with side-by-side interest pills.</li>
                    <li>SocialPill z-index and modal interaction conflicts resolved.</li>
                </ul>
            </section>

            <section>
                <H>v1.0.0 — May 22, 2026</H>
                <Sub>The SEO & Accessibility Pass</Sub>
                <ul className="list-disc pl-5 space-y-1.5">
                    <li>Comprehensive SEO optimizations — meta descriptions, Open Graph tags, structured data.</li>
                    <li>Custom favicon and OG image generated.</li>
                    <li>Mobile UI refinements across all sections.</li>
                    <li>Certifications added to navbar navigation.</li>
                </ul>
            </section>

            <section>
                <H>v0.9.0 — April 23, 2026</H>
                <Sub>The Design System</Sub>
                <ul className="list-disc pl-5 space-y-1.5">
                    <li>Switched display font to Georgia serif — established the editorial identity.</li>
                    <li>Dark/light theme toggle with smooth transitions via <code>Providers</code> architecture.</li>
                    <li>Copy-to-clipboard email button with Framer Motion transition feedback.</li>
                    <li>Certifications section built with aligned card layout.</li>
                    <li>Global CSS variables and animation system established.</li>
                    <li>Hero, Navbar, SocialPill, About, Skills, and Projects components all refined.</li>
                    <li>Custom 404 page designed.</li>
                    <li>Footer padding adjusted to clear the floating SocialPill.</li>
                </ul>
            </section>

            <section>
                <H>v0.5.0 — March 18, 2026</H>
                <Sub>The Infrastructure</Sub>
                <ul className="list-disc pl-5 space-y-1.5">
                    <li>MIT License added.</li>
                    <li>Netlify deployment configured — cache headers, <code>_redirects</code>, static export.</li>
                    <li>Scroll restoration fix — browser scroll restore prevented, forced top on page load.</li>
                    <li>Project detail pages removed in favor of the modal-first approach.</li>
                    <li>Hero animation skip on back-navigation implemented.</li>
                </ul>
            </section>

            <section>
                <H>v0.1.0 — March 12, 2026</H>
                <Sub>The Big Bang</Sub>
                <ul className="list-disc pl-5 space-y-1.5">
                    <li>Major portfolio overhaul — complete redesign from scratch.</li>
                    <li>Comprehensive README with architecture diagrams and animation pipeline docs.</li>
                    <li>Core sections built: Hero, About, Projects, Skills, Contact.</li>
                    <li>Framer Motion animation system integrated.</li>
                    <li>Next.js 16 with Turbopack as the foundation.</li>
                </ul>
            </section>

            <section>
                <H>v0.0.1 — March 1, 2026</H>
                <Sub>Initial Commit</Sub>
                <ul className="list-disc pl-5 space-y-1.5">
                    <li>Repository created.</li>
                    <li>Project scaffolded with Next.js and Tailwind CSS.</li>
                    <li>The journey begins.</li>
                </ul>
            </section>
        </div>
    );
}

export function SitemapContent() {
    return (
        <div className="space-y-8" style={{ color: "var(--color-text-secondary)" }}>
            <section>
                <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}>Core Pages</h2>
                <ul className="list-disc pl-5 space-y-1">
                    <li><a href="/" className="underline hover:opacity-80">Home</a></li>
                    <li><a href="/#about" className="underline hover:opacity-80">About</a></li>
                    <li><a href="/#projects" className="underline hover:opacity-80">Projects</a></li>
                    <li><a href="/#skills" className="underline hover:opacity-80">Skills</a></li>
                    <li><a href="/#contact" className="underline hover:opacity-80">Contact</a></li>
                </ul>
            </section>
            <section>
                <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}>Legal & Trust</h2>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Privacy Policy</li>
                    <li>Terms of Use</li>
                    <li>Cookie Policy</li>
                    <li>Credits</li>
                    <li>Changelog</li>
                    <li>Sitemap</li>
                </ul>
            </section>
        </div>
    );
}
