"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

interface SpherePoint {
  x: number;
  y: number;
  z: number;
}

export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let spherePoints: SpherePoint[] = [];
    let animationFrameId: number;
    const mouse = { x: 0, y: 0 };
    let rotation = 0;

    // Configuration
    const particleCount = 180;
    const connectionDistance = 250;
    const mouseInfluenceRadius = 400;
    const baseColor = "100, 150, 255"; // Soft blue-ish white

    // Sphere Config
    const sphereRadius = 200;
    const spherePointCount = 80; // Low count for cleaner look
    const sphereRotationSpeed = 0.002;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
      initSphere();
    };

    const initParticles = () => {
      particles = [];
      const count = window.innerWidth < 768 ? 90 : window.innerWidth < 1024 ? 130 : particleCount;

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          size: Math.random() * 3 + 1.5,
        });
      }
    };

    const initSphere = () => {
      spherePoints = [];
      // Fibonacci Sphere Algorithm for even distribution
      const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

      for (let i = 0; i < spherePointCount; i++) {
        const y = 1 - (i / (spherePointCount - 1)) * 2; // y goes from 1 to -1
        const radius = Math.sqrt(1 - y * y); // radius at y

        const theta = phi * i; // golden angle increment

        const x = Math.cos(theta) * radius;
        const z = Math.sin(theta) * radius;

        spherePoints.push({ x: x * sphereRadius, y: y * sphereRadius, z: z * sphereRadius });
      }
    };

    const drawLine = (x1: number, y1: number, x2: number, y2: number, opacity: number) => {
      ctx.beginPath();
      ctx.strokeStyle = `rgba(${baseColor}, ${opacity})`;
      ctx.lineWidth = 1;
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw Background Particles (Neural Network)
      particles.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const isNearMouse = distance < mouseInfluenceRadius;

        if (distance < mouseInfluenceRadius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouseInfluenceRadius - distance) / mouseInfluenceRadius;
          const directionX = forceDirectionX * force * 0.5;
          const directionY = forceDirectionY * force * 0.5;
          p.x += directionX * 0.2;
          p.y += directionY * 0.2;
        }

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.fillStyle = `rgba(${baseColor}, 0.5)`;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
          if (dist < connectionDistance) {
            const opacityMultiplier = isNearMouse ? 1.5 : 1;
            const opacity = Math.max(0, 1 - dist / connectionDistance) * 0.4 * opacityMultiplier;
            drawLine(p.x, p.y, p2.x, p2.y, opacity);
          }
        }
      });

      // 2. Draw 3D Sphere
      rotation += sphereRotationSpeed;
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Rotate and Project Points
      const projectedPoints = spherePoints.map(p => {
        // Rotation (Y axis then X axis slightly)
        const x = p.x * Math.cos(rotation) - p.z * Math.sin(rotation);
        let z = p.x * Math.sin(rotation) + p.z * Math.cos(rotation);
        let y = p.y;

        // Slight X rotation for tilt
        const tilt = 0.5;
        const yNew = y * Math.cos(tilt) - z * Math.sin(tilt);
        const zNew = y * Math.sin(tilt) + z * Math.cos(tilt);
        y = yNew;
        z = zNew;

        // Simple Perspective Projection
        const scale = 800 / (800 + z); // fov = 800
        const x2d = cx + x * scale;
        const y2d = cy + y * scale;

        return { x: x2d, y: y2d, z: z, scale };
      });

      // Draw Sphere Connections & Points
      projectedPoints.forEach((p, i) => {
        // Point
        // Increased alpha multiplier from 0.4 to 0.8 and base from 0.05 to 0.2
        const alpha = Math.max(0.2, (p.scale - 0.5) * 0.8);
        ctx.beginPath();
        ctx.fillStyle = `rgba(${baseColor}, ${alpha})`;
        // Increased radius multiplier from 1.5 to 2.5
        ctx.arc(p.x, p.y, 2.5 * p.scale, 0, Math.PI * 2);
        ctx.fill();

        // Connections (Nearest Neighbors on the sphere surface)
        for (let j = i + 1; j < projectedPoints.length; j++) {
          const p2 = projectedPoints[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 60 * p.scale) {
            // Increased connection alpha multiplier
            const connAlpha = (1 - dist / (60 * p.scale)) * 0.45;
            drawLine(p.x, p.y, p2.x, p2.y, connAlpha);
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);

    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="absolute inset-0 z-0 pointer-events-none"
    />
  );
}
