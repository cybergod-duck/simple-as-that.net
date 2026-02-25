'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import BrandLock from './BrandLock';
import TemplateRecommendations from './TemplateRecommendations';
import UpsellModule from './UpsellModule';

type Step = 'initial' | 'thinking' | 'brand' | 'recommendations' | 'domain' | 'upsells' | 'complete';

export default function OnboardingFlow() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [step, setStep] = useState<Step>('initial');

    const [formData, setFormData] = useState({
        name: '',
        industry: '',
        existingUrl: '',
        goals: '',
        brand: null as any,
        plan: '',
        domain: '',
        upsells: [] as string[],
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

    const getIndustryGradient = (str: string) => {
        if (!str) return 'from-cyan-500/10 to-transparent';
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        const colors = [
            'from-cyan-500/10 to-green-500/5',
            'from-green-500/10 to-pink-500/5',
            'from-pink-500/10 to-cyan-500/5',
        ];
        return colors[Math.abs(hash) % colors.length];
    };

    const handleInitialSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.industry) return;

        setStep('thinking');
        setTimeout(() => {
            setStep('brand');
        }, 2200);
    };

    const handleBrandComplete = (brandData: any) => {
        setFormData({ ...formData, brand: brandData });
        checkDomains(formData.name);
        setStep('domain');
    };

    const handleDomainSelect = (domain: string) => {
        setFormData({ ...formData, domain });
        setStep('recommendations');
    };

    const handlePlanSelect = (plan: string) => {
        setFormData({ ...formData, plan });
        setStep('upsells');
    };

    const handleUpsellsComplete = (upsells: string[]) => {
        setFormData({ ...formData, upsells });
        setStep('complete');
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
        <div className={`w-full h-full min-h-[calc(100vh-120px)] relative flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden transition-colors duration-1000 ${isDark ? 'bg-[#0d0521] text-slate-200' : 'bg-[#FAFAFA] text-slate-900'
            }`}>
            {/* Background Base */}
            <div className={`absolute inset-0 z-0 transition-colors duration-1000 ${isDark ? 'bg-[#0d0521]' : 'bg-[#FAFAFA]'}`}></div>

            {/* Neon Glowing Ambient Gradients */}
            <div className={`absolute inset-0 bg-gradient-to-br ${dynamicGradient} blur-[120px] transition-all duration-1000 z-0 ${isDark ? 'mix-blend-screen opacity-100' : 'mix-blend-multiply opacity-50'
                }`}></div>

            {/* Holographic grid overlay */}
            <div className={`absolute inset-0 bg-[size:40px_40px] pointer-events-none z-0 ${isDark
                ? 'bg-[linear-gradient(rgba(168,85,247,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.03)_1px,transparent_1px)]'
                : 'bg-[linear-gradient(rgba(168,85,247,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.05)_1px,transparent_1px)]'
                }`}></div>



            {/* Core Wizard Container */}
            <div className="w-full max-w-2xl relative z-10 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]">

                {/* Step 1: Initial Details */}
                {step === 'initial' && (
                    <div className="animate-fade-in space-y-12">
                        <div className="text-center md:text-left">
                            <h2 className={`text-4xl md:text-5xl font-black tracking-tighter mb-4 transition-colors ${isDark ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]' : 'text-slate-900'
                                }`}>Let's build your website.</h2>
                            <p className={`text-lg font-light tracking-wide transition-colors ${isDark ? 'text-cyan-100/60' : 'text-slate-500'
                                }`}>
                                Tell us a little about your business and we'll handle the rest.
                            </p>
                        </div>

                        <form onSubmit={handleInitialSubmit} className="space-y-10">
                            {/* Seamless Input Fields */}
                            <div className="group relative">
                                <label className={`block text-xs font-bold uppercase tracking-widest mb-3 transition-colors ${formData.name
                                    ? (isDark ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(0,255,255,0.4)]' : 'text-purple-600')
                                    : 'text-slate-500'
                                    }`}>Your Business Name</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.name}
                                    onChange={(e: any) => setFormData({ ...formData, name: e.target.value })}
                                    className={`w-full bg-transparent border-b-2 py-4 text-2xl font-bold focus:outline-none transition-colors rounded-none ${isDark
                                        ? 'border-purple-800 focus:border-cyan-400 text-white placeholder:text-slate-700'
                                        : 'border-purple-200 focus:border-purple-500 text-slate-900 placeholder:text-slate-300'
                                        }`}
                                    placeholder="Acme Interdimensional"
                                />
                            </div>

                            <div className="group relative">
                                <label className={`block text-xs font-bold uppercase tracking-widest mb-3 transition-colors ${formData.industry
                                    ? (isDark ? 'text-purple-300 drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]' : 'text-purple-600')
                                    : 'text-slate-500'
                                    }`}>What Industry Are You In?</label>
                                <input
                                    required
                                    type="text"
                                    list="industry-list"
                                    value={formData.industry}
                                    onChange={(e: any) => setFormData({ ...formData, industry: e.target.value })}
                                    className={`w-full bg-transparent border-b-2 py-4 text-2xl font-bold focus:outline-none transition-colors rounded-none ${isDark
                                        ? 'border-purple-800 focus:border-purple-400 text-white placeholder:text-slate-700'
                                        : 'border-purple-200 focus:border-purple-500 text-slate-900 placeholder:text-slate-300'
                                        }`}
                                    placeholder="e.g. Roofers"
                                />
                                <datalist id="industry-list">
                                    {industries.map((ind, i) => <option key={i} value={ind} />)}
                                </datalist>
                            </div>

                            <div className="group relative">
                                <label className={`block text-xs font-bold uppercase tracking-widest mb-3 transition-colors text-slate-500`}>Already Have a Website? <span className="text-slate-700 normal-case">(optional)</span></label>
                                <input
                                    type="url"
                                    value={formData.existingUrl}
                                    onChange={(e: any) => setFormData({ ...formData, existingUrl: e.target.value })}
                                    className={`w-full bg-transparent border-b-2 py-4 text-lg font-bold focus:outline-none transition-colors rounded-none ${isDark
                                        ? 'border-purple-800 focus:border-cyan-400 text-white placeholder:text-slate-700'
                                        : 'border-purple-200 focus:border-purple-500 text-slate-900 placeholder:text-slate-300'
                                        }`}
                                    placeholder="www.yourbusiness.com"
                                />
                            </div>

                            <div className="group relative">
                                <label className={`block text-xs font-bold uppercase tracking-widest mb-3 transition-colors ${formData.goals
                                    ? (isDark ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(0,255,255,0.4)]' : 'text-purple-600')
                                    : 'text-slate-500'
                                    }`}>What's Your Main Goal?</label>
                                <select
                                    required
                                    value={formData.goals}
                                    onChange={(e: any) => setFormData({ ...formData, goals: e.target.value })}
                                    className={`w-full bg-transparent border-b-2 py-4 text-xl font-bold focus:outline-none transition-colors cursor-pointer appearance-none rounded-none ${isDark
                                        ? 'border-purple-800 focus:border-cyan-400 text-white [&>option]:bg-[#0d0521]'
                                        : 'border-purple-200 focus:border-purple-500 text-slate-900 [&>option]:bg-white'
                                        }`}
                                >
                                    <option value="" disabled hidden className="text-slate-500">What are you looking for?</option>
                                    <option value="leads">Get More Customers (Leads)</option>
                                    <option value="sales">Sell Products Online (Sales)</option>
                                    <option value="portfolio">Build Trust & Credibility (Portfolio)</option>
                                </select>
                            </div>

                            <div className="pt-8">
                                <button type="submit" className={`group relative w-full md:w-auto px-12 py-5 rounded-2xl font-bold tracking-widest uppercase transition-all duration-500 ease-out overflow-hidden border ${isDark
                                    ? 'bg-purple-900/80 border-purple-500/50 hover:border-cyan-400 shadow-[0_0_20px_rgba(168,85,247,0.3)]'
                                    : 'bg-purple-600 border-purple-500 hover:border-cyan-300 shadow-[0_4px_20px_rgba(168,85,247,0.2)]'
                                    }`}>
                                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity ${isDark ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20' : 'bg-gradient-to-r from-purple-500/10 to-cyan-500/10'
                                        }`}></div>
                                    <span className={`relative z-10 transition-colors ${isDark ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'text-slate-900 drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)]'
                                        }`}>
                                        Get Started
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Step 1.5: Artificial "Thinking" State */}
                {step === 'thinking' && (
                    <div className="animate-fade-in flex flex-col items-center justify-center h-full text-center space-y-8">
                        <div className="relative flex items-center justify-center w-24 h-24">
                            <div className={`absolute inset-0 rounded-full border-2 border-t-transparent animate-spin ${isDark ? 'border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.3)]' : 'border-purple-500 shadow-[0_2px_10px_rgba(168,85,247,0.2)]'
                                }`}></div>
                            <div className={`absolute inset-2 rounded-full border-2 border-b-transparent animate-[spin_1.5s_linear_infinite_reverse] ${isDark ? 'border-cyan-500/50 shadow-[0_0_15px_rgba(0,255,255,0.3)]' : 'border-cyan-500 shadow-[0_2px_10px_rgba(0,255,255,0.2)]'
                                }`}></div>
                            <div className={`absolute inset-4 rounded-full border-2 border-l-transparent animate-[spin_2s_linear_infinite] ${isDark ? 'border-purple-400/50 shadow-[0_0_15px_rgba(168,85,247,0.3)]' : 'border-purple-400 shadow-[0_2px_10px_rgba(168,85,247,0.2)]'
                                }`}></div>
                            <div className={`w-2 h-2 rounded-full animate-pulse transition-all ${isDark ? 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]' : 'bg-slate-900 shadow-[0_2px_4px_rgba(0,0,0,0.2)]'
                                }`}></div>
                        </div>
                        <div className="space-y-2">
                            <h3 className={`text-2xl font-bold tracking-tight transition-colors ${isDark ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]' : 'text-slate-900'
                                }`}>Building Your Preview</h3>
                            <p className={`font-mono text-xs tracking-widest uppercase transition-colors ${isDark ? 'text-cyan-400 drop-shadow-[0_0_5px_rgba(0,255,255,0.4)]' : 'text-cyan-600'
                                }`}>
                                Preparing your {formData.industry} website options...
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

                {/* Step 4: Template Recommendations */}
                {step === 'recommendations' && (
                    <div className="animate-fade-in w-full max-w-screen-xl mx-auto -mx-4 sm:mx-0">
                        <TemplateRecommendations industry={formData.industry} onComplete={handlePlanSelect} />
                    </div>
                )}

                {/* Step 4.5: Upsell Add-ons */}
                {step === 'upsells' && (
                    <div className="animate-fade-in w-full max-w-screen-xl mx-auto -mx-4 sm:mx-0">
                        <UpsellModule selectedPlan={formData.plan} onComplete={handleUpsellsComplete} />
                    </div>
                )}

                {/* Step 3: Domain Check */}
                {step === 'domain' && (
                    <div className="animate-fade-in space-y-12 w-full max-w-3xl mx-auto">
                        <div className="text-center md:text-left">
                            <h2 className={`text-4xl font-black tracking-tighter mb-4 transition-colors ${isDark ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]' : 'text-slate-900'
                                }`}>Pick Your Domain.</h2>
                            <p className={`text-lg font-light tracking-wide transition-colors ${isDark ? 'text-cyan-100/60' : 'text-slate-500'
                                }`}>
                                Every great website starts with a great web address.
                            </p>
                        </div>

                        {isCheckingDomain ? (
                            <div className="py-20 flex flex-col items-center justify-center space-y-6">
                                <div className={`w-12 h-12 border-4 border-t-transparent rounded-full animate-spin transition-colors ${isDark ? 'border-cyan-400 drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]' : 'border-cyan-500'
                                    }`}></div>
                                <span className={`font-mono text-xs tracking-widest uppercase transition-colors ${isDark ? 'text-cyan-400 drop-shadow-[0_0_5px_rgba(0,255,255,0.4)]' : 'text-cyan-600'
                                    }`}>Checking availability...</span>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                {/* Option 1: Full Auto */}
                                <div className={`p-8 rounded-[2rem] border transition-all duration-300 hover:-translate-y-1 backdrop-blur-md ${isDark
                                    ? 'bg-black/50 border-cyan-500/20 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(0,255,255,0.1)]'
                                    : 'bg-white/80 border-cyan-500/20 hover:border-cyan-500 hover:shadow-[0_8px_30px_rgba(0,255,255,0.15)] shadow-sm'
                                    }`}>
                                    <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>We'll Set It Up For You</h3>
                                    <p className="text-sm mb-6 text-slate-500">Pick a domain below and we handle everything. No tech skills needed.</p>

                                    <div className="space-y-3">
                                        {availableDomains.map((domain, i) => (
                                            <div key={i} className={`flex items-center justify-between p-4 rounded-xl border ${isDark ? 'bg-black/60 border-white/5' : 'bg-slate-50 border-slate-200'
                                                }`}>
                                                <div className="flex flex-col">
                                                    <span className={`font-bold ${!domain.available ? 'line-through opacity-50 text-slate-500' : (isDark ? 'text-cyan-100' : 'text-slate-800')}`}>{domain.domain}</span>
                                                    {domain.available && <span className={`text-xs font-bold ${isDark ? 'text-green-400 drop-shadow-[0_0_5px_rgba(0,255,0,0.5)]' : 'text-green-600'}`}>${domain.price}/yr</span>}
                                                </div>
                                                {domain.available ? (
                                                    <button onClick={() => handleDomainSelect(domain.domain)} className={`px-4 py-2 rounded-lg font-bold text-xs tracking-wider uppercase transition-colors border ${isDark
                                                        ? 'bg-white/10 text-white hover:bg-cyan-500/20 hover:text-cyan-400 border-white/10 hover:border-cyan-500/30'
                                                        : 'bg-white text-slate-900 hover:bg-cyan-50 hover:text-cyan-700 border-slate-200 hover:border-cyan-300 shadow-sm'
                                                        }`}>Select</button>
                                                ) : (
                                                    <span className={`text-xs font-bold ${isDark ? 'text-pink-500 opacity-80' : 'text-pink-600'}`}>Taken</span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Option 2 & 3 */}
                                <div className="space-y-6 flex flex-col justify-between">
                                    <div className={`p-8 rounded-[2rem] border transition-all duration-300 hover:-translate-y-1 backdrop-blur-md ${isDark
                                        ? 'bg-black/50 border-orange-500/20 hover:border-orange-500/50 hover:shadow-[0_0_30px_rgba(255,165,0,0.1)]'
                                        : 'bg-white/80 border-orange-400/30 hover:border-orange-500 hover:shadow-[0_8px_30px_rgba(255,165,0,0.15)] shadow-sm'
                                        }`}>
                                        <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Buy Through Cloudflare</h3>
                                        <p className="text-xs mb-6 text-slate-500">Purchase your domain directly at the lowest price.</p>
                                        <button onClick={() => handleDomainSelect('cloudflare-pending')} className={`w-full py-3 border rounded-xl font-bold text-sm transition-colors ${isDark
                                            ? 'border-orange-500/50 text-orange-400 hover:bg-orange-500/10 hover:shadow-[0_0_15px_rgba(255,165,0,0.2)]'
                                            : 'border-orange-400 text-orange-600 hover:bg-orange-50 shadow-sm'
                                            }`}>Cloudflare Hub</button>
                                    </div>

                                    <div className={`p-8 rounded-[2rem] border transition-all duration-300 hover:-translate-y-1 backdrop-blur-md ${isDark
                                        ? 'bg-black/50 border-white/10 hover:border-white/30'
                                        : 'bg-white/80 border-slate-200 hover:border-slate-400 shadow-sm'
                                        }`}>
                                        <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>I Already Have a Domain</h3>
                                        <p className="text-xs mb-4 text-slate-500">Connect the domain you already own.</p>
                                        <div className="flex gap-2">
                                            <input type="text" id="custom-domain-input" placeholder="yourdomain.com" className={`w-full px-4 py-3 rounded-xl border focus:outline-none transition-colors ${isDark
                                                ? 'focus:ring-1 focus:ring-white/50 bg-black/60 border-white/10 text-white'
                                                : 'focus:ring-2 focus:ring-slate-300 bg-white border-slate-200 text-slate-900 shadow-inner'
                                                }`} />
                                            <button onClick={() => {
                                                const val = (document.getElementById('custom-domain-input') as HTMLInputElement)?.value;
                                                handleDomainSelect(val || 'custom-mapped');
                                            }} className={`px-6 rounded-xl font-bold transition-colors border ${isDark
                                                ? 'bg-white/10 text-white hover:bg-white/20 border-white/10'
                                                : 'bg-slate-900 text-white hover:bg-slate-800 border-transparent shadow-md'
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
                        <div className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center animate-[pulse_2s_ease-in-out_infinite] border ${isDark
                            ? 'bg-purple-500/10 border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.2)]'
                            : 'bg-purple-50 border-purple-200 shadow-[0_8px_30px_rgba(168,85,247,0.15)]'
                            }`}>
                            <svg className={`w-10 h-10 ${isDark ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(0,255,255,0.6)]' : 'text-purple-500 drop-shadow-[0_2px_4px_rgba(168,85,247,0.3)]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <div className="space-y-4">
                            <h2 className={`text-4xl md:text-5xl font-black tracking-tighter ${isDark ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]' : 'text-slate-900'}`}>You're All Set!</h2>
                            <p className={`text-lg font-light tracking-wide ${isDark ? 'text-purple-200/60' : 'text-slate-500'}`}>
                                We're setting up your website now. This won't take long...
                            </p>
                        </div>
                        <div className={`w-full max-w-sm mx-auto h-2 rounded-full overflow-hidden border ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200 shadow-inner'}`}>
                            <div className={`h-full bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500 rounded-full animate-[progress_2.5s_ease-in-out_infinite] ${isDark ? 'shadow-[0_0_10px_rgba(168,85,247,0.5)]' : ''}`} style={{ width: '80%' }}></div>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}
