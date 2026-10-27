"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { AiOutlineWifi } from "react-icons/ai";
import { FiVolume2 } from "react-icons/fi";
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
  const { isStartOpen, setStartOpen } = useWindows();
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
      {/* Center: Windows Start + Social Links */}
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

      {/* Right Toolbar: System Tray, Language, Audio, Wifi, Live Clock */}
      <section className={styles.toolbarContainer}>
        <div className={styles.language}>
          <p>ENG</p>
        </div>
        <div className={styles.icon} title="Internet & Sound">
          <AiOutlineWifi />
          <FiVolume2 />
        </div>
        <div className={styles.dateIcons} title="Date & Time">
          <p>{hourStr}</p>
          <p>{dateStr}</p>
        </div>
        <div className={styles.showDesktop} title="Desktop" />
      </section>
    </div>
  );
}
