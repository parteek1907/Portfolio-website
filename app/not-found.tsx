"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import CinematicNeuralBackground from "@/components/CinematicNeuralBackground";

export default function NotFound() {
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] text-white">
            <div className="absolute inset-0 z-0">
                <CinematicNeuralBackground skipIntro={true} onLoadComplete={() => { }} />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-[600px] mx-auto"
            >
                {/* Layer 1 — Glitch "404" */}
                <h1 className="text-[100px] md:text-[160px] font-bold font-mono text-[#8b5cf6] leading-none mb-8 glitch-text-premium">
                    404
                </h1>

                {/* Layer 2 — Terminal Box */}
                <div className="w-full max-w-[480px] bg-black/60 border border-[#8b5cf6]/30 rounded-xl p-[20px] md:px-[28px] text-left font-mono text-sm md:text-base mb-10 shadow-xl overflow-hidden">
                    <div className="flex flex-col gap-1">
                        <TerminalLine delay={0.2} className="text-zinc-500">
                            $ cd /page-you-were-looking-for
                        </TerminalLine>
                        <TerminalLine delay={0.6} className="text-red-500">
                            bash: cd: No such file or directory
                        </TerminalLine>
                        <div className="h-4" /> {/* empty line gap */}
                        <TerminalLine delay={1.0} className="text-zinc-500">
                            $ git log --oneline this-page
                        </TerminalLine>
                        <TerminalLine delay={1.4} className="text-red-500">
                            fatal: ambiguous argument 'this-page'
                        </TerminalLine>
                        <div className="h-4" /> {/* empty line gap */}
                        <TerminalLine delay={1.8} className="text-green-500">
                            $ echo 'It compiled fine on my machine'
                        </TerminalLine>
                        <TerminalLine delay={2.2} className="text-white">
                            It compiled fine on my machine
                        </TerminalLine>
                        <div className="h-4" /> {/* empty line gap */}
                        <TerminalLine delay={2.6} className="text-[#8b5cf6]">
                            # Hint: try going back home ↓<span className="animate-blink">█</span>
                        </TerminalLine>
                    </div>
                </div>

                {/* Layer 3 — Human readable message */}
                <div className="mb-10">
                    <p className="text-[18px] text-white font-semibold mb-2">
                        Looks like this page got lost in the void.
                    </p>
                    <p className="text-[14px] text-zinc-500 italic">
                        Don't worry — even the best codebases have missing files.
                    </p>
                </div>

                {/* Layer 4 — CTA Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-14 w-full sm:w-auto">
                    <Link
                        href="/"
                        className="flex items-center justify-center w-full sm:w-auto h-12 px-6 rounded-full font-medium text-[15px] bg-[#8b5cf6] text-white transition-all duration-250 ease-out cursor-pointer hover:bg-[#7c3aed] hover:scale-[1.03]"
                    >
                        ← Back to Home
                    </Link>
                </div>

                {/* Layer 5 — Bottom hint row */}
                <div className="flex items-center justify-center gap-2 text-[12px] text-zinc-500">
                    <span>Lost? Try: </span>
                    <HintLink shortcut="G" href="https://github.com/parteek1907" label="GitHub" external />
                    <span>·</span>
                    <HintLink shortcut="L" href="https://www.linkedin.com/in/parteek1907/" label="LinkedIn" external />
                    <span>·</span>
                    <HintLink shortcut="P" href="/" label="Portfolio" />
                </div>
            </motion.div>
        </div>
    );
}

function TerminalLine({ children, delay, className }: { children: React.ReactNode, delay: number, className?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

function HintLink({ shortcut, href, label, external }: { shortcut: string, href: string, label: string, external?: boolean }) {
    return (
        <Link
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="flex items-center gap-1.5 hover:text-white transition-colors group"
        >
            <span className="flex items-center justify-center px-1.5 py-0.5 rounded bg-[#8b5cf6]/10 border border-[#8b5cf6]/30 text-[#8b5cf6] font-mono font-bold text-[11px] transition-colors group-hover:bg-[#8b5cf6]/20">
                {shortcut}
            </span>
            <span>{label}</span>
        </Link>
    )
}
