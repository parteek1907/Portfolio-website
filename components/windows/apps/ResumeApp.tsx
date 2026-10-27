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
  CheckCircle2
} from "lucide-react";

export default function ResumeApp() {
  const [viewMode, setViewMode] = useState<"interactive" | "pdf">("interactive");

  return (
    <div className="h-full flex flex-col bg-[#191919] text-[#cccccc] select-text overflow-hidden min-h-0">
      {/* Top Action Toolbar */}
      <div className="px-5 py-2.5 border-b border-[#323232] bg-[#202020] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <FileText size={18} className="text-[#cccccc]" />
          <div>
            <h2 className="text-xs font-semibold text-white uppercase tracking-wider">
              ParteekGarg_Resume.pdf
            </h2>
            <span className="text-[10px] text-[#888888]">Updated: October 2026 &middot; PDF Document (305 KB)</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* View toggle */}
          <div className="hidden sm:flex items-center bg-[#191919] rounded p-0.5 border border-[#383838]">
            <button
              onClick={() => setViewMode("interactive")}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                viewMode === "interactive" ? "bg-[#2f2f2f] text-white border border-[#404040]" : "text-[#aaaaaa] hover:text-white"
              }`}
            >
              Executive View
            </button>
            <button
              onClick={() => setViewMode("pdf")}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                viewMode === "pdf" ? "bg-[#2f2f2f] text-white border border-[#404040]" : "text-[#aaaaaa] hover:text-white"
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
            className="px-3 py-1.5 rounded text-xs font-medium bg-[#0078D4] hover:bg-[#106ebe] text-white transition-colors flex items-center gap-1.5"
          >
            <Download size={13} /> Download
          </a>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === "interactive" ? (
        <div className="flex-1 min-h-0 overflow-y-auto p-6 space-y-5 custom-scrollbar max-w-4xl mx-auto w-full overscroll-contain">
          {/* Header Card */}
          <div className="p-5 rounded-lg bg-[#202020] border border-[#323232] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-wide">Parteek Garg</h1>
              <p className="text-xs text-[#aaaaaa] font-medium mt-1 uppercase tracking-wider">
                Full-Stack Systems Engineer &middot; B.Tech CSE (Data Science)
              </p>
              <p className="text-xs text-[#cccccc] mt-2 max-w-lg leading-relaxed">
                First-year engineering student building verified full-stack applications, graph talent discovery systems, and financial AI infrastructure.
              </p>
            </div>
            <div className="text-xs text-[#888888] space-y-1 text-left sm:text-right shrink-0">
              <div>Chandigarh, India</div>
              <div>gargparteek1907@gmail.com</div>
              <div className="text-white">parteekgarg.in</div>
            </div>
          </div>

          {/* Education */}
          <div className="bg-[#202020] rounded-lg p-4 border border-[#323232] space-y-3">
            <div className="flex items-center gap-2 border-b border-[#323232] pb-2 text-[#aaaaaa] font-semibold text-xs uppercase tracking-wider">
              <GraduationCap size={16} /> Education
            </div>
            <div className="flex items-start justify-between flex-wrap gap-2">
              <div>
                <h3 className="text-sm font-semibold text-white">Bachelor of Technology &ndash; Computer Science and Engineering</h3>
                <p className="text-xs text-[#cccccc] mt-0.5">Specialization in Data Science &middot; NMIMS Chandigarh</p>
              </div>
              <span className="text-xs font-medium text-[#aaaaaa] bg-[#191919] border border-[#383838] px-2 py-0.5 rounded">2024 &ndash; 2028</span>
            </div>
          </div>

          {/* Hackathon Wins & Experience */}
          <div className="bg-[#202020] rounded-lg p-4 border border-[#323232] space-y-3">
            <div className="flex items-center gap-2 border-b border-[#323232] pb-2 text-[#aaaaaa] font-semibold text-xs uppercase tracking-wider">
              <Award size={16} /> Selected Hackathons &amp; Achievements
            </div>
            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded bg-[#191919] border border-[#323232]">
                <div className="flex items-center justify-between font-semibold text-white">
                  <span>AI Ideathon &middot; 1st Place Winner 🏆</span>
                  <span className="text-[#888888] font-normal">Oct 2026</span>
                </div>
                <p className="text-[#cccccc] mt-1">
                  Built CrossCheck in 10 hours: multilingual fraud reporting through WhatsApp Business API with golden-hour escalation protocols.
                </p>
              </div>

              <div className="p-3 rounded bg-[#191919] border border-[#323232]">
                <div className="flex items-center justify-between font-semibold text-white">
                  <span>Prayas Tech Hackathon &middot; 1st Place Winner 🏆</span>
                  <span className="text-[#888888] font-normal">Sep 2026</span>
                </div>
                <p className="text-[#cccccc] mt-1">
                  Team Lead &amp; Architect for Sanket: offline-first emergency disaster relief communications for 40+ competing teams at UIET Panjab University.
                </p>
              </div>

              <div className="p-3 rounded bg-[#191919] border border-[#323232]">
                <div className="flex items-center justify-between font-semibold text-white">
                  <span>HackShift-IIITD &middot; Top 30 Finalist</span>
                  <span className="text-[#888888] font-normal">Oct 2026</span>
                </div>
                <p className="text-[#cccccc] mt-1">
                  Team Lead for KIN: proof-of-work talent network selected in Top 30 out of 2,000 national teams at IIIT Delhi.
                </p>
              </div>

              <div className="p-3 rounded bg-[#191919] border border-[#323232]">
                <div className="flex items-center justify-between font-semibold text-white">
                  <span>StoxraHack &middot; Top 6 Finalist</span>
                  <span className="text-[#888888] font-normal">Aug 2026</span>
                </div>
                <p className="text-[#cccccc] mt-1">
                  Built FinWise AI financial learning simulator across 3,500+ national competing teams.
                </p>
              </div>
            </div>
          </div>

          {/* Featured Technical Projects */}
          <div className="bg-[#202020] rounded-lg p-4 border border-[#323232] space-y-3">
            <div className="flex items-center gap-2 border-b border-[#323232] pb-2 text-[#aaaaaa] font-semibold text-xs uppercase tracking-wider">
              <Briefcase size={16} /> Core Technical Projects
            </div>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded bg-[#191919] border border-[#323232]">
                <h4 className="font-semibold text-white">KIN &ndash; Graph-Based Talent Discovery Platform</h4>
                <p className="text-[#888888] text-[11px] font-mono mt-0.5">Next.js 14, TypeScript, FastAPI, PostgreSQL, HTML5 Canvas, Firebase Auth</p>
                <p className="text-[#cccccc] mt-1 leading-relaxed">
                  Artifact-oriented networking engine with force-directed Canvas visualization, 114 automated backend unit/integration tests, and an auditable reputation ledger.
                </p>
              </div>

              <div className="p-3 rounded bg-[#191919] border border-[#323232]">
                <h4 className="font-semibold text-white">CrossCheck &ndash; Multilingual Incident Escalation System</h4>
                <p className="text-[#888888] text-[11px] font-mono mt-0.5">Next.js, TypeScript, WhatsApp API, Speech-to-Text, NLP, Golden-Hour Workflow</p>
                <p className="text-[#cccccc] mt-1 leading-relaxed">
                  Transforms scam disclosures across 11 Indian languages into structured, verifiable incident files for rapid reporting to banks and India&apos;s 1930 helpline.
                </p>
              </div>

              <div className="p-3 rounded bg-[#191919] border border-[#323232]">
                <h4 className="font-semibold text-white">Veralon &ndash; Deterministic Credibility Intelligence</h4>
                <p className="text-[#888888] text-[11px] font-mono mt-0.5">TypeScript, React, Express, Supabase RLS, Groq LLM, RAG Architecture</p>
                <p className="text-[#cccccc] mt-1 leading-relaxed">
                  Evaluates claims against 30+ sources with Union-Find evidence clustering, an 8-component 100-point scoring algorithm, and cryptographic SHA-256 audit trails.
                </p>
              </div>
            </div>
          </div>

          {/* Skills Breakdown */}
          <div className="bg-[#202020] rounded-lg p-4 border border-[#323232] space-y-3">
            <div className="flex items-center gap-2 border-b border-[#323232] pb-2 text-[#aaaaaa] font-semibold text-xs uppercase tracking-wider">
              <Code size={16} /> Technical Skills
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <span className="font-medium text-[#aaaaaa] w-32 shrink-0">Languages:</span>
                <span className="text-[#ffffff]">Python, Java, TypeScript, C, SQL</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <span className="font-medium text-[#aaaaaa] w-32 shrink-0">Frontend:</span>
                <span className="text-[#ffffff]">React.js, Next.js, HTML5, CSS3, Tailwind CSS, Framer Motion</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <span className="font-medium text-[#aaaaaa] w-32 shrink-0">Backend &amp; DB:</span>
                <span className="text-[#ffffff]">FastAPI, Node.js, Express, PostgreSQL, Supabase, SQLAlchemy</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <span className="font-medium text-[#aaaaaa] w-32 shrink-0">AI &amp; Tools:</span>
                <span className="text-[#ffffff]">RAG, Gemini Vision, Groq LLM, Git, GitHub, VS Code, Playwright</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 w-full h-full bg-[#191919]">
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
