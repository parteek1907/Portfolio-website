"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useWindows, APP_REGISTRY } from "./WindowsContext";
import DraggableWindow from "./DraggableWindow";
import WindowsTaskbar from "./WindowsTaskbar";
import WindowsStartMenu from "./WindowsStartMenu";
import WindowsCalendar from "./WindowsCalendar";
import dynamic from "next/dynamic";
import WindowsError from "./WindowsError";
import WindowsBluescreen from "./WindowsBluescreen";
import WindowsBootScreen from "./WindowsBootScreen";
import WindowsQuickSettings from "./WindowsQuickSettings";
import { IoGlobeOutline } from "react-icons/io5";
import layoutStyles from "./styles/Layout.module.css";
import iconStyles from "./styles/Icons.module.css";
import "./styles/WindowsLightApps.css";

// Lazy-load applications on demand to keep initial boot and overall website feather-light
const AboutApp = dynamic(() => import("./apps/AboutApp"), { ssr: false });
const ProjectsApp = dynamic(() => import("./apps/ProjectsApp"), { ssr: false });
const SkillsApp = dynamic(() => import("./apps/SkillsApp"), { ssr: false });
const CertificationsApp = dynamic(() => import("./apps/CertificationsApp"), { ssr: false });
const HackathonsApp = dynamic(() => import("./apps/HackathonsApp"), { ssr: false });
const GithubApp = dynamic(() => import("./apps/GithubApp"), { ssr: false });
const ResumeApp = dynamic(() => import("./apps/ResumeApp"), { ssr: false });
const ContactApp = dynamic(() => import("./apps/ContactApp"), { ssr: false });
const TerminalApp = dynamic(() => import("./apps/TerminalApp"), { ssr: false });
const CalculatorApp = dynamic(() => import("./apps/CalculatorApp"), { ssr: false });

