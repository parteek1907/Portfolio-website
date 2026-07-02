"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Calendar, Clock, CheckCircle2, Trophy } from "lucide-react";
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

    // Parse the tags string properly for rendering
    let tagsDisplay = "";
    if (project.tags.length > 0) {
        tagsDisplay = project.tags.slice(0, 4).join("  •  ");
        if (project.tags.length > 4) {
            tagsDisplay += `  •  +${project.tags.length - 4}`;
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="w-full relative group border-b border-[var(--color-border)] pb-16 md:pb-24 last:border-b-0 last:pb-0"
        >
            <div className="flex flex-col md:flex-row md:items-center h-full gap-8 md:gap-16 relative z-10">
                
                {/* Left/Top: Hero Image */}
                <div 
                    className={`w-full md:w-[50%] lg:w-[55%] relative rounded-2xl overflow-hidden shadow-md shrink-0 border border-[var(--color-border)] bg-[var(--color-bg-tertiary)] ${
                        project.title.toLowerCase().includes('veralon') ? 'aspect-[16/10]' : ''
                    }`}
                    style={{ aspectRatio: project.aspectRatio || (project.title.toLowerCase().includes('veralon') ? '16/10' : 'auto') }}
                >
                    {images.length > 0 ? (
                        <motion.div layout className="w-full relative flex items-center justify-center">
                            {images.map((img, idx) => (
                                <motion.img 
                                    layout
                                    key={idx}
                                    src={img} 
                                    alt={`${project.title} screenshot ${idx + 1}`} 
                                    initial={false}
                                    animate={{ 
                                        opacity: idx === currentImageIndex ? 1 : 0,
                                    }}
                                    transition={{ duration: 0.6, ease: "easeInOut" }}
                                    className={`w-full block ${
                                        idx === currentImageIndex ? "relative z-10" : "absolute inset-0 z-0 pointer-events-none"
                                    } ${
                                        project.title.toLowerCase().includes('veralon') ? 'h-full object-cover object-top' : 'h-full object-contain'
                                    }`}
                                />
                            ))}
                        </motion.div>
                    ) : (
                        <div className="w-full aspect-video rounded-2xl flex items-center justify-center text-[var(--color-text-tertiary)] text-sm bg-[var(--color-bg-tertiary)] border border-[var(--color-border)]">
                            No preview available
                        </div>
                    )}
                </div>

                {/* Right/Bottom: Content */}
                <div className="w-full flex flex-col py-2 md:py-6 justify-center">
                    <div className="flex flex-col gap-1 mb-5">
                        <span className="text-[11px] font-semibold tracking-widest uppercase text-[var(--color-text-secondary)]">
                            {project.label || "FEATURED PROJECT"}
                        </span>
                        <h3 className="text-3xl md:text-4xl font-medium text-[var(--color-text-primary)] tracking-tight">
                            {project.title}
                        </h3>
                    </div>
                    
                    <p className="text-[var(--color-text-secondary)] text-sm md:text-base leading-relaxed mb-8 max-w-xl">
                        {project.description}
                    </p>

                    <div className="flex flex-col gap-5 mt-auto">
                        {/* Tech Stack */}
                        <div className="text-[14px] text-[var(--color-text-secondary)] font-medium">
                            {tagsDisplay}
                        </div>

                        {/* Metadata Row */}
                        <div className="flex items-center gap-2.5 text-[14px] text-[var(--color-text-secondary)]">
                            {project.year && <span>{project.year}</span>}
                            {project.timeline && (
                                <>
                                    <span className="opacity-50">•</span>
                                    <span>{project.timeline}</span>
                                </>
                            )}
                            {project.roleBadge && (
                                <>
                                    <span className="opacity-50">•</span>
                                    <span>{project.roleBadge}</span>
                                </>
                            )}
                        </div>

                        {/* CTA */}
                        <div className="flex justify-end mt-4">
                            <button 
                                onClick={onClick}
                                className="group/link relative flex items-center gap-1.5 text-[15px] font-medium text-[var(--color-text-primary)] transition-colors hover:text-[var(--color-text-secondary)] cursor-pointer bg-transparent border-none p-0"
                            >
                                View Case Study <ArrowUpRight size={16} className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                                <span className="absolute -bottom-1 left-0 w-0 h-px bg-current transition-all duration-300 group-hover/link:w-full opacity-40"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
