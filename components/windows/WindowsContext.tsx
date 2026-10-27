"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef } from "react";
import { AppId, WindowState, DesktopAppDef, ErrorType } from "./types";
import { useSystemEnvironment, SystemEnvironment } from "./useSystemEnvironment";

export const APP_REGISTRY: DesktopAppDef[] = [
  {
    id: "about",
    title: "About Me",
    description: "Bio, education at NMIMS Chandigarh, focus & goals",
    iconPath: "/icons/notes/notes.png",
    iconBg: "bg-[#2b2b2b]",
    category: "Profile",
    pinnedToTaskbar: true,
    pinnedToStart: true,
    defaultSize: { width: 780, height: 560 },
  },
  {
    id: "projects",
    title: "Projects",
    description: "File Explorer with KIN, CrossCheck, Ziro, Sanket, FinWise & more",
    iconPath: "/icons/folder/folder.png",
    iconBg: "bg-[#2b2b2b]",
    pinnedToTaskbar: true,
    pinnedToStart: true,
    category: "Development",
    defaultSize: { width: 940, height: 600 },
  },
  {
    id: "skills",
    title: "Skills",
    description: "Languages, frontend, backend, databases, and AI stack",
    iconPath: "/icons/vscode/vscode.png",
    iconBg: "bg-[#2b2b2b]",
    pinnedToTaskbar: true,
    pinnedToStart: true,
    category: "Development",
    defaultSize: { width: 780, height: 540 },
  },
  {
    id: "hackathons",
    title: "Hackathons",
    description: "Victories, milestones, roles & team leadership",
    iconPath: "/icons/links/links.png",
    iconBg: "bg-[#2b2b2b]",
    pinnedToTaskbar: true,
    pinnedToStart: true,
    category: "Credentials",
    defaultSize: { width: 840, height: 580 },
  },
  {
    id: "certifications",
    title: "Certifications",
    description: "Folder with verified credentials in PDF format",
    iconPath: "/icons/folder/folder.png",
    iconBg: "bg-[#2b2b2b]",
    pinnedToTaskbar: true,
    pinnedToStart: true,
    category: "Credentials",
    defaultSize: { width: 880, height: 560 },
  },
  {
    id: "github",
    title: "GitHub",
    description: "Public commit activity, stats & repositories",
    iconPath: "/icons/githubdesktop/githubdesktop.png",
    iconBg: "bg-[#2b2b2b]",
    pinnedToTaskbar: true,
    pinnedToStart: true,
    category: "Development",
    defaultSize: { width: 840, height: 560 },
  },
  {
    id: "resume",
    title: "Resume",
    description: "ParteekGarg_Resume.pdf preview & download",
    iconPath: "/icons/documents/documents.png",
    iconBg: "bg-[#2b2b2b]",
    pinnedToTaskbar: true,
    pinnedToStart: true,
    category: "Profile",
    defaultSize: { width: 820, height: 620 },
  },
  {
    id: "contact",
    title: "Contact",
    description: "Interactive email client & professional links",
    iconPath: "/icons/links/links.png",
    iconBg: "bg-[#2b2b2b]",
    pinnedToTaskbar: true,
    pinnedToStart: true,
    category: "Communication",
    defaultSize: { width: 780, height: 520 },
  },
  {
    id: "terminal",
    title: "Terminal",
    description: "MINGW64 / PowerShell command prompt",
    iconPath: "/icons/terminal/terminal.png",
    iconBg: "bg-[#2b2b2b]",
    pinnedToTaskbar: true,
    pinnedToStart: true,
    category: "Tools",
    defaultSize: { width: 740, height: 480 },
  },
];

interface WindowsContextValue {
  isWindowsMode: boolean;
  windows: Record<AppId, WindowState>;
  activeAppId: AppId | null;
  isStartOpen: boolean;
  isCalendarOpen: boolean;
  isQuickSettingsOpen: boolean;
  isNightLight: boolean;
  env: SystemEnvironment;
  errors: ErrorType[];
  bluescreen: boolean;
  enterWindowsMode: () => void;
  exitWindowsMode: () => void;
  openApp: (id: AppId) => void;
  closeApp: (id: AppId) => void;
  minimizeApp: (id: AppId) => void;
  maximizeApp: (id: AppId) => void;
  restoreApp: (id: AppId) => void;
  bringToFront: (id: AppId) => void;
  toggleApp: (id: AppId) => void;
  updatePosition: (id: AppId, pos: { x: number; y: number }) => void;
  setStartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCalendarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setQuickSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsNightLight: React.Dispatch<React.SetStateAction<boolean>>;
  triggerError: (appName: string) => void;
  dismissError: (index: number) => void;
  triggerBluescreen: () => void;
  dismissBluescreen: () => void;
}

