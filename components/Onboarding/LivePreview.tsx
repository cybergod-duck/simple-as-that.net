'use client';

import { useState } from 'react';
import { useTheme } from 'next-themes';

type PreviewProps = {
    businessName: string;
    palette: string[];
    design: { pages: string; mode: string; shadows: string; borders: string; layout: string; images: string };
    features: string[];
    totalPrice: number;
    onComplete: (domain: string) => void;
};

function MockupCard({ businessName, palette, design, features, shadow, borderRadius, cardRadius, variant }: any) {
    const bg = palette[0] || '#0d0521';
    const text = palette[1] || '#ffffff';
    const accent = palette[2] || '#06b6d4';
    const secondary = palette[3] || palette[0] || '#1a0a3e';

    const navItems = variant === 0 ? ['Home', 'About', 'Contact'] : variant === 1 ? ['Home', 'Services', 'Portfolio', 'Contact'] : ['Home', 'Shop', 'Blog', 'About'];

    return (
        <div className="rounded-2xl overflow-hidden border" style={{ backgroundColor: bg, borderColor: accent + '25', boxShadow: shadow }}>
            {/* Nav */}
            <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: `1px solid ${accent}15` }}>
                <span className="font-black text-sm" style={{ color: text }}>{businessName}</span>
                <div className="flex gap-3">
                    {navItems.map((item: string) => (
                        <span key={item} className="text-[10px] font-bold uppercase tracking-widest" style={{ color: text, opacity: 0.4 }}>{item}</span>
                    ))}
                </div>
            </div>

            {/* Hero */}
            <div className={`p-6 ${design.layout === 'sidebar' ? 'flex gap-5' : ''}`}>
                {design.layout === 'sidebar' && (
                    <div className="w-28 shrink-0 space-y-2">
                        {['Dashboard', 'Services', 'Blog'].map(item => (
                            <div key={item} className="px-3 py-1.5 text-[10px] font-bold" style={{ backgroundColor: secondary + '40', color: text, opacity: 0.6, borderRadius: cardRadius }}>{item}</div>
                        ))}
                    </div>
                )}
                <div className="flex-1 space-y-4">
                    <h3 className="text-xl font-black" style={{ color: text }}>Welcome to {businessName}</h3>
                    <p className="text-xs leading-relaxed" style={{ color: text, opacity: 0.5 }}>We deliver exceptional service tailored to your needs.</p>
                    <button style={{ backgroundColor: accent, color: bg, borderRadius, boxShadow: shadow !== 'none' ? '0 4px 12px ' + accent + '30' : 'none' }} className="px-5 py-2 font-bold text-xs">
                        Get Started
                    </button>
                </div>
            </div>

            {/* Feature cards */}
            <div className="px-6 pb-5 grid grid-cols-3 gap-2">
                {features.includes('testimonials') && (
                    <div className="p-3" style={{ backgroundColor: secondary + '25', borderRadius: cardRadius }}><span className="text-sm">⭐</span><p className="text-[10px] mt-1 font-bold" style={{ color: text }}>Reviews</p></div>
                )}
                {features.includes('blog') && (
                    <div className="p-3" style={{ backgroundColor: secondary + '25', borderRadius: cardRadius }}><span className="text-sm">✍️</span><p className="text-[10px] mt-1 font-bold" style={{ color: text }}>Blog</p></div>
                )}
                {features.includes('booking') && (
                    <div className="p-3" style={{ backgroundColor: secondary + '25', borderRadius: cardRadius }}><span className="text-sm">📅</span><p className="text-[10px] mt-1 font-bold" style={{ color: text }}>Book</p></div>
                )}
                {features.includes('ecommerce') && (
                    <div className="p-3" style={{ backgroundColor: secondary + '25', borderRadius: cardRadius }}><span className="text-sm">🛒</span><p className="text-[10px] mt-1 font-bold" style={{ color: text }}>Shop</p></div>
                )}
                <div className="p-3" style={{ backgroundColor: secondary + '25', borderRadius: cardRadius }}><span className="text-sm">📬</span><p className="text-[10px] mt-1 font-bold" style={{ color: text }}>Contact</p></div>
            </div>

            {/* AI bubble */}
            {(features.includes('ai-basic') || features.includes('ai-pro') || features.includes('ai-unlimited')) && (
                <div className="flex justify-end px-5 pb-4">
                    <div className="px-3 py-2 rounded-xl text-[10px] font-bold" style={{ backgroundColor: accent, color: bg }}>🤖 AI Assistant</div>
                </div>
            )}

            {/* Footer */}
            <div className="px-5 py-2 text-center" style={{ borderTop: `1px solid ${accent}10` }}>
                <span className="text-[9px] font-bold" style={{ color: text, opacity: 0.2 }}>© 2026 {businessName}</span>
            </div>
        </div>
    );
}

