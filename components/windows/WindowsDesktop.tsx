"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useWindows, APP_REGISTRY } from "./WindowsContext";
import DraggableWindow from "./DraggableWindow";
import WindowsTaskbar from "./WindowsTaskbar";
import WindowsStartMenu from "./WindowsStartMenu";
import WindowsError from "./WindowsError";
import WindowsBluescreen from "./WindowsBluescreen";
import WindowsBootScreen from "./WindowsBootScreen";
import AboutApp from "./apps/AboutApp";
import ProjectsApp from "./apps/ProjectsApp";
import SkillsApp from "./apps/SkillsApp";
import CertificationsApp from "./apps/CertificationsApp";
import HackathonsApp from "./apps/HackathonsApp";
import GithubApp from "./apps/GithubApp";
import ResumeApp from "./apps/ResumeApp";
import ContactApp from "./apps/ContactApp";
import TerminalApp from "./apps/TerminalApp";
import layoutStyles from "./styles/Layout.module.css";
import iconStyles from "./styles/Icons.module.css";

export default function WindowsDesktop() {
  const {
    isWindowsMode,
    windows,
    openApp,
    exitWindowsMode,
    errors,
    dismissError,
    bluescreen,
    dismissBluescreen,
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
          durationMs={5500}
          onComplete={() => setIsBooting(false)}
        />
      )}
      <div className={layoutStyles.container} data-lenis-prevent="true">
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
                    if (selectedIcon === app.id || (typeof window !== "undefined" && window.innerWidth < 768)) {
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
                  title={`Double click to open ${app.title}`}
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
                setSelectedIcon("trash");
              }}
              onDoubleClick={(e) => {
                e.stopPropagation();
                setRecycleDeleted(!recycleDeleted);
              }}
              title="Recycle Bin (Double click to empty/restore)"
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

      {/* Centered Windows 11 Taskbar */}
      <WindowsTaskbar />
    </div>
    </>
  );
}
