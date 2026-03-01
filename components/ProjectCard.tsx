"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { Project } from "@/lib/data";
import Link from "next/link";

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
        >
            <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block h-full rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-purple-500/50 transition-colors overflow-hidden"
            >
                <div className="p-8 flex flex-col h-full relative z-10">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            {project.featured && (
                                <span className="text-xs font-semibold text-purple-400 mb-2 block uppercase tracking-wider">Featured Project</span>
                            )}
                            <h3 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">{project.title}</h3>
                        </div>
                        <div className="text-zinc-500 group-hover:text-white transition-colors">
                            <ExternalLink size={24} />
                        </div>
                    </div>

                    <p className="text-zinc-400 mb-6 flex-grow leading-relaxed">{project.shortDescription}</p>

                    <div className="flex flex-wrap gap-2 mt-auto">
                        {project.tags.map((tag) => (
                            <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full bg-zinc-800 text-zinc-300 group-hover:bg-zinc-700 transition-colors">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Subtle hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </a>
        </motion.div>
    );
}
