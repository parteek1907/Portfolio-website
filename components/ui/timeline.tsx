"use client";
import {
  useScroll,
  useTransform,
  useSpring,
  motion,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { smoothScrollTo, smoothScrollToElement, easeInOutCubic } from "@/lib/smoothScroll";

export interface TimelineEntry {
  id?: string;
  title: string;
  date?: string;
  eventName?: string;
  isWinner?: boolean;
  content: React.ReactNode;
}

const MONTHS: Record<string, number> = {
  jan: 1,
  january: 1,
  feb: 2,
  february: 2,
  mar: 3,
  march: 3,
  apr: 4,
  april: 4,
  may: 5,
  jun: 6,
  june: 6,
  jul: 7,
  july: 7,
  aug: 8,
  august: 8,
  sep: 9,
  sept: 9,
  september: 9,
  oct: 10,
  october: 10,
  nov: 11,
  november: 11,
  dec: 12,
  december: 12,
};

export function parseEventDate(dateStr: string): {
  year: number;
  month: number;
  day: number;
  hasExplicitDay: boolean;
} {
  const clean = (dateStr || "").trim();

  // Try ISO format like "2026-09" or "2026-09-15"
  const isoMatch = clean.match(/^(\d{4})-(\d{2})(?:-(\d{2}))?/);
  if (isoMatch) {
    return {
      year: parseInt(isoMatch[1], 10),
      month: parseInt(isoMatch[2], 10),
      day: isoMatch[3] ? parseInt(isoMatch[3], 10) : 1,
      hasExplicitDay: Boolean(isoMatch[3]),
    };
  }

  // Extract year
  const yearMatch = clean.match(/\b(20\d\d|19\d\d)\b/);
  const year = yearMatch ? parseInt(yearMatch[1], 10) : 2026;

  // Extract month
  let month = 1;
  const lower = clean.toLowerCase();
  for (const [mName, mNum] of Object.entries(MONTHS)) {
    if (new RegExp(`\\b${mName}\\b`, "i").test(lower)) {
      month = mNum;
      break;
    }
  }

  // Extract day if present (e.g. "10-11 April 2026" or "15 Sep 2026")
  let day = 1;
  let hasExplicitDay = false;
  const dayMatch = clean.match(/\b(\d{1,2})(?:st|nd|rd|th)?\b/);
  if (dayMatch) {
    const d = parseInt(dayMatch[1], 10);
    if (d <= 31 && d !== year) {
      day = d;
      hasExplicitDay = true;
    }
  }

  return { year, month, day, hasExplicitDay };
}

export function sortEvents(events: TimelineEntry[]): TimelineEntry[] {
  return [...events]
    .map((item, originalIndex) => ({
      item,
      originalIndex,
      parsed: parseEventDate(item.date || item.title),
    }))
    .sort((a, b) => {
      // 1. Year descending (newest first)
      if (a.parsed.year !== b.parsed.year) {
        return b.parsed.year - a.parsed.year;
      }
      // 2. Month descending (newest first)
      if (a.parsed.month !== b.parsed.month) {
        return b.parsed.month - a.parsed.month;
      }
      // 3. Day descending if exact dates are known and different
      if (
        (a.parsed.hasExplicitDay || b.parsed.hasExplicitDay) &&
        a.parsed.day !== b.parsed.day
      ) {
        return b.parsed.day - a.parsed.day;
      }
      // 4. Fallback: preserve existing relative order
      return a.originalIndex - b.originalIndex;
    })
    .map(({ item }) => item);
}

const TimelineItem = ({
  item,
  index,
  lineHeight,
  totalItems,
}: {
  item: TimelineEntry;
  index: number;
  lineHeight: any;
  totalItems: number;
}) => {
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
    window.addEventListener("resize", measure);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("resize", measure);
    };
  }, [totalItems]);

  useMotionValueEvent(lineHeight, "change", (latest: number) => {
    if (threshold < Infinity && latest >= threshold) {
      if (!isActive) {
        setIsActive(true);
        if (
          typeof window !== "undefined" &&
          window.navigator &&
          window.navigator.vibrate
        ) {
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
                color: isActive
                  ? "var(--timeline-active-color)"
                  : "var(--color-border-strong)",
                scale: isActive ? 1.3 : 1,
                filter: isActive
                  ? "drop-shadow(0 0 10px var(--timeline-glow-color))"
                  : "drop-shadow(0 0 0px rgba(128,128,128,0))",
              }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              className="flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.518l4.276 3.664a1 1 0 0 0 1.516-.294z" />
                <path d="M5 21h14" />
              </svg>
            </motion.div>
          ) : (
            <motion.div
              animate={{
                backgroundColor: isActive
                  ? "var(--color-text-primary)"
                  : "transparent",
                borderColor: isActive
                  ? "var(--color-text-primary)"
                  : "var(--color-border-strong)",
                scale: isActive ? 1.3 : 1,
                boxShadow: isActive
                  ? "0 0 20px 2px var(--timeline-glow-node-color)"
                  : "none",
              }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
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
  const [filter, setFilter] = useState<"all" | "winners">("all");
  const [isExpanded, setIsExpanded] = useState(false);

  const DEFAULT_LIMIT = 5;

  // Reverse chronological sorting derived from event date
  const sortedData = useMemo(() => sortEvents(data), [data]);

  // Derived filtered hackathons: "all" vs "winners"
  const filteredData = useMemo(() => {
    if (filter === "winners") {
      return sortedData.filter((item) => Boolean(item.isWinner));
    }
    return sortedData;
  }, [sortedData, filter]);

  // Default view: 5 most recent hackathons; expanded: all remaining
  const displayedData = useMemo(() => {
    if (isExpanded || filteredData.length <= DEFAULT_LIMIT) {
      return filteredData;
    }
    return filteredData.slice(0, DEFAULT_LIMIT);
  }, [filteredData, isExpanded]);

  const canExpand = filteredData.length >= DEFAULT_LIMIT;

  const handleFilterChange = (newFilter: "all" | "winners") => {
    if (newFilter !== filter) {
      setFilter(newFilter);
      setIsExpanded(false);
    }
  };

  const toggleExpand = () => {
    if (isExpanded) {
      // Find the last entry that remains visible in collapsed state (index: DEFAULT_LIMIT - 1)
      const lastCollapsedEntry = document.getElementById(`timeline-item-${DEFAULT_LIMIT - 1}`);
      let targetY: number | null = null;

      if (lastCollapsedEntry) {
        const entryRect = lastCollapsedEntry.getBoundingClientRect();
        const entryDocBottom = entryRect.bottom + window.scrollY;
        // Button container margin is pt-12 (48px) on mobile or md:pt-16 (64px) on md+
        const btnMargin = window.innerWidth >= 768 ? 64 : 48;
        const btnDocTop = entryDocBottom + btnMargin;
        // Position viewport so the "View all hackathons" button rests nicely in the lower portion of view (~70% down),
        // placing the scroll position slightly above the button with the last hackathon clearly in view
        targetY = Math.max(0, btnDocTop - Math.round(window.innerHeight * 0.7));
      }

      if (targetY !== null && window.scrollY > targetY) {
        // Distance is only a few hundred pixels (the height of the extra entries)
        const distance = window.scrollY - targetY;
        const duration = Math.min(Math.max(distance * 0.9, 650), 900);

        // 1. Scroll gently up FIRST while all items are still in the DOM to avoid any downward layout plunge
        smoothScrollTo(targetY, duration, easeInOutCubic, () => {
          // 2. Collapse ONLY when the extra items are already off-screen below the viewport
          setIsExpanded(false);
        });
      } else {
        setIsExpanded(false);
      }
    } else {
      setIsExpanded(true);
    }
  };

  // Use ResizeObserver to automatically track height changes when content changes
  useEffect(() => {
    if (!ref.current) return;

    const updateHeight = () => {
      const rect = ref.current?.getBoundingClientRect();
      if (rect) setHeight(rect.height);
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(ref.current);

    const timers = [
      setTimeout(updateHeight, 100),
      setTimeout(updateHeight, 350),
      setTimeout(updateHeight, 700),
      setTimeout(updateHeight, 1500),
    ];

    window.addEventListener("resize", updateHeight);

    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
      window.removeEventListener("resize", updateHeight);
    };
  }, [displayedData.length, isExpanded, filter]);

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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2
              className="text-lg md:text-4xl mb-4 max-w-4xl"
              style={{ color: "var(--color-text-primary)" }}
            >
              Changelog from my journey
            </h2>
            <p
              className="text-sm md:text-base max-w-sm"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Explore my journey through hackathons, from the latest milestones to earlier experiences.
            </p>
          </div>

          {/* Minimal Filter Controls */}
          <div
            className="flex items-center gap-1.5 p-1 rounded-full border self-start md:self-auto transition-colors"
            style={{
              backgroundColor: "var(--color-surface)",
              borderColor: "var(--color-border)",
            }}
            role="tablist"
            aria-label="Filter hackathons"
          >
            <button
              type="button"
              role="tab"
              aria-selected={filter === "all"}
              id="filter-all-events"
              onClick={() => handleFilterChange("all")}
              className="relative px-4 py-1.5 rounded-full text-xs md:text-sm font-medium transition-colors cursor-pointer select-none"
              style={{
                color:
                  filter === "all"
                    ? "var(--color-bg-primary)"
                    : "var(--color-text-secondary)",
              }}
            >
              {filter === "all" && (
                <motion.div
                  layoutId="timelineFilterPill"
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: "var(--color-text-primary)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">All events</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={filter === "winners"}
              id="filter-winners"
              onClick={() => handleFilterChange("winners")}
              className="relative px-4 py-1.5 rounded-full text-xs md:text-sm font-medium transition-colors cursor-pointer select-none"
              style={{
                color:
                  filter === "winners"
                    ? "var(--color-bg-primary)"
                    : "var(--color-text-secondary)",
              }}
            >
              {filter === "winners" && (
                <motion.div
                  layoutId="timelineFilterPill"
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: "var(--color-text-primary)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <span>Winners</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        <AnimatePresence initial={false}>
          {displayedData.map((item, index) => (
            <motion.div
              key={item.id || `${item.title}-${index}`}
              id={`timeline-item-${index}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <TimelineItem
                item={item}
                index={index}
                lineHeight={heightTransform}
                totalItems={displayedData.length}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {displayedData.length === 0 && (
          <div
            className="relative pl-20 pr-4 md:pl-28 py-16 text-sm"
            style={{ color: "var(--color-text-secondary)" }}
          >
            No hackathons found for this filter.
          </div>
        )}

        {/* View all hackathons / Show less Button */}
        {canExpand && (
          <div className="flex justify-start pt-12 md:pt-16 pb-4 md:gap-10">
            <div className="hidden md:block max-w-xs lg:max-w-sm md:w-full" />
            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <button
                type="button"
                id="timeline-view-all-btn"
                onClick={toggleExpand}
                className="group relative inline-flex items-center gap-2 text-sm md:text-base font-semibold tracking-wide text-[var(--color-text-primary)] hover:opacity-80 transition-all cursor-pointer bg-transparent border-none p-0 select-none pb-1"
                style={{ fontFamily: "var(--font-ui)" }}
              >
                <span>{isExpanded ? "Show less" : "View all hackathons"}</span>
                {isExpanded ? (
                  <ChevronUp size={18} className="transition-transform duration-300 group-hover:-translate-y-1" />
                ) : (
                  <ChevronDown size={18} className="transition-transform duration-300 group-hover:translate-y-1" />
                )}
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--color-text-primary)]/40 group-hover:bg-[var(--color-text-primary)] transition-all duration-300"></span>
              </button>
            </div>
          </div>
        )}

        {/* High-Contrast Editorial Ending */}
        <div className="relative h-40 mt-20 w-full pointer-events-none">
          <div
            className="absolute h-[1px] bg-neutral-300 dark:bg-neutral-600"
            style={{
              width: "80px",
              left: "32px",
              transform: "translateX(-50%)",
              top: "0",
            }}
          />
          {/* Circular node intersecting the crossbar */}
          <div
            className="absolute w-2 h-2 rounded-full bg-neutral-300 dark:bg-neutral-600"
            style={{
              left: "32px",
              transform: "translate(-50%, -50%)",
              top: "0",
            }}
          />
          <div
            className="absolute flex flex-col items-start md:items-center text-left md:text-center left-[16px] md:left-[32px] md:-translate-x-1/2"
            style={{
              top: "1.5rem",
              width: "200px",
            }}
          >
            <span
              className="text-xs md:text-sm font-bold tracking-[0.25em] uppercase"
              style={{
                color: "var(--color-text-primary)",
                fontFamily: "var(--font-ui)",
              }}
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
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-neutral-800 dark:from-neutral-200 via-neutral-800 dark:via-neutral-200 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

