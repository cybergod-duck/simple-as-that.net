'use client';

import { useTheme } from 'next-themes';

type MockupProps = {
    businessName: string;
    palette: string[];
    design: {
        pages: string;
        mode: string;
        shadows: string;
        borders: string;
        layout: string;
        images: string;
        hero: string;
    };
    features: string[];
};

export default function LiveMockup({ businessName, palette, design, features }: MockupProps) {
    const { theme } = useTheme();

    const bg = palette[0] || '#0d0521';
    const text = palette[1] || '#ffffff';
    const accent = palette[2] || '#06b6d4';
    const secondary = palette[3] || palette[0] || '#1a0a3e';
    const surface = palette[4] || palette[0] || '#130833';
    const muted = palette[5] || '#666666';

    const borderRadius = design.borders === 'pill' ? '9999px' : design.borders === 'sharp' ? '0px' : '16px';
    const cardRadius = design.borders === 'pill' ? '24px' : design.borders === 'sharp' ? '4px' : '12px';
    const shadow = design.shadows === 'heavy' ? `0 12px 40px ${accent}25` : design.shadows === 'subtle' ? `0 4px 15px rgba(0,0,0,0.15)` : 'none';
    const cardShadow = design.shadows === 'heavy' ? `0 8px 25px ${accent}15` : design.shadows === 'subtle' ? '0 2px 10px rgba(0,0,0,0.1)' : 'none';

    const navItems = design.pages === '1' ? ['Home'] : design.pages === '3' ? ['Home', 'About', 'Contact'] : design.pages === '5' ? ['Home', 'About', 'Services', 'Trust', 'Contact'] : ['Home', 'About', 'Services', 'Trust', 'Contact', 'Blog'];

    const name = businessName || 'Your Business';

    return (
        <div className="rounded-2xl overflow-hidden text-left transition-all duration-500" style={{ backgroundColor: bg, boxShadow: shadow, border: `1px solid ${accent}15` }}>

            {/* Nav bar */}
            <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: `1px solid ${accent}10` }}>
                <span className="font-black text-xs" style={{ color: text }}>{name}</span>
                <div className="flex gap-2">
                    {navItems.map(n => (
                        <span key={n} className="text-[8px] font-bold uppercase tracking-widest" style={{ color: text, opacity: 0.35 }}>{n}</span>
                    ))}
                </div>
            </div>

            {/* Hero section - varies by hero type */}
            <div className="relative p-5" style={{ minHeight: '100px' }}>
                {design.hero === 'video' && (
                    <div className="absolute inset-0 opacity-20" style={{ background: `linear-gradient(135deg, ${accent}40, ${secondary}40)` }} />
                )}
                {design.hero === '3d' && (
                    <div className="absolute right-4 top-4 w-20 h-16 rounded-lg opacity-60" style={{ backgroundColor: accent + '20', border: `1px solid ${accent}30`, transform: 'perspective(300px) rotateY(-15deg)' }} />
                )}
                <div className={`relative ${design.layout === 'split' ? 'flex gap-4 items-center' : ''}`}>
                    <div className="flex-1">
                        <h3 className="text-base font-black leading-tight mb-1" style={{ color: text }}>{name}</h3>
                        <p className="text-[9px] mb-3 leading-relaxed" style={{ color: text, opacity: 0.45 }}>We deliver exceptional service tailored to your needs.</p>
                        {(design.hero === 'floating-form' || design.hero === '3d') && (
                            <div className="flex gap-1 mb-2">
                                <div className="flex-1 h-5 rounded text-[7px] px-2 flex items-center" style={{ backgroundColor: surface + '60', border: `1px solid ${accent}15`, color: muted }}>your@email.com</div>
                                <div className="px-3 h-5 rounded text-[7px] font-bold flex items-center" style={{ backgroundColor: accent, color: bg, borderRadius }}>Go</div>
                            </div>
                        )}
                        <div className="inline-block px-3 py-1.5 text-[8px] font-bold" style={{ backgroundColor: accent, color: bg, borderRadius, boxShadow: cardShadow }}>Get Started</div>
                    </div>
                    {design.layout === 'split' && (
                        <div className="w-24 h-16 rounded-lg" style={{ backgroundColor: accent + '15', border: `1px solid ${accent}20` }}>
                            <div className="w-full h-full flex items-center justify-center text-[8px] font-bold" style={{ color: accent, opacity: 0.5 }}>📷</div>
                        </div>
                    )}
                </div>
            </div>

            {/* Feature section - varies by layout */}
            <div className="px-4 pb-3">
                {design.layout === 'zigzag' ? (
                    <div className="space-y-2">
                        {[0, 1].map(i => (
                            <div key={i} className={`flex gap-2 items-center ${i % 2 ? 'flex-row-reverse' : ''}`}>
                                <div className="w-12 h-8 rounded" style={{ backgroundColor: accent + '12', borderRadius: cardRadius }}></div>
                                <div className="flex-1 space-y-1">
                                    <div className="h-1.5 w-16 rounded" style={{ backgroundColor: text, opacity: 0.2 }}></div>
                                    <div className="h-1 w-20 rounded" style={{ backgroundColor: text, opacity: 0.1 }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : design.layout === 'sidebar' ? (
                    <div className="flex gap-2">
                        <div className="w-14 space-y-1">
                            {['Dash', 'Info', 'Blog'].map(s => (
                                <div key={s} className="px-2 py-1 text-[7px] font-bold" style={{ backgroundColor: surface + '30', color: text, opacity: 0.4, borderRadius: cardRadius }}>{s}</div>
                            ))}
                        </div>
                        <div className="flex-1 grid grid-cols-2 gap-1">
                            {[accent, secondary, muted, accent].map((c, i) => (
                                <div key={i} className="p-2 rounded" style={{ backgroundColor: c + '12', borderRadius: cardRadius, boxShadow: cardShadow }}>
                                    <div className="h-1 w-8 rounded mb-1" style={{ backgroundColor: text, opacity: 0.15 }}></div>
                                    <div className="h-1 w-12 rounded" style={{ backgroundColor: text, opacity: 0.08 }}></div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-3 gap-1.5">
                        {['⚡', '🎯', '✨'].map((icon, i) => (
                            <div key={i} className="p-2 text-center" style={{ backgroundColor: surface + '20', borderRadius: cardRadius, boxShadow: cardShadow }}>
                                <span className="text-xs">{icon}</span>
                                <div className="h-1 w-8 mx-auto rounded mt-1" style={{ backgroundColor: text, opacity: 0.15 }}></div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Feature badges */}
            {features.length > 0 && (
                <div className="px-4 pb-3 flex flex-wrap gap-1">
                    {features.filter(f => !['contact', 'seo'].includes(f)).slice(0, 4).map(f => (
                        <span key={f} className="px-2 py-0.5 text-[7px] font-bold rounded-full" style={{ backgroundColor: accent + '15', color: accent, border: `1px solid ${accent}20` }}>
                            {f === 'blog' ? '✍️ Blog' : f === 'booking' ? '📅 Book' : f === 'ecommerce' ? '🛒 Shop' : f === 'testimonials' ? '⭐ Reviews' : f.includes('ai') ? '🤖 AI' : f}
                        </span>
                    ))}
                </div>
            )}

            {/* Footer */}
            <div className="px-4 py-2 text-center" style={{ borderTop: `1px solid ${accent}08` }}>
                <span className="text-[7px] font-bold" style={{ color: text, opacity: 0.15 }}>© 2026 {name}</span>
            </div>
        </div>
    );
}
