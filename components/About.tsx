"use client";

import { motion } from "framer-motion";
import { aboutMe } from "@/lib/data";

export default function About() {
    return (
        <section id="about" className="py-20 bg-black text-white px-6">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-8">About Me</h2>

                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        <div className="space-y-6 text-zinc-400 text-lg leading-relaxed">
                            <p>
                                {aboutMe.description}
                            </p>
                        </div>

                        <div className="grid gap-6">
                            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors">
                                <h3 className="text-xl font-semibold mb-2 text-purple-400">🧩 Learning & Fundamentals</h3>
                                <p className="text-zinc-400">Building strong foundations in programming and problem-solving through consistent practice.</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors">
                                <h3 className="text-xl font-semibold mb-2 text-blue-400">🤖 Data Science & AI (Beginner)</h3>
                                <p className="text-zinc-400">Exploring machine learning concepts and data-driven thinking with hands-on projects.</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
