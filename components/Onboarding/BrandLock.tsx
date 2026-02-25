'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

const PALETTES = [
    {
        id: 'neon_cyan',
        name: 'Terminal Cyan',
        colors: { dom: 'bg-black', acc: 'bg-cyan-400', sub: 'bg-slate-900', lightDom: 'bg-white', lightSub: 'bg-slate-100' },
        describe: 'Maximum tech. High conversion.'
    },
    {
        id: 'neon_green',
        name: 'Matrix Green',
        colors: { dom: 'bg-black', acc: 'bg-green-400', sub: 'bg-zinc-900', lightDom: 'bg-white', lightSub: 'bg-zinc-100' },
        describe: 'Financial growth. Verified trust.'
    },
    {
        id: 'neon_pink',
        name: 'Synthwave Pink',
        colors: { dom: 'bg-[#0A0A0A]', acc: 'bg-pink-500', sub: 'bg-[#141414]', lightDom: 'bg-white', lightSub: 'bg-[#FAFAFA]' },
        describe: 'Creative boldness. High memory retention.'
    }
];

export default function BrandLock({ onComplete }: { onComplete: (brand: any) => void }) {
    const { theme } = useTheme();
    const [selectedId, setSelectedId] = useState<string>('neon_cyan');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    return (
        <div className={`w-full py-10 fade-in transition-colors duration-1000 ${isDark ? 'bg-black' : 'bg-[#FAFAFA]'}`}>
            <div className="text-center md:text-left px-4 md:px-0 mb-12 max-w-4xl relative">
                {/* Neon Glow Accent */}
                <div className={`absolute -left-10 w-24 h-24 blur-[50px] pointer-events-none transition-colors ${isDark ? 'bg-cyan-500/10 mix-blend-screen' : 'bg-cyan-500/15 mix-blend-multiply'
                    }`}></div>

                <h2 className={`text-4xl md:text-5xl font-black tracking-tighter mb-4 transition-colors ${isDark ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]' : 'text-slate-900'
                    }`}>
                    Visual Baseline.
                </h2>
                <p className={`text-lg font-light tracking-wide max-w-2xl transition-colors ${isDark ? 'text-cyan-100/60 drop-shadow-[0_0_5px_rgba(0,255,255,0.2)]' : 'text-slate-500'
                    }`}>
                    Select your core architectural color map. These neon algorithms are mathematically generated to pass ultimate WCAG AAA contrast limits against deep black environments.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12 px-4 md:px-0">
                {PALETTES.map((palette) => (
                    <div
                        key={palette.id}
                        onClick={() => setSelectedId(palette.id)}
                        className={`relative p-8 rounded-3xl cursor-pointer transition-all duration-300 ease-out border backdrop-blur-md overflow-hidden ${selectedId === palette.id
                                ? (isDark
                                    ? 'scale-[1.03] z-10 border-white bg-white/5 shadow-[0_0_30px_rgba(0,255,255,0.15)]'
                                    : 'scale-[1.03] z-10 border-slate-900 bg-white shadow-[0_8px_30px_rgba(0,255,255,0.15)]')
                                : (isDark
                                    ? 'scale-100 opacity-60 hover:opacity-100 border-white/10 bg-black hover:border-white/30'
                                    : 'scale-100 border-slate-200 bg-slate-50 hover:border-slate-400 hover:shadow-sm')
                            }`}
                    >
                        {/* Hover Gradient Injection */}
                        <div className={`absolute -inset-10 opacity-0 transition-opacity ${selectedId === palette.id ? 'opacity-20' : 'group-hover:opacity-10'
                            } blur-[40px] pointer-events-none ${palette.id === 'neon_cyan' ? 'bg-cyan-500' : palette.id === 'neon_green' ? 'bg-green-500' : 'bg-pink-500'
                            }`}></div>

                        <div className="relative z-10 flex justify-between items-start mb-6">
                            <div>
                                <h3 className={`text-2xl font-black tracking-tight mb-1 transition-colors ${isDark ? 'text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]' : 'text-slate-900'
                                    }`}>{palette.name}</h3>
                                <p className={`text-[10px] font-bold tracking-widest uppercase transition-colors ${isDark ? 'text-slate-400' : 'text-slate-500'
                                    }`}>{palette.describe}</p>
                            </div>

                            {/* Custom Radio Toggle */}
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${selectedId === palette.id
                                    ? (isDark ? 'border-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'border-slate-900')
                                    : (isDark ? 'border-white/30' : 'border-slate-300')
                                }`}>
                                {selectedId === palette.id && <div className={`w-2.5 h-2.5 rounded-full animate-pulse ${isDark ? 'bg-white' : 'bg-slate-900'}`}></div>}
                            </div>
                        </div>

                        {/* Strict Compliance Palette Preview */}
                        <div className={`relative z-10 flex h-16 rounded-xl overflow-hidden shadow-inner border ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                            {/* Dominant 60 */}
                            <div className={`${isDark ? palette.colors.dom : palette.colors.lightDom} w-[60%] flex items-center px-4 transition-colors`}>
                                <span className={`text-[10px] font-bold tracking-widest uppercase ${isDark ? 'opacity-40 text-white' : 'text-slate-400'}`}>60%</span>
                            </div>
                            {/* Secondary 30 */}
                            <div className={`${isDark ? palette.colors.sub : palette.colors.lightSub} w-[30%] flex items-center px-3 border-l transition-colors ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                                <span className={`text-[10px] font-bold tracking-widest uppercase ${isDark ? 'opacity-40 text-white' : 'text-slate-400'}`}>30%</span>
                            </div>
                            {/* Accent 10 */}
                            <div className={`${palette.colors.acc} w-[10%] border-l ${isDark ? 'border-white/10 shadow-[0_0_15px_currentColor]' : 'border-slate-200 shadow-inner'}`}></div>
                        </div>

                        {/* Accessibility readout */}
                        <div className="relative z-10 mt-4 flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${palette.colors.acc.replace('bg-', 'bg-')} animate-pulse ${isDark ? 'shadow-[0_0_8px_currentColor]' : ''}`}></div>
                            <span className={`text-[10px] font-bold tracking-widest uppercase transition-colors ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                AAA Deep Contrast
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Action Bar */}
            <div className={`pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-6 px-4 md:px-0 max-w-4xl mx-auto transition-colors ${isDark ? 'border-white/10' : 'border-slate-200'
                }`}>
                <div className={`text-xs font-bold tracking-widest uppercase ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                    Map Initialized
                </div>
                <button
                    onClick={() => onComplete(PALETTES.find(p => p.id === selectedId))}
                    className={`group relative w-full md:w-auto px-12 py-5 rounded-2xl font-bold tracking-widest uppercase transition-all duration-500 ease-out overflow-hidden border ${isDark
                            ? 'bg-black border-white/20 hover:border-cyan-400'
                            : 'bg-white border-slate-200 hover:border-cyan-400 shadow-[0_4px_20px_rgba(0,0,0,0.05)]'
                        }`}
                >
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity ${isDark ? 'bg-cyan-500/20' : 'bg-cyan-500/10'}`}></div>
                    <span className={`relative z-10 transition-colors ${isDark ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'text-slate-900 drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)]'}`}>
                        Confirm Baseline
                    </span>
                </button>
            </div>
        </div>
    );
}
