"use client";

import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Github, Instagram, Linkedin } from "lucide-react";
import { socialLinks } from "@/lib/data";
import { useState, useEffect } from "react";
import { Theme } from "@/components/ui/theme";
import { useWindows } from "@/components/windows/WindowsContext";

function LeetCodeIcon({ size = 20 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
        </svg>
    );
}

export default function SocialPill() {
    const { isWindowsMode } = useWindows();
    const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (typeof window === "undefined") return;
        const heroTrigger = 100;
        setIsVisible(latest > heroTrigger);
    });

    useEffect(() => {
        const body = document.body;
        const observer = new MutationObserver(() => {
            setIsModalOpen(body.style.overflow === "hidden");
        });
        observer.observe(body, { attributes: true, attributeFilter: ["style"] });
        setIsModalOpen(body.style.overflow === "hidden");
        return () => observer.disconnect();
    }, []);

    const icons = [
        { name: "GitHub", icon: Github, href: socialLinks.github },
        { name: "LinkedIn", icon: Linkedin, href: socialLinks.linkedin },
        { name: "X", isX: true, href: socialLinks.twitter },
        { name: "Instagram", icon: Instagram, href: socialLinks.instagram },
        { name: "LeetCode", icon: LeetCodeIcon, href: socialLinks.leetcode },
    ];

    if (isWindowsMode) return null;

    return (
        <AnimatePresence>
            {isVisible && !isModalOpen && (
                <motion.div
                    initial={{ y: 20, opacity: 0, scale: 0.96 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 20, opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed left-1/2 -translate-x-1/2 bottom-8 z-[9999] flex items-center gap-2 sm:gap-4 px-4 sm:px-6 py-3"
                    style={{
                        borderRadius: "999px",
                        background: "var(--color-bg-secondary)",
                        backdropFilter: "blur(20px) saturate(180%)",
                        WebkitBackdropFilter: "blur(20px) saturate(180%)",
                        border: "1px solid var(--color-border)",
                        boxShadow: "0 4px 24px rgba(0, 0, 0, 0.25), 0 1px 2px rgba(0, 0, 0, 0.15)",
                        transition: "background 0.35s ease, border 0.35s ease, box-shadow 0.35s ease",
                    }}
                >
                    {icons.map((item) => (
                        <div key={item.name} className="relative group">
                            <a
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative flex items-center justify-center p-2 rounded-full transition-all duration-300"
                                style={{
                                    color: "var(--color-text-secondary)",
                                }}
                                onMouseEnter={(e) => {
                                    setHoveredIcon(item.name);
                                    e.currentTarget.style.color = "var(--color-text-primary)";
                                    e.currentTarget.style.background = "var(--color-border)";
                                }}
                                onMouseLeave={(e) => {
                                    setHoveredIcon(null);
                                    e.currentTarget.style.color = "var(--color-text-secondary)";
                                    e.currentTarget.style.background = "transparent";
                                }}
                            >
                                {item.icon ? (
                                    <item.icon size={20} />
                                ) : item.isX ? (
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                ) : (
                                    <></>
                                )}

                                {/* Tooltip */}
                                <AnimatePresence>
                                    {hoveredIcon === item.name && (
                                        <motion.span
                                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                            animate={{ opacity: 1, y: -10, scale: 1 }}
                                            exit={{ opacity: 0, y: 5, scale: 0.9 }}
                                            className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs font-bold rounded shadow-lg whitespace-nowrap pointer-events-none"
                                            style={{
                                                background: "var(--color-text-primary)",
                                                color: "var(--color-bg-primary)",
                                            }}
                                        >
                                            {item.name}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </a>
                        </div>
                    ))}

                    {/* Divider */}
                    <div
                        className="w-px h-5 mx-1"
                        style={{
                            background: "var(--color-border)",
                        }}
                    />

                    {/* Theme toggle — inherit pill icon colors */}
                    <div
                        style={{
                            color: "var(--color-text-secondary)",
                        }}
                    >
                        <Theme variant="button" size="lg" themes={["light", "dark"]} className="!text-inherit !h-auto !p-2 !rounded-full" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
