"use client";

import React, { useState } from "react";
import { aboutMe, socialLinks } from "@/lib/data";
import styles from "../styles/Notepad.module.css";

const defaultNotepadText = `=====================================================
PARTEEK GARG - ENGINEERING & PROFILE NOTES
=====================================================

[INTRODUCTION]
I am a second-year B.Tech Computer Science and Engineering student 
at NMIMS Chandigarh building full-stack software systems and exploring 
Data Science and Artificial Intelligence. Creator of Veralon, Campus Care, 
and DNA Encoding.

[EDUCATION]
Institution: Narsee Monjee Institute of Management Studies (NMIMS), Chandigarh
Degree:      Bachelor of Technology (B.Tech)
Major:       Computer Science & Engineering
Timeline:    2025 - 2029

[CURRENT FOCUS & INTERESTS]
• Full-Stack Architecture: Next.js, React, Node.js, TypeScript, PostgreSQL
• AI & Data Science: Deep Learning pipelines, PyTorch, LangChain, AI Agents
• Systems & Performance: Low-latency backends, algorithmic optimization
• Interactive UI/UX: Precision micro-interactions, responsive OS interfaces

[LONG-TERM GOALS]
• Architect scalable, high-throughput distributed systems that serve millions.
• Bridge cutting-edge Machine Learning research into accessible, robust products.
• Lead high-performance engineering teams and drive open-source innovation.

[HACKATHON ACHIEVEMENTS]
• 1st Place Winner - AI Ideathon (CrossCheck)
• Top 30 Finalist - HackShift IIITD (KIN Talent Network)
• Experience leading engineering teams from concept to deployment in 36-hour sprints.

[CONTACT & COORDINATES]
• Email:    parteekgarg1907@gmail.com
• GitHub:   https://github.com/parteek1907
• LinkedIn: https://www.linkedin.com/in/parteek1907/
• Website:  https://parteekgarg.in
=====================================================
`;

export default function AboutApp() {
  const [text, setText] = useState(defaultNotepadText);

  return (
    <div className={styles.main}>
      {/* Top Menu Bar */}
      <div className={styles.top}>
        <section className={styles.navButtons}>
          {/* File Dropdown */}
          <div className={styles.navButton}>
            <p>File</p>
            <div className={styles.navButtonsDropdown}>
              <div className={styles.navButtonsItem} onClick={() => setText("")}>
                <p>New</p>
                <p>Ctrl + N</p>
              </div>
              <div className={styles.navButtonsItem} onClick={() => setText(defaultNotepadText)}>
                <p>Reset</p>
                <p>Ctrl + R</p>
              </div>
              <div className={styles.navButtonsItem}>
                <p>Save</p>
                <p>Ctrl + S</p>
              </div>
              <div className={styles.navButtonsItem}>
                <p>Print</p>
                <p>Ctrl + P</p>
              </div>
            </div>
          </div>

          {/* Edit Dropdown */}
          <div className={styles.navButton}>
            <p>Edit</p>
            <div className={styles.navButtonsDropdown}>
              <div className={styles.navButtonsItem}>
                <p>Undo</p>
                <p>Ctrl + Z</p>
              </div>
              <div className={styles.navButtonsItem}>
                <p>Copy</p>
                <p>Ctrl + C</p>
              </div>
              <div className={styles.navButtonsItem}>
                <p>Select all</p>
                <p>Ctrl + A</p>
              </div>
              <div className={styles.navButtonsItem} onClick={() => setText((prev) => prev + "\n" + new Date().toString())}>
                <p>Time/date</p>
                <p>F5</p>
              </div>
            </div>
          </div>

          {/* View Dropdown */}
          <div className={styles.navButton}>
            <p>View</p>
            <div className={styles.navButtonsDropdown}>
              <div className={styles.navButtonsItem}>
                <p>Zoom in</p>
              </div>
              <div className={styles.navButtonsItem}>
                <p>Word wrap</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Notepad Text Editor Area */}
      <section className={styles.textarea}>
        <textarea
          name="notepad"
          spellCheck={false}
          value={text}
          onChange={(e) => setText(e.target.value)}
          aria-label="Notepad text editor"
        />
      </section>

      {/* Notepad Status Bar */}
      <footer className={styles.footer}>
        <div>
          <p>Ln 1, Col 1</p>
        </div>
        <div>
          <p>100%</p>
          <p>Windows (CRLF)</p>
          <p>UTF-8</p>
        </div>
      </footer>
    </div>
  );
}
