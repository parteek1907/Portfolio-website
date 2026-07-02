import React from 'react';

export function PrivacyContent() {
    return (
        <div className="space-y-8" style={{ color: "var(--color-text-secondary)" }}>
            <section>
                <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>1. Information We Collect</h2>
                <p className="mb-2">We collect minimal information necessary to provide and improve our services. The types of personal information we may collect include:</p>
                <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Contact Information:</strong> Name, email address, and any messages you provide when using our contact form.</li>
                    <li><strong>Usage Data:</strong> Information about how you navigate and interact with our website, collected via analytics tools.</li>
                    <li><strong>Technical Data:</strong> IP address, browser type, device information, and operating system details collected automatically by hosting providers.</li>
                </ul>
            </section>
            <section>
                <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>2. How We Use Your Information</h2>
                <p className="mb-2">The information collected is used solely for the following purposes:</p>
                <ul className="list-disc pl-5 space-y-1">
                    <li>To respond to your inquiries and communications via the contact form.</li>
                    <li>To analyze website usage trends and improve user experience.</li>
                    <li>To ensure the security and functionality of the website.</li>
                </ul>
            </section>
            <section>
                <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>3. Third-Party Services</h2>
                <p>We use minimal analytics services to understand traffic without tracking individual users across the web. Our hosting providers may collect standard access logs for operations.</p>
            </section>
            <section>
                <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>4. Data Retention</h2>
                <p>We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy.</p>
            </section>
        </div>
    );
}

export function TermsContent() {
    return (
        <div className="space-y-8" style={{ color: "var(--color-text-secondary)" }}>
            <section>
                <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>1. Acceptance of Terms</h2>
                <p>By accessing and using this website, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use this service.</p>
            </section>
            <section>
                <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>2. Intellectual Property</h2>
                <p>The website and its original content, features, functionality, and design are owned by Parteek Garg and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.</p>
            </section>
            <section>
                <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>3. Website Usage</h2>
                <p>You agree to use the website only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website.</p>
            </section>
            <section>
                <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>4. Limitation of Liability</h2>
                <p>In no event shall Parteek Garg be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or use of the website.</p>
            </section>
        </div>
    );
}

export function CookiesContent() {
    return (
        <div className="space-y-8" style={{ color: "var(--color-text-secondary)" }}>
            <section>
                <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>1. Necessary Cookies</h2>
                <p>These cookies are essential for the website to function properly. They enable basic functions like page navigation, theme preferences, and access to secure areas of the website. The website cannot function properly without these cookies.</p>
            </section>
            <section>
                <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>2. Analytics Cookies</h2>
                <p>We use analytics cookies to understand how visitors interact with our website. These cookies collect and report information anonymously to help us improve the user experience.</p>
            </section>
            <section>
                <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>3. Managing Cookies</h2>
                <p>You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, please note that some parts of this website may become inaccessible or not function properly.</p>
            </section>
        </div>
    );
}

export function CreditsContent() {
    return (
        <div className="space-y-8" style={{ color: "var(--color-text-secondary)" }}>
            <section>
                <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>1. Technologies Used</h2>
                <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Next.js:</strong> React framework for production.</li>
                    <li><strong>Tailwind CSS:</strong> Utility-first CSS framework for rapid UI development.</li>
                    <li><strong>Framer Motion:</strong> Production-ready motion library for React.</li>
                    <li><strong>Three.js / React Three Fiber:</strong> Used for the cinematic neural background effects.</li>
                </ul>
            </section>
            <section>
                <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>2. Fonts & Typography</h2>
                <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Georgia / Serif:</strong> Used for primary headings and identity.</li>
                    <li><strong>Inter:</strong> Used for readable body copy.</li>
                    <li><strong>Oswald:</strong> Used for uppercase UI elements and labels.</li>
                </ul>
            </section>
            <section>
                <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>3. Icons & Assets</h2>
                <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Lucide React:</strong> Clean, consistent SVG icons.</li>
                    <li><strong>React Icons:</strong> For brand icons like LeetCode.</li>
                </ul>
            </section>
        </div>
    );
}

export function ChangelogContent() {
    return (
        <div className="space-y-8" style={{ color: "var(--color-text-secondary)" }}>
            <section>
                <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>v1.2.0 - July 2026</h2>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Implemented sliding Legal Modal overlay for better UX.</li>
                    <li>Redesigned Footer with ultra-minimal 5-column grid.</li>
                    <li>Added dynamic browser tab title animations.</li>
                    <li>Polished interaction states and typography scales.</li>
                </ul>
            </section>
            <section>
                <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>v1.1.0 - June 2026</h2>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Added Cinematic Neural Background using WebGL.</li>
                    <li>Integrated custom cursor and scroll progress bar.</li>
                    <li>Improved hydration mismatch on initial load.</li>
                </ul>
            </section>
            <section>
                <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>v1.0.0 - May 2026</h2>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Initial portfolio release.</li>
                    <li>Added Hero, Projects, Skills, and Contact sections.</li>
                </ul>
            </section>
        </div>
    );
}

export function SitemapContent() {
    return (
        <div className="space-y-8" style={{ color: "var(--color-text-secondary)" }}>
            <section>
                <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>Core Pages</h2>
                <ul className="list-disc pl-5 space-y-1">
                    <li><a href="/" className="underline hover:opacity-80">Home</a></li>
                    <li><a href="/#about" className="underline hover:opacity-80">About</a></li>
                    <li><a href="/#projects" className="underline hover:opacity-80">Projects</a></li>
                    <li><a href="/#skills" className="underline hover:opacity-80">Skills</a></li>
                    <li><a href="/#contact" className="underline hover:opacity-80">Contact</a></li>
                </ul>
            </section>
            <section>
                <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>Legal & Trust</h2>
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
