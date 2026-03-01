"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    // Strictly enforce dark mode
    const theme: Theme = "dark";

    useEffect(() => {
        // Enforce dark class on mount
        const root = window.document.documentElement;
        root.classList.remove("light");
        root.classList.add("dark");
        // Optional: clear potential garbage from storage or just ignore it
        localStorage.setItem("theme", "dark");
    }, []);

    const toggleTheme = () => {
        // No-op: Theme is permanently dark
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
