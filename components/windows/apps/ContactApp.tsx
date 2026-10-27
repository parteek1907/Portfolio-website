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
    <div className="h-full flex flex-col md:flex-row bg-[#18181f] text-neutral-200 select-text overflow-hidden min-h-0">
      {/* Left Mail Folder Navigation */}
      <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/5 bg-[#14151c] flex flex-col shrink-0 p-4 space-y-4 min-h-0 overflow-y-auto custom-scrollbar overscroll-contain">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500 block mb-2">
            Mail Folders
          </span>
          <div className="space-y-1">
            <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-sky-500/10 text-sky-400 font-medium text-xs">
              <span className="flex items-center gap-2">
                <SendHorizontal size={14} /> Compose Message
              </span>
              <span className="text-[10px] bg-sky-500/20 px-1.5 py-0.5 rounded">New</span>
            </button>
            <div className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-neutral-400 text-xs opacity-60">
              <span className="flex items-center gap-2">
                <Inbox size={14} /> Inbox
              </span>
              <span className="text-[10px]">0</span>
            </div>
          </div>
        </div>

        {/* Contact Info Box */}
        <div className="pt-4 border-t border-white/5 space-y-3">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500 block">
            Direct Coordinates
          </span>

          <div className="text-xs space-y-2 text-neutral-300">
            <div className="p-2.5 rounded-lg bg-black/20 border border-white/5">
              <div className="text-[10px] text-neutral-500 font-medium">Primary Email</div>
              <a
                href="mailto:gargparteek1907@gmail.com"
                className="text-xs text-sky-400 hover:underline break-all"
              >
                gargparteek1907@gmail.com
              </a>
            </div>

            <div className="p-2.5 rounded-lg bg-black/20 border border-white/5">
              <div className="text-[10px] text-neutral-500 font-medium">Location</div>
              <div className="text-xs text-neutral-200 flex items-center gap-1 mt-0.5">
                <MapPin size={12} className="text-neutral-400" /> Chandigarh, India
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-black/20 border border-white/5">
              <div className="text-[10px] text-neutral-500 font-medium">Response SLA</div>
              <div className="text-xs text-neutral-200 flex items-center gap-1 mt-0.5">
                <Clock size={12} className="text-emerald-400" /> &lt; 24 Hours
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="pt-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500 block mb-2">
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
                className="px-2.5 py-1 text-[11px] rounded bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/5 transition-colors flex items-center gap-1"
              >
                {s.name} <ExternalLink size={10} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Right Compose Pane */}
      <div className="flex-1 min-h-0 flex flex-col overflow-y-auto p-6 space-y-4 custom-scrollbar bg-[#18181f] overscroll-contain">
        <div className="border-b border-white/5 pb-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Mail size={18} className="text-sky-400" /> Compose Message
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Send an inquiry, collaboration proposal, or project brief directly to Parteek Garg.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-neutral-300 flex items-center gap-1.5">
                <User size={13} className="text-neutral-500" /> Your Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Alex Morgan"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#13141b] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-sky-500 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-neutral-300 flex items-center gap-1.5">
                <AtSign size={13} className="text-neutral-500" /> Your Email *
              </label>
              <input
                type="email"
                placeholder="alex@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#13141b] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-sky-500 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-300">Subject</label>
            <input
              type="text"
              placeholder="Project Collaboration / Opportunity / Hackathon"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full bg-[#13141b] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-sky-500 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-300 flex items-center gap-1.5">
              <MessageSquare size={13} className="text-neutral-500" /> Message *
            </label>
            <textarea
              rows={5}
              placeholder="Describe your inquiry, project scope, or opportunity..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-[#13141b] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-sky-500 transition-colors resize-none"
            />
          </div>

          {statusMessage && (
            <div
              className={`p-3 rounded-lg text-xs flex items-center gap-2 ${
                status === "success"
                  ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-300"
                  : status === "error"
                  ? "bg-rose-500/10 border border-rose-500/20 text-rose-300"
                  : "bg-sky-500/10 border border-sky-500/20 text-sky-300"
              }`}
            >
              {status === "success" && <CheckCircle2 size={14} className="shrink-0" />}
              {status === "error" && <AlertCircle size={14} className="shrink-0" />}
              <span>{statusMessage}</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-neutral-500">* Required parameters</span>
            <button
              type="submit"
              disabled={status === "sending"}
              className="px-5 py-2.5 rounded-lg text-xs font-medium bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white transition-all flex items-center gap-2 shadow-sm shadow-sky-600/30 cursor-pointer"
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
