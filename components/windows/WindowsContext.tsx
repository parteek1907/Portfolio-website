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
  {
    id: "calculator",
    title: "Calculator",
    description: "Windows 11 Standard Calculator with keyboard input and history",
    iconPath: "/icons/calculator.svg",
    iconBg: "bg-[#2b2b2b]",
    pinnedToTaskbar: true,
    pinnedToStart: true,
    category: "Tools",
    defaultSize: { width: 340, height: 520 },
  },
];

export function isDesktopSupported(): boolean {
  if (typeof window === "undefined") return true;

  // Viewport breakpoint: requires desktop/laptop width (>= 1024px) and height (>= 500px)
  const isSufficientSize = window.innerWidth >= 1024 && window.innerHeight >= 500;
  if (!isSufficientSize) return false;

  // Input capability check: purely coarse handheld devices in high-DPI scaling
  const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
  const hasCoarseOnly = window.matchMedia("(pointer: coarse)").matches && !hasFinePointer;

  if (hasCoarseOnly && window.innerWidth < 1280) {
    return false;
  }

  return true;
}

export function isOsHost(hostname?: string | null): boolean {
  if (!hostname) return false;
  const clean = hostname.toLowerCase().split(":")[0];
  return (
    clean === "os.parteekgarg.in" ||
    clean === "os.localhost" ||
    clean.startsWith("os.") ||
    clean.startsWith("os-")
  );
}

export type WindowsTheme = "dark" | "light";

export interface WindowsContextValue {
  isWindowsMode: boolean;
  isOsSubdomain: boolean;
  windows: Record<AppId, WindowState>;
  activeAppId: AppId | null;
  isStartOpen: boolean;
  isCalendarOpen: boolean;
  isQuickSettingsOpen: boolean;
  isNightLight: boolean;
  windowsTheme: WindowsTheme;
  setWindowsTheme: (theme: WindowsTheme) => void;
  toggleWindowsTheme: () => void;
  env: SystemEnvironment;
  errors: ErrorType[];
  bluescreen: boolean;
  isDesktopRequiredModalOpen: boolean;
  openDesktopRequiredModal: () => void;
  closeDesktopRequiredModal: () => void;
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
  const isOsSubdomain = useMemo(() => {
    if (typeof window === "undefined") return false;
    const hostname = window.location.hostname.toLowerCase();
    const params = new URLSearchParams(window.location.search);
    return isOsHost(hostname) || params.get("subdomain") === "os";
  }, []);
  const env = useSystemEnvironment(isWindowsMode);
  const [windowsTheme, setWindowsThemeState] = useState<WindowsTheme>("dark");
  const [isStartOpen, setStartOpen] = useState(false);
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [isQuickSettingsOpen, setQuickSettingsOpen] = useState(false);
  const [isNightLight, setIsNightLight] = useState(false);
  const [activeAppId, setActiveAppId] = useState<AppId | null>(null);
  const [, setTopZIndex] = useState(100);
  const [errors, setErrors] = useState<ErrorType[]>([]);
  const [bluescreen, setBluescreen] = useState(false);
  const [isDesktopRequiredModalOpen, setIsDesktopRequiredModalOpen] = useState(false);

  const openDesktopRequiredModal = useCallback(() => {
    setIsDesktopRequiredModalOpen(true);
  }, []);

  const closeDesktopRequiredModal = useCallback(() => {
    setIsDesktopRequiredModalOpen(false);
  }, []);

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

  // Check hostname and URL query on mount (os.parteekgarg.in, ?view=windows, #windows)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const hostname = window.location.hostname.toLowerCase();
    const params = new URLSearchParams(window.location.search);
    const isOs = isOsHost(hostname) || params.get("subdomain") === "os";

    const hasOsQuery =
      params.get("view") === "windows" ||
      params.get("os") === "true" ||
      window.location.hash === "#windows";

