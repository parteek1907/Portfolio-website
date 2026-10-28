"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { AiOutlinePoweroff } from "react-icons/ai";
import { SiGithub, SiX, SiInstagram, SiLeetcode } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { RotateCcw, Power } from "lucide-react";
import { useWindows } from "./WindowsContext";
import { AppId } from "./types";
import { MailIcon } from "./WinFluentIcons";
import { socialLinks } from "@/lib/data";
import styles from "./styles/WindowsMenu.module.css";

const slideVerticalAnimation: Variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.22,
      ease: [0.16, 1, 0.3, 1],
    },
    display: "block",
  },
  close: {
    y: 480,
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: [0.16, 1, 0.3, 1],
    },
    transitionEnd: {
      display: "none",
    },
  },
};

export default function WindowsStartMenu() {
  const {
    isStartOpen,
    setStartOpen,
    openApp,
    exitWindowsMode,
    windowsTheme,
  } = useWindows();

  const [powerOpen, setPowerOpen] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      if (nodeRef.current && !nodeRef.current.contains(target)) {
        if (!target.closest(".windowsIcon") && !target.closest("[data-start-btn='true']")) {
          setStartOpen(false);
          setPowerOpen(false);
        }
      }
    };
    if (isStartOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isStartOpen, setStartOpen]);

  // Real, Functional Apps in Parteek OS (10 Apps total)
  const functionalPinnedApps: {
    id: AppId;
    title: string;
    iconPath?: string;
    renderCustomIcon?: () => React.ReactNode;
  }[] = [
    {
      id: "projects",
      title: "File Explorer",
      iconPath: "/icons/explorer/explorer.png",
    },
    {
      id: "about",
      title: "About Me",
      iconPath: "/icons/notes/notes.png",
    },
    {
      id: "skills",
      title: "Skills",
      iconPath: "/icons/vscode/vscode.png",
    },
    {
      id: "calculator",
      title: "Calculator",
      iconPath: "/icons/calculator.svg",
    },
    {
      id: "terminal",
      title: "Terminal",
      iconPath: "/icons/terminal/terminal.png",
    },
    {
      id: "resume",
      title: "Resume",
      iconPath: "/icons/documents/documents.png",
    },
    {
      id: "certifications",
      title: "Certifications",
      iconPath: "/icons/folder/folder.png",
    },
    {
      id: "hackathons",
      title: "Hackathons",
      iconPath: "/icons/links/links.png",
    },
    {
      id: "github",
      title: "GitHub Activity",
      iconPath: "/icons/githubdesktop/githubdesktop.png",
    },
    {
      id: "contact",
      title: "Contact",
      renderCustomIcon: () => <MailIcon size={32} />,
    },
  ];

  // Recommended Section: Real Social Profiles that open Parteek's socials
  const socialRecommended = [
    {
      id: "rec-github",
      title: "GitHub",
      sub: "github.com/parteek1907",
      icon: <SiGithub size={24} className="text-white" />,
      url: socialLinks.github,
    },
    {
      id: "rec-linkedin",
      title: "LinkedIn",
      sub: "linkedin.com/in/parteek1907",
      icon: <FaLinkedin size={24} color="#0A66C2" />,
      url: socialLinks.linkedin,
    },
    {
      id: "rec-twitter",
      title: "Twitter / X",
      sub: "@parteek1907",
      icon: <SiX size={22} className="text-white" />,
      url: socialLinks.twitter,
    },
    {
      id: "rec-instagram",
      title: "Instagram",
      sub: "@parteek1907",
      icon: <SiInstagram size={24} color="#E4405F" />,
      url: socialLinks.instagram,
    },
    {
      id: "rec-leetcode",
      title: "LeetCode",
      sub: "leetcode.com/parteek1907",
      icon: <SiLeetcode size={24} color="#FFA116" />,
      url: socialLinks.leetcode,
    },
    {
      id: "rec-contact",
      title: "Message & Mail",
      sub: "Open contact client",
      icon: <MailIcon size={26} />,
      onClick: () => {
        setStartOpen(false);
        openApp("contact");
      },
    },
  ];

  return (
    <motion.div
      initial="close"
      animate={isStartOpen ? "open" : "close"}
      variants={slideVerticalAnimation}
      className={styles.overflow}
      data-win-theme={windowsTheme}
    >
      <div className={styles.winMenu} ref={nodeRef} data-lenis-prevent="true">
        {/* Main Content Area */}
        <div className={styles.winMenuScrollArea}>
          {/* Pinned Section */}
          <div>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Pinned</h2>
            </div>

            {/* 5 Columns Grid with 10 Real Functional Apps */}
            <div className={styles.pinnedGrid}>
              {functionalPinnedApps.map((app) => (
                <div
                  key={app.id}
                  className={styles.pinnedItem}
                  onClick={() => {
                    setStartOpen(false);
                    openApp(app.id);
                  }}
                  title={app.title}
                >
                  <div className={styles.pinnedIconWrap}>
                    {app.renderCustomIcon ? (
                      app.renderCustomIcon()
                    ) : (
                      <Image
                        src={app.iconPath || "/icons/folder/folder.png"}
                        alt={app.title}
                        width={32}
                        height={32}
                        unoptimized
                        draggable={false}
                      />
                    )}
                  </div>
                  <p className={styles.pinnedLabel}>{app.title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Section: Real Social Links */}
          <div className={styles.recommendedSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Recommended</h2>
            </div>

            <div className={styles.recommendedGrid}>
              {socialRecommended.map((item) => (
                <div
                  key={item.id}
                  className={styles.recommendedItem}
                  onClick={() => {
                    if (item.onClick) {
                      item.onClick();
                    } else if (item.url) {
                      setStartOpen(false);
                      window.open(item.url, "_blank", "noopener,noreferrer");
                    }
                  }}
                  title={item.title}
                >
                  <div className={styles.recommendedIconWrap}>{item.icon}</div>
                  <div className={styles.recommendedTextWrap}>
                    <p className={styles.recommendedTitle}>{item.title}</p>
                    <span className={styles.recommendedSub}>{item.sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Start Menu Footer: Profile & Power Options */}
        <div className={styles.winMenuFooter}>
          <div
            className={styles.userChip}
            title="User Profile (About Me)"
            onClick={() => {
              setStartOpen(false);
              openApp("about");
            }}
          >
            <Image
              src="/images/windowsUser.webp"
              alt="Parteek Garg"
              width={30}
              height={30}
              unoptimized
              className={styles.userAvatar}
            />
            <p className={styles.userName}>Parteek Garg</p>
          </div>

          <div className="relative">
            <button
              type="button"
              className={styles.powerBtn}
              onClick={() => setPowerOpen(!powerOpen)}
              title="Power"
              aria-label="Power options"
            >
              <AiOutlinePoweroff size={18} />
            </button>

            {powerOpen && (
              <div className={styles.powerDropdown}>
                <button
                  type="button"
                  onClick={() => {
                    setPowerOpen(false);
                    exitWindowsMode();
                  }}
                  title="Shut down OS"
                >
                  <Power size={18} strokeWidth={1.5} />
                  <span>Shut down</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPowerOpen(false);
                    setStartOpen(false);
                    window.location.reload();
                  }}
                  title="Restart Desktop"
                >
                  <RotateCcw size={18} strokeWidth={1.5} />
                  <span>Restart</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
