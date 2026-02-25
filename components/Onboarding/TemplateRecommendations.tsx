'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

const TIERS = [
    {
        id: 'landing',
        name: 'Landing Page',
        price: '$99',
        metrics: { speed: '0.6s', seo: '85/100' },
        features: ['Mobile-Optimized Single Page', 'Local SEO Baseline', 'Vercel Edge Deployment'],
        example: 'Demo: Neon-V1'
    },
    {
        id: 'starter',
        name: 'Starter Platform',
        price: '$199',
        isPopular: true,
        metrics: { speed: '0.4s', seo: '95/100' },
        features: ['3-Page Standard Hierarchy', 'Proprietary Brand Lock™', 'Dynamic Lead Capture', 'Advanced JSON-LD'],
        example: 'Demo: Atlas-Core'
    },
    {
        id: 'essential',
        name: 'Essential Growth',
        price: '$499',
        isBestValue: true,
        metrics: { speed: '0.3s', seo: '100/100' },
        features: ['Lead-Capture Focused UX', 'Client Success Sections', 'Programmatic State Routing', 'Automated Compliance Shield'],
        example: 'Demo: Conversion-X'
    },
    {
        id: 'pro',
        name: 'Pro Engine',
        price: '$999',
        metrics: { speed: '0.2s', seo: '100/100' },
        features: ['Growth Acceleration Strategy', 'AI Overview (SGE) Optimization', 'Headless CMS Integration', 'Priority Engine SLA'],
        example: 'Demo: Synergy-Pro'
    },
    {
        id: 'elite',
        name: 'Elite Cyber-Arc',
        price: '$1999',
        metrics: { speed: '0.1s', seo: '100/100' },
        features: ['Enterprise-grade Architecture', 'Deep Competitor Analysis', 'Custom Semantic Logo gen', 'State Compliance Pack Included'],
        example: 'Demo: Cyber-God'
    }
];

