"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/data";
import ProjectCard from "./ProjectCard";

const filters = ["All", "Featured", "Python", "React", "AI", "Mobile"];

export default function Projects() {
    return (
        <section id="projects" className="py-20 bg-black text-white px-6">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Project</h2>
                    <p className="text-zinc-400">Highlighting my most impactful work.</p>
                </motion.div>

                <div className="grid gap-6">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
