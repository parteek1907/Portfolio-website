"use client";

import { useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, X } from "lucide-react";
import { ProjectContributor } from "@/lib/data";

/**
 * Derive avatar URL directly from member's explicitly configured avatar or GitHub username (.png)
 * Avoids extra API calls and tokens while leveraging GitHub's direct public avatar CDN.
 */
function getAvatarUrl(member: ProjectContributor): string | null {
  if (member.avatar) return member.avatar;
  const username =
    member.githubUsername ||
    (member.githubUrl ? member.githubUrl.split("/").filter(Boolean).pop() : undefined);
  if (username) {
    return `https://github.com/${username}.png`;
  }
  return null;
}

/**
 * Custom hook to manage contributor avatar with sensible fallback to initials on error
 */
function useContributorAvatar(member: ProjectContributor) {
  const [imgFailed, setImgFailed] = useState(false);
  const avatarUrl = getAvatarUrl(member);

  return {
    src: imgFailed ? null : avatarUrl,
    handleImgError: () => setImgFailed(true),
  };
}

const getInitials = (name: string) => {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

/**
 * Individual avatar circle in the stack
 */
function ContributorAvatarStackItem({
  member,
  index,
  total,
}: {
  member: ProjectContributor;
  index: number;
  total: number;
}) {
  const { src, handleImgError } = useContributorAvatar(member);

  return (
    <div
      className="relative w-6 h-6 md:w-7 md:h-7 rounded-full overflow-hidden border-2 border-[var(--color-bg-primary)] bg-[var(--color-bg-tertiary)] shrink-0 transition-transform duration-200 group-hover:scale-105"
      style={{ zIndex: total - index }}
      title={`${member.name} (${member.role})`}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={member.name}
          loading="lazy"
          onError={handleImgError}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-[9px] md:text-[10px] font-semibold text-[var(--color-text-primary)] bg-[var(--color-surface)] select-none">
          {getInitials(member.name)}
        </div>
      )}
    </div>
  );
}

/**
 * Contributor item in modal popup
 */
function ContributorModalItem({
  member,
  isFirst,
  isLast,
}: {
  member: ProjectContributor;
  isFirst: boolean;
  isLast: boolean;
}) {
  const { src, handleImgError } = useContributorAvatar(member);

  return (
    <div
      className={`flex flex-col gap-3 ${isFirst ? "pb-5" : isLast ? "pt-5" : "py-5"}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3.5 min-w-0">
          {/* Avatar */}
          <div className="relative w-11 h-11 md:w-12 md:h-12 rounded-full overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-tertiary)] shrink-0 shadow-sm">
            {src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={src}
                alt={member.name}
                loading="lazy"
                onError={handleImgError}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs md:text-sm font-semibold border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] select-none">
                {getInitials(member.name)}
              </div>
            )}
          </div>

          {/* Name & Role */}
          <div className="flex flex-col min-w-0">
            <h4 className="text-base md:text-lg font-medium text-[var(--color-text-primary)] truncate">
              {member.name}
            </h4>
            <p className="text-xs md:text-sm text-[var(--color-text-secondary)] leading-relaxed font-light">
              {member.role}
            </p>
          </div>
        </div>
      </div>

      {/* Social Links — blended into background without pill boundaries */}
      {(member.githubUrl || member.linkedinUrl) && (
        <div className="flex items-center gap-5 pt-1 pl-14">
          {member.githubUrl && (
            <a
              href={member.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="group/link relative inline-flex items-center gap-1.5 text-xs font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer bg-transparent border-none p-0"
              aria-label={`${member.name}'s GitHub profile`}
            >
              <Github size={14} />
              <span>GitHub</span>
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-current transition-all duration-300 group-hover/link:w-full opacity-40"></span>
            </a>
          )}
          {member.linkedinUrl && (
            <a
              href={member.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="group/link relative inline-flex items-center gap-1.5 text-xs font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer bg-transparent border-none p-0"
              aria-label={`${member.name}'s LinkedIn profile`}
            >
              <Linkedin size={14} />
              <span>LinkedIn</span>
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-current transition-all duration-300 group-hover/link:w-full opacity-40"></span>
            </a>
          )}
        </div>
      )}
    </div>
  );
}

interface ProjectTeamProps {
  projectTitle?: string;
  contributors?: ProjectContributor[];
  isSolo?: boolean;
}

export default function ProjectTeam({ projectTitle, contributors, isSolo }: ProjectTeamProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Guarantee Parteek Garg is on top, and remaining contributors are in alphabetical order
  const sortedContributors = useMemo(() => {
    if (!contributors) return [];
    const parteek = contributors.filter((c) => c.name.toLowerCase().includes("parteek"));
    const others = contributors
      .filter((c) => !c.name.toLowerCase().includes("parteek"))
      .sort((a, b) => a.name.localeCompare(b.name));
    return [...parteek, ...others];
  }, [contributors]);

  useEffect(() => {
    if (isModalOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setIsModalOpen(false);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = prevOverflow;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isModalOpen]);

  // Hide the section for solo projects or projects without confirmed contributor data
  if (isSolo || sortedContributors.length <= 1) {
    return null;
  }

  return (
    <>
      {/* "Contributors" trigger — blends with background, no circular boundary pill */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen(true);
          }}
          className="group inline-flex items-center gap-2.5 cursor-pointer bg-transparent border-none p-0 text-left select-none transition-opacity hover:opacity-85"
          aria-label={`View contributors for ${projectTitle || "project"}`}
          title="View project contributors"
        >
          <span 
            className="text-[11px] font-semibold tracking-wider uppercase text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors"
            style={{ fontFamily: "var(--font-ui)" }}
          >
            Contributors
          </span>
          <div className="flex items-center -space-x-2 py-0.5">
            {sortedContributors.map((member, idx) => (
              <ContributorAvatarStackItem
                key={`${member.name}-${idx}`}
                member={member}
                index={idx}
                total={sortedContributors.length}
              />
            ))}
          </div>
        </button>
      </div>

      {/* Contributor Details Popup Modal via Portal to escape CSS transform boundaries of parent cards */}
      {isMounted && typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {isModalOpen && (
            <div 
              data-lenis-prevent
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
            >
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsModalOpen(false);
                }}
                className="absolute inset-0 bg-black/75 backdrop-blur-md cursor-pointer"
              />

              {/* Modal Dialog */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: "spring", damping: 26, stiffness: 320 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-lg rounded-3xl shadow-2xl flex flex-col overflow-hidden max-h-[85vh] border border-[var(--color-border)] z-10"
                style={{
                  backgroundColor: "var(--color-bg-primary)",
                }}
              >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 md:px-8 md:py-6 border-b border-[var(--color-border)]/60">
                  <div className="flex flex-col gap-1">
                    <span 
                      className="text-[11px] font-semibold tracking-widest uppercase text-[var(--color-text-secondary)]"
                      style={{ fontFamily: "var(--font-ui)" }}
                    >
                      Project Team
                    </span>
                    <h3 
                      className="text-xl md:text-2xl font-medium text-[var(--color-text-primary)] tracking-tight"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {projectTitle ? `${projectTitle} Contributors` : "Contributors"}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 rounded-full text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)] transition-colors cursor-pointer"
                    aria-label="Close team modal"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Contributor List */}
                <div 
                  data-lenis-prevent
                  className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8 flex flex-col divide-y divide-[var(--color-border)]/50"
                >
                  {sortedContributors.map((member, idx) => (
                    <ContributorModalItem
                      key={`${member.name}-${idx}`}
                      member={member}
                      isFirst={idx === 0}
                      isLast={idx === sortedContributors.length - 1}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
