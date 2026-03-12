"use client";

import { motion } from "framer-motion";

export default function Footer() {
    return (
        <motion.footer
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="pt-12 pb-28 md:pb-24 bg-black border-t border-white/10"
        >
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col items-center justify-center gap-1 mb-8 text-center">
                    {/* Branding & Tagline */}
                    <div className="text-xl font-bold tracking-tight">Parteek Garg</div>
                    <p className="text-sm text-zinc-400">Building Practical Systems.</p>
                </div>

                {/* Bottom Bar: Copyright */}
                <div className="pt-8 border-t border-white/5 text-center text-sm text-zinc-500">
                    <p>© 2026 Parteek Garg. Built with Next.js.</p>
                </div>
            </div>
        </motion.footer>
    );
}
