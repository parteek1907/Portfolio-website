"use client";

import { useEffect } from "react";
import { useLoading } from "@/components/LoadingContext";

export default function ScrollLock() {
    const { isLoading } = useLoading();

    useEffect(() => {
        if (isLoading) {
            document.body.style.overflow = "hidden";
            window.scrollTo(0, 0);
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isLoading]);

    return null;
}
