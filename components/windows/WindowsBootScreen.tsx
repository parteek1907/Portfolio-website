"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWindows } from "./WindowsContext";

interface WindowsBootScreenProps {
  onComplete: () => void;
  durationMs?: number;
}

export default function WindowsBootScreen({
  onComplete,
  durationMs = 5000,
}: WindowsBootScreenProps) {
  const { env } = useWindows();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, env.prefersReducedMotion ? 100 : 500);
    }, durationMs);

    return () => clearTimeout(timer);
  }, [durationMs, onComplete, env.prefersReducedMotion]);

  const handleFullscreenRequest = () => {
    if (typeof document !== "undefined") {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    }
  };

  const hintText = env.isTouch
    ? "Tap for full screen experience"
    : env.platform === "macOS"
    ? "Press ⌃⌘F or click for full screen"
    : "Click F11 for better experience";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="windows-boot"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: env.prefersReducedMotion ? 0.1 : 0.5,
            ease: "easeInOut",
          }}
          className="fixed inset-0 z-[9999999] bg-[#000000] flex flex-col items-center justify-between py-16 px-6 select-none overflow-hidden"
          style={{ 
            cursor: "default",
            fontFamily: "'Segoe UI Custom', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" 
          }}
        >
          {/* Top Spacer */}
          <div className="h-6" />

          {/* Center: Windows 11 Logo & Orbiting Loader */}
          <div className="flex flex-col items-center justify-center">
            {/* Windows 11 4-Square Blue Logo */}
            <div className="grid grid-cols-2 gap-[5px] w-16 h-16 mb-16 drop-shadow-[0_0_20px_rgba(0,120,212,0.3)]">
              <div className="bg-[#0078D4] rounded-[1.5px] w-full h-full" />
              <div className="bg-[#0078D4] rounded-[1.5px] w-full h-full" />
              <div className="bg-[#0078D4] rounded-[1.5px] w-full h-full" />
              <div className="bg-[#0078D4] rounded-[1.5px] w-full h-full" />
            </div>

            {/* Orbiting Ring or Static Indicator if Reduced Motion is preferred */}
            {!env.prefersReducedMotion ? (
              <div className="relative w-12 h-12 mb-8">
                {[0, 1, 2, 3, 4, 5].map((idx) => (
                  <div
                    key={idx}
                    className="absolute inset-0 flex items-start justify-center"
                    style={{
                      animation: `winOrbit 3.4s infinite cubic-bezier(0.5, 0.1, 0.15, 1)`,
                      animationDelay: `${idx * 0.18}s`,
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.9)]" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-xs text-neutral-400 mb-8 tracking-wider uppercase font-medium">
                Starting Parteek OS...
              </div>
            )}
          </div>

          {/* Bottom Adaptive Hint */}
          <div className="flex flex-col items-center">
            <button
              onClick={handleFullscreenRequest}
              className="text-[13px] text-neutral-400 hover:text-neutral-200 transition-colors tracking-wide font-normal cursor-pointer bg-transparent border-none outline-none py-1.5 px-4 rounded hover:bg-white/5"
              title="Click or press shortcut for full screen mode"
            >
              {hintText}
            </button>
          </div>

          {/* Injected CSS keyframe animation for the authentic Windows 11 orbit */}
          <style jsx>{`
            @keyframes winOrbit {
              0% {
                transform: rotate(0deg);
                opacity: 0;
              }
              6% {
                opacity: 1;
              }
              50% {
                transform: rotate(220deg);
              }
              90% {
                transform: rotate(440deg);
                opacity: 1;
              }
              100% {
                transform: rotate(540deg);
                opacity: 0;
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
