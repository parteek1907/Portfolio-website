"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  AiFillCaretRight, 
  AiOutlinePlusCircle, 
  AiOutlineUndo 
} from "react-icons/ai";
import { BiRename, BiSelection, BiShowAlt, BiSortAlt2 } from "react-icons/bi";
import { BsPinAngle, BsScissors, BsTrash } from "react-icons/bs";
import { FaList, FaRegShareSquare } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  HiArrowLeft,
  HiArrowRight,
  HiArrowUp,
  HiOutlineDesktopComputer,
  HiOutlineViewList,
} from "react-icons/hi";
import { IoMdOptions, IoMdRefresh } from "react-icons/io";
import {
  MdContentCopy,
  MdContentPaste,
  MdOutlineListAlt,
  MdOutlineSelectAll,
  MdOutlineViewCompact,
  MdTabUnselected,
} from "react-icons/md";
import { RiArrowDropDownLine, RiComputerLine } from "react-icons/ri";
import { SiMaterialdesignicons } from "react-icons/si";
import { VscSearch, VscSymbolProperty } from "react-icons/vsc";
import { ExternalLink, Github, Sparkles, CheckCircle2 } from "lucide-react";
import { featuredProjects, FeaturedProject } from "@/lib/data";
import styles from "../styles/FileExplorer.module.css";
import gridStyles from "../styles/GridList.module.css";

