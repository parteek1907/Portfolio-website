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
    <div className="h-full flex flex-col md:flex-row bg-[#191919] text-[#cccccc] select-text overflow-hidden min-h-0">
      {/* Left List of Certifications */}
      <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-[#323232] bg-[#202020] flex flex-col shrink-0 min-h-0">
        <div className="p-3 border-b border-[#323232] shrink-0">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888888]" />
            <input
              type="text"
              placeholder="Filter credentials..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#191919] border border-[#383838] rounded pl-8 pr-3 py-1.5 text-xs text-white placeholder-[#777777] focus:outline-none focus:border-[#0078D4] transition-colors"
            />
          </div>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto p-2 space-y-1 custom-scrollbar max-h-52 md:max-h-none overscroll-contain">
          {filteredCerts.map((cert) => {
            const isSelected = selectedCert.id === cert.id;
            return (
              <button
                key={cert.id}
                onClick={() => setSelectedCert(cert)}
                className={`w-full text-left p-2.5 rounded transition-colors cursor-pointer flex items-start gap-3 ${
                  isSelected
                    ? "bg-[#2b2b2b] text-white border-l-2 border-[#0078D4]"
                    : "hover:bg-[#282828] text-[#cccccc] border-l-2 border-transparent"
                }`}
              >
                <div className="w-8 h-8 rounded bg-[#191919] border border-[#383838] flex items-center justify-center shrink-0 overflow-hidden p-1">
                  {cert.issuerLogo ? (
                    <Image
                      src={cert.issuerLogo}
                      alt={cert.issuer}
                      width={22}
                      height={22}
                      className="object-contain"
                    />
                  ) : (
                    <Award size={16} className="text-[#cccccc]" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold uppercase text-[#aaaaaa] truncate">
                      {cert.issuer}
                    </span>
                    <span className="text-[10px] text-[#777777] shrink-0">{cert.issueDate}</span>
                  </div>
                  <h4 className="text-xs font-medium truncate text-white mt-0.5">{cert.title}</h4>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Detail Pane */}
      {selectedCert ? (
        <div className="flex-1 min-h-0 flex flex-col overflow-y-auto p-6 space-y-5 custom-scrollbar bg-[#191919] overscroll-contain">
          {/* Header Card */}
          <div className="p-4 rounded-lg bg-[#202020] border border-[#323232] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded bg-[#191919] border border-[#383838] flex items-center justify-center p-2 shrink-0">
                {selectedCert.issuerLogo ? (
                  <Image
                    src={selectedCert.issuerLogo}
                    alt={selectedCert.issuer}
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                ) : (
                  <Award size={24} className="text-[#cccccc]" />
                )}
              </div>
              <div>
                <span className="text-[10px] font-semibold text-[#aaaaaa] uppercase tracking-wider">
                  {selectedCert.issuer}
                </span>
                <h2 className="text-base font-bold text-white mt-0.5">{selectedCert.title}</h2>
                <div className="flex items-center gap-3 mt-1 text-xs text-[#888888]">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} className="text-[#888888]" /> Issued: {selectedCert.issueDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} className="text-[#888888]" /> Rigor: {selectedCert.hours} hours
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
                  className="px-3 py-1.5 rounded text-xs font-medium bg-[#0078D4] hover:bg-[#106ebe] text-white transition-colors flex items-center gap-1.5"
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
                  className="px-3 py-1.5 rounded text-xs font-medium bg-[#2b2b2b] hover:bg-[#353535] text-white border border-[#383838] transition-colors flex items-center gap-1.5"
                >
                  <Download size={14} /> Download PDF
                </a>
              )}
            </div>
          </div>

          {/* Credential ID Card */}
          <div className="bg-[#202020] rounded-lg p-4 border border-[#323232] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#aaaaaa]">
                Official Credential ID
              </span>
              <span className="text-[11px] text-[#cccccc] flex items-center gap-1 font-medium">
                <CheckCircle2 size={12} className="text-[#0078D4]" /> Cryptographically Verified
              </span>
            </div>
            <div className="p-2.5 rounded bg-[#191919] font-mono text-xs text-white break-all border border-[#323232]">
              {selectedCert.credentialId}
            </div>
          </div>

          {/* Skills Covered */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-semibold text-[#aaaaaa] uppercase tracking-wider">
              Skills Verified &amp; Mastered
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedCert.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded text-xs font-medium bg-[#202020] border border-[#323232] text-[#cccccc] flex items-center gap-1.5"
                >
                  <CheckCircle2 size={12} className="text-[#aaaaaa]" />
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Document Preview Box */}
          <div className="bg-[#202020] rounded-lg p-5 border border-[#323232] flex flex-col items-center justify-center text-center space-y-3 min-h-[160px]">
            <Award size={32} className="text-[#aaaaaa]" />
            <div>
              <div className="text-sm font-semibold text-white">Full Certificate Document Available</div>
              <p className="text-xs text-[#888888] mt-1 max-w-sm">
                Authentic verifiable PDF issued directly by {selectedCert.issuer}.
              </p>
            </div>
            <a
              href={selectedCert.fullCertificate}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 text-xs font-medium bg-[#2b2b2b] hover:bg-[#353535] text-white rounded border border-[#383838] transition-colors flex items-center gap-1.5"
            >
              Open Full Certificate PDF <ExternalLink size={13} />
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
