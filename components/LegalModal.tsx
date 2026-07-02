"use client";

import { useEffect, useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const LEGAL_PAGES = [
    { id: 'privacy', label: 'Privacy Policy' },
    { id: 'terms', label: 'Terms of Use' },
    { id: 'cookies', label: 'Cookie Policy' },
    { id: 'credits', label: 'Credits' },
    { id: 'changelog', label: 'Changelog' },
];
import {
    PrivacyContent,
    TermsContent,
    CookiesContent,
    CreditsContent,
    ChangelogContent,
    SitemapContent
} from "./legal/LegalContent";

function LegalModalInner() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const modalType = searchParams.get("modal"); // 'privacy', 'terms', etc.
    
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        const html = document.documentElement;
        const updateTheme = () => setIsDark(html.getAttribute("data-theme") === "dark");
        updateTheme();
        const observer = new MutationObserver(updateTheme);
        observer.observe(html, { attributes: true, attributeFilter: ["data-theme"] });
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (modalType) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [modalType]);

    // Handle Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && modalType) {
                closeModal();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [modalType]);

    const closeModal = () => {
        router.push(window.location.pathname + window.location.hash, { scroll: false });
    };

    const getContent = () => {
        switch (modalType) {
            case 'privacy': return { title: 'Privacy Policy', content: <PrivacyContent /> };
            case 'terms': return { title: 'Terms of Use', content: <TermsContent /> };
            case 'cookies': return { title: 'Cookie Policy', content: <CookiesContent /> };
            case 'credits': return { title: 'Credits', content: <CreditsContent /> };
            case 'changelog': return { title: 'Changelog', content: <ChangelogContent /> };
            case 'sitemap': return { title: 'Sitemap', content: <SitemapContent /> };
            default: return null;
        }
    };

    const modalData = getContent();

    return (
        <AnimatePresence>
            {modalType && modalData && (
                <div className="fixed inset-0 z-[99999] flex flex-col justify-end pointer-events-none">
                    
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
                        onClick={closeModal}
                    />

                    {/* Sliding Panel */}
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="relative w-full max-w-4xl mx-auto h-[85vh] md:h-[80vh] rounded-t-3xl shadow-2xl pointer-events-auto flex flex-col overflow-hidden"
                        style={{
                            background: isDark ? "var(--color-bg-primary)" : "#FAF7F4",
                            borderTop: "1px solid var(--color-border)",
                            borderLeft: "1px solid var(--color-border)",
                            borderRight: "1px solid var(--color-border)"
                        }}
                    >
                        {/* Editorial Header */}
                        <div className="px-8 pt-8 pb-0">
                            {/* Top row: Title + Close */}
                            <div className="flex items-start justify-between mb-6">
                                <div className="overflow-hidden">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={modalType}
                                            initial={{ opacity: 0, y: 12 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -12 }}
                                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                        >
                                            <h2 className="text-3xl md:text-4xl font-serif tracking-tight leading-tight" style={{ color: "var(--color-text-primary)" }}>
                                                {modalData.title}
                                            </h2>
                                            <p className="text-xs mt-2 tracking-widest uppercase" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-ui)", letterSpacing: "0.15em" }}>
                                                Last updated — July 2026
                                            </p>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="p-2 -mt-1 -mr-2 transition-opacity opacity-40 hover:opacity-100"
                                >
                                    <X size={20} style={{ color: "var(--color-text-primary)" }} />
                                </button>
                            </div>

                            {/* Editorial Navigation */}
                            <nav 
                                className="flex items-center gap-6 md:gap-8 overflow-x-auto custom-scrollbar border-b"
                                style={{ borderColor: "var(--color-border)" }}
                            >
                                {LEGAL_PAGES.map(page => {
                                    const isActive = modalType === page.id;
                                    return (
                                        <Link 
                                            key={page.id}
                                            href={`?modal=${page.id}`}
                                            scroll={false}
                                            className="relative pb-3 text-[13px] tracking-wide whitespace-nowrap transition-colors duration-200"
                                            style={{ 
                                                color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                                                fontFamily: "var(--font-ui)",
                                                fontWeight: isActive ? 600 : 400,
                                                letterSpacing: "0.06em",
                                                textTransform: "uppercase",
                                                textDecoration: "none",
                                                border: "none",
                                                background: "none"
                                            }}
                                            onMouseEnter={(e) => {
                                                if (!isActive) e.currentTarget.style.color = "var(--color-text-primary)";
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!isActive) e.currentTarget.style.color = "var(--color-text-secondary)";
                                            }}
                                        >
                                            {page.label}
                                            {isActive && (
                                                <motion.span 
                                                    layoutId="legal-tab-underline"
                                                    className="absolute bottom-0 left-0 w-full h-[2px]" 
                                                    style={{ background: "var(--color-text-primary)" }}
                                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                />
                                            )}
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto px-6 py-10 custom-scrollbar">
                            <AnimatePresence mode="wait">
                                <motion.div 
                                    key={modalType}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                    className="max-w-3xl mx-auto pb-10"
                                >
                                    {modalData.content}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

export default function LegalModal() {
    return (
        <Suspense fallback={null}>
            <LegalModalInner />
        </Suspense>
    );
}
