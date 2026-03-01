"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

export default function Contact() {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setStatus("idle");

        // Simulate network request
        setTimeout(() => {
            setLoading(false);
            setStatus("success");
            // Reset after 3 seconds
            setTimeout(() => setStatus("idle"), 3000);
        }, 1500);
    };

    return (
        <section id="contact" className="py-20 bg-black text-white px-6 border-t border-white/5">
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
                            <h3 className="text-xl font-semibold mb-2">Contact Info</h3>
                            <p className="text-zinc-400 mb-4">I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.</p>
                            <div className="space-y-2 text-zinc-300">
                                <p>Chandigarh, India</p>

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
                                    required
                                    suppressHydrationWarning
                                    className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-zinc-400">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    suppressHydrationWarning
                                    className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium text-zinc-400">Message</label>
                            <textarea
                                id="message"
                                required
                                rows={5}
                                suppressHydrationWarning
                                className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-purple-500 transition-colors resize-none"
                                placeholder="Tell me about your project..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                "Sending..."
                            ) : status === "success" ? (
                                <>Message Sent <CheckCircle size={20} /></>
                            ) : status === "error" ? (
                                <>Error Sending <AlertCircle size={20} /></>
                            ) : (
                                <>Send Message <Send size={20} /></>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
