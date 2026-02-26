'use client';

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
    tier: string;
};

export default function LiveMockup({ businessName, palette, design, features, tier }: MockupProps) {
    const primary = palette[0] || '#7c3aed';
    const accent = palette[1] || '#06b6d4';
    const pop = palette[2] || '#f43f5e';

    const bg = design.mode === 'light' ? '#ffffff' : '#0a0118';
    const surface = design.mode === 'light' ? '#f8fafc' : '#110827';
    const text = design.mode === 'light' ? '#0f172a' : '#f1f5f9';
    const muted = design.mode === 'light' ? '#64748b' : '#64748b';
    const border = design.mode === 'light' ? '#e2e8f0' : 'rgba(255,255,255,0.06)';

    const br = design.borders === 'pill' ? '20px' : design.borders === 'sharp' ? '4px' : '12px';
    const cardBr = design.borders === 'pill' ? '16px' : design.borders === 'sharp' ? '2px' : '8px';
    const shadow = design.shadows === 'heavy'
        ? `0 20px 60px ${primary}20, 0 4px 20px rgba(0,0,0,0.3)`
        : design.shadows === 'subtle' ? '0 4px 20px rgba(0,0,0,0.15)' : 'none';

    const name = businessName || 'Your Business';
    const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '') || 'yourbusiness';
    const navItems = design.pages === '1' ? ['Home'] : design.pages === '3' ? ['Home', 'About', 'Contact'] : design.pages === '5' ? ['Home', 'About', 'Services', 'Trust', 'Contact'] : ['Home', 'About', 'Services', 'Trust', 'Contact', 'Blog'];

    const showBlog = features.includes('blog') || tier === 'Enterprise';
    const showEcom = features.includes('ecommerce') || tier === 'Premium' || tier === 'Enterprise';
    const showTestimonials = features.includes('testimonials') || ['Business', 'Premium', 'Enterprise'].includes(tier);

    return (
        <div className="relative group flex-1 flex flex-col">
            {/* Glow behind browser */}
            <div className="absolute -inset-4 rounded-3xl opacity-40 blur-2xl transition-all duration-700"
                style={{ background: `radial-gradient(ellipse at center, ${primary}30, ${accent}15, transparent 70%)` }} />

            {/* Browser Chrome Frame */}
            <div className="relative rounded-xl overflow-hidden flex flex-col flex-1" style={{
                boxShadow: `0 25px 80px rgba(0,0,0,0.5), 0 0 40px ${primary}10, inset 0 1px 0 rgba(255,255,255,0.05)`,
                border: '1px solid rgba(255,255,255,0.08)',
            }}>
                {/* Title Bar */}
                <div className="flex items-center px-3 py-2 gap-2" style={{
                    background: 'linear-gradient(180deg, #2a2a2e 0%, #1e1e22 100%)',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                }}>
                    {/* Traffic lights */}
                    <div className="flex gap-1.5 shrink-0">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] shadow-[inset_0_-1px_1px_rgba(0,0,0,0.2)]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e] shadow-[inset_0_-1px_1px_rgba(0,0,0,0.2)]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#28c840] shadow-[inset_0_-1px_1px_rgba(0,0,0,0.2)]" />
                    </div>
                    {/* URL Bar */}
                    <div className="flex-1 flex items-center justify-center px-3 py-1 rounded-md mx-8" style={{
                        background: 'rgba(0,0,0,0.3)',
                        border: '1px solid rgba(255,255,255,0.06)',
                    }}>
                        <span className="text-[9px] font-mono text-slate-500 select-none">
                            <span className="text-green-400/60">🔒</span> https://{slug}.com
                        </span>
                    </div>
                </div>

                {/* ═══ Website Content ═══ */}
                <div className="flex-1 overflow-hidden transition-colors duration-500" style={{ backgroundColor: bg }}>

                    {/* Navbar */}
                    <div className="flex items-center justify-between px-4 py-2" style={{ borderBottom: `1px solid ${border}` }}>
                        <span className="font-black text-[10px] tracking-tight" style={{ color: primary }}>{name}</span>
                        <div className="flex gap-3">
                            {navItems.map(n => (
                                <span key={n} className="text-[7px] font-semibold uppercase tracking-widest" style={{ color: muted }}>{n}</span>
                            ))}
                        </div>
                    </div>

                    {/* Hero Section */}
                    <div className="relative px-4 py-5" style={{
                        background: design.hero === 'video' || design.hero === '3d'
                            ? `linear-gradient(135deg, ${primary}15, ${accent}10, ${bg})`
                            : 'transparent',
                    }}>
                        {design.hero === '3d' && (
                            <div className="absolute right-4 top-3 w-20 h-14 rounded-lg opacity-50"
                                style={{
                                    backgroundColor: primary + '15',
                                    border: `1px solid ${primary}25`,
                                    transform: 'perspective(400px) rotateY(-12deg) rotateX(5deg)',
                                    boxShadow: `0 8px 30px ${primary}15`,
                                }} />
                        )}
                        <div className={`relative ${design.layout === 'split' ? 'flex gap-4 items-center' : ''}`}>
                            <div className="flex-1">
                                <div className="text-[6px] uppercase font-bold tracking-[0.3em] mb-1.5" style={{ color: accent }}>{name}</div>
                                <h3 className="text-sm font-black leading-tight mb-1.5" style={{ color: text }}>
                                    Welcome to{' '}
                                    <span style={{
                                        background: `linear-gradient(135deg, ${primary}, ${accent})`,
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                    }}>{name}</span>
                                </h3>
                                <p className="text-[7px] mb-3 leading-relaxed max-w-[70%]" style={{ color: muted }}>
                                    We deliver exceptional service tailored to your needs. Get started today.
                                </p>
                                {(design.hero === 'floating-form' || design.hero === '3d') && (
                                    <div className="flex gap-1 mb-2 max-w-[200px]">
                                        <div className="flex-1 h-4 rounded text-[6px] px-2 flex items-center" style={{ backgroundColor: surface, border: `1px solid ${border}`, color: muted }}>your@email.com</div>
                                        <div className="px-2 h-4 rounded text-[6px] font-bold flex items-center" style={{ backgroundColor: primary, color: '#fff', borderRadius: cardBr }}>Go</div>
                                    </div>
                                )}
                                <div className="inline-flex gap-1.5">
                                    <div className="px-2.5 py-1 text-[7px] font-bold" style={{ backgroundColor: primary, color: '#fff', borderRadius: cardBr, boxShadow: `0 2px 10px ${primary}40` }}>Get Started</div>
                                    <div className="px-2.5 py-1 text-[7px] font-bold" style={{ color: muted, border: `1px solid ${border}`, borderRadius: cardBr }}>Learn More</div>
                                </div>
                            </div>
                            {design.layout === 'split' && (
                                <div className="w-20 h-14 rounded-lg overflow-hidden" style={{ backgroundColor: surface, border: `1px solid ${border}` }}>
                                    <div className="w-full h-full flex items-center justify-center text-[8px]" style={{ color: muted }}>📷</div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Features Section */}
                    <div className="px-4 py-3" style={{ backgroundColor: surface }}>
                        <div className="text-[6px] uppercase font-bold tracking-[0.3em] mb-2 text-center" style={{ color: accent }}>Why Choose Us</div>
                        {design.layout === 'zigzag' ? (
                            <div className="space-y-1.5">
                                {[0, 1].map(i => (
                                    <div key={i} className={`flex gap-2 items-center ${i % 2 ? 'flex-row-reverse' : ''}`}>
                                        <div className="w-10 h-7 rounded" style={{ backgroundColor: primary + '10', border: `1px solid ${primary}15`, borderRadius: cardBr }} />
                                        <div className="flex-1 space-y-0.5">
                                            <div className="h-1 w-12 rounded-full" style={{ backgroundColor: text, opacity: 0.2 }} />
                                            <div className="h-0.5 w-16 rounded-full" style={{ backgroundColor: text, opacity: 0.08 }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-3 gap-1.5">
                                {['⚡', '🎯', '✨'].map((icon, i) => (
                                    <div key={i} className="p-2 text-center" style={{
                                        backgroundColor: bg,
                                        borderRadius: cardBr,
                                        border: `1px solid ${border}`,
                                        boxShadow: design.shadows !== 'none' ? `0 2px 8px rgba(0,0,0,0.08)` : 'none',
                                    }}>
                                        <span className="text-[10px]">{icon}</span>
                                        <div className="h-0.5 w-6 mx-auto rounded-full mt-1" style={{ backgroundColor: primary, opacity: 0.4 }} />
                                        <div className="h-0.5 w-8 mx-auto rounded-full mt-0.5" style={{ backgroundColor: text, opacity: 0.08 }} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Testimonials */}
                    {showTestimonials && (
                        <div className="px-4 py-2.5">
                            <div className="text-[6px] uppercase font-bold tracking-[0.3em] mb-1.5 text-center" style={{ color: accent }}>What Clients Say</div>
                            <div className="flex gap-1.5">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="flex-1 p-1.5" style={{ backgroundColor: surface, borderRadius: cardBr, border: `1px solid ${border}` }}>
                                        <div className="text-[7px] mb-0.5" style={{ color: '#fbbf24' }}>★★★★★</div>
                                        <div className="h-0.5 w-full rounded-full mb-0.5" style={{ backgroundColor: text, opacity: 0.08 }} />
                                        <div className="h-0.5 w-3/4 rounded-full" style={{ backgroundColor: text, opacity: 0.05 }} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Feature Badges */}
                    {(showBlog || showEcom) && (
                        <div className="px-4 py-1.5 flex gap-1 justify-center">
                            {showBlog && <span className="px-1.5 py-0.5 text-[6px] font-bold rounded-full" style={{ backgroundColor: accent + '15', color: accent, border: `1px solid ${accent}20` }}>✍️ Blog</span>}
                            {showEcom && <span className="px-1.5 py-0.5 text-[6px] font-bold rounded-full" style={{ backgroundColor: primary + '15', color: primary, border: `1px solid ${primary}20` }}>🛒 Shop</span>}
                        </div>
                    )}

                    {/* Footer */}
                    <div className="px-4 py-2 mt-auto" style={{ borderTop: `1px solid ${border}` }}>
                        <div className="flex items-center justify-between">
                            <span className="text-[6px] font-bold" style={{ color: muted }}>© 2026 {name}</span>
                            <div className="flex gap-2">
                                {navItems.slice(0, 3).map(n => (
                                    <span key={n} className="text-[6px]" style={{ color: muted }}>{n}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
