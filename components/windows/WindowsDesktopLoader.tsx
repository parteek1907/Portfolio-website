"use client";

import dynamic from "next/dynamic";
import { useWindows } from "@/components/windows/WindowsContext";

// Lazy-load the entire Windows Desktop environment only when Windows Mode is activated
const WindowsDesktop = dynamic(() => import("./WindowsDesktop"), {
  ssr: false,
  loading: () => null,
});

export default function WindowsDesktopLoader() {
  const { isWindowsMode } = useWindows();

  if (!isWindowsMode) {
    return null;
  }

  return <WindowsDesktop />;
}
