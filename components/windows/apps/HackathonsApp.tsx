"use client";

import React, { useState } from "react";
import { 
  Trophy, 
  Calendar, 
  MapPin, 
  Users, 
  CheckCircle, 
  ExternalLink,
  Target,
  ArrowUpRight,
  Sparkles
} from "lucide-react";

interface HackathonEvent {
  id: string;
  name: string;
  date: string;
  venue: string;
  duration: string;
  teams: string;
  role: string;
  result: string;
  isWinner: boolean;
  project: string;
  projectSlug: string;
  progression: string;
  description: string;
  takeaway: string;
}

const HACKATHONS: HackathonEvent[] = [
  {
    id: "hackshift-2026",
    name: "HackShift-IIITD",
    date: "October 2026",
    venue: "IIIT Delhi",
    duration: "24 Hours (Offline)",
    teams: "2,000 Teams",
    role: "Team Lead · Frontend Engineering · API Integration",
    result: "Top 30 Teams Overall",
    isWinner: false,
    project: "KIN",
    projectSlug: "kin",
    progression: "2,000 Teams → Top 220 Teams (Offline Round) → Top 30 Teams Finalists",
    description: "Led the development of KIN, a proof-of-work-driven professional networking platform designed to connect students, alumni, and founders through verified expertise, career intelligence, and trusted introductions.",
    takeaway: "Developed experience in coordinating frontend engineering and API integration for a multi-layered networking platform. The project involved designing around evidence-based talent discovery, graph-based relationships, and persistent backend workflows.",
  },
  {
    id: "ai-ideathon-2026",
    name: "AI Ideathon",
    date: "October 2026",
    venue: "SVKM’s NMIMS, Chandigarh",
    duration: "10 Hours (Offline)",
    teams: "11 Selected Teams",
    role: "Frontend Engineering · WhatsApp Agent Development",
    result: "1st Place Winner 🏆",
    isWinner: true,
    project: "CrossCheck",
    projectSlug: "crosscheck",
    progression: "Direct 1st Place Winner Announcement",
    description: "Developed CrossCheck, a WhatsApp-based financial scam reporting platform that converts multilingual voice and text reports in 11 Indian languages into structured, actionable reports for golden-hour fraud intervention.",
    takeaway: "Rapid engineering under extreme 10-hour constraints, focusing on multilingual NLP, information extraction, and accessible WhatsApp Business API conversational flows.",
  },
  {
    id: "prayas-2026",
    name: "Prayas – Tech Hackathon",
    date: "September 2026",
    venue: "UIET, Panjab University, Chandigarh",
    duration: "36 Hours (Offline)",
    teams: "40+ Teams",
    role: "Team Lead · Full Stack Engineering · System Architecture",
    result: "Winner / 1st Place 🏆",
    isWinner: true,
    project: "Sanket",
    projectSlug: "sanket",
    progression: "Top 40 Teams → Final Stage → Winner Announcement",
    description: "Architected Sanket, an offline-first disaster response and crisis communication platform connecting stranded citizens with emergency responders through mesh notifications and decentralized report clusters.",
    takeaway: "Engineered offline synchronization queues, fault-tolerant state persistence, and coordinated team execution during intense 36-hour physical hackathon environments.",
  },
  {
    id: "stoxrahack-2026",
    name: "StoxraHack 2026",
    date: "August 2026",
    venue: "Virtual / National",
    duration: "48 Hours",
    teams: "3,500+ Teams",
    role: "Team Lead · Frontend Architecture · API Integration",
    result: "Top 6 Finalist (Out of 3,500+ Teams)",
    isWinner: false,
    project: "FinWise",
    projectSlug: "finwise",
    progression: "3,500+ National Teams → Multi-Stage Evaluation → Top 6 Finalists",
    description: "Built FinWise, an AI-powered financial learning ecosystem that bridges financial knowledge with applied simulated trading labs, contextual AI mentoring, and behavioral feedback.",
    takeaway: "Mastered building contextual AI agents that track user progress and provide non-hallucinatory guidance rather than generic chatbot answers.",
  },
  {
    id: "hackomania-2026",
    name: "Hack-O-Mania 2.0",
    date: "April 2026",
    venue: "Chandigarh Campus",
    duration: "30 Hours (Offline)",
    teams: "50+ Teams",
    role: "Team Lead · Backend Architecture · Database Schema",
    result: "Top 10 Finalist",
    isWinner: false,
    project: "Lumiere",
    projectSlug: "lumiere",
    progression: "Round 1 Selection → 30h Overnight Build → Top 10 Finalist Presentation",
    description: "Developed Lumiere, an AI-powered healthcare record deduplication and identity verification engine that ensures real-time patient safety across hospital databases.",
    takeaway: "Hands-on experience in deterministic plus probabilistic record matching, confidence-based review pipelines, and database query optimization under tight latency constraints.",
  },
];

