"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";

interface OsAnnouncementPopoverProps {
  isOpen: boolean;
  onDismiss: () => void;
  anchorRef: React.RefObject<HTMLElement | null>;
}

export default function OsAnnouncementPopover({
  isOpen,
  onDismiss,
  anchorRef,
}: OsAnnouncementPopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Detect reduced-motion preference
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // Dismiss on Escape key or outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onDismiss();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        popoverRef.current &&
        !popoverRef.current.contains(target) &&
        anchorRef.current &&
        !anchorRef.current.contains(target)
      ) {
        onDismiss();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onDismiss, anchorRef]);

  const handleExploreOs = useCallback(() => {
    onDismiss();
    if (typeof window !== "undefined") {
      const host = window.location.hostname.toLowerCase();
      if (host === "localhost" || host === "127.0.0.1") {
        const port = window.location.port ? `:${window.location.port}` : "";
        window.location.href = `${window.location.protocol}//os.localhost${port}`;
      } else {
        window.location.href = "https://os.parteekgarg.in";
      }
    }
  }, [onDismiss]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={popoverRef}
          role="dialog"
          aria-modal="false"
          aria-label="Meet Parteek OS announcement"
          aria-describedby="os-popover-desc"
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 4, scale: 0.98 }}
          transition={{ duration: prefersReducedMotion ? 0.05 : 0.2, ease: "easeOut" }}
          className="absolute top-full mt-3 right-0 w-[295px] rounded-xl border p-4 sm:p-4.5 z-50 shadow-xl select-none text-left"
          style={{
            backgroundColor: "var(--color-bg-secondary)",
            borderColor: "var(--color-border)",
            boxShadow: "0 14px 34px -10px rgba(0, 0, 0, 0.45), 0 0 0 1px var(--color-border)",
          }}
        >
          {/* Subtle pointer connecting popover to the navbar button */}
          <div
            className="absolute -top-[6px] right-9 w-3 h-3 rotate-45 border-t border-l"
            style={{
              backgroundColor: "var(--color-bg-secondary)",
              borderColor: "var(--color-border)",
            }}
            aria-hidden="true"
          />

          {/* Close button */}
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Close announcement"
            className="absolute top-3 right-3 p-1 rounded-md text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer border-none bg-transparent outline-none"
          >
            <X size={14} strokeWidth={1.8} />
          </button>

          {/* Small label */}
          <div
            className="text-[10px] font-semibold tracking-[0.16em] uppercase text-[var(--color-text-secondary)] opacity-85 mb-1"
            style={{ fontFamily: "var(--font-ui)" }}
          >
            NEW EXPERIENCE
          </div>

          {/* Heading */}
          <h3
            className="text-[16px] sm:text-[17px] font-normal tracking-tight text-[var(--color-text-primary)] mb-1 leading-snug"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Meet Parteek OS
          </h3>

          {/* Description */}
          <p
            id="os-popover-desc"
            className="text-[12.5px] sm:text-[13px] leading-relaxed text-[var(--color-text-secondary)] mb-4 font-normal"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Explore my portfolio through an interactive desktop experience.
          </p>

          {/* Actions */}
          <div className="flex items-center justify-between gap-3 pt-2.5 border-t border-[var(--color-border)]/60">
            <button
              type="button"
              onClick={onDismiss}
              className="text-[11.5px] font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer bg-transparent border-none p-0 outline-none"
              style={{ fontFamily: "var(--font-ui)" }}
            >
              Maybe later
            </button>

            <button
              type="button"
              onClick={handleExploreOs}
              className="inline-flex items-center gap-1.5 h-8 px-3 rounded-md text-[11px] font-medium tracking-[0.08em] uppercase transition-opacity cursor-pointer bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] hover:opacity-90 active:scale-[0.98] border-none"
              style={{ fontFamily: "var(--font-ui)" }}
            >
              <span>Explore OS</span>
              <ArrowUpRight size={13} strokeWidth={2} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
