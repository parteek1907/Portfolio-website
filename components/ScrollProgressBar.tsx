"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import { useWindows } from "@/components/windows/WindowsContext";

export default function ScrollProgressBar() {
    const { isWindowsMode } = useWindows();
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
    const [theme, setTheme] = useState("dark");

    useEffect(() => {
        const check = () => {
            const t = document.documentElement.getAttribute("data-theme");
            setTheme(t || "dark");
        };
        check();

        const observer = new MutationObserver(check);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
        return () => observer.disconnect();
    }, []);

    if (isWindowsMode) return null;

    return (
        <motion.div
            style={{
                scaleX,
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                transformOrigin: "0%",
                background: "var(--color-text-primary)",
                boxShadow: theme === "dark"
                    ? "0 0 8px rgba(255, 255, 255, 0.15)"
                    : "0 0 8px rgba(0, 0, 0, 0.1)",
                zIndex: 99999,
                pointerEvents: "none",
            }}
        />
    );
}
