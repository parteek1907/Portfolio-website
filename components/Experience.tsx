"use client";

import { Timeline } from "./ui/timeline";

export default function Experience() {
  const data = [
    {
      title: "Apr 2026",
      content: (
        <div className="flex flex-col gap-6 text-neutral-400 text-sm md:text-base font-normal">
          
          <div>
            <p className="font-semibold text-neutral-200 mb-1 tracking-wider text-xs uppercase">Event</p>
            <p>Hack-O-Mania 2.0</p>
            <p className="text-sm text-neutral-300 font-medium mt-1.5">30 Hours &middot; Offline &middot; SVKM’s NMIMS, Chandigarh &middot; 20 Teams</p>
          </div>

          <div>
            <p className="font-semibold text-neutral-200 mb-1 tracking-wider text-xs uppercase">Role</p>
            <p>Team Lead &middot; Backend Development &middot; Database</p>
          </div>

          <div>
            <p className="font-semibold text-neutral-200 mb-1 tracking-wider text-xs uppercase">Result</p>
            <p>Qualified for the Offline Round</p>
            <div className="mt-2 pl-4 border-l-2 border-neutral-700 text-neutral-500">
              <p>20 teams participated in the offline hackathon.</p>
              <p>The project received positive feedback from the judges.</p>
            </div>
          </div>

          <div>
            <p className="font-semibold text-neutral-200 mb-1 tracking-wider text-xs uppercase">Takeaway</p>
            <p>Learned to develop and present a complete technical solution under hackathon conditions.</p>
          </div>

          <div>
            <p className="font-semibold text-neutral-200 mb-1 tracking-wider text-xs uppercase">Project</p>
            <a href="#projects" className="text-white hover:text-neutral-300 transition-colors underline underline-offset-4">
              Lumiere
            </a>
          </div>

        </div>
      ),
    },
    {
      title: "Jun 2026",
      content: (
        <div className="flex flex-col gap-6 text-neutral-400 text-sm md:text-base font-normal">
          
          <div>
            <p className="font-semibold text-neutral-200 mb-1 tracking-wider text-xs uppercase">Event</p>
            <p>Confluence 2.0</p>
            <p className="text-sm text-neutral-300 font-medium mt-1.5">81 Hours &middot; Online &middot; SRM Institute of Science and Technology &middot; 500+ Teams &middot; 2,000+ Participants</p>
          </div>

          <div>
            <p className="font-semibold text-neutral-200 mb-1 tracking-wider text-xs uppercase">Role</p>
            <p>Team Lead &middot; Backend Development &middot; Database</p>
          </div>

          <div>
            <p className="font-semibold text-neutral-200 mb-1 tracking-wider text-xs uppercase">Result</p>
            <p>Rank 67</p>
            <div className="mt-2 pl-4 border-l-2 border-neutral-700 text-neutral-500 space-y-1">
              <p>81-hour national-level hackathon with 500+ teams and 2,000+ participants.</p>
              <p>Progression: PPT Submission → Idea Pitch → Top 100 → Rank 67</p>
            </div>
          </div>

          <div>
            <p className="font-semibold text-neutral-200 mb-1 tracking-wider text-xs uppercase">Takeaway</p>
            <p>Learned to iterate on an existing product, strengthen its technical implementation, and make architecture decisions under a demanding development window.</p>
          </div>

          <div>
            <p className="font-semibold text-neutral-200 mb-1 tracking-wider text-xs uppercase">Project</p>
            <a href="#projects" className="text-white hover:text-neutral-300 transition-colors underline underline-offset-4">
              Lumiere
            </a>
          </div>

        </div>
      ),
    },
    {
      title: "Aug 2026",
      content: (
        <div className="flex flex-col gap-6 text-neutral-400 text-sm md:text-base font-normal">
          
          <div>
            <p className="font-semibold text-neutral-200 mb-1 tracking-wider text-xs uppercase">Event</p>
            <p>StoxraHack 2026</p>
            <p className="text-sm text-neutral-300 font-medium mt-1.5">48 Hours &middot; Online &middot; Hosted by Stoxra &middot; 800+ Teams &middot; 3,500+ Participants</p>
          </div>

          <div>
            <p className="font-semibold text-neutral-200 mb-1 tracking-wider text-xs uppercase">Role</p>
            <p>Team Lead &middot; Frontend Development &middot; API Integration</p>
          </div>

          <div>
            <p className="font-semibold text-neutral-200 mb-1 tracking-wider text-xs uppercase">Result</p>
            <p>Top 12 · Final Round</p>
            <div className="mt-2 pl-4 border-l-2 border-neutral-700 text-neutral-500 space-y-1">
              <p>3,500+ participants.</p>
              <p>Progression: PPT Submission → Idea Pitch → MVP Pitch → Top 12</p>
            </div>
          </div>

          <div>
            <p className="font-semibold text-neutral-200 mb-1 tracking-wider text-xs uppercase">Takeaway</p>
            <p>Learned to translate a financial problem into an AI-powered product while progressing through multiple stages of product evaluation.</p>
          </div>

          <div>
            <p className="font-semibold text-neutral-200 mb-1 tracking-wider text-xs uppercase">Project</p>
            <a href="#projects" className="text-white hover:text-neutral-300 transition-colors underline underline-offset-4">
              FinWise AI
            </a>
          </div>

        </div>
      ),
    },
    {
      title: "Sep 2026",
      isWinner: true,
      content: (
        <div className="flex flex-col gap-6 text-neutral-400 text-sm md:text-base font-normal">
          
          <div>
            <p className="font-semibold text-neutral-200 mb-1 tracking-wider text-xs uppercase">Event</p>
            <p>ACM Ideathon — Smart India Hackathon 2026</p>
            <p className="text-sm text-neutral-300 font-medium mt-1.5">20 Teams &middot; NMIMS Chandigarh</p>
          </div>

          <div>
            <p className="font-semibold text-neutral-200 mb-1 tracking-wider text-xs uppercase">Role</p>
            <p>Android App Development &middot; Technical Research</p>
          </div>

          <div>
            <p className="font-semibold text-neutral-200 mb-1 tracking-wider text-xs uppercase">Result</p>
            <p className="text-neutral-200 font-medium">Winner &middot; Selected for SIH 2026</p>
            <div className="mt-2 pl-4 border-l-2 border-neutral-700 text-neutral-500 space-y-1">
              <p>Developed Sanket, an ocean and coastal safety intelligence platform combining citizen hazard reporting, environmental intelligence, AI-assisted analysis, geospatial risk assessment, alerts, and emergency response.</p>
              <p>The project won the ACM Ideathon among 20 teams, securing selection for Smart India Hackathon 2026.</p>
              <p>Progression: 20 Teams → Winner → SIH 2026 Selection</p>
            </div>
          </div>

          <div>
            <p className="font-semibold text-neutral-200 mb-1 tracking-wider text-xs uppercase">Takeaway</p>
            <p>Contributed to Sanket through Android application development and technical research, translating the problem statement into a functional mobile safety platform and helping refine the product for competitive evaluation.</p>
          </div>

          <div>
            <p className="font-semibold text-neutral-200 mb-1 tracking-wider text-xs uppercase">Project</p>
            <a href="#projects" className="text-white hover:text-neutral-300 transition-colors underline underline-offset-4">
              Sanket
            </a>
          </div>

        </div>
      ),
    },
    {
      title: "Sep 2026",
      isWinner: true,
      content: (
        <div className="flex flex-col gap-6 text-neutral-400 text-sm md:text-base font-normal">
          
          <div>
            <p className="font-semibold text-neutral-200 mb-1 tracking-wider text-xs uppercase">Event</p>
            <p>Prayas – Tech Hackathon</p>
            <p className="text-sm text-neutral-300 font-medium mt-1.5">24 Hours &middot; Offline &middot; Plaksha University, Mohali &middot; 150 Teams</p>
          </div>

          <div>
            <p className="font-semibold text-neutral-200 mb-1 tracking-wider text-xs uppercase">Role</p>
            <p>Team Lead &middot; Frontend Development &middot; Technical Research &middot; Product Presentation</p>
          </div>

          <div>
            <p className="font-semibold text-neutral-200 mb-1 tracking-wider text-xs uppercase">Result</p>
            <p className="flex items-center gap-2 text-neutral-200 font-medium">
              Winner 
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
            </p>
            <div className="mt-2 pl-4 border-l-2 border-neutral-700 text-neutral-500 space-y-1">
              <p>150 teams participated, with Ziro progressing through multiple evaluation rounds to the Top 5 before winning the hackathon.</p>
              <p>Progression: 150 Teams → Top 50 → Top 5 → Winner</p>
            </div>
          </div>

          <div>
            <p className="font-semibold text-neutral-200 mb-1 tracking-wider text-xs uppercase">Takeaway</p>
            <p>Learned to build, refine, and present a complete financial technology solution under intense 24-hour hackathon constraints.</p>
          </div>

          <div>
            <p className="font-semibold text-neutral-200 mb-1 tracking-wider text-xs uppercase">Project</p>
            <a href="#projects" className="text-white hover:text-neutral-300 transition-colors underline underline-offset-4">
              Ziro
            </a>
          </div>

        </div>
      ),
    },
  ];

  return (
    <section
      id="experience"
      className="scroll-mt-24 w-full"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      <Timeline data={data} />
    </section>
  );
}
