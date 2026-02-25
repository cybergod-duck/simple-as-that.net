'use client';

import { useState } from 'react';
import { useTheme } from 'next-themes';

const TIERS = [
    {
        id: 'basic',
        name: 'Landing Node',
        price: '$99',
        metrics: { speed: '0.6s', seo: '85/100' },
        features: ['Single Page Routing', 'Basic Schema', 'Vercel Edge HTML']
    },
    {
        id: 'starter',
        name: 'Starter Infrastructure',
        price: '$199',
        isPopular: true,
        metrics: { speed: '0.4s', seo: '95/100' },
        features: ['Mobile Priority Grid', 'Dynamic Lead Capture', 'Advanced JSON-LD', 'Analytics Array']
    },
    {
        id: 'essential',
        name: 'Essential Platform',
        price: '$499',
        isBestValue: true,
        metrics: { speed: '0.3s', seo: '100/100' },
        features: ['Everything in Starter', 'Programmatic State Routing', 'Automated Compliance Shield', 'Custom Identity Injection']
    },
    {
        id: 'pro',
        name: 'Pro Architecture',
        price: '$999',
        metrics: { speed: '0.2s', seo: '100/100' },
        features: ['Everything in Essential', 'Headless CMS Integration', 'Multi-tenant Support', 'Priority Engine SLA']
    },
    {
        id: 'elite',
        name: 'Elite Node',
        price: '$1999',
        metrics: { speed: '0.1s', seo: '100/100' },
        features: ['Everything in Pro', 'Dedicated IP Allocation', 'Custom Logic Webhooks', 'White-glove Deployment']
    }
];

