"use client";

import React, { useMemo, useRef, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Optimized configurations with balanced particle counts for 60fps+ performance
const DESKTOP_CONFIG = {
    particleCount: 220,
    connectionDist: 3.8,
    sphereRadius: 3.5,
    maxConnections: -1,
};

const MOBILE_CONFIG = {
    particleCount: 110,
    connectionDist: 2.6,
    sphereRadius: 2.3,
    maxConnections: -1,
};

interface CinematicNeuralBackgroundProps {
    onLoadComplete?: () => void;
    skipIntro?: boolean;
}

// Scratch vector to avoid allocating new Vector3 objects in the render loop
const scratchVec = new THREE.Vector3();

export default function CinematicNeuralBackground({ onLoadComplete, skipIntro = false }: CinematicNeuralBackgroundProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [isDark, setIsDark] = useState(true);
    const [isInView, setIsInView] = useState(true);
    const [isTabVisible, setIsTabVisible] = useState(true);
    const [reducedMotion, setReducedMotion] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile, { passive: true });
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Check reduced motion preference
    useEffect(() => {
        const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
        setReducedMotion(mql.matches);
        const handle = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
        mql.addEventListener("change", handle);
        return () => mql.removeEventListener("change", handle);
    }, []);

    // Observe theme
    useEffect(() => {
        const check = () => {
            setIsDark(document.documentElement.getAttribute("data-theme") !== "light");
        };
        check();
        const observer = new MutationObserver(check);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
        return () => observer.disconnect();
    }, []);

    // Pause WebGL rendering loop when off-screen to save CPU/GPU completely
    useEffect(() => {
        const el = containerRef.current;
        if (!el || typeof IntersectionObserver === "undefined") return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            { threshold: 0.05 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    // Pause rendering loop when tab is hidden
    useEffect(() => {
        const handleVisibility = () => {
            setIsTabVisible(!document.hidden);
        };
        document.addEventListener("visibilitychange", handleVisibility);
        return () => document.removeEventListener("visibilitychange", handleVisibility);
    }, []);

    const config = isMobile ? MOBILE_CONFIG : DESKTOP_CONFIG;
    const shouldRender = isInView && isTabVisible && !reducedMotion;

    return (
        <div 
            ref={containerRef}
            className="absolute inset-0 z-0 pointer-events-none" 
            style={{ backgroundColor: isDark ? "#1C1C1C" : "#F5F0EB" }}
        >
            <Canvas
                frameloop={shouldRender ? "always" : "never"}
                camera={{ position: [0, 0, 12], fov: 60 }}
                dpr={isMobile ? 1 : [1, 1.5]}
                gl={{
                    antialias: !isMobile,
                    alpha: false,
                    powerPreference: "high-performance",
                    preserveDrawingBuffer: false,
                    stencil: false,
                    depth: false
                }}
            >
                <color attach="background" args={[isDark ? "#1C1C1C" : "#F5F0EB"]} />

                <group position={[0, 0, 0]}>
                    <NeuralScene
                        onLoadComplete={onLoadComplete}
                        config={config}
                        isMobile={isMobile}
                        skipIntro={skipIntro}
                        isDark={isDark}
                    />
                </group>

                <fog attach="fog" args={[isDark ? "#1C1C1C" : "#F5F0EB", 8, 30]} />
                <ambientLight intensity={0.5} />
            </Canvas>
        </div>
    );
}

function NeuralScene({
    onLoadComplete,
    config,
    isMobile,
    skipIntro,
    isDark
}: {
    onLoadComplete?: () => void,
    config: typeof DESKTOP_CONFIG,
    isMobile: boolean,
    skipIntro?: boolean,
    isDark: boolean
}) {
    const meshRef = useRef<THREE.Points>(null);
    const linesRef = useRef<THREE.LineSegments>(null);
    const frameCount = useRef(0);

    // Phase: 0=Intro, 1=FormSphere, 2=HoldSphere, 3=DissolveToNetwork, 4=NetworkLoop
    const [phase, setPhase] = useState(skipIntro ? 4 : 0);
    const startTime = useRef(Date.now());

    // Generate targets based on dynamic config
    const { particles } = useMemo(() => {
        const temp = [];
        const phi = Math.PI * (3 - Math.sqrt(5));

        for (let i = 0; i < config.particleCount; i++) {
            // 1. Initial (Fly in from far)
            const range = 50;
            const initialPos = new THREE.Vector3(
                (Math.random() - 0.5) * range,
                (Math.random() - 0.5) * range,
                (Math.random() - 0.5) * range
            );
            initialPos.normalize().multiplyScalar(20 + Math.random() * 20);

            // 2. Sphere Target (Fibonacci)
            const y = 1 - (i / (config.particleCount - 1)) * 2;
            const radius = Math.sqrt(1 - y * y);
            const theta = phi * i;
            const spherePos = new THREE.Vector3(
                Math.cos(theta) * radius * config.sphereRadius,
                y * config.sphereRadius,
                Math.sin(theta) * radius * config.sphereRadius
            );

            // 3. Network Target (Uniform 3D scatter)
            const scatterRadius = isMobile ? 22 : 32;
            const uScatter = Math.random();
            const vScatter = Math.random();
            const thetaScatter = 2 * Math.PI * uScatter;
            const phiScatter = Math.acos(2 * vScatter - 1);
            const rScatter = scatterRadius * Math.cbrt(Math.random());

            const networkPos = new THREE.Vector3(
                rScatter * Math.sin(phiScatter) * Math.cos(thetaScatter),
                rScatter * Math.sin(phiScatter) * Math.sin(thetaScatter),
                rScatter * Math.cos(phiScatter)
            );

            // Velocity for infinite subtle float
            const speed = 0.018;
            const velocity = new THREE.Vector3(
                (Math.random() - 0.5) * speed,
                (Math.random() - 0.5) * speed,
                (Math.random() - 0.5) * (speed * 0.5)
            );

            const staggerDelay = Math.random();

            temp.push({
                current: skipIntro ? networkPos.clone() : initialPos.clone(),
                initial: initialPos,
                sphere: spherePos,
                network: networkPos,
                velocity: velocity,
                staggerDelay: staggerDelay
            });
        }
        return { particles: temp };
    }, [config.particleCount, config.sphereRadius, isMobile, skipIntro]);

    // Buffers
    const lineGeometry = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        const maxLines = config.particleCount * 6;
        const positions = new Float32Array(maxLines * 2 * 3);
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        return geo;
    }, [config.particleCount]);

    const pointGeometry = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        const positions = new Float32Array(config.particleCount * 3);
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        return geo;
    }, [config.particleCount]);

    const updateLines = useCallback(() => {
        if (!linesRef.current || !meshRef.current) return;

        const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
        const linePositions = linesRef.current.geometry.attributes.position.array as Float32Array;

        let lineIndex = 0;
        const useConnectionLimit = config.maxConnections > 0;
        const connectionsPerNode = useConnectionLimit ? new Int8Array(config.particleCount).fill(0) : null;

        let thresh = 0;
        if (phase <= 2) {
            thresh = isMobile ? 0.8 : 1.2;
        } else {
            thresh = config.connectionDist;
        }

        if (phase === 3) {
            const elapsedSincePhase3 = Date.now() - (startTime.current + 4000);
            const progress = Math.min(1, Math.max(0, elapsedSincePhase3 / 2000));
            const sphereThresh = isMobile ? 0.8 : 1.2;
            thresh = sphereThresh + (config.connectionDist - sphereThresh) * (progress * progress);
        }

        const threshSq = thresh * thresh;
        const count = config.particleCount;

        for (let i = 0; i < count; i++) {
            if (useConnectionLimit && connectionsPerNode![i] >= config.maxConnections) continue;

            const i3 = i * 3;
            const xi = positions[i3];
            const yi = positions[i3 + 1];
            const zi = positions[i3 + 2];

            for (let j = i + 1; j < count; j++) {
                if (useConnectionLimit && connectionsPerNode![j] >= config.maxConnections) continue;

                const j3 = j * 3;
                const xj = positions[j3];
                const yj = positions[j3 + 1];
                const zj = positions[j3 + 2];

                const dx = xi - xj;
                const dy = yi - yj;
                const dz = zi - zj;
                const distSq = dx * dx + dy * dy + dz * dz;

                if (distSq < threshSq) {
                    const lIdx3 = lineIndex * 3;
                    linePositions[lIdx3] = xi;
                    linePositions[lIdx3 + 1] = yi;
                    linePositions[lIdx3 + 2] = zi;

                    linePositions[lIdx3 + 3] = xj;
                    linePositions[lIdx3 + 4] = yj;
                    linePositions[lIdx3 + 5] = zj;

                    lineIndex += 2;

                    if (useConnectionLimit) {
                        connectionsPerNode![i]++;
                        connectionsPerNode![j]++;
                        if (connectionsPerNode![i] >= config.maxConnections) break;
                    }
                }
            }
        }

        // Clear remaining lines
        for (let k = lineIndex * 3; k < linePositions.length; k++) {
            linePositions[k] = 0;
        }

        linesRef.current.geometry.setDrawRange(0, lineIndex);
        linesRef.current.geometry.attributes.position.needsUpdate = true;
    }, [phase, config, isMobile]);

    useFrame((state, delta) => {
        if (!meshRef.current) return;

        const elapsed = Date.now() - startTime.current;

        if (phase === 0) setPhase(1);
        else if (phase === 1 && elapsed > 2000) setPhase(2);
        else if (phase === 2 && elapsed > 4000) {
            setPhase(3);
            if (onLoadComplete) onLoadComplete();
        } else if (phase === 3 && elapsed > 6500) setPhase(4);

        const positions = meshRef.current.geometry.attributes.position.array as Float32Array;

        particles.forEach((p, i) => {
            if (phase === 1) {
                p.current.lerp(p.sphere, 0.03);
            } else if (phase === 2) {
                p.current.lerp(p.sphere, 0.1);
            } else if (phase === 3) {
                const phase3Elapsed = Math.max(0, elapsed - 4000);
                const phase3Total = 2500;
                let phaseProgress = phase3Elapsed / phase3Total;

                const staggerThreshold = p.staggerDelay * 0.5;

                if (phaseProgress > staggerThreshold) {
                    const adjustedProgress = (phaseProgress - staggerThreshold) / (1 - staggerThreshold);
                    const easeOut = 1 - Math.pow(1 - adjustedProgress, 3);
                    scratchVec.copy(p.sphere).lerp(p.network, easeOut);
                    p.current.lerp(scratchVec, 0.15);
                }
            } else if (phase === 4) {
                p.current.add(p.velocity);
                const bounds = 28;
                if (p.current.x > bounds) p.current.x = -bounds;
                if (p.current.x < -bounds) p.current.x = bounds;
                if (p.current.y > bounds) p.current.y = -bounds;
                if (p.current.y < -bounds) p.current.y = bounds;
            }

            const i3 = i * 3;
            positions[i3] = p.current.x;
            positions[i3 + 1] = p.current.y;
            positions[i3 + 2] = p.current.z;
        });
        meshRef.current.geometry.attributes.position.needsUpdate = true;

        // Rotation
        if (phase < 3) {
            meshRef.current.rotation.y += delta * 0.2;
            const wobble = 0.1;
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * wobble;
        } else {
            meshRef.current.rotation.y += delta * 0.01;
        }

        if (linesRef.current) {
            linesRef.current.rotation.copy(meshRef.current.rotation);
        }

        // Throttle line updates during perpetual network drift (phase 4) to alternate frames
        if (phase === 4) {
            frameCount.current++;
            if (frameCount.current % 2 === 0) {
                updateLines();
            }
        } else {
            updateLines();
        }
    });

    return (
        <>
            <points ref={meshRef} geometry={pointGeometry}>
                <pointsMaterial
                    transparent
                    color={isDark ? "#EDEDED" : "#1A1A1A"}
                    size={0.08}
                    sizeAttenuation={true}
                    opacity={isDark ? 0.9 : 0.12}
                    blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
                />
            </points>
            <lineSegments ref={linesRef} geometry={lineGeometry}>
                <lineBasicMaterial
                    color={isDark ? "#A0A0A0" : "#1A1A1A"}
                    transparent
                    opacity={0.15}
                    blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
                    depthWrite={false}
                />
            </lineSegments>
        </>
    );
}
