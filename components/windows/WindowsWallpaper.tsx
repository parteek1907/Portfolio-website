"use client";

import React from "react";

export default function WindowsWallpaper() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none bg-[#0a0b10]">
      {/* Deep Obsidian / Dark Charcoal Mesh Base */}
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 40%, #151a2d 0%, #0d101c 50%, #08090d 100%)",
        }}
      />

      {/* Windows 11 Dark Bloom - Organic Fluid Shapes */}
      <svg
        className="absolute inset-0 w-full h-full opacity-65 mix-blend-screen"
        viewBox="0 0 1920 1080"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="bloom-blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="90" />
          </filter>
          <linearGradient id="azure-glow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0078D4" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#4f46e5" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="indigo-petal" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="cyan-highlight" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Central Bloom Flower Form */}
        <g filter="url(#bloom-blur)">
          <path
            d="M960 380 C1120 220 1380 340 1280 560 C1200 740 980 820 960 840 C940 820 720 740 640 560 C540 340 800 220 960 380 Z"
            fill="url(#azure-glow)"
          />
          <path
            d="M880 480 C740 320 620 460 700 640 C760 760 920 800 960 820 C880 720 820 580 880 480 Z"
            fill="url(#indigo-petal)"
          />
          <path
            d="M1040 480 C1180 320 1300 460 1220 640 C1160 760 1000 800 960 820 C1040 720 1100 580 1040 480 Z"
            fill="url(#cyan-highlight)"
          />
        </g>
      </svg>

      {/* Subtle Noise / Ambient Texture */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
    </div>
  );
}
