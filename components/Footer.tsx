"use client";

import { Github, Instagram, Linkedin } from "lucide-react";
import { socialLinks } from "@/lib/data";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-8 bg-black text-center">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-6">
                {/* Footer text removed as requested */}
            </div>
        </footer>
    );
}
