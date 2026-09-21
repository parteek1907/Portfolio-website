"use client";

import React from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

// Mock Data
const timelineData = [
  {
    title: "Lumiere",
    event: "Google Solution Challenge 2026",
    role: "Team Lead",
    time: "Built in 30 Hours",
    stack: ["Next.js", "React", "FastAPI", "PostgreSQL"],
    description:
      "AI-powered patient identity resolution system detecting duplicate records with hybrid matching.",
    github: "#",
    link: "#",
  },
  {
    title: "PriorAI",
    event: "Vibe2Ship Hackathon",
    role: "",
    time: "",
    stack: ["Firebase", "Google Cloud Platform"],
    description: "Intelligent task and calendar management web application.",
    github: "#",
    link: "#",
  },
  {
    title: "Team Entropy",
    event: "Confluence 2.0",
    role: "Team Leader",
    time: "",
    stack: [],
    description: "International online hackathon project.",
    github: "#",
    link: "#",
  },
];

export function HackathonTimeline() {
  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 md:px-8 py-24">
      {/* Main Branch Line */}
      <div className="absolute top-0 bottom-0 left-[24px] md:left-1/2 w-[2px] bg-zinc-800 -translate-x-1/2 z-0" />

      <div className="flex flex-col gap-16 md:gap-24">
        {timelineData.map((item, index) => {
          const isLeft = index % 2 === 0;

          return (
            <div
              key={index}
              className="relative flex items-center justify-between md:justify-normal w-full group"
            >
              {/* Timeline Node */}
              <motion.div
                className="absolute left-[8px] md:left-1/2 w-4 h-4 rounded-full border-2 border-zinc-700 bg-zinc-900 z-10 -translate-x-1/2"
                initial={{
                  backgroundColor: "#18181b",
                  borderColor: "#3f3f46",
                  boxShadow: "0 0 0px rgba(20,184,166,0)",
                }}
                whileInView={{
                  backgroundColor: "#14b8a6",
                  borderColor: "#14b8a6",
                  boxShadow: "0 0 15px rgba(20,184,166,0.5)",
                }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4 }}
              />

              {/* Connecting Wire - Mobile */}
              <motion.div
                className="md:hidden absolute h-[1px] bg-zinc-800 top-1/2 -translate-y-1/2 left-[8px] w-6 z-0 origin-left"
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: 0.2 }}
              />

              {/* Connecting Wire - Desktop */}
              <motion.div
                className={`hidden md:block absolute h-[1px] bg-zinc-800 top-1/2 -translate-y-1/2 z-0 ${
                  isLeft ? "right-1/2 w-8 origin-right" : "left-1/2 w-8 origin-left"
                }`}
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: 0.2 }}
              />

              {/* Content Container */}
              <div
                className={`w-full md:w-1/2 pl-8 md:pl-0 ${
                  isLeft
                    ? "md:pr-8 md:text-right"
                    : "md:pl-8 md:ml-auto md:text-left"
                }`}
              >
                <motion.div
                  className="flex flex-col border border-white/10 rounded-xl overflow-hidden bg-black/50 backdrop-blur-md shadow-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                >
                  {/* macOS Terminal Header */}
                  <div className="flex items-center px-4 py-3 bg-zinc-900/80 border-b border-white/5">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                  </div>

                  {/* Body */}
                  <div
                    className={`p-6 flex flex-col gap-4 ${
                      isLeft ? "md:items-end" : "md:items-start"
                    } items-start`}
                  >
                    {/* Title and Event */}
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-zinc-100">
                        {item.title}
                      </h3>
                      <p className="text-teal-400 font-mono text-xs md:text-sm mt-1">
                        {item.event}
                      </p>
                    </div>

                    {/* Role and Time */}
                    {(item.role || item.time) && (
                      <div className="text-zinc-400 text-xs md:text-sm flex flex-wrap items-center gap-2">
                        {item.role && <span>{item.role}</span>}
                        {item.role && item.time && (
                          <span className="text-zinc-600 hidden md:inline">•</span>
                        )}
                        {item.time && <span>{item.time}</span>}
                      </div>
                    )}

                    {/* Description */}
                    <p
                      className={`text-zinc-400 text-sm leading-relaxed max-w-md ${
                        isLeft ? "md:text-right" : "md:text-left"
                      } text-left`}
                    >
                      {item.description}
                    </p>

                    {/* Tech Stack Pills */}
                    {item.stack && item.stack.length > 0 && (
                      <div
                        className={`flex flex-wrap gap-2 mt-2 ${
                          isLeft ? "md:justify-end" : "md:justify-start"
                        } justify-start`}
                      >
                        {item.stack.map((tech) => (
                          <span
                            key={tech}
                            className="bg-zinc-800 text-zinc-300 text-xs px-2 py-1 rounded-full border border-zinc-700/50"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Links */}
                    {(item.github || item.link) && (
                      <div
                        className={`flex items-center gap-4 mt-2 ${
                          isLeft ? "md:justify-end" : "md:justify-start"
                        } justify-start`}
                      >
                        {item.github && (
                          <a
                            href={item.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-400 hover:text-teal-400 transition-colors"
                          >
                            <Github className="w-5 h-5" />
                          </a>
                        )}
                        {item.link && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-400 hover:text-teal-400 transition-colors"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HackathonTimeline;