export default function TemplateRecommendations({ industry, onComplete }: { industry: string, onComplete: (plan: string) => void }) {
    const { theme } = useTheme();
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);

    // Hydration check
    import('react').then((React) => {
        React.useEffect(() => {
            setMounted(true);
        }, []);
    });

    if (!mounted) return null;

    const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    const handleNext = () => {
        if (selectedPlan) {
            onComplete(selectedPlan);
        }
    };

    return (
        <div className={`w-full py-10 fade-in`}>
            {/* Header Area */}
            <div className="text-center md:text-left px-4 md:px-0 mb-12 max-w-4xl">
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
                    Optimized for {industry || 'Your Space'}
                </h2>
                <p className={`text-lg font-light tracking-wide ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Select your structural baseline. All frameworks vastly outperform legacy builders (Squarespace/Wix) on Google Lighthouse core web vitals.
                </p>
            </div>

            {/* 5-Card Horizontal Carousel */}
            <div className="relative w-full overflow-hidden">
                {/* Fade edges for scroll indication */}
                <div className={`absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l pointer-events-none z-20 ${isDark ? 'from-[#000000] to-transparent' : 'from-[#FAFAFA] to-transparent'}`}></div>
                <div className={`absolute top-0 left-0 bottom-0 w-8 bg-gradient-to-r pointer-events-none z-20 hidden md:block ${isDark ? 'from-[#000000] to-transparent' : 'from-[#FAFAFA] to-transparent'}`}></div>

                <div className="flex gap-6 overflow-x-auto pb-12 pt-4 px-4 md:px-8 snap-x snap-mandatory hide-scrollbar relative z-10 w-full" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>

                    {TIERS.map((tier) => (
                        <div
                            key={tier.id}
                            onClick={() => setSelectedPlan(tier.id)}
                            className={`snap-center shrink-0 w-[300px] md:w-[340px] relative p-8 rounded-3xl cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${selectedPlan === tier.id
                                    ? `scale-[1.05] z-30 shadow-2xl border-2 ${isDark ? 'bg-black border-white shadow-[0_20px_60px_rgba(255,255,255,0.15)]' : 'bg-white border-black shadow-[0_20px_60px_rgba(0,0,0,0.15)]'}`
                                    : `scale-100 border hover:scale-[1.02] ${isDark
                                        ? 'bg-black/40 border-slate-800 hover:border-slate-500'
                                        : 'bg-white/40 border-slate-200 hover:border-slate-400'
                                    }`
                                } ${tier.isBestValue ? 'ring-2 ring-indigo-500 ring-offset-4 ring-offset-transparent' : ''}`}
                        >
                            {/* Badges */}
                            {tier.isBestValue && (
                                <div className="absolute -top-4 right-6 px-4 py-1.5 bg-indigo-500 text-white rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
                                    Best Value
                                </div>
                            )}
                            {tier.isPopular && (
                                <div className={`absolute -top-4 left-6 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${isDark ? 'bg-slate-800 text-white border-slate-700' : 'bg-slate-100 text-black border-slate-200'
                                    }`}>
                                    Most Popular
                                </div>
                            )}

                            {/* Card Header */}
                            <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{tier.name}</h3>
                            <div className="flex items-baseline gap-1 mb-8">
                                <span className={`text-5xl font-black tracking-tighter ${isDark ? 'text-white' : 'text-black'}`}>{tier.price}</span>
                                <span className={`text-sm font-medium ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>/one-time</span>
                            </div>

                            {/* Technical Metrics Array */}
                            <div className={`flex items-center gap-4 py-4 mb-6 border-y ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold tracking-widest uppercase text-indigo-500">TTFB Speed</span>
                                    <span className={`font-mono font-bold ${isDark ? 'text-white' : 'text-slate-700'}`}>{tier.metrics.speed}</span>
                                </div>
                                <div className={`w-px h-8 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}></div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-500">Lighthouse</span>
                                    <span className={`font-mono font-bold ${isDark ? 'text-white' : 'text-slate-700'}`}>{tier.metrics.seo}</span>
                                </div>
                            </div>

                            {/* Features List */}
                            <ul className="space-y-4 mb-10">
                                {tier.features.map((feature, i) => (
                                    <li key={i} className={`flex items-start text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                        <svg className={`w-5 h-5 mr-3 shrink-0 ${isDark ? 'text-slate-600' : 'text-slate-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            {/* Selection Button */}
                            <div className={`w-full py-4 text-center rounded-xl font-bold text-sm uppercase tracking-widest transition-all ${selectedPlan === tier.id
                                    ? (isDark ? 'bg-white text-black' : 'bg-black text-white')
                                    : (isDark ? 'bg-slate-800/50 text-slate-500 group-hover:bg-slate-800 group-hover:text-white' : 'bg-slate-100/50 text-slate-400 group-hover:bg-slate-100 group-hover:text-black')
                                }`}
                            >
                                {selectedPlan === tier.id ? 'Selected Baseline' : 'Select'}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Action Bar */}
            <div className={`mt-8 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-6 px-4 md:px-0 max-w-4xl mx-auto ${isDark ? 'border-slate-800' : 'border-slate-200'
                }`}>
                <div className={`text-xs font-bold tracking-widest uppercase ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
                    Architecture Selection
                </div>
                <button
                    onClick={handleNext}
                    disabled={!selectedPlan}
                    className={`w-full md:w-auto px-12 py-5 rounded-2xl font-bold tracking-widest uppercase transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${selectedPlan
                            ? (isDark
                                ? 'bg-white text-black hover:scale-[1.03] active:scale-[0.98] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]'
                                : 'bg-black text-white hover:scale-[1.03] active:scale-[0.98] hover:shadow-[0_10px_40px_rgba(0,0,0,0.2)]')
                            : (isDark ? 'bg-slate-800 text-slate-600 cursor-not-allowed' : 'bg-slate-200 text-slate-400 cursor-not-allowed')
                        }`}
                >
                    Provision Framework
                </button>
            </div>

            {/* Global style override to hide the harsh scrollbar but keep scrollability */}
            <style jsx global>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
}
