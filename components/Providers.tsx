"use client";

import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider
            attribute="data-theme"
            defaultTheme="dark"
            themes={["light", "dark"]}
            enableSystem={false}
            disableTransitionOnChange={false}
            storageKey="theme"
        >
            {children}
        </ThemeProvider>
    );
}
