'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

const TIERS = [
    {
        id: 'landing',
        name: 'Landing Page',
        price: '$99',
        tagline: 'Perfect for getting started',
        features: [
            '1-page website, mobile-friendly',
            'Your business name, logo & colors',
            'Contact form & Google Maps',
            'Basic Google search setup',
        ],
        preview: '/templates/contractor.png',
    },
    {
        id: 'starter',
        name: 'Starter',
        price: '$199',
        isPopular: true,
        tagline: 'Most popular for new businesses',
        features: [
            'Up to 3 pages (Home, About, Contact)',
            'Custom color palette & dark mode',
            'Lead capture form with email alerts',
            'Advanced Google search optimization',
            'Social media links & review section',
        ],
        preview: '/templates/restaurant.png',
    },
    {
        id: 'essential',
        name: 'Essential',
        price: '$499',
        isBestValue: true,
        tagline: 'Built to grow your business',
        features: [
            'Up to 5 pages with custom layouts',
            'Full color customization & dark mode toggle',
            'Customer testimonials & social proof',
            'Lead capture with smart follow-ups',
            'State compliance badge included',
            'Gallery or portfolio section',
        ],
        preview: '/templates/restaurant.png',
    },
    {
        id: 'pro',
        name: 'Pro',
        price: '$999',
        tagline: 'For serious growth',
        features: [
            'Up to 10 pages, fully custom',
            'Appointment booking system',
            'Blog / news section',
            'Google AI Overview optimization',
            'Competitor analysis report',
            'Simple AI+ Concierge included',
        ],
        preview: '/templates/contractor.png',
    },
    {
        id: 'elite',
        name: 'Elite',
        price: '$1,999',
        tagline: 'The complete package',
        features: [
            'Unlimited pages, premium design',
            'E-commerce ready (products or services)',
            'Custom logo designed for your brand',
            'Full SEO + Google Ads setup guide',
            'State compliance pack included',
            'Simple AI+ Concierge — your 24/7 AI strategist',
        ],
        preview: '/templates/contractor.png',
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
        <div className={`w-full py-12 fade-in transition-colors duration-1000 ${isDark ? 'bg-[#0d0521]' : 'bg-[#FAFAFA]'}`}>
            {/* Header */}
            <div className="text-center mb-16 relative w-full flex flex-col items-center">
                <h1 className="text-xl md:text-2xl font-black uppercase tracking-[0.3em] text-white mb-6 bg-purple-900/50 border border-purple-500/50 px-8 py-2 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                    Simple As That
                </h1>

                <div className={`absolute top-10 left-1/2 -translate-x-1/2 w-64 h-32 blur-[80px] pointer-events-none transition-colors ${isDark ? 'bg-purple-600/30 mix-blend-screen' : 'bg-purple-500/15 mix-blend-multiply'
                    }`}></div>

                <h2 className={`text-4xl md:text-5xl font-black tracking-tighter mb-4 transition-colors ${isDark ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]' : 'text-slate-900'
                    }`}>
                    Here's What We Can Build for You
                </h2>
                <p className={`text-lg font-light tracking-wide max-w-2xl text-center transition-colors ${isDark ? 'text-purple-200/60' : 'text-slate-500'
                    }`}>
                    Designed for {industry || 'your industry'}. Pick the plan that fits your budget — we handle everything.
                </p>
            </div>

            {/* Template Cards */}
            <div className="relative w-full max-w-[1600px] mx-auto px-4 z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5 md:gap-6 w-full relative z-10 perspective-1000">

                    {TIERS.map((tier, index) => (
                        <div
                            key={tier.id}
                            onClick={() => setSelectedPlan(tier.id)}
                            style={{ animationDelay: `${index * 150}ms` }}
                            className={`group relative p-5 rounded-2xl cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col
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
                            {/* Cyan Backlight */}
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

                            {/* Template Preview Image */}
                            <div className="relative w-full h-32 mb-4 rounded-xl overflow-hidden border border-purple-500/30">
                                <img
                                    src={tier.preview}
                                    alt={`${tier.name} template preview`}
                                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-t from-purple-950/80 to-transparent' : 'bg-gradient-to-t from-purple-100/80 to-transparent'}`}></div>
                            </div>

                            <div className="flex-grow">
                                {/* Name & Price */}
                                <h3 className={`text-lg font-bold mb-1 transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>{tier.name}</h3>
                                <div className="flex items-baseline gap-2 mb-1">
                                    <span className={`text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br ${isDark ? 'from-white via-cyan-200 to-cyan-500' : 'from-purple-700 to-cyan-600'
                                        }`}>{tier.price}</span>
                                    <span className={`text-xs ${isDark ? 'text-purple-300/50' : 'text-slate-400'}`}>one-time</span>
                                </div>
                                <p className={`text-xs mb-4 ${isDark ? 'text-purple-300/60' : 'text-slate-500'}`}>{tier.tagline}</p>

                                {/* Features */}
                                <ul className="space-y-2 mb-6">
                                    {tier.features.map((feature, i) => (
                                        <li key={i} className={`flex items-start text-xs leading-relaxed transition-colors ${isDark ? 'text-purple-200 group-hover:text-white' : 'text-slate-700'
                                            }`}>
                                            <svg className={`w-4 h-4 mr-2 shrink-0 transition-colors ${isDark ? 'text-cyan-400' : 'text-purple-500'
                                                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                                            <span className="opacity-90">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Selection Button */}
                            <div className={`w-full py-3 text-center rounded-xl font-bold text-sm uppercase tracking-widest transition-all border ${selectedPlan === tier.id
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

            {/* Monthly Note */}
            <div className="text-center mt-8 px-4">
                <p className={`text-sm ${isDark ? 'text-purple-300/50' : 'text-slate-400'}`}>
                    All plans include a <strong className={isDark ? 'text-cyan-400' : 'text-purple-600'}>$29/mo</strong> subscription for hosting, backups, SSL, and access to <strong className={isDark ? 'text-cyan-400' : 'text-purple-600'}>Simple AI Plus</strong> — your personal website assistant.
                </p>
            </div>

            {/* Action Bar */}
            <div className={`mt-8 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-6 px-4 md:px-0 max-w-5xl mx-auto transition-colors ${isDark ? 'border-purple-500/30' : 'border-purple-200'
                }`}>
                <div className={`text-xs font-bold tracking-widest uppercase transition-colors ${isDark ? 'text-purple-300' : 'text-slate-500'
                    }`}>
                    Step 2: Choose Your Plan
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
                    <span className={`relative z-10 transition-all ${selectedPlan && isDark ? 'drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : ''
                        }`}>
                        Continue
                    </span>
                </button>
            </div>

            <style jsx global>{`
                @keyframes fadeInUp {
                    0% { opacity: 0; transform: translateY(30px) scale(0.95); }
                    100% { opacity: 1; transform: translateY(0) scale(1); }
                }
                .card-entrance { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; }
                .perspective-1000 { perspective: 1000px; }
            `}</style>
        </div>
    );
}
