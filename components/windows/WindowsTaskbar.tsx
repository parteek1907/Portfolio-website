"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  IoWifi, 
  IoVolumeHigh, 
  IoBatteryCharging,
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
    windows,
    minimizeApp
  } = useWindows();

  const [hourStr, setHourStr] = useState("00:00 PM");
  const [dateStr, setDateStr] = useState("1/1/1970");
  const [fullDateTitle, setFullDateTitle] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setHourStr(
        now.toLocaleTimeString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
      setDateStr(now.toLocaleDateString(undefined));
      setFullDateTitle(
        now.toLocaleDateString(undefined, {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleStart = () => {
    if (!isStartOpen) {
      setCalendarOpen(false);
    }
    setStartOpen(!isStartOpen);
  };

  const handleToggleCalendar = () => {
    if (!isCalendarOpen) {
      setStartOpen(false);
    }
    setCalendarOpen(!isCalendarOpen);
  };

  const handleShowDesktop = () => {
    Object.keys(windows).forEach((id) => {
      if (windows[id as keyof typeof windows].isOpen && !windows[id as keyof typeof windows].isMinimized) {
        minimizeApp(id as any);
      }
    });
  };

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
        <div className="w-px h-6 bg-white/10 mx-1" />

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

      {/* Right Toolbar: System Tray with Properly Sized Icons & Interactive Calendar */}
      <section className={styles.toolbarContainer}>
        {/* Hidden Icons Caret */}
        <div className={styles.hiddenIcons} title="Show hidden icons">
          <IoChevronUp size={14} />
        </div>

        {/* Language Badge */}
        <div className={styles.language} title="Keyboard layout: English (United States)">
          <p>ENG</p>
        </div>

        {/* Quick Settings System Cluster: WiFi, Volume, Battery */}
        <div
          className={styles.systemCluster}
          title="Internet: Connected &middot; Speakers: 100% &middot; Battery: 100% (Plugged in)"
        >
          <div className={styles.trayIcon}>
            <IoWifi size={18} />
          </div>
          <div className={styles.trayIcon}>
            <IoVolumeHigh size={18} />
          </div>
          <div className={styles.trayIcon}>
            <IoBatteryCharging size={20} />
          </div>
        </div>

        {/* Live Date & Time Button (Click opens real Windows 11 Calendar) */}
        <div
          className={`${styles.dateTimeCluster} ${isCalendarOpen ? styles.activeCluster : ""}`}
          title={`${fullDateTitle} - Click to open Calendar`}
          onClick={handleToggleCalendar}
          data-calendar-toggle="true"
        >
          <p className={styles.timeText}>{hourStr}</p>
          <p className={styles.dateText}>{dateStr}</p>
        </div>

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
