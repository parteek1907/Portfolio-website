"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2, Check, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Certification } from "@/lib/data";
import dynamic from "next/dynamic";

const PDFViewer = dynamic(() => import("./PDFViewer"), { ssr: false });

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
                                            {/* Exact Desktop Layout */}
                                            <div className="hidden md:block relative w-full h-full">
                                                {/* Invisible structural SVG to force container aspect ratio */}
                                                <svg 
                                                    width={Math.round((certificate.aspectRatio || 1.414) * 1000)}
                                                    height={1000}
                                                    viewBox={`0 0 ${Math.round((certificate.aspectRatio || 1.414) * 1000)} 1000`} 
                                                    className="w-auto h-auto max-w-full max-h-full pointer-events-none opacity-0"
                                                />
                                                <div className="absolute inset-0 w-[101%] h-[101%] -top-[0.5%] -left-[0.5%]">
                                                    <iframe 
                                                        src={`${certificate.fullCertificate}#view=Fit&toolbar=0&navpanes=0`}
                                                        className="w-full h-full border-0 pointer-events-none"
                                                        title={`${certificate.title} Certificate`}
                                                        tabIndex={-1}
                                                    />
                                                </div>
                                            </div>
                                            <div className="block md:hidden bg-transparent flex items-center justify-center">
                                                <PDFViewer 
                                                    file={certificate.fullCertificate} 
                                                    loading={<div className="w-full h-full bg-transparent" />}
                                                    className="w-full flex justify-center"
                                                    width={typeof window !== 'undefined' ? window.innerWidth - 80 : 300} 
                                                />
                                            </div>
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

                                <div className="flex-1 mt-4 lg:mt-0">
                                    {certificate.issuerLogo && (
                                        <div className="w-12 h-12 relative mb-6 rounded-xl overflow-hidden shadow-sm border border-[var(--color-border)] bg-[var(--color-surface)]">
                                            <Image src={certificate.issuerLogo} alt={certificate.issuer} fill className="object-cover" />
                                        </div>
                                    )}
                                    <h2 className="text-2xl font-semibold mb-2 text-[var(--color-text-primary)] leading-tight tracking-tight">{certificate.title}</h2>
                                    <p className="text-[var(--color-text-secondary)] mb-8">{certificate.issuer}</p>
                                    
                                    <div className="flex flex-col gap-8">
                                        <div className="flex flex-col gap-1">
                                            <p className="text-[var(--color-text-primary)] text-[15px]">
                                                Issued {certificate.issueDate} <span className="opacity-40 mx-1">&bull;</span> {certificate.hours} Hours
                                            </p>
                                        </div>

                                        <div className="flex flex-col gap-2 group cursor-pointer w-fit" onClick={handleCopy}>
                                            <span className="text-xs uppercase tracking-widest text-[var(--color-text-secondary)] flex items-center gap-2">
                                                Credential ID {copied && <span className="text-emerald-500 normal-case tracking-normal text-[11px]">(Copied)</span>}
                                            </span>
                                            <span className="font-mono text-[14px] text-[var(--color-text-primary)] break-all group-hover:opacity-70 transition-opacity">
                                                {certificate.credentialId}
                                            </span>
                                        </div>

                                        {certificate.skills.length > 0 && (
                                            <div className="flex flex-col gap-2">
                                                <span className="text-xs uppercase tracking-widest text-[var(--color-text-secondary)]">Skills</span>
                                                <p className="text-[14px] text-[var(--color-text-primary)] leading-relaxed">
                                                    {certificate.skills.join(" • ")}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-5 mt-12 pt-8 border-t border-[var(--color-border)]">
                                    <a
                                        href={certificate.verificationUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative flex items-center gap-2 w-fit text-[15px] font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                                    >
                                        Verify Credential
                                        <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-current transition-all duration-300 group-hover:w-full opacity-40"></span>
                                    </a>
                                    <a
                                        href={certificate.downloadUrl}
                                        download={`${certificate.title.replace(/\s+/g, "_")}.pdf`}
                                        className="group relative flex items-center gap-2 w-fit text-[15px] font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                                    >
                                        Download PDF
                                        <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-current transition-all duration-300 group-hover:w-full opacity-40"></span>
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
                        
                        <motion.button 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setIsFullScreen(false)}
                            className="absolute top-6 right-6 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                        >
                            <X size={24} />
                        </motion.button>

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
                                        {/* Exact Desktop Layout */}
                                        <div className="hidden md:block relative w-full h-full">
                                            {/* Invisible structural SVG to force container aspect ratio */}
                                            <svg 
                                                width={Math.round((certificate.aspectRatio || 1.414) * 1000)}
                                                height={1000}
                                                viewBox={`0 0 ${Math.round((certificate.aspectRatio || 1.414) * 1000)} 1000`} 
                                                className="w-auto h-auto max-w-full max-h-[90vh] pointer-events-none opacity-0"
                                            />
                                            <div className="absolute inset-0 w-[101%] h-[101%] -top-[0.5%] -left-[0.5%]">
                                                <iframe 
                                                    src={`${certificate.fullCertificate}#view=FitH&toolbar=0&navpanes=0`}
                                                    className="w-full h-full border-0"
                                                    title={`${certificate.title} Certificate Fullscreen`}
                                                />
                                            </div>
                                        </div>
                                        <div className="block md:hidden bg-transparent flex items-center justify-center">
                                            <PDFViewer 
                                                file={certificate.fullCertificate} 
                                                loading={<div className="w-full h-full bg-transparent" />}
                                                className="w-full flex justify-center"
                                                width={typeof window !== 'undefined' ? window.innerWidth - 32 : 350} 
                                            />
                                        </div>
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
