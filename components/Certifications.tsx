"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { certifications, Certification } from "@/lib/data";
import CertificationCard from "./ui/CertificationCard";
import CertificateModal from "./ui/CertificateModal";

const AnimatedCounter = ({ value, label }: { value: string, label: string }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring" }}
            className="flex flex-col items-center justify-center p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm"
        >
            <span className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-2 tracking-tight">
                {value}
            </span>
            <span className="text-sm font-medium text-[var(--color-text-secondary)] uppercase tracking-wider text-center">
                {label}
            </span>
        </motion.div>
    );
};

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
            className="pt-20 pb-24 px-6 relative"
            style={{
                background: "var(--color-bg-primary)",
                borderTop: "1px solid var(--color-border)",
            }}
        >
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold section-title mb-6 tracking-tight text-[var(--color-text-primary)]">
                        Certifications
                    </h2>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto body-copy text-[var(--color-text-secondary)]">
                        Verified credentials, professional training, and specialized technical knowledge.
                    </p>
                </motion.div>

                {/* Statistics Section */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-16">
                    <AnimatedCounter value={`${totalCerts}+`} label="Certifications Earned" />
                    <AnimatedCounter value={`${uniqueOrgs}`} label="Organizations" />
                    <AnimatedCounter value={`${totalHours}+`} label="Learning Hours" />
                </div>

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
