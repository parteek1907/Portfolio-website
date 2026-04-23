"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Footer() {
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
        <motion.footer
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="pt-12 pb-36 md:pb-28"
            style={{
                background: isDark ? "var(--color-bg-primary)" : "#E8E2DA",
                borderTop: "1px solid var(--color-border)",
            }}
        >
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col items-center justify-center gap-1 mb-8 text-center">
                    <div className="text-xl tracking-tight footer-name" style={{ color: "var(--color-text-primary)" }}>Parteek Garg</div>
                    <p className="text-sm footer-muted" style={{ color: "var(--color-text-secondary)" }}>Building Practical Systems.</p>
                </div>

                <div
                    className="text-center text-sm"
                    style={{
                        color: "var(--color-text-secondary)",
                    }}
                >
                    <p className="footer-muted">© 2026 Parteek Garg. Built with Next.js.</p>
                </div>
            </div>
        </motion.footer>
    );
}
