"use client";

import React, { useState } from "react";
import { 
  Download, 
  ExternalLink, 
  FileText, 
  GraduationCap, 
  Briefcase, 
  Code, 
  Award,
  Eye,
  CheckCircle2
} from "lucide-react";

export default function ResumeApp() {
  const [viewMode, setViewMode] = useState<"interactive" | "pdf">("interactive");

  return (
    <div className="h-full flex flex-col bg-[#18181f] text-neutral-200 select-text overflow-hidden min-h-0">
      {/* Top Action Toolbar */}
      <div className="px-5 py-3 border-b border-white/5 bg-[#14151c] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <FileText size={18} className="text-sky-400" />
          <div>
            <h2 className="text-xs font-bold text-white uppercase tracking-wider">
              ParteekGarg_Resume.pdf
            </h2>
            <span className="text-[10px] text-neutral-400">Updated: October 2026 &middot; PDF Document (305 KB)</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* View toggle */}
          <div className="hidden sm:flex items-center bg-white/5 rounded-lg p-0.5 border border-white/5">
            <button
              onClick={() => setViewMode("interactive")}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                viewMode === "interactive" ? "bg-white/10 text-white" : "text-neutral-400 hover:text-white"
              }`}
            >
              Executive View
            </button>
            <button
              onClick={() => setViewMode("pdf")}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                viewMode === "pdf" ? "bg-white/10 text-white" : "text-neutral-400 hover:text-white"
              }`}
            >
              Raw PDF
            </button>
          </div>

          <a
            href="/ParteekGarg_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="ParteekGarg_Resume.pdf"
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-sky-600 hover:bg-sky-500 text-white transition-colors flex items-center gap-1.5 shadow-sm shadow-sky-600/20"
          >
            <Download size={13} /> Download
          </a>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === "interactive" ? (
        <div className="flex-1 min-h-0 overflow-y-auto p-6 space-y-6 custom-scrollbar max-w-4xl mx-auto w-full overscroll-contain">
          {/* Header Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1e202e] to-[#15161f] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-serif font-bold text-white tracking-wide">Parteek Garg</h1>
              <p className="text-xs text-sky-400 font-medium mt-1 uppercase tracking-wider">
                Full-Stack Systems Engineer &middot; B.Tech CSE (Data Science)
              </p>
              <p className="text-xs text-neutral-400 mt-2 max-w-lg leading-relaxed">
                First-year engineering student building verified full-stack applications, graph talent discovery systems, and financial AI infrastructure.
              </p>
            </div>
            <div className="text-xs text-neutral-400 space-y-1 text-left sm:text-right shrink-0">
              <div>Chandigarh, India</div>
              <div>gargparteek1907@gmail.com</div>
              <div className="text-sky-400">parteekgarg.in</div>
            </div>
          </div>

          {/* Education */}
          <div className="bg-[#1e1f2a]/60 rounded-xl p-5 border border-white/5 space-y-3">
            <div className="flex items-center gap-2 border-b border-white/5 pb-2 text-sky-400 font-semibold text-xs uppercase tracking-wider">
              <GraduationCap size={16} /> Education
            </div>
            <div className="flex items-start justify-between flex-wrap gap-2">
              <div>
                <h3 className="text-sm font-bold text-white">Bachelor of Technology &ndash; Computer Science and Engineering</h3>
                <p className="text-xs text-neutral-300 mt-0.5">Specialization in Data Science &middot; NMIMS Chandigarh</p>
              </div>
              <span className="text-xs font-medium text-neutral-400 bg-white/5 px-2.5 py-1 rounded-md">2024 &ndash; 2028</span>
            </div>
          </div>

          {/* Hackathon Wins & Experience */}
          <div className="bg-[#1e1f2a]/60 rounded-xl p-5 border border-white/5 space-y-4">
            <div className="flex items-center gap-2 border-b border-white/5 pb-2 text-amber-400 font-semibold text-xs uppercase tracking-wider">
              <Award size={16} /> Selected Hackathons &amp; Achievements
            </div>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-black/20 border border-white/5">
                <div className="flex items-center justify-between font-semibold text-white">
                  <span>AI Ideathon &middot; 1st Place Winner 🏆</span>
                  <span className="text-neutral-400 font-normal">Oct 2026</span>
                </div>
                <p className="text-neutral-300 mt-1">
                  Built CrossCheck in 10 hours: multilingual fraud reporting through WhatsApp Business API with golden-hour escalation protocols.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-black/20 border border-white/5">
                <div className="flex items-center justify-between font-semibold text-white">
                  <span>Prayas Tech Hackathon &middot; 1st Place Winner 🏆</span>
                  <span className="text-neutral-400 font-normal">Sep 2026</span>
                </div>
                <p className="text-neutral-300 mt-1">
                  Team Lead &amp; Architect for Sanket: offline-first emergency disaster relief communications for 40+ competing teams at UIET Panjab University.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-black/20 border border-white/5">
                <div className="flex items-center justify-between font-semibold text-white">
                  <span>HackShift-IIITD &middot; Top 30 Finalist</span>
                  <span className="text-neutral-400 font-normal">Oct 2026</span>
                </div>
                <p className="text-neutral-300 mt-1">
                  Team Lead for KIN: proof-of-work talent network selected in Top 30 out of 2,000 national teams at IIIT Delhi.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-black/20 border border-white/5">
                <div className="flex items-center justify-between font-semibold text-white">
                  <span>StoxraHack &middot; Top 6 Finalist</span>
                  <span className="text-neutral-400 font-normal">Aug 2026</span>
                </div>
                <p className="text-neutral-300 mt-1">
                  Built FinWise AI financial learning simulator across 3,500+ national competing teams.
                </p>
              </div>
            </div>
          </div>

          {/* Featured Technical Projects */}
          <div className="bg-[#1e1f2a]/60 rounded-xl p-5 border border-white/5 space-y-4">
            <div className="flex items-center gap-2 border-b border-white/5 pb-2 text-indigo-400 font-semibold text-xs uppercase tracking-wider">
              <Briefcase size={16} /> Core Technical Projects
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <h4 className="font-bold text-white">KIN &ndash; Graph-Based Talent Discovery Platform</h4>
                <p className="text-neutral-400 text-[11px] font-mono mt-0.5">Next.js 14, TypeScript, FastAPI, PostgreSQL, HTML5 Canvas, Firebase Auth</p>
                <p className="text-neutral-300 mt-1 leading-relaxed">
                  Artifact-oriented networking engine with force-directed Canvas visualization, 114 automated backend unit/integration tests, and an auditable reputation ledger.
                </p>
              </div>

              <div className="pt-2 border-t border-white/5">
                <h4 className="font-bold text-white">CrossCheck &ndash; Multilingual Incident Escalation System</h4>
                <p className="text-neutral-400 text-[11px] font-mono mt-0.5">Next.js, TypeScript, WhatsApp API, Speech-to-Text, NLP, Golden-Hour Workflow</p>
                <p className="text-neutral-300 mt-1 leading-relaxed">
                  Transforms scam disclosures across 11 Indian languages into structured, verifiable incident files for rapid reporting to banks and India&apos;s 1930 helpline.
                </p>
              </div>

              <div className="pt-2 border-t border-white/5">
                <h4 className="font-bold text-white">Veralon &ndash; Deterministic Credibility Intelligence</h4>
                <p className="text-neutral-400 text-[11px] font-mono mt-0.5">TypeScript, React, Express, Supabase RLS, Groq LLM, RAG Architecture</p>
                <p className="text-neutral-300 mt-1 leading-relaxed">
                  Evaluates claims against 30+ sources with Union-Find evidence clustering, an 8-component 100-point scoring algorithm, and cryptographic SHA-256 audit trails.
                </p>
              </div>
            </div>
          </div>

          {/* Skills Breakdown */}
          <div className="bg-[#1e1f2a]/60 rounded-xl p-5 border border-white/5 space-y-3">
            <div className="flex items-center gap-2 border-b border-white/5 pb-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider">
              <Code size={16} /> Technical Skills
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <span className="font-semibold text-white w-32 shrink-0">Languages:</span>
                <span className="text-neutral-300">Python, Java, TypeScript, C, SQL</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <span className="font-semibold text-white w-32 shrink-0">Frontend:</span>
                <span className="text-neutral-300">React.js, Next.js, HTML5, CSS3, Tailwind CSS, Framer Motion</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <span className="font-semibold text-white w-32 shrink-0">Backend &amp; DB:</span>
                <span className="text-neutral-300">FastAPI, Node.js, Express, PostgreSQL, Supabase, SQLAlchemy</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <span className="font-semibold text-white w-32 shrink-0">AI &amp; Tools:</span>
                <span className="text-neutral-300">RAG, Gemini Vision, Groq LLM, Git, GitHub, VS Code, Playwright</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 w-full h-full bg-[#202028]">
          <iframe
            src="/ParteekGarg_Resume.pdf#toolbar=0"
            className="w-full h-full border-none"
            title="Parteek Garg Resume PDF"
          />
        </div>
      )}
    </div>
  );
}
