"use client";

import React, { useState } from "react";
import { certifications, Certification } from "@/lib/data";
import { 
  Award, 
  ExternalLink, 
  Download, 
  CheckCircle2, 
  Clock, 
  Calendar,
  ShieldCheck,
  Search
} from "lucide-react";
import Image from "next/image";

export default function CertificationsApp() {
  const [selectedCert, setSelectedCert] = useState<Certification>(certifications[0]);
  const [search, setSearch] = useState("");

  const filteredCerts = certifications.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.issuer.toLowerCase().includes(search.toLowerCase()) ||
      c.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="h-full flex flex-col md:flex-row bg-[#18181f] text-neutral-200 select-text overflow-hidden">
      {/* Left List of Certifications */}
      <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-white/5 bg-[#14151c] flex flex-col shrink-0">
        <div className="p-3 border-b border-white/5">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Filter credentials..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#1e1f2a] border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-sky-500 transition-colors"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1.5 custom-scrollbar max-h-52 md:max-h-none">
          {filteredCerts.map((cert) => {
            const isSelected = selectedCert.id === cert.id;
            return (
              <button
                key={cert.id}
                onClick={() => setSelectedCert(cert)}
                className={`w-full text-left p-3 rounded-lg transition-all cursor-pointer border flex items-start gap-3 ${
                  isSelected
                    ? "bg-[#252736] border-sky-500/40 text-white shadow-sm"
                    : "hover:bg-white/[0.04] border-transparent text-neutral-300"
                }`}
              >
                <div className="w-9 h-9 rounded-lg bg-black/30 border border-white/10 flex items-center justify-center shrink-0 overflow-hidden p-1.5">
                  {cert.issuerLogo ? (
                    <Image
                      src={cert.issuerLogo}
                      alt={cert.issuer}
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  ) : (
                    <Award size={18} className="text-amber-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold uppercase text-sky-400 truncate">
                      {cert.issuer}
                    </span>
                    <span className="text-[10px] text-neutral-500 shrink-0">{cert.issueDate}</span>
                  </div>
                  <h4 className="text-xs font-semibold truncate text-white mt-0.5">{cert.title}</h4>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Detail Pane */}
      {selectedCert ? (
        <div className="flex-1 flex flex-col overflow-y-auto p-6 space-y-6 custom-scrollbar bg-[#18181f]">
          {/* Header */}
          <div className="p-5 rounded-xl bg-gradient-to-r from-[#1f212f] to-[#161720] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center p-2.5 shrink-0">
                {selectedCert.issuerLogo ? (
                  <Image
                    src={selectedCert.issuerLogo}
                    alt={selectedCert.issuer}
                    width={36}
                    height={36}
                    className="object-contain"
                  />
                ) : (
                  <Award size={28} className="text-amber-400" />
                )}
              </div>
              <div>
                <span className="text-[11px] font-semibold text-sky-400 uppercase tracking-wider">
                  {selectedCert.issuer}
                </span>
                <h2 className="text-base sm:text-lg font-bold text-white mt-0.5">{selectedCert.title}</h2>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-neutral-400">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} className="text-neutral-400" /> Issued: {selectedCert.issueDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} className="text-neutral-400" /> Rigor: {selectedCert.hours} hours
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {selectedCert.verificationUrl && (
                <a
                  href={selectedCert.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-sky-600 hover:bg-sky-500 text-white transition-colors flex items-center gap-1.5 shadow-sm shadow-sky-600/20"
                >
                  <ShieldCheck size={14} /> Verify Credential <ExternalLink size={12} />
                </a>
              )}
              {selectedCert.downloadUrl && (
                <a
                  href={selectedCert.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 hover:bg-white/10 text-neutral-200 border border-white/10 transition-colors flex items-center gap-1.5"
                >
                  <Download size={14} /> Download PDF
                </a>
              )}
            </div>
          </div>

          {/* Credential ID Card */}
          <div className="bg-[#1e1f2a]/60 rounded-xl p-4 border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Official Credential ID
              </span>
              <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                <CheckCircle2 size={12} /> Cryptographically Verified
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-black/40 font-mono text-xs text-sky-300 break-all border border-white/5">
              {selectedCert.credentialId}
            </div>
          </div>

          {/* Skills Covered */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
              Skills Verified &amp; Mastered
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedCert.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 border border-white/10 text-neutral-200 flex items-center gap-1.5"
                >
                  <CheckCircle2 size={12} className="text-sky-400" />
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Document Preview Box */}
          <div className="bg-[#14151c] rounded-xl p-4 border border-white/5 flex flex-col items-center justify-center text-center space-y-3 min-h-[200px]">
            <Award size={36} className="text-amber-400/80" />
            <div>
              <div className="text-sm font-semibold text-white">Full Certificate Document Available</div>
              <p className="text-xs text-neutral-400 mt-1 max-w-sm">
                Authentic verifiable PDF issued directly by {selectedCert.issuer}.
              </p>
            </div>
            <a
              href={selectedCert.fullCertificate}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs font-medium bg-white/10 hover:bg-white/15 text-white rounded-lg border border-white/10 transition-colors flex items-center gap-1.5"
            >
              Open Full Certificate PDF <ExternalLink size={13} />
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
