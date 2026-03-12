"use client";

import { useEffect } from "react";
import { useLoading } from "@/components/LoadingContext";

export default function ScrollLock() {
    const { isLoading } = useLoading();

    useEffect(() => {
        if (isLoading) {
            // Lock scroll and reset position
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
            
            // Force scroll to top
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
            
            // Prevent scroll restoration
            if (window.history) {
                window.history.scrollRestoration = 'manual';
            }
        } else {
            // Unlock scroll
            document.body.style.overflow = "unset";
            document.documentElement.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
            document.documentElement.style.overflow = "unset";
        };
    }, [isLoading]);

    return null;
}