export default function ProjectsApp() {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"icons" | "details">("icons");
  const [searchQuery, setSearchQuery] = useState("");
  const [quickAccessOpen, setQuickAccessOpen] = useState(true);
  const [thisPCOpen, setThisPCOpen] = useState(true);
  const [history, setHistory] = useState<string[]>(["This PC > Projects"]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const selectedProject = featuredProjects.find((p) => p.slug === selectedSlug) || null;

  const filteredProjects = featuredProjects.filter((p) => {
    return (
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  const handleOpenProject = (slug: string) => {
    setSelectedSlug(slug);
    const newPath = `This PC > Projects > ${slug}`;
    const nextHistory = history.slice(0, historyIndex + 1);
    nextHistory.push(newPath);
    setHistory(nextHistory);
    setHistoryIndex(nextHistory.length - 1);
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      const prevIdx = historyIndex - 1;
      setHistoryIndex(prevIdx);
      if (prevIdx === 0) {
        setSelectedSlug(null);
      }
    }
  };

  const handleNext = () => {
    if (historyIndex < history.length - 1) {
      const nextIdx = historyIndex + 1;
      setHistoryIndex(nextIdx);
      const targetSlug = history[nextIdx].split("> ").pop()?.trim();
      if (targetSlug && targetSlug !== "Projects") {
        setSelectedSlug(targetSlug);
      }
    }
  };

  const handleUp = () => {
    if (selectedSlug) {
      setSelectedSlug(null);
      const nextHistory = history.slice(0, historyIndex + 1);
      nextHistory.push("This PC > Projects");
      setHistory(nextHistory);
      setHistoryIndex(nextHistory.length - 1);
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#191919] text-white select-none overflow-hidden font-sans min-h-0">
      {/* Top Windows 11 Ribbon / Command Bar */}
      <div className={styles.top}>
        <section className={styles.manage}>
          {/* New */}
          <div className={styles.manageNew}>
            <div className={styles.icon}>
              <AiOutlinePlusCircle />
              <p>New</p>
              <RiArrowDropDownLine />
              <div className={styles.manageDropdown}>
                <div>
                  <Image src="/icons/folder/folder.png" height={18} width={18} alt="Folder" />
                  <p>Folder</p>
                </div>
                <div>
                  <Image src="/icons/notes/notes.png" height={18} width={18} alt="Text Doc" />
                  <p>Text Document</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action icons */}
          <div className={styles.manageActions}>
            <div className={styles.icon} title="Cut"><BsScissors /></div>
            <div className={styles.icon} title="Copy"><MdContentCopy /></div>
            <div className={styles.icon} title="Paste"><MdContentPaste /></div>
            <div className={styles.icon} title="Rename"><BiRename /></div>
            <div className={styles.icon} title="Share"><FaRegShareSquare /></div>
            <div className={styles.icon} title="Delete"><BsTrash /></div>
          </div>

          {/* Sort */}
          <div className={styles.manageSort}>
            <div className={styles.icon}>
              <BiSortAlt2 />
              <p>Sort</p>
              <RiArrowDropDownLine />
              <div className={styles.manageDropdown}>
                <div><p>Name</p></div>
                <div><p>Date modified</p></div>
                <div><p>Ascending</p></div>
                <div><p>Descending</p></div>
              </div>
            </div>
          </div>

          {/* View */}
          <div className={styles.manageView}>
            <div className={styles.icon}>
              <GiHamburgerMenu />
              <p>View</p>
              <RiArrowDropDownLine />
              <div className={styles.manageDropdown}>
                <div onClick={() => setViewMode("icons")}>
                  <RiComputerLine />
                  <p>Large icons</p>
                </div>
                <div onClick={() => setViewMode("details")}>
                  <HiOutlineViewList />
                  <p>Details</p>
                </div>
                <div onClick={() => setViewMode("icons")}>
                  <MdOutlineViewCompact />
                  <p>Compact view</p>
                </div>
              </div>
            </div>
          </div>

          {/* More */}
          <div className={styles.manageMore}>
            <div className={styles.icon}>
              <FiMoreHorizontal />
              <div className={styles.manageDropdown}>
                <div><AiOutlineUndo /><p>Undo</p></div>
                <div><BsPinAngle /><p>Pin to Quick access</p></div>
                <div><MdOutlineSelectAll /><p>Select all</p></div>
                <div><IoMdOptions /><p>Options</p></div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Navigate / Breadcrumb Bar */}
      <section className={styles.navigate}>
        <div className={styles.arrows}>
          <HiArrowLeft
            onClick={handleBack}
            style={{ color: historyIndex > 0 ? "white" : "gray" }}
            title="Back"
          />
          <HiArrowRight
            onClick={handleNext}
            style={{ color: historyIndex < history.length - 1 ? "white" : "gray" }}
            title="Forward"
          />
          <RiArrowDropDownLine />
          <HiArrowUp onClick={handleUp} title="Up to Projects" />
        </div>

        <div className={styles.navigatePath}>
          <div className={styles.left}>
            <Image src="/icons/folder/folder.png" alt="Path icon" width={18} height={18} />
            <AiFillCaretRight />
            <input
              readOnly
              value={selectedProject ? `This PC > Projects > ${selectedProject.title}` : "This PC > Projects"}
            />
          </div>
          <div className={styles.right}>
            <div><RiArrowDropDownLine /></div>
            <div onClick={() => { setSearchQuery(""); setSelectedSlug(null); }}><IoMdRefresh /></div>
          </div>
        </div>

        <div className={styles.navigateSearch}>
          <VscSearch />
          <input
            placeholder="Search Projects"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </section>

      {/* Main Area: Sidebar + Content */}
      <section className={styles.contentArea}>
        {/* Left Sidebar */}
        <div className={styles.sidebar}>
          {/* Quick Access */}
          <div className={styles.navigationDropdown} onClick={() => setQuickAccessOpen(!quickAccessOpen)}>
            <RiArrowDropDownLine style={{ transform: quickAccessOpen ? "rotate(0deg)" : "rotate(-90deg)" }} />
            <div className="flex items-center gap-1.5">
              <Image src="/icons/quickaccess/quickaccess.png" alt="Quick access" width={15} height={15} />
              <span>Quick access</span>
            </div>
          </div>

          {quickAccessOpen && (
            <>
              <div className={styles.navigationItem} onClick={() => setSelectedSlug(null)}>
                <Image src="/icons/desktop/desktop.png" alt="Desktop" width={15} height={15} />
                <span>Desktop</span>
              </div>
              <div className={styles.navigationItem} onClick={() => setSelectedSlug(null)}>
                <Image src="/icons/downloads/downloads_small.png" alt="Downloads" width={15} height={15} />
                <span>Downloads</span>
              </div>
              <div className={styles.navigationItem} onClick={() => setSelectedSlug(null)}>
                <Image src="/icons/documents/documents_small.png" alt="Documents" width={15} height={15} />
                <span>Documents</span>
              </div>
            </>
          )}

          {/* This PC */}
          <div className={styles.navigationDropdown} onClick={() => setThisPCOpen(!thisPCOpen)}>
            <RiArrowDropDownLine style={{ transform: thisPCOpen ? "rotate(0deg)" : "rotate(-90deg)" }} />
            <div className="flex items-center gap-1.5">
              <Image src="/icons/this-pc/this-pc.png" alt="This PC" width={15} height={15} />
              <span>This PC</span>
            </div>
          </div>

          {thisPCOpen && (
            <>
              <div
                className={`${styles.navigationItem} ${!selectedSlug ? styles.activeSidebar : ""}`}
                onClick={() => setSelectedSlug(null)}
              >
                <Image src="/icons/folder/folder.png" alt="Projects" width={15} height={15} />
                <span>Projects ({featuredProjects.length})</span>
              </div>
            </>
          )}
        </div>

        {/* Content Area */}
        <div className={styles.content}>
          <div className={styles.child}>
            {selectedProject ? (
              /* Project Details View (Inside Project Folder) */
              <div className="p-4 space-y-4">
                <div className="flex items-start justify-between border-b border-white/10 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <Image src="/icons/folder/folder.png" alt="Folder" width={24} height={24} />
                      <h1 className="text-xl font-bold text-white tracking-tight">{selectedProject.title}</h1>
                      {selectedProject.label && (
                        <span className="px-2 py-0.5 text-[10px] rounded bg-sky-500/20 text-sky-400 border border-sky-500/30">
                          {selectedProject.label}
                        </span>
                      )}
                    </div>
                    {selectedProject.subtitle && (
                      <p className="text-xs text-neutral-400 mt-1">{selectedProject.subtitle}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {selectedProject.liveUrl && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded bg-sky-600 hover:bg-sky-500 text-xs font-semibold text-white flex items-center gap-1.5 shadow"
                      >
                        Live Demo <ExternalLink size={13} />
                      </a>
                    )}
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded bg-white/10 hover:bg-white/15 text-xs font-semibold text-white flex items-center gap-1.5 border border-white/10"
                      >
                        GitHub <Github size={13} />
                      </a>
                    )}
                    <button
                      onClick={() => setSelectedSlug(null)}
                      className="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 text-xs text-neutral-300"
                    >
                      Up to Projects
                    </button>
                  </div>
                </div>

                {/* Hero / Screenshot Preview */}
                {selectedProject.heroImage && (
                  <div className="relative w-full h-56 rounded-lg overflow-hidden border border-white/10 bg-black/40">
                    <Image
                      src={selectedProject.heroImage}
                      alt={selectedProject.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                )}

                {/* Description & Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 space-y-3">
                    <div className="p-3.5 rounded-lg bg-[#222228] border border-white/5">
                      <h3 className="text-xs font-semibold text-sky-400 uppercase tracking-wider mb-1.5">
                        Overview
                      </h3>
                      <p className="text-xs text-neutral-300 leading-relaxed">
                        {selectedProject.detailedDescription || selectedProject.description}
                      </p>
                    </div>

                    {selectedProject.features && selectedProject.features.length > 0 && (
                      <div className="p-3.5 rounded-lg bg-[#222228] border border-white/5">
                        <h3 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
                          Key Capabilities
                        </h3>
                        <ul className="space-y-1.5">
                          {selectedProject.features.map((feat, i) => (
                            <li key={i} className="text-xs text-neutral-300 flex items-start gap-2">
                              <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Sidebar Metadata */}
                  <div className="space-y-3">
                    <div className="p-3.5 rounded-lg bg-[#222228] border border-white/5">
                      <h3 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                        Technologies
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProject.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded text-[11px] bg-white/5 text-neutral-300 border border-white/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {selectedProject.keyMetrics && (
                      <div className="p-3.5 rounded-lg bg-[#222228] border border-white/5">
                        <h3 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                          Metrics &amp; Results
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                          {selectedProject.keyMetrics.map((m) => (
                            <div key={m.label} className="p-2 rounded bg-black/30 text-center">
                              <div className="text-sm font-bold text-sky-400">{m.value}</div>
                              <div className="text-[10px] text-neutral-400">{m.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : viewMode === "icons" ? (
              /* Grid / Large Icons View */
              <div>
                <div className={gridStyles.dropdownNav}>
                  <h2>All Projects ({filteredProjects.length})</h2>
                  <div />
                </div>

                <div className={gridStyles.wrapper}>
                  {filteredProjects.map((project) => (
                    <div
                      key={project.slug}
                      className={gridStyles.item}
                      onClick={() => handleOpenProject(project.slug)}
                      onDoubleClick={() => handleOpenProject(project.slug)}
                      title={`Open ${project.title}`}
                    >
                      <Image
                        src="/icons/folder/folder.png"
                        alt="Folder"
                        width={32}
                        height={32}
                        draggable={false}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-xs text-white truncate">{project.title}</p>
                        <span>{project.tags.slice(0, 2).join(", ")}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Details / Table View */
              <div className={gridStyles.detailsList}>
                <div className={gridStyles.detailsHeader}>
                  <span className="w-1/2">Name</span>
                  <span className="w-1/4">Date modified</span>
                  <span className="w-1/4">Type</span>
                </div>
                {filteredProjects.map((project) => (
                  <div
                    key={project.slug}
                    className={gridStyles.detailsRow}
                    onClick={() => handleOpenProject(project.slug)}
                    onDoubleClick={() => handleOpenProject(project.slug)}
                  >
                    <div className="w-1/2 flex items-center gap-2 truncate">
                      <Image src="/icons/folder/folder.png" alt="Folder" width={18} height={18} />
                      <span className="truncate">{project.title}</span>
                    </div>
                    <span className="w-1/4 text-neutral-400 text-xs">2026</span>
                    <span className="w-1/4 text-neutral-400 text-xs">File folder</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
