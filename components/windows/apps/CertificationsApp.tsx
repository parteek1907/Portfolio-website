"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { 
  AiFillCaretRight, 
  AiOutlinePlusCircle 
} from "react-icons/ai";
import { BiRename, BiSortAlt2 } from "react-icons/bi";
import { BsScissors, BsTrash, BsPinAngle } from "react-icons/bs";
import { FaRegShareSquare } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  HiArrowLeft,
  HiArrowRight,
  HiArrowUp,
  HiOutlineViewList,
} from "react-icons/hi";
import { IoMdRefresh } from "react-icons/io";
import {
  MdContentCopy,
  MdContentPaste,
  MdOutlineSelectAll,
  MdOutlineViewCompact,
} from "react-icons/md";
import { RiArrowDropDownLine, RiComputerLine } from "react-icons/ri";
import { VscSearch } from "react-icons/vsc";
import { ExternalLink, Download, FileText, X, Check, Folder } from "lucide-react";
import styles from "../styles/CertificationsFolder.module.css";

export interface CertPdfFile {
  id: string;
  name: string;
  issuer: string;
  dateModified: string;
  type: string;
  sizeBytes: number;
  sizeFormatted: string;
  url: string;
  verificationUrl?: string;
  credentialId?: string;
}

const CERTIFICATE_FILES: CertPdfFile[] = [
  {
    id: "cert-cisco-da",
    name: "Cisco - Data Analytics Essentials.pdf",
    issuer: "Cisco Networking Academy",
    dateModified: "29-05-2026 22:47",
    type: "PDF Document",
    sizeBytes: 221987,
    sizeFormatted: "217 KB",
    url: "/Data_Analytics_Essentials_certificate_gargparteek1907-gmail-com_11da5486-64af-41ca-b4bd-ce8f77e1b5eb.pdf",
    verificationUrl: "https://www.credly.com/badges/9584cbc6-96c9-4e9a-8e73-774a20c6bd82/linked_in_profile",
    credentialId: "11da5486-64af-41ca-b4bd-ce8f77e1b5eb",
  },
  {
    id: "cert-ibm-ml",
    name: "IBM - Machine Learning for Data Science Projects.pdf",
    issuer: "IBM",
    dateModified: "16-05-2026 00:52",
    type: "PDF Document",
    sizeBytes: 71545,
    sizeFormatted: "70 KB",
    url: "/IBMDesign20260515-31-yjg1lj.pdf",
    verificationUrl: "https://www.credly.com/badges/e4d3f434-b6a8-4095-a040-ac043512205c/linked_in_profile",
    credentialId: "e4d3f434-b6a8-4095-a040-ac043512205c",
  },
  {
    id: "cert-oracle-ai",
    name: "Oracle - Cloud Infrastructure 2025 AI Foundations.pdf",
    issuer: "Oracle",
    dateModified: "21-02-2026 15:15",
    type: "PDF Document",
    sizeBytes: 894904,
    sizeFormatted: "874 KB",
    url: "/Oracle%20Cloud%20AI%20Infrastructure%202025.pdf",
    verificationUrl: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=DD2A6A6E953EDEA81C3A6DE2A10D856A950EC27FA84214BF145BF92256731147",
    credentialId: "325937189OCI25AICFA",
  },
  {
    id: "cert-oracle-fnd",
    name: "Oracle - Cloud Infrastructure 2025 Foundations.pdf",
    issuer: "Oracle",
    dateModified: "16-02-2026 11:20",
    type: "PDF Document",
    sizeBytes: 894903,
    sizeFormatted: "874 KB",
    url: "/Oracle%20Cloud%20Infrastructure%202025.pdf",
    verificationUrl: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=0A360055C1CBBB554340D69F4060B82C78299BD85372ACA17EA33216827DDA80",
    credentialId: "325937189OCI25FNDCFA",
  },
  {
    id: "cert-simplilearn-genai",
    name: "Simplilearn - Introduction to Generative AI.pdf",
    issuer: "Simplilearn",
    dateModified: "14-02-2026 20:30",
    type: "PDF Document",
    sizeBytes: 615977,
    sizeFormatted: "602 KB",
    url: "/Introduction%20To%20Generative%20AI.pdf",
    verificationUrl: "https://drive.google.com/file/d/1IBTzew8_IHq2MejshQd8smIBl8WXeemV/view",
    credentialId: "9845280",
  },
];

/**
 * Authentic Windows 11 PDF Document Icon
 */
