'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import ColorPalettePicker from './ColorPalettePicker';
import DesignPreferences from './DesignPreferences';
import FeatureSelector from './FeatureSelector';
import LivePreview from './LivePreview';

type Step = 'initial' | 'thinking' | 'colors' | 'design' | 'features' | 'preview' | 'complete';

export default function OnboardingFlow() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [step, setStep] = useState<Step>('initial');

    const [formData, setFormData] = useState({
        name: '',
        industry: '',
        hasWebsite: '',
        existingUrl: '',
        goals: '',
        palette: [] as string[],
        design: { pages: '', mode: '', shadows: '', borders: '', layout: '', images: '' },
        features: [] as string[],
        domain: '',
    });

    const [basePrice, setBasePrice] = useState(99);
    const [designPrice, setDesignPrice] = useState(0);
    const [featurePrice, setFeaturePrice] = useState(0);
    const totalPrice = basePrice + designPrice + featurePrice;

    useEffect(() => { setMounted(true); }, []);

    const getIndustryGradient = (str: string) => {
        if (!str) return 'from-cyan-500/10 to-transparent';
        let hash = 0;
        for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
        const c = ['from-cyan-500/10 to-green-500/5', 'from-green-500/10 to-pink-500/5', 'from-pink-500/10 to-cyan-500/5'];
        return c[Math.abs(hash) % c.length];
    };

    const handleInitialSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.industry) return;
        setStep('thinking');
        setTimeout(() => setStep('colors'), 2200);
    };

    const handlePaletteComplete = (palette: string[]) => {
        setFormData({ ...formData, palette });
        setStep('design');
    };

    const handleDesignComplete = (choices: any, addedPrice: number) => {
        setFormData({ ...formData, design: choices });
        const pagePrice = choices.pages === 'unlimited' ? 999 : choices.pages === '5' ? 499 : choices.pages === '3' ? 199 : 99;
        setBasePrice(pagePrice);
        setDesignPrice(addedPrice);
        setStep('features');
    };

    const handleFeaturesComplete = (features: string[], addedPrice: number) => {
        setFormData({ ...formData, features });
        setFeaturePrice(addedPrice);
        setStep('preview');
    };

    const handlePreviewComplete = (domain: string) => {
        setFormData({ ...formData, domain });
        setStep('complete');
    };

    if (!mounted) return null;

    const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    const dynamicGradient = getIndustryGradient(formData.industry);

    return (
        <div className={`w-full min-h-screen overflow-y-auto relative flex justify-center items-start py-12 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-1000 ${isDark ? 'bg-[#0d0521] text-slate-200' : 'bg-[#FAFAFA] text-slate-900'}`}>
            {/* Background layers */}
            <div className={`fixed inset-0 z-0 ${isDark ? 'bg-[#0d0521]' : 'bg-[#FAFAFA]'}`}></div>
            <div className={`fixed inset-0 bg-gradient-to-br ${dynamicGradient} blur-[120px] z-0 ${isDark ? 'mix-blend-screen' : 'mix-blend-multiply opacity-50'}`}></div>
            <div className={`fixed inset-0 bg-[size:40px_40px] pointer-events-none z-0 ${isDark
                ? 'bg-[linear-gradient(rgba(168,85,247,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.03)_1px,transparent_1px)]'
                : 'bg-[linear-gradient(rgba(168,85,247,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.05)_1px,transparent_1px)]'}`}></div>

            <div className="w-full max-w-5xl relative z-10">

                {/* Step 1: Initial */}
                {step === 'initial' && (
                    <div className="animate-fade-in space-y-6 max-w-2xl mx-auto">
                        <div className="text-center md:text-left">
                            <h2 className={`text-4xl md:text-5xl font-black tracking-tighter mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>Let's build your website.</h2>
                            <p className={`text-lg font-light tracking-wide ${isDark ? 'text-cyan-100/60' : 'text-slate-500'}`}>Tell us a little about your business and we'll handle the rest.</p>
                        </div>
                        <form onSubmit={handleInitialSubmit} className="space-y-4">
                            <div>
                                <label className={`block text-xs font-bold uppercase tracking-widest mb-3 ${formData.name ? (isDark ? 'text-cyan-400' : 'text-purple-600') : 'text-slate-500'}`}>Your Business Name</label>
                                <input required type="text" value={formData.name} onChange={(e: any) => setFormData({ ...formData, name: e.target.value })}
                                    className={`w-full bg-transparent border-b-2 py-4 text-2xl font-bold focus:outline-none rounded-none ${isDark ? 'border-purple-800 focus:border-cyan-400 text-white placeholder:text-slate-700' : 'border-purple-200 focus:border-purple-500 text-slate-900 placeholder:text-slate-300'}`}
                                    placeholder="Acme Interdimensional" />
                            </div>
                            <div>
                                <label className={`block text-xs font-bold uppercase tracking-widest mb-3 ${formData.industry ? (isDark ? 'text-purple-300' : 'text-purple-600') : 'text-slate-500'}`}>What Industry Are You In?</label>
                                <input required type="text" value={formData.industry} onChange={(e: any) => setFormData({ ...formData, industry: e.target.value })}
                                    className={`w-full bg-transparent border-b-2 py-4 text-2xl font-bold focus:outline-none rounded-none ${isDark ? 'border-purple-800 focus:border-purple-400 text-white placeholder:text-slate-700' : 'border-purple-200 focus:border-purple-500 text-slate-900 placeholder:text-slate-300'}`}
                                    placeholder="Type your industry" />
                            </div>
                            <div>
                                <label className={`block text-xs font-bold uppercase tracking-widest mb-3 ${formData.hasWebsite ? (isDark ? 'text-purple-300' : 'text-purple-600') : 'text-slate-500'}`}>Already Have a Website?</label>
                                <select required value={formData.hasWebsite} onChange={(e: any) => setFormData({ ...formData, hasWebsite: e.target.value, goals: '', existingUrl: '' })}
                                    className={`w-full bg-transparent border-b-2 py-4 text-xl font-bold focus:outline-none cursor-pointer appearance-none rounded-none ${isDark ? 'border-purple-800 focus:border-purple-400 text-white [&>option]:bg-[#0d0521]' : 'border-purple-200 focus:border-purple-500 text-slate-900 [&>option]:bg-white'}`}>
                                    <option value="" disabled hidden>Select one</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                            {formData.hasWebsite === 'yes' && (
                                <div className="animate-fade-in">
                                    <label className={`block text-xs font-bold uppercase tracking-widest mb-3 ${formData.existingUrl ? (isDark ? 'text-cyan-400' : 'text-purple-600') : 'text-slate-500'}`}>Your Current Website</label>
                                    <input type="url" value={formData.existingUrl} onChange={(e: any) => setFormData({ ...formData, existingUrl: e.target.value })}
                                        className={`w-full bg-transparent border-b-2 py-4 text-lg font-bold focus:outline-none rounded-none ${isDark ? 'border-purple-800 focus:border-cyan-400 text-white placeholder:text-slate-700' : 'border-purple-200 focus:border-purple-500 text-slate-900 placeholder:text-slate-300'}`}
                                        placeholder="www.yourbusiness.com" />
                                </div>
                            )}
                            {formData.hasWebsite && (
                                <div className="animate-fade-in">
                                    <label className={`block text-xs font-bold uppercase tracking-widest mb-3 ${formData.goals ? (isDark ? 'text-cyan-400' : 'text-purple-600') : 'text-slate-500'}`}>What's Your Main Goal?</label>
                                    <select required value={formData.goals} onChange={(e: any) => setFormData({ ...formData, goals: e.target.value })}
                                        className={`w-full bg-transparent border-b-2 py-4 text-xl font-bold focus:outline-none cursor-pointer appearance-none rounded-none ${isDark ? 'border-purple-800 focus:border-cyan-400 text-white [&>option]:bg-[#0d0521]' : 'border-purple-200 focus:border-purple-500 text-slate-900 [&>option]:bg-white'}`}>
                                        <option value="" disabled hidden>What are you looking for?</option>
                                        {formData.hasWebsite === 'yes' ? (
                                            <><option value="redesign">Redesign My Website</option><option value="rebuild">Rebuild From Scratch</option><option value="add-features">Add New Features</option><option value="leads">Get More Customers (Leads)</option></>
                                        ) : (
                                            <><option value="new-site">Build a New Website</option><option value="new-business">Start a New Business</option><option value="portfolio">Build Trust & Credibility</option><option value="sales">Sell Products Online</option></>
                                        )}
                                    </select>
                                </div>
                            )}
                            <div className="pt-8">
                                <button type="submit" className={`w-full md:w-auto px-12 py-5 rounded-2xl font-bold tracking-widest uppercase transition-all border ${isDark
                                    ? 'bg-purple-900/80 border-purple-500/50 hover:border-cyan-400 text-white shadow-[0_0_20px_rgba(168,85,247,0.3)]'
                                    : 'bg-purple-600 border-purple-500 hover:border-cyan-300 text-white shadow-lg'}`}>
                                    Get Started
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Step 1.5: Thinking */}
                {step === 'thinking' && (
                    <div className="animate-fade-in flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8">
                        <div className="relative flex items-center justify-center w-24 h-24">
                            <div className={`absolute inset-0 rounded-full border-2 border-t-transparent animate-spin ${isDark ? 'border-purple-500/50' : 'border-purple-500'}`}></div>
                            <div className={`absolute inset-2 rounded-full border-2 border-b-transparent animate-[spin_1.5s_linear_infinite_reverse] ${isDark ? 'border-cyan-500/50' : 'border-cyan-500'}`}></div>
                            <div className={`w-2 h-2 rounded-full animate-pulse ${isDark ? 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]' : 'bg-slate-900'}`}></div>
                        </div>
                        <div className="space-y-2">
                            <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Building Your Preview</h3>
                            <p className={`font-mono text-xs tracking-widest uppercase ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>Preparing your {formData.industry} website options...</p>
                        </div>
                    </div>
                )}

                {/* Step 2: Color Picker */}
                {step === 'colors' && <ColorPalettePicker onComplete={handlePaletteComplete} />}

                {/* Step 3: Design Prefs */}
                {step === 'design' && <DesignPreferences currentPrice={basePrice} onComplete={handleDesignComplete} />}

                {/* Step 4: Features */}
                {step === 'features' && <FeatureSelector currentPrice={basePrice + designPrice} onComplete={handleFeaturesComplete} />}

                {/* Step 5: Preview + Domain (split screen) */}
                {step === 'preview' && (
                    <LivePreview
                        businessName={formData.name}
                        palette={formData.palette}
                        design={formData.design}
                        features={formData.features}
                        totalPrice={totalPrice}
                        onComplete={handlePreviewComplete}
                    />
                )}

                {/* Step 6: Complete */}
                {step === 'complete' && (
                    <div className="animate-fade-in text-center space-y-8 py-20">
                        <div className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center animate-[pulse_2s_ease-in-out_infinite] border ${isDark
                            ? 'bg-purple-500/10 border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.2)]'
                            : 'bg-purple-50 border-purple-200 shadow-lg'}`}>
                            <svg className={`w-10 h-10 ${isDark ? 'text-cyan-400' : 'text-purple-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <div className="space-y-4">
                            <h2 className={`text-4xl md:text-5xl font-black tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>You're All Set!</h2>
                            <p className={`text-lg font-light ${isDark ? 'text-purple-200/60' : 'text-slate-500'}`}>We're building your ${totalPrice} website now. This won't take long...</p>
                        </div>
                        <div className={`w-full max-w-sm mx-auto h-2 rounded-full overflow-hidden border ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'}`}>
                            <div className="h-full bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500 rounded-full animate-[progress_2.5s_ease-in-out_infinite]" style={{ width: '80%' }}></div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
