"use client";

import { motion } from "framer-motion";
import { aboutMe } from "@/lib/data";

export default function About() {
    return (
        <section
            id="about"
            className="pt-20 pb-10 px-6"
            style={{ background: "var(--color-bg-primary)" }}
        >
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-4xl section-title mb-8">About Me</h2>

                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        <div className="space-y-6 text-lg leading-relaxed body-copy text-muted" style={{ color: "var(--color-text-secondary)" }}>
                            <p>
                                {aboutMe.description}
                            </p>
                        </div>

                        <div className="grid gap-6">
                            <div
                                className="p-6 rounded-2xl transition-colors"
                                style={{
                                    background: "var(--color-surface)",
                                    border: "1px solid var(--color-border)",
                                }}
                            >
                                <h3 className="text-xl font-semibold mb-2">🧩 Learning & Fundamentals</h3>
                                <p className="body-copy text-muted" style={{ color: "var(--color-text-secondary)" }}>Building strong foundations in programming and problem-solving through consistent practice.</p>
                            </div>
                            <div
                                className="p-6 rounded-2xl transition-colors"
                                style={{
                                    background: "var(--color-surface)",
                                    border: "1px solid var(--color-border)",
                                }}
                            >
                                <h3 className="text-xl font-semibold mb-2">🤖 Data Science & AI (Beginner)</h3>
                                <p className="body-copy text-muted" style={{ color: "var(--color-text-secondary)" }}>Exploring machine learning concepts and data-driven thinking with hands-on projects.</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
