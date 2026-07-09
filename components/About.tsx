"use client";

import { motion } from "framer-motion";
import { aboutMe } from "@/lib/data";
import StudentIdCard from "./StudentIdCard";

export default function About() {
    return (
        <section
            id="about"
            className="pt-24 pb-32 px-6 relative scroll-mt-24"
            style={{ backgroundColor: "var(--color-bg-primary)" }}
        >
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
                    
                    {/* Left Column - Text Content */}
                    <div className="lg:col-span-7 xl:col-span-8 flex flex-col pt-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="mb-16"
                        >
                            <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6" style={{ color: "var(--color-text-primary)" }}>About Me</h2>
                            <p className="text-lg md:text-xl leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                                {aboutMe.description}
                            </p>
                        </motion.div>

                        {/* Divider */}
                        <motion.div
                            initial={{ opacity: 0, scaleX: 0 }}
                            whileInView={{ opacity: 1, scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                            style={{ height: "1px", backgroundColor: "var(--color-border)", transformOrigin: "left" }}
                            className="w-full mb-16"
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-8">
                            {/* Currently Exploring */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                <h3 className="text-sm uppercase tracking-[0.2em] font-semibold mb-6" style={{ color: "var(--color-text-secondary)", opacity: 0.8 }}>Currently Exploring</h3>
                                <ul className="flex flex-col gap-4 text-lg font-medium" style={{ color: "var(--color-text-primary)" }}>
                                    <li>Data Science</li>
                                    <li>Artificial Intelligence</li>
                                    <li>Full-Stack Development</li>
                                </ul>
                            </motion.div>

                            {/* Learning Through */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <h3 className="text-sm uppercase tracking-[0.2em] font-semibold mb-6" style={{ color: "var(--color-text-secondary)", opacity: 0.8 }}>Learning Through</h3>
                                <ul className="flex flex-col gap-4 text-lg font-medium" style={{ color: "var(--color-text-secondary)" }}>
                                    <li>Projects</li>
                                    <li>Certifications</li>
                                    <li>Hackathons</li>
                                    <li>Hands-On Development</li>
                                </ul>
                            </motion.div>
                        </div>

                        {/* Divider */}
                        <motion.div
                            initial={{ opacity: 0, scaleX: 0 }}
                            whileInView={{ opacity: 1, scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
                            style={{ height: "1px", backgroundColor: "var(--color-border)", transformOrigin: "left" }}
                            className="w-full my-16"
                        />

                        {/* Long-Term Goal */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <h3 className="text-sm uppercase tracking-[0.2em] font-semibold mb-6" style={{ color: "var(--color-text-secondary)", opacity: 0.8 }}>Long-Term Goal</h3>
                            <p className="text-2xl md:text-3xl font-medium tracking-tight leading-tight italic" style={{ color: "var(--color-text-primary)" }}>
                                "To build useful software and solve real-world problems."
                            </p>
                        </motion.div>
                    </div>

                    {/* Right Column - Student ID Card */}
                    <div className="lg:col-span-5 xl:col-span-4 hidden md:block relative z-50">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="w-full h-full relative"
                        >
                            <StudentIdCard />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