export default function TemplateRecommendations({ industry, onComplete }: { industry: string, onComplete: (plan: string) => void }) {
    const { theme } = useTheme();
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const isDark = theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    const handleNext = () => {
        if (selectedPlan) {
            onComplete(selectedPlan);
        }
    };

    return (
        <div className={`w-full py-12 fade-in transition-colors duration-1000 ${isDark ? 'bg-black' : 'bg-[#FAFAFA]'}`}>
            {/* Header Area */}
            <div className="text-center mb-16 relative w-full flex flex-col items-center">
                {/* Brand Header */}
                <h1 className="text-xl md:text-2xl font-black uppercase tracking-[0.3em] text-white mb-6 bg-purple-900/50 border border-purple-500/50 px-8 py-2 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                    Simple As That
                </h1>

                {/* Neon Glow Accent */}
                <div className={`absolute top-10 left-1/2 -translate-x-1/2 w-64 h-32 blur-[80px] pointer-events-none transition-colors ${isDark ? 'bg-purple-600/30 mix-blend-screen' : 'bg-purple-500/15 mix-blend-multiply'
                    }`}></div>

                <h2 className={`text-4xl md:text-5xl font-black tracking-tighter mb-4 transition-colors ${isDark ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]' : 'text-slate-900'
                    }`}>
                    Choose Your Website Package
                </h2>
                <p className={`text-lg font-light tracking-wide max-w-2xl text-center transition-colors ${isDark ? 'text-purple-200/60' : 'text-slate-500'
                    }`}>
                    Optimized for {industry || 'Your Business'}. Pick the plan that fits your needs.
                </p>
            </div>

            {/* 5-Column True Matrix (No Scrollbar) */}
            <div className="relative w-full max-w-[1600px] mx-auto px-4 z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5 md:gap-6 w-full relative z-10 perspective-1000">

                    {TIERS.map((tier, index) => (
                        <div
                            key={tier.id}
                            onClick={() => setSelectedPlan(tier.id)}
                            style={{ animationDelay: `${index * 150}ms` }}
                            className={`group relative p-6 rounded-2xl cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between 
                                card-entrance transform-gpu
                                ${selectedPlan === tier.id
                                    ? (isDark
                                        ? 'scale-[1.05] -translate-y-4 z-30 shadow-[0_0_40px_rgba(0,255,255,0.6),inset_0_0_20px_rgba(168,85,247,0.4)] border-2 border-purple-400 bg-purple-950 text-white'
                                        : 'scale-[1.05] -translate-y-4 z-30 shadow-[0_20px_50px_rgba(0,255,255,0.5)] border-2 border-purple-500 bg-purple-900 text-white')
                                    : (isDark
                                        ? 'scale-100 border-2 border-purple-500 bg-[#2a0e4a] hover:bg-[#32115a] hover:border-cyan-400 hover:-translate-y-2 text-white shadow-[0_0_15px_rgba(0,255,255,0.15)] hover:shadow-[0_0_30px_rgba(0,255,255,0.5)]'
                                        : 'scale-100 border-2 border-purple-400 bg-purple-100 hover:border-cyan-500 hover:-translate-y-2 text-slate-900 shadow-[0_4px_15px_rgba(0,255,255,0.2)] hover:shadow-[0_8px_30px_rgba(0,255,255,0.5)]')
                                }`}
                        >
                            {/* Cyan 3D Backlight Injection (Behind the card basically) */}
                            <div className={`absolute -inset-2 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none ${isDark ? 'bg-cyan-500/30' : 'bg-cyan-400/30'} -z-10`}></div>

                            {/* Badges */}
                            {tier.isBestValue && (
                                <div className={`absolute -top-4 right-4 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${isDark ? 'bg-pink-600 text-white border-pink-400 shadow-[0_0_15px_rgba(255,0,255,0.8)]' : 'bg-pink-500 text-white border-pink-400 shadow-[0_4px_10px_rgba(255,0,255,0.4)]'
                                    }`}>
                                    Best Value
                                </div>
                            )}
                            {tier.isPopular && (
                                <div className={`absolute -top-4 left-4 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-colors ${isDark ? 'bg-purple-900 text-cyan-400 border-cyan-500/50 shadow-[0_0_15px_rgba(0,255,255,0.4)]' : 'bg-white text-cyan-700 border-cyan-300 shadow-[0_4px_10px_rgba(0,255,255,0.2)]'
                                    }`}>
                                    Most Popular
                                </div>
                            )}

                            <div className="flex-grow">
                                {/* Card Header */}
                                <h3 className={`relative z-10 text-xl font-bold mb-2 transition-colors ${tier.id === 'elite' ? (isDark ? 'text-cyan-300 drop-shadow-[0_0_8px_rgba(0,255,255,0.5)]' : 'text-cyan-600') : (isDark ? 'text-purple-100' : 'text-slate-900')
                                    }`}>{tier.name}</h3>
                                <div className="relative z-10 flex items-baseline gap-1 mb-6">
                                    <span className={`text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br ${isDark ? 'from-white via-cyan-200 to-cyan-500 drop-shadow-[0_0_15px_rgba(0,255,255,0.3)]' : 'from-purple-700 to-cyan-600'
                                        }`}>{tier.price}</span>
                                </div>

                                {/* Technical Metrics Array */}
                                <div className={`relative z-10 flex items-center justify-between gap-2 py-3 mb-6 border-y -mx-2 px-2 transition-colors ${isDark ? 'border-purple-500/70 bg-purple-950/80 rounded-lg shadow-inner' : 'border-purple-300 bg-white/50 rounded-lg'
                                    }`}>
                                    <div className="flex flex-col">
                                        <span className={`text-[9px] font-bold tracking-widest uppercase transition-colors ${isDark ? 'text-cyan-400 drop-shadow-[0_0_3px_rgba(0,255,255,0.5)]' : 'text-cyan-600'
                                            }`}>Speed</span>
                                        <span className={`text-sm font-mono font-bold transition-colors ${isDark ? 'text-white' : 'text-slate-800'}`}>{tier.metrics.speed}</span>
                                    </div>
                                    <div className={`w-px h-6 transition-colors ${isDark ? 'bg-purple-500/50' : 'bg-purple-300'}`}></div>
                                    <div className="flex flex-col items-end">
                                        <span className={`text-[9px] font-bold tracking-widest uppercase transition-colors ${isDark ? 'text-cyan-400 drop-shadow-[0_0_3px_rgba(0,255,255,0.5)]' : 'text-cyan-600'
                                            }`}>Lighthouse</span>
                                        <span className={`text-sm font-mono font-bold transition-colors ${isDark ? 'text-white' : 'text-slate-800'}`}>{tier.metrics.seo}</span>
                                    </div>
                                </div>

                                {/* Features List */}
                                <ul className="relative z-10 space-y-3 mb-6">
                                    {tier.features.map((feature, i) => (
                                        <li key={i} className={`flex items-start text-xs leading-relaxed transition-colors ${isDark ? 'text-purple-200 group-hover:text-white' : 'text-slate-700'
                                            }`}>
                                            <svg className={`w-4 h-4 mr-2 shrink-0 transition-colors ${isDark ? 'text-cyan-400' : 'text-purple-500'
                                                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                                            <span className="opacity-90">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Example Template Mention */}
                                <div className={`mt-auto mb-6 py-2 px-3 rounded-lg border text-xs font-medium flex items-center justify-center gap-2 transition-colors ${isDark ? 'bg-black/50 border-purple-500/60 text-cyan-300 group-hover:border-cyan-400 group-hover:bg-cyan-900/40 shadow-[inset_0_0_10px_rgba(168,85,247,0.2)]' : 'bg-white border-purple-300 text-purple-700'}`}>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                                    {tier.example}
                                </div>
                            </div>

                            {/* Selection Button */}
                            <div className={`relative z-10 w-full py-4 text-center rounded-xl font-bold text-sm uppercase tracking-widest transition-all border ${selectedPlan === tier.id
                                ? (isDark
                                    ? 'bg-cyan-500 text-black border-cyan-400 shadow-[0_0_20px_rgba(0,255,255,0.6)]'
                                    : 'bg-cyan-500 text-white border-cyan-400 shadow-[0_8px_20px_rgba(0,255,255,0.4)]')
                                : (isDark
                                    ? 'bg-purple-900/80 text-purple-200 border-purple-500/80 group-hover:border-cyan-400 group-hover:text-cyan-300 group-hover:bg-purple-800 shadow-[0_0_10px_rgba(168,85,247,0.3)]'
                                    : 'bg-white text-purple-600 border-purple-400 group-hover:border-cyan-400 group-hover:text-cyan-700 shadow-[0_4px_10px_rgba(168,85,247,0.2)]')
                                }`}
                            >
                                {selectedPlan === tier.id ? 'Selected ✓' : 'Choose This Plan'}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Action Bar */}
            <div className={`mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-6 px-4 md:px-0 max-w-5xl mx-auto transition-colors ${isDark ? 'border-purple-500/30' : 'border-purple-200'
                }`}>
                <div className={`text-xs font-bold tracking-widest uppercase transition-colors ${isDark ? 'text-purple-300' : 'text-slate-500'
                    }`}>
                    Step 3: Choose Your Plan
                </div>
                <button
                    onClick={handleNext}
                    disabled={!selectedPlan}
                    className={`w-full md:w-auto px-12 py-5 rounded-2xl font-bold tracking-widest uppercase transition-all duration-500 ease-out border overflow-hidden group ${selectedPlan
                        ? (isDark
                            ? 'bg-purple-900 text-white border-purple-400 hover:border-cyan-400 cursor-pointer shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:shadow-[0_0_40px_rgba(0,255,255,0.4)]'
                            : 'bg-purple-600 text-white border-purple-500 hover:border-cyan-500 cursor-pointer shadow-[0_8px_30px_rgba(168,85,247,0.3)] hover:shadow-[0_10px_40px_rgba(0,255,255,0.3)]')
                        : (isDark
                            ? 'bg-[#1a0a2e] text-purple-800 border-purple-900 cursor-not-allowed'
                            : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed')
                        }`}
                >
                    <div className={`absolute inset-0 transition-opacity ${selectedPlan
                        ? (isDark ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100' : 'bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100')
                        : 'opacity-0'
                        }`}></div>
                    <span className={`relative z-10 transition-all ${selectedPlan && isDark ? 'drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : ''
                        }`}>
                        Continue
                    </span>
                </button>
            </div>

            {/* Global style override for the new animations */}
            <style jsx global>{`
                @keyframes fadeInUp {
                    0% {
                        opacity: 0;
                        transform: translateY(30px) scale(0.95);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
                .card-entrance {
                    animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
                }
                .perspective-1000 {
                    perspective: 1000px;
                }
            `}</style>
        </div>
    );
}
