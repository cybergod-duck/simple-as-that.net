'use client';

import { useState } from 'react';
import { useTheme } from 'next-themes';

function generatePalettes(picks: string[]): string[][] {
    const palettes: string[][] = [];
    for (let p = 0; p < 3; p++) {
        const palette: string[] = [...picks];
        const seed = Date.now() + p * 1000 + Math.random() * 999;
        for (let i = 0; i < 3 + Math.floor(Math.random() * 3); i++) {
            const base = picks[Math.floor((seed + i) % picks.length)];
            const r = parseInt(base.slice(1, 3), 16);
            const g = parseInt(base.slice(3, 5), 16);
            const b = parseInt(base.slice(5, 7), 16);
            const shift = (30 + i * 20) * (p % 2 === 0 ? 1 : -1);
            const nr = Math.min(255, Math.max(0, r + shift));
            const ng = Math.min(255, Math.max(0, g + shift));
            const nb = Math.min(255, Math.max(0, b + shift));
            palette.push(`#${nr.toString(16).padStart(2, '0')}${ng.toString(16).padStart(2, '0')}${nb.toString(16).padStart(2, '0')}`);
        }
        palettes.push(palette.slice(0, 8));
    }
    return palettes;
}

export default function ColorPalettePicker({ onComplete }: { onComplete: (palette: string[]) => void }) {
    const { theme } = useTheme();
    const [colors, setColors] = useState(['#7c3aed', '#06b6d4', '#f43f5e']);
    const [phase, setPhase] = useState<'pick' | 'choose'>('pick');
    const [palettes, setPalettes] = useState<string[][]>([]);

    const isDark = theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    const updateColor = (index: number, value: string) => {
        const next = [...colors];
        next[index] = value;
        setColors(next);
    };

    const generateAndAdvance = () => {
        setPalettes(generatePalettes(colors));
        setPhase('choose');
    };

    const regenerate = () => {
        setPalettes(generatePalettes(colors));
    };

    const labels = ['Primary', 'Secondary', 'Accent'];

    if (phase === 'pick') {
        return (
            <div className="animate-fade-in space-y-10 w-full max-w-2xl mx-auto">
                <div className="text-center md:text-left">
                    <h2 className={`text-4xl md:text-5xl font-black tracking-tighter mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>Pick 3 Colors.</h2>
                    <p className={`text-lg font-light tracking-wide ${isDark ? 'text-purple-200/60' : 'text-slate-500'}`}>
                        Choose colors that feel right for your brand. We'll build palettes from them.
                    </p>
                </div>

                {/* 3 Color Wheels */}
                <div className="grid grid-cols-3 gap-8">
                    {colors.map((color, i) => (
                        <div key={i} className="flex flex-col items-center gap-4">
                            <label className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{labels[i]}</label>
                            <div className="relative">
                                {/* Glow effect behind the picker */}
                                <div className="absolute -inset-3 rounded-full blur-xl opacity-40" style={{ backgroundColor: color }}></div>
                                <input
                                    type="color"
                                    value={color}
                                    onChange={(e) => updateColor(i, e.target.value)}
                                    className="relative w-24 h-24 md:w-32 md:h-32 rounded-full cursor-pointer border-4 transition-all hover:scale-105"
                                    style={{ borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)' }}
                                />
                            </div>
                            <span className={`font-mono text-xs font-bold uppercase ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{color}</span>
                        </div>
                    ))}
                </div>

                {/* Live preview strip */}
                <div className="space-y-3">
                    <span className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Preview</span>
                    <div className="flex rounded-2xl overflow-hidden h-16 shadow-lg">
                        {colors.map((c, i) => (
                            <div key={i} className="flex-1 transition-colors duration-300" style={{ backgroundColor: c }}></div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center pt-4">
                    <button onClick={generateAndAdvance} className={`px-12 py-5 rounded-2xl font-bold tracking-widest uppercase transition-all border ${isDark
                        ? 'bg-purple-900/80 border-purple-500/50 hover:border-cyan-400 text-white shadow-[0_0_20px_rgba(168,85,247,0.3)]'
                        : 'bg-purple-600 border-purple-500 hover:border-cyan-300 text-white shadow-lg'}`}>
                        Generate Palettes →
                    </button>
                </div>
            </div>
        );
    }

    // Phase: choose palette
    return (
        <div className="animate-fade-in space-y-8 w-full max-w-4xl mx-auto">
            <div className="text-center md:text-left">
                <h2 className={`text-4xl md:text-5xl font-black tracking-tighter mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>Your Palettes.</h2>
                <p className={`text-lg font-light tracking-wide ${isDark ? 'text-purple-200/60' : 'text-slate-500'}`}>
                    3 color schemes from your picks. Choose one, or regenerate.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {palettes.map((palette, pi) => (
                    <button
                        key={pi}
                        onClick={() => onComplete(palette)}
                        className={`group p-6 rounded-3xl border transition-all duration-300 hover:-translate-y-2 text-left ${isDark
                            ? 'bg-white/[0.03] border-purple-500/20 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(0,255,255,0.15)]'
                            : 'bg-white/80 border-purple-200 hover:border-cyan-400 hover:shadow-xl shadow-sm'}`}
                    >
                        {/* Mini mockup */}
                        <div className="rounded-xl overflow-hidden mb-4 border border-white/10" style={{ backgroundColor: palette[0] }}>
                            <div className="p-4 space-y-2">
                                <div className="h-3 w-20 rounded" style={{ backgroundColor: palette[1] }}></div>
                                <div className="h-2 w-32 rounded opacity-60" style={{ backgroundColor: palette[1] }}></div>
                                <div className="h-8 w-24 rounded-lg mt-3" style={{ backgroundColor: palette[2] }}></div>
                            </div>
                        </div>
                        {/* Color dots */}
                        <div className="flex gap-2">
                            {palette.map((c, ci) => (
                                <div key={ci} className="w-6 h-6 rounded-full border border-white/10 shadow-sm" style={{ backgroundColor: c }}></div>
                            ))}
                        </div>
                        <p className={`mt-3 text-xs font-bold uppercase tracking-widest ${isDark ? 'text-slate-500 group-hover:text-cyan-400' : 'text-slate-400 group-hover:text-purple-600'}`}>
                            Option {pi + 1}
                        </p>
                    </button>
                ))}
            </div>

            <div className="flex items-center justify-center gap-4">
                <button onClick={regenerate} className={`px-8 py-3 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all border ${isDark
                    ? 'text-slate-400 border-white/10 hover:border-cyan-400/50 hover:text-cyan-400'
                    : 'text-slate-500 border-slate-200 hover:border-purple-400 hover:text-purple-600'}`}>
                    🔄 Regenerate
                </button>
                <button onClick={() => { setPhase('pick'); }} className={`px-8 py-3 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all border ${isDark
                    ? 'text-slate-500 border-white/5 hover:border-white/20 hover:text-white'
                    : 'text-slate-400 border-slate-100 hover:border-slate-300 hover:text-slate-600'}`}>
                    ← Change Colors
                </button>
            </div>
        </div>
    );
}
