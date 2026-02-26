'use client';

import { useState } from 'react';
import { useTheme } from 'next-themes';

/* ── HSL-based palette generation ─────────────────────────── */
function hexToHsl(hex: string): [number, number, number] {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;
    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        else if (max === g) h = ((b - r) / d + 2) / 6;
        else h = ((r - g) / d + 4) / 6;
    }
    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToHex(h: number, s: number, l: number): string {
    h = ((h % 360) + 360) % 360;
    s = Math.max(0, Math.min(100, s)) / 100;
    l = Math.max(0, Math.min(100, l)) / 100;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}

function generatePalettes(picks: string[]): string[][] {
    const hslPicks = picks.map(hexToHsl);
    const palettes: string[][] = [];

    // Strategy 1: Analogous (close hues, varied lightness)
    const p1: string[] = [];
    hslPicks.forEach(([h, s, l]) => {
        p1.push(hslToHex(h, s, l));
        p1.push(hslToHex(h + 15, Math.min(100, s + 10), Math.max(10, l - 15)));
    });
    p1.push(hslToHex(hslPicks[0][0], 15, 95)); // near-white
    p1.push(hslToHex(hslPicks[0][0], 20, 10)); // near-black
    palettes.push(p1.slice(0, 8));

    // Strategy 2: Triadic (120° apart, vibrant)
    const p2: string[] = [];
    const baseH = hslPicks[0][0];
    [0, 120, 240].forEach(offset => {
        const h = baseH + offset;
        p2.push(hslToHex(h, 70, 50));
        p2.push(hslToHex(h, 40, 75));
    });
    p2.push(hslToHex(baseH, 10, 97));
    p2.push(hslToHex(baseH, 15, 8));
    palettes.push(p2.slice(0, 8));

    // Strategy 3: Complementary (opposite hues, high contrast)
    const p3: string[] = [];
    hslPicks.forEach(([h, s, l]) => {
        p3.push(hslToHex(h, s, l));
        p3.push(hslToHex(h + 180, Math.min(100, s + 5), l));
    });
    p3.push(hslToHex(hslPicks[1][0] + 90, 30, 85));
    p3.push(hslToHex(hslPicks[2][0], 25, 12));
    palettes.push(p3.slice(0, 8));

    return palettes;
}

/* ── Component ────────────────────────────────────────────── */
type Props = {
    onSelect: (palette: string[]) => void;
    onColorsChange: (colors: string[]) => void;
};

export default function ColorPalettePicker({ onSelect, onColorsChange }: Props) {
    const { theme } = useTheme();
    const [colors, setColors] = useState(['#7c3aed', '#06b6d4', '#f43f5e']);
    const [phase, setPhase] = useState<'pick' | 'choose'>('pick');
    const [palettes, setPalettes] = useState<string[][]>([]);

    const isDark = theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    const updateColor = (i: number, val: string) => {
        const next = [...colors];
        next[i] = val;
        setColors(next);
        onColorsChange(next);
    };

    const generate = () => {
        setPalettes(generatePalettes(colors));
        setPhase('choose');
    };

    const labels = ['Primary', 'Secondary', 'Accent'];

    if (phase === 'pick') {
        return (
            <div className="space-y-6">
                <div>
                    <h3 className={`text-lg font-black tracking-tight mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>Pick 3 Colors</h3>
                    <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Choose colors that feel right for your brand.</p>
                </div>
                <div className="flex gap-6 justify-center">
                    {colors.map((c, i) => (
                        <div key={i} className="flex flex-col items-center gap-2">
                            <span className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{labels[i]}</span>
                            <div className="relative">
                                <div className="absolute -inset-2 rounded-full blur-lg opacity-30" style={{ backgroundColor: c }}></div>
                                <input type="color" value={c} onChange={e => updateColor(i, e.target.value)}
                                    className="relative w-16 h-16 rounded-full cursor-pointer border-2"
                                    style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }} />
                            </div>
                            <span className={`font-mono text-[10px] ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>{c}</span>
                        </div>
                    ))}
                </div>
                <div className="flex rounded-xl overflow-hidden h-8">
                    {colors.map((c, i) => <div key={i} className="flex-1" style={{ backgroundColor: c }} />)}
                </div>
                <button onClick={generate} className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-widest border transition-all ${isDark
                    ? 'bg-purple-900/60 border-purple-500/40 text-white hover:border-cyan-400'
                    : 'bg-purple-600 border-purple-500 text-white hover:border-cyan-300'}`}>
                    Generate Palettes →
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h3 className={`text-lg font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>Your Palettes</h3>
            <div className="space-y-3">
                {palettes.map((pal, pi) => (
                    <button key={pi} onClick={() => onSelect(pal)}
                        className={`w-full p-3 rounded-xl border transition-all text-left flex items-center gap-3 ${isDark
                            ? 'bg-white/[0.02] border-white/10 hover:border-cyan-400/50'
                            : 'bg-white/80 border-slate-200 hover:border-purple-400'}`}>
                        <div className="flex gap-1">
                            {pal.map((c, ci) => <div key={ci} className="w-6 h-6 rounded-full border border-white/10" style={{ backgroundColor: c }} />)}
                        </div>
                        <span className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Option {pi + 1}</span>
                    </button>
                ))}
            </div>
            <div className="flex gap-2">
                <button onClick={() => setPalettes(generatePalettes(colors))} className={`flex-1 py-2 rounded-xl text-xs font-bold border ${isDark ? 'border-white/10 text-slate-400 hover:text-cyan-400' : 'border-slate-200 text-slate-500 hover:text-purple-600'}`}>🔄 Regenerate</button>
                <button onClick={() => setPhase('pick')} className={`flex-1 py-2 rounded-xl text-xs font-bold border ${isDark ? 'border-white/5 text-slate-600 hover:text-white' : 'border-slate-100 text-slate-400 hover:text-slate-600'}`}>← Change</button>
            </div>
        </div>
    );
}
