"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import emailjs from '@emailjs/browser';

export default function Contact() {
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");
    const [formData, setFormData] = useState({
        from_name: '',
        from_email: '',
        message: ''
    });

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
        <section id="contact" className="pt-10 pb-20 bg-black text-white px-6 border-t border-white/5">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in touch</h2>
                    <p className="text-zinc-400">
                        Have a project in mind or just want to chat? Feel free to send me a message.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
                            <h3 className="text-xl font-semibold mb-4">Contact Info</h3>
                            <p className="text-zinc-400 mb-6">I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.</p>
                            <div className="space-y-4 text-zinc-300">
                                <p className="flex items-center gap-3">
                                    <span className="p-2 rounded-lg bg-zinc-800 text-purple-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                                    </span>
                                    Chandigarh, India
                                </p>
                                <a href="mailto:gargparteek1907@gmail.com" className="flex items-center gap-3 hover:text-purple-400 transition-colors">
                                    <span className="p-2 rounded-lg bg-zinc-800 text-purple-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                                    </span>
                                    gargparteek1907@gmail.com
                                </a>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4" suppressHydrationWarning>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium text-zinc-400">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="from_name"
                                    value={formData.from_name}
                                    onChange={handleChange}
                                    required
                                    suppressHydrationWarning
                                    className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                    placeholder="Your name"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-zinc-400">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="from_email"
                                    value={formData.from_email}
                                    onChange={handleChange}
                                    required
                                    suppressHydrationWarning
                                    className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                    placeholder="Your email"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium text-zinc-400">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={5}
                                suppressHydrationWarning
                                className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-purple-500 transition-colors resize-none"
                                placeholder="Tell me about your project..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={status === "sending"}
                            className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
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
