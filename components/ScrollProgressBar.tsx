"use client";

import { useEffect, useRef } from "react";

export default function ScrollProgressBar() {
    const barRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            if (barRef.current) {
                barRef.current.style.width = `${progress}%`;
            }
        };

        const onScroll = () => requestAnimationFrame(updateProgress);
        window.addEventListener("scroll", onScroll, { passive: true });
        updateProgress();

        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div
            ref={barRef}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                height: 2,
                width: "0%",
                background: "linear-gradient(to right, #7c3aed, #8b5cf6, #a78bfa)",
                boxShadow: "0 0 8px rgba(139, 92, 246, 0.6)",
                zIndex: 99999,
                pointerEvents: "none",
            }}
        />
    );
}
