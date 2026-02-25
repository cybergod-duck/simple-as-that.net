// @ts-nocheck
'use client';
import { useState } from 'react';

const TIERS = [
    { id: 'starter', name: 'Starter Infrastructure', price: '$199', features: ['Mobile Optimized', 'Lead Capture Form', 'Core SEO Baseline'] },
    { id: 'pro', name: 'Pro Architecture', price: '$999', isPopular: true, features: ['Everything in Starter', 'Dynamic Industry Context', 'Advanced JSON-LD', 'Analytics Array'] },
    { id: 'elite', name: 'Elite Platform', price: '$1999', features: ['Everything in Pro', 'Custom Logo Included', 'State Compliance Guard', 'Priority SLA'] },
    { id: 'basic', name: 'Landing Node', price: '$99', features: ['Single Page', 'Email Capture', 'Vercel Edge Network'] }
];

export default function TemplateRecommendations({ industry, onComplete }: { industry: string, onComplete: (plan: string) => void }) {
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
    const [addCompliance, setAddCompliance] = useState<boolean>(false);
    const [addLogo, setAddLogo] = useState<boolean>(false);

    const handleNext = () => {
        if (selectedPlan) {
            onComplete(selectedPlan);
        }
    };

    return (
        <div className="max-w-5xl mx-auto bg-white p-10 lg:p-14 rounded-[2.5rem] shadow-[0_20px_60px_rgb(0,0,0,0.06)] border border-slate-100/50">
            <div className="text-center mb-16">
                <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold tracking-widest uppercase mb-4 shadow-sm border border-indigo-100">
                    Calculated Architecture
                </span>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">
                    Optimized for {industry || 'Your Space'}
                </h2>
                <p className="text-lg text-slate-500 max-w-2xl mx-auto font-light leading-relaxed">
                    Based on market data, we've compiled the highest-converting digital architectures for your sector. Select your baseline framework.
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-12 relative z-10">
                {TIERS.slice(0, 3).map((tier) => (
                    <div
                        key={tier.id}
                        onClick={() => setSelectedPlan(tier.id)}
                        className={`relative p-8 rounded-3xl cursor-pointer transition-all duration-500 transform ${selectedPlan === tier.id
                            ? 'border-2 border-indigo-500 bg-white shadow-[0_20px_40px_rgb(99,102,241,0.15)] scale-[1.03] z-20'
                            : 'border border-slate-200 bg-slate-50/50 hover:border-indigo-200 hover:bg-white hover:shadow-xl hover:-translate-y-1'
                            }`}
                    >
                        {tier.isPopular && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full text-white text-[10px] font-black uppercase tracking-widest shadow-md">
                                Recommended
                            </div>
                        )}
                        <h3 className="text-2xl font-extrabold text-slate-800 mb-2">{tier.name}</h3>
                        <div className="flex items-baseline gap-1 mb-8">
                            <span className="text-4xl font-black text-indigo-600 tracking-tighter">{tier.price}</span>
                            <span className="text-sm font-medium text-slate-400">/one-time</span>
                        </div>

                        <ul className="space-y-4 mb-10">
                            {tier.features.map((feature, i) => (
                                <li key={i} className="flex items-start text-slate-600 text-sm font-medium">
                                    <svg className="w-5 h-5 text-indigo-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <div className={`w-full py-4 text-center rounded-xl font-bold transition-all ${selectedPlan === tier.id
                            ? 'bg-indigo-600 text-white shadow-[0_8px_20px_rgb(99,102,241,0.3)]'
                            : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                            }`}
                        >
                            {selectedPlan === tier.id ? 'Selected Baseline' : 'Select Architecture'}
                        </div>
                    </div>
                ))}
            </div>

            {/* UPSELL: Custom Logo */}
            <div className="mt-6 mb-4 p-8 bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-3xl transition-all hover:shadow-[0_10px_30px_rgb(0,0,0,0.03)] hover:border-slate-300">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="flex gap-4 items-start">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
                            <span className="text-indigo-500 font-serif font-black text-xl italic">L</span>
                        </div>
                        <div>
                            <h4 className="text-xl font-extrabold text-slate-800 mb-1">
                                Custom Logo Generation
                            </h4>
                            <p className="text-slate-500 leading-relaxed font-light">
                                Don't have a vectorized brand logo? For a flat <strong className="font-bold text-slate-700">$50 fee</strong>, we instantly generate an HD semantic logo mapped to your custom {industry.toLowerCase() || 'business'} color palette.
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => setAddLogo(!addLogo)}
                        className={`shrink-0 w-full md:w-auto px-8 py-3.5 rounded-xl border-2 font-bold transition-all shadow-sm ${addLogo
                            ? 'bg-indigo-600 border-indigo-600 text-white shadow-[0_8px_15px_rgb(99,102,241,0.2)]'
                            : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-400 hover:text-indigo-600'}`}
                    >
                        {addLogo ? '✓ Custom Logo Added' : '+ Add Logo ($50)'}
                    </button>
                </div>
            </div>

            {/* UPSELL: State Compliance Add-On */}
            <div className="p-8 bg-gradient-to-br from-teal-50/50 to-white border border-teal-100/50 rounded-3xl transition-all hover:shadow-[0_10px_30px_rgb(20,184,166,0.05)] hover:border-teal-200">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="flex gap-4 items-start">
                        <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0 text-teal-600">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                        </div>
                        <div>
                            <h4 className="text-xl font-extrabold text-slate-800 mb-1">
                                State Compliance Shield
                            </h4>
                            <p className="text-slate-500 leading-relaxed font-light">
                                Auto-deploy a verified compliance badge directly to your footer. For <strong className="font-bold text-slate-700">$30/mo</strong>, broadcast instant trust to clients by complying with 2026 digital state privacy regulations.
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => setAddCompliance(!addCompliance)}
                        className={`shrink-0 w-full md:w-auto px-8 py-3.5 rounded-xl border-2 font-bold transition-all shadow-sm ${addCompliance
                            ? 'bg-teal-600 border-teal-600 text-white shadow-[0_8px_15px_rgb(20,184,166,0.2)]'
                            : 'bg-white border-slate-200 text-slate-600 hover:border-teal-400 hover:text-teal-600'}`}
                    >
                        {addCompliance ? '✓ Shield Added' : '+ Add Shield ($30/mo)'}
                    </button>
                </div>
            </div>

            {/* Action Bar */}
            <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-sm font-semibold text-slate-400 tracking-widest uppercase">
                    Step 3 of 4
                </div>
                <button
                    onClick={handleNext}
                    disabled={!selectedPlan}
                    className={`w-full md:w-auto px-12 py-4 rounded-xl font-extrabold text-lg transition-all shadow-xl ${selectedPlan
                        ? 'bg-slate-900 hover:bg-[#0B0F19] text-white hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 cursor-pointer'
                        : 'bg-slate-100 text-slate-400 shadow-none cursor-not-allowed'
                        }`}
                >
                    Deploy Infrastructure &rarr;
                </button>
            </div>
        </div>
    );
}