const WindowsContext = createContext<WindowsContextValue | null>(null);

export function WindowsProvider({ children }: { children: React.ReactNode }) {
  const [isWindowsMode, setIsWindowsMode] = useState(false);
  const env = useSystemEnvironment(isWindowsMode);
  const [isStartOpen, setStartOpen] = useState(false);
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [isQuickSettingsOpen, setQuickSettingsOpen] = useState(false);
  const [isNightLight, setIsNightLight] = useState(false);
  const [activeAppId, setActiveAppId] = useState<AppId | null>(null);
  const [topZIndex, setTopZIndex] = useState(100);
  const [errors, setErrors] = useState<ErrorType[]>([]);
  const [bluescreen, setBluescreen] = useState(false);

  // Initialize all windows state
  const [windows, setWindows] = useState<Record<AppId, WindowState>>(() => {
    const initial: Partial<Record<AppId, WindowState>> = {};
    APP_REGISTRY.forEach((app, idx) => {
      initial[app.id] = {
        id: app.id,
        title: app.title,
        iconPath: app.iconPath,
        isOpen: false,
        isMinimized: false,
        isMaximized: false,
        position: { x: 70 + idx * 28, y: 50 + idx * 24 },
        size: app.defaultSize,
        zIndex: 10 + idx,
      };
    });
    return initial as Record<AppId, WindowState>;
  });

  // Check URL query on mount (?view=windows or #windows)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("view") === "windows" || window.location.hash === "#windows") {
        setIsWindowsMode(true);
      }
    }
  }, []);

  // Sync body and documentElement scroll locking when in Windows Mode
  const scrollPosRef = useRef(0);
  useEffect(() => {
    if (typeof document !== "undefined") {
      if (isWindowsMode) {
        scrollPosRef.current = window.scrollY;
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
        document.body.classList.add("windows-mode-active");
        document.documentElement.classList.add("windows-mode-active");
        window.scrollTo(0, 0);
      } else {
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
        document.body.classList.remove("windows-mode-active");
        document.documentElement.classList.remove("windows-mode-active");
        if (scrollPosRef.current > 0) {
          window.scrollTo(0, scrollPosRef.current);
        }
      }
    }
  }, [isWindowsMode]);

  const enterWindowsMode = useCallback(() => {
    setIsWindowsMode(true);
    setStartOpen(false);
    setCalendarOpen(false);
    setQuickSettingsOpen(false);
    // If no app is open, automatically open About Me to welcome the user
    setWindows((prev) => {
      const anyOpen = Object.values(prev).some((w) => w.isOpen);
      if (!anyOpen) {
        const screenW = typeof window !== "undefined" ? window.innerWidth : 1200;
        const screenH = typeof window !== "undefined" ? window.innerHeight : 800;
        const isSmall = screenW < 768;
        return {
          ...prev,
          about: {
            ...prev.about,
            isOpen: true,
            isMinimized: false,
            isMaximized: isSmall,
            zIndex: 101,
            position: {
              x: isSmall ? 0 : Math.max(20, (screenW - 780) / 2),
              y: isSmall ? 0 : Math.max(20, (screenH - 540) / 2),
            },
          },
        };
      }
      return prev;
    });
    setActiveAppId("about");
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", "?view=windows");
    }
  }, []);

  const exitWindowsMode = useCallback(() => {
    setIsWindowsMode(false);
    setStartOpen(false);
    setCalendarOpen(false);
    setQuickSettingsOpen(false);
    setBluescreen(false);
    if (typeof window !== "undefined") {
      const url = window.location.pathname;
      window.history.pushState(null, "", url);
    }
  }, []);

  const bringToFront = useCallback((id: AppId) => {
    setTopZIndex((current) => {
      const nextZ = current + 1;
      setWindows((prev) => {
        if (!prev[id]) return prev;
        return {
          ...prev,
          [id]: {
            ...prev[id],
            zIndex: nextZ,
            isMinimized: false,
          },
        };
      });
      setActiveAppId(id);
      return nextZ;
    });
  }, []);

  const openApp = useCallback((id: AppId) => {
    setStartOpen(false);
    setCalendarOpen(false);
    setQuickSettingsOpen(false);
    setTopZIndex((current) => {
      const nextZ = current + 1;
      setWindows((prev) => {
        const target = prev[id];
        if (!target) return prev;

        const screenW = typeof window !== "undefined" ? window.innerWidth : 1200;
        const screenH = typeof window !== "undefined" ? window.innerHeight : 800;
        const isSmall = screenW < 768;
        const initialX = isSmall ? 0 : Math.max(16, (screenW - target.size.width) / 2 + (Math.random() * 40 - 20));
        const initialY = isSmall ? 0 : Math.max(20, (screenH - target.size.height) / 2 - 20 + (Math.random() * 30 - 15));

        return {
          ...prev,
          [id]: {
            ...target,
            isOpen: true,
            isMinimized: false,
            isMaximized: isSmall ? true : target.isMaximized,
            zIndex: nextZ,
            position: target.isOpen && !isSmall ? target.position : { x: initialX, y: initialY },
          },
        };
      });
      setActiveAppId(id);
      return nextZ;
    });
  }, []);

  const closeApp = useCallback((id: AppId) => {
    setWindows((prev) => {
      if (!prev[id]) return prev;
      return {
        ...prev,
        [id]: {
          ...prev[id],
          isOpen: false,
          isMinimized: false,
          isMaximized: false,
        },
      };
    });
    setActiveAppId((curr) => (curr === id ? null : curr));
  }, []);

  const minimizeApp = useCallback((id: AppId) => {
    setWindows((prev) => {
      if (!prev[id]) return prev;
      return {
        ...prev,
        [id]: {
          ...prev[id],
          isMinimized: true,
        },
      };
    });
    setActiveAppId((curr) => (curr === id ? null : curr));
  }, []);

  const maximizeApp = useCallback((id: AppId) => {
    setWindows((prev) => {
      if (!prev[id]) return prev;
      return {
        ...prev,
        [id]: {
          ...prev[id],
          isMaximized: true,
          isMinimized: false,
        },
      };
    });
    bringToFront(id);
  }, [bringToFront]);

  const restoreApp = useCallback((id: AppId) => {
    setWindows((prev) => {
      if (!prev[id]) return prev;
      return {
        ...prev,
        [id]: {
          ...prev[id],
          isMaximized: false,
          isMinimized: false,
        },
      };
    });
    bringToFront(id);
  }, [bringToFront]);

  const toggleApp = useCallback((id: AppId) => {
    setStartOpen(false);
    setCalendarOpen(false);
    setQuickSettingsOpen(false);
    const target = windows[id];
    if (!target) return;

    if (!target.isOpen) {
      openApp(id);
    } else if (target.isMinimized) {
      bringToFront(id);
    } else if (activeAppId === id) {
      minimizeApp(id);
    } else {
      bringToFront(id);
    }
  }, [windows, activeAppId, openApp, bringToFront, minimizeApp]);

  const updatePosition = useCallback((id: AppId, pos: { x: number; y: number }) => {
    setWindows((prev) => {
      if (!prev[id]) return prev;
      return {
        ...prev,
        [id]: {
          ...prev[id],
          position: pos,
        },
      };
    });
  }, []);

  const triggerError = useCallback((appName: string) => {
    try {
      const audio = new Audio("/sounds/error.mp3");
      audio.play().catch(() => {});
    } catch {}
    setErrors((prev) => [...prev, { error: appName, index: Date.now() + Math.random() }]);
  }, []);

  const dismissError = useCallback((index: number) => {
    setErrors((prev) => prev.filter((e) => e.index !== index));
  }, []);

  const triggerBluescreen = useCallback(() => {
    setBluescreen(true);
  }, []);

  const dismissBluescreen = useCallback(() => {
    setBluescreen(false);
  }, []);

  const value = useMemo<WindowsContextValue>(() => ({
    isWindowsMode,
    windows,
    activeAppId,
    isStartOpen,
    isCalendarOpen,
    isQuickSettingsOpen,
    isNightLight,
    env,
    errors,
    bluescreen,
    enterWindowsMode,
    exitWindowsMode,
    openApp,
    closeApp,
    minimizeApp,
    maximizeApp,
    restoreApp,
    bringToFront,
    toggleApp,
    updatePosition,
    setStartOpen,
    setCalendarOpen,
    setQuickSettingsOpen,
    setIsNightLight,
    triggerError,
    dismissError,
    triggerBluescreen,
    dismissBluescreen,
  }), [
    isWindowsMode,
    windows,
    activeAppId,
    isStartOpen,
    isCalendarOpen,
    isQuickSettingsOpen,
    isNightLight,
    env,
    errors,
    bluescreen,
    enterWindowsMode,
    exitWindowsMode,
    openApp,
    closeApp,
    minimizeApp,
    maximizeApp,
    restoreApp,
    bringToFront,
    toggleApp,
    updatePosition,
    setStartOpen,
    setCalendarOpen,
    setQuickSettingsOpen,
    setIsNightLight,
    triggerError,
    dismissError,
    triggerBluescreen,
    dismissBluescreen,
  ]);

  return (
    <WindowsContext.Provider value={value}>
      {children}
    </WindowsContext.Provider>
  );
}

export function useWindows() {
  const context = useContext(WindowsContext);
  if (!context) {
    throw new Error("useWindows must be used within a WindowsProvider");
  }
  return context;
}
