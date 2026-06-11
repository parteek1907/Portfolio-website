"use client";

import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Github, Instagram, Linkedin } from "lucide-react";
import { socialLinks } from "@/lib/data";
import { useState, useEffect } from "react";
import { SiLeetcode } from "react-icons/si";
import { Theme } from "@/components/ui/theme";

export default function SocialPill() {
    const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isDark, setIsDark] = useState(true);
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
        // Initial check
        setIsModalOpen(body.style.overflow === "hidden");
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const html = document.documentElement;
        const updateTheme = () => {
            setIsDark(html.getAttribute("data-theme") === "dark");
        };
        updateTheme();
        const observer = new MutationObserver(updateTheme);
        observer.observe(html, { attributes: true, attributeFilter: ["data-theme"] });
        return () => observer.disconnect();
    }, []);

    const icons = [
        { name: "GitHub", icon: Github, href: socialLinks.github },
        { name: "LinkedIn", icon: Linkedin, href: socialLinks.linkedin },
        { name: "X", isX: true, href: socialLinks.twitter },
        { name: "Instagram", icon: Instagram, href: socialLinks.instagram },
        { name: "LeetCode", icon: SiLeetcode, href: socialLinks.leetcode },
    ];

    return (
        <AnimatePresence>
            {isVisible && !isModalOpen && (
                <motion.div
                    initial={{ y: 20, opacity: 0, scale: 0.96 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 20, opacity: 0, scale: 0.96 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed left-1/2 -translate-x-1/2 bottom-8 z-[9999] flex items-center gap-2 sm:gap-4 px-4 sm:px-6 py-3"
                    style={{
                        borderRadius: "999px",
                        background: isDark
                            ? "rgba(30, 30, 30, 0.7)"
                            : "rgba(250, 247, 244, 0.6)",
                        backdropFilter: "blur(20px) saturate(180%)",
                        WebkitBackdropFilter: "blur(20px) saturate(180%)",
                        border: isDark
                            ? "1px solid #444444"
                            : "1px solid rgba(0, 0, 0, 0.1)",
                        boxShadow: isDark
                            ? "0 4px 24px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)"
                            : "0 4px 24px rgba(0, 0, 0, 0.08)",
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
                                    color: isDark ? "#B0B0B0" : "rgba(0, 0, 0, 0.5)",
                                }}
                                onMouseEnter={(e) => {
                                    setHoveredIcon(item.name);
                                    e.currentTarget.style.color = isDark ? "#E0E0E0" : "rgba(0, 0, 0, 0.85)";
                                    e.currentTarget.style.background = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.06)";
                                }}
                                onMouseLeave={(e) => {
                                    setHoveredIcon(null);
                                    e.currentTarget.style.color = isDark ? "#B0B0B0" : "rgba(0, 0, 0, 0.5)";
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
                                                background: isDark ? "#fff" : "#222",
                                                color: isDark ? "#000" : "#fff",
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
                            background: isDark
                                ? "#444444"
                                : "rgba(0, 0, 0, 0.12)",
                        }}
                    />

                    {/* Theme toggle — inherit pill icon colors */}
                    <div
                        style={{
                            color: isDark ? "#B0B0B0" : "rgba(0, 0, 0, 0.5)",
                        }}
                    >
                        <Theme variant="button" size="lg" themes={["light", "dark"]} className="!text-inherit !h-auto !p-2 !rounded-full" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
