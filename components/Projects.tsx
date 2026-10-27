"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import ProjectCard from "./ProjectCard";
import { featuredProjects, FeaturedProject } from "@/lib/data";
import { smoothScrollTo, easeInOutCubic } from "@/lib/smoothScroll";

const ProjectModal = dynamic(() => import("./ui/ProjectModal"), { ssr: false });

const BATCH_SIZE = 5;

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState<FeaturedProject | null>(null);
    const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);

    useEffect(() => {
        const handleOpenModal = (e: Event) => {
            const customEvent = e as CustomEvent<{slug: string}>;
            const project = featuredProjects.find(p => p.slug === customEvent.detail.slug);
            if (project) {
                setSelectedProject(project);
            }
        };

        window.addEventListener("openProjectModal", handleOpenModal);
        return () => window.removeEventListener("openProjectModal", handleOpenModal);
    }, []);

    const remainingCount = featuredProjects.length - visibleCount;

    const handleToggle = () => {
        if (remainingCount > 0) {
            setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, featuredProjects.length));
        } else {
            // Find the last card that will remain visible after collapsing (index: BATCH_SIZE - 1)
            const lastCollapsedCard = document.getElementById(`project-card-${BATCH_SIZE - 1}`);
            let targetY: number | null = null;

            if (lastCollapsedCard) {
                const cardRect = lastCollapsedCard.getBoundingClientRect();
                const cardDocBottom = cardRect.bottom + window.scrollY;
                // Button container margin is mt-20 (80px) on mobile or mt-28 (112px) on md+
                const btnMargin = window.innerWidth >= 768 ? 112 : 80;
                const btnDocTop = cardDocBottom + btnMargin;
                // Position viewport so the "Show more" button rests nicely in the lower portion of view (~70% down),
                // placing the scroll position slightly above the button with the last project clearly in view
                targetY = Math.max(0, btnDocTop - Math.round(window.innerHeight * 0.7));
            }

            if (targetY !== null && window.scrollY > targetY) {
                // Distance is only a few hundred pixels (just the height of the extra card)
                const distance = window.scrollY - targetY;
                const duration = Math.min(Math.max(distance * 0.9, 650), 900);

                // 1. Scroll gently up FIRST while all items are still in the DOM to avoid any downward layout plunge
                smoothScrollTo(targetY, duration, easeInOutCubic, () => {
                    // 2. Collapse ONLY when the extra items are already off-screen below the viewport
                    setVisibleCount(BATCH_SIZE);
                });
            } else {
                setVisibleCount(BATCH_SIZE);
            }
        }
    };

    const getButtonText = () => {
        if (remainingCount >= BATCH_SIZE) {
            return "Show more projects";
        }
        if (remainingCount > 0) {
            return `Show ${remainingCount} more project${remainingCount > 1 ? "s" : ""}`;
        }
        return "Show less";
    };

    const visibleProjects = featuredProjects.slice(0, visibleCount);

    return (
        <section
            id="projects"
            className="pt-10 pb-10 px-6 scroll-mt-24"
            style={{ backgroundColor: "var(--color-bg-primary)" }}
        >
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-16 md:mb-24"
                >
                    <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6" style={{ color: "var(--color-text-primary)" }}>Things I've Built</h2>
                    <p className="text-lg md:text-xl max-w-2xl leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                        A collection of selected projects that reflect my learning, curiosity, and problem-solving approach.
                    </p>
                </motion.div>

                <div className="flex flex-col gap-16 md:gap-24">
                    <AnimatePresence initial={false}>
                        {visibleProjects.map((project, index) => (
                            <ProjectCard
                                key={project.slug}
                                project={project}
                                index={index}
                                onClick={() => setSelectedProject(project)}
                            />
                        ))}
                    </AnimatePresence>
                </div>

                {featuredProjects.length > BATCH_SIZE && (
                    <div className="flex justify-center mt-20 md:mt-28 mb-4">
                        <button
                            type="button"
                            id="projects-show-more-btn"
                            onClick={handleToggle}
                            className="group relative inline-flex items-center gap-2 text-base md:text-lg font-semibold tracking-wide text-[var(--color-text-primary)] hover:opacity-80 transition-all cursor-pointer bg-transparent border-none p-0 select-none pb-1"
                            style={{ fontFamily: "var(--font-ui)" }}
                        >
                            <span>{getButtonText()}</span>
                            {remainingCount <= 0 ? (
                                <ChevronUp size={20} className="transition-transform duration-300 group-hover:-translate-y-1" />
                            ) : (
                                <ChevronDown size={20} className="transition-transform duration-300 group-hover:translate-y-1" />
                            )}
                            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--color-text-primary)]/40 group-hover:bg-[var(--color-text-primary)] transition-all duration-300"></span>
                        </button>
                    </div>
                )}
            </div>

            <ProjectModal 
                project={selectedProject} 
                isOpen={!!selectedProject} 
                onClose={() => setSelectedProject(null)} 
            />
        </section>
    );
}