    if (isOs || hasOsQuery) {
      if (isDesktopSupported()) {
        setIsWindowsMode(true);
        // If entering direct OS view, auto-open About Me if no other window is open
        setWindows((prev) => {
          const anyOpen = Object.values(prev).some((w) => w.isOpen);
          if (!anyOpen) {
            const screenW = window.innerWidth;
            const screenH = window.innerHeight;
            return {
              ...prev,
              about: {
                ...prev.about,
                isOpen: true,
                isMinimized: false,
                isMaximized: false,
                zIndex: 101,
                position: {
                  x: Math.max(20, (screenW - 780) / 2),
                  y: Math.max(20, (screenH - 540) / 2),
                },
              },
            };
          }
          return prev;
        });
        setActiveAppId("about");
      } else {
        // Mobile / unsupported device restriction intact
        if (hasOsQuery && !isOs) {
          const cleanUrl = window.location.pathname;
          window.history.replaceState(null, "", cleanUrl);
        }
        setIsDesktopRequiredModalOpen(true);
      }
    }

    try {
      const savedTheme = localStorage.getItem("parteek_os_theme") as WindowsTheme | null;
      if (savedTheme === "light" || savedTheme === "dark") {
        setWindowsThemeState(savedTheme);
      }
    } catch {}
  }, []);

  const setWindowsTheme = useCallback((theme: WindowsTheme) => {
    setWindowsThemeState(theme);
    try {
      localStorage.setItem("parteek_os_theme", theme);
    } catch {}
  }, []);

  const toggleWindowsTheme = useCallback(() => {
    setWindowsThemeState((prev) => {
      const nextTheme: WindowsTheme = prev === "dark" ? "light" : "dark";
      try {
        localStorage.setItem("parteek_os_theme", nextTheme);
      } catch {}
      return nextTheme;
    });
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
    if (!isDesktopSupported()) {
      setIsDesktopRequiredModalOpen(true);
      return;
    }
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
        return {
          ...prev,
          about: {
            ...prev.about,
            isOpen: true,
            isMinimized: false,
            isMaximized: false,
            zIndex: 101,
            position: {
              x: Math.max(20, (screenW - 780) / 2),
              y: Math.max(20, (screenH - 540) / 2),
            },
          },
        };
      }
      return prev;
    });
    setActiveAppId("about");
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname.toLowerCase();
      if (!isOsHost(hostname)) {
        window.history.pushState(null, "", "?view=windows");
      }
    }
  }, []);

  const exitWindowsMode = useCallback(() => {
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname.toLowerCase();
      // If directly on OS subdomain, shutting down returns to main portfolio domain
      if (isOsHost(hostname)) {
        const rootHost = window.location.host.replace(/^os\./i, "").replace(/^os-/i, "");
        const targetUrl = window.location.protocol + "//" + (rootHost || "parteekgarg.in");
        window.location.href = targetUrl;
        return;
      }
    }

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

  // If user resizes below supported desktop breakpoint while in Windows Mode, exit safely
  useEffect(() => {
    if (!isWindowsMode) return;

    const handleResize = () => {
      if (!isDesktopSupported()) {
        setIsWindowsMode(false);
        setIsDesktopRequiredModalOpen(true);
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [isWindowsMode]);

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
    isOsSubdomain,
    windows,
    activeAppId,
    isStartOpen,
    isCalendarOpen,
    isQuickSettingsOpen,
    isNightLight,
    windowsTheme,
    setWindowsTheme,
    toggleWindowsTheme,
    env,
    errors,
    bluescreen,
    isDesktopRequiredModalOpen,
    openDesktopRequiredModal,
    closeDesktopRequiredModal,
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
    isOsSubdomain,
    windows,
    activeAppId,
    isStartOpen,
    isCalendarOpen,
    isQuickSettingsOpen,
    isNightLight,
    windowsTheme,
    setWindowsTheme,
    toggleWindowsTheme,
    env,
    errors,
    bluescreen,
    isDesktopRequiredModalOpen,
    openDesktopRequiredModal,
    closeDesktopRequiredModal,
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
