"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ui/ProjectModal";
import { featuredProjects, FeaturedProject } from "@/lib/data";

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState<FeaturedProject | null>(null);

    return (
        <section
            id="projects"
            className="pt-10 pb-10 px-6 scroll-mt-24"
            style={{ background: "var(--color-bg-primary)" }}
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
                    {featuredProjects.map((project, index) => (
                        <ProjectCard
                            key={project.slug}
                            project={project}
                            index={index}
                            onClick={() => setSelectedProject(project)}
                        />
                    ))}
                </div>
            </div>

            <ProjectModal 
                project={selectedProject} 
                isOpen={!!selectedProject} 
                onClose={() => setSelectedProject(null)} 
            />
        </section>
    );
}
