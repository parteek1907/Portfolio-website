"use client";

import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export function EdgeIcon({ size = 32, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
      <defs>
        <linearGradient id="edgeG1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0c80df" />
          <stop offset="100%" stopColor="#0fb7d4" />
        </linearGradient>
        <linearGradient id="edgeG2" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1be0a1" />
          <stop offset="100%" stopColor="#00b46e" />
        </linearGradient>
      </defs>
      <path
        d="M50 10C27.9 10 10 27.9 10 50c0 15.3 8.6 28.6 21.2 35.3-2-5.7-2.7-12-1.7-18.3 1.8-11.4 8.7-21.2 18.2-26.4 5.9-3.2 12.8-4.6 19.6-4.6 9.3 0 18.3 2.8 25.8 8.1 4.5-9.3 6.9-19.8 6.9-30.8 0-1.1-.1-2.2-.2-3.3C88.6 20.3 70.8 10 50 10z"
        fill="url(#edgeG1)"
      />
      <path
        d="M90 50c0 22.1-17.9 40-40 40-8.9 0-17.1-2.9-23.8-7.8 7.3 1.8 15.1 1.6 22.6-.7 13.8-4.2 24.2-15.4 27.1-29.5.8-3.9 1.1-7.8.9-11.7C84.7 43.1 90 46.2 90 50z"
        fill="url(#edgeG2)"
      />
    </svg>
  );
}

export function GetStartedIcon({ size = 32, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="gsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0078D4" />
          <stop offset="100%" stopColor="#00b4f0" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="20" fill="url(#gsGrad)" />
      <path d="M24 10l4.2 9.8 9.8 4.2-9.8 4.2-4.2 9.8-4.2-9.8-9.8-4.2 9.8-4.2L24 10z" fill="#ffffff" />
    </svg>
  );
}

