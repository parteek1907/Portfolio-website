"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  IoWifi, 
  IoBluetooth, 
  IoAirplane, 
  IoLeafOutline, 
  IoMoonOutline, 
  IoSunnyOutline, 
  IoVolumeHigh, 
  IoVolumeMute 
} from "react-icons/io5";
import { BsSun } from "react-icons/bs";
import { SystemEnvironment } from "./useSystemEnvironment";
import styles from "./styles/QuickSettings.module.css";

interface WindowsQuickSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  env: SystemEnvironment;
  brightness: number;
  setBrightness: React.Dispatch<React.SetStateAction<number>>;
  isBatterySaver: boolean;
  onToggleBatterySaver: () => void;
  isNightLight: boolean;
  onToggleNightLight: () => void;
  windowsTheme: "dark" | "light";
  onToggleTheme: () => void;
}

function BatteryFooterIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="7" width="16" height="10" rx="2" ry="2" />
      <line x1="20" y1="11" x2="20" y2="13" />
      <path d="M10 9l-2 3.5h3L9 15" strokeWidth="1.8" />
    </svg>
  );
}

export default function WindowsQuickSettings({
  isOpen,
  onClose,
  env,
  brightness,
  setBrightness,
  isBatterySaver,
  onToggleBatterySaver,
  isNightLight,
  onToggleNightLight,
  windowsTheme,
  onToggleTheme,
}: WindowsQuickSettingsProps) {
  const flyoutRef = useRef<HTMLDivElement>(null);

  // Quick Action Toggles (matching Image 1)
  const [wifiManualOverride, setWifiManualOverride] = useState<boolean | null>(null);
  const [isBluetoothOn, setIsBluetoothOn] = useState(false);
  const [isFlightMode, setIsFlightMode] = useState(false);

  const handleCycleBrightness = () => {
    setBrightness((prev) => {
      if (prev > 75) return 50;
      if (prev > 35) return 20;
      return 100;
    });
  };

  const isWifiOn = isFlightMode ? false : wifiManualOverride !== null ? wifiManualOverride : env.network.isOnline;

  // Handle flight mode toggle
  const handleToggleFlightMode = () => {
    setIsFlightMode((prev) => {
      const next = !prev;
      if (next) {
        setWifiManualOverride(false);
        setIsBluetoothOn(false);
      } else {
        setWifiManualOverride(null);
      }
      return next;
    });
  };

  const handleToggleWifi = () => {
    setWifiManualOverride(!isWifiOn);
  };

  // Close when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        flyoutRef.current &&
        !flyoutRef.current.contains(target) &&
        !target.closest("[data-tray-cluster='true']")
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen, onClose]);

  const isDark = windowsTheme === "dark";
  const accentColor = isDark ? "#4cc2ff" : "#0067c0";
  const trackBg = isDark ? "#383838" : "#d0d0d0";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={flyoutRef}
          initial={{ opacity: 0, y: 15, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.96 }}
          transition={{
            duration: env.prefersReducedMotion ? 0.05 : 0.18,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={styles.flyout}
          data-win-theme={windowsTheme}
          data-lenis-prevent="true"
        >
          {/* Quick Action Tiles (Exact 2x3 Grid from Image 1) */}
          <div className={styles.tilesGrid}>
            {/* 1. WiFi */}
            <div className={styles.tileCol}>
              <button
                type="button"
                onClick={handleToggleWifi}
                className={`${styles.tileBtn} ${isWifiOn ? styles.tileBtnActive : ""}`}
                title={`WiFi: ${isWifiOn ? "On" : "Off"}`}
                aria-label="WiFi"
              >
                <IoWifi size={20} />
              </button>
              <span className={styles.tileText}>WiFi</span>
            </div>

            {/* 2. Bluetooth */}
            <div className={styles.tileCol}>
              <button
                type="button"
                onClick={() => setIsBluetoothOn(!isBluetoothOn)}
                className={`${styles.tileBtn} ${isBluetoothOn ? styles.tileBtnActive : ""}`}
                title={`Bluetooth: ${isBluetoothOn ? "On" : "Off"}`}
                aria-label="Bluetooth"
              >
                <IoBluetooth size={19} />
              </button>
              <span className={styles.tileText}>Bluetooth</span>
            </div>

            {/* 3. Flight Mode */}
            <div className={styles.tileCol}>
              <button
                type="button"
                onClick={handleToggleFlightMode}
                className={`${styles.tileBtn} ${isFlightMode ? styles.tileBtnActive : ""}`}
                title={`Flight Mode: ${isFlightMode ? "On" : "Off"}`}
                aria-label="Flight Mode"
              >
                <IoAirplane size={19} />
              </button>
              <span className={styles.tileText}>Flight Mode</span>
            </div>

            {/* 4. Battery Saver */}
            <div className={styles.tileCol}>
              <button
                type="button"
                onClick={onToggleBatterySaver}
                className={`${styles.tileBtn} ${isBatterySaver ? styles.tileBtnActive : ""}`}
                title={`Battery Saver: ${isBatterySaver ? "On (Conserving power, screen dimmed)" : "Off"}`}
                aria-label="Battery Saver"
              >
                <IoLeafOutline size={19} />
              </button>
              <span className={styles.tileText}>Battery Saver</span>
            </div>

            {/* 5. Theme (Active with Moon icon in Dark Theme as shown in Image 1) */}
            <div className={styles.tileCol}>
              <button
                type="button"
                onClick={onToggleTheme}
                className={`${styles.tileBtn} ${isDark ? styles.tileBtnActive : ""}`}
                title={`Theme: ${isDark ? "Dark Theme" : "Light Theme"}. Click to switch theme.`}
                aria-label="Theme"
              >
                {isDark ? <IoMoonOutline size={19} /> : <IoSunnyOutline size={19} />}
              </button>
              <span className={styles.tileText}>Theme</span>
            </div>

            {/* 6. Night Light */}
            <div className={styles.tileCol}>
              <button
                type="button"
                onClick={onToggleNightLight}
                className={`${styles.tileBtn} ${isNightLight ? styles.tileBtnActive : ""}`}
                title={`Night Light: ${isNightLight ? "On (Warm screen filter active)" : "Off"}`}
                aria-label="Night Light"
              >
                <BsSun size={19} />
              </button>
              <span className={styles.tileText}>Night Light</span>
            </div>
          </div>

          {/* Sliders Container: Brightness & Volume */}
          <div className={styles.slidersContainer}>
            {/* Brightness Slider with Interactive Icon Button */}
            <div className={styles.sliderRow}>
              <button
                type="button"
                onClick={handleCycleBrightness}
                className={`${styles.sliderIcon} hover:opacity-80 transition-opacity cursor-pointer border-none bg-transparent p-0 outline-none flex items-center justify-center`}
                title={`Screen Brightness: ${brightness}% (Click to cycle 100% / 50% / 20%)`}
                aria-label="Cycle screen brightness level"
              >
                <IoSunnyOutline size={18} />
              </button>
              <input
                type="range"
                min="10"
                max="100"
                value={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
                className={styles.rangeInput}
                style={{
                  background: `linear-gradient(to right, ${accentColor} ${brightness}%, ${trackBg} ${brightness}%)`,
                }}
                aria-label="Screen brightness slider"
              />
            </div>

            {/* Volume Slider */}
            <div className={styles.sliderRow}>
              <div
                className={styles.sliderIcon}
                onClick={env.toggleMute}
                title={env.isMuted ? "Unmute audio" : "Mute audio"}
                style={{ cursor: "pointer" }}
              >
                {env.isMuted || env.audioVolume === 0 ? (
                  <IoVolumeMute size={18} />
                ) : (
                  <IoVolumeHigh size={18} />
                )}
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={env.isMuted ? 0 : env.audioVolume}
                onChange={(e) => env.setAudioVolume(Number(e.target.value))}
                className={styles.rangeInput}
                style={{
                  background: `linear-gradient(to right, ${accentColor} ${
                    env.isMuted ? 0 : env.audioVolume
                  }%, ${trackBg} ${env.isMuted ? 0 : env.audioVolume}%)`,
                }}
                aria-label="Audio volume slider"
              />
            </div>
          </div>

          {/* Bottom Bar: Battery Status */}
          <div className={styles.footerBar}>
            <div className={styles.batteryStatus}>
              {isBatterySaver ? (
                <IoLeafOutline size={18} className="text-emerald-400" />
              ) : (
                <BatteryFooterIcon size={18} />
              )}
              <span className="flex items-center gap-1.5">
                <span>{env.battery.level > 0 ? env.battery.level : 74}%</span>
                {isBatterySaver && (
                  <span className="text-[11px] text-emerald-400 font-medium">
                    • Battery Saver on
                  </span>
                )}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
