"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, X, ArrowLeft } from "lucide-react";
import { useWindows } from "./WindowsContext";

export default function DesktopRequiredModal() {
  const { isDesktopRequiredModalOpen, closeDesktopRequiredModal } = useWindows();

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

  return (
    <AnimatePresence>
      {isDesktopRequiredModalOpen && (
        <div
          data-lenis-prevent
          role="dialog"
          aria-modal="true"
          aria-labelledby="desktop-required-title"
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            onClick={closeDesktopRequiredModal}
            className="absolute inset-0 bg-black/75 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[440px] rounded-2xl md:rounded-3xl border border-[var(--color-border)] p-6 sm:p-8 shadow-2xl overflow-hidden z-10"
            style={{
              backgroundColor: "var(--color-bg-secondary)",
              boxShadow: "0 24px 60px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px var(--color-border)",
            }}
          >
            {/* Subtle top ambient glow */}
            <div
              className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-24 rounded-full blur-3xl pointer-events-none opacity-30"
              style={{ background: "radial-gradient(circle, var(--color-text-secondary) 0%, transparent 70%)" }}
            />

            {/* Close Button */}
            <button
              type="button"
              onClick={closeDesktopRequiredModal}
              aria-label="Close dialog"
              className="absolute top-4 right-4 p-2 rounded-full text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-white/5 transition-all duration-200 cursor-pointer border-none outline-none"
            >
              <X size={18} />
            </button>

            {/* Header: Subtle Monitor Icon + Eyebrow */}
            <div className="flex items-center gap-3.5 mb-5">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border border-[var(--color-border)] bg-[var(--color-bg-tertiary)]"
                style={{
                  boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.06)",
                }}
              >
                <Monitor size={20} strokeWidth={1.8} className="text-[var(--color-text-primary)] opacity-90" />
              </div>
              <div className="flex flex-col">
                <span
                  className="text-[10px] tracking-[0.22em] uppercase font-semibold text-[var(--color-text-secondary)]"
                  style={{ fontFamily: "var(--font-ui)" }}
                >
                  Parteek OS &bull; System Notice
                </span>
                <span className="text-xs text-[var(--color-text-tertiary)] font-mono">
                  Display Optimization
                </span>
              </div>
            </div>

            {/* Title */}
            <h3
              id="desktop-required-title"
              className="text-2xl font-medium tracking-tight text-[var(--color-text-primary)] mb-3 leading-snug"
              style={{ fontFamily: "var(--font-ui)" }}
            >
              Desktop Experience Required
            </h3>

            {/* Description */}
            <p className="text-[14px] leading-relaxed text-[var(--color-text-secondary)] mb-6 sm:mb-7 font-normal">
              Parteek OS is designed for desktop and laptop screens to deliver the best interactive experience. Please visit this portfolio on a larger screen to explore Windows Mode.
            </p>

            {/* Feature Note Pill */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] mb-7 text-xs text-[var(--color-text-secondary)] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              <span>Full Portfolio Active &bull; Best on 1024px+</span>
            </div>

            {/* Two Actions */}
            <div className="flex flex-col-reverse sm:flex-row gap-2.5">
              <button
                type="button"
                onClick={closeDesktopRequiredModal}
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-medium tracking-wide uppercase transition-all duration-200 cursor-pointer border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-strong)] hover:bg-white/[0.03] active:scale-[0.98]"
                style={{ fontFamily: "var(--font-ui)" }}
              >
                Got It
              </button>
              <button
                type="button"
                onClick={closeDesktopRequiredModal}
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all duration-200 cursor-pointer bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] hover:opacity-90 active:scale-[0.98]"
                style={{ fontFamily: "var(--font-ui)" }}
              >
                <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
                Return to Portfolio
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
