'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import ColorPalettePicker from './ColorPalettePicker';
import LiveMockup from './LiveMockup';

/* ── Component pricing from STRIPE_PRICE_LIST.md ──────────────── */
const HERO_OPTIONS = [
    { id: 'basic', label: 'Simple Hero', desc: 'H1 + Subtitle + CTA — clean and effective', price: 49, tier: 1 },
    { id: 'split', label: 'Split-Screen Hero', desc: 'Your business image beside a strong headline', price: 89, tier: 2 },
    { id: 'floating-form', label: 'Dynamic Hero + Lead Form', desc: 'Captures leads right from the hero', price: 129, tier: 3 },
    { id: 'video', label: 'Video Background Hero', desc: 'High-impact video behind your message', price: 179, tier: 4 },
    { id: '3d', label: 'Premium 3D Dashboard', desc: 'Highest visual impact — floating mockup', price: 249, tier: 5 },
];

const FEATURE_OPTIONS = [
    { id: '3point', label: '3-Point Highlights', desc: 'Quick "Why Choose Us" section', price: 39 },
    { id: 'icon-grid', label: '2-Column Icon Grid', desc: '4 value propositions with icons', price: 59 },
    { id: 'zigzag', label: 'Zig-Zag Layout', desc: 'Alternating text/image rows', price: 79 },
    { id: 'hover-cards', label: 'Interactive Hover Cards', desc: 'Pain-point mapping from your data', price: 99 },
    { id: 'scroll-anim', label: 'Scroll Animations + Timeline', desc: 'Complex interactive scrolling', price: 139 },
];

const TRUST_OPTIONS = [
    { id: 'text-testimonial', label: 'Text Testimonial', desc: 'Simple quote block', price: 29 },
    { id: 'review-slider', label: '3-Column Review Slider', desc: 'Rotating customer reviews', price: 49 },
    { id: 'client-success', label: 'Client Success + Logos', desc: 'Case studies with brand logos', price: 69 },
    { id: 'masonry-grid', label: 'Masonry Review Grid', desc: '3-column visual review layout', price: 79 },
    { id: 'video-trust', label: 'Video + Trust Badges', desc: 'Video testimonials with state badges', price: 99 },
];

const INTEGRATION_OPTIONS = [
    { id: 'basic-form', label: 'Basic Lead Form', desc: 'Routes to your email', price: 39 },
    { id: 'crm-form', label: 'CRM / Email Integration', desc: 'Connects to your CRM', price: 79 },
    { id: 'calendar', label: 'Lead Capture + Calendar', desc: 'Booking system built-in', price: 119 },
    { id: 'enterprise', label: 'Enterprise Calendly + CRM', desc: 'Full booking + CRM webhook', price: 179 },
];

type Step = 'info' | 'colors' | 'hero' | 'layout' | 'trust' | 'integration' | 'pages' | 'summary';

