"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle, AlertCircle, ArrowUpRight } from "lucide-react";
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
            className="pt-24 pb-32 px-6 relative scroll-mt-24"
            style={{
                borderTop: "1px solid var(--color-border)",
                background: "var(--color-bg-primary)",
            }}
        >
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-16 md:mb-24"
                >
                    <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6" style={{ color: "var(--color-text-primary)" }}>Let's Connect</h2>
                    <p className="text-lg md:text-xl max-w-2xl leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                        I'm currently exploring new technologies, participating in hackathons, and seeking opportunities where I can learn and contribute. Whether it's a project collaboration, an internship opportunity, or just talking code, my inbox is open.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24">
                    
                    {/* Left Column: Storytelling & Links */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="md:col-span-5 flex flex-col justify-between"
                    >
                        <div>
                            <h3 className="text-xl font-medium mb-4" style={{ color: "var(--color-text-primary)" }}>Beyond the screen</h3>
                            <p className="leading-relaxed mb-12 text-[15px]" style={{ color: "var(--color-text-secondary)" }}>
                                As a Computer Science student, I spend my time building full-stack applications, diving into AI architectures, and pushing my limits at hackathons. I believe the best software is built with curiosity, a relentless desire to learn, and a healthy dose of caffeine.
                            </p>
                        </div>

                    </motion.div>

                    {/* Right Column: Minimal Form */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="md:col-span-7"
                    >
                        <form onSubmit={handleSubmit} className="flex flex-col gap-8" suppressHydrationWarning>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="flex flex-col gap-1.5">
                                    <input
                                        type="text"
                                        id="name"
                                        name="from_name"
                                        value={formData.from_name}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-transparent py-2 transition-colors outline-none text-[15px]"
                                        style={{
                                            borderBottom: isDark ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(0,0,0,0.15)",
                                            color: "var(--color-text-primary)",
                                        }}
                                        onFocus={(e) => {
                                            e.currentTarget.style.borderBottomColor = "var(--color-text-primary)";
                                        }}
                                        onBlur={(e) => {
                                            e.currentTarget.style.borderBottomColor = isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)";
                                        }}
                                        placeholder="Your name"
                                    />
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <input
                                        type="email"
                                        id="email"
                                        name="from_email"
                                        value={formData.from_email}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-transparent py-2 transition-colors outline-none text-[15px]"
                                        style={{
                                            borderBottom: isDark ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(0,0,0,0.15)",
                                            color: "var(--color-text-primary)",
                                        }}
                                        onFocus={(e) => {
                                            e.currentTarget.style.borderBottomColor = "var(--color-text-primary)";
                                        }}
                                        onBlur={(e) => {
                                            e.currentTarget.style.borderBottomColor = isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)";
                                        }}
                                        placeholder="Your email"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5 mt-4">
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-transparent py-2 transition-colors resize-none outline-none text-[15px] min-h-[120px]"
                                        style={{
                                            borderBottom: isDark ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(0,0,0,0.15)",
                                            color: "var(--color-text-primary)",
                                        }}
                                        onFocus={(e) => {
                                            e.currentTarget.style.borderBottomColor = "var(--color-text-primary)";
                                        }}
                                        onBlur={(e) => {
                                            e.currentTarget.style.borderBottomColor = isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)";
                                        }}
                                        placeholder="Tell me about your project or inquiry..."
                                    ></textarea>
                                </div>

                            <div className="mt-8 flex">
                                <button
                                    type="submit"
                                    disabled={status !== "idle"}
                                    className="group relative flex items-center justify-start gap-2 text-[15px] font-medium tracking-wide transition-colors duration-300 disabled:opacity-100 disabled:cursor-not-allowed bg-transparent h-8 w-[160px]"
                                    style={{ color: status === "idle" ? "var(--color-text-secondary)" : "var(--color-text-primary)" }}
                                    onMouseEnter={(e) => {
                                        if (status === "idle") e.currentTarget.style.color = "var(--color-text-primary)";
                                    }}
                                    onMouseLeave={(e) => {
                                        if (status === "idle") e.currentTarget.style.color = "var(--color-text-secondary)";
                                    }}
                                >
                                    <AnimatePresence mode="wait">
                                        {status === "idle" && (
                                            <motion.div 
                                                key="idle"
                                                initial={{ y: 10, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                exit={{ y: -10, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="flex items-center gap-2 absolute left-0"
                                            >
                                                <span>Send Message</span>
                                                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                                                <span className="absolute -bottom-1 left-0 w-0 h-px transition-all duration-500 ease-out group-hover:w-full opacity-60" style={{ background: "currentColor" }}></span>
                                            </motion.div>
                                        )}
                                        {status === "sending" && (
                                            <motion.div 
                                                key="sending"
                                                initial={{ y: 10, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                exit={{ y: -10, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="flex items-center gap-2 absolute left-0"
                                            >
                                                <span>Sending...</span>
                                            </motion.div>
                                        )}
                                        {status === "success" && (
                                            <motion.div 
                                                key="success"
                                                initial={{ y: 10, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                exit={{ y: -10, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="flex items-center gap-2 text-[#22c55e] absolute left-0"
                                            >
                                                <CheckCircle size={16} />
                                                <span>Message Sent</span>
                                            </motion.div>
                                        )}
                                        {status === "error" && (
                                            <motion.div 
                                                key="error"
                                                initial={{ y: 10, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                exit={{ y: -10, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="flex items-center gap-2 text-[#ef4444] absolute left-0"
                                            >
                                                <AlertCircle size={16} />
                                                <span>Failed</span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
