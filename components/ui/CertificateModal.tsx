"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Download, Maximize2, Copy, Check } from "lucide-react";
import Image from "next/image";
import { Certification } from "@/lib/data";

interface CertificateModalProps {
    certificate: Certification | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function CertificateModal({ certificate, isOpen, onClose }: CertificateModalProps) {
    const [copied, setCopied] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleCopy = () => {
        if (!certificate) return;
        navigator.clipboard.writeText(certificate.credentialId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === "Escape") {
                    if (isFullScreen) {
                        setIsFullScreen(false);
                    } else {
                        onClose();
                    }
                }
            };
            window.addEventListener("keydown", handleKeyDown);
            return () => {
                document.body.style.overflow = "unset";
                window.removeEventListener("keydown", handleKeyDown);
            };
        } else {
            setIsFullScreen(false);
        }
    }, [isOpen, onClose, isFullScreen]);

    if (!certificate) return null;

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onClose}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-6xl max-h-[90vh] bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row z-10"
                        >
                            {/* Left: Certificate Viewer */}
                            <div 
                                className="relative flex-1 bg-[var(--color-bg-tertiary)] overflow-hidden min-h-[40vh] lg:min-h-0 flex items-center justify-center group p-6 cursor-pointer border-b lg:border-b-0 lg:border-r border-[var(--color-border)]"
                                onClick={() => setIsFullScreen(true)}
                                ref={containerRef}
                            >
                                <div className="relative inline-flex rounded-2xl overflow-hidden shadow-xl border border-[var(--color-border)] bg-[var(--color-surface)] max-w-full max-h-full">
                                    <div className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md z-20">
                                        <Maximize2 size={16} />
                                    </div>
                                    {certificate.fullCertificate.endsWith('.pdf') ? (
                                        <>
                                            <svg 
                                                width={Math.round((certificate.aspectRatio || 1.414) * 1000)}
                                                height={1000}
                                                viewBox={`0 0 ${Math.round((certificate.aspectRatio || 1.414) * 1000)} 1000`} 
                                                className="w-auto h-auto max-w-full max-h-full min-h-[40vh] lg:min-h-[60vh] pointer-events-none opacity-0"
                                            />
                                            <iframe 
                                                src={`${certificate.fullCertificate}#view=Fit&toolbar=0&navpanes=0`}
                                                className="absolute inset-0 w-[101%] h-[101%] -top-[0.5%] -left-[0.5%] border-0 pointer-events-none"
                                                title={`${certificate.title} Certificate`}
                                                tabIndex={-1}
                                            />
                                        </>
                                    ) : (
                                        <Image
                                            src={certificate.fullCertificate}
                                            alt={`${certificate.title} Certificate`}
                                            width={1920}
                                            height={1080}
                                            className="w-auto h-auto max-h-full object-contain pointer-events-none rounded-2xl"
                                            priority
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Right: Details & Actions */}
                            <div className="w-full lg:w-[400px] flex flex-col p-6 lg:p-8 overflow-y-auto custom-scrollbar bg-[var(--color-surface)]">
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 p-2 rounded-full bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors z-20"
                                >
                                    <X size={20} />
                                </button>

                                <div className="mb-6 mt-4 lg:mt-0">
                                    {certificate.issuerLogo && (
                                        <div className="w-16 h-16 relative mb-4 rounded-2xl overflow-hidden shadow-sm border border-[var(--color-border)] bg-[var(--color-surface)]">
                                            <Image src={certificate.issuerLogo} alt={certificate.issuer} fill className="object-cover" />
                                        </div>
                                    )}
                                    <h2 className="text-2xl font-bold mb-2 text-[var(--color-text-primary)] leading-tight">{certificate.title}</h2>
                                    <p className="text-[var(--color-text-secondary)] font-medium mb-1">{certificate.issuer}</p>
                                    
                                    <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4">
                                        <p className="text-[var(--color-text-tertiary)] text-sm">Issued {certificate.issueDate}</p>
                                        <p className="text-[var(--color-text-tertiary)] text-sm">&bull; {certificate.hours} Hours</p>
                                    </div>

                                    <div className="flex items-start gap-3 p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-xs font-mono text-[var(--color-text-secondary)] mt-2 shadow-sm">
                                        <div className="flex flex-col gap-1 flex-1 min-w-0">
                                            <span className="opacity-60 uppercase tracking-wider text-[10px] font-sans">Credential ID</span>
                                            <span className="break-all">{certificate.credentialId}</span>
                                        </div>
                                        <button 
                                            onClick={handleCopy} 
                                            className="p-1.5 hover:bg-[var(--color-bg-tertiary)] border border-transparent hover:border-[var(--color-border)] rounded-md transition-all shrink-0 mt-0.5" 
                                            title="Copy ID"
                                        >
                                            {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                                        </button>
                                    </div>
                                </div>

                                <div className="mb-8 flex-1">
                                    <h3 className="text-sm font-semibold tracking-wide uppercase text-[var(--color-text-tertiary)] mb-3">Skills Covered</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {certificate.skills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="px-3 py-1.5 text-xs font-medium rounded-full bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-secondary)]"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 mt-auto">
                                    <a
                                        href={certificate.verificationUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)] font-semibold hover:bg-[var(--color-bg-tertiary)] transition-colors shadow-sm"
                                    >
                                        Verify Credential
                                        <ExternalLink size={18} />
                                    </a>
                                    <a
                                        href={certificate.downloadUrl}
                                        download={`${certificate.title.replace(/\s+/g, "_")}.pdf`}
                                        className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)] font-semibold hover:bg-[var(--color-bg-tertiary)] transition-colors shadow-sm"
                                    >
                                        <Download size={18} />
                                        Download PDF
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Fullscreen Lightbox Modal */}
            <AnimatePresence>
                {isFullScreen && certificate && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                            onClick={() => setIsFullScreen(false)}
                        />
                        
                        <button 
                            onClick={() => setIsFullScreen(false)}
                            className="absolute top-6 right-6 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <motion.div 
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ type: "spring", damping: 25 }}
                            className="relative flex items-center justify-center w-full h-[90vh] max-w-7xl"
                        >
                            <div className="relative inline-flex rounded-2xl overflow-hidden shadow-2xl bg-[var(--color-surface)] max-w-full max-h-[90vh]">
                                {certificate.fullCertificate.endsWith('.pdf') ? (
                                    <>
                                        <svg 
                                            width={Math.round((certificate.aspectRatio || 1.414) * 1000)}
                                            height={1000}
                                            viewBox={`0 0 ${Math.round((certificate.aspectRatio || 1.414) * 1000)} 1000`} 
                                            className="w-auto h-auto max-w-full max-h-[90vh] pointer-events-none opacity-0"
                                        />
                                        <iframe 
                                            src={`${certificate.fullCertificate}#view=Fit&toolbar=0&navpanes=0`}
                                            className="absolute inset-0 w-[101%] h-[101%] -top-[0.5%] -left-[0.5%] border-0"
                                            title={`${certificate.title} Certificate Fullscreen`}
                                        />
                                    </>
                                ) : (
                                    <Image
                                        src={certificate.fullCertificate}
                                        alt={`${certificate.title} Certificate Fullscreen`}
                                        width={1920}
                                        height={1080}
                                        className="w-auto h-auto max-w-full max-h-[90vh] rounded-2xl shadow-2xl object-contain"
                                    />
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
