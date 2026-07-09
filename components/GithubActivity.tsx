"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useState, useRef } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { motion, AnimatePresence } from "framer-motion";
import { Github } from "lucide-react";

export default function GithubActivity() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [totalContributions, setTotalContributions] = useState(0);

    // Custom Tooltip State
    const [hoveredCell, setHoveredCell] = useState<{
        count: number;
        date: string;
        x: number;
        y: number;
    } | null>(null);

    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Premium Monochrome Palette (Strict Specs)
    const explicitTheme = {
        light: ['#e5e5e5', '#a3a3a3', '#737373', '#404040', '#181818'],
        dark: ['#1B1B1B', '#3A3A3A', '#5A5A5A', '#8B8B8B', '#EDEDED'],
    };

    if (!mounted) return null;

    const currentYear = new Date().getFullYear();

    return (
        <section className="w-full flex justify-center py-20 bg-transparent">
            {/* Responsive Scroll Wrapper */}
            <div className="w-full max-w-[1000px] overflow-x-auto custom-scrollbar px-6 md:px-0">
                {/* Main Container - Exact Specs */}
                <div ref={sectionRef} className="w-[973px] min-w-[973px] flex flex-col relative pb-4 mx-auto">
                
                {/* Title */}
                <div className="flex items-center gap-[12px] mb-[24px]">
                    <Github className="w-6 h-6" style={{ color: "var(--color-text-primary)" }} />
                    <h2 className="font-sans font-bold text-[22px]" style={{ color: "var(--color-text-primary)" }}>
                        GitHub Activity
                    </h2>
                </div>

                {/* Custom Styles */}
                <style dangerouslySetInnerHTML={{__html: `
                    .react-activity-calendar__month-label {
                        font-family: inherit !important;
                        font-size: 18px !important; /* Increased month size */
                        font-weight: 600 !important;
                        letter-spacing: -0.01em !important;
                        fill: #D4D4D4 !important;
                    }
                    .react-activity-calendar__weekday-label {
                        display: none !important;
                    }
                    .react-activity-calendar__count,
                    .react-activity-calendar__legend-colors {
                        display: none !important;
                    }
                    .calendar-wrapper {
                        display: flex;
                        justify-content: center;
                        width: 100%;
                        /* The user requested bottom spacing from months to grid: 14px */
                        /* SVG natively puts some gap, we can tweak if needed but default is fine */
                    }
                    .calendar-wrapper svg {
                        display: block;
                        width: 100% !important;
                        height: auto !important;
                        max-width: 100%;
                    }
                    .github-block {
                        transition: filter 120ms cubic-bezier(0.22, 1, 0.36, 1);
                        transform-box: fill-box;
                        transform-origin: center;
                        rx: 2px; /* Smoother corner for rectangles */
                        ry: 2px;
                        opacity: 0;
                        animation: fadeTileIn 0.4s ease-out forwards;
                    }
                    @keyframes fadeTileIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    .github-block.interactive {
                        cursor: crosshair;
                    }
                    .github-block.interactive:hover {
                        filter: brightness(115%);
                    }
                    html[class*="light"] .github-block.interactive:hover {
                        filter: brightness(85%);
                    }
                `}} />

                {/* Grid */}
                <div className="w-[939px] mb-[18px]">
                    <div className="calendar-wrapper">
                        <GitHubCalendar
                            username="parteek1907"
                            year={currentYear}
                            colorScheme={resolvedTheme === "dark" ? "dark" : "light"}
                            theme={explicitTheme}
                            blockSize={15}
                            blockMargin={3}
                            hideTotalCount={true}
                            hideColorLegend={true}
                            transformData={(data) => {
                                const total = data.reduce((acc, day) => acc + day.count, 0);
                                if (total !== totalContributions) {
                                    setTimeout(() => setTotalContributions(total), 0);
                                }
                                return data;
                            }}
                            renderBlock={(block, activity) => {
                                const isEmpty = activity.count === 0;
                                
                                // Calculate stagger: 0.008s (8ms) per day
                                const dateObj = new Date(activity.date);
                                const start = new Date(currentYear, 0, 1);
                                const diff = dateObj.getTime() - start.getTime();
                                const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
                                const delay = dayOfYear * 8; // 8ms
                                
                                return React.cloneElement(block as React.ReactElement, {
                                    className: `github-block ${!isEmpty ? 'interactive' : ''}`,
                                    style: {
                                        ...((block as React.ReactElement).props.style || {}),
                                        animationDelay: `${delay}ms`
                                    },
                                    onMouseEnter: (e: React.MouseEvent) => {
                                        if (isEmpty) return; // No tooltip for empty days

                                        // Apply scaling correction for the tooltip position
                                        const rect = (e.target as Element).getBoundingClientRect();
                                        const sectionRect = sectionRef.current?.getBoundingClientRect();
                                        
                                        if (sectionRect) {
                                            setHoveredCell({
                                                count: activity.count,
                                                date: activity.date,
                                                x: rect.left - sectionRect.left + (rect.width / 2),
                                                y: rect.top - sectionRect.top - 8 // 8px above the tile
                                            });
                                        }
                                    },
                                    onMouseLeave: () => {
                                        if (!isEmpty) setHoveredCell(null);
                                    }
                                });
                            }}
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="w-[939px] flex flex-row items-baseline justify-between">
                    <div className="font-sans font-semibold text-[14px]" style={{ color: "var(--color-text-primary)" }}>
                        {totalContributions} Contributions in {currentYear}
                    </div>

                    <div className="flex items-center gap-[4px] font-sans font-medium text-[12px]" style={{ color: "var(--color-text-secondary)" }}>
                        <span className="mr-1">Less</span>
                        {explicitTheme[resolvedTheme === "dark" ? "dark" : "light"].map((color, i) => (
                            <div 
                                key={i} 
                                className="w-[12px] h-[12px] rounded-[3px]" 
                                style={{ backgroundColor: color }}
                            />
                        ))}
                        <span className="ml-1">More</span>
                    </div>
                </div>

                {/* Minimal Pill Tooltip */}
                <AnimatePresence>
                    {hoveredCell && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.12, ease: "easeOut" }}
                            className="absolute z-50 pointer-events-none"
                            style={{
                                left: hoveredCell.x,
                                top: hoveredCell.y,
                                transform: "translate(-50%, -100%)",
                            }}
                        >
                            <div 
                                className="flex items-center justify-center font-sans"
                                style={{
                                    height: "28px",
                                    padding: "0 12px",
                                    borderRadius: "999px",
                                    background: "#171717",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    fontSize: "12px",
                                    fontWeight: 500,
                                    color: "#ECECEC",
                                    whiteSpace: "nowrap",
                                    boxShadow: "0 8px 24px rgba(0,0,0,0.22)",
                                }}
                            >
                                {hoveredCell.count} contribution{hoveredCell.count !== 1 ? 's' : ''} on {new Date(hoveredCell.date).toLocaleDateString("en-US", {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            </div>
        </section>
    );
}
