"use client";

import React from "react";
import Image from "next/image";
import { 
  IoWifi, 
  IoGlobeOutline,
  IoVolumeHigh, 
  IoVolumeMute,
  IoBatteryCharging,
  IoBatteryFull,
  IoBatteryHalf,
  IoBatteryDead,
  IoChevronUp 
} from "react-icons/io5";
import { 
  SiGithub, 
  SiX, 
  SiInstagram, 
  SiLeetcode 
} from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { socialLinks } from "@/lib/data";
import { useWindows } from "./WindowsContext";
import { useTaskbarClock } from "./useSystemEnvironment";
import styles from "./styles/Footer.module.css";

const taskbarSocials = [
  {
    name: "GitHub",
    href: socialLinks.github,
    icon: SiGithub,
    color: "#ffffff",
  },
  {
    name: "LinkedIn",
    href: socialLinks.linkedin,
    icon: FaLinkedin,
    color: "#0a66c2",
  },
  {
    name: "X (Twitter)",
    href: socialLinks.twitter,
    icon: SiX,
    color: "#ffffff",
  },
  {
    name: "Instagram",
    href: socialLinks.instagram,
    icon: SiInstagram,
    color: "#e1306c",
  },
  {
    name: "LeetCode",
    href: socialLinks.leetcode,
    icon: SiLeetcode,
    color: "#ffa116",
  },
];

export default function WindowsTaskbar() {
  const { 
    isStartOpen, 
    setStartOpen, 
    isCalendarOpen, 
    setCalendarOpen,
    isQuickSettingsOpen,
    setQuickSettingsOpen,
    env,
    windows,
    minimizeApp
  } = useWindows();

  const handleToggleStart = () => {
    if (!isStartOpen) {
      setCalendarOpen(false);
      setQuickSettingsOpen(false);
    }
    setStartOpen(!isStartOpen);
  };

  const handleToggleCalendar = () => {
    if (!isCalendarOpen) {
      setStartOpen(false);
      setQuickSettingsOpen(false);
    }
    setCalendarOpen(!isCalendarOpen);
  };

  const handleToggleQuickSettings = () => {
    if (!isQuickSettingsOpen) {
      setStartOpen(false);
      setCalendarOpen(false);
    }
    setQuickSettingsOpen(!isQuickSettingsOpen);
  };

  const handleShowDesktop = () => {
    Object.keys(windows).forEach((id) => {
      if (windows[id as keyof typeof windows].isOpen && !windows[id as keyof typeof windows].isMinimized) {
        minimizeApp(id as any);
      }
    });
  };

  // Dynamic Battery icon selection
  const BatteryIcon = env.battery.charging
    ? IoBatteryCharging
    : env.battery.level > 70
    ? IoBatteryFull
    : env.battery.level > 25
    ? IoBatteryHalf
    : IoBatteryDead;

  // Dynamic Audio icon
  const AudioIcon = env.isMuted || env.audioVolume === 0 ? IoVolumeMute : IoVolumeHigh;

  const clusterTitle = `Network: ${
    env.network.isOnline ? "Connected (Online, Real data)" : "Offline (No connection, Real data)"
  } · Audio: ${env.isMuted ? "Muted" : env.audioVolume + "% (Simulated)"} · Battery: ${
    env.battery.level
  }% (${env.battery.charging ? "Charging" : "Discharging"}, ${
    env.battery.isRealData ? "Real device data" : "Simulated AC"
  }) - Click for Quick Settings`;

  return (
    <div className={styles.container}>
      {/* Center: Windows Start + Social Links */}
      <section className={styles.iconContainer}>
        {/* Windows Start Button */}
        <div
          className={`${styles.icon} ${isStartOpen ? styles.activeIcon : ""}`}
          onClick={handleToggleStart}
          title="Start"
        >
          <Image
            src="/icons/windows/windows.png"
            width={24}
            height={24}
            alt="Windows logo"
            draggable={false}
          />
        </div>

        {/* Divider */}
        <div className={`${styles.divider} hidden sm:block`} />

        {/* Only Social Links in Taskbar */}
        {taskbarSocials.map((social) => {
          const Icon = social.icon;
          return (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.icon}
              title={social.name}
              aria-label={social.name}
            >
              <Icon size={20} className="transition-transform group-hover:scale-110" />
            </a>
          );
        })}
      </section>

      {/* Right Toolbar: System Tray with Interactive Real Indicators */}
      <section className={styles.toolbarContainer}>
        {/* Hidden Icons Caret */}
        <div className={styles.hiddenIcons} title="Show hidden icons">
          <IoChevronUp size={14} />
        </div>

        {/* Localized Language Badge */}
        <div
          className={styles.language}
          title={`Detected visitor locale: ${env.locale} (${env.timeZone})`}
        >
          <p>{env.languageBadge}</p>
        </div>

        {/* Interactive Quick Settings System Cluster: WiFi, Volume, Battery */}
        <div
          className={`${styles.systemCluster} ${isQuickSettingsOpen ? styles.activeCluster : ""}`}
          title={clusterTitle}
          onClick={handleToggleQuickSettings}
          data-tray-cluster="true"
        >
          <div
            className={styles.trayIcon}
            title={env.network.isOnline ? "Internet: Online (Real device status)" : "Internet: Offline (Real device status)"}
          >
            {env.network.isOnline ? <IoWifi size={18} /> : <IoGlobeOutline size={18} className="text-red-400" />}
          </div>
          <div
            className={styles.trayIcon}
            title={`Portfolio Audio: ${env.isMuted ? "Muted" : env.audioVolume + "%"} (Simulated)`}
          >
            <AudioIcon size={18} />
          </div>
          <div
            className={styles.trayIcon}
            title={`Battery: ${env.battery.level}% (${env.battery.charging ? "Plugged in" : "Battery power"}, ${
              env.battery.isRealData ? "Real device status" : "Simulated AC Power"
            })`}
          >
            <BatteryIcon size={20} />
          </div>
        </div>

        {/* Live Date & Time Button (Isolated so only the clock updates every second) */}
        <TaskbarClock
          isCalendarOpen={isCalendarOpen}
          onClick={handleToggleCalendar}
          locale={env.locale}
          timeZone={env.timeZone}
          fullDateStr={env.fullDateStr}
        />

        {/* Show Desktop Sliver */}
        <div 
          className={styles.showDesktop} 
          title="Show desktop" 
          onClick={handleShowDesktop}
        />
      </section>
    </div>
  );
}

function TaskbarClock({
  isCalendarOpen,
  onClick,
  locale,
  timeZone,
  fullDateStr,
}: {
  isCalendarOpen: boolean;
  onClick: () => void;
  locale: string;
  timeZone: string;
  fullDateStr: string;
}) {
  const { timeStr, dateStr } = useTaskbarClock(true, locale, timeZone);

  return (
    <div
      className={`${styles.dateTimeCluster} ${isCalendarOpen ? styles.activeCluster : ""}`}
      title={`${fullDateStr} (${timeZone}) - Click to open Calendar`}
      onClick={onClick}
      data-calendar-toggle="true"
    >
      <p className={styles.timeText}>{timeStr}</p>
      <p className={styles.dateText}>{dateStr}</p>
    </div>
  );
}
