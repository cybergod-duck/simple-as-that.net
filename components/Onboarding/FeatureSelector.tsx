'use client';

import { useState } from 'react';
import { useTheme } from 'next-themes';

const FEATURES = [
    { id: 'contact', label: 'Contact Form', desc: 'Let visitors reach you', icon: '📬', price: 0, included: true },
    { id: 'seo', label: 'Basic SEO', desc: 'Get found on Google', icon: '🔍', price: 0, included: true },
    { id: 'leads', label: 'Lead Capture + Email Alerts', desc: 'Never miss a prospect', icon: '🎯', price: 50 },
    { id: 'ai-basic', label: 'Simple AI+ Chatbot', desc: 'AI assistant on your site (100/mo)', icon: '🤖', price: 50 },
    { id: 'testimonials', label: 'Testimonials Section', desc: 'Show off your reviews', icon: '⭐', price: 50 },
    { id: 'blog', label: 'Blog / News Section', desc: 'Publish content & updates', icon: '✍️', price: 100 },
    { id: 'booking', label: 'Appointment Booking', desc: 'Let clients book online', icon: '📅', price: 100 },
    { id: 'ai-pro', label: 'Simple AI+ Pro', desc: 'AI assistant (1,000 queries/mo)', icon: '🧠', price: 100 },
    { id: 'ecommerce', label: 'E-Commerce', desc: 'Sell products or services', icon: '🛒', price: 200 },
    { id: 'ai-unlimited', label: 'Simple AI+ Unlimited', desc: 'No limits on AI queries', icon: '⚡', price: 200 },
];

