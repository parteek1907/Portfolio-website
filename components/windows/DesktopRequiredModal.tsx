"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, X, ArrowLeft } from "lucide-react";
import { useWindows, isOsHost } from "./WindowsContext";

export default function DesktopRequiredModal() {
  const { isDesktopRequiredModalOpen, closeDesktopRequiredModal } = useWindows();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check reduced motion preference
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // Dismiss on Escape key
  useEffect(() => {
    if (!isDesktopRequiredModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeDesktopRequiredModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDesktopRequiredModalOpen, closeDesktopRequiredModal]);

  // Lock background scroll while modal is visible
  useEffect(() => {
    if (!isDesktopRequiredModalOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow || "";
    };
  }, [isDesktopRequiredModalOpen]);

  const handleReturnToPortfolio = useCallback(() => {
    closeDesktopRequiredModal();
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname.toLowerCase();
      if (isOsHost(hostname)) {
        const rootHost = window.location.host.replace(/^os\./i, "").replace(/^os-/i, "");
        window.location.href = window.location.protocol + "//" + (rootHost || "parteekgarg.in");
      }
    }
  }, [closeDesktopRequiredModal]);

  return (
    <AnimatePresence>
      {isDesktopRequiredModalOpen && (
        <div
          data-lenis-prevent
          role="dialog"
          aria-modal="true"
          aria-labelledby="desktop-required-title"
          aria-describedby="desktop-required-desc"
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.05 : 0.18, ease: "easeOut" }}
            onClick={closeDesktopRequiredModal}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Card */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: prefersReducedMotion ? 0.05 : 0.18, ease: "easeOut" }}
            className="relative w-full max-w-[390px] rounded-2xl border p-6 sm:p-7 z-10"
            style={{
              backgroundColor: "var(--color-bg-secondary)",
              borderColor: "var(--color-border)",
              boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.5)",
            }}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={closeDesktopRequiredModal}
              aria-label="Close dialog"
              className="absolute top-4 right-4 p-1.5 rounded-md text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer border-none bg-transparent outline-none"
            >
              <X size={16} strokeWidth={1.8} />
            </button>

            {/* Small tasteful monochrome desktop icon */}
            <div className="text-[var(--color-text-secondary)] mb-4">
              <Monitor size={20} strokeWidth={1.5} />
            </div>

            {/* Heading */}
            <h2
              id="desktop-required-title"
              className="text-xl sm:text-[22px] font-normal tracking-tight text-[var(--color-text-primary)] mb-2.5 leading-snug"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Best experienced on desktop
            </h2>

            {/* Explanatory Paragraph */}
            <p
              id="desktop-required-desc"
              className="text-[13.5px] sm:text-[14px] leading-relaxed text-[var(--color-text-secondary)] mb-6 font-normal"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Parteek OS is an interactive desktop experience designed for larger screens. Open this portfolio on a laptop or desktop to explore it.
            </p>

            {/* Action */}
            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={handleReturnToPortfolio}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-10 px-5 rounded-lg text-xs font-medium tracking-[0.1em] uppercase transition-opacity cursor-pointer bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] hover:opacity-90 active:scale-[0.99] border-none"
                style={{ fontFamily: "var(--font-ui)" }}
              >
                <ArrowLeft size={13} strokeWidth={1.8} />
                <span>Return to portfolio</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
