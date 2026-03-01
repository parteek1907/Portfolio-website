"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { aboutMe } from "@/lib/data";
import CinematicNeuralBackground from "./CinematicNeuralBackground";
import { useLoading } from "@/components/LoadingContext";

export default function Hero() {
    const { isLoading, setIsLoading } = useLoading();
    const isLoaded = !isLoading;

    return (
        <section className="min-h-screen flex items-center justify-center pt-20 pb-10 overflow-hidden relative">
            <CinematicNeuralBackground onLoadComplete={() => setIsLoading(false)} />

            {/* Background Gradient Blob - Fade in with hero content */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoaded ? 1 : 0 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0 pointer-events-none"
            >
                <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
            </motion.div>

            <div className="max-w-5xl mx-auto px-6 text-center z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <span className="inline-block py-2 px-6 rounded-full bg-white/5 border border-white/10 text-2xl md:text-3xl font-medium text-purple-400 mb-6">
                        Hello, I'm Parteek Garg
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]"
                >
                    Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Practical</span> <br />
                    Systems.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                    {aboutMe.heroDescription}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link
                        href="#projects"
                        className="flex items-center gap-2 px-8 py-4 bg-foreground text-background text-lg font-medium rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-200 transition-all hover:scale-105"
                    >
                        View My Work
                    </Link>
                    <Link
                        href="#contact"
                        className="flex items-center gap-2 px-8 py-4 bg-transparent border border-white/20 text-white text-lg font-medium rounded-full hover:bg-white/5 transition-all hover:scale-105"
                    >
                        Contact Me
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