export default function LivePreview({ businessName, palette, design, features, totalPrice, onComplete }: PreviewProps) {
    const { theme } = useTheme();
    const [selected, setSelected] = useState<number | null>(null);
    const [domainInput, setDomainInput] = useState('');

    const isDark = theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    const borderRadius = design.borders === 'pill' ? '9999px' : design.borders === 'sharp' ? '0px' : '16px';
    const cardRadius = design.borders === 'pill' ? '24px' : design.borders === 'sharp' ? '4px' : '16px';
    const shadow = design.shadows === 'heavy' ? '0 20px 60px rgba(0,0,0,0.4)' : design.shadows === 'subtle' ? '0 4px 20px rgba(0,0,0,0.15)' : 'none';

    const tier = totalPrice >= 999 ? 'Elite' : totalPrice >= 499 ? 'Pro' : totalPrice >= 199 ? 'Starter' : 'Landing';

    // Simulated domains
    const slug = businessName.toLowerCase().replace(/[^a-z0-9]/g, '');
    const domains = [
        { domain: slug + '.com', available: true, price: 12.99 },
        { domain: slug + '.net', available: true, price: 14.99 },
        { domain: slug + '.io', available: false, price: 49.99 },
    ];

    // Not yet selected — show 3 options
    if (selected === null) {
        return (
            <div className="animate-fade-in space-y-8 w-full max-w-5xl mx-auto">
                <div className="text-center">
                    <h2 className={`text-4xl md:text-5xl font-black tracking-tighter mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>Pick Your Style.</h2>
                    <p className={`text-lg font-light tracking-wide ${isDark ? 'text-purple-200/60' : 'text-slate-500'}`}>
                        3 variations of your site. Pick one, or we'll regenerate.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {[0, 1, 2].map((variant) => (
                        <button key={variant} onClick={() => setSelected(variant)} className={`text-left transition-all duration-300 hover:-translate-y-2 rounded-3xl border p-3 ${isDark
                            ? 'border-purple-500/20 hover:border-cyan-400/50 hover:shadow-[0_0_40px_rgba(0,255,255,0.15)] bg-white/[0.02]'
                            : 'border-purple-200 hover:border-cyan-400 hover:shadow-xl bg-white/50'}`}>
                            <MockupCard businessName={businessName} palette={palette} design={design} features={features} shadow={shadow} borderRadius={borderRadius} cardRadius={cardRadius} variant={variant} />
                            <p className={`text-center mt-3 text-xs font-bold uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Option {variant + 1}</p>
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    // Selected — split view: template left, pricing + domain right
    return (
        <div className="animate-fade-in w-full max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-start">
                {/* Left: Selected mockup */}
                <div className="animate-[slideInLeft_0.5s_ease-out]">
                    <MockupCard businessName={businessName} palette={palette} design={design} features={features} shadow={shadow} borderRadius={borderRadius} cardRadius={cardRadius} variant={selected} />
                    <button onClick={() => setSelected(null)} className={`mt-4 text-xs font-bold uppercase tracking-widest ${isDark ? 'text-slate-500 hover:text-cyan-400' : 'text-slate-400 hover:text-purple-600'}`}>
                        ← Pick a different style
                    </button>
                </div>

                {/* Right: Price + Domain */}
                <div className="animate-[slideInRight_0.5s_ease-out] space-y-8">
                    {/* Price Summary */}
                    <div className={`p-8 rounded-3xl border backdrop-blur-md ${isDark
                        ? 'bg-white/[0.03] border-purple-500/20 shadow-[0_0_30px_rgba(168,85,247,0.1)]'
                        : 'bg-white/80 border-purple-200 shadow-lg'}`}>
                        <div className="flex items-baseline justify-between mb-6">
                            <div>
                                <span className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-purple-400' : 'text-purple-500'}`}>Your Plan</span>
                                <h3 className={`text-3xl font-black tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>{tier}</h3>
                            </div>
                            <div className="text-right">
                                <span className={`text-4xl font-black ${isDark ? 'text-cyan-400' : 'text-purple-600'}`}>${totalPrice}</span>
                                <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>+ $29/mo hosting</p>
                            </div>
                        </div>
                        <div className={`h-px w-full mb-4 ${isDark ? 'bg-white/10' : 'bg-slate-200'}`}></div>
                        <div className="space-y-1">
                            {features.filter(f => !['contact', 'seo'].includes(f)).map(f => (
                                <div key={f} className="flex items-center gap-2">
                                    <span className={`text-xs ${isDark ? 'text-cyan-400' : 'text-green-500'}`}>✓</span>
                                    <span className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{f.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Domain Selector */}
                    <div className={`p-8 rounded-3xl border backdrop-blur-md ${isDark
                        ? 'bg-white/[0.03] border-cyan-500/20 shadow-[0_0_30px_rgba(0,255,255,0.08)]'
                        : 'bg-white/80 border-cyan-200 shadow-lg'}`}>
                        <h4 className={`text-lg font-black tracking-tight mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>Pick Your Domain</h4>
                        <div className="space-y-3 mb-6">
                            {domains.map((d, i) => (
                                <div key={i} className={`flex items-center justify-between p-3 rounded-xl border ${isDark ? 'bg-black/40 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                                    <div>
                                        <span className={`font-bold text-sm ${!d.available ? 'line-through opacity-40' : (isDark ? 'text-cyan-100' : 'text-slate-800')}`}>{d.domain}</span>
                                        {d.available && <span className={`ml-2 text-xs ${isDark ? 'text-green-400' : 'text-green-600'}`}>${d.price}/yr</span>}
                                    </div>
                                    {d.available ? (
                                        <button onClick={() => onComplete(d.domain)} className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border transition-colors ${isDark
                                            ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/20'
                                            : 'bg-purple-50 text-purple-600 border-purple-300 hover:bg-purple-100'}`}>Select</button>
                                    ) : (
                                        <span className={`text-xs font-bold ${isDark ? 'text-pink-500' : 'text-pink-600'}`}>Taken</span>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className={`h-px w-full mb-4 ${isDark ? 'bg-white/10' : 'bg-slate-200'}`}></div>

                        <div className="flex gap-2">
                            <input type="text" value={domainInput} onChange={(e) => setDomainInput(e.target.value)} placeholder="yourdomain.com"
                                className={`flex-1 px-4 py-3 rounded-xl border text-sm focus:outline-none ${isDark
                                    ? 'bg-black/40 border-white/10 text-white focus:ring-1 focus:ring-cyan-400/50'
                                    : 'bg-white border-slate-200 text-slate-900 focus:ring-2 focus:ring-purple-300'}`} />
                            <button onClick={() => onComplete(domainInput || 'custom-mapped')} className={`px-5 rounded-xl font-bold text-sm border transition-colors ${isDark
                                ? 'bg-white/10 text-white border-white/10 hover:bg-white/20'
                                : 'bg-slate-900 text-white border-transparent hover:bg-slate-800'}`}>Map</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
