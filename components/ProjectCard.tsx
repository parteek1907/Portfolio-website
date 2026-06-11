"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ArrowRight, Calendar, Clock, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { FeaturedProject } from "@/lib/data";

interface ProjectCardProps {
    project: FeaturedProject;
    index: number;
    onClick: () => void;
}

export default function ProjectCard({ project, index, onClick }: ProjectCardProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = project.screenshots && project.screenshots.length > 0 ? project.screenshots : [project.heroImage || ""];

    useEffect(() => {
        if (images.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, 3500 + (index * 500)); // Stagger animations across cards
        return () => clearInterval(interval);
    }, [images.length, index]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="w-full relative group cursor-pointer"
            onClick={onClick}
        >
            <div className="relative w-full rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] p-3 md:p-4 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="flex flex-col md:flex-row items-center h-full gap-6 md:gap-10 relative z-10 pl-1 md:pl-3">
                    
                    {/* Left/Top: Hero Image */}
                    <div className="w-full md:w-[45%] aspect-video relative rounded-2xl overflow-hidden bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] shadow-sm shrink-0">
                        {images[currentImageIndex] ? (
                            <AnimatePresence>
                                <motion.div
                                    key={currentImageIndex}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1, ease: "easeInOut" }}
                                    className="absolute inset-0"
                                >
                                    <Image 
                                        src={images[currentImageIndex]} 
                                        alt={project.title} 
                                        fill 
                                        quality={100}
                                        unoptimized
                                        className="object-cover"
                                    />
                                </motion.div>
                            </AnimatePresence>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-[var(--color-text-tertiary)] text-sm">
                                No preview available
                            </div>
                        )}
                        {/* Overlay gradient for image depth */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
                    </div>

                    {/* Right/Bottom: Content */}
                    <div className="w-full flex flex-col py-2 md:py-4">
                        <div className="flex justify-between items-start">
                            <div className="flex flex-col">
                                {project.label ? (
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-tertiary)] mb-2 block">
                                        {project.label}
                                    </span>
                                ) : (
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-tertiary)] mb-2 block">
                                        Featured Project
                                    </span>
                                )}

                                <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] mb-2 tracking-tight">
                                    {project.title}
                                </h3>
                            </div>

                            <div className="-mt-2 mr-2 shrink-0 ml-4" onClick={(e) => e.stopPropagation()}>
                                {project.githubUrl && (
                                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)] transition-colors inline-flex">
                                        <Github size={24} />
                                    </a>
                                )}
                            </div>
                        </div>
                        
                        <p className="text-[var(--color-text-secondary)] text-sm md:text-base leading-relaxed mb-6 line-clamp-3">
                            {project.description}
                        </p>

                        {/* Quick Stats/Tags block */}
                        <div className="mt-auto flex flex-col gap-4">
                            <div className="flex flex-wrap gap-2">
                                {project.tags.slice(0, 4).map(tag => (
                                    <span key={tag} className="px-3 py-1 rounded-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] text-xs font-medium text-[var(--color-text-secondary)]">
                                        {tag}
                                    </span>
                                ))}
                                {project.tags.length > 4 && (
                                    <span className="px-3 py-1 rounded-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] text-xs font-medium text-[var(--color-text-tertiary)]">
                                        +{project.tags.length - 4}
                                    </span>
                                )}
                            </div>

                            <div className="pt-4 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-2">
                                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[var(--color-text-tertiary)]">
                                    {project.year && (
                                        <span className="flex items-center gap-1.5">
                                            <Calendar size={14} /> {project.year}
                                        </span>
                                    )}
                                    {project.status && (
                                        <span className="flex items-center gap-1.5">
                                            {project.status === "Production" ? <Clock size={14} /> : <CheckCircle2 size={14} />} {project.status}
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-4 mt-1 sm:mt-0">
                                    <span className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text-primary)] group-hover:translate-x-1 transition-transform">
                                        View Case Study <ArrowRight size={16} />
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </motion.div>
    );
}
