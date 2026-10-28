"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  IoChevronUp, 
  IoChevronDown, 
  IoChevronBack, 
  IoChevronForward,
  IoPlay,
  IoTimeOutline
} from "react-icons/io5";
import { useWindows } from "./WindowsContext";
import styles from "./styles/Calendar.module.css";

const DAYS_OF_WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

interface CalendarDay {
  dayNumber: number;
  monthOffset: -1 | 0 | 1;
  fullDate: Date;
  isToday: boolean;
  isSelected: boolean;
}

export default function WindowsCalendar() {
  const { isCalendarOpen, setCalendarOpen, env } = useWindows();
  const calendarRef = useRef<HTMLDivElement>(null);

  // Live ticking clock for calendar flyout header (updates every second while open)
  const [liveDate, setLiveDate] = useState<Date>(() => new Date());

  useEffect(() => {
    if (!isCalendarOpen) return;
    const update = () => setLiveDate(new Date());
    update();
    const interval = setInterval(update, 1000);

    const onVisible = () => {
      if (!document.hidden) update();
    };

    window.addEventListener("focus", update);
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", update);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [isCalendarOpen]);

  const [viewDate, setViewDate] = useState<Date>(() => new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());
  const [isFocusRunning, setIsFocusRunning] = useState(false);
  const [focusSecondsLeft, setFocusSecondsLeft] = useState(25 * 60);

  // Sync viewDate & selectedDate with live date when calendar is opened
  useEffect(() => {
    if (isCalendarOpen) {
      const today = new Date();
      setViewDate(today);
      setSelectedDate(today);
    }
  }, [isCalendarOpen]);

  const now = liveDate;

  // Focus timer countdown
  useEffect(() => {
    if (!isFocusRunning) return;
    const interval = setInterval(() => {
      setFocusSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsFocusRunning(false);
          return 25 * 60;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isFocusRunning]);

  // Click outside to close calendar
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        calendarRef.current &&
        !calendarRef.current.contains(target) &&
        !target.closest("[data-calendar-toggle]")
      ) {
        setCalendarOpen(false);
      }
    };

    if (isCalendarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isCalendarOpen, setCalendarOpen]);

  // Month & year of viewDate
  const currentYear = viewDate.getFullYear();
  const currentMonth = viewDate.getMonth();

  const monthName = viewDate.toLocaleString(env.locale || "default", { month: "long" });

  const isViewingCurrentMonth = 
    viewDate.getFullYear() === now.getFullYear() &&
    viewDate.getMonth() === now.getMonth();

  // Generate 42 calendar grid cells (6 rows x 7 days)
  const calendarDays = useMemo<CalendarDay[]>(() => {
    const days: CalendarDay[] = [];

    // First day of current month (0 = Sun, 1 = Mon, ..., 6 = Sat)
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

    // Total days in current month
    const daysInCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Total days in previous month
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

    // 1. Previous month trailing days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const dayNum = daysInPrevMonth - i;
      const date = new Date(currentYear, currentMonth - 1, dayNum);
      const isToday =
        date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear();
      const isSelected =
        date.getDate() === selectedDate.getDate() &&
        date.getMonth() === selectedDate.getMonth() &&
        date.getFullYear() === selectedDate.getFullYear();

      days.push({
        dayNumber: dayNum,
        monthOffset: -1,
        fullDate: date,
        isToday,
        isSelected,
      });
    }

    // 2. Current month days
    for (let d = 1; d <= daysInCurrentMonth; d++) {
      const date = new Date(currentYear, currentMonth, d);
      const isToday =
        date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear();
      const isSelected =
        date.getDate() === selectedDate.getDate() &&
        date.getMonth() === selectedDate.getMonth() &&
        date.getFullYear() === selectedDate.getFullYear();

      days.push({
        dayNumber: d,
        monthOffset: 0,
        fullDate: date,
        isToday,
        isSelected,
      });
    }

    // 3. Next month leading days to complete 42 cells (6 rows)
    const remainingCells = 42 - days.length;
    for (let n = 1; n <= remainingCells; n++) {
      const date = new Date(currentYear, currentMonth + 1, n);
      const isToday =
        date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear();
      const isSelected =
        date.getDate() === selectedDate.getDate() &&
        date.getMonth() === selectedDate.getMonth() &&
        date.getFullYear() === selectedDate.getFullYear();

      days.push({
        dayNumber: n,
        monthOffset: 1,
        fullDate: date,
        isToday,
        isSelected,
      });
    }

    return days;
  }, [currentYear, currentMonth, now, selectedDate]);

  const handlePrevMonth = () => {
    setViewDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const handleGoToToday = () => {
    const today = new Date();
    setViewDate(today);
    setSelectedDate(today);
  };

  const handleSelectDay = (day: CalendarDay) => {
    setSelectedDate(day.fullDate);
    if (day.monthOffset !== 0) {
      setViewDate(new Date(day.fullDate.getFullYear(), day.fullDate.getMonth(), 1));
    }
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <AnimatePresence>
      {isCalendarOpen && (
        <motion.div
          ref={calendarRef}
          initial={{ opacity: 0, y: 18, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 14, scale: 0.96 }}
          transition={{
            duration: env.prefersReducedMotion ? 0.05 : 0.18,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={styles.calendarFlyout}
          data-lenis-prevent="true"
        >
          {/* Top Date & Live Time Header */}
          <div className={styles.topSection}>
            <div>
              <h2>
                {now.toLocaleDateString(env.locale, {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </h2>
              <div className={styles.liveTime}>
                {now.toLocaleTimeString(env.locale, {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </div>
            </div>

            <div 
              className={styles.collapseBtn}
              onClick={() => setCalendarOpen(false)}
              title="Close calendar"
            >
              <IoChevronDown size={18} />
            </div>
          </div>

          {/* Month / Year Navigator */}
          <div className={styles.monthNav}>
            <div className={styles.monthTitle}>
              <span>{monthName} {currentYear}</span>
              {!isViewingCurrentMonth && (
                <button 
                  onClick={handleGoToToday} 
                  className={styles.todayBtn}
                  title="Jump to today"
                >
                  Today
                </button>
              )}
            </div>

            <div className={styles.navArrows}>
              <div 
                className={styles.arrowBtn}
                onClick={handlePrevMonth}
                title="Previous month"
              >
                <IoChevronUp size={16} />
              </div>
              <div 
                className={styles.arrowBtn}
                onClick={handleNextMonth}
                title="Next month"
              >
                <IoChevronDown size={16} />
              </div>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className={styles.gridContainer}>
            {/* Weekdays header */}
            <div className={styles.weekHeader}>
              {DAYS_OF_WEEK.map((w) => (
                <div key={w} className={styles.weekHeaderCell}>
                  {w}
                </div>
              ))}
            </div>

            {/* Days matrix */}
            <div className={styles.daysGrid}>
              {calendarDays.map((d, index) => {
                const isCurrentMonth = d.monthOffset === 0;
                return (
                  <div
                    key={index}
                    onClick={() => handleSelectDay(d)}
                    className={`${styles.dayCell} ${
                      isCurrentMonth ? styles.currentMonth : styles.otherMonth
                    } ${d.isToday ? styles.todayCell : ""} ${
                      d.isSelected && !d.isToday ? styles.selectedCell : ""
                    }`}
                    title={d.fullDate.toLocaleDateString(undefined, {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  >
                    {d.dayNumber}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Windows 11 Focus Session Widget */}
          <div className={styles.focusSection}>
            <div className={styles.focusLeft}>
              <div className={styles.focusIcon}>
                <IoTimeOutline size={18} />
              </div>
              <div className={styles.focusText}>
                <h4>Focus session</h4>
                <p>{isFocusRunning ? `${formatTimer(focusSecondsLeft)} remaining` : "25 mins"}</p>
              </div>
            </div>

            <button
              onClick={() => setIsFocusRunning(!isFocusRunning)}
              className={styles.focusBtn}
              title={isFocusRunning ? "Pause focus session" : "Start focus session"}
            >
              <IoPlay size={12} className={isFocusRunning ? "rotate-90" : ""} />
              {isFocusRunning ? "Pause" : "Start"}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
