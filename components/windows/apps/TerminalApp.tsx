"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { featuredProjects, expertise, certifications, aboutMe, socialLinks } from "@/lib/data";
import { useWindows } from "../WindowsContext";
import styles from "../styles/Terminal.module.css";

interface HistoryItem {
  input: string;
  response: string | null;
}

export default function TerminalApp() {
  const { openApp, exitWindowsMode, triggerBluescreen } = useWindows();
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      input: "",
      response: "Welcome to MINGW64 on Parteek OS (Windows 11).\nType 'help' to see available commands, or 'exit' to return to website.",
    },
  ]);
  const [currentInput, setCurrentInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [cmdHistoryIdx, setCmdHistoryIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const executeCommand = useCallback(
    (input: string) => {
      const trimmed = input.trim();
      const lower = trimmed.toLowerCase();
      const parts = lower.split(" ");
      const cmd = parts[0];
      const arg = parts.slice(1).join(" ");

      if (!trimmed) {
        setHistory((prev) => [...prev, { input: "", response: null }]);
        return;
      }

      setCmdHistory((prev) => [...prev, trimmed]);
      setCmdHistoryIdx(-1);

      switch (cmd) {
        case "help":
          setHistory((prev) => [
            ...prev,
            {
              input: trimmed,
              response: `Available commands:
  help           : Display this help menu
  about          : Profile, NMIMS education, and engineering goals
  projects       : List featured production projects & case studies
  skills         : View languages, frameworks, AI/ML & databases
  hackathons     : View hackathon track record and victories
  certifications : View verified Cisco, IBM, Oracle & industry credentials
  resume         : Preview & download ParteekGarg_Resume.pdf
  contact        : View email, GitHub, and LinkedIn links
  whoami         : Display current user credentials
  ls             : List directories and files
  open <app>     : Open desktop application (about, projects, skills, resume, etc.)
  clear          : Clear the terminal screen
  bsod           : Trigger Blue Screen of Death easter egg
  exit           : Return to standard portfolio website`,
            },
          ]);
          break;

        case "about":
          setHistory((prev) => [
            ...prev,
            {
              input: trimmed,
              response: `Parteek Garg
First-year B.Tech CSE student at NMIMS Chandigarh (2024-2028).
Building full-stack systems and exploring Data Science & AI.
Creator of Veralon, Campus Care, and DNA Encoding.`,
            },
          ]);
          break;

        case "projects":
          setHistory((prev) => [
            ...prev,
            {
              input: trimmed,
              response: featuredProjects
                .map(
                  (p, i) =>
                    `[${i + 1}] ${p.title} (${p.tags.slice(0, 3).join(", ")})\n    ${p.description}\n    GitHub: ${p.githubUrl || "Private"}`
                )
                .join("\n\n"),
            },
          ]);
          break;

        case "skills":
          setHistory((prev) => [
            ...prev,
            {
              input: trimmed,
              response: `Core Competencies:
  • Languages: TypeScript, JavaScript, Python, C++, SQL, HTML5, CSS3
  • Frontend: React, Next.js, Tailwind CSS, Framer Motion, Three.js
  • Backend: Node.js, Express, REST APIs, GraphQL
  • Databases: PostgreSQL, MongoDB, Prisma, Supabase
  • AI / Data Science: PyTorch, Scikit-learn, Pandas, NumPy, LangChain`,
            },
          ]);
          break;

        case "hackathons":
          setHistory((prev) => [
            ...prev,
            {
              input: trimmed,
              response: `Hackathon Victories & Milestones:
  🏆 1st Place Winner - AI Ideathon (CrossCheck)
  ⭐ Top 30 Finalist   - HackShift IIITD (KIN Talent Network)
  Role: Team Lead & Full-Stack Architect`,
            },
          ]);
          break;

        case "certifications":
          setHistory((prev) => [
            ...prev,
            {
              input: trimmed,
              response: certifications
                .map((c) => `• ${c.title} - ${c.issuer} (ID: ${c.credentialId})`)
                .join("\n"),
            },
          ]);
          break;

        case "resume":
          openApp("resume");
          setHistory((prev) => [
            ...prev,
            {
              input: trimmed,
              response: `Opening Resume Viewer... Download: /ParteekGarg_Resume.pdf`,
            },
          ]);
          break;

        case "contact":
          setHistory((prev) => [
            ...prev,
            {
              input: trimmed,
              response: `Contact & Coordinates:
  • Email:    parteekgarg1907@gmail.com
  • GitHub:   ${socialLinks.github}
  • LinkedIn: ${socialLinks.linkedin}
  • Website:  https://parteekgarg.in`,
            },
          ]);
          break;

        case "whoami":
          setHistory((prev) => [
            ...prev,
            {
              input: trimmed,
              response: `parteek (NMIMS Chandigarh B.Tech CSE '28)`,
            },
          ]);
          break;

        case "ls":
          setHistory((prev) => [
            ...prev,
            {
              input: trimmed,
              response: `about.txt      projects/      skills.json    hackathons/
certifications/ resume.pdf     contact.vcf    github/`,
            },
          ]);
          break;

        case "open":
          if (arg) {
            const valid = ["about", "projects", "skills", "hackathons", "certifications", "github", "resume", "contact", "terminal"];
            if (valid.includes(arg)) {
              openApp(arg as any);
              setHistory((prev) => [
                ...prev,
                { input: trimmed, response: `Launched application: ${arg}` },
              ]);
            } else {
              setHistory((prev) => [
                ...prev,
                { input: trimmed, response: `Application '${arg}' not found. Valid: ${valid.join(", ")}` },
              ]);
            }
          } else {
            setHistory((prev) => [
              ...prev,
              { input: trimmed, response: `Usage: open <app_name> (e.g. open projects)` },
            ]);
          }
          break;

        case "clear":
          setHistory([]);
          break;

        case "bsod":
          triggerBluescreen();
          break;

        case "exit":
        case "portfolio":
        case "quit":
          exitWindowsMode();
          break;

        default:
          setHistory((prev) => [
            ...prev,
            {
              input: trimmed,
              response: `bash: ${cmd}: command not found. Type 'help' for available commands.`,
            },
          ]);
          break;
      }
    },
    [openApp, exitWindowsMode, triggerBluescreen]
  );

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(currentInput);
      setCurrentInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const nextIdx = cmdHistoryIdx === -1 ? cmdHistory.length - 1 : Math.max(0, cmdHistoryIdx - 1);
        setCmdHistoryIdx(nextIdx);
        setCurrentInput(cmdHistory[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cmdHistoryIdx !== -1) {
        const nextIdx = cmdHistoryIdx + 1;
        if (nextIdx < cmdHistory.length) {
          setCmdHistoryIdx(nextIdx);
          setCurrentInput(cmdHistory[nextIdx]);
        } else {
          setCmdHistoryIdx(-1);
          setCurrentInput("");
        }
      }
    }
  };

  return (
    <div
      className={styles.terminalWrapper}
      onClick={() => inputRef.current?.focus()}
    >
      <div className={styles.main}>
        {history.map((item, idx) => (
          <div key={idx} className={styles.historyItem}>
            {item.input && (
              <>
                <p className={styles.terminalTitle}>
                  parteek@NMIMS <span>MINGW64</span> <span>~</span>
                </p>
                <p>$ {item.input}</p>
              </>
            )}
            {item.response && (
              <pre className="whitespace-pre-wrap font-inherit text-neutral-300 text-xs leading-relaxed my-1">
                {item.response}
              </pre>
            )}
          </div>
        ))}

        {/* Current Prompt */}
        <div className={styles.historyItem}>
          <p className={styles.terminalTitle}>
            parteek@NMIMS <span>MINGW64</span> <span>~</span>
          </p>
          <div className={styles.promt}>
            <p>$</p>
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
