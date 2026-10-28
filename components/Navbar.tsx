"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowLeft, ArrowUpRight } from "lucide-react";
import { useLoading } from "@/components/LoadingContext";
import { smoothScrollToElement } from "@/lib/smoothScroll";
import { useWindows, isOsHost, isDesktopSupported } from "@/components/windows/WindowsContext";
import OsAnnouncementPopover from "@/components/OsAnnouncementPopover";

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
    const { isWindowsMode, enterWindowsMode } = useWindows();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const pathname = usePathname();
    const router = useRouter();

    const [isOsPopoverOpen, setIsOsPopoverOpen] = useState(false);
    const osButtonContainerRef = useRef<HTMLDivElement>(null);

    // Contextual popover announcement for Parteek OS
    useEffect(() => {
        if (typeof window === "undefined") return;

        // Never show if currently loading or already in Windows Mode
        if (isLoading || isWindowsMode) return;

        // Never show on the OS subdomain
        const hostname = window.location.hostname.toLowerCase();
        if (isOsHost(hostname)) return;

        // Never show if dismissed in localStorage
        try {
            if (localStorage.getItem("parteek_os_announcement_dismissed") === "true") {
                return;
            }
        } catch {}

        // Never show if visitor already entered OS during this session
        try {
            if (sessionStorage.getItem("parteek_os_entered_session") === "true") {
                return;
            }
        } catch {}

        // Show after 3.5 seconds on desktop viewports
        const timer = setTimeout(() => {
            if (window.innerWidth >= 768 && isDesktopSupported()) {
                setIsOsPopoverOpen(true);
            }
        }, 3500);

        return () => clearTimeout(timer);
    }, [isLoading, isWindowsMode]);

    const handleDismissPopover = useCallback(() => {
        setIsOsPopoverOpen(false);
        try {
            localStorage.setItem("parteek_os_announcement_dismissed", "true");
        } catch {}
    }, []);

    const handleEnterOs = useCallback(() => {
        handleDismissPopover();
        enterWindowsMode();
    }, [handleDismissPopover, enterWindowsMode]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
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
        const timer = setTimeout(observeSections, 600);

        return () => {
            observer.disconnect();
            clearTimeout(timer);
        };
    }, []);

    if (isLoading || isWindowsMode) return null;

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300`}
            style={{
                background: "transparent",
                borderBottom: "none",
                backdropFilter: scrolled ? "blur(12px)" : "none",
            }}
        >
            <div className="w-full px-6 sm:px-8 md:px-10 lg:px-12 h-20 flex items-center justify-between">
                <div>
                    {pathname !== "/" && (
                        <Link 
                            href="/" 
                            className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-70"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            <ArrowLeft size={16} />
                            Home
                        </Link>
                    )}
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center ml-auto">
                    <nav className="flex items-center gap-6 lg:gap-8">
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
                                    className="inline-flex items-center text-sm nav-link-ui transition-colors relative cursor-pointer"
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

                        {/* Enter OS Nav Link with Contextual Popover */}
                        <div className="relative inline-flex items-center" ref={osButtonContainerRef}>
                            <button
                                type="button"
                                onClick={handleEnterOs}
                                className={`group inline-flex items-center gap-1.5 text-sm nav-link-ui transition-all duration-300 cursor-pointer outline-none ${
                                    isOsPopoverOpen
                                        ? "-my-1 -mx-2.5 px-2.5 py-1 rounded-md bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] shadow-sm"
                                        : "-my-1 -mx-2.5 px-2.5 py-1 rounded-md bg-transparent border border-transparent text-[var(--color-text-secondary)]"
                                }`}
                                title="Enter OS"
                                aria-label="Enter OS"
                                aria-expanded={isOsPopoverOpen}
                                aria-haspopup="dialog"
                            >
                                <span>Enter OS</span>
                                <ArrowUpRight
                                    size={14}
                                    className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                />
                            </button>

                            <OsAnnouncementPopover
                                isOpen={isOsPopoverOpen}
                                onDismiss={handleDismissPopover}
                                anchorRef={osButtonContainerRef}
                            />
                        </div>
                    </nav>
                </div>

                {/* Mobile Right Controls: Hamburger Menu */}
                <div className="md:hidden flex items-center ml-auto">
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
                            );
                        })}

                        {/* Enter OS in Mobile Drawer */}
                        <button
                            type="button"
                            onClick={() => {
                                setIsOpen(false);
                                handleDismissPopover();
                                enterWindowsMode();
                            }}
                            className="group flex items-center justify-between text-lg nav-link-ui transition-colors cursor-pointer bg-transparent border-none p-0 text-left pt-3 mt-1 border-t border-[var(--color-border)]"
                            style={{ color: "var(--color-text-secondary)" }}
                            title="Enter OS"
                            aria-label="Enter OS"
                        >
                            <span>Enter OS</span>
                            <ArrowUpRight
                                size={18}
                                className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
