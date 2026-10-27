"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./styles/Bluescreen.module.css";

interface WindowsBluescreenProps {
  onDismiss: () => void;
}

export default function WindowsBluescreen({ onDismiss }: WindowsBluescreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (progress >= 100) return;
    const timeout = setTimeout(() => {
      setProgress((prev) => Math.min(prev + Math.floor(Math.random() * 12) + 4, 100));
    }, 800);
    return () => clearTimeout(timeout);
  }, [progress]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div>
          <h1>:(</h1>
          <h2>
            Your PC ran into a problem and needs to restart. We&apos;re just collecting some error info, and then we&apos;ll restart for you.
          </h2>
        </div>

        <h2 className={styles.progressText}>{progress}% complete</h2>

        <div className={styles.aboutIssue}>
          <div>
            <Image
              src="/images/windowsErrorQR.svg"
              alt="QR Code"
              width={130}
              height={130}
              unoptimized
            />
          </div>
          <div>
            <h2>For more information about this issue and possible fixes, visit https://parteekgarg.in/error</h2>
            <h2>If you call a support person, give them this info: Stop Code: SYSTEM_THREAD_EXCEPTION_NOT_HANDLED</h2>
            <button onClick={onDismiss} className={styles.exitBtn}>
              Dismiss &amp; Reboot Desktop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
