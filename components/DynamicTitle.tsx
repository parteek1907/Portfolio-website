"use client";

import { useEffect, useRef } from "react";

const messages = [
    "Still Building Practical Systems",
    "Come Back — More Projects Await",
    "Building Software That Solves Real Problems",
    "Open Source • AI • Full Stack",
    "Let's Build Something Meaningful",
    "Your Next Developer Is Waiting",
    "Thanks For Visiting"
];

export default function DynamicTitle() {
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const indexRef = useRef(0);

    useEffect(() => {
        const originalTitle = "Parteek Garg — Portfolio";

        // Let Next.js SEO metadata set the initial title. 
        // We only modify it when visibility changes.

        const handleVisibilityChange = () => {
            if (document.hidden) {
                // User switched tabs - start rotating messages
                document.title = messages[indexRef.current];

                intervalRef.current = setInterval(() => {
                    indexRef.current = (indexRef.current + 1) % messages.length;
                    document.title = messages[indexRef.current];
                }, 3000);
            } else {
                // User returned - restore title and clean up
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                }
                document.title = originalTitle;
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        // Cleanup on unmount
        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            document.title = originalTitle;
        };
    }, []);

    return null;
}
