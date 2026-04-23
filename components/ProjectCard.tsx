"use client";

import { motion } from "framer-motion";
import { Github } from "lucide-react";
import React from "react";
import { useEffect, useState } from "react";

interface ProjectCardProps {
    label?: string;
    title: string;
    description: string;
    learned?: string;
    tags: string[];
    statChips?: string[];
    githubUrl?: string;
    gradient?: string;
    index?: number;
}

export default function ProjectCard({
    label = "FEATURED PROJECT",
    title,
    description,
    learned,
    tags,
    statChips,
    githubUrl,
    gradient,
    index = 0
}: ProjectCardProps) {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const checkTheme = () => {
            setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
        };
        checkTheme();
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
        return () => observer.disconnect();
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="group relative block h-full rounded-2xl transition-all hover:-translate-y-2 overflow-hidden cursor-default"
            style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
            }}
        >
            <div className="p-8 flex flex-col h-full relative z-10 pt-12">
                {/* Top border accent — subtle monochrome */}
                <div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: "var(--color-border)" }}
                />

                <div className="flex items-start justify-between mb-4">
                    <div>
                        {label && (
                            <span
                                className="text-xs mb-2 block featured-project-label"
                                style={{
                                    color: isDark ? "var(--color-text-secondary)" : "#8C8078",
                                    letterSpacing: isDark ? "0.12em" : "0.1em",
                                }}
                            >{label}</span>
                        )}
                        <h3
                            className="text-2xl project-title transition-colors"
                            style={{ color: "var(--color-text-primary)" }}
                        >{title}</h3>
                    </div>
                    <div className="flex gap-4" style={{ color: "var(--color-text-secondary)" }}>
                        {githubUrl && (
                            <a
                                href={githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="p-2 cursor-pointer transition-colors hover:opacity-70"
                            >
                                <Github size={24} />
                            </a>
                        )}
                    </div>
                </div>

                <p className="mb-6 flex-grow leading-relaxed body-copy text-muted" style={{ color: "var(--color-text-secondary)" }}>{description}</p>

                {statChips && statChips.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                        {statChips.map((chip, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 rounded-full text-[12px]"
                                style={{
                                    background: isDark ? "transparent" : "rgba(0, 0, 0, 0.05)",
                                    border: isDark ? "1px solid var(--color-border)" : "1px solid rgba(0, 0, 0, 0.09)",
                                    color: isDark ? "var(--color-text-secondary)" : "#1A1A1A",
                                }}
                            >
                                {chip}
                            </span>
                        ))}
                    </div>
                )}

                {learned && (
                    <p className="text-sm mb-6 what-learned" style={{ color: "var(--color-text-secondary)" }}>
                        <span style={{ color: "var(--color-text-primary)" }}>What I learned:</span> {learned}
                    </p>
                )}

                <div className="flex flex-wrap gap-2 mt-auto">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 text-xs tech-tag rounded-full"
                            style={{
                                background: isDark ? "rgba(68, 68, 68, 0.3)" : "rgba(0, 0, 0, 0.05)",
                                border: isDark ? "1px solid var(--color-border)" : "1px solid rgba(0, 0, 0, 0.09)",
                                color: isDark ? "var(--color-text-primary)" : "#1A1A1A",
                            }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
