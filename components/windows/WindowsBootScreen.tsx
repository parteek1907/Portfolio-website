"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WindowsBootScreenProps {
  onComplete: () => void;
  durationMs?: number;
}

export default function WindowsBootScreen({
  onComplete,
  durationMs = 5500,
}: WindowsBootScreenProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 600); // Wait for fade out animation
    }, durationMs);

    return () => clearTimeout(timer);
  }, [durationMs, onComplete]);

  const handleFullscreenRequest = () => {
    if (typeof document !== "undefined") {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="windows-boot"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999999] bg-[#000000] flex flex-col items-center justify-between py-16 px-6 select-none overflow-hidden"
          style={{ cursor: "default" }}
        >
          {/* Top Spacer */}
          <div className="h-6" />

          {/* Center: Windows 11 Logo & Authentic Orbiting Ring Spinner */}
          <div className="flex flex-col items-center justify-center">
            {/* Windows 11 4-Square Blue Logo */}
            <div className="grid grid-cols-2 gap-[5px] w-16 h-16 mb-16 drop-shadow-[0_0_20px_rgba(0,120,212,0.3)]">
              <div className="bg-[#0078D4] rounded-[1.5px] w-full h-full" />
              <div className="bg-[#0078D4] rounded-[1.5px] w-full h-full" />
              <div className="bg-[#0078D4] rounded-[1.5px] w-full h-full" />
              <div className="bg-[#0078D4] rounded-[1.5px] w-full h-full" />
            </div>

            {/* Authentic Windows 11 Orbiting Ring Loader */}
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
          </div>

          {/* Bottom Minimal Hint */}
          <div className="flex flex-col items-center">
            <button
              onClick={handleFullscreenRequest}
              className="text-[13px] text-neutral-400 hover:text-neutral-200 transition-colors tracking-wide font-normal cursor-pointer bg-transparent border-none outline-none py-1.5 px-4 rounded hover:bg-white/5"
              title="Click or press F11 for full screen mode"
            >
              Click F11 for better experience
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
                opacity: 1;
              }
              100% {
                transform: rotate(360deg);
                opacity: 0;
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
