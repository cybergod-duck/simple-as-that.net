'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import ColorPalettePicker from './ColorPalettePicker';
import LiveMockup from './LiveMockup';

/* ── Tier pricing from STRIPE_PRICE_LIST.md ──────────────── */
const HERO_OPTIONS = [
    { id: 'basic', label: 'Simple Hero', desc: 'H1 + Subtitle + CTA', price: 49, tier: 1 },
    { id: 'split', label: 'Split-Screen', desc: 'With industry image', price: 89, tier: 2 },
    { id: 'floating-form', label: 'Dynamic + Float Form', desc: 'Lead capture built-in', price: 129, tier: 3 },
    { id: 'video', label: 'Video Background', desc: 'High-end video hero', price: 179, tier: 4 },
    { id: '3d', label: 'Premium 3D / Dashboard', desc: 'Highest visual impact', price: 249, tier: 5 },
];

const FEATURE_OPTIONS = [
    { id: '3point', label: '3-Point Highlights', price: 39 },
    { id: 'icon-grid', label: '2-Column Icon Grid', price: 59 },
    { id: 'zigzag', label: 'Zig-Zag Layout', price: 79 },
    { id: 'hover-cards', label: 'Hover Cards', price: 99 },
    { id: 'scroll-anim', label: 'Scroll Animations + Timeline', price: 139 },
];

const TRUST_OPTIONS = [
    { id: 'text-testimonial', label: 'Text Testimonial', price: 29 },
    { id: 'review-slider', label: '3-Column Review Slider', price: 49 },
    { id: 'client-success', label: 'Client Success + Logos', price: 69 },
    { id: 'masonry-grid', label: 'Masonry Review Grid', price: 79 },
    { id: 'video-trust', label: 'Video + Trust Badges', price: 99 },
];

const INTEGRATION_OPTIONS = [
    { id: 'basic-form', label: 'Basic Lead Form → Email', price: 39 },
    { id: 'crm-form', label: 'CRM/Email Integration', price: 79 },
    { id: 'calendar', label: 'Lead Capture + Calendar', price: 119 },
    { id: 'enterprise', label: 'Enterprise Calendly + CRM', price: 179 },
];

const ADDON_FEATURES = [
    { id: 'ai-basic', label: 'Simple AI+ Basic', desc: '100 queries/mo', icon: '🤖', price: 9, monthly: true },
    { id: 'ai-pro', label: 'Simple AI+ Pro', desc: '1,000 queries/mo', icon: '🧠', price: 29, monthly: true },
    { id: 'ai-unlimited', label: 'Simple AI+ Unlimited', desc: 'Unlimited', icon: '⚡', price: 49, monthly: true },
    { id: 'blog', label: 'Blog Infrastructure', desc: 'Automated blog setup', icon: '✍️', price: 79 },
    { id: 'ecommerce', label: 'E-Commerce', desc: 'Sell products online', icon: '🛒', price: 149 },
];

type Step = 'info' | 'colors' | 'hero' | 'layout' | 'trust' | 'integration' | 'pages' | 'addons' | 'preview';

