"use client";

import { useEffect, useRef, useState } from "react";
import { useWindows } from "@/components/windows/WindowsContext";

export default function CursorEffect() {
    const { isWindowsMode } = useWindows();
    const innerRef = useRef<HTMLDivElement>(null);
    const outerRef = useRef<HTMLDivElement>(null);
    const linesRef = useRef<HTMLDivElement>(null);

    const mouse = useRef({ x: 0, y: 0 });
    const outerPos = useRef({ x: 0, y: 0 });
    const rafRef = useRef<number>(0);
    const visible = useRef(false);

    const [isTouchDevice, setIsTouchDevice] = useState<boolean | null>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isDark, setIsDark] = useState(true);

    // Observe theme changes
    useEffect(() => {
        const check = () => {
            setIsDark(document.documentElement.getAttribute("data-theme") !== "light");
        };
        check();
        const observer = new MutationObserver(check);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
        return () => observer.disconnect();
    }, []);

    // Detect touch device
    useEffect(() => {
        setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
    }, []);

    // Mouse move + visibility + rAF loop that sleeps when mouse is idle
    useEffect(() => {
        if (isTouchDevice || isTouchDevice === null || isWindowsMode) return;

        let isAnimating = false;
        let idleCount = 0;

        const animate = () => {
            const dx = mouse.current.x - outerPos.current.x;
            const dy = mouse.current.y - outerPos.current.y;

            if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
                outerPos.current.x += dx * 0.10;
                outerPos.current.y += dy * 0.10;

                if (outerRef.current) {
                    outerRef.current.style.transform = `translate(${outerPos.current.x}px, ${outerPos.current.y}px) translate(-50%, -50%)`;
                }
                idleCount = 0;
            } else {
                idleCount++;
            }

            // Sleep after 25 stationary frames to save CPU
            if (idleCount < 25) {
                rafRef.current = requestAnimationFrame(animate);
            } else {
                isAnimating = false;
            }
        };

        const wakeLoop = () => {
            if (!isAnimating) {
                isAnimating = true;
                idleCount = 0;
                rafRef.current = requestAnimationFrame(animate);
            }
        };

        const onMove = (e: MouseEvent) => {
            mouse.current = { x: e.clientX, y: e.clientY };

            // Snap inner node + lines immediately
            if (innerRef.current) {
                innerRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
            }
            if (linesRef.current) {
                linesRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
            }

            if (!visible.current) {
                visible.current = true;
                outerPos.current = { x: e.clientX, y: e.clientY };
                setOpacity(1);
            }

            wakeLoop();
        };

        const onDocEnter = () => {
            visible.current = true;
            setOpacity(1);
            wakeLoop();
        };

        const onDocLeave = () => {
            visible.current = false;
            setOpacity(0);
        };

        function setOpacity(v: number) {
            if (innerRef.current) innerRef.current.style.opacity = String(v);
            if (outerRef.current) outerRef.current.style.opacity = String(v);
            if (linesRef.current) linesRef.current.style.opacity = String(v);
        }

        window.addEventListener("mousemove", onMove, { passive: true });
        document.addEventListener("mouseleave", onDocLeave, { passive: true });
        document.addEventListener("mouseenter", onDocEnter, { passive: true });

        // Initial burst
        wakeLoop();

        return () => {
            window.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseleave", onDocLeave);
            document.removeEventListener("mouseenter", onDocEnter);
            cancelAnimationFrame(rafRef.current);
        };
    }, [isTouchDevice, isWindowsMode]);

    // Lightweight event-delegation hover detection (zero DOM mutation observers)
    useEffect(() => {
        if (isTouchDevice || isTouchDevice === null || isWindowsMode) return;

        const SELECTOR = 'a, button, [role="button"], input, textarea, select';

        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as Element | null;
            if (target && target.closest(SELECTOR)) {
                setIsHovering(true);
            }
        };

        const onMouseOut = (e: MouseEvent) => {
            const target = e.target as Element | null;
            const related = e.relatedTarget as Element | null;
            if (target && target.closest(SELECTOR) && (!related || !related.closest(SELECTOR))) {
                setIsHovering(false);
            }
        };

        document.addEventListener("mouseover", onMouseOver, { passive: true });
        document.addEventListener("mouseout", onMouseOut, { passive: true });

        return () => {
            document.removeEventListener("mouseover", onMouseOver);
            document.removeEventListener("mouseout", onMouseOut);
        };
    }, [isTouchDevice, isWindowsMode]);

    // Don't render on touch devices, during SSR detection, or in Windows Mode
    if (isTouchDevice || isTouchDevice === null || isWindowsMode) return null;

    const lineAngles = [0, 90, 180, 270];

    // Theme-derived cursor colors
    const dotColor = isDark ? "#EDEDED" : "#222222";
    const dotGlow = isDark
        ? (isHovering ? "0 0 12px rgba(255,255,255,0.9)" : "0 0 8px rgba(255,255,255,0.15)")
        : (isHovering ? "0 0 12px rgba(0,0,0,0.4)" : "0 0 8px rgba(0,0,0,0.08)");
    const lineColor = isDark
        ? (isHovering ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.15)")
        : (isHovering ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.12)");
    const ringBorder = isDark
        ? (isHovering ? "1px solid rgba(255,255,255,0.7)" : "1px solid rgba(255,255,255,0.15)")
        : (isHovering ? "1px solid rgba(0,0,0,0.5)" : "1px solid rgba(0,0,0,0.12)");

    return (
        <>
            {/* Inner Node */}
            <div
                ref={innerRef}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: dotColor,
                    boxShadow: dotGlow,
                    pointerEvents: "none",
                    zIndex: 9999999,
                    opacity: 0,
                    transition: "background 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease",
                }}
            />

            {/* Radiating Lines */}
            <div
                ref={linesRef}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: 0,
                    height: 0,
                    pointerEvents: "none",
                    zIndex: 9999999,
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                }}
            >
                {lineAngles.map((angle, i) => (
                    <div
                        key={angle}
                        style={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                            height: 1,
                            background: lineColor,
                            transformOrigin: "left center",
                            transform: `rotate(${angle}deg) translateX(7px)`,
                            animation: `nodeLinesPulse 2s ease-in-out ${i * 0.5}s infinite`,
                            ...(isHovering ? { opacity: 1 } : {}),
                            transition: "background 0.15s ease, opacity 0.15s ease",
                        }}
                    />
                ))}
            </div>

            {/* Outer Ring */}
            <div
                ref={outerRef}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: "transparent",
                    border: ringBorder,
                    pointerEvents: "none",
                    zIndex: 9999998,
                    opacity: 0,
                    transition: "border-color 0.15s ease, opacity 0.15s ease",
                }}
            />
        </>
    );
}
