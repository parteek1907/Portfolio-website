"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";

export default function SmoothScrolling({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.05,
        duration: 1.5,
      }}
    >
      {children}
    </ReactLenis>
  );
}
