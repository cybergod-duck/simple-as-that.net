'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

interface Message {
    role: 'ai' | 'user';
    content: string;
}

export default function FluidAI() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'ai', content: 'Hey there! 👋 I\'m Simple AI. How can I help you with your website today?' }
    ]);
    const [input, setInput] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-open and contextualize based on route
    useEffect(() => {
        // Don't auto-open on home or onboarding — it overlaps the form
        if (pathname === '/' || pathname === '/onboarding') return;

        setIsOpen(true);
        if (pathname.includes('/industry-landing/')) {
            const industry = pathname.split('/').pop()?.replace('-', ' ');
            setMessages(prev => [...prev, {
                role: 'ai',
                content: `I see you\'re checking out our ${industry} websites! Have any questions about what we can build for you?`
            }]);
        }
    }, [pathname]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setIsThinking(true);

        try {
            // Routing to the same sophisticated Gemini backend
            const response = await fetch('/api/concierge', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMsg,
                    businessInfo: { industry: 'General', context: pathname } // pass context
                }),
            });

            if (!response.ok) throw new Error('Network error');

            const data = await response.json();
            setMessages(prev => [...prev, { role: 'ai', content: data.reply }]);
        } catch (error) {
            console.error('AI Error:', error);
            setMessages(prev => [...prev, { role: 'ai', content: 'Hmm, something went wrong on my end. Could you try asking again?' }]);
        } finally {
            setIsThinking(false);
        }
    };

    return (
        <div className="fixed bottom-20 right-6 z-50 flex flex-col items-end">

            {/* The Chat Window */}
            <div className={`transition-all duration-300 transform origin-bottom-right ${isOpen ? 'scale-100 opacity-100 mb-4' : 'scale-0 opacity-0 h-0 w-0 overflow-hidden'}`}>
                <div className="w-[380px] h-[500px] rounded-2xl border border-purple-500/30 bg-[#0d0521]/95 backdrop-blur-xl shadow-[0_0_40px_rgba(168,85,247,0.2)] flex flex-col overflow-hidden">

                    {/* Header */}
                    <div className="p-4 border-b border-purple-500/20 bg-gradient-to-r from-[#0d0521] via-purple-950/40 to-[#0d0521] flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="absolute inset-0 bg-purple-400 blur-md rounded-full animate-pulse opacity-50"></div>
                                <div className="w-2 h-2 rounded-full bg-cyan-400 relative z-10 shadow-[0_0_10px_#00ffff]"></div>
                            </div>
                            <img src="/favicon_io/favicon-32x32.png" alt="Simple AI" className="w-6 h-6" />
                            <div>
                                <h3 className="text-white font-bold text-sm tracking-widest uppercase flex items-center gap-2">
                                    Simple AI
                                    <span className="text-[9px] bg-purple-500/20 px-1.5 py-0.5 rounded text-cyan-300 border border-purple-500/30">ONLINE</span>
                                </h3>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${msg.role === 'user'
                                    ? 'bg-cyan-500/10 border border-cyan-500/20 text-cyan-50 rounded-tr-sm'
                                    : 'bg-white/5 border border-white/5 text-slate-300 rounded-tl-sm'
                                    }`}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {isThinking && (
                            <div className="flex justify-start">
                                <div className="bg-white/5 border border-white/5 rounded-2xl rounded-tl-sm px-4 py-3">
                                    <div className="flex gap-1">
                                        <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                        <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                        <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 border-t border-white/10 bg-black">
                        <div className="relative">
                            <input
                                type="text"
                                value={input}
                                onChange={(e: any) => setInput(e.target.value)}
                                onKeyDown={(e: any) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask me anything..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-colors placeholder:text-slate-600"
                            />
                            <button
                                onClick={handleSend}
                                disabled={!input.trim() || isThinking}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500 hover:text-black transition-all disabled:opacity-50 disabled:hover:bg-cyan-500/20 disabled:hover:text-cyan-400"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            {/* The Floating Bubble Node */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 group relative ${isOpen ? 'bg-black border border-white/10 scale-90' : 'bg-black border-2 border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:scale-110 hover:shadow-[0_0_50px_rgba(168,85,247,0.5)]'
                    }`}
            >
                {/* Background pulse effect when closed */}
                {!isOpen && (
                    <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-md animate-pulse"></div>
                )}

                {/* Logo / Close icon */}
                <div className="relative z-10 w-8 h-8 flex items-center justify-center">
                    {isOpen ? (
                        <svg className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path></svg>
                    ) : (
                        <img src="/favicon_io/favicon-32x32.png" alt="Simple AI" className="w-10 h-10 rounded-full bg-black p-1 drop-shadow-[0_0_10px_rgba(0,255,255,0.6)]" />
                    )}
                </div>
            </button>

        </div>
    );
}
