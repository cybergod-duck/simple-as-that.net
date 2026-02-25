// @ts-nocheck
'use client';
import { useState, useEffect } from 'react';
import BrandLock from './BrandLock';
import TemplateRecommendations from './TemplateRecommendations';

type Step = 'initial' | 'brand' | 'recommendations' | 'domain' | 'complete';

export default function OnboardingFlow() {
    const [step, setStep] = useState<Step>('initial');
    const [formData, setFormData] = useState({
        name: '',
        industry: '',
        goals: '',
        image: null as File | null,
        brand: null as any,
        plan: '',
        domain: '',
    });

    const [industries, setIndustries] = useState<string[]>([]);
    const [isCheckingDomain, setIsCheckingDomain] = useState(false);
    const [availableDomains, setAvailableDomains] = useState<any[]>([]);

    useEffect(() => {
        fetch('/api/industries')
            .then(res => res.json())
            .then(data => {
                if (data.industries) setIndustries(data.industries);
            })
            .catch(console.error);
    }, []);

    const handleInitialSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.industry) return;
        setStep('brand');
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
        // Mock payload for now, pending actual Namecheap integration restoration
        setTimeout(() => {
            setAvailableDomains([
                { domain: businessName.toLowerCase().replace(/[^a-z0-9]/g, '') + '.com', available: true, price: 12.99 },
                { domain: businessName.toLowerCase().replace(/[^a-z0-9]/g, '') + '.net', available: true, price: 14.99 },
                { domain: businessName.toLowerCase().replace(/[^a-z0-9]/g, '') + '.io', available: false, price: 49.99 }
            ]);
            setIsCheckingDomain(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] py-20 px-4 sm:px-6 lg:px-8 font-sans selection:bg-indigo-500/30">
            {/* Header / Logo Area */}
            <div className="max-w-4xl mx-auto mb-16 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <span className="text-white font-black text-xl tracking-tighter">S</span>
                    </div>
                    <span className="text-2xl font-black tracking-tight text-slate-900">Simple-As-That</span>
                </div>
                <div className="text-sm font-bold text-slate-400">
                    Platform Generator &bull; Secure Setup
                </div>
            </div>

            {/* Progress Bar Container */}
            <div className="max-w-4xl mx-auto mb-16 px-4">
                <div className="flex items-center justify-between relative">
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-slate-200 rounded-full -z-10"></div>

                    {['Core Details', 'Visuals', 'Architecture', 'Domain Setup'].map((label, idx) => {
                        const isActive =
                            (idx === 0) ||
                            (idx === 1 && ['brand', 'recommendations', 'domain', 'complete'].includes(step)) ||
                            (idx === 2 && ['recommendations', 'domain', 'complete'].includes(step)) ||
                            (idx === 3 && ['domain', 'complete'].includes(step));

                        return (
                            <div key={label} className="flex flex-col items-center group relative bg-[#F8FAFC]">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 ${isActive ? 'bg-indigo-600 text-white shadow-[0_4px_15px_rgb(99,102,241,0.4)] ring-4 ring-indigo-50' : 'bg-slate-100 text-slate-400 border-2 border-slate-200'}`}>
                                    {isActive ? <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg> : (idx + 1)}
                                </div>
                                <span className={`absolute -bottom-8 whitespace-nowrap text-xs font-bold uppercase tracking-wider transition-colors duration-500 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`}>
                                    {label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Step 1: Initial Details */}
            {step === 'initial' && (
                <div className="max-w-2xl mx-auto bg-white p-10 md:p-14 rounded-[2.5rem] shadow-[0_20px_60px_rgb(0,0,0,0.05)] border border-slate-100 relative">
                    <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-t-[2.5rem]"></div>
                    <form onSubmit={handleInitialSubmit}>
                        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Initialize your instance.</h2>
                        <p className="text-slate-500 font-light mb-10">Define your core variables. Our AI will construct the rest.</p>

                        <div className="space-y-8">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Entity Name</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-400 transition-all font-medium text-slate-900 placeholder:text-slate-300"
                                    placeholder="e.g. Acme Logistics Group"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Primary Industry Sector</label>
                                <input
                                    required
                                    type="text"
                                    list="industry-list"
                                    value={formData.industry}
                                    onChange={e => setFormData({ ...formData, industry: e.target.value })}
                                    className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-400 transition-all font-medium text-slate-900 placeholder:text-slate-300"
                                    placeholder="Search sectors..."
                                />
                                <datalist id="industry-list">
                                    {industries.slice(0, 50).map((ind, i) => <option key={i} value={ind} />)}
                                </datalist>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Conversion Objective</label>
                                <select
                                    required
                                    value={formData.goals}
                                    onChange={e => setFormData({ ...formData, goals: e.target.value })}
                                    className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-400 transition-all font-medium text-slate-900 bg-white"
                                >
                                    <option value="" disabled hidden>Select objective path...</option>
                                    <option value="leads">Maximize Inbound Leads</option>
                                    <option value="sales">Orchestrate Online Sales</option>
                                    <option value="portfolio">Showcase Authority & Trust</option>
                                    <option value="booking">Automate Appointment Routing</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-12">
                            <button type="submit" className="w-full group relative bg-slate-900 hover:bg-[#0B0F19] text-white font-extrabold py-5 rounded-2xl transition-all shadow-xl hover:shadow-2xl overflow-hidden">
                                <span className="relative z-10 flex items-center justify-center gap-2 text-lg">
                                    Compile Framework
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Step 2: Brand Lock */}
            {step === 'brand' && (
                <BrandLock onComplete={handleBrandComplete} />
            )}

            {/* Step 3: Template Recommendations */}
            {step === 'recommendations' && (
                <TemplateRecommendations industry={formData.industry} onComplete={handlePlanSelect} />
            )}

            {/* Step 4: Domain Check */}
            {step === 'domain' && (
                <div className="max-w-4xl mx-auto bg-white p-10 md:p-14 rounded-[2.5rem] shadow-[0_20px_60px_rgb(0,0,0,0.05)] border border-slate-100">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-teal-50 text-teal-600 text-xs font-bold tracking-widest uppercase mb-4 shadow-sm border border-teal-100">
                            DNS Resolution
                        </span>
                        <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Secure Network Address</h2>
                        <p className="text-slate-500 text-lg font-light max-w-2xl mx-auto">
                            The platform requires a verified domain node to deploy onto the edge network. Select your routing protocol.
                        </p>
                    </div>

                    {isCheckingDomain ? (
                        <div className="py-20 flex flex-col items-center justify-center space-y-6">
                            <div className="relative w-20 h-20">
                                <div className="absolute inset-0 bg-indigo-500 rounded-full animate-ping opacity-20"></div>
                                <div className="absolute inset-4 bg-indigo-600 rounded-full animate-pulse shadow-[0_0_20px_rgb(79,70,229)]"></div>
                            </div>
                            <span className="text-slate-600 font-bold uppercase tracking-widest text-sm">Querying Global Ledgers...</span>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Option 1 */}
                            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 hover:border-indigo-300 transition-colors group">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Automated Provisioning</h3>
                                <p className="text-slate-500 font-light text-sm mb-6">Instantly register via our API backing layer. Zero manual DNS configuration required.</p>

                                <div className="space-y-4">
                                    {availableDomains.map((domain, i) => (
                                        <div key={i} className="flex flex-col bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                                            <div className="flex justify-between items-center mb-4">
                                                <div className="flex items-center gap-2">
                                                    {domain.available ? (
                                                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                                                    ) : (
                                                        <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
                                                    )}
                                                    <span className={`font-bold ${!domain.available ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                                                        {domain.domain}
                                                    </span>
                                                </div>
                                                <span className="text-sm font-bold text-indigo-600">${domain.price}/yr</span>
                                            </div>
                                            {domain.available ? (
                                                <button onClick={() => setStep('complete')} className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-md">
                                                    Acquire Asset &rarr;
                                                </button>
                                            ) : (
                                                <div className="w-full py-3 bg-slate-100 text-slate-400 font-bold rounded-xl text-center text-sm">Unavailable</div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Options 2 & 3 */}
                            <div className="space-y-6">
                                <div className="bg-white border border-slate-200 rounded-3xl p-8 hover:shadow-[0_10px_30px_rgb(0,0,0,0.03)] transition-all">
                                    <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                                        <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 24 24"><path d="M16 7a4 4 0 0 0-7.85-1.07A4 4 0 0 0 4 9a5 5 0 0 0 1 9.9h12a4 4 0 0 0 3-7.85 4 4 0 0 0-4-4.05zm0 10H5a3 3 0 0 1-1-5.83l.28-.1-.13-.27a2 2 0 0 1 1.7-2.7h.23l-.1-.23A2 2 0 0 1 7.8 7.3a1.95 1.95 0 0 1 1.75.9l.48 1.15 1.17-.43A2 2 0 0 1 13 8.35a2 2 0 0 1 1.07.3L15.4 9.4l1.24-.12A2 2 0 0 1 18 11.2a2 2 0 0 1-2 1.8z" /></svg>
                                        Cloudflare Pipeline
                                    </h3>
                                    <p className="text-slate-500 font-light text-sm mb-5">Handoff to Cloudflare registrar for at-cost wholesale domains.</p>
                                    <button onClick={() => setStep('complete')} className="w-full border-2 border-orange-500 text-orange-600 hover:bg-orange-50 font-bold py-3 rounded-xl transition-colors">
                                        Open Cloudflare Link
                                    </button>
                                </div>

                                <div className="bg-white border border-slate-200 rounded-3xl p-8 hover:shadow-[0_10px_30px_rgb(0,0,0,0.03)] transition-all">
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">Bring Your Own Node</h3>
                                    <p className="text-slate-500 font-light text-sm mb-5">Map via Domain Connect protocol.</p>
                                    <div className="flex border border-slate-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500">
                                        <input type="text" placeholder="yourdomain.com" className="w-full px-4 py-3 outline-none text-slate-800 font-medium bg-slate-50" />
                                        <button onClick={() => setStep('complete')} className="bg-slate-900 hover:bg-[#0B0F19] text-white font-bold px-6 transition-colors">
                                            Link
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Step 5: Complete */}
            {step === 'complete' && (
                <div className="max-w-xl mx-auto bg-white p-14 rounded-[2.5rem] shadow-2xl text-center border-t-8 border-indigo-500">
                    <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                        <svg className="w-12 h-12 text-emerald-500 animate-[bounce_2s_ease-in-out_infinite]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4">Architecture Locked.</h2>
                    <p className="text-slate-500 text-lg font-light mb-10 leading-relaxed">
                        Your AI-optimized framework is being deployed to the edge network. Redirecting to workspace...
                    </p>
                    <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden shadow-inner">
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full animate-[progress_2s_ease-in-out_infinite]" style={{ width: '80%' }}></div>
                    </div>
                </div>
            )}
        </div>
    );
}
