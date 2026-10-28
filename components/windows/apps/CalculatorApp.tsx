"use client";

import React, { useState, useEffect, useCallback } from "react";
import { FiClock, FiTrash2 } from "react-icons/fi";
import { IoBackspaceOutline } from "react-icons/io5";
import styles from "../styles/Calculator.module.css";

interface HistoryRecord {
  expression: string;
  result: string;
}

export default function CalculatorApp() {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false);
  const [memory, setMemory] = useState<number>(0);
  const [history, setHistory] = useState<HistoryRecord[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Helper to format display number
  const formatNumber = (numStr: string) => {
    if (numStr === "Error" || numStr === "Cannot divide by zero") return numStr;
    if (numStr.includes("e") || numStr.includes("E")) return numStr;
    const parts = numStr.split(".");
    const integerPart = parts[0];
    const formattedInteger = Number(integerPart).toLocaleString("en-US");
    return parts.length > 1 ? `${formattedInteger}.${parts[1]}` : formattedInteger;
  };

  // Input digit
  const handleDigit = useCallback((digit: string) => {
    setDisplay((prev) => {
      if (prev === "0" || shouldResetDisplay || prev === "Error" || prev === "Cannot divide by zero") {
        setShouldResetDisplay(false);
        return digit;
      }
      if (prev.replace(/,/g, "").length >= 16) return prev;
      return prev + digit;
    });
  }, [shouldResetDisplay]);

  // Input decimal
  const handleDecimal = useCallback(() => {
    setDisplay((prev) => {
      if (shouldResetDisplay) {
        setShouldResetDisplay(false);
        return "0.";
      }
      if (!prev.includes(".")) {
        return prev + ".";
      }
      return prev;
    });
  }, [shouldResetDisplay]);

  // Clear Entry
  const handleClearEntry = useCallback(() => {
    setDisplay("0");
  }, []);

  // Clear All
  const handleClearAll = useCallback(() => {
    setDisplay("0");
    setExpression("");
    setPrevValue(null);
    setOperation(null);
    setShouldResetDisplay(false);
  }, []);

  // Backspace
  const handleBackspace = useCallback(() => {
    setDisplay((prev) => {
      if (shouldResetDisplay || prev.length <= 1 || prev === "Error") {
        return "0";
      }
      return prev.slice(0, -1);
    });
  }, [shouldResetDisplay]);

  // Negate (+/-)
  const handleNegate = useCallback(() => {
    setDisplay((prev) => {
      if (prev === "0" || prev === "Error") return prev;
      return (Number(prev) * -1).toString();
    });
  }, []);

  // Calculate result
  const calculate = useCallback(
    (a: number, b: number, op: string): { result: number; error?: string } => {
      switch (op) {
        case "+":
          return { result: a + b };
        case "−":
        case "-":
          return { result: a - b };
        case "×":
        case "*":
          return { result: a * b };
        case "÷":
        case "/":
          if (b === 0) return { result: 0, error: "Cannot divide by zero" };
          return { result: a / b };
        default:
          return { result: b };
      }
    },
    []
  );

  // Handle Binary Operator (+, -, *, /)
  const handleOperator = useCallback(
    (nextOp: string) => {
      const current = Number(display);

      if (prevValue === null) {
        setPrevValue(current);
        setExpression(`${current} ${nextOp}`);
      } else if (operation && !shouldResetDisplay) {
        const { result, error } = calculate(prevValue, current, operation);
        if (error) {
          setDisplay(error);
          setPrevValue(null);
          setOperation(null);
          setShouldResetDisplay(true);
          return;
        }
        setPrevValue(result);
        setDisplay(result.toString());
        setExpression(`${result} ${nextOp}`);
      } else {
        setExpression(`${prevValue} ${nextOp}`);
      }

      setOperation(nextOp);
      setShouldResetDisplay(true);
    },
    [display, prevValue, operation, shouldResetDisplay, calculate]
  );

  // Equals (=)
  const handleEquals = useCallback(() => {
    if (prevValue === null || operation === null) return;
    const current = Number(display);
    const { result, error } = calculate(prevValue, current, operation);

    if (error) {
      setDisplay(error);
      setExpression(`${prevValue} ${operation} ${current} =`);
      setPrevValue(null);
      setOperation(null);
      setShouldResetDisplay(true);
      return;
    }

    const expStr = `${prevValue} ${operation} ${current} =`;
    setExpression(expStr);
    setDisplay(result.toString());
    setHistory((prev) => [{ expression: expStr, result: result.toString() }, ...prev]);
    setPrevValue(null);
    setOperation(null);
    setShouldResetDisplay(true);
  }, [display, prevValue, operation, calculate]);

  // Unary operations (sqrt, square, reciprocal, percent)
  const handleUnary = useCallback(
    (type: "sqrt" | "sqr" | "recip" | "percent") => {
      const current = Number(display);
      let res = 0;
      let exp = "";

      switch (type) {
        case "sqrt":
          if (current < 0) {
            setDisplay("Invalid input");
            setShouldResetDisplay(true);
            return;
          }
          res = Math.sqrt(current);
          exp = `√(${current})`;
          break;
        case "sqr":
          res = current * current;
          exp = `sqr(${current})`;
          break;
        case "recip":
          if (current === 0) {
            setDisplay("Cannot divide by zero");
            setShouldResetDisplay(true);
            return;
          }
          res = 1 / current;
          exp = `1/(${current})`;
          break;
        case "percent":
          res = prevValue !== null ? (prevValue * current) / 100 : current / 100;
          exp = `${res}`;
          break;
      }

      setDisplay(res.toString());
      setExpression(exp);
      setShouldResetDisplay(true);
    },
    [display, prevValue]
  );

  // Memory functions
  const handleMemory = useCallback(
    (action: "MC" | "MR" | "M+" | "M-" | "MS") => {
      const current = Number(display);
      switch (action) {
        case "MC":
          setMemory(0);
          break;
        case "MR":
          setDisplay(memory.toString());
          setShouldResetDisplay(true);
          break;
        case "M+":
          setMemory((m) => m + current);
          setShouldResetDisplay(true);
          break;
        case "M-":
          setMemory((m) => m - current);
          setShouldResetDisplay(true);
          break;
        case "MS":
          setMemory(current);
          setShouldResetDisplay(true);
          break;
      }
    },
    [display, memory]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;

      if (/^[0-9]$/.test(e.key)) {
        handleDigit(e.key);
      } else if (e.key === ".") {
        handleDecimal();
      } else if (e.key === "+") {
        handleOperator("+");
      } else if (e.key === "-") {
        handleOperator("−");
      } else if (e.key === "*") {
        handleOperator("×");
      } else if (e.key === "/") {
        handleOperator("÷");
      } else if (e.key === "Enter" || e.key === "=") {
        e.preventDefault();
        handleEquals();
      } else if (e.key === "Backspace") {
        handleBackspace();
      } else if (e.key === "Escape") {
        handleClearAll();
      } else if (e.key === "%") {
        handleUnary("percent");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleDigit, handleDecimal, handleOperator, handleEquals, handleBackspace, handleClearAll, handleUnary]);

  const displayString = formatNumber(display);
  const isLargeNumber = displayString.length > 9;

  return (
    <div className={styles.calcContainer}>
      {/* Header Bar */}
      <div className={styles.calcHeader}>
        <div className={styles.modeTitle}>
          <span>Standard</span>
        </div>
        <button
          type="button"
          onClick={() => setIsHistoryOpen(!isHistoryOpen)}
          className={`${styles.headerIconBtn} ${isHistoryOpen ? styles.headerIconBtnActive : ""}`}
          title="History"
          aria-label="Toggle history"
        >
          <FiClock size={15} />
        </button>
      </div>

      {/* Number Display Area */}
      <div className={styles.displayArea}>
        <div className={styles.expression}>{expression}</div>
        <div className={`${styles.mainNumber} ${isLargeNumber ? styles.mainNumberSmall : ""}`}>
          {displayString}
        </div>
      </div>

      {/* Memory Controls Row */}
      <div className={styles.memoryRow}>
        <button
          type="button"
          disabled={memory === 0}
          onClick={() => handleMemory("MC")}
          className={styles.memBtn}
          title="Clear all memory"
        >
          MC
        </button>
        <button
          type="button"
          disabled={memory === 0}
          onClick={() => handleMemory("MR")}
          className={styles.memBtn}
          title="Recall memory"
        >
          MR
        </button>
        <button
          type="button"
          onClick={() => handleMemory("M+")}
          className={`${styles.memBtn} ${styles.memBtnActive}`}
          title="Memory add"
        >
          M+
        </button>
        <button
          type="button"
          onClick={() => handleMemory("M-")}
          className={`${styles.memBtn} ${styles.memBtnActive}`}
          title="Memory subtract"
        >
          M-
        </button>
        <button
          type="button"
          onClick={() => handleMemory("MS")}
          className={`${styles.memBtn} ${styles.memBtnActive}`}
          title="Memory store"
        >
          MS
        </button>
      </div>

      {/* Main 4x6 Keypad */}
      <div className={styles.keypad}>
        {/* Row 1 */}
        <button
          type="button"
          onClick={() => handleUnary("percent")}
          className={`${styles.key} ${styles.keyOperator}`}
        >
          %
        </button>
        <button
          type="button"
          onClick={handleClearEntry}
          className={`${styles.key} ${styles.keyOperator}`}
        >
          CE
        </button>
        <button
          type="button"
          onClick={handleClearAll}
          className={`${styles.key} ${styles.keyOperator}`}
        >
          C
        </button>
        <button
          type="button"
          onClick={handleBackspace}
          className={`${styles.key} ${styles.keyOperator}`}
          title="Backspace"
          aria-label="Backspace"
        >
          <IoBackspaceOutline size={18} />
        </button>

        {/* Row 2 */}
        <button
          type="button"
          onClick={() => handleUnary("recip")}
          className={`${styles.key} ${styles.keyOperator}`}
        >
          ¹/x
        </button>
        <button
          type="button"
          onClick={() => handleUnary("sqr")}
          className={`${styles.key} ${styles.keyOperator}`}
        >
          x²
        </button>
        <button
          type="button"
          onClick={() => handleUnary("sqrt")}
          className={`${styles.key} ${styles.keyOperator}`}
        >
          ²√x
        </button>
        <button
          type="button"
          onClick={() => handleOperator("÷")}
          className={`${styles.key} ${styles.keyOperator}`}
        >
          ÷
        </button>

        {/* Row 3 */}
        <button
          type="button"
          onClick={() => handleDigit("7")}
          className={`${styles.key} ${styles.keyNumber}`}
        >
          7
        </button>
        <button
          type="button"
          onClick={() => handleDigit("8")}
          className={`${styles.key} ${styles.keyNumber}`}
        >
          8
        </button>
        <button
          type="button"
          onClick={() => handleDigit("9")}
          className={`${styles.key} ${styles.keyNumber}`}
        >
          9
        </button>
        <button
          type="button"
          onClick={() => handleOperator("×")}
          className={`${styles.key} ${styles.keyOperator}`}
        >
          ×
        </button>

        {/* Row 4 */}
        <button
          type="button"
          onClick={() => handleDigit("4")}
          className={`${styles.key} ${styles.keyNumber}`}
        >
          4
        </button>
        <button
          type="button"
          onClick={() => handleDigit("5")}
          className={`${styles.key} ${styles.keyNumber}`}
        >
          5
        </button>
        <button
          type="button"
          onClick={() => handleDigit("6")}
          className={`${styles.key} ${styles.keyNumber}`}
        >
          6
        </button>
        <button
          type="button"
          onClick={() => handleOperator("−")}
          className={`${styles.key} ${styles.keyOperator}`}
        >
          −
        </button>

        {/* Row 5 */}
        <button
          type="button"
          onClick={() => handleDigit("1")}
          className={`${styles.key} ${styles.keyNumber}`}
        >
          1
        </button>
        <button
          type="button"
          onClick={() => handleDigit("2")}
          className={`${styles.key} ${styles.keyNumber}`}
        >
          2
        </button>
        <button
          type="button"
          onClick={() => handleDigit("3")}
          className={`${styles.key} ${styles.keyNumber}`}
        >
          3
        </button>
        <button
          type="button"
          onClick={() => handleOperator("+")}
          className={`${styles.key} ${styles.keyOperator}`}
        >
          +
        </button>

        {/* Row 6 */}
        <button
          type="button"
          onClick={handleNegate}
          className={`${styles.key} ${styles.keyNumber}`}
        >
          +/−
        </button>
        <button
          type="button"
          onClick={() => handleDigit("0")}
          className={`${styles.key} ${styles.keyNumber}`}
        >
          0
        </button>
        <button
          type="button"
          onClick={handleDecimal}
          className={`${styles.key} ${styles.keyNumber}`}
        >
          .
        </button>
        <button
          type="button"
          onClick={handleEquals}
          className={`${styles.key} ${styles.keyEquals}`}
        >
          =
        </button>
      </div>

      {/* History Slide-Out Drawer */}
      {isHistoryOpen && (
        <div className={styles.historyDrawer}>
          <div className={styles.historyHeader}>
            <span>History</span>
            <button
              type="button"
              onClick={() => setIsHistoryOpen(false)}
              className={styles.headerIconBtn}
              style={{ width: 22, height: 22 }}
            >
              ✕
            </button>
          </div>
          <div className={styles.historyList}>
            {history.length === 0 ? (
              <p style={{ color: "#777", fontSize: 11, textAlign: "center", marginTop: 24 }}>
                There&apos;s no history yet
              </p>
            ) : (
              history.map((item, idx) => (
                <div
                  key={idx}
                  className={styles.historyItem}
                  onClick={() => {
                    setDisplay(item.result);
                    setShouldResetDisplay(true);
                  }}
                  title="Click to load result"
                >
                  <div className={styles.historyExp}>{item.expression}</div>
                  <div className={styles.historyRes}>{formatNumber(item.result)}</div>
                </div>
              ))
            )}
          </div>
          {history.length > 0 && (
            <button
              type="button"
              onClick={() => setHistory([])}
              className={styles.clearHistoryBtn}
              title="Clear all history"
            >
              <FiTrash2 size={13} />
              <span>Clear History</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
