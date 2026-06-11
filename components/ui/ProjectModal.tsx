"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, ArrowRight, Activity, Layers, Target, CheckCircle2, Maximize2 } from "lucide-react";
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

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
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
                        <div className="flex items-center justify-between px-6 py-4 md:px-10 md:py-6 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
                            <div>
                                {project.label && (
                                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-[var(--color-text-tertiary)] mb-1 block">
                                        {project.label}
                                    </span>
                                )}
                                <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] tracking-tight">
                                    {project.title}
                                </h2>
                            </div>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar grid grid-cols-1 lg:grid-cols-[2fr_1fr] items-start">
                            
                            {/* Left Column (Content) */}
                            <div className="w-full p-6 md:p-10 lg:pr-8 flex flex-col gap-12">
                                
                                {/* Overview */}
                                <section>
                                    <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                                        <Target size={18} className="text-[var(--color-text-secondary)]" />
                                        Project Overview
                                    </h3>
                                    <p className="text-[var(--color-text-secondary)] leading-relaxed text-base md:text-lg">
                                        {project.detailedDescription || project.description}
                                    </p>
                                </section>

                                {/* Key Metrics Grid */}
                                {project.keyMetrics && project.keyMetrics.length > 0 && (
                                    <section>
                                        <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                                            <Activity size={18} className="text-[var(--color-text-secondary)]" />
                                            Key Metrics
                                        </h3>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            {project.keyMetrics.map((metric, idx) => (
                                                <div key={idx} className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
                                                    <span className="block text-2xl font-bold text-[var(--color-text-primary)] mb-1">{metric.value}</span>
                                                    <span className="block text-xs uppercase tracking-wider text-[var(--color-text-tertiary)] font-medium">{metric.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* Features & Challenges */}
                                <div className="grid md:grid-cols-2 gap-8">
                                    {project.features && project.features.length > 0 && (
                                        <section>
                                            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                                                <Layers size={18} className="text-[var(--color-text-secondary)]" />
                                                Core Features
                                            </h3>
                                            <ul className="space-y-3">
                                                {project.features.map((feature, idx) => (
                                                    <li key={idx} className="flex items-start gap-3 text-[var(--color-text-secondary)] text-sm">
                                                        <CheckCircle2 size={16} className="shrink-0 mt-0.5 text-emerald-500" />
                                                        <span className="leading-relaxed">{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </section>
                                    )}

                                    {project.challenges && project.challenges.length > 0 && (
                                        <section>
                                            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                                                <Target size={18} className="text-[var(--color-text-secondary)]" />
                                                Challenges Solved
                                            </h3>
                                            <ul className="space-y-3">
                                                {project.challenges.map((challenge, idx) => (
                                                    <li key={idx} className="flex items-start gap-3 text-[var(--color-text-secondary)] text-sm">
                                                        <ArrowRight size={16} className="shrink-0 mt-0.5 text-amber-500" />
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
                                        <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                                            <Layers size={18} className="text-[var(--color-text-secondary)]" />
                                            System Architecture
                                        </h3>
                                        <div 
                                            className="relative w-full rounded-2xl overflow-hidden bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] group cursor-pointer flex items-center justify-center"
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
                                            {/* Expand Hint */}
                                            <div className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md">
                                                <Maximize2 size={16} />
                                            </div>
                                        </div>
                                    </section>
                                )}

                            </div>

                            {/* Right Column (Gallery, Info & Tech Stack) */}
                            <div className="w-full bg-[var(--color-surface)] lg:border-l border-[var(--color-border)] p-6 md:p-10 flex flex-col gap-8 sticky top-0 h-max z-10">
                                
                                {/* Action Buttons */}
                                {(project.liveUrl && project.liveUrl !== "#" || project.githubUrl) && (
                                    <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                                        {project.liveUrl && project.liveUrl !== "#" && (
                                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] font-semibold transition-opacity hover:opacity-90">
                                                Visit Live Site <ExternalLink size={18} />
                                            </a>
                                        )}
                                        {project.githubUrl && (
                                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)] font-semibold hover:bg-[var(--color-bg-tertiary)] transition-colors shadow-sm">
                                                View Source Code <Github size={18} />
                                            </a>
                                        )}
                                    </div>
                                )}
                                <section>
                                    <h3 className="text-sm font-semibold tracking-wide uppercase text-[var(--color-text-tertiary)] mb-4">Project Gallery</h3>
                                    {project.screenshots && project.screenshots.length > 0 ? (
                                        <ProjectGallery images={project.screenshots} />
                                    ) : project.heroImage ? (
                                        <ProjectGallery images={[project.heroImage]} />
                                    ) : (
                                        <div className="aspect-video bg-[var(--color-bg-tertiary)] rounded-xl flex items-center justify-center text-[var(--color-text-tertiary)] text-sm">
                                            No images available
                                        </div>
                                    )}
                                </section>

                                <section>
                                    <h3 className="text-sm font-semibold tracking-wide uppercase text-[var(--color-text-tertiary)] mb-4">Tech Stack</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="px-3 py-1.5 rounded-lg bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-xs font-medium text-[var(--color-text-secondary)]">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </section>
                                
                                {/* Project Information */}
                                <section className="p-6 rounded-2xl bg-[var(--color-bg-primary)] border border-[var(--color-border)]">
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--color-text-primary)] mb-4">Project Information</h3>
                                    <div className="flex flex-col gap-3">
                                        {project.label && (
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-[var(--color-text-tertiary)]">Type</span>
                                                <span className="font-medium text-[var(--color-text-primary)]">{project.label}</span>
                                            </div>
                                        )}
                                        {project.timeline && (
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-[var(--color-text-tertiary)]">Duration</span>
                                                <span className="font-medium text-[var(--color-text-primary)]">{project.timeline}</span>
                                            </div>
                                        )}
                                        {project.roleBadge && (
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-[var(--color-text-tertiary)]">Role</span>
                                                <span className="font-medium text-[var(--color-text-primary)]">{project.roleBadge}</span>
                                            </div>
                                        )}
                                        {project.year && (
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-[var(--color-text-tertiary)]">Year</span>
                                                <span className="font-medium text-[var(--color-text-primary)]">{project.year}</span>
                                            </div>
                                        )}
                                        {project.status && (
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-[var(--color-text-tertiary)]">Status</span>
                                                <span className="font-medium text-[var(--color-text-primary)]">{project.status}</span>
                                            </div>
                                        )}
                                    </div>
                                </section>
                                
                                {/* Learnings */}
                                {project.learned && (
                                    <section className="p-6 rounded-2xl bg-[var(--color-bg-primary)] border border-[var(--color-border)]">
                                        <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--color-text-primary)] mb-3">What I Learned</h3>
                                        <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                                            {project.learned}
                                        </p>
                                    </section>
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
                    
                    <button 
                        onClick={() => setIsArchOpen(false)}
                        className="absolute top-6 right-6 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                    >
                        <X size={24} />
                    </button>

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
