"use client";

import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { featuredProjects } from "@/lib/data";

export default function Projects() {
    return (
        <section
            id="projects"
            className="pt-10 pb-10 px-6"
            style={{ background: "var(--color-bg-primary)" }}
        >
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 text-center"
                >
                    <h2 className="text-3xl md:text-4xl section-title mb-4">Featured Projects</h2>
                    <p className="body-copy text-muted" style={{ color: "var(--color-text-secondary)" }}>Highlighting my most impactful work.</p>
                </motion.div>

                <div className="grid gap-6">
                    {featuredProjects.map((project, index) => (
                        <ProjectCard
                            key={project.slug}
                            title={project.title}
                            description={project.description}
                            learned={project.learned}
                            tags={project.tags}
                            statChips={project.statChips}
                            githubUrl={project.githubUrl}
                            gradient={project.gradient}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
