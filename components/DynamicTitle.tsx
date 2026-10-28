"use client";

import { useEffect } from "react";
import { useWindows } from "@/components/windows/WindowsContext";

export default function DynamicTitle() {
    const { isWindowsMode } = useWindows();

    useEffect(() => {
        const titleActive = isWindowsMode ? "Parteek Garg | OS" : "Parteek Garg | Portfolio";
        const titleInactive = isWindowsMode ? "Parteek Garg | OS" : "The Journey Continues";

        document.title = document.hidden ? titleInactive : titleActive;

        const handleVisibilityChange = () => {
            document.title = document.hidden ? titleInactive : titleActive;
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            document.title = titleActive;
        };
    }, [isWindowsMode]);

    return null;
}
