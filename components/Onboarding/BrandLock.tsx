'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

type BrandStep = 'background' | 'text' | 'accent' | 'upload' | 'preview';

export default function BrandLock({ onComplete }: { onComplete: (brand: any) => void }) {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [brandStep, setBrandStep] = useState<BrandStep>('background');
    const [bgColor, setBgColor] = useState('#0d0521');
    const [textColor, setTextColor] = useState('#ffffff');
    const [accentColor, setAccentColor] = useState('#06b6d4');
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setLogoFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setLogoPreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleDrop = (e: any) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
            setLogoFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setLogoPreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleNext = () => {
        const steps: BrandStep[] = ['background', 'text', 'accent', 'upload', 'preview'];
        const idx = steps.indexOf(brandStep);
        if (idx < steps.length - 1) {
            setBrandStep(steps[idx + 1]);
        } else {
            onComplete({
                bgColor,
                textColor,
                accentColor,
                logoFile: logoPreview,
            });
        }
    };

    const handleBack = () => {
        const steps: BrandStep[] = ['background', 'text', 'accent', 'upload', 'preview'];
        const idx = steps.indexOf(brandStep);
        if (idx > 0) setBrandStep(steps[idx - 1]);
    };

    const stepLabels: Record<BrandStep, string> = {
        background: 'Background Color',
        text: 'Text Color',
        accent: 'Accent Color',
        upload: 'Upload Logo',
        preview: 'Preview',
    };

    const stepNumber = ['background', 'text', 'accent', 'upload', 'preview'].indexOf(brandStep) + 1;

    const ColorPicker = ({ label, value, onChange, description }: { label: string; value: string; onChange: (v: string) => void; description: string }) => (
        <div className="animate-fade-in space-y-8">
            <div className="text-center md:text-left">
                <h2 className={`text-4xl md:text-5xl font-black tracking-tighter mb-4 transition-colors ${isDark ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]' : 'text-slate-900'}`}>{label}</h2>
                <p className={`text-lg font-light tracking-wide transition-colors ${isDark ? 'text-purple-200/60' : 'text-slate-500'}`}>{description}</p>
            </div>

            <div className="flex flex-col items-center gap-8">
                {/* Large color swatch */}
                <button
                    onClick={() => document.getElementById(`color-input-${brandStep}`)?.click()}
                    className={`w-40 h-40 rounded-3xl border-4 transition-all duration-300 cursor-pointer hover:scale-105 ${isDark
                        ? 'border-white/20 hover:border-white/50 shadow-[0_0_30px_rgba(255,255,255,0.1)]'
                        : 'border-slate-300 hover:border-slate-500 shadow-xl'
                        }`}
                    style={{ backgroundColor: value }}
                >
                    <input
                        id={`color-input-${brandStep}`}
                        type="color"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="opacity-0 absolute w-0 h-0"
                    />
                </button>

                {/* Hex display */}
                <div className={`px-6 py-3 rounded-2xl font-mono text-lg font-bold tracking-widest uppercase ${isDark
                    ? 'bg-white/5 border border-white/10 text-white'
                    : 'bg-slate-100 border border-slate-200 text-slate-900'
                    }`}>
                    {value}
                </div>

                {/* Tap hint */}
                <p className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                    Tap the swatch to pick a color
                </p>
            </div>
        </div>
    );

    return (
        <div className="w-full py-6">
            {/* Progress indicator */}
            <div className="flex items-center gap-3 mb-10">
                {['background', 'text', 'accent', 'upload', 'preview'].map((s, i) => (
                    <div key={s} className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${i + 1 < stepNumber
                            ? (isDark ? 'bg-cyan-500 text-black' : 'bg-cyan-500 text-white')
                            : i + 1 === stepNumber
                                ? (isDark ? 'bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]' : 'bg-purple-500 text-white shadow-lg')
                                : (isDark ? 'bg-white/10 text-slate-500' : 'bg-slate-200 text-slate-400')
                            }`}>
                            {i + 1 < stepNumber ? '✓' : i + 1}
                        </div>
                        {i < 4 && (
                            <div className={`w-8 h-0.5 transition-colors ${i + 1 < stepNumber
                                ? (isDark ? 'bg-cyan-500' : 'bg-cyan-500')
                                : (isDark ? 'bg-white/10' : 'bg-slate-200')
                                }`}></div>
                        )}
                    </div>
                ))}
                <span className={`ml-4 text-xs font-bold uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                    {stepLabels[brandStep]}
                </span>
            </div>

            {/* Live preview strip */}
            <div className={`mb-10 p-4 rounded-2xl border backdrop-blur-md ${isDark ? 'bg-white/[0.02] border-white/10' : 'bg-white/80 border-slate-200 shadow-sm'}`}>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl border border-white/10" style={{ backgroundColor: bgColor }}></div>
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>BG</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl border border-white/10" style={{ backgroundColor: textColor }}></div>
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Text</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl border border-white/10" style={{ backgroundColor: accentColor }}></div>
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Accent</span>
                    </div>
                    {logoPreview && (
                        <div className="flex items-center gap-2 ml-auto">
                            <img src={logoPreview} alt="Logo" className="w-10 h-10 rounded-xl object-cover border border-white/10" />
                            <span className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Logo</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Step content */}
            {brandStep === 'background' && (
                <ColorPicker
                    label="Background Color"
                    value={bgColor}
                    onChange={setBgColor}
                    description="Choose the main background color for your website."
                />
            )}

            {brandStep === 'text' && (
                <ColorPicker
                    label="Text Color"
                    value={textColor}
                    onChange={setTextColor}
                    description="Pick the color for your headlines and body text."
                />
            )}

            {brandStep === 'accent' && (
                <ColorPicker
                    label="Accent Color"
                    value={accentColor}
                    onChange={setAccentColor}
                    description="Choose a color for buttons, links, and highlights."
                />
            )}

            {brandStep === 'upload' && (
                <div className="animate-fade-in space-y-8">
                    <div className="text-center md:text-left">
                        <h2 className={`text-4xl md:text-5xl font-black tracking-tighter mb-4 transition-colors ${isDark ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]' : 'text-slate-900'}`}>Upload Your Logo</h2>
                        <p className={`text-lg font-light tracking-wide transition-colors ${isDark ? 'text-purple-200/60' : 'text-slate-500'}`}>
                            Got a logo or photo? Drop it here. Skip if you don't have one yet.
                        </p>
                    </div>

                    <div
                        onClick={() => (document.getElementById('logo-upload-input') as HTMLInputElement)?.click()}
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                        className={`flex flex-col items-center justify-center w-full h-64 rounded-3xl border-2 border-dashed cursor-pointer transition-all duration-300 ${isDark
                            ? 'border-purple-500/30 hover:border-cyan-400/50 bg-white/[0.02] hover:bg-white/[0.04]'
                            : 'border-slate-300 hover:border-cyan-400 bg-slate-50 hover:bg-slate-100'
                            }`}
                    >
                        {logoPreview ? (
                            <div className="flex flex-col items-center gap-4">
                                <img src={logoPreview} alt="Logo preview" className="w-32 h-32 rounded-2xl object-cover border-2 border-white/10" />
                                <p className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>Click to change</p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-4">
                                <svg className={`w-12 h-12 ${isDark ? 'text-slate-600' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                </svg>
                                <p className={`text-sm font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                    Drag & drop or click to upload
                                </p>
                                <p className={`text-xs ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>PNG, JPG, SVG up to 10MB</p>
                            </div>
                        )}
                        <input
                            id="logo-upload-input"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </div>
                </div>
            )}

            {brandStep === 'preview' && (
                <div className="animate-fade-in space-y-8">
                    <div className="text-center md:text-left">
                        <h2 className={`text-4xl md:text-5xl font-black tracking-tighter mb-4 transition-colors ${isDark ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]' : 'text-slate-900'}`}>Looking Good.</h2>
                        <p className={`text-lg font-light tracking-wide transition-colors ${isDark ? 'text-purple-200/60' : 'text-slate-500'}`}>
                            Here's a preview of your brand colors in action.
                        </p>
                    </div>

                    {/* Preview mockup */}
                    <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl" style={{ backgroundColor: bgColor }}>
                        <div className="p-8 space-y-4">
                            {logoPreview && (
                                <img src={logoPreview} alt="Logo" className="w-16 h-16 rounded-xl object-cover" />
                            )}
                            <h3 className="text-3xl font-black" style={{ color: textColor }}>Your Website</h3>
                            <p className="text-sm opacity-70" style={{ color: textColor }}>
                                This is what your content will look like with the colors you picked.
                            </p>
                            <button className="px-6 py-3 rounded-xl font-bold text-sm" style={{ backgroundColor: accentColor, color: bgColor }}>
                                Call to Action
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Navigation */}
            <div className={`mt-10 pt-8 border-t flex items-center justify-between ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                <button
                    onClick={handleBack}
                    className={`px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-widest transition-all ${brandStep === 'background'
                        ? 'opacity-0 pointer-events-none'
                        : isDark
                            ? 'text-slate-400 hover:text-white'
                            : 'text-slate-500 hover:text-slate-900'
                        }`}
                >
                    ← Back
                </button>
                <button
                    onClick={handleNext}
                    className={`group relative px-12 py-4 rounded-2xl font-bold tracking-widest uppercase transition-all duration-500 ease-out overflow-hidden border ${isDark
                        ? 'bg-purple-900/80 border-purple-500/50 hover:border-cyan-400 shadow-[0_0_20px_rgba(168,85,247,0.3)] text-white'
                        : 'bg-purple-600 border-purple-500 hover:border-cyan-300 shadow-[0_4px_20px_rgba(168,85,247,0.2)] text-white'
                        }`}
                >
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity ${isDark ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20' : 'bg-gradient-to-r from-purple-500/10 to-cyan-500/10'}`}></div>
                    <span className="relative z-10">
                        {brandStep === 'preview' ? 'Confirm Colors' : brandStep === 'upload' ? (logoPreview ? 'Next' : 'Skip') : 'Next'}
                    </span>
                </button>
            </div>
        </div>
    );
}