export default function HackathonsApp() {
  const [filter, setFilter] = useState<"all" | "wins">("all");
  const [selectedId, setSelectedId] = useState<string>(HACKATHONS[0].id);

  const displayedHackathons = filter === "all" ? HACKATHONS : HACKATHONS.filter((h) => h.isWinner);
  const selectedEvent = HACKATHONS.find((h) => h.id === selectedId) || displayedHackathons[0];

  return (
    <div className="h-full flex flex-col md:flex-row bg-[#191919] text-[#cccccc] select-text overflow-hidden min-h-0">
      {/* Left List */}
      <div className="w-full md:w-84 border-b md:border-b-0 md:border-r border-[#323232] bg-[#202020] flex flex-col shrink-0 min-h-0">
        {/* Header & Filter */}
        <div className="p-3.5 border-b border-[#323232] shrink-0">
          <div className="flex items-center gap-2 mb-2">
            <Trophy size={16} className="text-[#cccccc]" />
            <h2 className="text-sm font-semibold text-white">Hackathon Track Record</h2>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                filter === "all"
                  ? "bg-[#383838] text-white border border-[#484848]"
                  : "bg-[#2b2b2b] text-[#aaaaaa] hover:text-white border border-[#383838]"
              }`}
            >
              All Events ({HACKATHONS.length})
            </button>
            <button
              onClick={() => setFilter("wins")}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                filter === "wins"
                  ? "bg-[#383838] text-white border border-[#484848]"
                  : "bg-[#2b2b2b] text-[#aaaaaa] hover:text-white border border-[#383838]"
              }`}
            >
              <Trophy size={12} className="text-[#cccccc]" /> Victories ({HACKATHONS.filter((h) => h.isWinner).length})
            </button>
          </div>
        </div>

        {/* List Items */}
        <div className="flex-1 min-h-0 overflow-y-auto p-2 space-y-1 custom-scrollbar max-h-52 md:max-h-none overscroll-contain">
          {displayedHackathons.map((h) => {
            const isSelected = selectedEvent?.id === h.id;
            return (
              <button
                key={h.id}
                onClick={() => setSelectedId(h.id)}
                className={`w-full text-left p-2.5 rounded transition-colors cursor-pointer flex flex-col gap-1 ${
                  isSelected
                    ? "bg-[#2b2b2b] text-white border-l-2 border-[#0078D4]"
                    : "hover:bg-[#282828] text-[#cccccc] border-l-2 border-transparent"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#777777] font-mono">{h.date}</span>
                  {h.isWinner ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#191919] text-white border border-[#383838] flex items-center gap-1">
                      <Trophy size={10} className="text-[#cccccc]" /> Winner
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#191919] text-[#aaaaaa] border border-[#383838]">
                      Finalist
                    </span>
                  )}
                </div>
                <h4 className="text-xs font-medium text-white">{h.name}</h4>
                <div className="flex items-center justify-between text-[11px] text-[#888888] mt-0.5">
                  <span>{h.project}</span>
                  <span>{h.venue.split(",")[0]}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Detailed Event View */}
      {selectedEvent ? (
        <div className="flex-1 min-h-0 flex flex-col overflow-y-auto p-6 space-y-5 custom-scrollbar bg-[#191919] overscroll-contain">
          {/* Header Card */}
          <div className="p-4 rounded-lg bg-[#202020] border border-[#323232] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#2b2b2b] text-[#cccccc] border border-[#383838]">
                  {selectedEvent.duration}
                </span>
                <span className="text-xs text-[#777777]">&middot;</span>
                <span className="text-xs text-[#aaaaaa] font-medium">{selectedEvent.teams}</span>
              </div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                {selectedEvent.name}
                {selectedEvent.isWinner && <Trophy size={18} className="text-[#cccccc]" />}
              </h2>
              <div className="flex items-center gap-4 mt-1 text-xs text-[#888888]">
                <span className="flex items-center gap-1">
                  <MapPin size={12} className="text-[#888888]" /> {selectedEvent.venue}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={12} className="text-[#888888]" /> {selectedEvent.date}
                </span>
              </div>
            </div>

            <div className="px-4 py-2 rounded bg-[#191919] border border-[#323232] text-center sm:text-right shrink-0">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#888888] block">
                Official Result
              </span>
              <span className="text-sm font-semibold text-white">
                {selectedEvent.result}
              </span>
            </div>
          </div>

          {/* Role & Leadership */}
          <div className="bg-[#202020] rounded-lg p-4 border border-[#323232] space-y-1.5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#aaaaaa]">
              Leadership &amp; Engineering Role
            </h3>
            <p className="text-sm font-medium text-white">{selectedEvent.role}</p>
          </div>

          {/* Project & Progression */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#202020] rounded-lg p-4 border border-[#323232] space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#aaaaaa]">
                Developed Platform
              </h4>
              <div className="text-sm font-bold text-white">
                {selectedEvent.project}
              </div>
              <p className="text-xs text-[#cccccc] leading-relaxed pt-1">
                {selectedEvent.description}
              </p>
            </div>

            <div className="bg-[#202020] rounded-lg p-4 border border-[#323232] space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#aaaaaa]">
                Competitive Progression
              </h4>
              <p className="text-xs text-white font-mono bg-[#191919] p-2.5 rounded border border-[#323232] leading-relaxed">
                {selectedEvent.progression}
              </p>
            </div>
          </div>

          {/* Key Takeaways */}
          <div className="bg-[#202020] rounded-lg p-4 border border-[#323232] space-y-1.5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#aaaaaa] flex items-center gap-1.5">
              <Sparkles size={14} className="text-[#cccccc]" />
              Engineering Takeaway
            </h3>
            <p className="text-xs text-[#cccccc] leading-relaxed">
              {selectedEvent.takeaway}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
