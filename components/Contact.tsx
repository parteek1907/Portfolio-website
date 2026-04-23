"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Copy, Check } from "lucide-react";
import emailjs from '@emailjs/browser';

export default function Contact() {
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");
    const [formData, setFormData] = useState({
        from_name: '',
        from_email: '',
        message: ''
    });
    const [isDark, setIsDark] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyEmail = () => {
        navigator.clipboard.writeText("gargparteek1907@gmail.com");
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        if (status === "success" || status === "error") {
            timeoutId = setTimeout(() => {
                setStatus("idle");
            }, 5000);
        }
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [status]);

    useEffect(() => {
        const checkTheme = () => {
            setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
        };
        checkTheme();
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
        return () => observer.disconnect();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.from_name || !formData.from_email || !formData.message) {
            setErrorMsg("Please fill in all fields.");
            setStatus('error');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.from_email)) {
            setErrorMsg("Please enter a valid email address.");
            setStatus('error');
            return;
        }

        setStatus('sending');
        try {
            await emailjs.send(
                'service_n54nlri',
                'template_wi3gthl',
                {
                    from_name: formData.from_name,
                    from_email: formData.from_email,
                    message: formData.message
                },
                'z1N8mC2SwsLRIiv1V'
            );
            setStatus('success');
            setFormData({ from_name: '', from_email: '', message: '' });
        } catch (error) {
            console.error('EmailJS error:', error);
            setErrorMsg("Something went wrong. Please email me directly at gargparteek1907@gmail.com");
            setStatus('error');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <section
            id="contact"
            className="pt-10 pb-20 px-6"
            style={{
                borderTop: "1px solid var(--color-border)",
                background: "var(--color-bg-secondary)",
            }}
        >
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl section-title mb-4">Get in touch</h2>
                    <p className="body-copy text-muted" style={{ color: "var(--color-text-secondary)" }}>
                        Have a project in mind or just want to chat? Feel free to send me a message.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <div
                            className="p-6 rounded-2xl"
                            style={{
                                background: "var(--color-surface)",
                                border: "1px solid var(--color-border)",
                            }}
                        >
                            <h3 className="text-xl font-semibold mb-4">Contact Info</h3>
                            <p className="mb-6 body-copy text-muted" style={{ color: "var(--color-text-secondary)" }}>I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.</p>
                            <div className="space-y-4 body-copy text-muted" style={{ color: "var(--color-text-secondary)" }}>
                                <p className="flex items-center gap-3">
                                    <span
                                        className="p-2 rounded-lg"
                                        style={{
                                            background: "var(--color-bg-tertiary)",
                                            color: "var(--color-text-secondary)",
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                                    </span>
                                    Chandigarh, India
                                </p>
                                <div className="flex items-center gap-1">
                                    <a
                                        href="mailto:gargparteek1907@gmail.com"
                                        className="flex items-center gap-3 transition-colors hover:opacity-80"
                                        style={{ color: "var(--color-text-secondary)" }}
                                    >
                                        <span
                                            className="p-2 rounded-lg"
                                            style={{
                                                background: "var(--color-bg-tertiary)",
                                                color: "var(--color-text-secondary)",
                                            }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                                        </span>
                                        <span>gargparteek1907@gmail.com</span>
                                    </a>
                                    <button
                                        onClick={handleCopyEmail}
                                        type="button"
                                        className="relative flex items-center justify-center p-2 rounded-lg transition-all duration-300 ml-1"
                                        style={{ color: "var(--color-text-secondary)" }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = "var(--color-bg-tertiary)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = "transparent";
                                        }}
                                        title="Copy email address"
                                    >
                                        <AnimatePresence mode="wait" initial={false}>
                                            {isCopied ? (
                                                <motion.div
                                                    key="check"
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.8 }}
                                                    transition={{ duration: 0.15 }}
                                                    className="flex items-center justify-center"
                                                >
                                                    <Check size={16} />
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key="copy"
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.8 }}
                                                    transition={{ duration: 0.15 }}
                                                    className="flex items-center justify-center"
                                                >
                                                    <Copy size={16} />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 form-typography" suppressHydrationWarning>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label
                                    htmlFor="name"
                                    className="text-sm"
                                    style={{ color: "var(--color-text-secondary)" }}
                                >Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="from_name"
                                    value={formData.from_name}
                                    onChange={handleChange}
                                    required
                                    suppressHydrationWarning
                                    className="w-full px-4 py-3 rounded-lg transition-colors focus:outline-none"
                                    style={{
                                        background: "var(--color-surface)",
                                        border: isDark ? "1px solid var(--color-border)" : "1px solid rgba(0, 0, 0, 0.12)",
                                        color: "var(--color-text-primary)",
                                    }}
                                    onFocus={(e) => {
                                        e.currentTarget.style.borderColor = isDark ? "var(--color-accent)" : "rgba(0, 0, 0, 0.3)";
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.borderColor = isDark ? "var(--color-border)" : "rgba(0, 0, 0, 0.12)";
                                    }}
                                    placeholder="Your name"
                                />
                            </div>
                            <div className="space-y-2">
                                <label
                                    htmlFor="email"
                                    className="text-sm"
                                    style={{ color: "var(--color-text-secondary)" }}
                                >Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="from_email"
                                    value={formData.from_email}
                                    onChange={handleChange}
                                    required
                                    suppressHydrationWarning
                                    className="w-full px-4 py-3 rounded-lg transition-colors focus:outline-none"
                                    style={{
                                        background: "var(--color-surface)",
                                        border: isDark ? "1px solid var(--color-border)" : "1px solid rgba(0, 0, 0, 0.12)",
                                        color: "var(--color-text-primary)",
                                    }}
                                    onFocus={(e) => {
                                        e.currentTarget.style.borderColor = isDark ? "var(--color-accent)" : "rgba(0, 0, 0, 0.3)";
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.borderColor = isDark ? "var(--color-border)" : "rgba(0, 0, 0, 0.12)";
                                    }}
                                    placeholder="Your email"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="message"
                                className="text-sm"
                                style={{ color: "var(--color-text-secondary)" }}
                            >Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={5}
                                suppressHydrationWarning
                                className="w-full px-4 py-3 rounded-lg transition-colors resize-none focus:outline-none"
                                style={{
                                    background: "var(--color-surface)",
                                    border: isDark ? "1px solid var(--color-border)" : "1px solid rgba(0, 0, 0, 0.12)",
                                    color: "var(--color-text-primary)",
                                }}
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = isDark ? "var(--color-accent)" : "rgba(0, 0, 0, 0.3)";
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = isDark ? "var(--color-border)" : "rgba(0, 0, 0, 0.12)";
                                }}
                                placeholder="Tell me about your project..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={status === "sending"}
                            className="w-full py-4 button-ui rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed bg-transparent"
                            style={{
                                background: isDark ? "var(--color-surface)" : "#1A1A1A",
                                border: isDark ? "1px solid var(--color-border)" : "none",
                                color: isDark ? "var(--color-text-primary)" : "#FAF7F4",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = isDark ? "var(--color-accent)" : "transparent";
                                e.currentTarget.style.color = isDark ? "var(--color-text-primary)" : "#FAF7F4";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = isDark ? "var(--color-border)" : "transparent";
                                e.currentTarget.style.color = isDark ? "var(--color-text-primary)" : "#FAF7F4";
                            }}
                        >
                            {status === "sending" ? (
                                "Sending..."
                            ) : (
                                <>Send Message <Send size={20} /></>
                            )}
                        </button>

                        <div className="h-6 mt-4 relative">
                            <AnimatePresence mode="wait">
                                {status === "success" && (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 5 }}
                                        className="absolute inset-0 flex items-center justify-center gap-2 text-[#22c55e]"
                                    >
                                        <CheckCircle size={18} />
                                        <span className="text-sm font-medium">Message sent! I'll get back to you soon.</span>
                                    </motion.div>
                                )}
                                {status === "error" && (
                                    <motion.div
                                        key="error"
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 5 }}
                                        className="absolute inset-0 flex items-center justify-center gap-2 text-[#ef4444]"
                                    >
                                        <AlertCircle size={18} />
                                        <span className="text-sm font-medium">{errorMsg}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
