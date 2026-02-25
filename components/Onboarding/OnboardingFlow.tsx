// @ts-nocheck
'use client';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import BrandLock from './BrandLock';
import TemplateRecommendations from './TemplateRecommendations';
import ThemeToggle from '../ThemeToggle'; // Added ThemeToggle to the flow header

type Step = 'initial' | 'thinking' | 'brand' | 'recommendations' | 'domain' | 'complete';

export default function OnboardingFlow() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [step, setStep] = useState<Step>('initial');
    const [isThinking, setIsThinking] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        industry: '',
        goals: '',
        brand: null as any,
        plan: '',
        domain: '',
    });

    const [industries, setIndustries] = useState<string[]>([]);
    const [isCheckingDomain, setIsCheckingDomain] = useState(false);
    const [availableDomains, setAvailableDomains] = useState<any[]>([]);

    useEffect(() => {
        setMounted(true);
        fetch('/api/industries')
            .then(res => res.json())
            .then(data => {
                if (data.industries) setIndustries(data.industries);
            })
            .catch(console.error);
    }, []);

    // Helper to generate a deterministic fluid gradient base hue from the industry string
    const getIndustryGradient = (str: string) => {
        if (!str) return 'from-slate-500/10 to-slate-400/5';
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        const colors = [
            'from-indigo-500/10 to-violet-500/5',
            'from-cyan-500/10 to-emerald-500/5',
            'from-rose-500/10 to-orange-500/5',
            'from-amber-500/10 to-yellow-500/5',
            'from-fuchsia-500/10 to-pink-500/5'
        ];
        return colors[Math.abs(hash) % colors.length];
    };

    const handleInitialSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.industry) return;

        // Artificial "Thinking" Micro-Animation State
        setStep('thinking');
        setTimeout(() => {
            setStep('brand');
        }, 2200); // 2.2 seconds of "Zero UI" analysis
    };

    const handleBrandComplete = (brandData: any) => {
        setFormData({ ...formData, brand: brandData });
        setStep('recommendations');
    };

    const handlePlanSelect = (plan: string) => {
        setFormData({ ...formData, plan });
        checkDomains(formData.name);
        setStep('domain');
    };

    const checkDomains = async (businessName: string) => {
        setIsCheckingDomain(true);
        setTimeout(() => {
            setAvailableDomains([
                { domain: businessName.toLowerCase().replace(/[^a-z0-9]/g, '') + '.com', available: true, price: 12.99 },
                { domain: businessName.toLowerCase().replace(/[^a-z0-9]/g, '') + '.net', available: true, price: 14.99 },
                { domain: businessName.toLowerCase().replace(/[^a-z0-9]/g, '') + '.io', available: false, price: 49.99 }
            ]);
            setIsCheckingDomain(false);
        }, 1500);
    };

    if (!mounted) return null;

    const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    const dynamicGradient = getIndustryGradient(formData.industry);

    return (
        <div className={`min-h-screen relative flex justify-center items-center py-20 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden transition-colors duration-1000 ${isDark ? 'bg-[#000000] text-slate-200' : 'bg-[#FAFAFA] text-slate-900'}`}>

            {/* Dynamic Fluid Gradient Background (reacts to user input) */}
            <div className={`absolute inset-0 bg-gradient-to-br ${dynamicGradient} blur-[150px] mix-blend-normal transition-all duration-1000 -z-10`}></div>

            {/* Header / Native App Bar */}
            <div className="absolute top-0 w-full px-8 py-6 flex justify-between items-center z-50">
                <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs transition-colors ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}>
                        S
                    </div>
                    <span className="font-bold tracking-tight text-sm">System Initialize</span>
                </div>
            </div>

            {/* Core Wizard Container - Neo-Minimalist (No boxes, heavy white space) */}
            <div className="w-full max-w-2xl relative z-10 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]">

                {/* Step 1: Initial Details (Zero UI Conversational Layout) */}
                {step === 'initial' && (
                    <div className="animate-fade-in space-y-12">
                        <div className="text-center md:text-left">
                            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">Define entity.</h2>
                            <p className={`text-lg font-light tracking-wide ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                Provide baseline vectors. The generative engine will compile the architecture stack based on these parameters.
                            </p>
                        </div>

                        <form onSubmit={handleInitialSubmit} className="space-y-10">
                            {/* Seamless Input Fields */}
                            <div className="group relative">
                                <label className={`block text-xs font-bold uppercase tracking-widest mb-3 transition-colors ${formData.name ? (isDark ? 'text-white' : 'text-black') : 'text-slate-500'}`}>Entity / Business Name</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className={`w-full bg-transparent border-b-2 py-4 text-2xl font-bold focus:outline-none transition-colors rounded-none ${isDark
                                            ? 'border-slate-800 focus:border-white text-white placeholder:text-slate-700'
                                            : 'border-slate-200 focus:border-black text-black placeholder:text-slate-300'
                                        }`}
                                    placeholder="Acme Interdimensional"
                                />
                            </div>

                            <div className="group relative">
                                <label className={`block text-xs font-bold uppercase tracking-widest mb-3 transition-colors ${formData.industry ? (isDark ? 'text-white' : 'text-black') : 'text-slate-500'}`}>Primary Vector (Industry)</label>
                                <input
                                    required
                                    type="text"
                                    list="industry-list"
                                    value={formData.industry}
                                    onChange={e => setFormData({ ...formData, industry: e.target.value })}
                                    className={`w-full bg-transparent border-b-2 py-4 text-2xl font-bold focus:outline-none transition-colors rounded-none ${isDark
                                            ? 'border-slate-800 focus:border-white text-white placeholder:text-slate-700'
                                            : 'border-slate-200 focus:border-black text-black placeholder:text-slate-300'
                                        }`}
                                    placeholder="e.g. Roofers"
                                />
                                <datalist id="industry-list">
                                    {industries.slice(0, 50).map((ind, i) => <option key={i} value={ind} />)}
                                </datalist>
                            </div>

                            <div className="group relative">
                                <label className={`block text-xs font-bold uppercase tracking-widest mb-3 transition-colors ${formData.goals ? (isDark ? 'text-white' : 'text-black') : 'text-slate-500'}`}>Target Objective</label>
                                <select
                                    required
                                    value={formData.goals}
                                    onChange={e => setFormData({ ...formData, goals: e.target.value })}
                                    className={`w-full bg-transparent border-b-2 py-4 text-xl font-bold focus:outline-none transition-colors cursor-pointer appearance-none rounded-none ${isDark
                                            ? 'border-slate-800 focus:border-white text-white [&>option]:bg-[#09090B]'
                                            : 'border-slate-200 focus:border-black text-black [&>option]:bg-white'
                                        }`}
                                >
                                    <option value="" disabled hidden className={isDark ? 'text-slate-600' : 'text-slate-400'}>Select conversion path...</option>
                                    <option value="leads">Maximize Inbound Pipeline (Leads)</option>
                                    <option value="sales">Orchestrate e-Commerce (Sales)</option>
                                    <option value="portfolio">Establish Market Authority (Trust)</option>
                                </select>
                            </div>

                            <div className="pt-8">
                                <button type="submit" className={`w-full md:w-auto px-12 py-5 rounded-2xl font-bold tracking-widest uppercase transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.03] active:scale-[0.98] ${isDark
                                        ? 'bg-white text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]'
                                        : 'bg-black text-white hover:shadow-[0_10px_40px_rgba(0,0,0,0.2)]'
                                    }`}>
                                    Compile Framework
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Step 1.5: Artificial "Thinking" State (Micro-Animation) */}
                {step === 'thinking' && (
                    <div className="animate-fade-in flex flex-col items-center justify-center h-full text-center space-y-8">
                        <div className="relative flex items-center justify-center w-24 h-24">
                            <div className={`absolute inset-0 rounded-full border-2 border-t-transparent animate-spin ${isDark ? 'border-white/20' : 'border-black/10'}`}></div>
                            <div className={`absolute inset-2 rounded-full border-2 border-b-transparent animate-[spin_1.5s_linear_infinite_reverse] ${isDark ? 'border-indigo-500/50' : 'border-indigo-500/30'}`}></div>
                            <div className={`w-3 h-3 rounded-full animate-pulse ${isDark ? 'bg-white' : 'bg-black'}`}></div>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-bold tracking-tight">Analyzing Sector Data</h3>
                            <p className={`font-mono text-xs tracking-widest uppercase ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                                Compiling {formData.industry} topography...
                            </p>
                        </div>
                    </div>
                )}

                {/* Step 2: Brand Lock */}
                {step === 'brand' && (
                    <div className="animate-fade-in w-full max-w-4xl mx-auto">
                        <BrandLock onComplete={handleBrandComplete} />
                    </div>
                )}

                {/* Step 3: Template Recommendations (Handing off to redesigned carousel component) */}
                {step === 'recommendations' && (
                    <div className="animate-fade-in w-full max-w-screen-xl mx-auto -mx-4 sm:mx-0">
                        <TemplateRecommendations industry={formData.industry} onComplete={handlePlanSelect} />
                    </div>
                )}

                {/* Step 4: Domain Check (CSS Grid for Mobile) */}
                {step === 'domain' && (
                    <div className="animate-fade-in space-y-12 w-full max-w-3xl mx-auto">
                        <div className="text-center md:text-left">
                            <h2 className="text-4xl font-black tracking-tighter mb-4">Network Address.</h2>
                            <p className={`text-lg font-light tracking-wide ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                Secure a verified domain node to push to the edge network.
                            </p>
                        </div>

                        {isCheckingDomain ? (
                            <div className="py-20 flex flex-col items-center justify-center space-y-6">
                                <div className={`w-12 h-12 border-4 border-t-transparent rounded-full animate-spin ${isDark ? 'border-white' : 'border-black'}`}></div>
                                <span className={`font-mono text-xs tracking-widest uppercase ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Querying Registrars...</span>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                {/* Option 1: Full Auto */}
                                <div className={`p-8 rounded-[2rem] border transition-all duration-300 hover:-translate-y-1 ${isDark ? 'bg-white/5 border-white/10 hover:border-white/30' : 'bg-white border-slate-200 shadow-xl hover:shadow-2xl'
                                    }`}>
                                    <h3 className="text-xl font-bold mb-2">Auto-Provisioning</h3>
                                    <p className={`text-sm mb-6 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Via our API backing layer. Zero DNS config required.</p>

                                    <div className="space-y-3">
                                        {availableDomains.map((domain, i) => (
                                            <div key={i} className={`flex items-center justify-between p-4 rounded-xl border ${isDark ? 'bg-black/50 border-white/5' : 'bg-slate-50 border-slate-100'
                                                }`}>
                                                <div className="flex flex-col">
                                                    <span className={`font-bold ${!domain.available && 'line-through opacity-50'}`}>{domain.domain}</span>
                                                    {domain.available && <span className="text-xs font-bold text-indigo-500">${domain.price}/yr</span>}
                                                </div>
                                                {domain.available ? (
                                                    <button onClick={() => setStep('complete')} className={`px-4 py-2 rounded-lg font-bold text-xs tracking-wider uppercase transition-colors ${isDark ? 'bg-white text-black hover:bg-slate-200' : 'bg-black text-white hover:bg-slate-800'
                                                        }`}>Select</button>
                                                ) : (
                                                    <span className="text-xs font-bold text-rose-500 opacity-80">Taken</span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Option 2 & 3 */}
                                <div className="space-y-6 flex flex-col justify-between">
                                    <div className={`p-8 rounded-[2rem] border transition-all duration-300 hover:-translate-y-1 ${isDark ? 'bg-white/5 border-white/10 hover:border-white/30' : 'bg-white border-slate-200 shadow-xl hover:shadow-2xl'
                                        }`}>
                                        <h3 className="text-lg font-bold mb-2">Cloudflare Pipeline</h3>
                                        <p className={`text-xs mb-6 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Handoff to Cloudflare registrar for at-cost domains.</p>
                                        <button onClick={() => setStep('complete')} className={`w-full py-3 border-2 rounded-xl font-bold text-sm transition-colors ${isDark ? 'border-orange-500 text-orange-500 hover:bg-orange-500/10' : 'border-orange-500 text-orange-600 hover:bg-orange-50'
                                            }`}>Cloudflare Hub</button>
                                    </div>

                                    <div className={`p-8 rounded-[2rem] border transition-all duration-300 hover:-translate-y-1 ${isDark ? 'bg-white/5 border-white/10 hover:border-white/30' : 'bg-white border-slate-200 shadow-xl hover:shadow-2xl'
                                        }`}>
                                        <h3 className="text-lg font-bold mb-2">Bring Your Own</h3>
                                        <p className={`text-xs mb-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Map via Domain Connect protocol.</p>
                                        <div className="flex gap-2">
                                            <input type="text" placeholder="yourdomain.com" className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isDark ? 'bg-black/50 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-black'
                                                }`} />
                                            <button onClick={() => setStep('complete')} className={`px-6 rounded-xl font-bold transition-colors ${isDark ? 'bg-white text-black hover:bg-slate-200' : 'bg-black text-white hover:bg-slate-800'
                                                }`}>Map</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Step 5: Complete */}
                {step === 'complete' && (
                    <div className="animate-fade-in text-center space-y-8">
                        <div className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center animate-[bounce_2s_ease-in-out_infinite] ${isDark ? 'bg-emerald-500/20' : 'bg-emerald-50'
                            }`}>
                            <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Architecture Locked.</h2>
                            <p className={`text-lg font-light tracking-wide ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                Deploying framework to the edge network. Initiating hyperspace jump...
                            </p>
                        </div>
                        <div className={`w-full max-w-sm mx-auto h-2 rounded-full overflow-hidden ${isDark ? 'bg-white/10' : 'bg-slate-200'}`}>
                            <div className="h-full bg-emerald-500 rounded-full animate-[progress_2.5s_ease-in-out_infinite]" style={{ width: '80%' }}></div>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}
