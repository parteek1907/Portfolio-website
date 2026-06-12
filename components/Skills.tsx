"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { expertise } from "@/lib/data";

export default function Skills() {
    const [isDark, setIsDark] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    useEffect(() => {
        const checkTheme = () => setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
        checkTheme();
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="skills"
            ref={containerRef}
            className="pt-24 pb-32 px-6 relative overflow-hidden scroll-mt-24"
            style={{
                borderTop: "1px solid var(--color-border)",
                background: "var(--color-bg-primary)",
            }}
        >
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-16 md:mb-24"
                >
                    <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6" style={{ color: "var(--color-text-primary)" }}>Skills & Technologies</h2>
                    <p className="text-lg md:text-xl max-w-2xl leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                        Technologies, tools, and domains I'm actively learning and building with.
                    </p>
                </motion.div>

                <div className="flex flex-col gap-16 md:gap-20">
                    {expertise.map((item, index) => (
                        <ExpertiseRow key={index} item={item} index={index} isDark={isDark} scrollYProgress={scrollYProgress} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ExpertiseRow({ item, index, isDark, scrollYProgress }: { item: { area: string; technologies: string[] }, index: number, isDark: boolean, scrollYProgress: any }) {
    const yTransform = useTransform(
        scrollYProgress,
        [0, 1],
        [index % 2 === 0 ? 15 : 5, index % 2 === 0 ? -15 : -5]
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
            {/* Left Side: Category Title */}
            <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="md:col-span-4 flex flex-col pt-2"
            >
                <div className="mb-3 flex items-center gap-3">
                    <span className="text-xs font-mono opacity-40" style={{ color: "var(--color-text-tertiary)" }}>0{index + 1}</span>
                    <div className="h-px w-8" style={{ background: "var(--color-border)" }}></div>
                </div>
                <h4 className="text-xl md:text-2xl font-medium tracking-tight" style={{ color: "var(--color-text-primary)" }}>
                    {item.area}
                </h4>
            </motion.div>

            {/* Right Side: Floating Typography */}
            <motion.div
                style={{ y: yTransform }}
                className="md:col-span-8 flex flex-wrap gap-x-4 gap-y-2 md:gap-x-6 md:gap-y-3 mt-2 md:mt-0 items-center"
            >
                {item.technologies.map((tech: string, techIndex: number) => (
                    <motion.span
                        key={techIndex}
                        initial={{ opacity: 0, y: 5, filter: "blur(2px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: 0.15 + (techIndex * 0.03), ease: [0.22, 1, 0.36, 1] }}
                        whileHover={{
                            scale: 1.02,
                            color: "var(--color-text-primary)",
                            textShadow: isDark ? "0 0 15px rgba(255,255,255,0.4)" : "0 0 15px rgba(0,0,0,0.2)"
                        }}
                        className="text-lg md:text-xl lg:text-2xl font-medium tracking-tight cursor-default transition-all duration-300"
                        style={{ color: "var(--color-text-tertiary)" }}
                    >
                        {tech}
                    </motion.span>
                ))}
            </motion.div>
        </div>
    );
}
