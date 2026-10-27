"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { AiOutlinePoweroff } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { VscSearch } from "react-icons/vsc";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { useWindows, APP_REGISTRY } from "./WindowsContext";
import styles from "./styles/WindowsMenu.module.css";

const slideVerticalAnimation: any = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.25,
      ease: [0.16, 1, 0.3, 1],
    },
    display: "block",
  },
  close: {
    y: 480,
    opacity: 0,
    transition: {
      duration: 0.22,
      ease: [0.16, 1, 0.3, 1],
    },
    transitionEnd: {
      display: "none",
    },
  },
};

export default function WindowsStartMenu() {
  const { isStartOpen, setStartOpen, openApp, exitWindowsMode } = useWindows();
  const [search, setSearch] = useState("");
  const [powerOpen, setPowerOpen] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      if (nodeRef.current && !nodeRef.current.contains(target)) {
        if (!target.closest(`.${styles.icon}`) && !target.closest(".windowsIcon")) {
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

  const filteredApps = APP_REGISTRY.filter((app) =>
    app.title.toLowerCase().includes(search.toLowerCase()) ||
    app.description.toLowerCase().includes(search.toLowerCase()) ||
    app.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div
      initial="close"
      animate={isStartOpen ? "open" : "close"}
      variants={slideVerticalAnimation}
      className={styles.overflow}
    >
      <div className={styles.winMenu} ref={nodeRef}>
        <div className={styles.winMenuContainer}>
          {/* Search Input */}
          <div className={styles.winMenuSearch}>
            <div className={styles.inputWithIcon}>
              <VscSearch />
              <input
                type="text"
                placeholder="Type here to search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoFocus={isStartOpen}
              />
            </div>
          </div>

          {/* Pinned & Recommended Apps */}
          <div className={styles.winMenuPinned}>
            {/* Pinned Section */}
            <div className={styles.winMenuPinnedContainer}>
              <div className={styles.winMenuPinnedTop}>
                <h2>Pinned</h2>
                <div onClick={() => openApp("projects")}>
                  <p>All apps</p>
                  <IoIosArrowForward />
                </div>
              </div>

              <div className={styles.winMenuPinnedBottom}>
                {filteredApps.map((app) => (
                  <div
                    key={app.id}
                    className={styles.pinnedTile}
                    onClick={() => {
                      setStartOpen(false);
                      openApp(app.id);
                    }}
                    title={app.description}
                  >
                    <Image
                      src={app.iconPath}
                      alt={app.title}
                      width={32}
                      height={32}
                      unoptimized
                      draggable={false}
                    />
                    <p>{app.title}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Section (Parteek's Real Highlights) */}
            <div className={styles.winMenuPinnedContainer}>
              <div className={styles.winMenuPinnedTop}>
                <h2>Recommended</h2>
                <div onClick={() => openApp("resume")}>
                  <p>More</p>
                  <IoIosArrowForward />
                </div>
              </div>

              <div className={styles.winMenuRecommendedBottom}>
                <div className={styles.winMenuRecommendedItem}>
                  <div
                    className={styles.recommendedTile}
                    onClick={() => {
                      setStartOpen(false);
                      openApp("resume");
                    }}
                  >
                    <Image
                      src="/icons/documents/documents.png"
                      alt="Resume"
                      width={28}
                      height={28}
                      unoptimized
                    />
                    <div>
                      <p>ParteekGarg_Resume.pdf</p>
                      <span>PDF &middot; October 2026</span>
                    </div>
                  </div>

                  <div
                    className={styles.recommendedTile}
                    onClick={() => {
                      setStartOpen(false);
                      openApp("projects");
                    }}
                  >
                    <Image
                      src="/icons/folder/folder.png"
                      alt="Projects"
                      width={28}
                      height={28}
                      unoptimized
                    />
                    <div>
                      <p>KIN &amp; CrossCheck</p>
                      <span>Top 30 HackShift &amp; Winner</span>
                    </div>
                  </div>
                </div>

                <div className={styles.winMenuRecommendedItem}>
                  <div
                    className={styles.recommendedTile}
                    onClick={() => {
                      setStartOpen(false);
                      openApp("certifications");
                    }}
                  >
                    <Image
                      src="/icons/documents/documents.png"
                      alt="Certifications"
                      width={28}
                      height={28}
                      unoptimized
                    />
                    <div>
                      <p>Cisco &amp; IBM Credentials</p>
                      <span>5 Verified Badges</span>
                    </div>
                  </div>

                  <div
                    className={styles.recommendedTile}
                    onClick={() => {
                      setStartOpen(false);
                      openApp("terminal");
                    }}
                  >
                    <Image
                      src="/icons/terminal/terminal.png"
                      alt="Terminal"
                      width={28}
                      height={28}
                      unoptimized
                    />
                    <div>
                      <p>Windows Terminal</p>
                      <span>PowerShell Shell</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Start Menu Footer: Profile & Power Options */}
        <div className={styles.winMenuFooter}>
          <div>
            <Image
              src="/images/windowsUser.webp"
              alt="User Avatar"
              width={30}
              height={30}
              unoptimized
            />
            <div>
              <p>Parteek Garg</p>
            </div>
          </div>

          <div className="relative">
            <div
              className={styles.powerBtn}
              onClick={() => setPowerOpen(!powerOpen)}
              title="Power options"
            >
              <AiOutlinePoweroff />
            </div>

            {powerOpen && (
              <div className={styles.powerDropdown}>
                <button
                  onClick={() => {
                    setPowerOpen(false);
                    exitWindowsMode();
                  }}
                >
                  <AiOutlinePoweroff size={14} className="text-rose-400" />
                  <span>Shut down</span>
                </button>
                <button
                  onClick={() => {
                    setPowerOpen(false);
                    setStartOpen(false);
                    window.location.reload();
                  }}
                >
                  <RotateCcw size={14} className="text-neutral-400" />
                  <span>Restart Desktop</span>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className={styles.winMenuBg} />
      </div>
    </motion.div>
  );
}
