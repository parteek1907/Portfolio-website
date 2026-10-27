"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { VscChromeClose } from "react-icons/vsc";
import { ErrorType } from "./types";
import styles from "./styles/Error.module.css";

interface WindowsErrorProps {
  error: ErrorType;
  onDismiss: (index: number) => void;
}

export default function WindowsError({ error, onDismiss }: WindowsErrorProps) {
  useEffect(() => {
    try {
      const audio = new Audio("/sounds/error.mp3");
      audio.play().catch(() => {});
    } catch {}
  }, []);

  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorTop}>
        <div>
          <Image
            src="/icons/error/error.png"
            width={18}
            height={18}
            alt="Error icon"
            unoptimized
          />
          <p>{error.error}.exe - Application error</p>
        </div>
        <div onClick={() => onDismiss(error.index)}>
          <VscChromeClose />
        </div>
      </div>

      <div className={styles.errorContent}>
        <div>
          <Image
            src="/icons/error/error.png"
            width={36}
            height={36}
            alt="Error dialog"
            unoptimized
          />
        </div>
        <div>
          <p>
            The instruction at 0x0000000088000000 referenced memory at
            0x0000000088000000. The memory could not be written.
            <br />
            <br />
            Click on OK to terminate the program
          </p>
        </div>
      </div>

      <div className={styles.errorBottom}>
        <button onClick={() => onDismiss(error.index)}>OK</button>
      </div>
    </div>
  );
}
