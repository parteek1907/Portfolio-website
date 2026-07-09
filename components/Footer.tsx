"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const checkTheme = () => {
            setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
        };
        checkTheme();
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
        return () => observer.disconnect();
    }, []);

    const currentYear = new Date().getFullYear();
    const buildVersion = "v1.4.0"; // Updated July 2026
    const lastUpdated = "July 2026";

    const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
        <Link
            href={href}
            scroll={false}
            className="group relative transition-colors duration-300 opacity-80 hover:opacity-100"
            style={{ textDecoration: 'none', fontWeight: 400, color: "var(--color-text-secondary)" }}
            onMouseEnter={(e) => e.currentTarget.style.color = "var(--color-text-primary)"}
            onMouseLeave={(e) => e.currentTarget.style.color = "var(--color-text-secondary)"}
        >
            <span>{children}</span>
            <span className="absolute -bottom-1 left-0 w-0 h-px transition-all duration-500 ease-out group-hover:w-full opacity-60" style={{ background: "currentColor" }}></span>
        </Link>
    );

    return (
        <footer className="relative pt-24 pb-8" style={{ backgroundColor: isDark ? "var(--color-bg-primary)" : "#E8E2DA", borderTop: "1px solid var(--color-border)" }}>
            <div className="max-w-7xl mx-auto px-6">

                {/* Centered Minimal Identity */}
                <div className="flex flex-col items-center justify-center text-center mb-16">
                    {/* Animated Signature */}
                    <motion.div 
                        initial={{ clipPath: "inset(0% 100% 0% 0%)", opacity: 0, scale: 0.98 }}
                        whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
                        className="w-[300px] md:w-[440px] mb-10 flex justify-center items-center pointer-events-none select-none relative"
                    >
                        <img
                            src="/Parteek%20Garg%20(480%20x%20120%20px).svg"
                            alt="Parteek Garg Signature"
                            className={`w-full h-auto object-contain drop-shadow-sm opacity-90 transition-colors duration-500 ${isDark ? 'invert' : ''}`}
                        />
                    </motion.div>
                    <p className="text-sm md:text-base font-medium mb-10" style={{ color: "var(--color-text-secondary)" }}>Building Practical Systems</p>

                    {/* The small line with a dot */}
                    <div className="flex items-center justify-center gap-2 w-full max-w-[200px] mx-auto mb-10 opacity-30">
                        <div className="h-px w-full" style={{ background: "var(--color-text-primary)" }}></div>
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--color-text-primary)" }}></div>
                        <div className="h-px w-full" style={{ background: "var(--color-text-primary)" }}></div>
                    </div>

                    <p className="text-sm font-normal" style={{ color: "var(--color-text-secondary)", opacity: 0.8 }}>
                        © {currentYear} Parteek Garg
                    </p>
                </div>

                {/* Long subtle line spanning screen */}
                <div className="w-full h-px mb-8" style={{ background: "var(--color-border-strong)", opacity: 0.5 }}></div>

                {/* Bottom Row - 3 Columns (Left: Links, Center: Docking Space, Right: Metadata) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-xs md:text-sm" style={{ color: "var(--color-text-secondary)" }}>

                    {/* LEFT: Legal Links aligned perfectly */}
                    <div className="grid grid-cols-[auto_auto_auto_auto_auto] gap-x-2 md:gap-x-4 gap-y-2 items-center justify-center md:justify-start whitespace-nowrap w-fit mx-auto md:mx-0">
                        <FooterLink href="?modal=privacy">Privacy Policy</FooterLink>
                        <span className="opacity-40 text-center" style={{ fontWeight: 400 }}>|</span>
                        <FooterLink href="?modal=terms">Terms of Use</FooterLink>
                        <span className="opacity-40 text-center" style={{ fontWeight: 400 }}>|</span>
                        <FooterLink href="?modal=cookies">Cookie Policy</FooterLink>

                        <FooterLink href="?modal=credits">Credits</FooterLink>
                        <span className="opacity-40 text-center" style={{ fontWeight: 400 }}>|</span>
                        <FooterLink href="?modal=changelog">Changelog</FooterLink>
                    </div>

                    {/* CENTER: Empty space for SocialPill to dock into */}
                    <div className="h-[60px] w-full flex items-center justify-center pointer-events-none"></div>

                    {/* RIGHT: Metadata */}
                    <div className="flex items-center justify-center md:justify-end gap-3 font-normal opacity-80">
                        <span>Build {buildVersion}</span>
                        <span>•</span>
                        <span>Updated: {lastUpdated}</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