export default function OnboardingFlow() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [step, setStep] = useState<Step>('info');

    const [formData, setFormData] = useState({ name: '', industry: '' });
    const [palette, setPalette] = useState<string[]>(['#7c3aed', '#06b6d4', '#f43f5e']);
    const [design, setDesign] = useState({
        pages: '1', mode: 'dark', shadows: 'subtle', borders: 'rounded', layout: 'stack', images: 'few', hero: 'basic',
    });
    const [selectedHero, setSelectedHero] = useState(HERO_OPTIONS[0]);
    const [selectedFeature, setSelectedFeature] = useState(FEATURE_OPTIONS[0]);
    const [selectedTrust, setSelectedTrust] = useState(TRUST_OPTIONS[0]);
    const [selectedIntegration, setSelectedIntegration] = useState(INTEGRATION_OPTIONS[0]);
    const [pageCount, setPageCount] = useState(1);

    const [chatMessages, setChatMessages] = useState<{ role: string; text: string }[]>([]);
    const [chatInput, setChatInput] = useState('');
    const [showChat, setShowChat] = useState(false);
    const [domain, setDomain] = useState('');

    useEffect(() => { setMounted(true); }, []);

    // ── Price & Tier Calculation ──
    const totalPrice = selectedHero.price + selectedFeature.price + selectedTrust.price + selectedIntegration.price + (pageCount * 49);
    const tier = totalPrice >= 849 ? 'Enterprise' : totalPrice >= 549 ? 'Premium' : totalPrice >= 349 ? 'Business' : totalPrice >= 199 ? 'Professional' : 'Landing Page';

    // Bundled features by tier
    const includesBlog = tier === 'Enterprise';
    const includesEcom = tier === 'Premium' || tier === 'Enterprise';
    const includesLogo = tier === 'Premium' || tier === 'Enterprise';
    const includesAIPlus = tier === 'Business' || tier === 'Premium' || tier === 'Enterprise';

    const features = [] as string[];
    if (selectedTrust.id !== 'text-testimonial') features.push('testimonials');
    if (includesBlog) features.push('blog');
    if (includesEcom) features.push('ecommerce');

    if (!mounted) return null;
    const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    const steps: Step[] = ['info', 'colors', 'hero', 'layout', 'trust', 'integration', 'pages', 'summary'];
    const stepIndex = steps.indexOf(step);
    const canNext = step === 'info' ? !!(formData.name && formData.industry) : true;

    const next = () => { if (stepIndex < steps.length - 1) { setStep(steps[stepIndex + 1]); if (!showChat && stepIndex >= 0) setShowChat(true); } };
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

    // ── Step labels for progress bar ──
    const stepLabels = ['Info', 'Colors', 'Hero', 'Layout', 'Trust', 'Leads', 'Pages', 'Done'];

    // ── Glassmorphic OptionCard ──
    const OptionCard = ({ selected, label, price, onClick, desc }: { selected: boolean; label: string; price: number; onClick: () => void; desc?: string }) => (
        <button onClick={onClick} className={`w-full p-4 rounded-2xl border text-left transition-all duration-300 backdrop-blur-sm group
            ${selected
                ? 'bg-gradient-to-r from-purple-500/10 via-cyan-500/5 to-transparent border-cyan-500/40 shadow-[0_0_25px_rgba(6,182,212,0.12)]'
                : 'bg-white/[0.02] border-white/[0.06] hover:border-white/15 hover:bg-white/[0.04] hover:scale-[1.01]'
            }`}>
            <div className="flex items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        {selected && <div className="w-4 h-4 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center shrink-0">
                            <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                        </div>}
                        <h4 className={`font-bold text-sm ${selected ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>{label}</h4>
                    </div>
                    {desc && <p className="text-[11px] text-slate-500 mt-0.5 ml-6">{desc}</p>}
                </div>
                <span className={`text-sm font-black tracking-tight shrink-0 ${selected ? 'text-cyan-400' : 'text-slate-600'}`}>${price}</span>
            </div>
        </button>
    );

    return (
        <div className="w-full min-h-screen flex font-sans bg-[#0d0521] text-slate-200 relative overflow-hidden">
            {/* ═══ Ambient Glows ═══ */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-15%] left-[15%] w-[50vw] h-[50vw] rounded-full blur-[120px] mix-blend-screen bg-purple-600/15 animate-[pulse_8s_ease-in-out_infinite]" />
                <div className="absolute top-[40%] right-[10%] w-[40vw] h-[40vw] rounded-full blur-[100px] mix-blend-screen bg-cyan-500/8 animate-[pulse_6s_ease-in-out_infinite]" />
                <div className="absolute bottom-[-10%] left-[30%] w-[45vw] h-[45vw] rounded-full blur-[110px] mix-blend-screen bg-purple-500/10 animate-[pulse_7s_ease-in-out_infinite]" />
            </div>
            {/* Grid */}
            <div className="fixed inset-0 bg-[size:40px_40px] pointer-events-none z-0 bg-[linear-gradient(rgba(168,85,247,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.03)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)]" />

            {/* ═══ LEFT PANEL ═══ */}
            <div className="relative z-10 w-full md:w-[45%] lg:w-[42%] min-h-screen overflow-y-auto p-6 md:p-10 flex flex-col">

                {/* ── Progress Bar ── */}
                <div className="mb-8">
                    <div className="flex items-center gap-1 mb-2">
                        {stepLabels.map((label, i) => (
                            <div key={label} className="flex-1 flex flex-col items-center gap-1">
                                <div className={`w-full h-1 rounded-full transition-all duration-500 ${i < stepIndex ? 'bg-gradient-to-r from-purple-500 to-cyan-400'
                                        : i === stepIndex ? 'bg-gradient-to-r from-purple-500 to-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.4)]'
                                            : 'bg-white/[0.06]'
                                    }`} />
                                <span className={`text-[8px] font-bold uppercase tracking-widest transition-colors ${i <= stepIndex ? 'text-cyan-400/80' : 'text-slate-700'
                                    }`}>{label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Price Badge ── */}
                <div className="flex items-center justify-between mb-6">
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">
                        Step {stepIndex + 1} of {steps.length}
                    </div>
                    <div className="px-5 py-2.5 rounded-2xl font-mono backdrop-blur-xl bg-white/[0.04] border border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
                        <span className="text-lg font-black text-cyan-400">${totalPrice}</span>
                        <span className="text-[10px] font-bold text-slate-500 ml-2 uppercase tracking-widest">{tier}</span>
                    </div>
                </div>

                {/* ═══ Step Content ═══ */}
                <div className="flex-1">

                    {step === 'info' && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-3xl font-black tracking-tighter text-white">Let's build your site.</h2>
                                <p className="text-sm text-slate-500 mt-1">Tell us about your business and we'll design the perfect website.</p>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-purple-400/80 mb-2">Business Name</label>
                                <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-transparent border-b-2 border-purple-800/50 focus:border-cyan-400 py-3 text-xl font-bold text-white placeholder:text-slate-700 focus:outline-none transition-colors"
                                    placeholder="Acme Corp" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-purple-400/80 mb-2">Industry</label>
                                <input required type="text" value={formData.industry} onChange={e => setFormData({ ...formData, industry: e.target.value })}
                                    className="w-full bg-transparent border-b-2 border-purple-800/50 focus:border-cyan-400 py-3 text-xl font-bold text-white placeholder:text-slate-700 focus:outline-none transition-colors"
                                    placeholder="Plumbing" />
                            </div>
                        </div>
                    )}

                    {step === 'colors' && (
                        <ColorPalettePicker onSelect={p => { setPalette(p); next(); }} onColorsChange={c => setPalette(c)} />
                    )}

                    {step === 'hero' && (
                        <div className="space-y-3">
                            <div className="mb-4">
                                <h3 className="text-xl font-black tracking-tight text-white">Choose Your Hero</h3>
                                <p className="text-xs text-slate-500 mt-0.5">The first thing visitors see — make it count.</p>
                            </div>
                            {HERO_OPTIONS.map(h => (
                                <OptionCard key={h.id} selected={selectedHero.id === h.id} label={h.label} price={h.price} desc={h.desc}
                                    onClick={() => { setSelectedHero(h); setDesign({ ...design, hero: h.id }); }} />
                            ))}
                        </div>
                    )}

                    {step === 'layout' && (
                        <div className="space-y-3">
                            <div className="mb-4">
                                <h3 className="text-xl font-black tracking-tight text-white">Feature Layout</h3>
                                <p className="text-xs text-slate-500 mt-0.5">How your services and value props are displayed.</p>
                            </div>
                            {FEATURE_OPTIONS.map(f => (
                                <OptionCard key={f.id} selected={selectedFeature.id === f.id} label={f.label} price={f.price} desc={f.desc}
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
                            <div className="mb-4">
                                <h3 className="text-xl font-black tracking-tight text-white">Trust & Social Proof</h3>
                                <p className="text-xs text-slate-500 mt-0.5">Build credibility with reviews and testimonials.</p>
                            </div>
                            {TRUST_OPTIONS.map(t => (
                                <OptionCard key={t.id} selected={selectedTrust.id === t.id} label={t.label} price={t.price} desc={t.desc}
                                    onClick={() => setSelectedTrust(t)} />
                            ))}
                        </div>
                    )}

                    {step === 'integration' && (
                        <div className="space-y-3">
                            <div className="mb-4">
                                <h3 className="text-xl font-black tracking-tight text-white">Lead Capture</h3>
                                <p className="text-xs text-slate-500 mt-0.5">How visitors become customers.</p>
                            </div>
                            {INTEGRATION_OPTIONS.map(ig => (
                                <OptionCard key={ig.id} selected={selectedIntegration.id === ig.id} label={ig.label} price={ig.price} desc={ig.desc}
                                    onClick={() => setSelectedIntegration(ig)} />
                            ))}
                        </div>
                    )}

                    {step === 'pages' && (
                        <div className="space-y-5">
                            <div className="mb-2">
                                <h3 className="text-xl font-black tracking-tight text-white">Pages & Design</h3>
                                <p className="text-xs text-slate-500 mt-0.5">$49 per page — choose your count and style.</p>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-purple-400/80 mb-2">Page Count</label>
                                <div className="flex gap-2">
                                    {[1, 3, 4, 5, 6].map(n => (
                                        <button key={n} onClick={() => { setPageCount(n); setDesign({ ...design, pages: String(n) }); }}
                                            className={`flex-1 py-3 rounded-xl border font-bold text-sm transition-all duration-300 ${pageCount === n
                                                ? 'bg-gradient-to-r from-purple-500/15 to-cyan-500/10 border-cyan-500/40 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                                                : 'bg-white/[0.02] border-white/[0.06] text-slate-500 hover:border-white/15 hover:text-slate-300'}`}>
                                            {n}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                {([['shadows', ['none', 'subtle', 'heavy']], ['borders', ['rounded', 'sharp', 'pill']], ['mode', ['dark', 'light', 'both']]] as [string, string[]][]).map(([key, opts]) => (
                                    <div key={key}>
                                        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-600">{key}</span>
                                        <div className="flex flex-col gap-1 mt-1.5">
                                            {opts.map(o => (
                                                <button key={o} onClick={() => setDesign({ ...design, [key]: o })}
                                                    className={`py-1.5 text-[10px] font-bold rounded-lg border transition-all ${design[key as keyof typeof design] === o
                                                        ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                                                        : 'border-white/[0.04] text-slate-600 hover:text-slate-400'}`}>
                                                    {o}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Bundled Features Indicators */}
                            <div className="pt-3 border-t border-white/[0.04] space-y-2">
                                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-600">Included In Your Tier</span>
                                {[
                                    { label: 'Simple AI+ Concierge', included: includesAIPlus, tier: 'Business+' },
                                    { label: 'E-Commerce Ready', included: includesEcom, tier: 'Premium+' },
                                    { label: 'Blog Infrastructure', included: includesBlog, tier: 'Enterprise' },
                                    { label: 'Custom Logo + Compliance', included: includesLogo, tier: 'Premium+' },
                                ].map(item => (
                                    <div key={item.label} className={`flex items-center gap-2 p-2.5 rounded-xl border transition-all ${item.included
                                            ? 'bg-emerald-500/[0.06] border-emerald-500/20'
                                            : 'border-white/[0.04] opacity-35'}`}>
                                        <span className={`text-xs ${item.included ? 'text-emerald-400' : 'text-slate-600'}`}>{item.included ? '✓' : '○'}</span>
                                        <span className={`text-xs font-bold ${item.included ? 'text-white' : 'text-slate-600'}`}>{item.label}</span>
                                        <span className={`ml-auto text-[9px] font-bold ${item.included ? 'text-emerald-400' : 'text-slate-700'}`}>
                                            {item.included ? 'Included' : item.tier}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 'summary' && (
                        <div className="space-y-5">
                            <div>
                                <h3 className="text-xl font-black tracking-tight text-white">Pick Your Domain</h3>
                                <p className="text-xs text-slate-500 mt-0.5">Choose a domain and review your build.</p>
                            </div>
                            <div className="space-y-2">
                                {domains.map((d, i) => (
                                    <div key={i} className={`flex items-center justify-between p-3 rounded-xl border backdrop-blur-sm ${domain === d.domain ? 'bg-cyan-500/[0.06] border-cyan-500/30' : 'bg-white/[0.02] border-white/[0.06]'}`}>
                                        <div>
                                            <span className={`font-bold text-sm ${!d.available ? 'line-through opacity-40' : 'text-white'}`}>{d.domain}</span>
                                            {d.available && <span className="ml-2 text-xs text-emerald-400">${d.price}/yr</span>}
                                        </div>
                                        {d.available ? (
                                            <button onClick={() => setDomain(d.domain)} className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${domain === d.domain
                                                ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50'
                                                : 'bg-white/[0.03] text-slate-400 border-white/10 hover:border-white/20'}`}>
                                                {domain === d.domain ? '✓ Selected' : 'Select'}
                                            </button>
                                        ) : <span className="text-xs font-bold text-pink-500">Taken</span>}
                                    </div>
                                ))}
                            </div>

                            {/* Price Summary */}
                            <div className="p-5 rounded-2xl border bg-white/[0.02] border-white/[0.06] backdrop-blur-sm">
                                <h4 className="text-sm font-bold text-white mb-3">Price Summary</h4>
                                <div className="space-y-1.5 text-xs">
                                    <div className="flex justify-between"><span className="text-slate-400">Hero: {selectedHero.label}</span><span className="text-slate-300">${selectedHero.price}</span></div>
                                    <div className="flex justify-between"><span className="text-slate-400">Layout: {selectedFeature.label}</span><span className="text-slate-300">${selectedFeature.price}</span></div>
                                    <div className="flex justify-between"><span className="text-slate-400">Trust: {selectedTrust.label}</span><span className="text-slate-300">${selectedTrust.price}</span></div>
                                    <div className="flex justify-between"><span className="text-slate-400">Integration: {selectedIntegration.label}</span><span className="text-slate-300">${selectedIntegration.price}</span></div>
                                    <div className="flex justify-between"><span className="text-slate-400">{pageCount} Page{pageCount > 1 ? 's' : ''}</span><span className="text-slate-300">${pageCount * 49}</span></div>
                                    <div className="flex justify-between pt-3 mt-3 border-t border-white/10 font-bold text-base">
                                        <span className="text-white">Total <span className="text-cyan-400">({tier})</span></span>
                                        <span className="text-cyan-400 font-black">${totalPrice}</span>
                                    </div>
                                    <div className="flex justify-between text-[10px] text-slate-600">
                                        <span>+ Monthly</span><span>$29/mo hosting & Simple AI+</span>
                                    </div>
                                </div>
                            </div>

                            {/* Bundled features summary */}
                            {(includesAIPlus || includesEcom || includesBlog) && (
                                <div className="flex flex-wrap gap-1.5">
                                    {includesAIPlus && <span className="px-3 py-1 text-[10px] font-bold rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">🤖 Simple AI+ Included</span>}
                                    {includesEcom && <span className="px-3 py-1 text-[10px] font-bold rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">🛒 E-Commerce Ready</span>}
                                    {includesBlog && <span className="px-3 py-1 text-[10px] font-bold rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">✍️ Blog Included</span>}
                                    {includesLogo && <span className="px-3 py-1 text-[10px] font-bold rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">🎨 Custom Logo</span>}
                                </div>
                            )}

                            <button className="w-full py-4 rounded-2xl font-bold text-sm uppercase tracking-[0.15em] transition-all bg-gradient-to-r from-purple-600 via-purple-500 to-cyan-500 text-white shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:shadow-[0_0_45px_rgba(168,85,247,0.45)] hover:scale-[1.01] active:scale-[0.99]">
                                Build My Website →
                            </button>
                        </div>
                    )}
                </div>

                {/* ── Nav Buttons ── */}
                {step !== 'summary' && (
                    <div className="flex gap-3 pt-6 mt-auto">
                        {stepIndex > 0 && (
                            <button onClick={back} className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-[0.15em] border border-white/[0.06] text-slate-500 hover:text-white hover:border-white/15 transition-all">
                                ← Back
                            </button>
                        )}
                        <button onClick={next} disabled={!canNext}
                            className={`flex-1 py-3.5 rounded-xl font-bold text-xs uppercase tracking-[0.15em] transition-all duration-300 ${canNext
                                ? 'bg-gradient-to-r from-purple-600/80 to-purple-700/80 border border-purple-500/30 text-white hover:border-cyan-400/40 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] active:scale-[0.99]'
                                : 'opacity-20 cursor-not-allowed bg-white/[0.02] border border-white/[0.04] text-slate-700'}`}>
                            Next →
                        </button>
                    </div>
                )}
            </div>

            {/* ═══ RIGHT PANEL: Browser Preview + Chat ═══ */}
            <div className="hidden md:flex relative z-10 flex-1 flex-col p-6 md:p-10 sticky top-0 h-screen overflow-y-auto">
                <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-600 mb-4">Live Preview</div>

                <LiveMockup businessName={formData.name} palette={palette} design={design} features={features} tier={tier} />

                {/* ── Simple AI Chat ── */}
                {showChat && (
                    <div className="mt-4 rounded-2xl border border-white/[0.06] backdrop-blur-xl bg-white/[0.02] flex flex-col shadow-[0_8px_30px_rgba(0,0,0,0.2)]" style={{ maxHeight: '220px' }}>
                        <div className="px-4 py-2.5 flex items-center gap-2 border-b border-white/[0.04]">
                            <span className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-[8px]">🤖</span>
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">Simple AI</span>
                        </div>
                        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2" style={{ minHeight: '80px' }}>
                            {chatMessages.length === 0 && (
                                <p className="text-xs italic text-slate-600">Tell me what else you want — I'll customize your site.</p>
                            )}
                            {chatMessages.map((m, i) => (
                                <div key={i} className={`text-xs p-2.5 rounded-xl max-w-[85%] ${m.role === 'user'
                                    ? 'ml-auto bg-purple-900/40 text-white border border-purple-500/10'
                                    : 'bg-white/[0.03] text-slate-300 border border-white/[0.04]'}`}>
                                    {m.text}
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-2 p-3 border-t border-white/[0.04]">
                            <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendChat()}
                                placeholder="Type here..."
                                className="flex-1 px-3 py-2 rounded-lg text-xs bg-white/[0.03] text-white border border-white/[0.06] placeholder:text-slate-700 focus:outline-none focus:border-cyan-500/30" />
                            <button onClick={sendChat} className="px-4 py-2 rounded-lg text-xs font-bold bg-gradient-to-r from-purple-600/30 to-cyan-500/20 text-cyan-400 border border-cyan-500/20 hover:border-cyan-400/40 transition-all">
                                Send
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
