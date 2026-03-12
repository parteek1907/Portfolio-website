"use client";

import { motion } from "framer-motion";
import { Github } from "lucide-react";
import React from "react";

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
    gradient = "linear-gradient(to right, #8b5cf6, #c084fc)",
    index = 0
}: ProjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="group relative block h-full rounded-2xl bg-zinc-900 border border-zinc-800 transition-all hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] overflow-hidden cursor-default"
        >
            <div className="p-8 flex flex-col h-full relative z-10 pt-12">
                {/* Gradient Banners */}
                <div
                    className="absolute top-0 left-0 right-0 h-2"
                    style={{ background: gradient }}
                />

                <div className="flex items-start justify-between mb-4">
                    <div>
                        {label && (
                            <span className="text-xs font-semibold text-purple-400 mb-2 block uppercase tracking-wider">{label}</span>
                        )}
                        <h3 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">{title}</h3>
                    </div>
                    <div className="flex gap-4 text-zinc-500">
                        {githubUrl && (
                            <a
                                href={githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="p-2 cursor-pointer hover:text-purple-400 transition-colors"
                            >
                                <Github size={24} />
                            </a>
                        )}
                    </div>
                </div>

                <p className="text-zinc-400 mb-6 flex-grow leading-relaxed">{description}</p>

                {statChips && statChips.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                        {statChips.map((chip, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 rounded-full text-[12px] bg-[#8b5cf6]/10 border border-[#8b5cf6]/[0.25] text-purple-300/80"
                            >
                                {chip}
                            </span>
                        ))}
                    </div>
                )}

                {learned && (
                    <p className="text-sm text-zinc-300 italic mb-6">
                        <span className="font-semibold not-italic text-purple-400">What I learned:</span> {learned}
                    </p>
                )}

                <div className="flex flex-wrap gap-2 mt-auto">
                    {tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full bg-zinc-800 text-zinc-300 border border-white/5">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Subtle internal gradient overlay. Keep pointer-events-none so it doesn't block clicks. */}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </motion.div>
    );
}
