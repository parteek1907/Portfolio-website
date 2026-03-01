"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";

export default function Skills() {
    return (
        <section id="skills" className="py-20 bg-black text-white px-6 border-t border-white/5">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Skills</h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto">
                        A curated list of technologies and tools I work with to bring ideas to life.
                    </p>
                </motion.div>

                <div className="space-y-12">
                    {/* Programming Languages */}
                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-1 h-8 bg-purple-500 rounded-full"></div>
                            <h3 className="text-2xl font-semibold">Programming Languages</h3>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            {skills.programmingLanguages.map((skill, index) => (
                                <SkillBadge key={index} name={skill.name} index={index} />
                            ))}
                        </div>
                    </div>

                    {/* Frontend Development */}
                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-1 h-8 bg-blue-500 rounded-full"></div>
                            <h3 className="text-2xl font-semibold">Frontend Development</h3>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            {skills.frontendDevelopment.map((skill, index) => (
                                <SkillBadge key={index} name={skill.name} index={index} />
                            ))}
                        </div>
                    </div>

                    {/* Domains */}
                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-1 h-8 bg-pink-500 rounded-full"></div>
                            <h3 className="text-2xl font-semibold">Domains</h3>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            {skills.domains.map((skill, index) => (
                                <SkillBadge key={index} name={skill.name} index={index} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function SkillBadge({ name, index }: { name: string; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            className="px-6 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 font-medium hover:border-zinc-600 hover:text-white hover:bg-zinc-800 transition-all cursor-default"
        >
            {name}
        </motion.div>
    );
}
