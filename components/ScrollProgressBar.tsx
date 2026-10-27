"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useWindows } from "@/components/windows/WindowsContext";

export default function ScrollProgressBar() {
    const { isWindowsMode } = useWindows();
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

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
                boxShadow: "0 0 8px var(--color-border)",
                zIndex: 99999,
                pointerEvents: "none",
            }}
        />
    );
}
