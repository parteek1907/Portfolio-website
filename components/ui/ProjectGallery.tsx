"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

interface ProjectGalleryProps {
    images: string[];
}

export default function ProjectGallery({ images }: ProjectGalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isLightboxOpen || images.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [images.length, isLightboxOpen]);

    if (!images || images.length === 0) return null;

    const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
    const prevImage = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

    return (
        <>
            <div className="flex flex-col gap-3">
                {/* Main Viewport */}
                <div 
                    className="relative w-full aspect-video rounded-2xl overflow-hidden bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] group cursor-pointer"
                    onClick={() => setIsLightboxOpen(true)}
                >
                    <AnimatePresence>
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            className="absolute inset-0"
                        >
                            <Image 
                                src={images[currentIndex]} 
                                alt={`Screenshot ${currentIndex + 1}`} 
                                fill 
                                className="object-cover"
                            />
                        </motion.div>
                    </AnimatePresence>

                    {/* Expand Hint */}
                    <div className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md">
                        <Maximize2 size={16} />
                    </div>

                    {/* Navigation Controls (if multiple) */}
                    {images.length > 1 && (
                        <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                className="p-2 rounded-full bg-black/50 text-white hover:bg-black/80 backdrop-blur-md transition-colors"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button 
                                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                className="p-2 rounded-full bg-black/50 text-white hover:bg-black/80 backdrop-blur-md transition-colors"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Premium Pill Indicators */}
                {images.length > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-4">
                        {images.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`h-1.5 transition-all duration-300 rounded-full ${
                                    idx === currentIndex 
                                    ? "w-8 bg-[var(--color-text-primary)]" 
                                    : "w-2 bg-[var(--color-text-tertiary)] hover:bg-[var(--color-text-secondary)]"
                                }`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Lightbox Modal via Portal to escape CSS transform boundaries */}
            {isMounted && document.body && createPortal(
                <AnimatePresence>
                    {isLightboxOpen && (
                        <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 md:p-12 pointer-events-none">
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-black/95 backdrop-blur-xl pointer-events-auto"
                                onClick={() => setIsLightboxOpen(false)}
                            />
                            
                            <motion.button 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                onClick={() => setIsLightboxOpen(false)}
                                className="absolute top-6 right-6 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors pointer-events-auto"
                            >
                                <X size={24} />
                            </motion.button>

                            <motion.div 
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.95, opacity: 0 }}
                                transition={{ type: "spring", damping: 25 }}
                                className="relative flex items-center justify-center w-full max-w-7xl pointer-events-auto"
                            >
                                <Image 
                                    src={images[currentIndex]} 
                                    alt={`Fullscreen Screenshot ${currentIndex + 1}`} 
                                    width={1920}
                                    height={1080}
                                    unoptimized
                                    quality={100}
                                    className="w-auto h-auto max-w-full max-h-[85vh] rounded-2xl shadow-2xl"
                                />

                                {images.length > 1 && (
                                    <>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                            className="absolute left-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/50 text-white hover:bg-black/80 backdrop-blur-md transition-colors"
                                        >
                                            <ChevronLeft size={32} />
                                        </button>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                            className="absolute right-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/50 text-white hover:bg-black/80 backdrop-blur-md transition-colors"
                                        >
                                            <ChevronRight size={32} />
                                        </button>
                                    </>
                                )}
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
}
