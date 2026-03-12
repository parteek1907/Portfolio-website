"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";

export default function Skills() {
    return (
        <section id="skills" className="pt-10 pb-10 bg-black text-white px-6 border-t border-white/5">
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
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {skills.programmingLanguages.map((skill, index) => (
                                <SkillCard key={index} skill={skill} index={index} />
                            ))}
                        </div>
                    </div>

                    {/* Frontend Development */}
                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-1 h-8 bg-blue-500 rounded-full"></div>
                            <h3 className="text-2xl font-semibold">Frontend Development</h3>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {skills.frontendDevelopment.map((skill, index) => (
                                <SkillCard key={index} skill={skill} index={index} />
                            ))}
                        </div>
                    </div>

                    {/* Domains */}
                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-1 h-8 bg-pink-500 rounded-full"></div>
                            <h3 className="text-2xl font-semibold">Domains</h3>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {skills.domains.map((skill, index) => (
                                <SkillCard key={index} skill={skill} index={index} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function SkillCard({ skill, index }: { skill: { name: string; levelLabel: string; iconClass: string; iconColor: string }, index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="flex flex-col items-center justify-center p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-purple-500/50 hover:bg-zinc-900 transition-all cursor-default group"
        >
            <i className={`${skill.iconClass} text-4xl mb-4 transition-transform group-hover:scale-110`} style={{ color: skill.iconColor }}></i>
            <h4 className="text-lg font-medium text-zinc-200 mb-1">{skill.name}</h4>
            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-zinc-800 text-zinc-400 group-hover:text-purple-400 transition-colors">
                {skill.levelLabel}
            </span>
        </motion.div>
    );
}
