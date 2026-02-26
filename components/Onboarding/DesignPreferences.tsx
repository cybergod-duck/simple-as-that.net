'use client';

import { useState } from 'react';
import { useTheme } from 'next-themes';

type DesignChoices = {
    pages: string;
    mode: string;
    shadows: string;
    borders: string;
    layout: string;
    images: string;
};

const QUESTIONS: { key: keyof DesignChoices; label: string; subtitle: string; options: { id: string; label: string; icon: string; desc: string; price: number }[] }[] = [
    {
        key: 'pages', label: 'How many pages?', subtitle: 'This sets the foundation of your site.',
        options: [
            { id: '1', label: '1 Page', icon: '📄', desc: 'A single landing page', price: 79 },
            { id: '3', label: '3 Pages', icon: '📑', desc: 'Home, About, Contact', price: 199 },
            { id: '5', label: '5+ Pages', icon: '📚', desc: 'Full multi-page site', price: 349 },
            { id: 'unlimited', label: 'Unlimited', icon: '🏗️', desc: 'No limits on pages', price: 849 },
        ]
    },
    {
        key: 'mode', label: 'Light mode, dark mode, or both?', subtitle: 'Your visitors will thank you.',
        options: [
            { id: 'light', label: 'Light', icon: '☀️', desc: 'Clean and bright', price: 0 },
            { id: 'dark', label: 'Dark', icon: '🌙', desc: 'Sleek and modern', price: 0 },
            { id: 'both', label: 'Both', icon: '🌗', desc: 'Auto-switching themes', price: 50 },
        ]
    },
    {
        key: 'shadows', label: 'What about shadows?', subtitle: 'Depth makes a design feel alive.',
        options: [
            { id: 'flat', label: 'Flat', icon: '⬜', desc: 'Clean and minimal', price: 0 },
            { id: 'subtle', label: 'Subtle Depth', icon: '🔲', desc: 'Soft, layered feel', price: 0 },
            { id: 'heavy', label: 'Heavy Shadows', icon: '◼️', desc: 'Bold and dramatic', price: 25 },
        ]
    },
    {
        key: 'borders', label: 'Border style?', subtitle: 'Shapes communicate personality.',
        options: [
            { id: 'rounded', label: 'Rounded', icon: '⬭', desc: 'Friendly and approachable', price: 0 },
            { id: 'sharp', label: 'Sharp', icon: '▭', desc: 'Professional and precise', price: 0 },
            { id: 'pill', label: 'Pill', icon: '💊', desc: 'Modern and playful', price: 0 },
        ]
    },
    {
        key: 'layout', label: 'Page layout?', subtitle: 'How your content will be organized.',
        options: [
            { id: 'stack', label: 'Simple Stack', icon: '📋', desc: 'Sections stacked vertically', price: 0 },
            { id: 'hero', label: 'Hero + Sections', icon: '🖼️', desc: 'Big hero banner, then content', price: 0 },
            { id: 'sidebar', label: 'Sidebar + Content', icon: '📰', desc: 'Navigation sidebar layout', price: 50 },
        ]
    },
    {
        key: 'images', label: 'How many images do you have?', subtitle: 'No images? No problem — we use stock.',
        options: [
            { id: 'none', label: 'None', icon: '🖼️', desc: "We'll use premium stock", price: 0 },
            { id: 'few', label: 'A Few', icon: '📸', desc: 'Logo and some photos', price: 0 },
            { id: 'gallery', label: 'Full Gallery', icon: '🎞️', desc: 'Lots of images to showcase', price: 25 },
        ]
    },
];

export default function DesignPreferences({ currentPrice, onComplete }: { currentPrice: number; onComplete: (choices: DesignChoices, addedPrice: number) => void }) {
    const { theme } = useTheme();
    const [qIndex, setQIndex] = useState(0);
    const [choices, setChoices] = useState<DesignChoices>({ pages: '', mode: '', shadows: '', borders: '', layout: '', images: '' });
    const [priceAdd, setPriceAdd] = useState(0);

    const isDark = theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    const q = QUESTIONS[qIndex];

    const select = (optId: string, price: number) => {
        const newChoices = { ...choices, [q.key]: optId };
        let newPrice = priceAdd;

        // For pages, the price IS the base (not additive)
        if (q.key === 'pages') {
            newPrice = price - 79; // subtract base $79
        } else {
            newPrice += price;
        }

        setChoices(newChoices);
        setPriceAdd(newPrice);

        if (qIndex < QUESTIONS.length - 1) {
            setTimeout(() => setQIndex(qIndex + 1), 300);
        } else {
            onComplete(newChoices, newPrice);
        }
    };

    const runningTotal = currentPrice + priceAdd;

    return (
        <div className="animate-fade-in w-full max-w-3xl mx-auto space-y-8">
            {/* Progress + Price */}
            <div className="flex items-center justify-between">
                <div className="flex gap-1">
                    {QUESTIONS.map((_, i) => (
                        <div key={i} className={`h-1.5 w-8 rounded-full transition-all ${i < qIndex
                            ? (isDark ? 'bg-cyan-500' : 'bg-cyan-500')
                            : i === qIndex
                                ? (isDark ? 'bg-purple-500' : 'bg-purple-500')
                                : (isDark ? 'bg-white/10' : 'bg-slate-200')}`}
                        />
                    ))}
                </div>
                <div className={`px-4 py-2 rounded-xl font-mono font-bold text-sm ${isDark
                    ? 'bg-white/5 border border-white/10 text-cyan-400'
                    : 'bg-slate-100 border border-slate-200 text-purple-600'}`}>
                    ${runningTotal}
                </div>
            </div>

            {/* Question */}
            <div className="text-center md:text-left">
                <h2 className={`text-3xl md:text-4xl font-black tracking-tighter mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>{q.label}</h2>
                <p className={`text-base font-light tracking-wide ${isDark ? 'text-purple-200/60' : 'text-slate-500'}`}>{q.subtitle}</p>
            </div>

            {/* Options */}
            <div className={`grid gap-4 ${q.options.length <= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-4'}`}>
                {q.options.map((opt) => (
                    <button
                        key={opt.id}
                        onClick={() => select(opt.id, opt.price)}
                        className={`group relative p-6 rounded-3xl text-left transition-all duration-300 border backdrop-blur-md hover:-translate-y-1 ${isDark
                            ? 'bg-white/[0.03] border-purple-500/20 hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(0,255,255,0.12)]'
                            : 'bg-white/80 border-purple-200 hover:border-cyan-400 hover:shadow-xl shadow-sm'}`}
                    >
                        <div className="text-3xl mb-3">{opt.icon}</div>
                        <h3 className={`text-lg font-black tracking-tight mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{opt.label}</h3>
                        <p className={`text-xs font-light mb-3 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{opt.desc}</p>
                        {opt.price > 0 && (
                            <span className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-cyan-400/70' : 'text-purple-500'}`}>
                                {q.key === 'pages' ? `$${opt.price}` : `+$${opt.price}`}
                            </span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
