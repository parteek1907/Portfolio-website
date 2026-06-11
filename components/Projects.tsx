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
            className="pt-10 pb-10 px-6"
            style={{ background: "var(--color-bg-primary)" }}
        >
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-3xl md:text-5xl font-bold section-title mb-4 tracking-tight">Featured Case Studies</h2>
                    <p className="body-copy text-lg max-w-2xl mx-auto" style={{ color: "var(--color-text-secondary)" }}>
                        Deep dives into architectural decisions, technical challenges, and the impact of my most significant projects.
                    </p>
                </motion.div>

                <div className="grid gap-10 md:gap-16">
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
