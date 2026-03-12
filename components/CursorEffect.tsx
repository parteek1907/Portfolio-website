"use client";

import { useEffect, useRef, useState } from "react";

export default function CursorEffect() {
    const innerRef = useRef<HTMLDivElement>(null);
    const outerRef = useRef<HTMLDivElement>(null);
    const linesRef = useRef<HTMLDivElement>(null);

    const mouse = useRef({ x: 0, y: 0 });
    const outerPos = useRef({ x: 0, y: 0 });
    const rafRef = useRef<number>(0);
    const visible = useRef(false);

    const [isTouchDevice, setIsTouchDevice] = useState<boolean | null>(null);
    const [isHovering, setIsHovering] = useState(false);

    // Detect touch device
    useEffect(() => {
        setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
    }, []);

    // Mouse move + visibility
    useEffect(() => {
        if (isTouchDevice || isTouchDevice === null) return;

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
        };

        const onDocEnter = () => {
            visible.current = true;
            setOpacity(1);
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

        window.addEventListener("mousemove", onMove);
        document.addEventListener("mouseleave", onDocLeave);
        document.addEventListener("mouseenter", onDocEnter);

        return () => {
            window.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseleave", onDocLeave);
            document.removeEventListener("mouseenter", onDocEnter);
        };
    }, [isTouchDevice]);

    // Outer ring lerp via rAF
    useEffect(() => {
        if (isTouchDevice || isTouchDevice === null) return;

        const animate = () => {
            outerPos.current.x += (mouse.current.x - outerPos.current.x) * 0.10;
            outerPos.current.y += (mouse.current.y - outerPos.current.y) * 0.10;

            if (outerRef.current) {
                outerRef.current.style.transform = `translate(${outerPos.current.x}px, ${outerPos.current.y}px) translate(-50%, -50%)`;
            }

            rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(rafRef.current);
    }, [isTouchDevice]);

    // Hover detection on interactive elements
    useEffect(() => {
        if (isTouchDevice || isTouchDevice === null) return;

        const SELECTOR = 'a, button, [role="button"], input, textarea, select';

        const enter = () => setIsHovering(true);
        const leave = () => setIsHovering(false);

        const attach = (el: Element) => {
            el.addEventListener("mouseenter", enter);
            el.addEventListener("mouseleave", leave);
        };
        const detach = (el: Element) => {
            el.removeEventListener("mouseenter", enter);
            el.removeEventListener("mouseleave", leave);
        };

        // Attach to existing elements
        document.querySelectorAll(SELECTOR).forEach(attach);

        // Watch for dynamically added elements
        const observer = new MutationObserver((mutations) => {
            for (const m of mutations) {
                m.addedNodes.forEach((node) => {
                    if (node instanceof HTMLElement) {
                        if (node.matches(SELECTOR)) attach(node);
                        node.querySelectorAll(SELECTOR).forEach(attach);
                    }
                });
                m.removedNodes.forEach((node) => {
                    if (node instanceof HTMLElement) {
                        if (node.matches(SELECTOR)) detach(node);
                        node.querySelectorAll(SELECTOR).forEach(detach);
                    }
                });
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            observer.disconnect();
            document.querySelectorAll(SELECTOR).forEach(detach);
        };
    }, [isTouchDevice]);

    // Don't render on touch devices or during SSR detection
    if (isTouchDevice || isTouchDevice === null) return null;

    const lineAngles = [0, 90, 180, 270];

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
                    background: "#ffffff",
                    boxShadow: isHovering
                        ? "0 0 12px rgba(255,255,255,0.9)"
                        : "0 0 8px rgba(139,92,246,0.9)",
                    pointerEvents: "none",
                    zIndex: 99999,
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
                    zIndex: 99999,
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
                            background: isHovering
                                ? "rgba(255,255,255,0.7)"
                                : "rgba(139,92,246,0.5)",
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
                    border: isHovering
                        ? "1px solid rgba(255,255,255,0.7)"
                        : "1px solid rgba(139,92,246,0.6)",
                    pointerEvents: "none",
                    zIndex: 99998,
                    opacity: 0,
                    transition: "border-color 0.15s ease, opacity 0.15s ease",
                }}
            />
        </>
    );
}
