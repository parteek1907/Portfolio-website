"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { smoothScrollToElement } from "@/lib/smoothScroll";
import CinematicNeuralBackground from "./CinematicNeuralBackground";
import { useLoading } from "@/components/LoadingContext";

export default function Hero() {
    const { isLoading, setIsLoading, hasPlayedIntro, setHasPlayedIntro } = useLoading();
    
    // Freeze the value for the lifetime of this component mount
    const [skipIntroState] = useState(hasPlayedIntro);
    
    const isLoaded = skipIntroState ? true : !isLoading;

    useEffect(() => {
        // Mark the intro as played in the global context for future navigations
        setHasPlayedIntro(true);
    }, [setHasPlayedIntro]);

    return (
        <section
            id="hero"
            className="h-screen min-h-[600px] max-h-[1080px] relative flex flex-col justify-between pt-20 md:pt-24 pb-4 md:pb-6 px-6 md:px-12 lg:px-16 overflow-hidden"
        >
            <CinematicNeuralBackground skipIntro={skipIntroState} onLoadComplete={() => setIsLoading(false)} />

            <div className="relative z-10 max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between">
                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center my-auto py-2 md:py-4">
                    
                    {/* Left Column: Heading, Subtitle & Action Links */}
                    <div className="lg:col-span-8 xl:col-span-8 flex flex-col items-start">
                        {/* Eyebrow Label */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 12 }}
                            transition={skipIntroState ? { duration: 0 } : { duration: 0.7, delay: 0.15 }}
                            className="mb-3 md:mb-4"
                        >
                            <span
                                className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase"
                                style={{
                                    color: "var(--color-text-secondary)",
                                    fontFamily: "var(--font-ui)",
                                }}
                            >
                                Parteek Garg
                            </span>
                        </motion.div>

                        {/* Editorial Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 16 }}
                            transition={skipIntroState ? { duration: 0 } : { duration: 0.8, delay: 0.28 }}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.75rem] xl:text-[5.25rem] tracking-tight leading-[1.08] mb-5 md:mb-6 font-normal text-left"
                            style={{
                                fontFamily: "var(--font-display)",
                                color: "var(--color-text-primary)",
                            }}
                        >
                            I build things<br className="hidden sm:inline" />{" "}
                            that solve real problems.
                        </motion.h1>

                        {/* Subtitle / Bio */}
                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 16 }}
                            transition={skipIntroState ? { duration: 0 } : { duration: 0.8, delay: 0.4 }}
                            className="text-sm sm:text-base md:text-lg max-w-xl leading-relaxed mb-8 md:mb-9 font-normal text-left"
                            style={{ color: "var(--color-text-secondary)" }}
                        >
                            Computer Science &amp; Data Science student exploring software engineering, AI, and thoughtful product development.
                        </motion.p>

                        {/* Action Links (CTAs) */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 16 }}
                            transition={skipIntroState ? { duration: 0 } : { duration: 0.8, delay: 0.52 }}
                            className="flex flex-wrap items-center gap-6 sm:gap-9"
                        >
                            <a
                                href="#projects"
                                onClick={(e) => {
                                    e.preventDefault();
                                    smoothScrollToElement("projects");
                                    window.history.pushState(null, "", "#projects");
                                }}
                                className="group relative inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase transition-colors pb-1 cursor-pointer"
                                style={{
                                    color: "var(--color-text-primary)",
                                    fontFamily: "var(--font-ui)",
                                }}
                            >
                                <span>Explore Projects</span>
                                <ArrowUpRight
                                    size={15}
                                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                />
                                <span
                                    className="absolute bottom-0 left-0 w-full h-[1px] opacity-40 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{ backgroundColor: "var(--color-text-primary)" }}
                                />
                            </a>

                            <a
                                href="#about"
                                onClick={(e) => {
                                    e.preventDefault();
                                    smoothScrollToElement("about");
                                    window.history.pushState(null, "", "#about");
                                }}
                                className="group relative inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase transition-colors pb-1 cursor-pointer"
                                style={{
                                    color: "var(--color-text-primary)",
                                    fontFamily: "var(--font-ui)",
                                }}
                            >
                                <span>About Me</span>
                                <ArrowUpRight
                                    size={15}
                                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                />
                                <span
                                    className="absolute bottom-0 left-0 w-full h-[1px] opacity-40 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{ backgroundColor: "var(--color-text-primary)" }}
                                />
                            </a>

                            <a
                                href="/ParteekGarg_Resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase transition-colors pb-1 cursor-pointer"
                                style={{
                                    color: "var(--color-text-primary)",
                                    fontFamily: "var(--font-ui)",
                                }}
                            >
                                <span>Resume</span>
                                <ArrowUpRight
                                    size={15}
                                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                />
                                <span
                                    className="absolute bottom-0 left-0 w-full h-[1px] opacity-40 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{ backgroundColor: "var(--color-text-primary)" }}
                                />
                            </a>
                        </motion.div>
                    </div>

                    {/* Right Column: Currently Building */}
                    <div className="lg:col-span-4 xl:col-span-4 flex lg:justify-end mt-4 lg:mt-0">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : 20 }}
                            transition={skipIntroState ? { duration: 0 } : { duration: 0.8, delay: 0.5 }}
                            className="relative pl-5 lg:pl-7 border-l border-[var(--color-border)] py-1 flex flex-col justify-center"
                        >
                            {/* Architectural square accent at top of vertical line */}
                            <span
                                className="absolute -top-1 -left-[3px] w-1.5 h-1.5"
                                style={{ backgroundColor: "var(--color-text-primary)" }}
                            />

                            <span
                                className="text-[11px] font-semibold tracking-[0.25em] uppercase mb-3 block"
                                style={{
                                    color: "var(--color-text-secondary)",
                                    fontFamily: "var(--font-ui)",
                                }}
                            >
                                Currently Building
                            </span>

                            <ul className="space-y-2 text-sm sm:text-base md:text-lg font-normal">
                                <li
                                    className="transition-transform hover:translate-x-1 duration-200"
                                    style={{
                                        fontFamily: "var(--font-display)",
                                        color: "var(--color-text-primary)",
                                    }}
                                >
                                    Full-stack systems
                                </li>
                                <li
                                    className="transition-transform hover:translate-x-1 duration-200"
                                    style={{
                                        fontFamily: "var(--font-display)",
                                        color: "var(--color-text-primary)",
                                    }}
                                >
                                    AI
                                </li>
                                <li
                                    className="transition-transform hover:translate-x-1 duration-200"
                                    style={{
                                        fontFamily: "var(--font-display)",
                                        color: "var(--color-text-primary)",
                                    }}
                                >
                                    FinTech
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                </div>

                {/* Bottom Row: Living Scroll Indicator */}
                <div className="flex items-center justify-end pb-2 select-none">
                    <motion.button
                        type="button"
                        onClick={() => smoothScrollToElement("about")}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 10 }}
                        transition={skipIntroState ? { duration: 0 } : { duration: 0.8, delay: 0.65 }}
                        className="group relative flex items-center gap-3 cursor-pointer bg-transparent border-none p-0 focus:outline-none"
                        aria-label="Scroll down to About section"
                    >
                        {/* Premium Light Beam Line Indicator */}
                        <div className="relative w-[1px] h-7 overflow-hidden rounded-full" style={{ backgroundColor: "var(--color-border)" }}>
                            <motion.div
                                className="w-full h-1/2 rounded-full"
                                style={{ backgroundColor: "var(--color-text-primary)" }}
                                animate={{
                                    y: ["-100%", "200%"],
                                }}
                                transition={{
                                    duration: 2.2,
                                    repeat: Infinity,
                                    ease: [0.45, 0, 0.55, 1],
                                }}
                            />
                        </div>

                        {/* Living Word 'Scroll' with subtle breath + floating arrow */}
                        <div className="flex items-center gap-1.5">
                            <motion.span
                                className="text-xs font-semibold tracking-[0.25em] uppercase transition-colors duration-300 group-hover:text-[var(--color-text-primary)]"
                                style={{
                                    color: "var(--color-text-secondary)",
                                    fontFamily: "var(--font-ui)",
                                }}
                                animate={{
                                    opacity: [0.7, 1, 0.7],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            >
                                Scroll
                            </motion.span>

                            <motion.span
                                className="text-[12px] inline-block font-sans text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors duration-300"
                                animate={{
                                    y: [0, 4, 0],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            >
                                &darr;
                            </motion.span>
                        </div>
                    </motion.button>
                </div>
            </div>
        </section>
    );
}
