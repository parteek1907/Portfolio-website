"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { certifications, Certification } from "@/lib/data";
import CertificationCard from "./ui/CertificationCard";
import CertificateModal from "./ui/CertificateModal";


export default function Certifications() {
    const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

    // Calculate dynamic stats
    const totalCerts = certifications.length;
    const uniqueOrgs = new Set(certifications.map(c => c.issuer)).size;
    const totalHours = certifications.reduce((acc, cert) => {
        const parsed = parseInt(cert.hours.replace(/[^0-9]/g, ''));
        return acc + (isNaN(parsed) ? 0 : parsed);
    }, 0);

    return (
        <section
            id="certifications"
            className="pt-20 pb-24 px-6 relative scroll-mt-24"
            style={{
                background: "var(--color-bg-primary)",
                borderTop: "1px solid var(--color-border)",
            }}
        >
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 md:mb-16"
                >
                    <div className="flex flex-col lg:flex-row lg:items-end gap-12 lg:gap-20">
                        <div className="flex flex-col gap-4 flex-1">
                            <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-2" style={{ color: "var(--color-text-primary)" }}>
                                Certifications
                            </h2>
                            <p className="text-lg md:text-xl leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                                Verified credentials, professional training, and specialized technical knowledge.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-x-8 gap-y-6 md:gap-12 lg:gap-16 lg:pb-1">
                            <div className="flex flex-col">
                                <span className="text-3xl font-medium text-[var(--color-text-primary)]">{totalCerts}</span>
                                <span className="text-xs uppercase tracking-widest text-[var(--color-text-secondary)] mt-1">Certifications</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-3xl font-medium text-[var(--color-text-primary)]">{uniqueOrgs}</span>
                                <span className="text-xs uppercase tracking-widest text-[var(--color-text-secondary)] mt-1">Organizations</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-3xl font-medium text-[var(--color-text-primary)]">{totalHours}+</span>
                                <span className="text-xs uppercase tracking-widest text-[var(--color-text-secondary)] mt-1">Hours</span>
                            </div>
                        </div>
                    </div>
                </motion.div>



                {/* Certifications Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                    {certifications.map((cert, index) => (
                        <CertificationCard 
                            key={cert.id} 
                            certificate={cert} 
                            index={index} 
                            onViewClick={() => setSelectedCert(cert)}
                        />
                    ))}
                </div>
            </div>

            {/* Modal */}
            <CertificateModal 
                certificate={selectedCert}
                isOpen={!!selectedCert}
                onClose={() => setSelectedCert(null)}
            />
        </section>
    );
}
