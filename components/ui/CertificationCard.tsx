"use client";

import { motion } from "framer-motion";
import { ExternalLink, CheckCircle, Clock } from "lucide-react";
import Image from "next/image";
import { Certification } from "@/lib/data";

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
            className="group relative flex flex-col bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out"
        >
            {/* Thumbnail Header */}
            <div 
                className="relative h-48 w-full overflow-hidden bg-[var(--color-bg-tertiary)] cursor-pointer flex items-center justify-center"
                onClick={onViewClick}
            >
                <div className="absolute inset-0 z-10 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                {certificate.thumbnail.endsWith('.pdf') ? (
                    <div className="absolute top-0 left-[-1%] w-[102%] h-[250%] pointer-events-none group-hover:scale-[1.03] origin-top transition-transform duration-500 ease-out">
                        <iframe
                            src={`${certificate.thumbnail}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                            className="w-full h-full object-top"
                            style={{ border: 'none' }}
                            tabIndex={-1}
                        />
                    </div>
                ) : (
                    <Image
                        src={certificate.thumbnail}
                        alt={`${certificate.title} Preview`}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                )}
                
                {/* Status Badge overlay */}
                <div className="absolute top-4 right-4 z-20">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[var(--color-surface)]/90 backdrop-blur-md border border-[var(--color-border)] shadow-sm">
                        {certificate.status === "completed" ? (
                            <>
                                <CheckCircle size={14} className="text-emerald-500" />
                                <span className="text-[var(--color-text-primary)]">Completed</span>
                            </>
                        ) : (
                            <>
                                <Clock size={14} className="text-amber-500" />
                                <span className="text-[var(--color-text-primary)]">In Progress</span>
                            </>
                        )}
                    </span>
                </div>
                
                {/* Hover overlay text */}
                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 backdrop-blur-[2px] transition-all duration-300">
                    <span className="px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg backdrop-blur-md font-medium shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        Click to View
                    </span>
                </div>
            </div>

            {/* Content Body */}
            <div className="flex flex-col flex-1 p-6 relative">
                {/* Issuer Logo Floating */}
                {certificate.issuerLogo && (
                    <div className="absolute -top-8 left-6 w-16 h-16 flex items-center justify-center z-30 rounded-2xl overflow-hidden shadow-sm border border-[var(--color-border)]">
                        <div className="relative w-full h-full bg-[var(--color-surface)]">
                            <Image 
                                src={certificate.issuerLogo} 
                                alt={certificate.issuer} 
                                fill 
                                className="object-cover"
                            />
                        </div>
                    </div>
                )}

                <div className={`flex flex-col flex-1 ${certificate.issuerLogo ? 'mt-6' : ''}`}>
                    <p className="text-sm font-medium text-[var(--color-text-secondary)] mb-1">
                        {certificate.issuer}
                    </p>
                    <h3 className="text-lg font-bold text-[var(--color-text-primary)] leading-snug mb-3 line-clamp-2 min-h-[3.25rem]">
                        {certificate.title}
                    </h3>
                    
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {certificate.skills.slice(0, 3).map((skill) => (
                            <span 
                                key={skill} 
                                className="px-3 py-1 text-[11px] font-medium rounded-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] text-[var(--color-text-secondary)] whitespace-nowrap"
                            >
                                {skill}
                            </span>
                        ))}
                        {certificate.skills.length > 3 && (
                            <span className="px-3 py-1 text-[11px] font-medium rounded-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] text-[var(--color-text-tertiary)] whitespace-nowrap">
                                +{certificate.skills.length - 3} more
                            </span>
                        )}
                    </div>
                </div>

                {/* Footer / Actions */}
                <div className="pt-4 mt-auto border-t border-[var(--color-border)] flex items-center justify-between">
                    <div className="flex gap-4">
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-wider text-[var(--color-text-tertiary)] font-semibold">Issued</span>
                            <span className="text-sm font-medium text-[var(--color-text-secondary)]">{certificate.issueDate}</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-[10px] uppercase tracking-wider text-[var(--color-text-tertiary)] font-semibold">Hours</span>
                            <span className="text-sm font-medium text-[var(--color-text-secondary)]">{certificate.hours}</span>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <a 
                            href={certificate.verificationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)] transition-colors"
                        >
                            Verify
                            <ExternalLink size={14} />
                        </a>
                    </div>
                </div>
            </div>
        </motion.article>
    );
}
