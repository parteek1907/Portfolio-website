"use client";

import { useState, useEffect, useCallback, useMemo } from "react";

export type DeviceType = "desktop" | "tablet" | "mobile";
export type PlatformType = "Windows" | "macOS" | "Linux" | "Android" | "iOS" | "ChromeOS" | "Unknown";

export interface BatteryState {
  isSupported: boolean;
  level: number; // 0 to 100
  charging: boolean;
  isRealData: boolean;
}

export interface NetworkState {
  isOnline: boolean;
  effectiveType: string | null;
  rtt?: number;
}

export interface SystemEnvironment {
  // 1. Clock & Locale
  now: Date;
  timeStr: string;
  dateStr: string;
  fullDateStr: string;
  timeZone: string;
  locale: string;
  languageBadge: string;

  // 2. Adaptive Display
  viewport: { width: number; height: number };
  deviceType: DeviceType;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  orientation: "landscape" | "portrait";
  dpr: number;
  isTouch: boolean;

  // 3. Platform Awareness
  platform: PlatformType;
  platformDetail: string;
  modifierKey: "⌘" | "Ctrl";
  fullscreenShortcut: string;

  // 4. System Preferences
  prefersReducedMotion: boolean;
  prefersColorScheme: "dark" | "light";

  // 5. Battery Status
  battery: BatteryState;

  // 6. Network Status
  network: NetworkState;

  // 7. Simulated Audio State
  audioVolume: number;
  isMuted: boolean;
  setAudioVolume: (volume: number) => void;
  toggleMute: () => void;
}

// Convert 2-letter language code to 3-letter Windows language badge
function getLanguageBadge(locale: string): string {
  const lang = locale.split("-")[0]?.toLowerCase() || "en";
  const map: Record<string, string> = {
    en: "ENG",
    hi: "HIN",
    es: "ESP",
    fr: "FRA",
    de: "DEU",
    zh: "ZHO",
    ja: "JPN",
    it: "ITA",
    pt: "POR",
    ru: "RUS",
    ar: "ARA",
    ko: "KOR",
    bn: "BEN",
    pa: "PAN",
    ur: "URD",
  };
  return map[lang] || lang.slice(0, 3).toUpperCase();
}

/**
 * Isolated live clock hook for the Windows Taskbar.
 * Prevents re-rendering the entire OS/website every second.
 */
