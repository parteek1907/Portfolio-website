"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";
import { useWindows } from "@/components/windows/WindowsContext";

export default function SmoothScrolling({ children }: { children: ReactNode }) {
  const { isWindowsMode } = useWindows();

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.05,
        duration: 1.5,
        prevent: (node) => {
          if (isWindowsMode) return true;
          return !!(node as HTMLElement)?.closest?.("[data-lenis-prevent]");
        },
      }}
    >
      {children}
    </ReactLenis>
  );
}