export default function OnboardingFlow() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [step, setStep] = useState<Step>('info');

    const [formData, setFormData] = useState({
        name: '', industry: '', hasWebsite: '', existingUrl: '', goals: '',
    });

    const [palette, setPalette] = useState<string[]>(['#7c3aed', '#06b6d4', '#f43f5e']);
    const [design, setDesign] = useState({
        pages: '1', mode: 'dark', shadows: 'subtle', borders: 'rounded', layout: 'stack', images: 'few', hero: 'basic',
    });
    const [selectedHero, setSelectedHero] = useState(HERO_OPTIONS[0]);
    const [selectedFeature, setSelectedFeature] = useState(FEATURE_OPTIONS[0]);
    const [selectedTrust, setSelectedTrust] = useState(TRUST_OPTIONS[0]);
    const [selectedIntegration, setSelectedIntegration] = useState(INTEGRATION_OPTIONS[0]);
    const [pageCount, setPageCount] = useState(1);
    const [addons, setAddons] = useState<string[]>([]);

    const [chatMessages, setChatMessages] = useState<{ role: string; text: string }[]>([]);
    const [chatInput, setChatInput] = useState('');
    const [showChat, setShowChat] = useState(false);

    const [domain, setDomain] = useState('');

    useEffect(() => { setMounted(true); }, []);

    // Price calculation
    const heroPrice = selectedHero.price;
    const featurePrice = selectedFeature.price;
    const trustPrice = selectedTrust.price;
    const integrationPrice = selectedIntegration.price;
    const pagesPrice = pageCount * 49;
    const addonsPrice = ADDON_FEATURES.filter(a => addons.includes(a.id) && !a.monthly).reduce((sum, a) => sum + a.price, 0);
    const monthlyAddons = ADDON_FEATURES.filter(a => addons.includes(a.id) && a.monthly).reduce((sum, a) => sum + a.price, 0);
    const totalPrice = heroPrice + featurePrice + trustPrice + integrationPrice + pagesPrice + addonsPrice;
    const tier = totalPrice >= 849 ? 'Enterprise' : totalPrice >= 549 ? 'Premium' : totalPrice >= 349 ? 'Business' : totalPrice >= 199 ? 'Professional' : 'Landing Page';

    const features = [...addons];
    if (selectedTrust.id !== 'text-testimonial') features.push('testimonials');
    if (addons.includes('blog')) features.push('blog');
    if (addons.includes('ecommerce')) features.push('ecommerce');

    if (!mounted) return null;
    const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    const steps: Step[] = ['info', 'colors', 'hero', 'layout', 'trust', 'integration', 'pages', 'addons', 'preview'];
    const stepIndex = steps.indexOf(step);
    const canNext = step === 'info' ? !!(formData.name && formData.industry) : true;

    const next = () => {
        if (stepIndex < steps.length - 1) {
            setStep(steps[stepIndex + 1]);
            if (!showChat && stepIndex >= 0) setShowChat(true);
        }
    };
    const back = () => { if (stepIndex > 0) setStep(steps[stepIndex - 1]); };

    const sendChat = async () => {
        if (!chatInput.trim()) return;
        const msg = chatInput.trim();
        setChatMessages(prev => [...prev, { role: 'user', text: msg }]);
        setChatInput('');
        try {
            const res = await fetch('/api/concierge', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: msg, context: { businessName: formData.name, industry: formData.industry, tier, totalPrice } }) });
            const data = await res.json();
            setChatMessages(prev => [...prev, { role: 'ai', text: data.reply || "I'd love to help customize that for you!" }]);
        } catch {
            setChatMessages(prev => [...prev, { role: 'ai', text: "Tell me more about what you're looking for and I'll make it happen." }]);
        }
    };

    const slug = formData.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    const domains = [
        { domain: slug + '.com', available: true, price: 12.99 },
        { domain: slug + '.net', available: true, price: 14.99 },
        { domain: slug + '.io', available: false, price: 49.99 },
    ];

    // render question option card
    const OptionCard = ({ selected, label, price, onClick, desc }: { selected: boolean; label: string; price: number; onClick: () => void; desc?: string }) => (
        <button onClick={onClick} className={`w-full p-3 rounded-xl border text-left transition-all duration-200 ${selected
            ? (isDark ? 'bg-cyan-500/10 border-cyan-500/40 shadow-[0_0_10px_rgba(0,255,255,0.1)]' : 'bg-purple-50 border-purple-400')
            : (isDark ? 'bg-white/[0.02] border-white/10 hover:border-white/20' : 'bg-white/80 border-slate-200 hover:border-slate-300')}`}>
            <div className="flex items-center justify-between">
                <div>
                    <h4 className={`font-bold text-xs ${isDark ? 'text-white' : 'text-slate-900'}`}>{label}</h4>
                    {desc && <p className={`text-[10px] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{desc}</p>}
                </div>
                <span className={`text-xs font-bold ${isDark ? 'text-cyan-400/70' : 'text-purple-500'}`}>${price}</span>
            </div>
        </button>
    );

    return (
        <div className={`w-full min-h-screen flex font-sans transition-colors ${isDark ? 'bg-[#0d0521] text-slate-200' : 'bg-[#FAFAFA] text-slate-900'}`}>
            {/* Background */}
            <div className={`fixed inset-0 z-0 ${isDark ? 'bg-[#0d0521]' : 'bg-[#FAFAFA]'}`}></div>
            <div className={`fixed inset-0 bg-[size:40px_40px] pointer-events-none z-0 ${isDark
                ? 'bg-[linear-gradient(rgba(168,85,247,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.03)_1px,transparent_1px)]'
                : 'bg-[linear-gradient(rgba(168,85,247,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.05)_1px,transparent_1px)]'}`}></div>

            {/* ═══ LEFT PANEL: Questions ═══ */}
            <div className="relative z-10 w-full md:w-[45%] lg:w-[40%] min-h-screen overflow-y-auto p-6 md:p-10 flex flex-col">
                {/* Price badge */}
                <div className="flex items-center justify-between mb-6">
                    <div className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
                        Step {stepIndex + 1} of {steps.length}
                    </div>
                    <div className={`px-4 py-2 rounded-xl font-mono font-bold text-sm ${isDark ? 'bg-white/5 border border-white/10 text-cyan-400' : 'bg-slate-100 border border-slate-200 text-purple-600'}`}>
                        ${totalPrice} <span className={`text-[10px] ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>{tier}</span>
                    </div>
                </div>

                {/* Step content */}
                <div className="flex-1 animate-fade-in">
                    {step === 'info' && (
                        <div className="space-y-4">
                            <h2 className={`text-2xl font-black tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>Let's build your site.</h2>
                            <div>
                                <label className={`block text-[10px] font-bold uppercase tracking-widest mb-2 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Business Name</label>
                                <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className={`w-full bg-transparent border-b-2 py-3 text-lg font-bold focus:outline-none ${isDark ? 'border-purple-800 focus:border-cyan-400 text-white placeholder:text-slate-700' : 'border-purple-200 focus:border-purple-500 text-slate-900 placeholder:text-slate-300'}`}
                                    placeholder="Acme Corp" />
                            </div>
                            <div>
                                <label className={`block text-[10px] font-bold uppercase tracking-widest mb-2 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Industry</label>
                                <input required type="text" value={formData.industry} onChange={e => setFormData({ ...formData, industry: e.target.value })}
                                    className={`w-full bg-transparent border-b-2 py-3 text-lg font-bold focus:outline-none ${isDark ? 'border-purple-800 focus:border-cyan-400 text-white placeholder:text-slate-700' : 'border-purple-200 focus:border-purple-500 text-slate-900 placeholder:text-slate-300'}`}
                                    placeholder="Plumbing" />
                            </div>
                        </div>
                    )}

                    {step === 'colors' && (
                        <ColorPalettePicker onSelect={p => { setPalette(p); next(); }} onColorsChange={c => setPalette(c)} />
                    )}

                    {step === 'hero' && (
                        <div className="space-y-3">
                            <h3 className={`text-lg font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>Choose Your Hero</h3>
                            {HERO_OPTIONS.map(h => (
                                <OptionCard key={h.id} selected={selectedHero.id === h.id} label={h.label} price={h.price} desc={h.desc}
                                    onClick={() => { setSelectedHero(h); setDesign({ ...design, hero: h.id }); }} />
                            ))}
                        </div>
                    )}

                    {step === 'layout' && (
                        <div className="space-y-3">
                            <h3 className={`text-lg font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>Feature Layout</h3>
                            {FEATURE_OPTIONS.map(f => (
                                <OptionCard key={f.id} selected={selectedFeature.id === f.id} label={f.label} price={f.price}
                                    onClick={() => {
                                        setSelectedFeature(f);
                                        const layoutMap: Record<string, string> = { '3point': 'stack', 'icon-grid': 'stack', 'zigzag': 'zigzag', 'hover-cards': 'stack', 'scroll-anim': 'sidebar' };
                                        setDesign({ ...design, layout: layoutMap[f.id] || 'stack' });
                                    }} />
                            ))}
                        </div>
                    )}

                    {step === 'trust' && (
                        <div className="space-y-3">
                            <h3 className={`text-lg font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>Trust & Social Proof</h3>
                            {TRUST_OPTIONS.map(t => (
                                <OptionCard key={t.id} selected={selectedTrust.id === t.id} label={t.label} price={t.price}
                                    onClick={() => setSelectedTrust(t)} />
                            ))}
                        </div>
                    )}

                    {step === 'integration' && (
                        <div className="space-y-3">
                            <h3 className={`text-lg font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>Lead Capture</h3>
                            {INTEGRATION_OPTIONS.map(ig => (
                                <OptionCard key={ig.id} selected={selectedIntegration.id === ig.id} label={ig.label} price={ig.price}
                                    onClick={() => setSelectedIntegration(ig)} />
                            ))}
                        </div>
                    )}

                    {step === 'pages' && (
                        <div className="space-y-3">
                            <h3 className={`text-lg font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>How Many Pages?</h3>
                            <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>$49 per page</p>
                            <div className="flex gap-2">
                                {[1, 3, 4, 5, 6].map(n => (
                                    <button key={n} onClick={() => { setPageCount(n); setDesign({ ...design, pages: String(n) }); }}
                                        className={`flex-1 py-3 rounded-xl border font-bold text-sm transition-all ${pageCount === n
                                            ? (isDark ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400' : 'bg-purple-50 border-purple-400 text-purple-600')
                                            : (isDark ? 'bg-white/[0.02] border-white/10 text-slate-400' : 'bg-white/80 border-slate-200 text-slate-500')}`}>
                                        {n}
                                    </button>
                                ))}
                            </div>
                            <div className="space-y-2 pt-2">
                                <h4 className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Design Options</h4>
                                <div className="grid grid-cols-2 gap-2">
                                    {[['shadows', ['none', 'subtle', 'heavy']], ['borders', ['rounded', 'sharp', 'pill']], ['mode', ['dark', 'light', 'both']]].map(([key, opts]) => (
                                        <div key={key as string}>
                                            <span className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>{key as string}</span>
                                            <div className="flex gap-1 mt-1">
                                                {(opts as string[]).map(o => (
                                                    <button key={o} onClick={() => setDesign({ ...design, [key as string]: o })}
                                                        className={`flex-1 py-1 text-[10px] font-bold rounded-lg border ${design[key as keyof typeof design] === o
                                                            ? (isDark ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' : 'bg-purple-50 border-purple-300 text-purple-600')
                                                            : (isDark ? 'border-white/5 text-slate-600' : 'border-slate-100 text-slate-400')}`}>
                                                        {o}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 'addons' && (
                        <div className="space-y-3">
                            <h3 className={`text-lg font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>Add-Ons</h3>
                            {ADDON_FEATURES.map(a => {
                                const isOn = addons.includes(a.id);
                                // AI tier exclusivity
                                const isAi = a.id.startsWith('ai-');
                                return (
                                    <button key={a.id} onClick={() => {
                                        let next = [...addons];
                                        if (isOn) next = next.filter(x => x !== a.id);
                                        else {
                                            if (isAi) next = next.filter(x => !x.startsWith('ai-'));
                                            next.push(a.id);
                                        }
                                        setAddons(next);
                                    }} className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${isOn
                                        ? (isDark ? 'bg-purple-900/30 border-cyan-500/40' : 'bg-purple-50 border-purple-400')
                                        : (isDark ? 'bg-white/[0.02] border-white/10 hover:border-white/20' : 'bg-white/80 border-slate-200')}`}>
                                        <span className="text-lg">{a.icon}</span>
                                        <div className="flex-1">
                                            <h4 className={`font-bold text-xs ${isDark ? 'text-white' : 'text-slate-900'}`}>{a.label}</h4>
                                            <p className={`text-[10px] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{a.desc}</p>
                                        </div>
                                        <span className={`text-xs font-bold ${isDark ? 'text-cyan-400/70' : 'text-purple-500'}`}>{a.monthly ? `$${a.price}/mo` : `$${a.price}`}</span>
                                        <div className={`w-8 h-5 rounded-full relative ${isOn ? (isDark ? 'bg-cyan-500' : 'bg-purple-500') : (isDark ? 'bg-white/10' : 'bg-slate-300')}`}>
                                            <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${isOn ? 'translate-x-3.5' : 'translate-x-0.5'}`}></div>
                                        </div>
                                    </button>
                                );
                            })}
                            {/* Bundled perks */}
                            <div className={`mt-4 pt-3 space-y-2 ${isDark ? 'border-t border-white/5' : 'border-t border-slate-100'}`}>
                                <span className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>Bundled at higher tiers</span>
                                <div className={`p-2 rounded-xl border flex items-center gap-2 ${totalPrice >= 549 ? (isDark ? 'bg-green-900/10 border-green-500/20' : 'bg-green-50 border-green-200') : (isDark ? 'border-white/5 opacity-40' : 'border-slate-100 opacity-40')}`}>
                                    <span>🎨</span><span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Custom Logo + Compliance</span>
                                    <span className={`ml-auto text-[10px] font-bold ${totalPrice >= 549 ? 'text-green-400' : 'text-slate-500'}`}>{totalPrice >= 549 ? 'Included' : 'Premium'}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 'preview' && (
                        <div className="space-y-4">
                            <h3 className={`text-lg font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>Pick Your Domain</h3>
                            <div className="space-y-2">
                                {domains.map((d, i) => (
                                    <div key={i} className={`flex items-center justify-between p-3 rounded-xl border ${isDark ? 'bg-black/40 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                                        <div>
                                            <span className={`font-bold text-sm ${!d.available ? 'line-through opacity-40' : (isDark ? 'text-cyan-100' : 'text-slate-800')}`}>{d.domain}</span>
                                            {d.available && <span className={`ml-2 text-xs ${isDark ? 'text-green-400' : 'text-green-600'}`}>${d.price}/yr</span>}
                                        </div>
                                        {d.available ? (
                                            <button onClick={() => setDomain(d.domain)} className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${domain === d.domain
                                                ? (isDark ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50' : 'bg-purple-100 text-purple-600 border-purple-400')
                                                : (isDark ? 'bg-white/5 text-slate-400 border-white/10' : 'bg-white text-slate-500 border-slate-200')}`}>
                                                {domain === d.domain ? '✓ Selected' : 'Select'}
                                            </button>
                                        ) : <span className={`text-xs font-bold ${isDark ? 'text-pink-500' : 'text-pink-600'}`}>Taken</span>}
                                    </div>
                                ))}
                            </div>
                            <div className={`p-4 rounded-xl border ${isDark ? 'bg-white/[0.02] border-white/10' : 'bg-white border-slate-200'}`}>
                                <h4 className={`text-sm font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>Price Summary</h4>
                                <div className="space-y-1 text-xs">
                                    <div className="flex justify-between"><span className={isDark ? 'text-slate-400' : 'text-slate-600'}>Hero: {selectedHero.label}</span><span>${selectedHero.price}</span></div>
                                    <div className="flex justify-between"><span className={isDark ? 'text-slate-400' : 'text-slate-600'}>Layout: {selectedFeature.label}</span><span>${selectedFeature.price}</span></div>
                                    <div className="flex justify-between"><span className={isDark ? 'text-slate-400' : 'text-slate-600'}>Trust: {selectedTrust.label}</span><span>${selectedTrust.price}</span></div>
                                    <div className="flex justify-between"><span className={isDark ? 'text-slate-400' : 'text-slate-600'}>Integration: {selectedIntegration.label}</span><span>${selectedIntegration.price}</span></div>
                                    <div className="flex justify-between"><span className={isDark ? 'text-slate-400' : 'text-slate-600'}>{pageCount} Page{pageCount > 1 ? 's' : ''}</span><span>${pagesPrice}</span></div>
                                    {addonsPrice > 0 && <div className="flex justify-between"><span className={isDark ? 'text-slate-400' : 'text-slate-600'}>Add-ons</span><span>${addonsPrice}</span></div>}
                                    <div className={`flex justify-between pt-2 mt-2 font-bold text-sm ${isDark ? 'border-t border-white/10 text-cyan-400' : 'border-t border-slate-200 text-purple-600'}`}>
                                        <span>Total ({tier})</span><span>${totalPrice}</span>
                                    </div>
                                    {monthlyAddons > 0 && <div className={`flex justify-between text-[10px] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}><span>+ Monthly</span><span>${monthlyAddons}/mo + $29/mo hosting</span></div>}
                                </div>
                            </div>
                            <button className={`w-full py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all ${isDark
                                ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-[0_0_25px_rgba(168,85,247,0.3)]'
                                : 'bg-purple-600 text-white shadow-lg'}`}>
                                Build My Website →
                            </button>
                        </div>
                    )}
                </div>

                {/* Nav buttons */}
                {step !== 'preview' && (
                    <div className="flex gap-3 pt-6 mt-auto">
                        {stepIndex > 0 && (
                            <button onClick={back} className={`px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest border ${isDark ? 'border-white/10 text-slate-400 hover:text-white' : 'border-slate-200 text-slate-500 hover:text-slate-900'}`}>← Back</button>
                        )}
                        <button onClick={next} disabled={!canNext}
                            className={`flex-1 py-3 rounded-xl font-bold text-xs uppercase tracking-widest border transition-all ${canNext
                                ? (isDark ? 'bg-purple-900/60 border-purple-500/40 text-white hover:border-cyan-400' : 'bg-purple-600 border-purple-500 text-white')
                                : 'opacity-30 cursor-not-allowed border-white/5 text-slate-600'}`}>
                            Next →
                        </button>
                    </div>
                )}
            </div>

            {/* ═══ RIGHT PANEL: Preview ═══ */}
            <div className="hidden md:flex relative z-10 flex-1 flex-col p-6 md:p-10 sticky top-0 h-screen overflow-y-auto">
                <div className={`text-[10px] font-bold uppercase tracking-widest mb-4 ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>Live Preview</div>

                <LiveMockup businessName={formData.name} palette={palette} design={design} features={features} />

                {/* Simple AI Chat */}
                {showChat && (
                    <div className={`mt-4 rounded-xl border flex flex-col ${isDark ? 'bg-black/40 border-white/10' : 'bg-white border-slate-200'}`} style={{ maxHeight: '220px' }}>
                        <div className="px-3 py-2 flex items-center gap-2" style={{ borderBottom: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid #e2e8f0' }}>
                            <span className="text-xs">🤖</span>
                            <span className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? 'text-cyan-400' : 'text-purple-600'}`}>Simple AI</span>
                        </div>
                        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2" style={{ minHeight: '80px' }}>
                            {chatMessages.length === 0 && (
                                <p className={`text-xs italic ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>Tell me what else you want — I'll customize your site.</p>
                            )}
                            {chatMessages.map((m, i) => (
                                <div key={i} className={`text-xs p-2 rounded-lg max-w-[85%] ${m.role === 'user'
                                    ? `ml-auto ${isDark ? 'bg-purple-900/40 text-white' : 'bg-purple-100 text-purple-900'}`
                                    : `${isDark ? 'bg-white/5 text-slate-300' : 'bg-slate-50 text-slate-700'}`}`}>
                                    {m.text}
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-1 p-2" style={{ borderTop: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid #e2e8f0' }}>
                            <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendChat()}
                                placeholder="Type here..."
                                className={`flex-1 px-3 py-2 rounded-lg text-xs focus:outline-none ${isDark ? 'bg-white/5 text-white border border-white/10' : 'bg-slate-50 text-slate-900 border border-slate-200'}`} />
                            <button onClick={sendChat} className={`px-3 py-2 rounded-lg text-xs font-bold ${isDark ? 'bg-cyan-500/20 text-cyan-400' : 'bg-purple-100 text-purple-600'}`}>Send</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
