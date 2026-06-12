"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Calendar } from "lucide-react";
import Image from "next/image";
import { Certification } from "@/lib/data";
import dynamic from "next/dynamic";

const PDFViewer = dynamic(() => import("./PDFViewer"), { ssr: false });

interface CertificationCardProps {
    certificate: Certification;
    index: number;
    onViewClick: () => void;
}

export default function CertificationCard({ certificate, index, onViewClick }: CertificationCardProps) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="group relative flex flex-col gap-6 cursor-pointer w-full h-full"
        >
            {/* Thumbnail Hero */}
            <div 
                className="relative aspect-[1.414] w-full overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-tertiary)] shadow-sm"
                onClick={onViewClick}
            >
                {/* Editorial Hover Overlay */}
                <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 bg-black/30 backdrop-blur-[2px] transition-all duration-500 flex items-center justify-center pointer-events-none">
                    <span className="text-white text-xs font-semibold tracking-[0.2em] uppercase flex items-center gap-2 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                        Click to view
                    </span>
                </div>

                {certificate.thumbnail.endsWith('.pdf') ? (
                    <>
                        <div className="block md:hidden absolute inset-0 overflow-hidden pointer-events-none bg-transparent flex items-start justify-center">
                            <PDFViewer 
                                file={certificate.thumbnail} 
                                loading={<div className="w-full h-full bg-transparent" />}
                                className="w-full flex justify-center"
                                width={typeof window !== 'undefined' ? window.innerWidth - 32 : 350} 
                            />
                        </div>
                        {/* Desktop View */}
                        <div className="hidden md:block absolute top-0 left-[-1%] w-[102%] h-[250%] pointer-events-none transition-transform duration-700 ease-out">
                            <iframe
                                src={`${certificate.thumbnail}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                                className="w-full h-full object-top"
                                style={{ border: 'none' }}
                                tabIndex={-1}
                            />
                        </div>
                    </>
                ) : (
                    <Image
                        src={certificate.thumbnail}
                        alt={`${certificate.title} Preview`}
                        fill
                        className="object-cover object-center transition-transform duration-700 ease-out"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                )}
            </div>

            {/* Caption Body */}
            <div className="flex flex-col flex-1 px-1">
                
                {/* Top: Logo + Issuer + Title */}
                <div className="flex items-start gap-4 md:gap-5">
                    {/* Large Logo without container borders */}
                    {certificate.issuerLogo && (
                        <div className="relative w-12 h-12 md:w-14 md:h-14 shrink-0 flex items-center justify-center mt-1">
                            <Image 
                                src={certificate.issuerLogo} 
                                alt={certificate.issuer} 
                                fill
                                className="object-contain rounded-xl overflow-hidden"
                            />
                        </div>
                    )}

                    <div className="flex flex-col pt-1">
                        <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[var(--color-text-secondary)] mb-0.5">
                            {certificate.issuer}
                        </span>
                        <h3 className="text-base md:text-lg font-medium text-[var(--color-text-primary)] leading-tight tracking-tight">
                            {certificate.title}
                        </h3>
                    </div>
                </div>
                
                {/* Bottom: Metadata Footer */}
                <div className="flex flex-wrap items-center justify-between gap-y-2 gap-x-4 mt-auto pt-6">
                    <div className="flex flex-wrap items-center gap-1.5 md:gap-2 text-[12px] md:text-[13px] font-medium text-[var(--color-text-secondary)]">
                        <Calendar size={14} className="opacity-70" />
                        <span>Issued {certificate.issueDate}</span>
                        {certificate.hours && (
                            <>
                                <span className="opacity-50 mx-1">•</span>
                                <span>{certificate.hours.toLowerCase().includes("hour") ? certificate.hours : `${certificate.hours} Hours`}</span>
                            </>
                        )}
                    </div>
                    
                    <a 
                        href={certificate.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link relative flex items-center gap-1 text-[13px] font-medium text-[var(--color-text-primary)] hover:text-[var(--color-text-secondary)] transition-colors"
                        onClick={(e) => e.stopPropagation()}
                    >
                        Verify <ArrowUpRight size={14} className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                    </a>
                </div>
            </div>
        </motion.article>
    );
}
