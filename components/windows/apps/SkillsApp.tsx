"use client";

import React, { useState } from "react";
import { expertise } from "@/lib/data";
import { 
  Cpu, 
  Terminal, 
  Layout, 
  Server, 
  Database, 
  Sparkles, 
  Globe, 
  Search,
  CheckCircle,
  BarChart3
} from "lucide-react";

export default function SkillsApp() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categoryIcons: Record<string, React.ReactNode> = {
    "Programming Languages": <Terminal size={15} className="text-amber-400" />,
    "Frontend": <Layout size={15} className="text-sky-400" />,
    "Backend & Tools": <Server size={15} className="text-emerald-400" />,
    "Databases": <Database size={15} className="text-violet-400" />,
    "AI / Data Science": <Sparkles size={15} className="text-rose-400" />,
    "Domains": <Globe size={15} className="text-cyan-400" />,
  };

  const categories = ["All", ...expertise.map((e) => e.area)];

  const filteredExpertise = expertise
    .filter((e) => selectedCategory === "All" || e.area === selectedCategory)
    .map((e) => ({
      ...e,
      technologies: e.technologies.filter((t) =>
        t.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((e) => e.technologies.length > 0);

  const totalSkillsCount = expertise.reduce((acc, curr) => acc + curr.technologies.length, 0);

  return (
    <div className="h-full flex flex-col bg-[#18181f] text-neutral-200 select-text overflow-hidden">
      {/* Top Header / Performance Monitor Bar */}
      <div className="p-5 border-b border-white/5 bg-gradient-to-r from-[#1c1d28] to-[#161720] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 size={18} className="text-sky-400" />
            <h2 className="text-lg font-bold text-white">Technical Capabilities &amp; Stack</h2>
          </div>
          <p className="text-xs text-neutral-400 mt-0.5">
            Verified engineering competencies across {expertise.length} domains &middot; {totalSkillsCount} core tools
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Search skills (e.g. Python, React)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#13141b] border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-sky-500 transition-colors"
          />
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="px-5 py-2.5 bg-[#14151c] border-b border-white/5 flex items-center gap-1.5 overflow-x-auto custom-scrollbar shrink-0">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              selectedCategory === cat
                ? "bg-sky-500/20 text-sky-400 border border-sky-500/30"
                : "bg-white/5 text-neutral-400 hover:text-neutral-200 border border-transparent"
            }`}
          >
            {categoryIcons[cat]}
            {cat}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar">
        {filteredExpertise.map((cat) => (
          <div key={cat.area} className="bg-[#1e1f2a]/60 rounded-xl p-4 border border-white/5 space-y-3">
            <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-black/30 border border-white/5">
                  {categoryIcons[cat.area] || <Cpu size={14} className="text-sky-400" />}
                </span>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
                  {cat.area}
                </h3>
              </div>
              <span className="text-[11px] font-medium text-neutral-500">
                {cat.technologies.length} skills
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 pt-1">
              {cat.technologies.map((tech) => (
                <div
                  key={tech}
                  className="px-3 py-2 rounded-lg bg-black/20 hover:bg-black/40 border border-white/5 hover:border-sky-500/30 transition-all flex items-center justify-between group"
                >
                  <span className="text-xs text-neutral-200 font-medium group-hover:text-white transition-colors">
                    {tech}
                  </span>
                  <CheckCircle size={12} className="text-emerald-400/80 shrink-0" />
                </div>
              ))}
            </div>
          </div>
        ))}

        {filteredExpertise.length === 0 && (
          <div className="text-center py-12 text-neutral-500 text-xs">
            No technical skills matching &quot;{search}&quot;.
          </div>
        )}
      </div>
    </div>
  );
}
