"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { AiOutlineWifi } from "react-icons/ai";
import { FiVolume2 } from "react-icons/fi";
import { ArrowLeft } from "lucide-react";
import { useWindows, APP_REGISTRY } from "./WindowsContext";
import { AppId } from "./types";
import styles from "./styles/Footer.module.css";

export default function WindowsTaskbar() {
  const {
    windows,
    activeAppId,
    isStartOpen,
    setStartOpen,
    toggleApp,
    exitWindowsMode,
    triggerError,
  } = useWindows();

  const [hourStr, setHourStr] = useState("00:00 PM");
  const [dateStr, setDateStr] = useState("1/1/1970");

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
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      {/* Left Tray: Quick Return to Portfolio */}
      <div className={styles.leftContainer}>
        <button
          onClick={exitWindowsMode}
          className={styles.portfolioBtn}
          title="Return to standard portfolio website"
        >
          <ArrowLeft size={14} className="text-sky-400" />
          <span>Portfolio Mode</span>
        </button>
      </div>

      {/* Center: Windows 11 Taskbar Icons */}
      <section className={styles.iconContainer}>
        {/* Windows Start Button */}
        <div
          className={`${styles.icon} ${isStartOpen ? styles.activeIcon : ""}`}
          onClick={() => setStartOpen(!isStartOpen)}
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

        {/* Pinned & Running Apps */}
        {APP_REGISTRY.map((app) => {
          const win = windows[app.id];
          const isRunning = win?.isOpen;
          const isActive = activeAppId === app.id && !win?.isMinimized;

          return (
            <div
              key={app.id}
              className={`${styles.icon} ${isActive ? styles.activeIcon : ""}`}
              onClick={() => toggleApp(app.id)}
              title={app.title}
            >
              <Image
                src={app.iconPath}
                width={24}
                height={24}
                alt={app.title}
                draggable={false}
              />
              {isActive && <div className={styles.activeIndicator} />}
              {isRunning && !isActive && <div className={styles.openIndicator} />}
            </div>
          );
        })}

        {/* Authentic Kasperi Easter Egg Apps */}
        <div
          className={styles.icon}
          onClick={() => triggerError("Firefox")}
          title="Firefox"
        >
          <Image
            src="/icons/firefox/firefox.png"
            width={24}
            height={24}
            alt="Firefox"
            draggable={false}
          />
        </div>

        <div
          className={styles.icon}
          onClick={() => triggerError("Spotify")}
          title="Spotify"
        >
          <Image
            src="/icons/spotify/spotify.png"
            width={24}
            height={24}
            alt="Spotify"
            draggable={false}
          />
        </div>

        <div
          className={styles.icon}
          onClick={() => triggerError("Steam")}
          title="Steam"
        >
          <Image
            src="/icons/steam/steam.png"
            width={24}
            height={24}
            alt="Steam"
            draggable={false}
          />
        </div>

        <div
          className={styles.icon}
          onClick={() => triggerError("Discord")}
          title="Discord"
        >
          <Image
            src="/icons/discord/discord.png"
            width={24}
            height={24}
            alt="Discord"
            draggable={false}
          />
        </div>
      </section>

      {/* Right Toolbar: System Tray, Language, Audio, Wifi, Live Clock */}
      <section className={styles.toolbarContainer}>
        <div className={styles.language}>
          <p>ENG</p>
        </div>
        <div className={styles.icon} title="Internet & Sound">
          <AiOutlineWifi />
          <FiVolume2 />
        </div>
        <div
          className={styles.dateIcons}
          onClick={() => toggleApp("hackathons")}
          title="Date & Time"
        >
          <p>{hourStr}</p>
          <p>{dateStr}</p>
        </div>
        <div
          className={styles.showDesktop}
          onClick={() => {
            APP_REGISTRY.forEach((a) => {
              if (windows[a.id]?.isOpen && !windows[a.id]?.isMinimized) {
                toggleApp(a.id);
              }
            });
          }}
          title="Show Desktop"
        />
      </section>
    </div>
  );
}
