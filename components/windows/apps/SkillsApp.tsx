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
  Check,
  Folder
} from "lucide-react";

export default function SkillsApp() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categoryIcons: Record<string, React.ReactNode> = {
    "Programming Languages": <Terminal size={14} className="text-neutral-400" />,
    "Frontend": <Layout size={14} className="text-neutral-400" />,
    "Backend & Tools": <Server size={14} className="text-neutral-400" />,
    "Databases": <Database size={14} className="text-neutral-400" />,
    "AI / Data Science": <Sparkles size={14} className="text-neutral-400" />,
    "Domains": <Globe size={14} className="text-neutral-400" />,
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
    <div className="h-full flex flex-col bg-[#191919] text-white select-text overflow-hidden min-h-0 font-sans">
      {/* Top Windows 11 App Bar */}
      <div className="px-5 py-3.5 border-b border-[#323232] bg-[#212121] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <Cpu size={16} className="text-neutral-300" />
            <h2 className="text-sm font-semibold text-white">Installed Technologies &amp; Capabilities</h2>
          </div>
          <p className="text-xs text-neutral-400 mt-0.5">
            {expertise.length} Domains &middot; {totalSkillsCount} Verified Tools
          </p>
        </div>

        {/* Windows Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Search installed tools (e.g. Python, React)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#1c1c1c] border border-[#383838] focus:border-white rounded px-2.5 pl-8 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Category Filter Bar */}
      <div className="px-5 py-2.5 bg-[#1c1c1c] border-b border-[#323232] flex items-center gap-1.5 overflow-x-auto custom-scrollbar shrink-0">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 border ${
              selectedCategory === cat
                ? "bg-[#333333] text-white border-[#484848]"
                : "bg-[#252525] text-neutral-300 hover:text-white border-[#323232] hover:bg-[#2e2e2e]"
            }`}
          >
            {categoryIcons[cat]}
            {cat}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="flex-1 min-h-0 overflow-y-auto p-5 space-y-4 custom-scrollbar overscroll-contain">
        {filteredExpertise.map((cat) => (
          <div key={cat.area} className="bg-[#202020] rounded border border-[#323232] p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-[#2d2d2d] pb-2.5">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded bg-[#2b2b2b] border border-[#383838] text-neutral-300">
                  {categoryIcons[cat.area] || <Folder size={14} />}
                </span>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
                  {cat.area}
                </h3>
              </div>
              <span className="text-[11px] text-neutral-400">
                {cat.technologies.length} tools
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 pt-1">
              {cat.technologies.map((tech) => (
                <div
                  key={tech}
                  className="px-3 py-2 rounded bg-[#272727] hover:bg-[#2e2e2e] border border-[#353535] transition-colors flex items-center justify-between"
                >
                  <span className="text-xs text-neutral-200 font-medium">
                    {tech}
                  </span>
                  <Check size={12} className="text-neutral-400 shrink-0" />
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
