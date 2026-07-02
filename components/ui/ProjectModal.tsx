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

export default function ProjectModal({ project: incomingProject, isOpen, onClose }: ProjectModalProps) {
    const [isArchOpen, setIsArchOpen] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Cache the project so it doesn't instantly become null when closing, allowing exit animations to run
    const [project, setProject] = useState<FeaturedProject | null>(incomingProject);
    
    useEffect(() => {
        if (incomingProject) {
            setProject(incomingProject);
        }
    }, [incomingProject]);

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
                <div className="fixed inset-0 z-50 flex flex-col justify-end pointer-events-none">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
                    />

                    {/* Sliding Panel */}
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="relative w-full max-w-7xl mx-auto h-[95vh] md:h-[90vh] rounded-t-3xl shadow-2xl flex flex-col overflow-hidden pointer-events-auto"
                        style={{
                            background: "var(--color-bg-primary)",
                            borderTop: "1px solid var(--color-border)",
                            borderLeft: "1px solid var(--color-border)",
                            borderRight: "1px solid var(--color-border)"
                        }}
                    >
                        {/* Minimal Header with Close Button */}
                        <div className="absolute top-0 left-0 right-0 z-20 flex justify-end p-6 md:p-8 bg-gradient-to-b from-[var(--color-bg-primary)] to-transparent pointer-events-none">
                            <button
                                onClick={onClose}
                                className="p-2 transition-opacity opacity-40 hover:opacity-100 pointer-events-auto mix-blend-difference text-white"
                                aria-label="Close modal"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Body Container */}
                        <div 
                            ref={scrollContainerRef}
                            className="flex-1 overflow-y-auto custom-scrollbar relative z-10"
                        >
                            <div className="flex flex-col lg:grid lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_360px] gap-12 lg:gap-24 px-6 py-16 md:px-16 md:py-24 max-w-7xl mx-auto items-start">
                                
                                {/* Left Column (Main Content) */}
                                <div className="w-full flex flex-col gap-20">
                                    
                                    {/* Massive Title Section */}
                                    <header className="flex flex-col gap-6 max-w-4xl">
                                        {project.label && (
                                            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-secondary)]" style={{ fontFamily: "var(--font-ui)" }}>
                                                {project.label}
                                            </span>
                                        )}
                                        <h2 className="text-5xl md:text-7xl font-medium text-[var(--color-text-primary)] tracking-tight leading-none" style={{ fontFamily: "var(--font-display)" }}>
                                            {project.title}
                                        </h2>
                                        <p className="text-[var(--color-text-secondary)] leading-relaxed text-xl md:text-2xl font-light mt-4">
                                            {project.detailedDescription || project.description}
                                        </p>
                                    </header>

                                    {/* Project Gallery - Emphasized without borders */}
                                    <section className="-mx-6 md:-mx-16 lg:mx-0">
                                        {project.screenshots && project.screenshots.length > 0 ? (
                                            <ProjectGallery images={project.screenshots} />
                                        ) : project.heroImage && (
                                            <ProjectGallery images={[project.heroImage]} />
                                        )}
                                    </section>

                                    {/* Key Metrics - Floating typography */}
                                    {project.keyMetrics && project.keyMetrics.length > 0 && (
                                        <section className="flex flex-wrap gap-x-20 gap-y-12 py-12 border-t border-[var(--color-border)] mt-4">
                                            {project.keyMetrics.map((metric, idx) => (
                                                <div key={idx} className="flex flex-col gap-3">
                                                    <span className="text-6xl md:text-8xl font-medium tracking-tight text-[var(--color-text-primary)] leading-none" style={{ fontFamily: "var(--font-display)" }}>{metric.value}</span>
                                                    <span className="text-xs font-semibold tracking-widest uppercase text-[var(--color-text-secondary)]" style={{ fontFamily: "var(--font-ui)" }}>{metric.label}</span>
                                                </div>
                                            ))}
                                        </section>
                                    )}

                                    {/* Features & Challenges */}
                                    <div className="grid md:grid-cols-2 gap-16">
                                        {project.features && project.features.length > 0 && (
                                            <section>
                                                <h3 className="text-sm font-semibold tracking-widest uppercase text-[var(--color-text-secondary)] mb-8" style={{ fontFamily: "var(--font-ui)" }}>Core Features</h3>
                                                <ul className="flex flex-col gap-6">
                                                    {project.features.map((feature, idx) => (
                                                        <li key={idx} className="flex items-start gap-5 text-[var(--color-text-primary)] text-lg">
                                                            <span className="opacity-40 mt-1 text-[var(--color-text-secondary)]">&bull;</span>
                                                            <span className="leading-relaxed font-light">{feature}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </section>
                                        )}

                                        {project.challenges && project.challenges.length > 0 && (
                                            <section>
                                                <h3 className="text-sm font-semibold tracking-widest uppercase text-[var(--color-text-secondary)] mb-8" style={{ fontFamily: "var(--font-ui)" }}>Challenges Solved</h3>
                                                <ul className="flex flex-col gap-6">
                                                    {project.challenges.map((challenge, idx) => (
                                                        <li key={idx} className="flex items-start gap-5 text-[var(--color-text-primary)] text-lg">
                                                            <span className="opacity-40 mt-1 text-[var(--color-text-secondary)]">&bull;</span>
                                                            <span className="leading-relaxed font-light">{challenge}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </section>
                                        )}
                                    </div>

                                    {/* Architecture Diagram */}
                                    {project.architectureDiagram && (
                                        <section className="pt-10">
                                            <h3 className="text-sm font-semibold tracking-widest uppercase text-[var(--color-text-secondary)] mb-8" style={{ fontFamily: "var(--font-ui)" }}>System Architecture</h3>
                                            <div 
                                                className="relative w-full rounded-2xl overflow-hidden bg-[var(--color-bg-tertiary)] group cursor-pointer flex items-center justify-center border border-[var(--color-border)]"
                                                onClick={() => setIsArchOpen(true)}
                                            >
                                                <Image 
                                                    src={project.architectureDiagram} 
                                                    alt={`${project.title} Architecture`} 
                                                    width={1920}
                                                    height={1080}
                                                    unoptimized
                                                    quality={100}
                                                    className="w-full h-auto transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                                                />
                                                <div className="absolute top-6 right-6 p-4 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md">
                                                    <Maximize2 size={20} strokeWidth={1.5} />
                                                </div>
                                            </div>
                                        </section>
                                    )}
                                </div>

                                {/* Right Column (Sidebar Metadata) */}
                                <div className="w-full flex flex-col gap-12 lg:sticky lg:top-24 h-max pt-12 lg:pt-0 lg:pl-12 xl:pl-16 border-t lg:border-t-0 lg:border-l border-[var(--color-border)]">
                                    
                                    {/* Metadata block */}
                                    <div className="flex flex-col gap-10">
                                        {project.roleBadge && (
                                            <section>
                                                <h3 className="text-[11px] font-semibold tracking-widest uppercase text-[var(--color-text-secondary)] mb-3" style={{ fontFamily: "var(--font-ui)" }}>Role</h3>
                                                <span className="text-lg text-[var(--color-text-primary)]">{project.roleBadge}</span>
                                            </section>
                                        )}

                                        {project.timeline && (
                                            <section>
                                                <h3 className="text-[11px] font-semibold tracking-widest uppercase text-[var(--color-text-secondary)] mb-3" style={{ fontFamily: "var(--font-ui)" }}>Duration</h3>
                                                <span className="text-lg text-[var(--color-text-primary)]">{project.timeline}</span>
                                            </section>
                                        )}

                                        {project.year && (
                                            <section>
                                                <h3 className="text-[11px] font-semibold tracking-widest uppercase text-[var(--color-text-secondary)] mb-3" style={{ fontFamily: "var(--font-ui)" }}>Date</h3>
                                                <span className="text-lg text-[var(--color-text-primary)]">{project.year}</span>
                                            </section>
                                        )}

                                        {project.tags && project.tags.length > 0 && (
                                            <section>
                                                <h3 className="text-[11px] font-semibold tracking-widest uppercase text-[var(--color-text-secondary)] mb-4" style={{ fontFamily: "var(--font-ui)" }}>Tech Stack</h3>
                                                <div className="flex flex-wrap gap-x-6 gap-y-3">
                                                    {project.tags.map(tag => (
                                                        <span key={tag} className="text-lg text-[var(--color-text-primary)] font-light">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </section>
                                        )}
                                    </div>

                                    {project.learned && (
                                        <section className="pt-6 lg:pt-10">
                                            <h3 className="text-[11px] font-semibold tracking-widest uppercase text-[var(--color-text-secondary)] mb-5" style={{ fontFamily: "var(--font-ui)" }}>Key Learnings</h3>
                                            <ul className="flex flex-col gap-4">
                                                {project.learned.split('. ').filter(s => s.trim().length > 0).map((learning, idx) => (
                                                    <li key={idx} className="flex items-start gap-4 text-base text-[var(--color-text-primary)] font-light">
                                                        <span className="opacity-30 mt-1 text-[var(--color-text-secondary)]">&bull;</span>
                                                        <span className="leading-relaxed">{learning.trim()}{learning.endsWith('.') ? '' : '.'}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </section>
                                    )}

                                    {/* Links - Minimal editorial style */}
                                    {(project.liveUrl && project.liveUrl !== "#" || project.githubUrl) && (
                                        <div className="flex flex-col gap-6 pt-10 border-t border-[var(--color-border)]">
                                            {project.liveUrl && project.liveUrl !== "#" && (
                                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="group relative flex items-center gap-3 w-fit text-lg text-[var(--color-text-primary)] transition-colors">
                                                    <span className="relative z-10" style={{ fontFamily: "var(--font-ui)" }}>Visit Live Site</span>
                                                    <ArrowUpRight size={18} className="relative z-10 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                                    <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-current transition-all duration-300 group-hover:w-full"></span>
                                                </a>
                                            )}
                                            {project.githubUrl && (
                                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="group relative flex items-center gap-3 w-fit text-lg text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
                                                    <span className="relative z-10" style={{ fontFamily: "var(--font-ui)" }}>Source Code</span>
                                                    <ArrowUpRight size={18} className="relative z-10 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                                    <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-current transition-all duration-300 group-hover:w-full"></span>
                                                </a>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>

        {/* Architecture Lightbox Modal */}
        <AnimatePresence>
            {isArchOpen && project?.architectureDiagram && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 pointer-events-none">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/90 backdrop-blur-xl pointer-events-auto"
                        onClick={() => setIsArchOpen(false)}
                    />
                    
                    <motion.button 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setIsArchOpen(false)}
                        className="absolute top-6 right-6 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors pointer-events-auto"
                    >
                        <X size={24} />
                    </motion.button>

                    <motion.div 
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ type: "spring", damping: 25 }}
                        className="relative flex items-center justify-center w-full max-w-7xl pointer-events-auto"
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
