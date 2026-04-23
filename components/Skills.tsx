"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { skills } from "@/lib/data";

export default function Skills() {
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
        <section
            id="skills"
            className="pt-10 pb-10 px-6"
            style={{
                borderTop: "1px solid var(--color-border)",
                background: "var(--color-bg-secondary)",
            }}
        >
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl section-title mb-4">Technical Skills</h2>
                    <p style={{ color: "var(--color-text-secondary)" }} className="max-w-2xl mx-auto body-copy text-muted">
                        A curated list of technologies and tools I work with to bring ideas to life.
                    </p>
                </motion.div>

                <div className="space-y-12">
                    {/* Programming Languages */}
                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <div
                                className="w-1 h-8 rounded-full"
                                style={{ background: isDark ? "var(--color-accent)" : "rgba(0, 0, 0, 0.2)", opacity: 1 }}
                            ></div>
                            <h3 className="text-2xl section-category-label">Programming Languages</h3>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {skills.programmingLanguages.map((skill, index) => (
                                <SkillCard key={index} skill={skill} index={index} isDark={isDark} />
                            ))}
                        </div>
                    </div>

                    {/* Frontend Development */}
                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <div
                                className="w-1 h-8 rounded-full"
                                style={{ background: isDark ? "var(--color-accent)" : "rgba(0, 0, 0, 0.2)", opacity: 1 }}
                            ></div>
                            <h3 className="text-2xl section-category-label">Frontend Development</h3>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {skills.frontendDevelopment.map((skill, index) => (
                                <SkillCard key={index} skill={skill} index={index} isDark={isDark} />
                            ))}
                        </div>
                    </div>

                    {/* Domains */}
                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <div
                                className="w-1 h-8 rounded-full"
                                style={{ background: isDark ? "var(--color-accent)" : "rgba(0, 0, 0, 0.2)", opacity: 1 }}
                            ></div>
                            <h3 className="text-2xl section-category-label">Domains</h3>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {skills.domains.map((skill, index) => (
                                <SkillCard key={index} skill={skill} index={index} isDark={isDark} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function SkillCard({ skill, index, isDark }: { skill: { name: string; levelLabel: string; iconClass: string; iconColor: string }, index: number, isDark: boolean }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="flex flex-col items-center justify-center p-6 rounded-2xl transition-all cursor-default group"
            style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
            }}
        >
            <i className={`${skill.iconClass} text-4xl mb-4 transition-transform group-hover:scale-110`} style={{ color: skill.iconColor }}></i>
            <h4 className="text-lg font-medium mb-1" style={{ color: "var(--color-text-primary)" }}>{skill.name}</h4>
            <span
                className="text-xs skill-badge px-2 py-1 rounded-full transition-colors"
                style={{
                    background: isDark ? "rgba(68, 68, 68, 0.4)" : "rgba(0, 0, 0, 0.06)",
                    border: isDark ? "1px solid var(--color-border)" : "1px solid rgba(0, 0, 0, 0.1)",
                    color: "var(--color-text-secondary)",
                }}
            >
                {skill.levelLabel}
            </span>
        </motion.div>
    );
}
