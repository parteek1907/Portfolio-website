"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { VscChromeMinimize, VscChromeMaximize, VscChromeClose } from "react-icons/vsc";
import { useWindows } from "./WindowsContext";
import { AppId } from "./types";
import styles from "./styles/DraggableWindow.module.css";

interface DraggableWindowProps {
  id: AppId;
  children: React.ReactNode;
}

export default function DraggableWindow({ id, children }: DraggableWindowProps) {
  const {
    windows,
    activeAppId,
    bringToFront,
    closeApp,
    minimizeApp,
    maximizeApp,
    restoreApp,
    updatePosition,
  } = useWindows();

  const win = windows[id];
  const isFocused = activeAppId === id;
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dragStartRef = useRef<{ mouseX: number; mouseY: number; startX: number; startY: number } | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const isEffectiveMaximized = win?.isMaximized || isMobile;

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 || isEffectiveMaximized) return;
    bringToFront(id);
    setIsDragging(true);
    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      startX: win.position.x,
      startY: win.position.y,
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !dragStartRef.current || isEffectiveMaximized) return;
    const dx = e.clientX - dragStartRef.current.mouseX;
    const dy = e.clientY - dragStartRef.current.mouseY;

    const maxX = typeof window !== "undefined" ? window.innerWidth - 120 : 1000;
    const maxY = typeof window !== "undefined" ? window.innerHeight - 80 : 700;

    const newX = Math.max(-win.size.width + 120, Math.min(maxX, dragStartRef.current.startX + dx));
    const newY = Math.max(0, Math.min(maxY, dragStartRef.current.startY + dy));

    updatePosition(id, { x: newX, y: newY });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    dragStartRef.current = null;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  if (!win || !win.isOpen) return null;

  return (
    <AnimatePresence>
      {!win.isMinimized && (
        <motion.div
          key={`window-${id}`}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
          onPointerDown={() => bringToFront(id)}
          style={{
            zIndex: win.zIndex,
            position: "absolute",
            left: isEffectiveMaximized ? 0 : win.position.x,
            top: isEffectiveMaximized ? 0 : win.position.y,
            width: isEffectiveMaximized ? "100%" : `${win.size.width}px`,
            height: isEffectiveMaximized ? "calc(100% - 50px)" : `${win.size.height}px`,
            maxWidth: isEffectiveMaximized ? "100%" : "calc(100vw - 20px)",
            maxHeight: isEffectiveMaximized ? "calc(100% - 50px)" : "calc(100vh - 70px)",
          }}
          className={`${styles.container} ${isEffectiveMaximized ? styles.maximized : ""} ${
            !isDragging ? styles.animatedWindow : ""
          }`}
        >
          <div className={styles.main}>
            {/* Window Navigation / Title Bar */}
            <nav>
              <section
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onDoubleClick={() => !isMobile && (win.isMaximized ? restoreApp(id) : maximizeApp(id))}
                className={styles.top}
                style={{ cursor: isEffectiveMaximized ? "default" : "grab" }}
              >
                {/* Left: Window Icon & Title */}
                <div className={styles.topContainer}>
                  <Image
                    src={win.iconPath}
                    alt={win.title}
                    width={18}
                    height={18}
                    unoptimized
                    draggable={false}
                  />
                  <p>{win.title}</p>
                </div>

                {/* Right: Window Controls */}
                <div
                  className={styles.iconContainer}
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  <div
                    className={styles.icon}
                    onClick={() => minimizeApp(id)}
                    title="Minimize"
                    aria-label="Minimize"
                  >
                    <VscChromeMinimize />
                  </div>
                  {!isMobile && (
                    <div
                      className={styles.icon}
                      onClick={() => (win.isMaximized ? restoreApp(id) : maximizeApp(id))}
                      title={win.isMaximized ? "Restore Down" : "Maximize"}
                      aria-label="Maximize or Restore"
                    >
                      <VscChromeMaximize />
                    </div>
                  )}
                  <div
                    className={styles.iconClose}
                    onClick={() => closeApp(id)}
                    title="Close"
                    aria-label="Close"
                  >
                    <VscChromeClose />
                  </div>
                </div>
              </section>
            </nav>

            {/* Window Content */}
            <div className={styles.contentWrapper}>
              {children}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