export default function FeatureSelector({ currentPrice, onComplete }: { currentPrice: number; onComplete: (features: string[], addedPrice: number) => void }) {
    const { theme } = useTheme();
    const [selected, setSelected] = useState<string[]>(['contact', 'seo']);
    const [priceAdd, setPriceAdd] = useState(0);

    const isDark = theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    const toggle = (feat: typeof FEATURES[0]) => {
        if (feat.included) return;
        if (selected.includes(feat.id)) {
            setSelected(selected.filter(f => f !== feat.id));
            setPriceAdd(priceAdd - feat.price);
        } else {
            // Handle AI tier exclusivity
            let newSelected = [...selected];
            let newPrice = priceAdd;
            if (feat.id === 'ai-pro') {
                newSelected = newSelected.filter(f => f !== 'ai-basic' && f !== 'ai-unlimited');
                const removed = FEATURES.filter(f => ['ai-basic', 'ai-unlimited'].includes(f.id) && selected.includes(f.id));
                removed.forEach(r => newPrice -= r.price);
            } else if (feat.id === 'ai-unlimited') {
                newSelected = newSelected.filter(f => f !== 'ai-basic' && f !== 'ai-pro');
                const removed = FEATURES.filter(f => ['ai-basic', 'ai-pro'].includes(f.id) && selected.includes(f.id));
                removed.forEach(r => newPrice -= r.price);
            } else if (feat.id === 'ai-basic') {
                newSelected = newSelected.filter(f => f !== 'ai-pro' && f !== 'ai-unlimited');
                const removed = FEATURES.filter(f => ['ai-pro', 'ai-unlimited'].includes(f.id) && selected.includes(f.id));
                removed.forEach(r => newPrice -= r.price);
            }
            newSelected.push(feat.id);
            newPrice += feat.price;
            setSelected(newSelected);
            setPriceAdd(newPrice);
        }
    };

    const runningTotal = currentPrice + priceAdd;

    return (
        <div className="animate-fade-in w-full max-w-3xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div className="text-center md:text-left">
                    <h2 className={`text-3xl md:text-4xl font-black tracking-tighter mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Add Features.</h2>
                    <p className={`text-base font-light tracking-wide ${isDark ? 'text-purple-200/60' : 'text-slate-500'}`}>Toggle the features you want. Price updates live.</p>
                </div>
                <div className={`px-5 py-3 rounded-2xl font-mono font-bold text-xl ${isDark
                    ? 'bg-white/5 border border-white/10 text-cyan-400'
                    : 'bg-slate-100 border border-slate-200 text-purple-600'}`}>
                    ${runningTotal}
                </div>
            </div>

            <div className="space-y-3">
                {FEATURES.map((feat) => {
                    const isOn = selected.includes(feat.id);
                    return (
                        <button
                            key={feat.id}
                            onClick={() => toggle(feat)}
                            className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200 text-left ${isOn
                                ? (isDark
                                    ? 'bg-purple-900/30 border-cyan-500/40 shadow-[0_0_15px_rgba(0,255,255,0.08)]'
                                    : 'bg-purple-50 border-purple-400 shadow-sm')
                                : (isDark
                                    ? 'bg-white/[0.02] border-white/10 hover:border-white/20'
                                    : 'bg-white/80 border-slate-200 hover:border-slate-300')}`}
                        >
                            <span className="text-2xl">{feat.icon}</span>
                            <div className="flex-1">
                                <h4 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>{feat.label}</h4>
                                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{feat.desc}</p>
                            </div>
                            {feat.included ? (
                                <span className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-green-400' : 'text-green-600'}`}>Included</span>
                            ) : (
                                <div className="flex items-center gap-3">
                                    <span className={`text-xs font-bold ${isDark ? 'text-cyan-400/70' : 'text-purple-500'}`}>+${feat.price}</span>
                                    <div className={`w-10 h-6 rounded-full relative transition-colors ${isOn
                                        ? (isDark ? 'bg-cyan-500' : 'bg-purple-500')
                                        : (isDark ? 'bg-white/10' : 'bg-slate-300')}`}>
                                        <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform ${isOn ? 'translate-x-4' : 'translate-x-0.5'}`}></div>
                                    </div>
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Bundled tier perks */}
            <div className={`space-y-2 pt-2 ${isDark ? 'border-t border-white/5' : 'border-t border-slate-100'}`}>
                <span className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Bundled with your plan</span>
                <div className={`flex items-center gap-4 p-3 rounded-2xl border ${runningTotal >= 199
                    ? (isDark ? 'bg-green-900/10 border-green-500/20' : 'bg-green-50 border-green-200')
                    : (isDark ? 'bg-white/[0.01] border-white/5 opacity-40' : 'bg-slate-50 border-slate-100 opacity-40')}`}>
                    <span className="text-2xl">🎨</span>
                    <div className="flex-1">
                        <h4 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>AI Logo Maker</h4>
                        <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>AI-generated logo from your business name</p>
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-widest ${runningTotal >= 199 ? (isDark ? 'text-green-400' : 'text-green-600') : (isDark ? 'text-slate-600' : 'text-slate-400')}`}>
                        {runningTotal >= 199 ? 'Included' : 'Professional+ ($199)'}
                    </span>
                </div>
                <div className={`flex items-center gap-4 p-3 rounded-2xl border ${runningTotal >= 349
                    ? (isDark ? 'bg-green-900/10 border-green-500/20' : 'bg-green-50 border-green-200')
                    : (isDark ? 'bg-white/[0.01] border-white/5 opacity-40' : 'bg-slate-50 border-slate-100 opacity-40')}`}>
                    <span className="text-2xl">🛡️</span>
                    <div className="flex-1">
                        <h4 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>State Compliance Pack</h4>
                        <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Privacy policy, terms of service, accessibility scanner</p>
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-widest ${runningTotal >= 349 ? (isDark ? 'text-green-400' : 'text-green-600') : (isDark ? 'text-slate-600' : 'text-slate-400')}`}>
                        {runningTotal >= 349 ? 'Included' : 'Business+ ($349)'}
                    </span>
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <button
                    onClick={() => onComplete(selected, priceAdd)}
                    className={`px-12 py-4 rounded-2xl font-bold tracking-widest uppercase transition-all duration-300 border ${isDark
                        ? 'bg-purple-900/80 border-purple-500/50 hover:border-cyan-400 text-white shadow-[0_0_20px_rgba(168,85,247,0.3)]'
                        : 'bg-purple-600 border-purple-500 hover:border-cyan-300 text-white shadow-lg'}`}
                >
                    Continue →
                </button>
            </div>
        </div>
    );
}
