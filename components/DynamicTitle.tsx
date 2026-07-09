"use client";

import { useEffect } from "react";

export default function DynamicTitle() {
    useEffect(() => {
        const titleActive = "Parteek Garg — Portfolio";
        const titleInactive = "Come Back — More Projects Await";

        const handleVisibilityChange = () => {
            document.title = document.hidden ? titleInactive : titleActive;
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        // Cleanup on unmount
        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            document.title = titleActive;
        };
    }, []);

    return null;
}
