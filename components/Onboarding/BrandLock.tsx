// @ts-nocheck
'use client';
import { useState } from 'react';

const PALETTES = [
    { id: 'executive', name: 'Executive Mint', colors: ['bg-slate-900', 'bg-teal-500', 'bg-slate-50'], describe: 'Trust, Authority, Growth' },
    { id: 'creative', name: 'Studio Indigo', colors: ['bg-indigo-950', 'bg-indigo-500', 'bg-white'], describe: 'Modern, Bold, Digital' },
    { id: 'minimal', name: 'Clean Slate', colors: ['bg-zinc-900', 'bg-zinc-400', 'bg-zinc-50'], describe: 'Minimal, Tech, Architecture' },
    { id: 'warm', name: 'Desert Sand', colors: ['bg-stone-900', 'bg-orange-400', 'bg-orange-50'], describe: 'Approachable, Local, Artisan' },
];

export default function BrandLock({ onComplete }: { onComplete: (brand: any) => void }) {
    const [selectedId, setSelectedId] = useState<string>('executive');

    return (
        <div className="max-w-4xl mx-auto bg-white p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 transition-all">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-3">Establish your visual baseline.</h2>
                <p className="text-lg text-slate-500 max-w-xl mx-auto font-light">
                    Our platform algorithmically enforces high-contrast, WCAG-compliant color systems to maximize your conversion rates.
                </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 mb-12">
                {PALETTES.map((palette) => (
                    <div
                        key={palette.id}
                        onClick={() => setSelectedId(palette.id)}
                        className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${selectedId === palette.id
                            ? 'border-indigo-500 bg-indigo-50/30 shadow-[0_8px_20px_rgb(99,102,241,0.12)]'
                            : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                            }`}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <h3 className="text-lg font-bold text-slate-800">{palette.name}</h3>
                                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mt-1">{palette.describe}</p>
                            </div>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedId === palette.id ? 'border-indigo-500' : 'border-slate-300'}`}>
                                {selectedId === palette.id && <div className="w-2.5 h-2.5 rounded-full bg-indigo-500"></div>}
                            </div>
                        </div>

                        {/* Palette Preview Bar */}
                        <div className="flex h-12 rounded-lg overflow-hidden shadow-sm">
                            <div className={`${palette.colors[0]} w-3/6`}></div>
                            <div className={`${palette.colors[1]} w-1/6`}></div>
                            <div className={`${palette.colors[2]} w-2/6 border-y border-r border-slate-200`}></div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-between items-center pt-8 border-t border-slate-100">
                <div className="text-sm text-slate-500 font-medium">Step 2 of 4</div>
                <button
                    onClick={() => onComplete(PALETTES.find(p => p.id === selectedId))}
                    className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                >
                    Lock Architecture &rarr;
                </button>
            </div>
        </div>
    );
}