function WindowsPdfIcon({ size = 28, className = "" }: { size?: number; className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ flexShrink: 0 }}
    >
      <defs>
        <filter id={`pdf-sh-${size}`} x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.4" />
        </filter>
        <linearGradient id={`pageGrad-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#ECECEC" />
        </linearGradient>
        <linearGradient id={`foldGrad-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D5D5D5" />
          <stop offset="100%" stopColor="#B0B0B0" />
        </linearGradient>
        <linearGradient id={`badgeGrad-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EB3D3D" />
          <stop offset="100%" stopColor="#BE1414" />
        </linearGradient>
      </defs>
      
      {/* Document Sheet */}
      <g filter={`url(#pdf-sh-${size})`}>
        <path
          d="M10 5C8.89543 5 8 5.89543 8 7V41C8 42.1046 8.89543 43 10 43H38C39.1046 43 40 42.1046 40 41V15L30 5H10Z"
          fill={`url(#pageGrad-${size})`}
          stroke="#D0D0D0"
          strokeWidth="0.8"
        />
        <path
          d="M30 5V13C30 14.1046 30.8954 15 32 15H40L30 5Z"
          fill={`url(#foldGrad-${size})`}
        />
      </g>
      
      {/* Placeholder Text Lines */}
      <line x1="14" y1="20" x2="26" y2="20" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="14" y1="24" x2="34" y2="24" stroke="#DCDCDC" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="14" y1="28" x2="34" y2="28" stroke="#DCDCDC" strokeWidth="1.5" strokeLinecap="round" />

      {/* Red PDF Tag */}
      <rect x="11" y="31" width="26" height="9" rx="2" fill={`url(#badgeGrad-${size})`} />
      <text
        x="24"
        y="37.8"
        fill="#FFFFFF"
        fontSize="6.5"
        fontWeight="800"
        fontFamily="Segoe UI, -apple-system, sans-serif"
        textAnchor="middle"
        letterSpacing="0.5px"
      >
        PDF
      </text>
    </svg>
  );
}

export default function CertificationsApp() {
  const [currentPath, setCurrentPath] = useState<"Certifications" | "Documents">("Certifications");
  const [history, setHistory] = useState<("Certifications" | "Documents")[]>(["Certifications"]);
  const [historyIdx, setHistoryIdx] = useState(0);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"details" | "icons">("details");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "date" | "size">("name");
  const [sortAsc, setSortAsc] = useState(true);

  // Dropdown states
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [viewDropdownOpen, setViewDropdownOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

  // Context Menu & Properties Modal
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; file: CertPdfFile } | null>(null);
  const [propertiesFile, setPropertiesFile] = useState<CertPdfFile | null>(null);

  // Quick access sidebar collapsible state
  const [quickAccessOpen, setQuickAccessOpen] = useState(true);
  const [thisPCOpen, setThisPCOpen] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click
  useEffect(() => {
    const handleGlobalClick = () => {
      setSortDropdownOpen(false);
      setViewDropdownOpen(false);
      setMoreDropdownOpen(false);
      setContextMenu(null);
    };
    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, []);

  const navigateTo = (path: "Certifications" | "Documents") => {
    if (path === currentPath) return;
    const nextHistory = history.slice(0, historyIdx + 1);
    nextHistory.push(path);
    setHistory(nextHistory);
    setHistoryIdx(nextHistory.length - 1);
    setCurrentPath(path);
    setSelectedId(null);
  };

  const handleBack = () => {
    if (historyIdx > 0) {
      const prevIdx = historyIdx - 1;
      setHistoryIdx(prevIdx);
      setCurrentPath(history[prevIdx]);
      setSelectedId(null);
    }
  };

  const handleForward = () => {
    if (historyIdx < history.length - 1) {
      const nextIdx = historyIdx + 1;
      setHistoryIdx(nextIdx);
      setCurrentPath(history[nextIdx]);
      setSelectedId(null);
    }
  };

  const handleUp = () => {
    if (currentPath === "Certifications") {
      navigateTo("Documents");
    }
  };

  // Open PDF file in authentic viewer / new tab
  const handleOpenFile = (file: CertPdfFile) => {
    setSelectedId(file.id);
    window.open(file.url, "_blank", "noopener,noreferrer");
  };

  // Filter & sort files
  const filteredFiles = CERTIFICATE_FILES.filter((f) => {
    return (
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.issuer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }).sort((a, b) => {
    if (sortBy === "name") {
      return sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    }
    if (sortBy === "size") {
      return sortAsc ? a.sizeBytes - b.sizeBytes : b.sizeBytes - a.sizeBytes;
    }
    if (sortBy === "date") {
      return sortAsc ? a.dateModified.localeCompare(b.dateModified) : b.dateModified.localeCompare(a.dateModified);
    }
    return 0;
  });

  const selectedFile = CERTIFICATE_FILES.find((f) => f.id === selectedId) || null;

  return (
    <div 
      ref={containerRef}
      className={styles.container}
      onClick={() => setSelectedId(null)}
      onContextMenu={(e) => {
        if ((e.target as HTMLElement).tagName !== "INPUT") {
          e.preventDefault();
        }
      }}
    >
      {/* 1. Windows 11 Ribbon / Command Bar */}
      <header className={styles.commandBar} onClick={(e) => e.stopPropagation()}>
        {/* New Item (Disabled in read-only certificates folder) */}
        <button 
          className={`${styles.commandBtn} ${styles.commandBtnDisabled}`}
          title="New (Disabled in system folder)"
        >
          <AiOutlinePlusCircle size={15} />
          <span>New</span>
          <RiArrowDropDownLine size={16} />
        </button>

        <div className={styles.divider} />

        {/* Open Action Button */}
        <button
          className={`${styles.commandBtn} ${!selectedFile ? styles.commandBtnDisabled : ""}`}
          onClick={() => {
            if (selectedFile) handleOpenFile(selectedFile);
          }}
          title={selectedFile ? `Open ${selectedFile.name}` : "Select a file to open"}
        >
          <ExternalLink size={14} className="text-[#0078D4]" />
          <span className="font-medium text-white">Open</span>
        </button>

        {/* Windows Explorer Action Icons */}
        <div className="flex items-center gap-0.5">
          <button className={styles.commandIconBtn} title="Cut (Ctrl+X)"><BsScissors size={14} /></button>
          <button 
            className={styles.commandIconBtn} 
            title="Copy path (Ctrl+C)"
            onClick={() => {
              if (selectedFile) {
                navigator.clipboard?.writeText(selectedFile.url);
              }
            }}
          >
            <MdContentCopy size={14} />
          </button>
          <button className={`${styles.commandIconBtn} opacity-40`} title="Paste (Ctrl+V)"><MdContentPaste size={14} /></button>
          <button className={`${styles.commandIconBtn} opacity-40`} title="Rename (F2)"><BiRename size={14} /></button>
          <button 
            className={styles.commandIconBtn} 
            title="Download PDF"
            onClick={() => {
              if (selectedFile) {
                const a = document.createElement("a");
                a.href = selectedFile.url;
                a.download = selectedFile.name;
                a.click();
              }
            }}
          >
            <Download size={14} />
          </button>
          <button className={`${styles.commandIconBtn} opacity-40`} title="Delete (Del)"><BsTrash size={14} /></button>
        </div>

        <div className={styles.divider} />

        {/* Sort Dropdown */}
        <div className="relative">
          <button 
            className={styles.commandBtn}
            onClick={(e) => {
              e.stopPropagation();
              setSortDropdownOpen(!sortDropdownOpen);
              setViewDropdownOpen(false);
              setMoreDropdownOpen(false);
            }}
          >
            <BiSortAlt2 size={16} />
            <span>Sort</span>
            <RiArrowDropDownLine size={16} />
          </button>

          {sortDropdownOpen && (
            <div 
              className="absolute left-0 top-full mt-1 bg-[#2b2b2b] border border-white/10 rounded-md p-1 shadow-2xl z-50 min-w-[140px] text-xs space-y-0.5"
              onClick={(e) => e.stopPropagation()}
            >
              <div 
                className={`flex items-center justify-between px-3 py-1.5 rounded cursor-pointer hover:bg-white/10 ${sortBy === "name" ? "bg-white/15 text-white" : "text-[#ccc]"}`}
                onClick={() => { setSortBy("name"); setSortDropdownOpen(false); }}
              >
                <span>Name</span>
                {sortBy === "name" && <Check size={12} />}
              </div>
              <div 
                className={`flex items-center justify-between px-3 py-1.5 rounded cursor-pointer hover:bg-white/10 ${sortBy === "date" ? "bg-white/15 text-white" : "text-[#ccc]"}`}
                onClick={() => { setSortBy("date"); setSortDropdownOpen(false); }}
              >
                <span>Date modified</span>
                {sortBy === "date" && <Check size={12} />}
              </div>
              <div 
                className={`flex items-center justify-between px-3 py-1.5 rounded cursor-pointer hover:bg-white/10 ${sortBy === "size" ? "bg-white/15 text-white" : "text-[#ccc]"}`}
                onClick={() => { setSortBy("size"); setSortDropdownOpen(false); }}
              >
                <span>Size</span>
                {sortBy === "size" && <Check size={12} />}
              </div>
              <div className="h-[1px] bg-white/10 my-1" />
              <div 
                className={`flex items-center justify-between px-3 py-1.5 rounded cursor-pointer hover:bg-white/10 ${sortAsc ? "bg-white/15 text-white" : "text-[#ccc]"}`}
                onClick={() => { setSortAsc(true); setSortDropdownOpen(false); }}
              >
                <span>Ascending</span>
                {sortAsc && <Check size={12} />}
              </div>
              <div 
                className={`flex items-center justify-between px-3 py-1.5 rounded cursor-pointer hover:bg-white/10 ${!sortAsc ? "bg-white/15 text-white" : "text-[#ccc]"}`}
                onClick={() => { setSortAsc(false); setSortDropdownOpen(false); }}
              >
                <span>Descending</span>
                {!sortAsc && <Check size={12} />}
              </div>
            </div>
          )}
        </div>

        {/* View Dropdown */}
        <div className="relative">
          <button 
            className={styles.commandBtn}
            onClick={(e) => {
              e.stopPropagation();
              setViewDropdownOpen(!viewDropdownOpen);
              setSortDropdownOpen(false);
              setMoreDropdownOpen(false);
            }}
          >
            <GiHamburgerMenu size={14} />
            <span>View</span>
            <RiArrowDropDownLine size={16} />
          </button>

          {viewDropdownOpen && (
            <div 
              className="absolute left-0 top-full mt-1 bg-[#2b2b2b] border border-white/10 rounded-md p-1 shadow-2xl z-50 min-w-[140px] text-xs space-y-0.5"
              onClick={(e) => e.stopPropagation()}
            >
              <div 
                className={`flex items-center justify-between px-3 py-1.5 rounded cursor-pointer hover:bg-white/10 ${viewMode === "details" ? "bg-white/15 text-white" : "text-[#ccc]"}`}
                onClick={() => { setViewMode("details"); setViewDropdownOpen(false); }}
              >
                <div className="flex items-center gap-2">
                  <HiOutlineViewList size={14} />
                  <span>Details</span>
                </div>
                {viewMode === "details" && <Check size={12} />}
              </div>
              <div 
                className={`flex items-center justify-between px-3 py-1.5 rounded cursor-pointer hover:bg-white/10 ${viewMode === "icons" ? "bg-white/15 text-white" : "text-[#ccc]"}`}
                onClick={() => { setViewMode("icons"); setViewDropdownOpen(false); }}
              >
                <div className="flex items-center gap-2">
                  <RiComputerLine size={14} />
                  <span>Large icons</span>
                </div>
                {viewMode === "icons" && <Check size={12} />}
              </div>
            </div>
          )}
        </div>

        <div className={styles.divider} />

        {/* More (...) */}
        <div className="relative">
          <button 
            className={styles.commandIconBtn}
            onClick={(e) => {
              e.stopPropagation();
              setMoreDropdownOpen(!moreDropdownOpen);
              setSortDropdownOpen(false);
              setViewDropdownOpen(false);
            }}
          >
            <FiMoreHorizontal size={16} />
          </button>

          {moreDropdownOpen && (
            <div 
              className="absolute right-0 top-full mt-1 bg-[#2b2b2b] border border-white/10 rounded-md p-1 shadow-2xl z-50 min-w-[160px] text-xs space-y-0.5"
              onClick={(e) => e.stopPropagation()}
            >
              <div 
                className="flex items-center gap-2 px-3 py-1.5 rounded cursor-pointer hover:bg-white/10 text-[#ccc]"
                onClick={() => {
                  setSelectedId(CERTIFICATE_FILES[0].id);
                  setMoreDropdownOpen(false);
                }}
              >
                <MdOutlineSelectAll size={14} />
                <span>Select all</span>
              </div>
              <div 
                className={`flex items-center gap-2 px-3 py-1.5 rounded cursor-pointer hover:bg-white/10 ${selectedFile ? "text-[#ccc]" : "opacity-40 cursor-default"}`}
                onClick={() => {
                  if (selectedFile) {
                    setPropertiesFile(selectedFile);
                    setMoreDropdownOpen(false);
                  }
                }}
              >
                <FileText size={14} />
                <span>Properties</span>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* 2. Navigation / Breadcrumbs Bar */}
      <section className={styles.navigateBar} onClick={(e) => e.stopPropagation()}>
        <div className={styles.navArrows}>
          <div 
            className={`${styles.navArrowBtn} ${historyIdx <= 0 ? styles.navArrowDisabled : ""}`}
            onClick={handleBack}
            title="Back (Alt+Left Arrow)"
          >
            <HiArrowLeft size={14} />
          </div>
          <div 
            className={`${styles.navArrowBtn} ${historyIdx >= history.length - 1 ? styles.navArrowDisabled : ""}`}
            onClick={handleForward}
            title="Forward (Alt+Right Arrow)"
          >
            <HiArrowRight size={14} />
          </div>
          <div 
            className={`${styles.navArrowBtn} ${currentPath === "Documents" ? styles.navArrowDisabled : ""}`}
            onClick={handleUp}
            title="Up to Documents (Alt+Up Arrow)"
          >
            <HiArrowUp size={14} />
          </div>
        </div>

        {/* Breadcrumb Path Address Bar */}
        <div className={styles.addressBar}>
          <Image 
            src="/icons/folder/folder.png" 
            alt="Folder" 
            width={16} 
            height={16} 
            unoptimized 
            draggable={false} 
          />
          <AiFillCaretRight size={10} className="text-[#888]" />
          
          <div className="flex items-center gap-1 overflow-x-auto custom-scrollbar">
            <span 
              className={styles.breadcrumbSegment}
              onClick={() => navigateTo("Documents")}
            >
              This PC
            </span>
            <AiFillCaretRight size={10} className="text-[#777]" />
            <span 
              className={styles.breadcrumbSegment}
              onClick={() => navigateTo("Documents")}
            >
              Documents
            </span>

            {currentPath === "Certifications" && (
              <>
                <AiFillCaretRight size={10} className="text-[#777]" />
                <span className="font-semibold text-white px-1">
                  Certifications
                </span>
              </>
            )}
          </div>

          <div className="ml-auto flex items-center gap-1 pl-2 text-[#888]">
            <div 
              className="p-1 hover:bg-white/10 rounded cursor-pointer"
              title="Refresh (F5)"
              onClick={() => setSearchQuery("")}
            >
              <IoMdRefresh size={14} />
            </div>
          </div>
        </div>

        {/* Search Certifications Box */}
        <div className={styles.searchBox}>
          <VscSearch size={14} className="text-[#888] shrink-0" />
          <input
            type="text"
            placeholder="Search Certifications"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </section>

      {/* 3. Main Split Area: Navigation Tree + Files */}
      <section className={styles.mainSplit}>
        {/* Left Navigation Tree */}
        <aside className={styles.sidebar} onClick={(e) => e.stopPropagation()}>
          {/* Quick Access */}
          <div 
            className={styles.treeHeader}
            onClick={() => setQuickAccessOpen(!quickAccessOpen)}
          >
            <RiArrowDropDownLine 
              size={18} 
              style={{ transform: quickAccessOpen ? "rotate(0deg)" : "rotate(-90deg)" }} 
            />
            <div className="flex items-center gap-2">
              <Image src="/icons/quickaccess/quickaccess.png" alt="Quick access" width={15} height={15} unoptimized />
              <span>Quick access</span>
            </div>
          </div>

          {quickAccessOpen && (
            <>
              <div className={styles.treeItem} onClick={() => navigateTo("Documents")}>
                <Image src="/icons/desktop/desktop.png" alt="Desktop" width={14} height={14} unoptimized />
                <span>Desktop</span>
              </div>
              <div className={styles.treeItem} onClick={() => navigateTo("Documents")}>
                <Image src="/icons/downloads/downloads_small.png" alt="Downloads" width={14} height={14} unoptimized />
                <span>Downloads</span>
              </div>
              
              {/* Documents -> Subfolder Certifications */}
              <div 
                className={`${styles.treeItem} ${currentPath === "Documents" ? styles.treeItemActive : ""}`}
                onClick={() => navigateTo("Documents")}
              >
                <Image src="/icons/documents/documents_small.png" alt="Documents" width={14} height={14} unoptimized />
                <span>Documents</span>
              </div>
              <div 
                className={`${styles.treeItem} ${styles.treeSubItem} ${currentPath === "Certifications" ? styles.treeItemActive : ""}`}
                onClick={() => navigateTo("Certifications")}
              >
                <Image src="/icons/folder/folder.png" alt="Certifications" width={14} height={14} unoptimized />
                <span className="font-medium text-white">Certifications</span>
              </div>

              <div className={styles.treeItem} onClick={() => navigateTo("Documents")}>
                <Image src="/icons/pictures/pictures_small.png" alt="Pictures" width={14} height={14} unoptimized />
                <span>Pictures</span>
              </div>
            </>
          )}

          {/* This PC */}
          <div 
            className={`${styles.treeHeader} mt-2`}
            onClick={() => setThisPCOpen(!thisPCOpen)}
          >
            <RiArrowDropDownLine 
              size={18} 
              style={{ transform: thisPCOpen ? "rotate(0deg)" : "rotate(-90deg)" }} 
            />
            <div className="flex items-center gap-2">
              <Image src="/icons/this-pc/this-pc.png" alt="This PC" width={15} height={15} unoptimized />
              <span>This PC</span>
            </div>
          </div>

          {thisPCOpen && (
            <>
              <div className={styles.treeItem}>
                <Image src="/icons/drives/c.png" alt="Local Disk (C:)" width={14} height={14} unoptimized />
                <span>Local Disk (C:)</span>
              </div>
              <div className={styles.treeItem}>
                <Image src="/icons/drives/d.png" alt="Local Disk (D:)" width={14} height={14} unoptimized />
                <span>Local Disk (D:)</span>
              </div>
            </>
          )}
        </aside>

        {/* Right Content Area: Files */}
        <div className={styles.fileContent}>
          <div className={styles.scrollArea}>
            {currentPath === "Documents" ? (
              /* Parent Documents Folder View */
              <div className="space-y-4">
                <div className="text-xs text-[#888888] pb-1 border-b border-white/5">
                  Folders &amp; Files in Documents
                </div>
                <div className={viewMode === "details" ? styles.detailsTable : styles.iconsGrid}>
                  {/* Certifications Subfolder */}
                  {viewMode === "details" ? (
                    <div 
                      className={`${styles.tableRow} ${selectedId === "folder-certs" ? styles.tableRowSelected : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateTo("Certifications");
                      }}
                      onDoubleClick={() => navigateTo("Certifications")}
                    >
                      <div className="flex items-center gap-2.5 flex-1 min-w-0">
                        <Image src="/icons/folder/folder.png" alt="Folder" width={18} height={18} unoptimized />
                        <span className="font-medium text-white truncate">Certifications</span>
                      </div>
                      <div className="w-36 text-xs text-[#888]">29-05-2026 22:47</div>
                      <div className="w-28 text-xs text-[#888]">File folder</div>
                      <div className="w-20 text-xs text-right text-[#888]">5 items</div>
                    </div>
                  ) : (
                    <div 
                      className={`${styles.gridItem} ${selectedId === "folder-certs" ? styles.gridItemSelected : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateTo("Certifications");
                      }}
                      onDoubleClick={() => navigateTo("Certifications")}
                    >
                      <Image src="/icons/folder/folder.png" alt="Folder" width={48} height={48} unoptimized />
                      <span className={styles.gridItemName}>Certifications</span>
                    </div>
                  )}

                  {/* Resume PDF in Documents */}
                  {viewMode === "details" ? (
                    <div 
                      className={`${styles.tableRow} ${selectedId === "doc-resume" ? styles.tableRowSelected : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open("/ParteekGarg_Resume.pdf", "_blank");
                      }}
                      onDoubleClick={() => window.open("/ParteekGarg_Resume.pdf", "_blank")}
                    >
                      <div className="flex items-center gap-2.5 flex-1 min-w-0">
                        <WindowsPdfIcon size={18} />
                        <span className="font-medium text-white truncate">ParteekGarg_Resume.pdf</span>
                      </div>
                      <div className="w-36 text-xs text-[#888]">27-10-2026 20:28</div>
                      <div className="w-28 text-xs text-[#888]">PDF Document</div>
                      <div className="w-20 text-xs text-right text-[#888]">299 KB</div>
                    </div>
                  ) : (
                    <div 
                      className={`${styles.gridItem} ${selectedId === "doc-resume" ? styles.gridItemSelected : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open("/ParteekGarg_Resume.pdf", "_blank");
                      }}
                      onDoubleClick={() => window.open("/ParteekGarg_Resume.pdf", "_blank")}
                    >
                      <WindowsPdfIcon size={48} />
                      <span className={styles.gridItemName}>ParteekGarg_Resume.pdf</span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Inside Certifications Folder: List all certificate PDFs */
              <>
                {viewMode === "details" ? (
                  /* 1. Details Table View */
                  <div className={styles.detailsTable}>
                    {/* Header Columns */}
                    <div className={styles.tableHeader}>
                      <div 
                        className={`${styles.tableHeaderCol} flex-1 min-w-0`}
                        onClick={() => { setSortBy("name"); setSortAsc(!sortAsc); }}
                      >
                        <span>Name</span>
                        {sortBy === "name" && (
                          <span className="text-[10px] text-white">{sortAsc ? "▲" : "▼"}</span>
                        )}
                      </div>
                      <div 
                        className={`${styles.tableHeaderCol} w-40`}
                        onClick={() => { setSortBy("date"); setSortAsc(!sortAsc); }}
                      >
                        <span>Date modified</span>
                        {sortBy === "date" && (
                          <span className="text-[10px] text-white">{sortAsc ? "▲" : "▼"}</span>
                        )}
                      </div>
                      <div className="w-32 hidden sm:block">Type</div>
                      <div 
                        className={`${styles.tableHeaderCol} w-24 text-right justify-end`}
                        onClick={() => { setSortBy("size"); setSortAsc(!sortAsc); }}
                      >
                        <span>Size</span>
                        {sortBy === "size" && (
                          <span className="text-[10px] text-white">{sortAsc ? "▲" : "▼"}</span>
                        )}
                      </div>
                    </div>

                    {/* PDF File Rows */}
                    <div className="pt-1 space-y-0.5">
                      {filteredFiles.map((file) => {
                        const isSelected = selectedId === file.id;
                        return (
                          <div
                            key={file.id}
                            className={`${styles.tableRow} ${isSelected ? styles.tableRowSelected : ""}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenFile(file);
                            }}
                            onDoubleClick={(e) => {
                              e.stopPropagation();
                              handleOpenFile(file);
                            }}
                            onContextMenu={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setSelectedId(file.id);
                              setContextMenu({
                                x: e.clientX,
                                y: e.clientY,
                                file,
                              });
                            }}
                            title={`Click to open ${file.name}`}
                          >
                            {/* File Name with PDF icon */}
                            <div className="flex items-center gap-2.5 flex-1 min-w-0">
                              <WindowsPdfIcon size={20} />
                              <span className="truncate font-normal text-white text-xs">
                                {file.name}
                              </span>
                            </div>

                            {/* Date Modified */}
                            <div className="w-40 text-xs text-[#888888] font-mono shrink-0">
                              {file.dateModified}
                            </div>

                            {/* Type */}
                            <div className="w-32 text-xs text-[#888888] shrink-0 hidden sm:block">
                              {file.type}
                            </div>

                            {/* Size */}
                            <div className="w-24 text-xs text-[#888888] text-right font-mono shrink-0">
                              {file.sizeFormatted}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  /* 2. Large Icons Grid View */
                  <div className={styles.iconsGrid}>
                    {filteredFiles.map((file) => {
                      const isSelected = selectedId === file.id;
                      return (
                        <div
                          key={file.id}
                          className={`${styles.gridItem} ${isSelected ? styles.gridItemSelected : ""}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenFile(file);
                          }}
                          onDoubleClick={(e) => {
                            e.stopPropagation();
                            handleOpenFile(file);
                          }}
                          onContextMenu={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setSelectedId(file.id);
                            setContextMenu({
                              x: e.clientX,
                              y: e.clientY,
                              file,
                            });
                          }}
                          title={`Click to open ${file.name}`}
                        >
                          <WindowsPdfIcon size={52} />
                          <span className={styles.gridItemName}>
                            {file.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Empty Search State */}
                {filteredFiles.length === 0 && (
                  <div className="flex flex-col items-center justify-center p-12 text-center text-[#888]">
                    <WindowsPdfIcon size={40} className="opacity-40 mb-3" />
                    <p className="text-sm">No items match your search: &ldquo;{searchQuery}&rdquo;</p>
                  </div>
                )}
              </>
            )}
          </div>

          {/* 4. Windows 11 Status Bar */}
          <footer className={styles.statusBar} onClick={(e) => e.stopPropagation()}>
            <div>
              {currentPath === "Documents" ? (
                <span>2 items</span>
              ) : selectedFile ? (
                <span>
                  {filteredFiles.length} items &nbsp;|&nbsp; 1 item selected &nbsp;{selectedFile.sizeFormatted}
                </span>
              ) : (
                <span>{filteredFiles.length} items</span>
              )}
            </div>

            {/* Quick View Toggles */}
            <div className={styles.statusViewBtns}>
              <div 
                className={`${styles.statusViewBtn} ${viewMode === "details" ? styles.statusViewBtnActive : ""}`}
                onClick={() => setViewMode("details")}
                title="Details view"
              >
                <HiOutlineViewList size={14} />
              </div>
              <div 
                className={`${styles.statusViewBtn} ${viewMode === "icons" ? styles.statusViewBtnActive : ""}`}
                onClick={() => setViewMode("icons")}
                title="Large icons view"
              >
                <RiComputerLine size={14} />
              </div>
            </div>
          </footer>
        </div>
      </section>

      {/* 5. Right-Click Windows Context Menu */}
      {contextMenu && (
        <div 
          className={styles.contextMenu}
          style={{ 
            left: Math.min(contextMenu.x, typeof window !== "undefined" ? window.innerWidth - 180 : 500), 
            top: Math.min(contextMenu.y, typeof window !== "undefined" ? window.innerHeight - 200 : 400) 
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div 
            className={`${styles.contextMenuItem} font-semibold text-white`}
            onClick={() => {
              handleOpenFile(contextMenu.file);
              setContextMenu(null);
            }}
          >
            <ExternalLink size={14} className="text-[#0078D4]" />
            <span>Open PDF</span>
          </div>

          {contextMenu.file.verificationUrl && (
            <div 
              className={styles.contextMenuItem}
              onClick={() => {
                window.open(contextMenu.file.verificationUrl, "_blank");
                setContextMenu(null);
              }}
            >
              <Check size={14} className="text-[#0078D4]" />
              <span>Verify Credential</span>
            </div>
          )}

          <div 
            className={styles.contextMenuItem}
            onClick={() => {
              navigator.clipboard?.writeText(contextMenu.file.url);
              setContextMenu(null);
            }}
          >
            <MdContentCopy size={14} />
            <span>Copy file path</span>
          </div>

          <div 
            className={styles.contextMenuItem}
            onClick={() => {
              const a = document.createElement("a");
              a.href = contextMenu.file.url;
              a.download = contextMenu.file.name;
              a.click();
              setContextMenu(null);
            }}
          >
            <Download size={14} />
            <span>Download</span>
          </div>

          <div className="h-[1px] bg-white/10 my-1" />

          <div 
            className={styles.contextMenuItem}
            onClick={() => {
              setPropertiesFile(contextMenu.file);
              setContextMenu(null);
            }}
          >
            <FileText size={14} />
            <span>Properties</span>
          </div>
        </div>
      )}

      {/* 6. Windows File Properties Dialog Modal */}
      {propertiesFile && (
        <div 
          className={styles.propertiesOverlay}
          onClick={() => setPropertiesFile(null)}
        >
          <div 
            className={styles.propertiesDialog}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.propertiesHeader}>
              <span className="truncate">{propertiesFile.name} Properties</span>
              <button 
                onClick={() => setPropertiesFile(null)}
                className="text-[#888] hover:text-white p-1"
              >
                <X size={14} />
              </button>
            </div>

            <div className={styles.propertiesBody}>
              <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                <WindowsPdfIcon size={38} />
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-white truncate text-xs">{propertiesFile.name}</div>
                  <div className="text-[11px] text-[#888] mt-0.5">PDF Document (.pdf)</div>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-[#888]">Type of file:</span>
                  <span className="text-white">Adobe Acrobat Document (.pdf)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-[#888]">Opens with:</span>
                  <span className="text-white">Microsoft Edge / Browser</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-[#888]">Location:</span>
                  <span className="text-white font-mono text-[11px]">C:\Users\Parteek\Documents\Certifications</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-[#888]">Size:</span>
                  <span className="text-white">{propertiesFile.sizeFormatted} ({propertiesFile.sizeBytes.toLocaleString()} bytes)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-[#888]">Issuer:</span>
                  <span className="text-white">{propertiesFile.issuer}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#888]">Modified:</span>
                  <span className="text-white">{propertiesFile.dateModified}</span>
                </div>
              </div>
            </div>

            <div className={styles.propertiesFooter}>
              <button 
                className={`${styles.dialogBtn} ${styles.dialogBtnPrimary}`}
                onClick={() => {
                  handleOpenFile(propertiesFile);
                  setPropertiesFile(null);
                }}
              >
                Open File
              </button>
              <button 
                className={styles.dialogBtn}
                onClick={() => setPropertiesFile(null)}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
