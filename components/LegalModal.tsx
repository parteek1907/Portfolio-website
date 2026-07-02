"use client";

import { useEffect, useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
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
                        {/* Header */}
                        <div 
                            className="flex items-center justify-between px-6 py-5 border-b"
                            style={{ borderColor: "var(--color-border)" }}
                        >
                            <h2 className="text-2xl font-serif tracking-tight" style={{ color: "var(--color-text-primary)" }}>
                                {modalData.title}
                            </h2>
                            <button
                                onClick={closeModal}
                                className="p-2 rounded-full hover:bg-black/5 hover:dark:bg-white/10 transition-colors"
                            >
                                <X size={24} style={{ color: "var(--color-text-secondary)" }} />
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto px-6 py-10">
                            <div className="max-w-3xl mx-auto pb-10">
                                {modalData.content}
                            </div>
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
