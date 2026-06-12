"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, Maximize2 } from "lucide-react";
import { FeaturedProject } from "@/lib/data";
import ProjectGallery from "./ProjectGallery";
import Image from "next/image";

interface ProjectModalProps {
    project: FeaturedProject | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
    const [isArchOpen, setIsArchOpen] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollTop = 0;
            }
            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === "Escape") onClose();
            };
            window.addEventListener("keydown", handleKeyDown);
            return () => {
                document.body.style.overflow = "unset";
                window.removeEventListener("keydown", handleKeyDown);
            };
        }
    }, [isOpen, onClose]);

    if (!project) return null;

    return (
        <>
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex justify-center p-0 md:p-6 lg:p-12">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 30, scale: 0.95 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-7xl max-h-[100dvh] md:max-h-[90vh] bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-none md:rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-6 md:px-12 md:py-8 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
                            <div>
                                {project.label && (
                                    <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-secondary)] mb-2 block">
                                        {project.label}
                                    </span>
                                )}
                                <h2 className="text-3xl md:text-5xl font-medium text-[var(--color-text-primary)] tracking-tight">
                                    {project.title}
                                </h2>
                            </div>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={onClose}
                                    className="p-3 rounded-full bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>
                        </div>

                        {/* Body */}
                        <div 
                            ref={scrollContainerRef}
                            className="flex-1 overflow-y-auto custom-scrollbar flex flex-col lg:grid lg:grid-cols-[2.5fr_1fr] items-start"
                        >
                            
                            {/* Left Column (Content) */}
                            <div className="w-full p-6 md:p-12 lg:pr-16 flex flex-col gap-16 lg:col-start-1 lg:row-start-1">
                                
                                {/* Overview */}
                                <section>
                                    <p className="text-[var(--color-text-secondary)] leading-relaxed text-lg md:text-2xl font-light">
                                        {project.detailedDescription || project.description}
                                    </p>
                                </section>

                                {/* Project Gallery - Emphasized */}
                                <section>
                                    {project.screenshots && project.screenshots.length > 0 ? (
                                        <ProjectGallery images={project.screenshots} />
                                    ) : project.heroImage && (
                                        <ProjectGallery images={[project.heroImage]} />
                                    )}
                                </section>

                                {/* Key Metrics - Typography based */}
                                {project.keyMetrics && project.keyMetrics.length > 0 && (
                                    <section className="flex flex-wrap gap-12 md:gap-24 py-10 border-y border-[var(--color-border)]">
                                        {project.keyMetrics.map((metric, idx) => (
                                            <div key={idx} className="flex flex-col gap-2">
                                                <span className="text-5xl md:text-6xl font-medium tracking-tight text-[var(--color-text-primary)]">{metric.value}</span>
                                                <span className="text-sm font-semibold tracking-widest uppercase text-[var(--color-text-secondary)]">{metric.label}</span>
                                            </div>
                                        ))}
                                    </section>
                                )}

                                {/* Features & Challenges */}
                                <div className="grid md:grid-cols-2 gap-12">
                                    {project.features && project.features.length > 0 && (
                                        <section>
                                            <h3 className="text-xs font-semibold tracking-widest uppercase text-[var(--color-text-secondary)] mb-6">Core Features</h3>
                                            <ul className="flex flex-col gap-4">
                                                {project.features.map((feature, idx) => (
                                                    <li key={idx} className="flex items-start gap-4 text-[var(--color-text-primary)] text-base">
                                                        <span className="opacity-30 mt-0.5 text-[var(--color-text-secondary)]">&bull;</span>
                                                        <span className="leading-relaxed">{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </section>
                                    )}

                                    {project.challenges && project.challenges.length > 0 && (
                                        <section>
                                            <h3 className="text-xs font-semibold tracking-widest uppercase text-[var(--color-text-secondary)] mb-6">Challenges Solved</h3>
                                            <ul className="flex flex-col gap-4">
                                                {project.challenges.map((challenge, idx) => (
                                                    <li key={idx} className="flex items-start gap-4 text-[var(--color-text-primary)] text-base">
                                                        <span className="opacity-30 mt-0.5 text-[var(--color-text-secondary)]">&bull;</span>
                                                        <span className="leading-relaxed">{challenge}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </section>
                                    )}
                                </div>

                                {/* Architecture Diagram */}
                                {project.architectureDiagram && (
                                    <section>
                                        <h3 className="text-xs font-semibold tracking-widest uppercase text-[var(--color-text-secondary)] mb-6">System Architecture</h3>
                                        <div 
                                            className="relative w-full rounded-3xl overflow-hidden bg-[var(--color-bg-tertiary)] group cursor-pointer flex items-center justify-center border border-[var(--color-border)]"
                                            onClick={() => setIsArchOpen(true)}
                                        >
                                            <Image 
                                                src={project.architectureDiagram} 
                                                alt={`${project.title} Architecture`} 
                                                width={1920}
                                                height={1080}
                                                unoptimized
                                                quality={100}
                                                className="w-full h-auto transition-transform duration-500"
                                            />
                                            <div className="absolute top-6 right-6 p-3 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md">
                                                <Maximize2 size={20} />
                                            </div>
                                        </div>
                                    </section>
                                )}
                            </div>

                            {/* Right Column (Sidebar Metadata) */}
                            <div className="w-full lg:border-l border-[var(--color-border)] p-6 md:p-12 flex flex-col gap-10 lg:sticky lg:top-0 h-max z-10 lg:col-start-2 lg:row-start-1 bg-[var(--color-surface)]">
                                
                                {project.tags && project.tags.length > 0 && (
                                    <section>
                                        <h3 className="text-xs font-semibold tracking-widest uppercase text-[var(--color-text-secondary)] mb-4">Tech Stack</h3>
                                        <div className="flex flex-col gap-2">
                                            {project.tags.map(tag => (
                                                <span key={tag} className="text-base font-medium text-[var(--color-text-primary)]">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {project.roleBadge && (
                                    <section>
                                        <h3 className="text-xs font-semibold tracking-widest uppercase text-[var(--color-text-secondary)] mb-4">Role</h3>
                                        <span className="text-base font-medium text-[var(--color-text-primary)]">{project.roleBadge}</span>
                                    </section>
                                )}

                                {project.timeline && (
                                    <section>
                                        <h3 className="text-xs font-semibold tracking-widest uppercase text-[var(--color-text-secondary)] mb-4">Duration</h3>
                                        <span className="text-base font-medium text-[var(--color-text-primary)]">{project.timeline}</span>
                                    </section>
                                )}

                                {project.year && (
                                    <section>
                                        <h3 className="text-xs font-semibold tracking-widest uppercase text-[var(--color-text-secondary)] mb-4">Date</h3>
                                        <span className="text-base font-medium text-[var(--color-text-primary)]">{project.year}</span>
                                    </section>
                                )}

                                {project.learned && (
                                    <section>
                                        <h3 className="text-xs font-semibold tracking-widest uppercase text-[var(--color-text-secondary)] mb-4">Key Learnings</h3>
                                        <ul className="flex flex-col gap-3">
                                            {project.learned.split('. ').filter(s => s.trim().length > 0).map((learning, idx) => (
                                                <li key={idx} className="flex items-start gap-3 text-base text-[var(--color-text-primary)] font-medium">
                                                    <span className="opacity-30 mt-0.5 text-[var(--color-text-secondary)]">&bull;</span>
                                                    <span className="leading-relaxed">{learning.trim()}{learning.endsWith('.') ? '' : '.'}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </section>
                                )}

                                {/* Links */}
                                {(project.liveUrl && project.liveUrl !== "#" || project.githubUrl) && (
                                    <div className="flex flex-col gap-5 mt-4 pt-8 border-t border-[var(--color-border)]">
                                        {project.liveUrl && project.liveUrl !== "#" && (
                                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="group relative flex items-center gap-2 w-fit text-base font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
                                                Visit Live Site
                                                <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                                <span className="absolute -bottom-1 left-0 w-0 h-px bg-current transition-all duration-300 group-hover:w-full opacity-40"></span>
                                            </a>
                                        )}
                                        {project.githubUrl && (
                                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="group relative flex items-center gap-2 w-fit text-base font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
                                                Source Code
                                                <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                                <span className="absolute -bottom-1 left-0 w-0 h-px bg-current transition-all duration-300 group-hover:w-full opacity-40"></span>
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>

        {/* Architecture Lightbox Modal */}
        <AnimatePresence>
            {isArchOpen && project?.architectureDiagram && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                        onClick={() => setIsArchOpen(false)}
                    />
                    
                    <motion.button 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setIsArchOpen(false)}
                        className="absolute top-6 right-6 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                    >
                        <X size={24} />
                    </motion.button>

                    <motion.div 
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ type: "spring", damping: 25 }}
                        className="relative flex items-center justify-center w-full max-w-7xl"
                    >
                        <Image 
                            src={project.architectureDiagram} 
                            alt={`${project.title} Architecture Fullscreen`} 
                            width={1920}
                            height={1080}
                            unoptimized
                            quality={100}
                            className="w-auto h-auto max-w-full max-h-[85vh] rounded-2xl shadow-2xl"
                        />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
        </>
    );
}
