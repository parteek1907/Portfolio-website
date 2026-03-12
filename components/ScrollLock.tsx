"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLoading } from "@/components/LoadingContext";

export default function ScrollLock() {
    const { isLoading } = useLoading();
    const pathname = usePathname();
    const isHome = pathname === "/";

    useEffect(() => {
        if (isHome && isLoading) {
            document.body.style.overflow = "hidden";
            window.scrollTo(0, 0);
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isLoading, isHome]);

    return null;
}
