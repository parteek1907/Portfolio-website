"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { aboutMe } from "@/lib/data";
import CinematicNeuralBackground from "./CinematicNeuralBackground";
import { useLoading } from "@/components/LoadingContext";

export default function Hero() {
    const { isLoading, setIsLoading } = useLoading();
    const isLoaded = !isLoading;
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const checkTheme = () => {
            setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
        };
        checkTheme();
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
        return () => observer.disconnect();
    }, []);

    return (
        <section
            className="min-h-screen flex items-center justify-center pt-20 pb-10 overflow-hidden relative"
        >
            <CinematicNeuralBackground onLoadComplete={() => setIsLoading(false)} />

            <div className="max-w-5xl mx-auto px-6 text-center z-10 flex flex-col items-center">
                <h1 className="sr-only">Parteek Garg - Full-Stack Developer & Data Science Engineer</h1>
                
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-6"
                >
                    <span className="text-sm font-semibold tracking-[0.2em] uppercase" style={{ color: "var(--color-accent)" }}>
                        Parteek Garg
                    </span>
                </motion.div>

                <motion.h2
                    initial="hidden"
                    animate={isLoaded ? "visible" : "hidden"}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.1,
                                delayChildren: 0.4
                            }
                        }
                    }}
                    className="text-4xl sm:text-5xl md:text-7xl hero-title tracking-tight mb-8 leading-[1.2] md:leading-[1.1]"
                    style={{ color: "var(--color-text-primary)" }}
                >
                    {"Building ".split("").map((char, index) => (
                        <motion.span
                            key={`char1-${index}`}
                            variants={{
                                hidden: { opacity: 0, y: 10 },
                                visible: { opacity: 1, y: 0 }
                            }}
                        >
                            {char}
                        </motion.span>
                    ))}
                    <span className="inline-block" style={{ color: "var(--color-text-primary)" }}>
                        {"Practical ".split("").map((char, index) => (
                            <motion.span
                                key={`char2-${index}`}
                                variants={{
                                    hidden: { opacity: 0, y: 10 },
                                    visible: { opacity: 1, y: 0 }
                                 }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </span>
                    <br className="hidden sm:block" />
                    {"Systems".split("").map((char, index) => (
                        <motion.span
                            key={`char3-${index}`}
                            variants={{
                                hidden: { opacity: 0, y: 10 },
                                visible: { opacity: 1, y: 0 }
                            }}
                        >
                            {char}
                        </motion.span>
                    ))}
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed body-copy text-muted"
                    style={{ color: "var(--color-text-secondary)" }}
                >
                    {aboutMe.heroDescription}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-8 sm:gap-12 w-full mt-4"
                >
                    <a
                        href="#projects"
                        onClick={(e) => {
                            e.preventDefault();
                            const elem = document.getElementById("projects");
                            if (elem) {
                                elem.scrollIntoView({ behavior: "smooth" });
                                window.history.pushState(null, "", "#projects");
                            }
                        }}
                        className="group relative flex items-center gap-2 text-[15px] font-medium tracking-wide transition-colors duration-300 cursor-pointer"
                        style={{ color: "var(--color-text-secondary)" }}
                        onMouseEnter={(e) => e.currentTarget.style.color = "var(--color-text-primary)"}
                        onMouseLeave={(e) => e.currentTarget.style.color = "var(--color-text-secondary)"}
                    >
                        <span>View My Work</span>
                        <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                        <span className="absolute -bottom-1.5 left-0 w-0 h-px transition-all duration-500 ease-out group-hover:w-full opacity-60" style={{ background: "currentColor" }}></span>
                    </a>

                    <a
                        href="#contact"
                        onClick={(e) => {
                            e.preventDefault();
                            const elem = document.getElementById("contact");
                            if (elem) {
                                elem.scrollIntoView({ behavior: "smooth" });
                                window.history.pushState(null, "", "#contact");
                            }
                        }}
                        className="group relative flex items-center gap-2 text-[15px] font-medium tracking-wide transition-colors duration-300 cursor-pointer"
                        style={{ color: "var(--color-text-secondary)" }}
                        onMouseEnter={(e) => e.currentTarget.style.color = "var(--color-text-primary)"}
                        onMouseLeave={(e) => e.currentTarget.style.color = "var(--color-text-secondary)"}
                    >
                        <span>Contact Me</span>
                        <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                        <span className="absolute -bottom-1.5 left-0 w-0 h-px transition-all duration-500 ease-out group-hover:w-full opacity-60" style={{ background: "currentColor" }}></span>
                    </a>

                    <a
                        href="/ParteekGarg_Resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex items-center gap-2 text-[15px] font-medium tracking-wide transition-colors duration-300"
                        style={{ color: "var(--color-text-secondary)" }}
                        onMouseEnter={(e) => e.currentTarget.style.color = "var(--color-text-primary)"}
                        onMouseLeave={(e) => e.currentTarget.style.color = "var(--color-text-secondary)"}
                    >
                        <span>View Resume</span>
                        <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        <span className="absolute -bottom-1.5 left-0 w-0 h-px transition-all duration-500 ease-out group-hover:w-full opacity-60" style={{ background: "currentColor" }}></span>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