export default function WindowsDesktop() {
  const {
    isWindowsMode,
    windows,
    openApp,
    errors,
    dismissError,
    bluescreen,
    dismissBluescreen,
    isQuickSettingsOpen,
    setQuickSettingsOpen,
    isNightLight,
    toggleNightLight,
    brightness,
    setBrightness,
    isBatterySaver,
    toggleBatterySaver,
    windowsTheme,
    toggleWindowsTheme,
    env,
  } = useWindows();

  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [recycleDeleted, setRecycleDeleted] = useState(false);
  const [isBooting, setIsBooting] = useState(true);

  React.useEffect(() => {
    if (isWindowsMode) {
      setIsBooting(true);
    }
  }, [isWindowsMode]);

  if (!isWindowsMode) return null;

  return (
    <>
      {isBooting && (
        <WindowsBootScreen
          durationMs={5000}
          onComplete={() => setIsBooting(false)}
        />
      )}
      <div 
        className={layoutStyles.container}
        data-win-theme={windowsTheme}
        data-lenis-prevent="true"
      >
      {/* Desktop Space (Above Taskbar) */}
      <div
        className={layoutStyles.desktopArea}
        onClick={() => setSelectedIcon(null)}
        onWheel={(e) => {
          if (e.target === e.currentTarget) {
            e.stopPropagation();
          }
        }}
      >
        {/* Desktop Application Icons Grid */}
        <div className={iconStyles.container}>
          <div className={iconStyles.wrapper}>
            {APP_REGISTRY.map((app) => {
              const isSelected = selectedIcon === app.id;
              return (
                <div
                  key={app.id}
                  className={`${iconStyles.item} ${isSelected ? iconStyles.selected : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (selectedIcon === app.id || env.isTouch || env.isMobile) {
                      openApp(app.id);
                      setSelectedIcon(null);
                    } else {
                      setSelectedIcon(app.id);
                    }
                  }}
                  onDoubleClick={(e) => {
                    e.stopPropagation();
                    openApp(app.id);
                  }}
                  title={env.isTouch ? `Tap to open ${app.title}` : `Double click to open ${app.title}`}
                >
                  <Image
                    src={app.iconPath}
                    alt={app.title}
                    width={40}
                    height={40}
                    unoptimized
                    draggable={false}
                  />
                  <p>{app.title}</p>
                </div>
              );
            })}

            {/* Recycle Bin */}
            <div
              className={`${iconStyles.item} ${selectedIcon === "trash" ? iconStyles.selected : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                if (selectedIcon === "trash" || env.isTouch || env.isMobile) {
                  setRecycleDeleted(!recycleDeleted);
                  setSelectedIcon(null);
                } else {
                  setSelectedIcon("trash");
                }
              }}
              onDoubleClick={(e) => {
                e.stopPropagation();
                setRecycleDeleted(!recycleDeleted);
              }}
              title={env.isTouch ? "Recycle Bin (Tap to empty/restore)" : "Recycle Bin (Double click to empty/restore)"}
            >
              <Image
                src={recycleDeleted ? "/icons/trash/trash_full.png" : "/icons/trash/trash_empty.png"}
                alt="Recycle Bin"
                width={40}
                height={40}
                unoptimized
                draggable={false}
              />
              <p>Recycle Bin</p>
            </div>
          </div>
        </div>

        {/* Windows Rendering Container */}
        {windows.about.isOpen && (
          <DraggableWindow id="about">
            <AboutApp />
          </DraggableWindow>
        )}

        {windows.projects.isOpen && (
          <DraggableWindow id="projects">
            <ProjectsApp />
          </DraggableWindow>
        )}

        {windows.skills.isOpen && (
          <DraggableWindow id="skills">
            <SkillsApp />
          </DraggableWindow>
        )}

        {windows.hackathons.isOpen && (
          <DraggableWindow id="hackathons">
            <HackathonsApp />
          </DraggableWindow>
        )}

        {windows.certifications.isOpen && (
          <DraggableWindow id="certifications">
            <CertificationsApp />
          </DraggableWindow>
        )}

        {windows.github.isOpen && (
          <DraggableWindow id="github">
            <GithubApp />
          </DraggableWindow>
        )}

        {windows.resume.isOpen && (
          <DraggableWindow id="resume">
            <ResumeApp />
          </DraggableWindow>
        )}

        {windows.contact.isOpen && (
          <DraggableWindow id="contact">
            <ContactApp />
          </DraggableWindow>
        )}

        {windows.terminal.isOpen && (
          <DraggableWindow id="terminal">
            <TerminalApp />
          </DraggableWindow>
        )}

        {windows.calculator?.isOpen && (
          <DraggableWindow id="calculator">
            <CalculatorApp />
          </DraggableWindow>
        )}

        {/* Active Application Errors (Easter Egg Audio & Dialog) */}
        {errors.map((err) => (
          <WindowsError
            key={err.index}
            error={err}
            onDismiss={dismissError}
          />
        ))}

        {/* Blue Screen of Death (BSOD) */}
        {bluescreen && <WindowsBluescreen onDismiss={dismissBluescreen} />}
      </div>

      {/* Windows 11 Start Menu Flyout */}
      <WindowsStartMenu />

      {/* Windows 11 Real Calendar Flyout */}
      <WindowsCalendar />

      {/* Windows 11 Quick Settings Flyout */}
      <WindowsQuickSettings
        isOpen={isQuickSettingsOpen}
        onClose={() => setQuickSettingsOpen(false)}
        env={env}
        brightness={brightness}
        setBrightness={setBrightness}
        isBatterySaver={isBatterySaver}
        onToggleBatterySaver={toggleBatterySaver}
        isNightLight={isNightLight}
        onToggleNightLight={toggleNightLight}
        windowsTheme={windowsTheme}
        onToggleTheme={toggleWindowsTheme}
      />

      {/* Centered Windows 11 Taskbar */}
      <WindowsTaskbar />

      {/* Real-time Screen Brightness Dimming Overlay */}
      {brightness < 100 && (
        <div
          className="fixed inset-0 pointer-events-none z-[999980] bg-black transition-opacity duration-150"
          style={{
            opacity: Math.max(0, Math.min(0.85, (100 - brightness) * 0.0075)),
          }}
          aria-hidden="true"
        />
      )}

      {/* Windows 11 Authentic Night Light (Correlated Color Temperature Shift ~4600K) */}
      <div
        className="fixed inset-0 pointer-events-none z-[999990]"
        style={{
          backgroundColor: "#FFEAC8",
          mixBlendMode: "multiply",
          opacity: isNightLight ? 1 : 0,
          visibility: isNightLight ? "visible" : "hidden",
          transition: "opacity 0.4s ease, visibility 0.4s ease",
        }}
        aria-hidden="true"
      />

      {/* Real-time Network Offline Toast */}
      {!env.network.isOnline && (
        <div className="fixed top-4 right-4 z-[999992] bg-[#212121]/95 border border-red-500/40 text-white px-4 py-3 rounded-lg shadow-2xl flex items-center gap-3 backdrop-blur-md text-xs select-none">
          <IoGlobeOutline size={18} className="text-red-400 shrink-0" />
          <div>
            <div className="font-semibold text-neutral-100">You are currently offline</div>
            <div className="text-neutral-400 text-[11px]">Local system features & portfolio apps remain accessible.</div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}
