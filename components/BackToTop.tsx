"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { smoothScrollTo } from "@/lib/smoothScroll";
import { useWindows } from "@/components/windows/WindowsContext";

export default function BackToTop() {
    const { isWindowsMode } = useWindows();
    const [isVisible, setIsVisible] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsVisible(latest > 400);
    });

    const scrollToTop = () => {
        smoothScrollTo(0, 1400);
    };

    if (isWindowsMode) return null;

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
                        background: "var(--color-surface)",
                        border: "1px solid var(--color-border)",
                        color: "var(--color-text-secondary)",
                    }}
                >
                    <ArrowUp size={18} />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
