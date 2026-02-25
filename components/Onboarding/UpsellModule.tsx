'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function UpsellModule({
    selectedPlan,
    onComplete
}: {
    selectedPlan: string,
    onComplete: (upsells: string[]) => void
}) {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Auto-include for Elite tier logic
    const isElite = selectedPlan === 'elite';

    const [addons, setAddons] = useState({
        logo: isElite,
        compliance: isElite,
        hosting: false
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const isDark = theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    const toggleAddon = (key: keyof typeof addons) => {
        // Prevent un-toggling if included in Elite
        if (isElite && (key === 'logo' || key === 'compliance')) return;
        setAddons(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleContinue = () => {
        const selected = Object.entries(addons)
            .filter(([_, isSelected]) => isSelected)
            .map(([key]) => key);
        onComplete(selected);
    };

    return (
        <div className={`w-full max-w-4xl mx-auto py-12 px-4 transition-colors duration-1000 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            <div className="text-center mb-12 relative w-full flex flex-col items-center">
                <h2 className={`text-4xl md:text-5xl font-black tracking-tighter mb-4 ${isDark ? 'drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]' : ''}`}>
                    Add More To Your Website.
                </h2>
                <p className={`text-lg font-light tracking-wide max-w-2xl text-center ${isDark ? 'text-purple-200/60' : 'text-slate-500'}`}>
                    These optional upgrades take your website to the next level.
                </p>
            </div>

            <div className="space-y-6">

                {/* 1. Custom Semantic Logo Generator */}
                <div
                    onClick={() => toggleAddon('logo')}
                    className={`group relative p-6 md:p-8 rounded-3xl border-2 transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-md flex flex-col md:flex-row items-center gap-6
                        ${addons.logo
                            ? (isDark
                                ? 'bg-[#0f2129] border-cyan-400 shadow-[0_0_30px_rgba(0,255,255,0.2)]'
                                : 'bg-cyan-50 border-cyan-500 shadow-[0_8px_30px_rgba(0,255,255,0.15)]')
                            : (isDark
                                ? 'bg-black/40 border-white/10 hover:border-white/30 hover:bg-black/60'
                                : 'bg-white/80 border-slate-200 hover:border-slate-300 shadow-sm')
                        } ${isElite ? 'cursor-default' : ''}`}
                >
                    {/* Background Glow */}
                    {addons.logo && <div className={`absolute inset-0 opacity-50 blur-2xl pointer-events-none transition-opacity ${isDark ? 'bg-gradient-to-r from-cyan-500/20 to-transparent' : 'bg-gradient-to-r from-cyan-500/10 to-transparent'}`}></div>}

                    {/* Icon Column */}
                    <div className={`shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center border-2 transition-colors z-10 
                        ${addons.logo
                            ? (isDark ? 'bg-black border-cyan-400 text-cyan-400 shadow-[0_0_15px_rgba(0,255,255,0.5)]' : 'bg-white border-cyan-500 text-cyan-600')
                            : (isDark ? 'bg-[#111] border-white/10 text-slate-500' : 'bg-slate-50 border-slate-200 text-slate-400')}`}>
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>
                    </div>

                    {/* Content Column */}
                    <div className="flex-1 text-center md:text-left z-10 w-full relative">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                            <div>
                                <h3 className={`text-xl font-black tracking-tight ${addons.logo ? (isDark ? 'text-white' : 'text-slate-900') : (isDark ? 'text-slate-300' : 'text-slate-700')}`}>
                                    Custom Semantic Logo
                                </h3>
                                {isElite && (
                                    <span className="inline-block mt-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-cyan-500/20 text-cyan-400 border border-cyan-500/50">
                                        Included in Elite
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center justify-center md:justify-end gap-3">
                                <span className={`text-2xl font-black ${addons.logo && !isElite ? (isDark ? 'text-cyan-400' : 'text-cyan-600') : (isDark ? 'text-slate-400' : 'text-slate-500')}`}>
                                    {isElite ? '$0' : '$50'}
                                </span>
                                <span className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>One-Time</span>
                            </div>
                        </div>
                        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'} max-w-xl`}>
                            High-quality logo designed to match your brand colors, ready to use on your website and business cards.
                        </p>
                    </div>

                    {/* Checkbox */}
                    {!isElite && (
                        <div className={`shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all z-10
                            ${addons.logo
                                ? (isDark ? 'bg-cyan-500 border-cyan-400 text-black shadow-[0_0_15px_rgba(0,255,255,0.5)]' : 'bg-cyan-500 border-cyan-600 text-white')
                                : (isDark ? 'border-white/20' : 'border-slate-300')}`}>
                            {addons.logo && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>}
                        </div>
                    )}
                </div>

                {/* 2. State Compliance Shield */}
                <div
                    onClick={() => toggleAddon('compliance')}
                    className={`group relative p-6 md:p-8 rounded-3xl border-2 transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-md flex flex-col md:flex-row items-center gap-6
                        ${addons.compliance
                            ? (isDark
                                ? 'bg-[#150f29] border-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.2)]'
                                : 'bg-purple-50 border-purple-500 shadow-[0_8px_30px_rgba(168,85,247,0.15)]')
                            : (isDark
                                ? 'bg-black/40 border-white/10 hover:border-white/30 hover:bg-black/60'
                                : 'bg-white/80 border-slate-200 hover:border-slate-300 shadow-sm')
                        } ${isElite ? 'cursor-default' : ''}`}
                >
                    {addons.compliance && <div className={`absolute inset-0 opacity-50 blur-2xl pointer-events-none transition-opacity ${isDark ? 'bg-gradient-to-r from-purple-500/20 to-transparent' : 'bg-gradient-to-r from-purple-500/10 to-transparent'}`}></div>}

                    <div className={`shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center border-2 transition-colors z-10 
                        ${addons.compliance
                            ? (isDark ? 'bg-black border-purple-400 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)]' : 'bg-white border-purple-500 text-purple-600')
                            : (isDark ? 'bg-[#111] border-white/10 text-slate-500' : 'bg-slate-50 border-slate-200 text-slate-400')}`}>
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                    </div>

                    <div className="flex-1 text-center md:text-left z-10 w-full relative">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                            <div>
                                <h3 className={`text-xl font-black tracking-tight ${addons.compliance ? (isDark ? 'text-white' : 'text-slate-900') : (isDark ? 'text-slate-300' : 'text-slate-700')}`}>
                                    State Compliance Pack (DoFollow Badge)
                                </h3>
                                {isElite && (
                                    <span className="inline-block mt-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-purple-500/20 text-purple-400 border border-purple-500/50">
                                        Included in Elite First Year
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center justify-center md:justify-end gap-3">
                                <span className={`text-2xl font-black ${addons.compliance && !isElite ? (isDark ? 'text-purple-400' : 'text-purple-600') : (isDark ? 'text-slate-400' : 'text-slate-500')}`}>
                                    {isElite ? '$0' : '$30'}
                                </span>
                                <span className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>/ month</span>
                            </div>
                        </div>
                        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'} max-w-xl`}>
                            Stay compliant with your state's privacy laws — automatically. Includes a verified trust badge for your website footer and a listing in our Business Directory.
                        </p>
                    </div>

                    {!isElite && (
                        <div className={`shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all z-10
                            ${addons.compliance
                                ? (isDark ? 'bg-purple-500 border-purple-400 text-black shadow-[0_0_15px_rgba(168,85,247,0.5)]' : 'bg-purple-600 border-purple-500 text-white')
                                : (isDark ? 'border-white/20' : 'border-slate-300')}`}>
                            {addons.compliance && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>}
                        </div>
                    )}
                </div>

                {/* 3. Monthly Management & Hosting */}
                <div
                    onClick={() => toggleAddon('hosting')}
                    className={`group relative p-6 md:p-8 rounded-3xl border-2 transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-md flex flex-col md:flex-row items-center gap-6
                        ${addons.hosting
                            ? (isDark
                                ? 'bg-[#150f29] border-cyan-400 shadow-[0_0_30px_rgba(0,255,255,0.15)]'
                                : 'bg-cyan-50 border-cyan-500 shadow-[0_8px_30px_rgba(0,255,255,0.15)]')
                            : (isDark
                                ? 'bg-black/40 border-white/10 hover:border-white/30 hover:bg-black/60'
                                : 'bg-white/80 border-slate-200 hover:border-slate-300 shadow-sm')
                        }`}
                >
                    {addons.hosting && <div className={`absolute inset-0 opacity-50 blur-2xl pointer-events-none transition-opacity ${isDark ? 'bg-gradient-to-r from-cyan-500/20 to-transparent' : 'bg-gradient-to-r from-cyan-500/10 to-transparent'}`}></div>}

                    <div className={`shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center border-2 transition-colors z-10 
                        ${addons.hosting
                            ? (isDark ? 'bg-black border-cyan-400 text-cyan-400 shadow-[0_0_15px_rgba(0,255,255,0.5)]' : 'bg-white border-cyan-500 text-cyan-600')
                            : (isDark ? 'bg-[#111] border-white/10 text-slate-500' : 'bg-slate-50 border-slate-200 text-slate-400')}`}>
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path></svg>
                    </div>

                    <div className="flex-1 text-center md:text-left z-10 w-full relative">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                            <div>
                                <h3 className={`text-xl font-black tracking-tight ${addons.hosting ? (isDark ? 'text-white' : 'text-slate-900') : (isDark ? 'text-slate-300' : 'text-slate-700')}`}>
                                    Simple AI Plus
                                </h3>
                                <span className={`inline-block mt-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${isDark ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50' : 'bg-cyan-50 text-cyan-700 border border-cyan-200'}`}>
                                    Required · Hosting + AI Assistant
                                </span>
                            </div>
                            <div className="flex items-center justify-center md:justify-end gap-3">
                                <span className={`text-2xl font-black ${addons.hosting ? (isDark ? 'text-cyan-400' : 'text-cyan-600') : (isDark ? 'text-slate-400' : 'text-slate-500')}`}>
                                    $29
                                </span>
                                <span className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>/ month</span>
                            </div>
                        </div>
                        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'} max-w-xl`}>
                            Your website stays fast, secure, and online 24/7. Plus, get access to <strong className={isDark ? 'text-cyan-400' : 'text-cyan-600'}>Simple AI Plus</strong> — a smarter assistant that helps you customize your site, set up Google login, manage updates, and troubleshoot anything.
                        </p>
                    </div>

                    <div className={`shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all z-10
                        ${addons.hosting
                            ? (isDark ? 'bg-cyan-500 border-cyan-400 text-black shadow-[0_0_15px_rgba(0,255,255,0.5)]' : 'bg-cyan-600 border-cyan-500 text-white')
                            : (isDark ? 'border-white/20' : 'border-slate-300')}`}>
                        {addons.hosting && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>}
                    </div>
                </div>

            </div>

            <div className="mt-12 flex justify-end px-4 md:px-0">
                <button
                    onClick={handleContinue}
                    className={`w-full md:w-auto px-12 py-5 rounded-2xl font-bold tracking-widest uppercase transition-all duration-500 ease-out border overflow-hidden group ${isDark
                        ? 'bg-black text-white border-white/20 hover:border-cyan-400 shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(0,255,255,0.3)]'
                        : 'bg-slate-900 text-white border-transparent hover:bg-slate-800 shadow-xl'
                        }`}
                >
                    <div className={`absolute inset-0 transition-opacity ${isDark ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100' : 'bg-slate-800 opacity-0 group-hover:opacity-100'}`}></div>
                    <span className="relative z-10 transition-all flex items-center gap-3">
                        Proceed to Checkout
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </span>
                </button>
            </div>

        </div>
    );
}
