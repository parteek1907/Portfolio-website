"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { certifications } from "@/lib/data";

function CertificationLogo({ issuer, logo }: { issuer: string; logo?: string }) {
    const [imgError, setImgError] = useState(false);

    if (!logo || imgError) {
        return (
            <div
                className="w-12 h-12 rounded-[10px] flex items-center justify-center overflow-hidden shrink-0"
                style={{ background: "transparent", padding: 0 }}
                aria-hidden
            >
                <div className="w-12 h-12 rounded-[10px] flex items-center justify-center" style={{ background: "var(--color-bg-tertiary)", color: "var(--color-text-secondary)", fontSize: "18px", fontWeight: 600 }}>
                    {issuer.charAt(0).toUpperCase()}
                </div>
            </div>
        );
    }

    return (
        <div
            className="w-12 h-12 rounded-[10px] flex items-center justify-center overflow-hidden shrink-0"
            style={{ background: "transparent", padding: 0 }}
        >
            <img
                src={logo}
                alt={`${issuer} logo`}
                width={48}
                height={48}
                className="w-12 h-12 object-contain rounded-[10px]"
                onError={() => setImgError(true)}
            />
        </div>
    );
}

export default function Certifications() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const checkTheme = () => {
            setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
        };
        checkTheme();
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="certifications"
            className="pt-10 pb-10 px-6"
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
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl section-title mb-4">Certifications</h2>
                    <p className="body-copy text-muted" style={{ color: "var(--color-text-secondary)" }}>
                        Verified credentials and completed courses.
                    </p>
                </motion.div>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5 items-stretch">
                    {certifications.map((cert, index) => (
                        <motion.article
                            key={`${cert.name}-${index}`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.35, delay: index * 0.08 }}
                            className="cert-card rounded-2xl p-5 w-full relative"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                minHeight: "220px",
                                background: "var(--color-surface)",
                                border: "1px solid var(--color-border)",
                            }}
                        >
                            <div className="cert-content" style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
                                {/* Logo + Verify row — fixed height */}
                                <div className="cert-top-row" style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "flex-start",
                                    justifyContent: "space-between",
                                    flexWrap: "nowrap",
                                    gap: "8px",
                                    height: "48px",
                                    marginBottom: "14px",
                                }}>
                                    <CertificationLogo issuer={cert.issuer} logo={cert.logo} />
                                    <a
                                        href={cert.verifyUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="transition-colors"
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "4px",
                                            whiteSpace: "nowrap",
                                            flexShrink: 0,
                                            fontSize: "11px",
                                            padding: "3px 10px",
                                            borderRadius: "999px",
                                            border: "0.5px solid var(--color-border-strong)",
                                            color: "var(--color-text-secondary)",
                                            textDecoration: "none",
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.color = "var(--color-text-primary)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.color = "var(--color-text-secondary)";
                                        }}
                                    >
                                        Verify <ExternalLink size={12} strokeWidth={2.2} />
                                    </a>
                                </div>

                                {/* Title — fixed 2-line height so all cards align below */}
                                <h3 className="cert-name project-title" style={{
                                    color: "var(--color-text-primary)",
                                    fontSize: "15px",
                                    lineHeight: "1.3",
                                    fontWeight: 600,
                                    marginTop: "0px",
                                    marginBottom: "4px",
                                    height: "40px",
                                    overflow: "hidden",
                                    display: "-webkit-box",
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                }}>
                                    {cert.name}
                                </h3>

                                {/* Issuer — fixed 1-line height */}
                                <p className="body-copy" style={{
                                    color: "var(--color-text-secondary)",
                                    fontSize: "12px",
                                    marginTop: 0,
                                    marginBottom: 0,
                                    height: "24px",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    display: "flex",
                                    alignItems: "center",
                                }}>
                                    {cert.issuer}
                                </p>

                                {/* Credential ID — fixed 1-line height */}
                                <p
                                    className="cert-credential-id"
                                    style={{
                                        display: "block",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        maxWidth: "100%",
                                        fontSize: "10px",
                                        fontFamily: "var(--font-mono)",
                                        color: "var(--color-text-secondary)",
                                        marginTop: "4px",
                                        marginBottom: "12px",
                                        height: "14px",
                                    }}
                                    title={`ID · ${cert.credentialId}`}
                                >
                                    ID · {cert.credentialId}
                                </p>

                                {/* Skills — fixed 1-line height */}
                                <div
                                    className="cert-skills"
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        flexWrap: "wrap",
                                        gap: "6px",
                                        marginBottom: "14px",
                                        alignItems: "center",
                                    }}
                                >
                                    {cert.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="cert-skill-pill"
                                            style={{
                                                whiteSpace: "nowrap",
                                                fontSize: "10px",
                                                padding: "4px 10px",
                                                borderRadius: "999px",
                                                border: isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.08)",
                                                color: "var(--color-text-secondary)",
                                                background: isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.02)",
                                                transition: "all 0.2s ease",
                                            }}
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div
                                className="cert-footer"
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    flexWrap: "nowrap",
                                    gap: "8px",
                                    paddingTop: "12px",
                                    borderTop: "0.5px solid var(--color-border)",
                                    marginTop: "auto",
                                }}
                            >
                                <span className="cert-date body-copy" style={{ whiteSpace: "nowrap", fontSize: "12px", color: "var(--color-text-secondary)", flexShrink: 0 }}>
                                    Issued {cert.issuedDate}
                                </span>
                                <span
                                    className="cert-status-badge"
                                    style={
                                        cert.status === "completed"
                                            ? {
                                                whiteSpace: "nowrap",
                                                flexShrink: 0,
                                                fontSize: "11px",
                                                padding: "3px 10px",
                                                borderRadius: "999px",
                                                background: "rgba(34,197,94,0.12)",
                                                color: isDark ? "#4ade80" : "#16a34a",
                                            }
                                            : {
                                                whiteSpace: "nowrap",
                                                flexShrink: 0,
                                                fontSize: "11px",
                                                padding: "3px 10px",
                                                borderRadius: "999px",
                                                background: "rgba(234,179,8,0.12)",
                                                color: isDark ? "#fbbf24" : "#a16207",
                                            }
                                    }
                                >
                                    {cert.status === "completed" ? "Completed" : "In progress"}
                                </span>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
