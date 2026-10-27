"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  IoWifi, 
  IoGlobeOutline,
  IoVolumeHigh, 
  IoVolumeMute, 
  IoBatteryCharging, 
  IoBatteryFull,
  IoBatteryHalf,
  IoBatteryDead,
  IoMoonOutline,
  IoSunnyOutline,
  IoInformationCircleOutline,
  IoDesktopOutline
} from "react-icons/io5";
import { SystemEnvironment } from "./useSystemEnvironment";
import styles from "./styles/QuickSettings.module.css";

interface WindowsQuickSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  env: SystemEnvironment;
  isNightLight: boolean;
  onToggleNightLight: () => void;
}

export default function WindowsQuickSettings({
  isOpen,
  onClose,
  env,
  isNightLight,
  onToggleNightLight,
}: WindowsQuickSettingsProps) {
  const flyoutRef = useRef<HTMLDivElement>(null);

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

  // Battery Icon selection based on level and charging state
  const BatteryIcon = env.battery.charging
    ? IoBatteryCharging
    : env.battery.level > 70
    ? IoBatteryFull
    : env.battery.level > 25
    ? IoBatteryHalf
    : IoBatteryDead;

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
          data-lenis-prevent="true"
        >
          {/* Top Status Header: Live Network & Battery */}
          <div className={styles.topStatus}>
            {/* Network Indicator */}
            <div className={styles.statusItem}>
              <div
                className={`${styles.statusIcon} ${
                  !env.network.isOnline ? styles.statusIconOffline : ""
                }`}
              >
                {env.network.isOnline ? (
                  <IoWifi size={17} />
                ) : (
                  <IoGlobeOutline size={17} />
                )}
              </div>
              <div className={styles.statusText}>
                <p className={styles.statusTitle}>
                  {env.network.isOnline ? "Connected" : "Disconnected"}
                </p>
                <p className={styles.statusSub}>
                  {env.network.isOnline
                    ? env.network.effectiveType
                      ? `${env.network.effectiveType.toUpperCase()} Internet`
                      : "Internet Online"
                    : "No Internet"}
                </p>
              </div>
            </div>

            {/* Battery Indicator */}
            <div className={styles.statusItem}>
              <div className={styles.statusIcon}>
                <BatteryIcon size={18} />
              </div>
              <div className={styles.statusText}>
                <p className={styles.statusTitle}>
                  {env.battery.level}%
                  {env.battery.charging ? " (Charging)" : ""}
                </p>
                <span
                  className={
                    env.battery.isRealData ? styles.realBadge : styles.simBadge
                  }
                  title={
                    env.battery.isRealData
                      ? "Real battery telemetry obtained from your device via the Battery Status API"
                      : "Simulated AC Power. Your browser does not expose the Battery Status API"
                  }
                >
                  {env.battery.isRealData ? "Device Battery" : "Simulated AC"}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Action Tiles */}
          <div className={styles.tilesGrid}>
            {/* Wi-Fi / Connection Tile */}
            <div
              className={`${styles.tile} ${
                env.network.isOnline ? styles.tileActive : ""
              }`}
              title={
                env.network.isOnline
                  ? "Real connection: Online"
                  : "Real connection: Offline"
              }
            >
              <div className={styles.tileIcon}>
                {env.network.isOnline ? <IoWifi /> : <IoGlobeOutline />}
              </div>
              <p className={styles.tileLabel}>
                {env.network.isOnline ? "Network" : "Offline"}
              </p>
            </div>

            {/* Portfolio Audio Mute Tile */}
            <button
              type="button"
              onClick={env.toggleMute}
              className={`${styles.tile} ${
                !env.isMuted && env.audioVolume > 0 ? styles.tileActive : ""
              }`}
              title="Click to toggle portfolio sound effects"
            >
              <div className={styles.tileIcon}>
                {env.isMuted || env.audioVolume === 0 ? (
                  <IoVolumeMute />
                ) : (
                  <IoVolumeHigh />
                )}
              </div>
              <p className={styles.tileLabel}>
                {env.isMuted || env.audioVolume === 0 ? "Muted" : "Audio"}
              </p>
            </button>

            {/* Night Light Tile */}
            <button
              type="button"
              onClick={onToggleNightLight}
              className={`${styles.tile} ${isNightLight ? styles.tileActive : ""}`}
              title="Toggle simulated warm night light filter"
            >
              <div className={styles.tileIcon}>
                {isNightLight ? <IoMoonOutline /> : <IoSunnyOutline />}
              </div>
              <p className={styles.tileLabel}>
                {isNightLight ? "Night On" : "Night Light"}
              </p>
            </button>
          </div>

          {/* Volume Slider Section with Honest Disclaimer */}
          <div className={styles.sliderSection}>
            <div className={styles.sliderRow}>
              <button
                type="button"
                onClick={env.toggleMute}
                className={styles.sliderIconBtn}
                title={env.isMuted ? "Unmute portfolio audio" : "Mute portfolio audio"}
              >
                {env.isMuted || env.audioVolume === 0 ? (
                  <IoVolumeMute size={18} />
                ) : (
                  <IoVolumeHigh size={18} />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="100"
                value={env.isMuted ? 0 : env.audioVolume}
                onChange={(e) => env.setAudioVolume(Number(e.target.value))}
                className={styles.rangeInput}
                aria-label="Portfolio audio volume slider"
              />
              <span className="text-[11px] font-mono text-neutral-300 w-8 text-right tabular-nums">
                {env.isMuted ? "0%" : `${env.audioVolume}%`}
              </span>
            </div>
            <div className={styles.sliderNotice}>
              <span>Portfolio Sounds Volume</span>
              <span className={styles.simBadge}>Simulated Control</span>
            </div>
          </div>

          {/* Adaptive Environment & Device Telemetry (Safe, Client-Only) */}
          <div className={styles.footerInfo}>
            <div className={styles.deviceSpec} title="Client display resolution & scaling">
              <IoDesktopOutline size={13} className="text-neutral-400" />
              <span>
                {env.viewport.width}×{env.viewport.height} @ {env.dpr}x DPR
              </span>
            </div>
            <span
              className="text-[11px] text-neutral-400 truncate max-w-[130px]"
              title={`Detected visitor host platform: ${env.platformDetail} (${env.timeZone})`}
            >
              {env.platformDetail}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
