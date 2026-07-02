"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

type LoadingContextType = {
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    hasPlayedIntro: boolean;
    setHasPlayedIntro: (played: boolean) => void;
};

const LoadingContext = createContext<LoadingContextType>({
    isLoading: true,
    setIsLoading: () => { },
    hasPlayedIntro: false,
    setHasPlayedIntro: () => { }
});

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const [hasPlayedIntro, setHasPlayedIntro] = useState(false);
    // On initial mount, we only show loading if on home page and intro hasn't played
    const [isLoading, setIsLoading] = useState(pathname === "/");

    useEffect(() => {
        if (pathname !== "/") {
            setIsLoading(false);
            // If they navigate away without seeing the intro, they skipped it
            setHasPlayedIntro(true); 
        }
    }, [pathname]);

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading, hasPlayedIntro, setHasPlayedIntro }}>
            {children}
        </LoadingContext.Provider>
    );
};
