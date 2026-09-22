"use client";
import {
  useScroll,
  useTransform,
  useSpring,
  motion,
  useMotionValueEvent
} from "framer-motion";
import React, { useEffect, useRef, useState, useCallback } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
  isWinner?: boolean;
}

const TimelineItem = ({ item, index, lineHeight, totalItems }: { item: TimelineEntry, index: number, lineHeight: any, totalItems: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [threshold, setThreshold] = useState(Infinity);

  // Re-measure whenever totalItems changes (new entries added) or on resize
  useEffect(() => {
    const measure = () => {
      if (ref.current) {
        const paddingTop = parseFloat(getComputedStyle(ref.current).paddingTop);
        setThreshold(ref.current.offsetTop + paddingTop + 20);
      }
    };
    measure();
    // Re-measure after layout settles
    const timers = [
      setTimeout(measure, 100),
      setTimeout(measure, 500),
      setTimeout(measure, 1500),
    ];
    window.addEventListener('resize', measure);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener('resize', measure);
    };
  }, [totalItems]);

  useMotionValueEvent(lineHeight, "change", (latest: number) => {
    if (threshold < Infinity && latest >= threshold) {
      if (!isActive) {
        setIsActive(true);
        if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
          window.navigator.vibrate(50);
        }
      }
    } else {
      if (isActive) setIsActive(false);
    }
  });

  return (
    <div ref={ref} className="flex justify-start pt-10 md:pt-40 md:gap-10">
      <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
        <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full flex items-center justify-center bg-[var(--color-bg-primary)]">
          {item.isWinner ? (
            <motion.div
              animate={{
                color: isActive ? "var(--timeline-active-color)" : "var(--color-border-strong)",
                scale: isActive ? 1.3 : 1,
                filter: isActive ? "drop-shadow(0 0 10px var(--timeline-glow-color))" : "drop-shadow(0 0 0px rgba(128,128,128,0))",
              }}
              transition={{ duration: 0.3, ease: "easeOut", type: "spring", stiffness: 300, damping: 20 }}
              className="flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.518l4.276 3.664a1 1 0 0 0 1.516-.294z"/><path d="M5 21h14"/></svg>
            </motion.div>
          ) : (
            <motion.div
              animate={{
                backgroundColor: isActive ? "var(--color-text-primary)" : "transparent",
                borderColor: isActive ? "var(--color-text-primary)" : "var(--color-border-strong)",
                scale: isActive ? 1.3 : 1,
                boxShadow: isActive ? "0 0 20px 2px var(--timeline-glow-node-color)" : "none",
              }}
              transition={{ duration: 0.3, ease: "easeOut", type: "spring", stiffness: 300, damping: 20 }}
              className="h-4 w-4 rounded-full border p-2"
            />
          )}
        </div>
        <motion.h3 
          animate={{ opacity: isActive ? 1 : 0.4, scale: isActive ? 1.05 : 1 }}
          transition={{ duration: 0.3 }}
          className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold"
          style={{ color: "var(--color-text-primary)" }}
        >
          {item.title}
        </motion.h3>
      </div>

      <div className="relative pl-20 pr-4 md:pl-4 w-full">
        <motion.h3 
          animate={{ opacity: isActive ? 1 : 0.4 }}
          className="md:hidden block text-2xl mb-4 text-left font-bold"
          style={{ color: "var(--color-text-primary)" }}
        >
          {item.title}
        </motion.h3>
        <motion.div
          animate={{ opacity: isActive ? 1 : 0.5, y: isActive ? 0 : 10 }}
          transition={{ duration: 0.4 }}
        >
          {item.content}
        </motion.div>
      </div>
    </div>
  );
};

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  // Use ResizeObserver to automatically track height changes when content changes
  useEffect(() => {
    if (!ref.current) return;

    const updateHeight = () => {
      const rect = ref.current?.getBoundingClientRect();
      if (rect) setHeight(rect.height);
    };

    // Initial measurement
    updateHeight();

    // ResizeObserver for automatic updates
    const observer = new ResizeObserver(updateHeight);
    observer.observe(ref.current);

    // Also measure after layout settles (fonts, images)
    const timers = [
      setTimeout(updateHeight, 100),
      setTimeout(updateHeight, 500),
      setTimeout(updateHeight, 1500),
    ];

    window.addEventListener('resize', updateHeight);

    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
      window.removeEventListener('resize', updateHeight);
    };
  }, [data.length]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 100%"],
  });

  // Wrap the scroll progress in a spring for buttery smooth interpolation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const heightTransform = useTransform(smoothProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(smoothProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-transparent font-sans md:px-10"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
        <h2 className="text-lg md:text-4xl mb-4 max-w-4xl" style={{ color: "var(--color-text-primary)" }}>
          Changelog from my journey
        </h2>
        <p className="text-sm md:text-base max-w-sm" style={{ color: "var(--color-text-secondary)" }}>
          Here&apos;s a timeline of my hackathons and experience over the past years.
        </p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <TimelineItem key={index} item={item} index={index} lineHeight={heightTransform} totalItems={data.length} />
        ))}

        {/* High-Contrast Editorial Ending */}
        <div className="relative h-40 mt-20 w-full pointer-events-none">
          <div 
            className="absolute h-[1px] bg-neutral-300 dark:bg-neutral-600"
            style={{
              width: "80px",
              left: "32px",
              transform: "translateX(-50%)",
              top: "0"
            }}
          />
          {/* Circular node intersecting the crossbar */}
          <div 
            className="absolute w-2 h-2 rounded-full bg-neutral-300 dark:bg-neutral-600"
            style={{
              left: "32px",
              transform: "translate(-50%, -50%)",
              top: "0"
            }}
          />
          <div 
            className="absolute flex flex-col items-start md:items-center text-left md:text-center left-[16px] md:left-[32px] md:-translate-x-1/2"
            style={{
              top: "1.5rem",
              width: "200px"
            }}
          >
            <span 
              className="text-xs md:text-sm font-bold tracking-[0.25em] uppercase" 
              style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-ui)" }}
            >
              MORE TO BUILD
            </span>
            <span 
              className="text-xs md:text-sm italic mt-1.5" 
              style={{ color: "var(--color-text-secondary)" }}
            >
              The journey continues.
            </span>
          </div>
        </div>
        <div
          style={{
            bottom: "240px",
          }}
          className="absolute md:left-[31px] left-[31px] top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-800/20 dark:via-neutral-200/20 to-neutral-800/20 dark:to-neutral-200/20 to-[100%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-neutral-800 dark:from-neutral-200 via-neutral-800 dark:via-neutral-200 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
