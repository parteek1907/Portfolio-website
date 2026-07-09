"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function StudentIdCard() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    
    const sceneRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const lightRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!sceneRef.current || !cardRef.current || !lightRef.current) return;

        let animationFrame: number;
        let startTime = performance.now();

        // Physics constants
        const initialY = -250; // Drop from 250px above
        const yDamping = 0.0015;
        const yFreq = 0.005;

        const initialAngle = Math.PI / 4; // Start at 45 degrees
        const angleDamping = 0.0012;
        const angleFreq = 0.0035;

        const idleFreq = 0.001;
        const idleAmplitude = (Math.PI / 180) * 1.5; // +/- 1.5 degrees

        // Card specs (Updated to match premium mockup proportions)
        const cardWidth = 300;
        const cardHeight = 440;
        
        // Attachment points (Ropes attach to the single top-center clip)
        const clipWidth = 30;
        const attachX = clipWidth / 2 - 2; // Ropes attach slightly inside the clip edges
        const attachY = -cardHeight / 2 - 8; // Ropes attach above the card edge

        const updateDOM = (currentTime: number) => {
            const t = Math.max(0, currentTime - startTime);

            // Damped harmonic oscillator for entrance drop
            const yOffset = initialY * Math.exp(-yDamping * t) * Math.cos(yFreq * t);
            
            // Damped harmonic oscillator for swing + continuous idle sway
            const entranceAngle = initialAngle * Math.exp(-angleDamping * t) * Math.cos(angleFreq * t);
            const idleAngle = idleAmplitude * Math.sin(idleFreq * t);
            const angle = entranceAngle + idleAngle;

            // Update Card Transform
            if (cardRef.current) {
                cardRef.current.style.transform = `translate3d(-50%, calc(-50% + ${yOffset}px), 0) rotate(${angle}rad)`;
            }

            // Update dynamic lighting reflection based on angle
            if (lightRef.current) {
                const degree = angle * (180 / Math.PI);
                const lightPosition = 50 + (degree * 2); 
                lightRef.current.style.backgroundPosition = `${lightPosition}% 50%`;
            }

            // Update SVG Ropes
            if (sceneRef.current) {
                const width = sceneRef.current.clientWidth;
                const height = sceneRef.current.clientHeight;
                
                // Card absolute center
                const cardCenterX = width / 2;
                const cardCenterY = height / 2 + yOffset;

                // Anchor points on the ceiling
                const anchorY = -50;
                const anchorLeftX = width / 2 - 40;
                const anchorRightX = width / 2 + 40;

                const svg = sceneRef.current.querySelector('svg');
                if (svg) {
                    const line1 = svg.querySelector('#line1');
                    const line2 = svg.querySelector('#line2');
                    
                    const cosA = Math.cos(angle);
                    const sinA = Math.sin(angle);
                    
                    // Left attachment point rotated
                    if (line1) {
                        const ptLeftX = cardCenterX + (-attachX) * cosA - (attachY) * sinA;
                        const ptLeftY = cardCenterY + (-attachX) * sinA + (attachY) * cosA;
                        line1.setAttribute('x1', anchorLeftX.toString());
                        line1.setAttribute('y1', anchorY.toString());
                        line1.setAttribute('x2', ptLeftX.toString());
                        line1.setAttribute('y2', ptLeftY.toString());
                    }
                    
                    // Right attachment point rotated
                    if (line2) {
                        const ptRightX = cardCenterX + (attachX) * cosA - (attachY) * sinA;
                        const ptRightY = cardCenterY + (attachX) * sinA + (attachY) * cosA;
                        line2.setAttribute('x1', anchorRightX.toString());
                        line2.setAttribute('y1', anchorY.toString());
                        line2.setAttribute('x2', ptRightX.toString());
                        line2.setAttribute('y2', ptRightY.toString());
                    }
                }
            }

            animationFrame = requestAnimationFrame(updateDOM);
        };
        
        animationFrame = requestAnimationFrame(updateDOM);

        return () => {
            cancelAnimationFrame(animationFrame);
        };
    }, []);

    if (!mounted) return <div className="relative w-full h-[600px]" />;

    const isLight = resolvedTheme === "light";

    return (
        <div 
            ref={sceneRef} 
            className="relative w-full h-[600px] overflow-visible z-50 pointer-events-none" 
        >
            {/* Ropes / Cords */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
                <defs>
                    <pattern id="braid" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                        <path d="M 0,0 L 0,4 M 2,0 L 2,4" stroke={isLight ? "#333" : "#111"} strokeWidth="0.8" />
                    </pattern>
                    <filter id="rope-shadow">
                        <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity={isLight ? "0.2" : "0.4"} floodColor="#000" />
                    </filter>
                </defs>
                <line id="line1" stroke={isLight ? "#2C2C2C" : "#1F1F1F"} strokeWidth="4" filter="url(#rope-shadow)" />
                <line id="line2" stroke={isLight ? "#2C2C2C" : "#1F1F1F"} strokeWidth="4" filter="url(#rope-shadow)" />
                <line id="line1-braid" stroke="url(#braid)" strokeWidth="4" />
                <line id="line2-braid" stroke="url(#braid)" strokeWidth="4" />
            </svg>

            {/* DOM Card */}
            <div 
                ref={cardRef} 
                className="absolute top-1/2 left-1/2 z-50 select-none pointer-events-none origin-center"
                style={{ 
                    width: '300px',
                    height: '440px',
                    transform: "translate3d(-50%, -50%, 0) rotate(0rad)",
                    willChange: "transform"
                }}
            >
                {/* Hardware Clip (Top Center) */}
                <div className="absolute top-[-10px] left-1/2 w-[34px] h-[28px] rounded-t-sm z-30 flex items-start justify-center" 
                     style={{ 
                        transform: "translateX(-50%)", 
                        background: isLight 
                            ? "linear-gradient(180deg, #F4F4F5 0%, #D4D4D8 100%)"
                            : "linear-gradient(180deg, #1A1A1A 0%, #0D0D0D 100%)",
                        boxShadow: isLight 
                            ? "inset 0 1px 1px rgba(255,255,255,1), 0 4px 6px rgba(0,0,0,0.15)"
                            : "inset 0 1px 1px rgba(255,255,255,0.1), 0 4px 6px rgba(0,0,0,0.6)",
                        border: isLight ? "1px solid #A1A1AA" : "1px solid #2A2A2A"
                     }}>
                    {/* Ring for lanyard */}
                    <div className="w-[18px] h-[6px] rounded-full border-2 mt-[2px] shadow-inner" 
                         style={{ 
                            borderColor: isLight ? "#999" : "#333",
                            backgroundColor: isLight ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"
                         }} />
                </div>

                {/* The ID Card Body */}
                <div 
                    className="absolute inset-0 w-full h-full overflow-hidden flex flex-col items-center"
                    style={{ 
                        borderRadius: "20px",
                        backgroundImage: isLight 
                            ? "linear-gradient(160deg, #FDFDFD 0%, #F0F0F0 100%)" 
                            : "linear-gradient(160deg, #1C1C1C 0%, #0A0A0A 100%)",
                        boxShadow: isLight 
                            ? "0 40px 80px -12px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -1px 0 rgba(0,0,0,0.05)"
                            : "0 40px 80px -12px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.5)",
                    }}
                >
                    {/* Glassy Overlay for reflection */}
                    <div 
                        ref={lightRef}
                        className="absolute inset-0 z-40 pointer-events-none mix-blend-overlay"
                        style={{
                            backgroundImage: isLight 
                                ? "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.7) 25%, transparent 35%)" 
                                : "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.12) 25%, transparent 35%)",
                            backgroundSize: "250% 100%",
                            backgroundPosition: "50% 50%",
                        }}
                    />

                    {/* Punched Hole for Clip */}
                    <div className="absolute top-[12px] left-1/2 w-[48px] h-[8px] rounded-full z-20" 
                         style={{ 
                            backgroundColor: isLight ? "#E5E5E5" : "#000", 
                            transform: "translateX(-50%)", 
                            boxShadow: isLight 
                                ? "inset 0 2px 4px rgba(0,0,0,0.15), 0 1px 0 rgba(255,255,255,1)"
                                : "inset 0 2px 4px rgba(0,0,0,0.8), 0 1px 0 rgba(255,255,255,0.1)" 
                         }} />
                    
                    {/* Full Size Profile Picture Background */}
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        <img 
                            src="/ProfilePic.JPG" 
                            alt="Parteek Garg" 
                            className="w-full h-full object-cover select-none pointer-events-none"
                            style={{ 
                                transform: "scale(1.15) translateY(-4%)",
                                filter: isLight ? "brightness(1.05) contrast(1.05)" : "brightness(0.9) contrast(1.1) saturate(0.8)",
                            }} 
                        />
                    </div>

                    <div className="flex-grow flex flex-col items-center justify-end w-full p-3 pb-4 z-10 relative">
                        {/* Frosted Glass Text Box */}
                        <div className="w-full flex flex-col items-center justify-center px-5 py-4 rounded-xl backdrop-blur-xl"
                             style={{
                                 backgroundColor: isLight ? "rgba(255, 255, 255, 0.65)" : "rgba(20, 20, 20, 0.75)",
                                 border: isLight ? "1px solid rgba(255,255,255,0.6)" : "1px solid rgba(255,255,255,0.08)",
                                 boxShadow: isLight ? "0 8px 32px 0 rgba(0, 0, 0, 0.1)" : "0 8px 32px 0 rgba(0, 0, 0, 0.4)"
                             }}>
                            
                            {/* Name (Premium Serif) */}
                            <h3 className="text-[23px] font-bold tracking-normal mb-0.5 text-center" 
                                style={{ 
                                    color: isLight ? "#111" : "#F5F5F5", 
                                    fontFamily: "Georgia, 'Playfair Display', serif",
                                    textShadow: isLight ? "0 1px 2px rgba(255,255,255,0.8)" : "0 2px 4px rgba(0,0,0,0.6)"
                                }}>
                                Parteek Garg
                            </h3>
                            
                            {/* Course */}
                            <p className="text-[12px] font-medium text-center leading-snug" style={{ color: isLight ? "#333" : "#C4C4C4" }}>
                                B.Tech Computer Science<br />(Data Science)
                            </p>
                            
                            {/* Subtle Divider */}
                            <div className="w-full h-[1px] mt-3 mb-3" style={{ backgroundImage: isLight ? "linear-gradient(90deg, transparent, rgba(0,0,0,0.15), transparent)" : "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)" }} />
                            
                            {/* NMIMS Chandigarh Logo */}
                            <div className="flex items-center justify-center w-full">
                                <img 
                                    src="/nmimschandigarhnew.png" 
                                    alt="NMIMS Chandigarh" 
                                    className={`h-9 w-auto object-contain select-none pointer-events-none drop-shadow-sm ${isLight ? 'brightness-0' : 'brightness-0 invert opacity-90'}`} 
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