export function TaskManagerIcon({ size = 32, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <rect x="6" y="8" width="36" height="32" rx="5" fill="#1b2a38" stroke="#0078D4" strokeWidth="2.5" />
      <path d="M10 28l6.5-11 6 13 6.5-15 8 13" stroke="#00d68f" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MailIcon({ size = 32, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <rect x="5" y="11" width="38" height="26" rx="4" fill="#0078D4" />
      <path d="M5 14l19 12 19-12" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 35l12-10M41 35l-12-10" stroke="#ffffff" strokeWidth="2" strokeOpacity="0.45" strokeLinecap="round" />
    </svg>
  );
}

export function SettingsIcon({ size = 32, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <circle cx="24" cy="24" r="8" fill="#0078D4" />
      <path
        d="M24 4v5m0 30v5M4 24h5m30 0h5m-7.2-14.8l-3.5 3.5m-20.6 20.6l-3.5 3.5m0-27.6l3.5 3.5m20.6 20.6l3.5 3.5"
        stroke="#4cc2ff"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <circle cx="24" cy="24" r="14.5" stroke="#7a8b9e" strokeWidth="3.2" fill="none" />
    </svg>
  );
}

export function StoreIcon({ size = 32, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M8 17h32l-2 23H10L8 17z" fill="#0078D4" />
      <path d="M17 17v-4a7 7 0 0114 0v4" stroke="#005A9E" strokeWidth="3" fill="none" />
      <rect x="18" y="25" width="5" height="5" fill="#F25022" />
      <rect x="25" y="25" width="5" height="5" fill="#7FBA00" />
      <rect x="18" y="32" width="5" height="5" fill="#00A4EF" />
      <rect x="25" y="32" width="5" height="5" fill="#FFB900" />
    </svg>
  );
}

export function UnescapeIcon({ size = 32, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <rect x="6" y="9" width="36" height="30" rx="7" fill="#107C41" />
      <circle cx="16" cy="24" r="4.5" fill="#ffffff" />
      <path d="M31 19v10M26 24h10" stroke="#ffffff" strokeWidth="2.8" strokeLinecap="round" />
    </svg>
  );
}

export function BuyCoffeeIcon({ size = 32, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <rect x="6" y="8" width="36" height="32" rx="7" fill="#FFDD00" />
      <path d="M14 18h16v10a6 6 0 01-6 6h-4a6 6 0 01-6-6V18z" fill="#000000" />
      <path d="M30 20h3a3 3 0 013 3v2a3 3 0 01-3 3h-3" stroke="#000000" strokeWidth="2.2" fill="none" />
      <path d="M17 13.5c1 1.8-1 2.8 0 3.8M22 13.5c1 1.8-1 2.8 0 3.8M27 13.5c1 1.8-1 2.8 0 3.8" stroke="#000000" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function WhiteboardIcon({ size = 32, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <rect x="6" y="10" width="36" height="28" rx="5" fill="#0078D4" />
      <rect x="10" y="14" width="28" height="20" rx="2.5" fill="#ffffff" />
      <path d="M14 26c3-4 6-1 10-3s6 1 9-2" stroke="#0078D4" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export function CalculatorIcon({ size = 32, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <rect x="8" y="4" width="32" height="40" rx="5" fill="#71767C" />
      <rect x="12" y="7.5" width="24" height="8.5" rx="1.8" fill="#38BDF8" />
      <rect x="12" y="19" width="6.5" height="4.5" rx="1.2" fill="#E1E4E8" />
      <rect x="20.75" y="19" width="6.5" height="4.5" rx="1.2" fill="#E1E4E8" />
      <rect x="29.5" y="19" width="6.5" height="4.5" rx="1.2" fill="#E1E4E8" />
      <rect x="12" y="25" width="6.5" height="4.5" rx="1.2" fill="#E1E4E8" />
      <rect x="20.75" y="25" width="6.5" height="4.5" rx="1.2" fill="#E1E4E8" />
      <rect x="29.5" y="25" width="6.5" height="4.5" rx="1.2" fill="#E1E4E8" />
      <rect x="12" y="31" width="6.5" height="4.5" rx="1.2" fill="#E1E4E8" />
      <rect x="20.75" y="31" width="6.5" height="4.5" rx="1.2" fill="#E1E4E8" />
      <rect x="12" y="37" width="6.5" height="4.5" rx="1.2" fill="#E1E4E8" />
      <rect x="20.75" y="37" width="6.5" height="4.5" rx="1.2" fill="#E1E4E8" />
      <rect x="29.5" y="31" width="6.5" height="10.5" rx="1.5" fill="#005FB8" />
    </svg>
  );
}

export function TwitterIcon({ size = 32, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <circle cx="24" cy="24" r="20" fill="#1DA1F2" />
      <path
        d="M34 17.5a8.2 8.2 0 01-2.3.6 4.1 4.1 0 001.8-2.3 8.3 8.3 0 01-2.6 1 4.1 4.1 0 00-7 3.7A11.6 11.6 0 0115.5 16a4.1 4.1 0 001.3 5.5 4.1 4.1 0 01-1.9-.5v.1a4.1 4.1 0 003.3 4 4.1 4.1 0 01-1.8.1 4.1 4.1 0 003.8 2.9A8.3 8.3 0 0114 30.8 11.6 11.6 0 0020.3 32c7.5 0 11.7-6.2 11.7-11.7v-.5a8.3 8.3 0 002-2.3z"
        fill="#ffffff"
      />
    </svg>
  );
}

export function CameraIcon({ size = 32, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <rect x="6" y="14" width="36" height="24" rx="5" fill="#4a5568" />
      <path d="M16 14l2.5-4.5h11l2.5 4.5" fill="#2d3748" />
      <circle cx="24" cy="26" r="7.5" fill="#0078D4" />
      <circle cx="24" cy="26" r="4.5" fill="#1a202c" />
      <circle cx="35" cy="19" r="1.5" fill="#e53e3e" />
    </svg>
  );
}
