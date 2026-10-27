"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowLeft } from "lucide-react";
import { useLoading } from "@/components/LoadingContext";
import { smoothScrollToElement } from "@/lib/smoothScroll";
import { useWindows } from "@/components/windows/WindowsContext";

const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Certifications", href: "#certifications" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const { isLoading } = useLoading();
    const { enterWindowsMode } = useWindows();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const [isDark, setIsDark] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const checkTheme = () => {
            setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
        };
        checkTheme();
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: "-30% 0px -30% 0px" }
        );

        const observeSections = () => {
            const sections = document.querySelectorAll("section[id]");
            sections.forEach((section) => observer.observe(section));
        };

        // Initial observation
        observeSections();

        // Watch for dynamically loaded sections
        const mutationObserver = new MutationObserver(() => {
            observeSections();
        });
        mutationObserver.observe(document.body, { childList: true, subtree: true });

        return () => {
            observer.disconnect();
            mutationObserver.disconnect();
        };
    }, []);

    if (isLoading) return null;

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300`}
            style={{
                background: "transparent",
                borderBottom: "none",
                backdropFilter: scrolled ? "blur(12px)" : "none",
            }}
        >
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <div>
                    {pathname !== "/" && (
                        <Link 
                            href="/" 
                            className="flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-70"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            <ArrowLeft size={16} />
                            Home
                        </Link>
                    )}
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-7">
                    <nav className="flex items-center gap-7">
                        {navLinks.map((link) => {
                            const isActive = `#${activeSection}` === link.href || (activeSection === "" && link.href === "#about");
                            return (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        
                                        if (pathname !== "/") {
                                            router.push("/" + link.href);
                                            return;
                                        }

                                        const targetId = link.href.replace(/.*\#/, "");
                                        smoothScrollToElement(targetId);
                                        window.history.pushState(null, "", link.href);
                                    }}
                                    className="text-sm nav-link-ui transition-colors relative cursor-pointer"
                                    style={{
                                        color: isActive ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                                    }}
                                >
                                    {link.name}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeNavSection"
                                            className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                                            style={{ background: "var(--color-text-primary)" }}
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                </a>
                            );
                        })}
                    </nav>

                    {/* Windows Experience Action Button */}
                    <button
                        type="button"
                        onClick={() => enterWindowsMode()}
                        className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 border shadow-sm group hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
                        style={{
                            background: isDark ? "rgba(0, 120, 212, 0.15)" : "rgba(0, 120, 212, 0.08)",
                            borderColor: isDark ? "rgba(0, 120, 212, 0.35)" : "rgba(0, 120, 212, 0.22)",
                            color: isDark ? "#60cdff" : "#0067b8",
                        }}
                        title="Switch to interactive Windows 11 desktop experience (Parteek OS)"
                        aria-label="Switch to Windows Experience"
                    >
                        <div className="grid grid-cols-2 gap-[2px] w-3.5 h-3.5 group-hover:rotate-6 transition-transform">
                            <span className="bg-[#0078D4] rounded-[1px] w-1.5 h-1.5" />
                            <span className="bg-[#0078D4] rounded-[1px] w-1.5 h-1.5" />
                            <span className="bg-[#0078D4] rounded-[1px] w-1.5 h-1.5" />
                            <span className="bg-[#0078D4] rounded-[1px] w-1.5 h-1.5" />
                        </div>
                        <span>Windows Experience</span>
                    </button>
                </div>

                {/* Mobile Right Controls: Quick Windows Button + Hamburger */}
                <div className="md:hidden flex items-center gap-2.5">
                    <button
                        type="button"
                        onClick={() => enterWindowsMode()}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border cursor-pointer"
                        style={{
                            background: isDark ? "rgba(0, 120, 212, 0.15)" : "rgba(0, 120, 212, 0.08)",
                            borderColor: isDark ? "rgba(0, 120, 212, 0.35)" : "rgba(0, 120, 212, 0.22)",
                            color: isDark ? "#60cdff" : "#0067b8",
                        }}
                        aria-label="Switch to Windows Experience"
                    >
                        <div className="grid grid-cols-2 gap-[2px] w-3 h-3">
                            <span className="bg-[#0078D4] rounded-[1px] w-1 h-1" />
                            <span className="bg-[#0078D4] rounded-[1px] w-1 h-1" />
                            <span className="bg-[#0078D4] rounded-[1px] w-1 h-1" />
                            <span className="bg-[#0078D4] rounded-[1px] w-1 h-1" />
                        </div>
                        <span>Windows OS</span>
                    </button>

                    <button
                        className="transition-colors p-1"
                        style={{ color: "var(--color-text-secondary)" }}
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle navigation menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-20 left-0 right-0 backdrop-blur-xl p-6 md:hidden flex flex-col gap-4 shadow-xl"
                        style={{
                            background: "var(--color-surface)",
                            borderBottom: "1px solid var(--color-border)",
                        }}
                    >
                        {navLinks.map((link) => {
                            const isActive = `#${activeSection}` === link.href || (activeSection === "" && link.href === "#about");
                            return (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setIsOpen(false);
                                        
                                        if (pathname !== "/") {
                                            router.push("/" + link.href);
                                            return;
                                        }

                                        const targetId = link.href.replace(/.*\#/, "");
                                        smoothScrollToElement(targetId);
                                        window.history.pushState(null, "", link.href);
                                    }}
                                    className="text-lg nav-link-ui transition-colors cursor-pointer"
                                    style={{
                                        color: isActive ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                                    }}
                                >
                                    {link.name}
                                </a>
                            )
                        })}

                        <div className="pt-2 border-t border-[var(--color-border)]">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsOpen(false);
                                    enterWindowsMode();
                                }}
                                className="w-full flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold tracking-wide transition-all border cursor-pointer"
                                style={{
                                    background: isDark ? "rgba(0, 120, 212, 0.16)" : "rgba(0, 120, 212, 0.09)",
                                    borderColor: isDark ? "rgba(0, 120, 212, 0.35)" : "rgba(0, 120, 212, 0.22)",
                                    color: isDark ? "#60cdff" : "#0067b8",
                                }}
                            >
                                <div className="grid grid-cols-2 gap-[2px] w-3.5 h-3.5">
                                    <span className="bg-[#0078D4] rounded-[1px] w-1.5 h-1.5" />
                                    <span className="bg-[#0078D4] rounded-[1px] w-1.5 h-1.5" />
                                    <span className="bg-[#0078D4] rounded-[1px] w-1.5 h-1.5" />
                                    <span className="bg-[#0078D4] rounded-[1px] w-1.5 h-1.5" />
                                </div>
                                <span>Launch Windows Experience</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
