"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { smoothScrollTo } from "@/lib/smoothScroll";

export default function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);
    const [isDark, setIsDark] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsVisible(latest > 400);
    });

    useEffect(() => {
        const checkTheme = () => {
            setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
        };
        checkTheme();
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
        return () => observer.disconnect();
    }, []);

    const scrollToTop = () => {
        smoothScrollTo(0, 1400);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    onClick={scrollToTop}
                    aria-label="Back to top"
                    className={`
                    fixed z-[40] hidden md:flex items-center justify-center
                    w-11 h-11 rounded-full cursor-pointer
                    bg-transparent backdrop-blur-[8px]
                    transition-all duration-200 ease-in-out
                    hover:scale-110 hover:opacity-70
                    bottom-8 right-4 md:right-6
                    ${isVisible
                            ? "opacity-100 translate-y-0 pointer-events-auto"
                            : "opacity-0 translate-y-4 pointer-events-none"
                        }
                    `}
                    style={{
                        background: isDark ? "#1E1E1E" : "#FAF7F4",
                        border: isDark ? "1px solid var(--color-border)" : "1px solid rgba(0, 0, 0, 0.12)",
                        color: isDark ? "var(--color-text-secondary)" : "#6B6560",
                    }}
                >
                    <ArrowUp size={18} />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
