"use client";

import React from "react";
import { GitHubCalendar } from "react-github-calendar";
import { socialLinks } from "@/lib/data";
import { 
  Github, 
  ExternalLink, 
  GitFork, 
  Star, 
  GitCommit, 
  Terminal,
  Code2,
  FolderGit2
} from "lucide-react";

const PINNED_REPOS = [
  {
    name: "Kin",
    desc: "Proof-of-work-driven professional networking platform connecting students, alumni & founders with graph talent matching.",
    language: "TypeScript",
    langColor: "#3178c6",
    stars: 12,
    forks: 3,
    url: "https://github.com/parteek1907/Kin",
  },
  {
    name: "CrossCheck",
    desc: "Multilingual financial fraud incident response system converting WhatsApp conversational reports into golden-hour bank escalations.",
    language: "TypeScript",
    langColor: "#3178c6",
    stars: 8,
    forks: 2,
    url: "https://github.com/parteek1907/CrossCheck",
  },
  {
    name: "Ziro",
    desc: "Intelligent financial settlement ecosystem featuring AI payment firewall, trust scoring, and offline queued payments.",
    language: "Python",
    langColor: "#3572A5",
    stars: 10,
    forks: 2,
    url: "https://github.com/parteek1907/Ziro",
  },
  {
    name: "finwise-ai",
    desc: "AI-powered financial literacy ecosystem with trading simulation, contextual AI mentor, and emotion behavioral feedback.",
    language: "TypeScript",
    langColor: "#3178c6",
    stars: 14,
    forks: 4,
    url: "https://github.com/parteek1907/finwise-ai",
  },
  {
    name: "Veralon",
    desc: "Deterministic credibility intelligence pipeline evaluating claims with RAG source clustering and SHA-256 audit trails.",
    language: "TypeScript",
    langColor: "#3178c6",
    stars: 9,
    forks: 1,
    url: "https://github.com/parteek1907/Veralon",
  },
  {
    name: "CampusCare",
    desc: "Zero-backend academic management system built in Vanilla TypeScript with Auth0 scoped localStorage and Playwright E2E tests.",
    language: "TypeScript",
    langColor: "#3178c6",
    stars: 7,
    forks: 1,
    url: "https://github.com/parteek1907/CampusCare",
  },
];

export default function GithubApp() {
  const customTheme = {
    dark: ["#161720", "#0e4429", "#006d32", "#26a641", "#39d353"],
  };

  return (
    <div className="h-full flex flex-col bg-[#18181f] text-neutral-200 select-text overflow-y-auto p-6 space-y-6 custom-scrollbar min-h-0 overscroll-contain">
      {/* Profile Header */}
      <div className="p-5 rounded-xl bg-gradient-to-r from-[#1c1e2b] via-[#181923] to-[#14151c] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#111218] border border-white/10 flex items-center justify-center p-3 text-white">
            <Github size={32} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white">Parteek Garg</h2>
              <span className="text-xs font-mono text-neutral-400">@parteek1907</span>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              Building open-source full-stack architectures, RAG pipelines, and hackathon platforms.
            </p>
          </div>
        </div>

        <a
          href={socialLinks.github}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg text-xs font-medium bg-white/10 hover:bg-white/15 text-white transition-colors flex items-center gap-2 border border-white/10 shrink-0 self-start sm:self-auto"
        >
          <Github size={14} /> View GitHub Profile <ExternalLink size={12} />
        </a>
      </div>

      {/* Contribution Calendar */}
      <div className="bg-[#1e1f2a]/60 rounded-xl p-5 border border-white/5 space-y-3 overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GitCommit size={16} className="text-emerald-400" />
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Contribution Activity
            </h3>
          </div>
          <span className="text-[11px] text-neutral-400">Public Commit History</span>
        </div>

        <div className="overflow-x-auto py-2 custom-scrollbar">
          <div className="min-w-[680px] flex justify-center">
            <GitHubCalendar
              username="parteek1907"
              colorScheme="dark"
              theme={customTheme}
              fontSize={11}
              blockSize={11}
              blockMargin={4}
            />
          </div>
        </div>
      </div>

      {/* Pinned Repositories Grid */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <FolderGit2 size={16} className="text-sky-400" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
            Pinned Repositories
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PINNED_REPOS.map((repo) => (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-[#1e1f2a]/50 hover:bg-[#1e1f2a] border border-white/5 hover:border-sky-500/30 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-sky-400 group-hover:text-sky-300">
                  <span className="flex items-center gap-1.5 truncate">
                    <Code2 size={14} /> {repo.name}
                  </span>
                  <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-1" />
                </div>
                <p className="text-xs text-neutral-400 mt-2 line-clamp-2 leading-relaxed">
                  {repo.desc}
                </p>
              </div>

              <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/5 text-[11px] text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full inline-block"
                    style={{ backgroundColor: repo.langColor }}
                  />
                  {repo.language}
                </span>
                <span className="flex items-center gap-1">
                  <Star size={12} /> {repo.stars}
                </span>
                <span className="flex items-center gap-1">
                  <GitFork size={12} /> {repo.forks}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
