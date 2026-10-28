import React from "react";

export type AppId =
  | "about"
  | "projects"
  | "skills"
  | "certifications"
  | "hackathons"
  | "github"
  | "resume"
  | "contact"
  | "terminal"
  | "calculator";

export interface ErrorType {
  error: string;
  index: number;
}

export interface WindowState {
  id: AppId;
  title: string;
  iconPath: string;
  icon?: React.ComponentType<{ className?: string; size?: number }>;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

export interface DesktopAppDef {
  id: AppId;
  title: string;
  description: string;
  iconPath: string;
  iconBg: string;
  category: "Profile" | "Development" | "Credentials" | "Communication" | "Tools";
  pinnedToTaskbar?: boolean;
  pinnedToStart?: boolean;
  defaultSize: { width: number; height: number };
}
