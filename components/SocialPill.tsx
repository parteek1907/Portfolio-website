"use client";

import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Github, Instagram, Linkedin, Twitter, Sun, Moon } from "lucide-react";
import { socialLinks } from "@/lib/data";
import { useState } from "react";
import Image from "next/image";
import { useTheme } from "./ThemeProvider";

export default function SocialPill() {
    const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const { scrollY } = useScroll();
    const { theme, toggleTheme } = useTheme();

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (typeof window === "undefined") return;

        // 1. Visibility Logic
        // "Pill should appear immediately after leaving Hero (even 1 scroll tick)"
        const heroTrigger = 100; // 100px scroll
        setIsVisible(latest > heroTrigger);
    });

    const icons = [
        { name: "GitHub", icon: Github, href: socialLinks.github },
        { name: "LinkedIn", icon: Linkedin, href: socialLinks.linkedin },
        { name: "X", isX: true, href: socialLinks.twitter },
        { name: "Instagram", icon: Instagram, href: socialLinks.instagram },
        { name: "LeetCode", isLeetCode: true, href: socialLinks.leetcode },
    ];

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    // Animation States
                    initial={{ y: 20, opacity: 0, scale: 0.96 }}
                    animate={{
                        y: 0,
                        opacity: 1,
                        scale: 1
                    }}
                    exit={{ y: 20, opacity: 0, scale: 0.96 }}

                    // Ultra-smooth animation
                    transition={{
                        duration: 1,
                        ease: [0.16, 1, 0.3, 1]
                    }}

                    // Fixed position, bottom center, z-index 9999
                    // Force dark styling always (no bg-white for container)
                    // Updated per user request: ALWAYS dark, decoupled from theme
                    className="fixed left-1/2 -translate-x-1/2 bottom-8 z-[9999] flex items-center gap-2 sm:gap-4 px-4 sm:px-6 py-3 rounded-full 
                            bg-black/40 backdrop-blur-3xl border border-white/10 
                            shadow-xl shadow-black/40 hover:border-white/20"
                >
                    {icons.map((item) => (
                        <div key={item.name} className="relative group">
                            <a
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative flex items-center justify-center p-2 rounded-full 
                                        text-zinc-400 hover:text-white 
                                        hover:bg-white/10 transition-all duration-300"
                                onMouseEnter={() => setHoveredIcon(item.name)}
                                onMouseLeave={() => setHoveredIcon(null)}
                            >
                                {item.icon ? (
                                    <item.icon size={20} />
                                ) : item.isX ? (
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                ) : item.isLeetCode ? (
                                    <div className="w-5 h-5 relative opacity-70 group-hover:opacity-100 transition-opacity">
                                        <Image
                                            src="/leetcode.png"
                                            alt="LeetCode"
                                            width={20}
                                            height={20}
                                            className="object-contain"
                                        />
                                    </div>
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
                                            className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-white text-black text-xs font-bold rounded shadow-lg whitespace-nowrap pointer-events-none"
                                        >
                                            {item.name}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </a>
                        </div>
                    ))}



                </motion.div>
            )}
        </AnimatePresence>
    );
}
