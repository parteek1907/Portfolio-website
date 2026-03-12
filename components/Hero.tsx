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
    }, [text, isDeleting, loopNum]); // omitting phrases to avoid lint warnings if not memoized

    return (
        <span className="inline-block py-2 px-6 rounded-full bg-white/5 border border-white/10 text-2xl md:text-3xl font-medium text-purple-400 mb-4 min-w-[320px] md:min-w-[440px]">
            {text}<span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>|</span>
        </span>
    );
};

export default function Hero() {
    const { isLoading, setIsLoading } = useLoading();
    const isLoaded = !isLoading;

    return (
        <section
            className="min-h-screen flex items-center justify-center pt-20 pb-10 overflow-hidden relative"
        >
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
                    className="flex flex-col items-center"
                >
                    <TypewriterBadge />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.9 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full bg-white/[0.04] border border-white/[0.08]"
                >
                    <motion.div
                        className="w-2 h-2 rounded-full bg-[#22c55e]"
                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    />
                    <span className="text-[13px] text-[#9ca3af]">Currently building: Veralon</span>
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
                    className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.2] md:leading-[1.1]"
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
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 inline-block">
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
                    className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed"
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
                        className="flex items-center justify-center w-full sm:w-auto h-12 px-6 rounded-full font-medium text-[15px] bg-[#8b5cf6] text-white transition-all duration-300 ease-out cursor-pointer hover:bg-[#7c3aed] hover:scale-[1.03]"
                    >
                        View My Work
                    </Link>
                    <Link
                        href="#contact"
                        className="flex items-center justify-center w-full sm:w-auto h-12 px-6 rounded-full font-medium text-[15px] bg-transparent border-[1.5px] border-[#8b5cf6] text-[#8b5cf6] transition-all duration-300 ease-out cursor-pointer hover:bg-[#8b5cf6]/[0.12] hover:scale-[1.03]"
                    >
                        Contact Me
                    </Link>
                    <a
                        href="/ParteekGarg_Resume.pdf"
                        download="ParteekGarg_Resume.pdf"
                        className="flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-6 rounded-full font-medium text-[15px] bg-transparent border-[1.5px] border-white/25 text-white transition-all duration-300 ease-out cursor-pointer hover:border-white/60 hover:scale-[1.03]"
                    >
                        <Download size={16} />
                        Download CV
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
