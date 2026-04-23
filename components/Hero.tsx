"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { aboutMe } from "@/lib/data";
import CinematicNeuralBackground from "./CinematicNeuralBackground";
import { useLoading } from "@/components/LoadingContext";

const TypewriterBadge = () => {
    const phrases = [
        "I'm a Developer",
        "I'm a Problem Solver",
        "I'm a Data Science Enthusiast",
        "I'm Parteek Garg"
    ];
    const [text, setText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 500);
        return () => clearInterval(cursorInterval);
    }, []);

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        const i = loopNum % phrases.length;
        const fullText = phrases[i];

        if (isDeleting) {
            timeout = setTimeout(() => {
                setText(fullText.substring(0, text.length - 1));
                if (text.length === 0) {
                    setIsDeleting(false);
                    setLoopNum(loopNum + 1);
                }
            }, 35);
        } else {
            timeout = setTimeout(() => {
                setText(fullText.substring(0, text.length + 1));
                if (text.length === fullText.length) {
                    timeout = setTimeout(() => setIsDeleting(true), 1800);
                }
            }, 60);
        }

        return () => clearTimeout(timeout);
    }, [text, isDeleting, loopNum]);

    return (
        <span
            className="inline-block text-2xl md:text-3xl typewriter-text mb-4 min-w-[320px] md:min-w-[440px]"
            style={{
                color: "var(--color-text-secondary)",
            }}
        >
            {text}<span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>|</span>
        </span>
    );
};

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

            <div className="max-w-5xl mx-auto px-6 text-center z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex flex-col items-center"
                >
                    <TypewriterBadge />
                </motion.div>

                <motion.h1
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
                    {"Systems.".split("").map((char, index) => (
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
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed body-copy text-muted"
                    style={{ color: "var(--color-text-secondary)" }}
                >
                    {aboutMe.heroDescription}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3"
                >
                    <Link
                        href="#projects"
                        className="flex items-center justify-center w-full sm:w-auto h-12 px-6 rounded-full button-ui text-[15px] bg-transparent transition-all duration-300 ease-out cursor-pointer hover:scale-[1.03]"
                        style={{
                            border: isDark ? "1px solid var(--color-border)" : "1px solid rgba(0, 0, 0, 0.2)",
                            color: "var(--color-text-primary)",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = isDark ? "var(--color-accent)" : "rgba(0, 0, 0, 0.2)";
                            e.currentTarget.style.background = isDark ? "transparent" : "rgba(0, 0, 0, 0.05)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = isDark ? "var(--color-border)" : "rgba(0, 0, 0, 0.2)";
                            e.currentTarget.style.background = "transparent";
                        }}
                    >
                        View My Work
                    </Link>
                    <Link
                        href="#contact"
                        className="flex items-center justify-center w-full sm:w-auto h-12 px-6 rounded-full button-ui text-[15px] bg-transparent transition-all duration-300 ease-out cursor-pointer hover:scale-[1.03]"
                        style={{
                            border: isDark ? "1px solid var(--color-border)" : "1px solid rgba(0, 0, 0, 0.2)",
                            color: "var(--color-text-primary)",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = isDark ? "var(--color-accent)" : "rgba(0, 0, 0, 0.2)";
                            e.currentTarget.style.background = isDark ? "transparent" : "rgba(0, 0, 0, 0.05)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = isDark ? "var(--color-border)" : "rgba(0, 0, 0, 0.2)";
                            e.currentTarget.style.background = "transparent";
                        }}
                    >
                        Contact Me
                    </Link>
                    <a
                        href="/ParteekGarg_Resume.pdf"
                        download="ParteekGarg_Resume.pdf"
                        className="flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-6 rounded-full button-ui text-[15px] bg-transparent transition-all duration-300 ease-out cursor-pointer hover:scale-[1.03]"
                        style={{
                            border: isDark ? "1px solid var(--color-border)" : "1px solid rgba(0, 0, 0, 0.2)",
                            color: "var(--color-text-primary)",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = isDark ? "var(--color-accent)" : "rgba(0, 0, 0, 0.2)";
                            e.currentTarget.style.background = isDark ? "transparent" : "rgba(0, 0, 0, 0.05)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = isDark ? "var(--color-border)" : "rgba(0, 0, 0, 0.2)";
                            e.currentTarget.style.background = "transparent";
                        }}
                    >
                        <Download size={16} />
                        Download CV
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
