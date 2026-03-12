"use client";

import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

export default function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            // Show button if scrolled down more than 300px
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        // Initial check in case of page refresh while scrolled down
        toggleVisibility();

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className={`
            fixed z-[40] hidden md:flex items-center justify-center
            w-11 h-11 rounded-full cursor-pointer
            bg-white/[0.08] border border-white/[0.12]
            backdrop-blur-[8px]
            transition-all duration-200 ease-in-out
            hover:scale-110 hover:bg-[#8b5cf6] hover:border-[#8b5cf6]
            bottom-8 right-4 md:right-6
            ${isVisible
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-2 pointer-events-none"
                }
        `}
        >
            <ChevronUp className="w-5 h-5 text-white/90" strokeWidth={2.5} />
        </button>
    );
}
