"use client";

import React, { useMemo, useRef, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { motion } from "framer-motion";

// Default/Desktop Configuration
const DESKTOP_CONFIG = {
    particleCount: 450,
    connectionDist: 4,
    sphereRadius: 3.5,
    maxConnections: -1, // No limit
};

// Mobile Configuration
const MOBILE_CONFIG = {
    particleCount: 280,
    connectionDist: 3.0,
    sphereRadius: 2.3,
    maxConnections: 5,
};

interface CinematicNeuralBackgroundProps {
    onLoadComplete?: () => void;
    skipIntro?: boolean;
}

export default function CinematicNeuralBackground({ onLoadComplete, skipIntro = false }: CinematicNeuralBackgroundProps) {
    const [isMobile, setIsMobile] = useState(false);
    const [shouldSkip] = useState(() => {
        if (typeof window === 'undefined') return false;
        if (sessionStorage.getItem('skipHeroAnimation') === '1') {
            sessionStorage.removeItem('skipHeroAnimation');
            return true;
        }
        return false;
    });

    const effectiveSkip = skipIntro || shouldSkip;

    useEffect(() => {
        if (effectiveSkip && onLoadComplete) {
            onLoadComplete();
        }
    }, [effectiveSkip, onLoadComplete]);

    useEffect(() => {
        const checkMobile = () => {
            // Detect mobile by width
            const width = window.innerWidth;
            setIsMobile(width < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const config = isMobile ? MOBILE_CONFIG : DESKTOP_CONFIG;

    return (
        <div className="absolute inset-0 z-0 bg-black pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 12], fov: 60 }}
                dpr={isMobile ? 1 : [1, 2]}
                gl={{
                    antialias: !isMobile,
                    alpha: false,
                    powerPreference: "high-performance",
                    preserveDrawingBuffer: false,
                    stencil: false,
                    depth: false
                }}
            >
                <color attach="background" args={["#000000"]} />

                <group position={[0, isMobile ? 1.5 : 0, 0]}>
                    <NeuralScene
                        onLoadComplete={onLoadComplete}
                        config={config}
                        isMobile={isMobile}
                        skipIntro={effectiveSkip}
                    />
                </group>

                {/* Reduce effects on mobile */}
                {!isMobile && (
                    <fog attach="fog" args={["#050510", 8, 30]} />
                )}
                <ambientLight intensity={isMobile ? 0.8 : 0.5} />
            </Canvas>
        </div>
    );
}

function NeuralScene({
    onLoadComplete,
    config,
    isMobile,
    skipIntro
}: {
    onLoadComplete?: () => void,
    config: typeof DESKTOP_CONFIG,
    isMobile: boolean,
    skipIntro?: boolean
}) {
    const meshRef = useRef<THREE.Points>(null);
    const linesRef = useRef<THREE.LineSegments>(null);
    const { } = useThree();

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
            const scatterRadius = isMobile ? 20 : 35;
            // Generate a random point in a sphere for uniform scattering
            const uScatter = Math.random();
            const vScatter = Math.random();
            const thetaScatter = 2 * Math.PI * uScatter;
            const phiScatter = Math.acos(2 * vScatter - 1);
            const rScatter = scatterRadius * Math.cbrt(Math.random()); // Cubic root for uniform volume distribution

            const networkPos = new THREE.Vector3(
                rScatter * Math.sin(phiScatter) * Math.cos(thetaScatter),
                rScatter * Math.sin(phiScatter) * Math.sin(thetaScatter),
                rScatter * Math.cos(phiScatter)
            );

            // Velocity for infinite subtle float
            const speed = 0.02; // Base drift speed
            const velocity = new THREE.Vector3(
                (Math.random() - 0.5) * speed,
                (Math.random() - 0.5) * speed,
                (Math.random() - 0.5) * (speed * 0.5)
            );

            // Unique random stagger delay per particle (0 to 1) for the network scattering
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
        // Lower allocation for mobile safety
        const maxLines = config.particleCount * (isMobile ? 2 : 8);
        const positions = new Float32Array(maxLines * 2 * 3);
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        return geo;
    }, [config.particleCount, isMobile]);

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

        // Only use strict limits on mobile
        // On desktop (maxConnections = -1), we skip the array overhead
        const useConnectionLimit = isMobile && config.maxConnections > 0;
        const connectionsPerNode = useConnectionLimit ? new Int8Array(config.particleCount).fill(0) : null;

        // Optimization: Calculate threshold outside loop
        let thresh = 0;
        if (phase <= 2) {
            // Sphere phase
            thresh = isMobile ? 1.0 : 1.2;
        } else {
            // Network phase
            thresh = config.connectionDist;
        }

        // During the dissolve to network phase (3), gradually increase threshold
        // so lines fade in
        if (phase === 3) {
            const elapsedSincePhase3 = Date.now() - (startTime.current + 4000);
            const progress = Math.min(1, Math.max(0, elapsedSincePhase3 / 2000));
            // Start with tight sphere threshold, interpolate to wide network threshold
            const sphereThresh = isMobile ? 1.0 : 1.2;
            thresh = sphereThresh + (config.connectionDist - sphereThresh) * (progress * progress); // Ease-in
        }

        const threshSq = thresh * thresh;

        for (let i = 0; i < config.particleCount; i++) {
            if (useConnectionLimit && connectionsPerNode![i] >= config.maxConnections) continue;

            const xi = positions[i * 3];
            const yi = positions[i * 3 + 1];
            const zi = positions[i * 3 + 2];

            for (let j = i + 1; j < config.particleCount; j++) {
                if (useConnectionLimit && connectionsPerNode![j] >= config.maxConnections) continue;

                const xj = positions[j * 3];
                const yj = positions[j * 3 + 1];
                const zj = positions[j * 3 + 2];

                const dx = xi - xj;
                const dy = yi - yj;
                const dz = zi - zj;
                const distSq = dx * dx + dy * dy + dz * dz;

                if (distSq < threshSq) {
                    // Add line
                    linePositions[lineIndex * 3] = xi;
                    linePositions[lineIndex * 3 + 1] = yi;
                    linePositions[lineIndex * 3 + 2] = zi;

                    linePositions[lineIndex * 3 + 3] = xj;
                    linePositions[lineIndex * 3 + 4] = yj;
                    linePositions[lineIndex * 3 + 5] = zj;

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
        } else if (phase === 3 && elapsed > 6500) setPhase(4); // Extended dissolve window slightly

        const positions = meshRef.current.geometry.attributes.position.array as Float32Array;

        particles.forEach((p, i) => {
            if (phase === 1) {
                p.current.lerp(p.sphere, 0.03);
            } else if (phase === 2) {
                p.current.lerp(p.sphere, 0.1);
            } else if (phase === 3) {
                // Calculate progress of phase 3 from 0 to 1
                const phase3Elapsed = Math.max(0, elapsed - 4000);
                const phase3Total = 2500;
                let phaseProgress = phase3Elapsed / phase3Total;

                // Apply individual stagger delay to this particle
                // Particle starts moving ONLY after progress > its stagger threshold
                // Normalize the remaining progress from 0 to 1
                let adjustedProgress = 0;
                const staggerThreshold = p.staggerDelay * 0.5; // Up to halfway into the animation

                if (phaseProgress > staggerThreshold) {
                    adjustedProgress = (phaseProgress - staggerThreshold) / (1 - staggerThreshold);
                    // Ease-out cubic: faster start, slow finish
                    const easeOut = 1 - Math.pow(1 - adjustedProgress, 3);
                    // Calculate intended position
                    const targetPos = new THREE.Vector3().copy(p.sphere).lerp(p.network, easeOut);
                    // Directly move toward it
                    p.current.lerp(targetPos, 0.15); // Smooth pursuit
                }
            } else if (phase === 4) {
                p.current.add(p.velocity);
                const bounds = 30; // Increased to 30 to prevent snapping
                if (p.current.x > bounds) p.current.x = -bounds;
                if (p.current.x < -bounds) p.current.x = bounds;
                if (p.current.y > bounds) p.current.y = -bounds;
                if (p.current.y < -bounds) p.current.y = bounds;
            }

            positions[i * 3] = p.current.x;
            positions[i * 3 + 1] = p.current.y;
            positions[i * 3 + 2] = p.current.z;
        });
        meshRef.current.geometry.attributes.position.needsUpdate = true;

        // Rotation
        if (phase < 3) {
            meshRef.current.rotation.y += delta * 0.2;
            // Reduce X wobble on mobile
            const wobble = isMobile ? 0.05 : 0.1;
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * wobble;
        } else {
            meshRef.current.rotation.y += delta * 0.01;
        }

        if (linesRef.current) {
            linesRef.current.rotation.copy(meshRef.current.rotation);
        }

        updateLines();

    });

    return (
        <>
            <points ref={meshRef} geometry={pointGeometry}>
                <pointsMaterial
                    transparent
                    color="#8b5cf6"
                    size={isMobile ? 0.06 : 0.08} // Smaller dots on mobile
                    sizeAttenuation={true}
                    opacity={0.9}
                    blending={THREE.AdditiveBlending}
                />
            </points>
            <lineSegments ref={linesRef} geometry={lineGeometry}>
                <lineBasicMaterial
                    color="#6366f1"
                    transparent
                    opacity={isMobile ? 0.2 : 0.15} // Slightly brighter lines on mobile
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </lineSegments>
        </>
    );
}
