"use client";

import { useEffect } from "react";
import { useLoading } from "@/components/LoadingContext";
import { useLenis } from "lenis/react";

export default function ScrollLock() {
    const { isLoading } = useLoading();
    const lenis = useLenis();

    useEffect(() => {
        if (isLoading) {
            // Lock scroll and reset position
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
            
            // Force scroll to top
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;

            lenis?.stop();
            
            // Prevent scroll restoration
            if (window.history) {
                window.history.scrollRestoration = 'manual';
            }
        } else {
            // Unlock scroll
            document.body.style.overflow = "unset";
            document.documentElement.style.overflow = "unset";
            lenis?.start();
        }

        return () => {
            document.body.style.overflow = "unset";
            document.documentElement.style.overflow = "unset";
            lenis?.start();
        };
    }, [isLoading, lenis]);

    return null;
}
