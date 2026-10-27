"use client";

import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { socialLinks } from "@/lib/data";
import { 
  Mail, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Inbox, 
  SendHorizontal, 
  User, 
  AtSign, 
  MessageSquare,
  ExternalLink,
  MapPin,
  Clock
} from "lucide-react";

export default function ContactApp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setStatusMessage("Please fill in all required fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setStatus("error");
      setStatusMessage("Please enter a valid email address.");
      return;
    }

    setStatus("sending");
    setStatusMessage("Transmitting message through SMTP...");

    try {
      await emailjs.send(
        "service_n54nlri",
        "template_wi3gthl",
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject || "Contact from Parteek OS",
          message: formData.message,
        },
        "z1N8mC2SwsLRIiv1V"
      );

      setStatus("success");
      setStatusMessage("Message dispatched successfully! Parteek will respond shortly.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("EmailJS Error:", err);
      setStatus("error");
      setStatusMessage("Delivery failed. Please email directly at gargparteek1907@gmail.com");
    }
  };

  return (
    <div className="h-full flex flex-col md:flex-row bg-[#191919] text-[#cccccc] select-text overflow-hidden min-h-0">
      {/* Left Mail Folder Navigation */}
      <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-[#323232] bg-[#202020] flex flex-col shrink-0 p-4 space-y-4 min-h-0 overflow-y-auto custom-scrollbar overscroll-contain">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#888888] block mb-2">
            Mail Folders
          </span>
          <div className="space-y-1">
            <button className="w-full flex items-center justify-between px-3 py-2 rounded bg-[#2b2b2b] text-white font-medium text-xs border-l-2 border-[#0078D4]">
              <span className="flex items-center gap-2">
                <SendHorizontal size={14} className="text-[#cccccc]" /> Compose Message
              </span>
              <span className="text-[10px] bg-[#191919] text-[#aaaaaa] border border-[#383838] px-1.5 py-0.5 rounded">New</span>
            </button>
            <div className="w-full flex items-center justify-between px-3 py-2 rounded text-[#888888] text-xs">
              <span className="flex items-center gap-2">
                <Inbox size={14} /> Inbox
              </span>
              <span className="text-[10px]">0</span>
            </div>
          </div>
        </div>

        {/* Contact Info Box */}
        <div className="pt-3 border-t border-[#323232] space-y-3">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#888888] block">
            Direct Coordinates
          </span>

          <div className="text-xs space-y-2 text-[#cccccc]">
            <div className="p-2.5 rounded bg-[#191919] border border-[#323232]">
              <div className="text-[10px] text-[#888888] font-medium">Primary Email</div>
              <a
                href="mailto:gargparteek1907@gmail.com"
                className="text-xs text-white hover:underline break-all"
              >
                gargparteek1907@gmail.com
              </a>
            </div>

            <div className="p-2.5 rounded bg-[#191919] border border-[#323232]">
              <div className="text-[10px] text-[#888888] font-medium">Location</div>
              <div className="text-xs text-white flex items-center gap-1 mt-0.5">
                <MapPin size={12} className="text-[#888888]" /> Chandigarh, India
              </div>
            </div>

            <div className="p-2.5 rounded bg-[#191919] border border-[#323232]">
              <div className="text-[10px] text-[#888888] font-medium">Response SLA</div>
              <div className="text-xs text-white flex items-center gap-1 mt-0.5">
                <Clock size={12} className="text-[#888888]" /> &lt; 24 Hours
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="pt-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#888888] block mb-2">
            Professional Networks
          </span>
          <div className="flex flex-wrap gap-1.5">
            {[
              { name: "LinkedIn", href: socialLinks.linkedin },
              { name: "GitHub", href: socialLinks.github },
              { name: "Twitter / X", href: socialLinks.twitter },
              { name: "Instagram", href: socialLinks.instagram },
            ].map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 text-[11px] rounded bg-[#2b2b2b] hover:bg-[#353535] text-white border border-[#383838] transition-colors flex items-center gap-1"
              >
                {s.name} <ExternalLink size={10} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Right Compose Pane */}
      <div className="flex-1 min-h-0 flex flex-col overflow-y-auto p-6 space-y-4 custom-scrollbar bg-[#191919] overscroll-contain">
        <div className="border-b border-[#323232] pb-3">
          <h2 className="text-base font-semibold text-white flex items-center gap-2">
            <Mail size={18} className="text-[#cccccc]" /> Compose Message
          </h2>
          <p className="text-xs text-[#888888] mt-0.5">
            Send an inquiry, collaboration proposal, or project brief directly to Parteek Garg.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#cccccc] flex items-center gap-1.5">
                <User size={13} className="text-[#888888]" /> Your Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Alex Morgan"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#202020] border border-[#383838] rounded px-3 py-2 text-xs text-white placeholder-[#777777] focus:outline-none focus:border-[#0078D4] transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#cccccc] flex items-center gap-1.5">
                <AtSign size={13} className="text-[#888888]" /> Your Email *
              </label>
              <input
                type="email"
                placeholder="alex@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#202020] border border-[#383838] rounded px-3 py-2 text-xs text-white placeholder-[#777777] focus:outline-none focus:border-[#0078D4] transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#cccccc]">Subject</label>
            <input
              type="text"
              placeholder="Project Collaboration / Opportunity / Hackathon"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full bg-[#202020] border border-[#383838] rounded px-3 py-2 text-xs text-white placeholder-[#777777] focus:outline-none focus:border-[#0078D4] transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#cccccc] flex items-center gap-1.5">
              <MessageSquare size={13} className="text-[#888888]" /> Message *
            </label>
            <textarea
              rows={5}
              placeholder="Describe your inquiry, project scope, or opportunity..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-[#202020] border border-[#383838] rounded px-3 py-2 text-xs text-white placeholder-[#777777] focus:outline-none focus:border-[#0078D4] transition-colors resize-none"
            />
          </div>

          {statusMessage && (
            <div
              className={`p-3 rounded text-xs flex items-center gap-2 border ${
                status === "success"
                  ? "bg-[#202020] border-[#383838] text-white"
                  : status === "error"
                  ? "bg-[#2b1f1f] border-[#552525] text-white"
                  : "bg-[#202020] border-[#383838] text-[#cccccc]"
              }`}
            >
              {status === "success" && <CheckCircle2 size={14} className="shrink-0 text-[#0078D4]" />}
              {status === "error" && <AlertCircle size={14} className="shrink-0 text-[#e81123]" />}
              <span>{statusMessage}</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-[#888888]">* Required parameters</span>
            <button
              type="submit"
              disabled={status === "sending"}
              className="px-5 py-2 rounded text-xs font-medium bg-[#0078D4] hover:bg-[#106ebe] disabled:opacity-50 text-white transition-colors flex items-center gap-2 cursor-pointer"
            >
              {status === "sending" ? (
                <span>Transmitting...</span>
              ) : (
                <>
                  <Send size={13} /> Send Email
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