export function useTaskbarClock(active: boolean = true, locale?: string, timeZone?: string) {
  const [clockDate, setClockDate] = useState<Date>(() => new Date());

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setClockDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, [active]);

  const loc = locale || "en-US";

  const timeStr = useMemo(() => {
    try {
      return clockDate.toLocaleTimeString(loc, {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return clockDate.toLocaleTimeString();
    }
  }, [clockDate, loc]);

  const dateStr = useMemo(() => {
    try {
      return clockDate.toLocaleDateString(loc, {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      });
    } catch {
      return clockDate.toLocaleDateString();
    }
  }, [clockDate, loc]);

  const fullDateStr = useMemo(() => {
    try {
      return clockDate.toLocaleDateString(loc, {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return clockDate.toLocaleDateString();
    }
  }, [clockDate, loc]);

  return { clockDate, timeStr, dateStr, fullDateStr };
}

export function useSystemEnvironment(active: boolean = false): SystemEnvironment {
  const [mounted, setMounted] = useState(false);
  const [now] = useState<Date>(() => new Date());

  // Display & Viewport
  const [viewport, setViewport] = useState({ width: 1200, height: 800 });
  const [dpr, setDpr] = useState(1);
  const [isTouch, setIsTouch] = useState(false);
  const [orientation, setOrientation] = useState<"landscape" | "portrait">("landscape");

  // Platform
  const [platform, setPlatform] = useState<PlatformType>("Windows");
  const [platformDetail, setPlatformDetail] = useState("Windows PC");

  // Preferences
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [prefersColorScheme, setPrefersColorScheme] = useState<"dark" | "light">("dark");

  // Battery
  const [battery, setBattery] = useState<BatteryState>({
    isSupported: false,
    level: 100,
    charging: true,
    isRealData: false,
  });

  // Network
  const [isOnline, setIsOnline] = useState(true);
  const [networkInfo, setNetworkInfo] = useState<{ effectiveType: string | null; rtt?: number }>({
    effectiveType: null,
  });

  // Simulated Portfolio Audio (for System Tray Quick Settings)
  const [audioVolume, setAudioVolumeState] = useState(80);
  const [isMuted, setIsMuted] = useState(false);

  const setAudioVolume = useCallback((val: number) => {
    setAudioVolumeState(Math.max(0, Math.min(100, val)));
    if (val > 0) setIsMuted(false);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 1. Viewport, DPR, Orientation & Touch Detection (Only when Windows Mode is active)
  useEffect(() => {
    if (typeof window === "undefined" || !active) return;

    const updateDisplayMetrics = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const currentDpr = window.devicePixelRatio || 1;
      const isPortrait = window.matchMedia("(orientation: portrait)").matches;
      const touchSupported =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        (navigator as any).msMaxTouchPoints > 0;

      setViewport({ width, height });
      setDpr(currentDpr);
      setIsTouch(touchSupported);
      setOrientation(isPortrait ? "portrait" : "landscape");
    };

    updateDisplayMetrics();

    window.addEventListener("resize", updateDisplayMetrics, { passive: true });
    window.addEventListener("orientationchange", updateDisplayMetrics, { passive: true });

    let orientationMql: MediaQueryList | null = null;
    try {
      orientationMql = window.matchMedia("(orientation: portrait)");
      orientationMql.addEventListener("change", updateDisplayMetrics);
    } catch {}

    return () => {
      window.removeEventListener("resize", updateDisplayMetrics);
      window.removeEventListener("orientationchange", updateDisplayMetrics);
      if (orientationMql) {
        orientationMql.removeEventListener("change", updateDisplayMetrics);
      }
    };
  }, [active]);

  // 2. Platform Detection (Only when Windows Mode is active)
  useEffect(() => {
    if (typeof navigator === "undefined" || !active) return;

    let detected: PlatformType = "Windows";
    let detail = "Windows PC";

    try {
      const uad = (navigator as any).userAgentData;
      if (uad?.platform) {
        const p = uad.platform.toLowerCase();
        if (p.includes("mac")) {
          detected = "macOS";
          detail = "macOS Device";
        } else if (p.includes("win")) {
          detected = "Windows";
          detail = "Windows PC";
        } else if (p.includes("android")) {
          detected = "Android";
          detail = "Android Mobile";
        } else if (p.includes("linux")) {
          detected = "Linux";
          detail = "Linux Workstation";
        } else if (p.includes("cros")) {
          detected = "ChromeOS";
          detail = "Chromebook";
        }
      } else {
        const ua = navigator.userAgent.toLowerCase();
        if (/iphone|ipad|ipod/.test(ua)) {
          detected = "iOS";
          detail = /ipad/.test(ua) ? "iPad" : "iPhone";
        } else if (/android/.test(ua)) {
          detected = "Android";
          detail = "Android Device";
        } else if (/macintosh|mac os x/.test(ua)) {
          detected = "macOS";
          detail = "macOS (Apple)";
        } else if (/windows nt|win32|win64/.test(ua)) {
          detected = "Windows";
          detail = "Windows 11/10";
        } else if (/cros/.test(ua)) {
          detected = "ChromeOS";
          detail = "ChromeOS";
        } else if (/linux/.test(ua)) {
          detected = "Linux";
          detail = "Linux OS";
        }
      }
    } catch {
      detected = "Windows";
      detail = "Personal Computer";
    }

    setPlatform(detected);
    setPlatformDetail(detail);
  }, [active]);

  // 3. System Preferences: Reduced Motion & Color Scheme
  useEffect(() => {
    if (typeof window === "undefined" || !active) return;

    let motionMql: MediaQueryList | null = null;
    let colorMql: MediaQueryList | null = null;

    try {
      motionMql = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(motionMql.matches);
      const handleMotion = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      motionMql.addEventListener("change", handleMotion);

      colorMql = window.matchMedia("(prefers-color-scheme: dark)");
      setPrefersColorScheme(colorMql.matches ? "dark" : "light");
      const handleColor = (e: MediaQueryListEvent) => setPrefersColorScheme(e.matches ? "dark" : "light");
      colorMql.addEventListener("change", handleColor);

      return () => {
        motionMql?.removeEventListener("change", handleMotion);
        colorMql?.removeEventListener("change", handleColor);
      };
    } catch {}
  }, [active]);

  // 4. Battery Status API (Only when Windows Mode is active)
  useEffect(() => {
    if (typeof navigator === "undefined" || !active) return;

    let batteryManager: any = null;
    let isCancelled = false;

    if ("getBattery" in navigator && typeof (navigator as any).getBattery === "function") {
      try {
        (navigator as any)
          .getBattery()
          .then((b: any) => {
            if (isCancelled || !b) return;
            batteryManager = b;

            const syncBattery = () => {
              setBattery({
                isSupported: true,
                level: Math.round((b.level ?? 1) * 100),
                charging: Boolean(b.charging),
                isRealData: true,
              });
            };

            syncBattery();

            b.addEventListener("levelchange", syncBattery);
            b.addEventListener("chargingchange", syncBattery);
          })
          .catch(() => {
            setBattery({
              isSupported: false,
              level: 100,
              charging: true,
              isRealData: false,
            });
          });
      } catch {
        setBattery({
          isSupported: false,
          level: 100,
          charging: true,
          isRealData: false,
        });
      }
    }

    return () => {
      isCancelled = true;
      if (batteryManager) {
        try {
          batteryManager.removeEventListener("levelchange", () => {});
          batteryManager.removeEventListener("chargingchange", () => {});
        } catch {}
      }
    };
  }, [active]);

  // 5. Network Status (Only when Windows Mode is active)
  useEffect(() => {
    if (typeof window === "undefined" || typeof navigator === "undefined" || !active) return;

    setIsOnline(navigator.onLine);

    const updateNetwork = () => {
      const conn = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
      if (conn) {
        setNetworkInfo({
          effectiveType: conn.effectiveType || null,
          rtt: conn.rtt,
        });
      }
    };

    updateNetwork();

    const handleOnline = () => {
      setIsOnline(true);
      updateNetwork();
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    const conn = (navigator as any).connection;
    if (conn && typeof conn.addEventListener === "function") {
      conn.addEventListener("change", updateNetwork);
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      if (conn && typeof conn.removeEventListener === "function") {
        conn.removeEventListener("change", updateNetwork);
      }
    };
  }, [active]);

  // Locale & TimeZone determination
  const { locale, timeZone, languageBadge } = useMemo(() => {
    let loc = "en-US";
    let tz = "UTC";
    if (typeof navigator !== "undefined" && navigator.language) {
      loc = navigator.language;
    }
    if (typeof Intl !== "undefined" && typeof Intl.DateTimeFormat === "function") {
      try {
        tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
      } catch {}
    }
    return {
      locale: loc,
      timeZone: tz,
      languageBadge: getLanguageBadge(loc),
    };
  }, []);

  const timeStr = useMemo(() => {
    if (!mounted) return "12:00 PM";
    try {
      return now.toLocaleTimeString(locale, {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return now.toLocaleTimeString();
    }
  }, [now, locale, mounted]);

  const dateStr = useMemo(() => {
    if (!mounted) return "1/1/2026";
    try {
      return now.toLocaleDateString(locale, {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      });
    } catch {
      return now.toLocaleDateString();
    }
  }, [now, locale, mounted]);

  const fullDateStr = useMemo(() => {
    if (!mounted) return "";
    try {
      return now.toLocaleDateString(locale, {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return now.toLocaleDateString();
    }
  }, [now, locale, mounted]);

  // Derived device classifications
  const isMobile = viewport.width < 640;
  const isTablet = viewport.width >= 640 && viewport.width < 1024;
  const isDesktop = viewport.width >= 1024;
  const deviceType: DeviceType = isMobile ? "mobile" : isTablet ? "tablet" : "desktop";

  const modifierKey: "⌘" | "Ctrl" = platform === "macOS" || platform === "iOS" ? "⌘" : "Ctrl";
  const fullscreenShortcut =
    platform === "macOS" ? "⌃⌘F" : isTouch ? "Tap for Fullscreen" : "F11";

  return {
    now,
    timeStr,
    dateStr,
    fullDateStr,
    timeZone,
    locale,
    languageBadge,
    viewport,
    deviceType,
    isMobile,
    isTablet,
    isDesktop,
    orientation,
    dpr,
    isTouch,
    platform,
    platformDetail,
    modifierKey,
    fullscreenShortcut,
    prefersReducedMotion,
    prefersColorScheme,
    battery,
    network: {
      isOnline,
      effectiveType: networkInfo.effectiveType,
      rtt: networkInfo.rtt,
    },
    audioVolume,
    isMuted,
    setAudioVolume,
    toggleMute,
  };
}
