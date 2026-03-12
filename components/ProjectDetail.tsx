"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Github } from "lucide-react";
import Link from "next/link";
import type { FeaturedProject } from "@/lib/data";

const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay },
});

export default function ProjectDetail({ project }: { project: FeaturedProject }) {
    return (
        <main className="min-h-screen bg-black text-white">
            <div className="h-1" style={{ background: project.gradient }} />

            <div className="max-w-3xl mx-auto px-6 py-16">
                <motion.div {...fadeUp(0)}>
                    <Link
                        href="/#projects"
                        className="inline-flex items-center gap-2 text-zinc-400 hover:text-purple-400 transition-colors mb-12"
                    >
                        <ArrowLeft size={16} />
                        Back to Portfolio
                    </Link>
                </motion.div>

                <motion.div {...fadeUp(0.1)}>
                    <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
                        Featured Project
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-6">{project.title}</h1>
                </motion.div>

                {project.statChips.length > 0 && (
                    <motion.div {...fadeUp(0.2)} className="flex flex-wrap gap-2 mb-8">
                        {project.statChips.map((chip, i) => (
                            <span
                                key={i}
                                className="px-3 py-1 rounded-full text-sm bg-[#8b5cf6]/10 border border-[#8b5cf6]/25 text-purple-300/80"
                            >
                                {chip}
                            </span>
                        ))}
                    </motion.div>
                )}

                <motion.div {...fadeUp(0.3)} className="mb-8">
                    <h2 className="text-xl font-semibold mb-3">Overview</h2>
                    <p className="text-zinc-400 leading-relaxed text-lg">
                        {project.detailedDescription}
                    </p>
                </motion.div>

                <motion.div
                    {...fadeUp(0.4)}
                    className="mb-8 p-6 rounded-2xl bg-zinc-900 border border-zinc-800"
                >
                    <h2 className="text-xl font-semibold mb-3 text-purple-400">What I Learned</h2>
                    <p className="text-zinc-300 leading-relaxed">{project.learned}</p>
                </motion.div>

                <motion.div {...fadeUp(0.5)} className="mb-10">
                    <h2 className="text-xl font-semibold mb-3">Tech Stack</h2>
                    <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-4 py-2 text-sm font-medium rounded-full bg-zinc-800 text-zinc-300 border border-white/5"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </motion.div>

                <motion.div {...fadeUp(0.6)}>
                    <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
                    >
                        <Github size={20} />
                        View on GitHub
                    </a>
                </motion.div>
            </div>
        </main>
    );
}
