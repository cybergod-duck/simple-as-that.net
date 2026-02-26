'use client';

import { useState, useEffect, useRef } from 'react';
import LiveMockup from './LiveMockup';

/* ═══ 5 TIERS — fixed bundle prices, questions customize within each tier ═══
   Tier 1 Landing Page  $79  = Basic Hero + 3-Point + Simple Trust + Basic Form + 1 Page
   Tier 2 Professional  $199 = Split Hero + Icon Grid + Review Slider + Contact Page + 3 Pages
   Tier 3 Business       $349 = Dynamic Hero + Zig-Zag + Client Success + CRM Form + 3 Pages + AI+
   Tier 4 Premium        $549 = Video Hero + Hover Cards + Masonry Grid + Calendar + 4 Pages + AI+
   Tier 5 Enterprise     $849 = 3D Hero + Scroll Anims + Video Trust + Enterprise CRM + Logo + Blog + 6 Pages + AI+
═══════════════════════════════════════════════════════════════════════════════ */

const TIERS = [
    {
        name: 'Landing Page', price: 79, monthly: 0,
        desc: 'A clean, professional one-page site',
        includes: ['Basic Hero ($49)', '3-Point Highlights ($39)', 'Text Testimonial ($29)', 'Basic Lead Form ($39)', '1 Page ($49)'],
        questions: [
            { id: 't1-hero', q: 'What tone for your headline?', options: ['Professional & corporate', 'Warm & friendly', 'Bold & energetic', 'Minimal & clean'] },
            { id: 't1-features', q: 'What 3 things make you stand out?', options: ['Speed, Quality, Trust', 'Local, Licensed, Affordable', 'Let me type my own'] },
            { id: 't1-trust', q: 'Got a customer quote we can feature?', options: ['Yes, I\'ll provide one', 'Use a placeholder for now', 'Skip testimonials'] },
            { id: 't1-cta', q: 'What should your call-to-action say?', options: ['Get a Free Quote', 'Book Now', 'Call Us Today', 'Learn More'] },
        ],
    },
    {
        name: 'Professional', price: 199, monthly: 0,
        desc: 'Multi-page site with upgraded visuals',
        includes: ['Split-Screen Hero ($89)', 'Icon Grid ($59)', 'Review Slider ($49)', 'Contact Page ($39)', '3 Pages ($147)'],
        questions: [
            { id: 't2-hero', q: 'Want a split-screen hero with an industry image?', options: ['Yes — show my industry', 'Photo of my team/work', 'Abstract/geometric pattern'] },
            { id: 't2-grid', q: 'What 4 services should the icon grid showcase?', options: ['Auto-generate from my industry', 'I\'ll list them', 'Use common ones for now'] },
            { id: 't2-reviews', q: 'How many reviews for the slider?', options: ['3 rotating reviews', '5+ reviews with ratings', 'Google review embed'] },
            { id: 't2-pages', q: 'What pages do you want?', options: ['Home, About, Contact', 'Home, Services, Contact', 'Home, About, Services, Contact'] },
        ],
    },
    {
        name: 'Business', price: 349, monthly: 29,
        desc: 'Lead generation powerhouse + Simple AI+',
        includes: ['Dynamic Hero + Form ($129)', 'Zig-Zag Layout ($79)', 'Client Success + Logos ($69)', 'CRM Integration ($79)', '3 Pages ($147)', '★ Simple AI+ ($29/mo)'],
        questions: [
            { id: 't3-form', q: 'What should the hero form collect?', options: ['Name + Email + Phone', 'Name + Email + Message', 'Just Email (simple opt-in)', 'Full quote request'] },
            { id: 't3-layout', q: 'How should the zig-zag sections look?', options: ['Image left, text right (alternating)', 'With icon accents', 'With background color blocks'] },
            { id: 't3-logos', q: 'Do you have client logos to feature?', options: ['Yes, I\'ll upload them', 'Use placeholder logos', 'Show reviews instead of logos'] },
            { id: 't3-crm', q: 'Where should leads go?', options: ['My email inbox', 'HubSpot / Salesforce', 'Google Sheets', 'Custom webhook'] },
        ],
    },
    {
        name: 'Premium', price: 549, monthly: 29,
        desc: 'High-impact site with booking system',
        includes: ['Video Background Hero ($179)', 'Hover Cards ($99)', 'Masonry Review Grid ($79)', 'Calendar Booking ($119)', '4 Pages ($196)', '★ Simple AI+ ($29/mo)'],
        questions: [
            { id: 't4-video', q: 'What kind of video hero?', options: ['Industry-specific stock video', 'I\'ll provide my own video', 'Animated gradient (no video)'] },
            { id: 't4-cards', q: 'What should the hover cards show?', options: ['Services with pricing', 'Pain points from my industry', 'Before & after results', 'FAQs'] },
            { id: 't4-reviews', q: 'For the masonry review grid …', options: ['Real reviews — I\'ll provide', 'Pull from Google', 'Placeholder reviews'] },
            { id: 't4-booking', q: 'Booking system preference?', options: ['Calendly embed', 'Built-in date picker', 'Link to external booking'] },
        ],
    },
    {
        name: 'Enterprise', price: 849, monthly: 29,
        desc: 'Full business suite — everything included',
        includes: ['3D Dashboard Hero ($249)', 'Scroll Animations ($139)', 'Video Trust + Badges ($99)', 'Enterprise CRM ($179)', 'Logo + Compliance ($129)', 'Blog ($79)', '6 Pages ($294)', '★ Simple AI+ ($29/mo)'],
        questions: [
            { id: 't5-hero', q: 'For the 3D floating dashboard …', options: ['Floating mockup of my site', 'Stats/metrics dashboard', 'Product showcase 3D'] },
            { id: 't5-anims', q: 'Scroll animation style?', options: ['Timeline of services', 'Parallax storytelling', 'Data-driven reveals'] },
            { id: 't5-trust', q: 'Video testimonials …', options: ['I\'ll provide videos', 'Auto-generate from reviews', 'Placeholder for now'] },
            { id: 't5-blog', q: 'What kind of blog?', options: ['Industry news & tips', 'Case studies', 'SEO-focused articles', 'All of the above'] },
        ],
    },
];



type Phase = 'splash' | 'name' | 'colors' | 'images' | 'questions' | 'preview' | 'checkout';
type ChatMsg = {
    role: 'ai' | 'user';
    text: string;
    stringOptions?: string[];
    colorPicker?: boolean;
    decision?: boolean;
};

export default function OnboardingFlow() {
    const [mounted, setMounted] = useState(false);
    const [phase, setPhase] = useState<Phase>('splash');
    const [businessName, setBusinessName] = useState('');
    const [colors, setColors] = useState<string[]>([]);
    const [imageDescs, setImageDescs] = useState<string[]>([]);
    const [imgInput, setImgInput] = useState('');

    const [currentTier, setCurrentTier] = useState(0);
    const [currentQ, setCurrentQ] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});

    const [chat, setChat] = useState<ChatMsg[]>([]);
    const [progress, setProgress] = useState(0);
    const [showPrice, setShowPrice] = useState(false);
    const [checkoutSlide, setCheckoutSlide] = useState(false);
    const [selectedDomain, setSelectedDomain] = useState('');

    const chatEndRef = useRef<HTMLDivElement>(null);
    const nameInputRef = useRef<HTMLInputElement>(null);
    const wheelRef = useRef<HTMLDivElement>(null);

    useEffect(() => { setMounted(true); }, []);
    useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [chat]);

    const addMsg = (role: 'ai' | 'user', text: string, extra?: Partial<ChatMsg>) => {
        setChat(prev => [...prev, { role, text, ...extra }]);
    };

    if (!mounted) return null;

    const slug = businessName.toLowerCase().replace(/[^a-z0-9]/g, '') || 'mybusiness';
    const tier = TIERS[currentTier];
    const totalQuestions = TIERS.slice(0, currentTier + 1).reduce((s, t) => s + t.questions.length, 0);
    const answeredCount = Object.keys(answers).length;

    // ── Flow handlers ──
    const handleBegin = () => {
        setPhase('name');
        addMsg('ai', "Hey! I'm Simple AI — I'll build your website in minutes. 🚀");
        setTimeout(() => addMsg('ai', "First, what's your business name?"), 500);
        setTimeout(() => nameInputRef.current?.focus(), 600);
    };

    const handleNameSubmit = () => {
        if (!businessName.trim()) return;
        addMsg('user', businessName);
        setPhase('colors');
        setTimeout(() => {
            addMsg('ai', `Great name — "${businessName}" ✨ Now pick 4 colors for your brand:`, { colorPicker: true });
        }, 400);
    };

    /* ── Color wheel click handler ── */
    const hslToHex = (h: number, s: number, l: number): string => {
        const a = s * Math.min(l, 1 - l);
        const f = (n: number) => {
            const k = (n + h / 30) % 12;
            const c = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
            return Math.round(255 * c).toString(16).padStart(2, '0');
        };
        return `#${f(0)}${f(8)}${f(4)}`;
    };

    const handleWheelClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (colors.length >= 4) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const dist = Math.sqrt(x * x + y * y);
        const radius = rect.width / 2;
        if (dist > radius) return;
        const angle = (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
        const saturation = 0.7 + (dist / radius) * 0.3;
        const hex = hslToHex(angle, saturation, 0.55);
        const next = [...colors, hex];
        setColors(next);
        if (next.length === 4) {
            addMsg('user', `Selected 4 colors`);
            setPhase('images');
            setTimeout(() => {
                addMsg('ai', "Those look 🔥 Describe up to 4 images for your site — or type \"skip\".");
            }, 500);
        }
    };

    const handleImageAdd = () => {
        const desc = imgInput.trim();
        if (!desc) return;
        setImgInput('');
        if (desc.toLowerCase() === 'skip' || desc.toLowerCase() === 'done') {
            addMsg('user', imageDescs.length > 0 ? `${imageDescs.length} image(s)` : 'Skipping images');
            startTierQuestions(0);
            return;
        }
        const next = [...imageDescs, desc];
        setImageDescs(next);
        addMsg('user', desc);
        if (next.length >= 4) {
            startTierQuestions(0);
        } else {
            setTimeout(() => addMsg('ai', `Got it! ${4 - next.length} more, or type "done".`), 300);
        }
    };

    const startTierQuestions = (tierIdx: number) => {
        setPhase('questions');
        setCurrentTier(tierIdx);
        setCurrentQ(0);
        setShowPrice(false);
        const t = TIERS[tierIdx];
        setTimeout(() => {
            if (tierIdx === 0) {
                addMsg('ai', `Let's build your ${t.name} site...`);
            } else {
                addMsg('ai', `Upgrading to ${t.name}! Let me ask a few more things...`);
            }
            setTimeout(() => {
                addMsg('ai', t.questions[0].q, { stringOptions: t.questions[0].options });
            }, 600);
        }, 400);
    };

    const handleAnswer = (answer: string) => {
        const t = TIERS[currentTier];
        const q = t.questions[currentQ];
        addMsg('user', answer);
        setAnswers(prev => ({ ...prev, [q.id]: answer }));

        const nextQ = currentQ + 1;
        const pct = Math.round(((answeredCount + 1) / (totalQuestions)) * 100);
        setProgress(Math.min(pct, 100));

        if (nextQ < t.questions.length) {
            setCurrentQ(nextQ);
            setTimeout(() => {
                addMsg('ai', t.questions[nextQ].q, { stringOptions: t.questions[nextQ].options });
            }, 500);
        } else {
            setPhase('preview');
            setShowPrice(true);
            setTimeout(() => {
                addMsg('ai', `Your ${t.name} site is ready! Take a look above 👆`);
                if (currentTier < 4) {
                    setTimeout(() => {
                        const nextTier = TIERS[currentTier + 1];
                        addMsg('ai', `This is your $${t.price} ${t.name} package. Want to upgrade to ${nextTier.name} ($${nextTier.price}) with more features?`, {
                            decision: true,
                            stringOptions: ['Looks good! ✨', `Upgrade to ${nextTier.name}`],
                        });
                    }, 800);
                } else {
                    setTimeout(() => {
                        addMsg('ai', `This is the full Enterprise package — $${t.price}. Everything included. Ready?`, {
                            decision: true,
                            stringOptions: ['Looks good! ✨'],
                        });
                    }, 800);
                }
            }, 600);
        }
    };

    const handleDecision = (choice: string) => {
        addMsg('user', choice);
        if (choice.includes('Looks good')) {
            setTimeout(() => {
                addMsg('ai', "Let's lock in your domain and finalize! 🎯");
                setCheckoutSlide(true);
                setTimeout(() => setPhase('checkout'), 600);
            }, 400);
        } else {
            startTierQuestions(currentTier + 1);
        }
    };

    const domains = [
        { domain: slug + '.com', available: true, price: 12.99 },
        { domain: slug + '.net', available: true, price: 14.99 },
        { domain: slug + '.co', available: true, price: 29.99 },
    ];

    // ── Design for LiveMockup ──
    const design = {
        pages: currentTier >= 4 ? '6' : currentTier >= 3 ? '4' : currentTier >= 1 ? '3' : '1',
        mode: 'dark',
        shadows: currentTier >= 3 ? 'heavy' : 'subtle',
        borders: 'rounded',
        layout: currentTier >= 2 ? 'zigzag' : 'stack',
        images: 'few',
        hero: currentTier >= 4 ? '3d' : currentTier >= 3 ? 'video' : currentTier >= 2 ? 'floating-form' : currentTier >= 1 ? 'split' : 'basic',
    };
    const features: string[] = [];
    if (currentTier >= 1) features.push('testimonials');
    if (currentTier >= 4) features.push('blog', 'ecommerce');

    return (
        <div className="w-full min-h-screen bg-[#0d0521] text-white font-sans relative overflow-y-auto overflow-x-hidden scrollbar-hide">
            {/* Ambient Glows */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[10%] w-[60vw] h-[60vw] rounded-full blur-[150px] bg-purple-600/10 animate-[pulse_8s_ease-in-out_infinite]" />
                <div className="absolute top-[30%] right-[5%] w-[45vw] h-[45vw] rounded-full blur-[120px] bg-cyan-500/8 animate-[pulse_6s_ease-in-out_infinite]" />
                <div className="absolute bottom-[-15%] left-[25%] w-[50vw] h-[50vw] rounded-full blur-[130px] bg-purple-500/8 animate-[pulse_7s_ease-in-out_infinite]" />
            </div>
            <div className="fixed inset-0 bg-[size:40px_40px] pointer-events-none z-0 bg-[linear-gradient(rgba(168,85,247,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.025)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)]" />

            <div className="relative z-10 flex flex-col items-center min-h-screen">

                {/* ═══ SPLASH ═══ */}
                {phase === 'splash' && (
                    <div className="flex-1 flex flex-col items-center justify-center gap-8 px-6">
                        <div className="relative cursor-pointer group" onClick={handleBegin}>
                            <div className="absolute -inset-3 rounded-2xl blur-xl opacity-60 animate-[pulse_3s_ease-in-out_infinite] bg-gradient-to-r from-purple-600/40 via-cyan-500/30 to-pink-500/40" />
                            <div className="absolute -inset-6 rounded-3xl blur-2xl opacity-30 animate-[pulse_4s_ease-in-out_infinite_0.5s] bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-amber-400/20" />
                            <div className="relative w-[700px] max-w-[90vw] h-[400px] bg-black rounded-2xl border border-white/[0.06] flex items-center justify-center overflow-hidden shadow-2xl group-hover:border-white/15 transition-all duration-500 group-hover:scale-[1.01]">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-cyan-900/10" />
                                <div className="text-center relative z-10">
                                    <div className="text-3xl font-black tracking-tighter bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite]">
                                        Click Begin
                                    </div>
                                    <p className="text-sm text-slate-600 mt-2">Your website starts here</p>
                                </div>
                            </div>
                        </div>
                        <button onClick={handleBegin} className="relative group">
                            <div className="absolute -inset-2 rounded-full blur-lg opacity-50 animate-[pulse_2.5s_ease-in-out_infinite] bg-gradient-to-r from-purple-500/40 to-cyan-400/40" />
                            <div className="relative flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-purple-600/80 to-cyan-500/80 border border-white/10 shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:shadow-[0_0_50px_rgba(168,85,247,0.5)] transition-all group-hover:scale-105">
                                <img src="/favicon_io/android-chrome-192x192.png" alt="Simple AI" className="w-7 h-7 rounded-full object-cover" />
                                <span className="font-black text-lg tracking-tight">Begin</span>
                            </div>
                        </button>
                    </div>
                )}

                {/* ═══ ACTIVE ═══ */}
                {phase !== 'splash' && (
                    <div className={`flex-1 w-full flex transition-all duration-700 ${phase === 'checkout' ? 'flex-row' : 'flex-col items-center'} px-6 pt-16 pb-8`}>

                        {/* ── PREVIEW ── */}
                        <div className={`relative transition-all duration-700 ease-out ${phase === 'checkout' ? 'w-1/2 pl-[5%]' : 'w-full max-w-[750px]'}`}>
                            <div className="relative">
                                <div className="absolute -inset-8 rounded-3xl blur-3xl opacity-70 transition-all duration-700 animate-[colorShift_6s_ease-in-out_infinite]"
                                    style={{
                                        background: colors.length >= 4
                                            ? `radial-gradient(ellipse at center, ${colors[0]}50, ${colors[1]}40, ${colors[2]}30, transparent 70%)`
                                            : 'radial-gradient(ellipse at center, rgba(168,85,247,0.4), rgba(6,182,212,0.3), rgba(244,63,94,0.2), transparent 70%)'
                                    }} />

                                {phase === 'questions' ? (
                                    /* PROGRESS BAR MODE */
                                    <div className="relative rounded-2xl overflow-hidden border border-white/[0.06] shadow-2xl" style={{ aspectRatio: '16/9' }}>
                                        <div className="flex items-center px-3 py-2 gap-2 bg-gradient-to-b from-[#2a2a2e] to-[#1e1e22] border-b border-white/[0.04]">
                                            <div className="flex gap-1.5">
                                                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                                                <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                                                <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                                            </div>
                                            <div className="flex-1 flex items-center justify-center px-3 py-1 rounded-md mx-8 bg-black/30 border border-white/[0.06]">
                                                <span className="text-[9px] font-mono text-slate-500"><span className="text-green-400/60">🔒</span> https://{slug}.com</span>
                                            </div>
                                        </div>
                                        <div className="bg-black flex flex-col items-center justify-center p-10" style={{ minHeight: '340px' }}>
                                            <div className="text-xl font-black tracking-tighter text-white/30 mb-1">{businessName}</div>
                                            <div className="text-[10px] text-slate-600 mb-6 uppercase tracking-[0.3em]">Building your {tier.name}...</div>
                                            <div className="w-72 h-2.5 rounded-full bg-white/[0.04] overflow-hidden">
                                                <div className="h-full rounded-full transition-all duration-1000 ease-out"
                                                    style={{
                                                        width: `${progress}%`,
                                                        background: colors.length >= 4
                                                            ? `linear-gradient(90deg, ${colors[0]}, ${colors[1]}, ${colors[2]}, ${colors[3]})`
                                                            : 'linear-gradient(90deg, #7c3aed, #06b6d4, #f43f5e)',
                                                        boxShadow: colors.length >= 4
                                                            ? `0 0 20px ${colors[0]}60, 0 0 40px ${colors[1]}30`
                                                            : '0 0 20px rgba(124,58,237,0.5), 0 0 40px rgba(6,182,212,0.3)',
                                                    }} />
                                            </div>
                                            <div className="text-xs text-slate-600 mt-3 font-mono">{progress}%</div>
                                        </div>
                                    </div>
                                ) : (phase === 'preview' || phase === 'checkout') ? (
                                    /* FULL SITE PREVIEW */
                                    <div className="relative">
                                        <LiveMockup businessName={businessName} palette={colors.length >= 4 ? colors : ['#7c3aed', '#06b6d4', '#f43f5e', '#10b981']} design={design} features={features} tier={tier.name} />
                                        {showPrice && (
                                            <div className="absolute top-14 right-4 px-5 py-3 rounded-xl bg-black/80 backdrop-blur-xl border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.3)] animate-[fadeIn_0.5s_ease-out]">
                                                <div className="text-2xl font-black text-cyan-400">${tier.price}</div>
                                                <div className="text-[9px] text-slate-500 uppercase tracking-widest">{tier.name}</div>
                                                {tier.monthly > 0 && <div className="text-[9px] text-purple-400 mt-0.5">+${tier.monthly}/mo AI+</div>}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    /* PLACEHOLDER (name/colors/images) */
                                    <div className="relative rounded-2xl overflow-hidden border border-white/[0.06] shadow-2xl" style={{ aspectRatio: '16/9' }}>
                                        <div className="flex items-center px-3 py-2 gap-2 bg-gradient-to-b from-[#2a2a2e] to-[#1e1e22] border-b border-white/[0.04]">
                                            <div className="flex gap-1.5">
                                                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                                                <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                                                <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                                            </div>
                                            <div className="flex-1 flex items-center justify-center px-3 py-1 rounded-md mx-8 bg-black/30 border border-white/[0.06]">
                                                <span className="text-[9px] font-mono text-slate-500"><span className="text-green-400/60">🔒</span> https://{slug || 'yoursite'}.com</span>
                                            </div>
                                        </div>
                                        <div className="bg-black flex flex-col items-center justify-center p-10" style={{ minHeight: '340px' }}>
                                            {colors.length > 0 ? (
                                                <div className="flex flex-col items-center gap-3">
                                                    <div className="flex gap-3">
                                                        {colors.map((c, i) => (
                                                            <div key={i} className="w-12 h-12 rounded-xl shadow-lg" style={{ backgroundColor: c, boxShadow: `0 0 20px ${c}40` }} />
                                                        ))}
                                                        {Array.from({ length: 4 - colors.length }).map((_, i) => (
                                                            <div key={`e-${i}`} className="w-12 h-12 rounded-xl border border-dashed border-white/10" />
                                                        ))}
                                                    </div>
                                                    <span className="text-xs text-slate-600">{colors.length}/4 colors</span>
                                                </div>
                                            ) : (
                                                <div className="text-center">
                                                    <div className="text-lg font-black text-white/20">{businessName || 'Your Business'}</div>
                                                    <div className="text-xs text-slate-700 mt-1">Waiting for your colors...</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* ── CHECKOUT (slides in from right) ── */}
                        {phase === 'checkout' && (
                            <div className={`w-1/2 flex flex-col justify-center p-10 transition-all duration-700 ${checkoutSlide ? 'translate-x-0 opacity-100' : 'translate-x-[100px] opacity-0'}`}>
                                <h3 className="text-2xl font-black tracking-tighter text-white mb-2">Secure Your Domain</h3>
                                <p className="text-sm text-slate-500 mb-6">Your {tier.name} package — ${tier.price}</p>
                                <div className="space-y-3 mb-6">
                                    {domains.map((d, i) => (
                                        <button key={i} onClick={() => setSelectedDomain(d.domain)}
                                            className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${selectedDomain === d.domain
                                                ? 'bg-cyan-500/[0.06] border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                                                : 'bg-white/[0.02] border-white/[0.06] hover:border-white/15'}`}>
                                            <span className="font-bold">{d.domain}</span>
                                            <span className="text-emerald-400 text-sm">${d.price}/yr</span>
                                        </button>
                                    ))}
                                </div>
                                {/* Itemized breakdown */}
                                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] mb-6">
                                    <h4 className="text-sm font-bold mb-3">What's Included</h4>
                                    <div className="space-y-1.5 text-xs">
                                        {TIERS.slice(0, currentTier + 1).flatMap(t => t.includes).map((item, i) => (
                                            <div key={i} className="flex justify-between">
                                                <span className="text-slate-400">{item.replace(/\s*\(\$\d+.*?\)/, '')}</span>
                                                <span className="text-slate-500 text-[10px]">{item.match(/\(\$.*?\)/)?.[0] || ''}</span>
                                            </div>
                                        ))}
                                        <div className="flex justify-between pt-3 mt-3 border-t border-white/10 text-base font-black">
                                            <span>Total <span className="text-cyan-400">({tier.name})</span></span>
                                            <span className="text-cyan-400">${tier.price}</span>
                                        </div>
                                        {tier.monthly > 0 && (
                                            <div className="flex justify-between text-[10px] text-purple-400">
                                                <span>+ Simple AI+</span><span>${tier.monthly}/mo</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between text-[10px] text-slate-600">
                                            <span>+ Hosting &amp; management</span><span>$29/mo</span>
                                        </div>
                                    </div>
                                </div>
                                <button className="w-full py-4 rounded-2xl font-bold text-sm uppercase tracking-[0.15em] bg-gradient-to-r from-purple-600 via-purple-500 to-cyan-500 text-white shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:shadow-[0_0_50px_rgba(168,85,247,0.5)] hover:scale-[1.01] active:scale-[0.99] transition-all">
                                    Build My Website →
                                </button>
                            </div>
                        )}

                        {/* ═══ CHAT WINDOW ═══ */}
                        {phase !== 'checkout' && (
                            <div className="w-full max-w-[750px] mt-6 relative">
                                <div className="absolute -inset-6 rounded-3xl blur-2xl opacity-50 bg-cyan-500/20" />
                                <div className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl shadow-[0_8px_60px_rgba(6,182,212,0.15),0_0_80px_rgba(6,182,212,0.08)] flex flex-col overflow-hidden" style={{ maxHeight: '360px' }}>
                                    {/* Header */}
                                    <div className="px-4 py-3 flex items-center gap-2 border-b border-white/[0.04] shrink-0">
                                        <div className="relative">
                                            <div className="absolute -inset-1 rounded-full blur-sm bg-gradient-to-r from-purple-500/40 to-cyan-400/40 animate-[pulse_2s_ease-in-out_infinite]" />
                                            <img src="/favicon_io/android-chrome-192x192.png" alt="Simple AI" className="relative w-7 h-7 rounded-full object-cover" />
                                        </div>
                                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">Simple AI</span>
                                        <span className="text-[9px] text-emerald-400 ml-1">● Online</span>
                                    </div>

                                    {/* Messages */}
                                    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-[120px] scrollbar-hide">
                                        {chat.map((msg, i) => (
                                            <div key={i}>
                                                <div className={`text-sm p-3 rounded-2xl max-w-[85%] animate-[fadeSlideIn_0.3s_ease-out] ${msg.role === 'user'
                                                    ? 'ml-auto bg-purple-900/40 text-white border border-purple-500/10 rounded-br-sm'
                                                    : 'bg-white/[0.03] text-slate-300 border border-white/[0.04] rounded-bl-sm'}`}>
                                                    {msg.text}
                                                </div>

                                                {/* Color Wheel */}
                                                {msg.colorPicker && i === chat.length - 1 && colors.length < 4 && (
                                                    <div className="mt-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] flex flex-col items-center gap-3">
                                                        <div ref={wheelRef} onClick={handleWheelClick}
                                                            className="w-44 h-44 rounded-full cursor-crosshair relative shadow-[0_0_30px_rgba(124,58,237,0.2)] hover:shadow-[0_0_40px_rgba(124,58,237,0.3)] transition-shadow"
                                                            style={{
                                                                background: 'conic-gradient(from 0deg, hsl(0,85%,55%), hsl(60,85%,55%), hsl(120,85%,55%), hsl(180,85%,55%), hsl(240,85%,55%), hsl(300,85%,55%), hsl(360,85%,55%))',
                                                            }}>
                                                            <div className="absolute inset-0 rounded-full" style={{
                                                                background: 'radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)',
                                                            }} />
                                                        </div>
                                                        <div className="flex gap-2 items-center">
                                                            {colors.map((c, ci) => (
                                                                <div key={ci} className="w-9 h-9 rounded-lg shadow-lg ring-1 ring-white/20" style={{ backgroundColor: c, boxShadow: `0 0 12px ${c}50` }} />
                                                            ))}
                                                            {Array.from({ length: 4 - colors.length }).map((_, ci) => (
                                                                <div key={`e-${ci}`} className="w-9 h-9 rounded-lg border border-dashed border-white/10" />
                                                            ))}
                                                            <span className="text-[10px] text-slate-600 ml-1">{colors.length}/4</span>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Question options (not decision) */}
                                                {msg.stringOptions && !msg.decision && i === chat.length - 1 && (
                                                    <div className="mt-2 flex flex-wrap gap-2">
                                                        {msg.stringOptions.map(opt => (
                                                            <button key={opt} onClick={() => handleAnswer(opt)}
                                                                className="px-4 py-2 rounded-xl text-xs font-bold bg-white/[0.03] border border-white/[0.06] text-slate-300 hover:bg-purple-500/10 hover:border-purple-500/30 hover:text-white transition-all hover:scale-[1.02]">
                                                                {opt}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* Decision buttons */}
                                                {msg.decision && msg.stringOptions && i === chat.length - 1 && (
                                                    <div className="mt-3 flex gap-2">
                                                        {msg.stringOptions.map(opt => (
                                                            <button key={opt} onClick={() => handleDecision(opt)}
                                                                className={`flex-1 py-3 rounded-xl text-sm font-bold border transition-all hover:scale-[1.01] ${opt.includes('Looks good')
                                                                    ? 'bg-gradient-to-r from-purple-600/60 to-cyan-500/40 border-cyan-500/30 text-white shadow-[0_0_20px_rgba(6,182,212,0.15)]'
                                                                    : 'bg-white/[0.03] border-white/[0.08] text-slate-300 hover:border-white/20'}`}>
                                                                {opt}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                        <div ref={chatEndRef} />
                                    </div>

                                    {/* Input for name / images */}
                                    {(phase === 'name' || phase === 'images') && (
                                        <div className="px-4 py-3 border-t border-white/[0.04] shrink-0">
                                            <div className="flex gap-2">
                                                {phase === 'name' ? (
                                                    <>
                                                        <input ref={nameInputRef} value={businessName} onChange={e => setBusinessName(e.target.value)}
                                                            onKeyDown={e => e.key === 'Enter' && handleNameSubmit()}
                                                            placeholder="Enter your business name..."
                                                            className="flex-1 px-4 py-2.5 rounded-xl text-sm bg-white/[0.03] text-white border border-white/[0.06] placeholder:text-slate-700 focus:outline-none focus:border-cyan-500/30" />
                                                        <button onClick={handleNameSubmit} className="px-5 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-purple-600/40 to-cyan-500/30 text-cyan-400 border border-cyan-500/20 hover:border-cyan-400/40 transition-all">Send</button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <input value={imgInput} onChange={e => setImgInput(e.target.value)}
                                                            onKeyDown={e => e.key === 'Enter' && handleImageAdd()}
                                                            placeholder='Describe an image (or "skip")...'
                                                            className="flex-1 px-4 py-2.5 rounded-xl text-sm bg-white/[0.03] text-white border border-white/[0.06] placeholder:text-slate-700 focus:outline-none focus:border-cyan-500/30" />
                                                        <button onClick={handleImageAdd} className="px-5 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-purple-600/40 to-cyan-500/30 text-cyan-400 border border-cyan-500/20 hover:border-cyan-400/40 transition-all">Send</button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <style jsx global>{`
                @keyframes shimmer { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes fadeSlideIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
                *, *::before, *::after { scrollbar-width: none !important; -ms-overflow-style: none !important; }
                *::-webkit-scrollbar { display: none !important; }
                html, body { overflow-x: hidden; scrollbar-width: none !important; -ms-overflow-style: none !important; }
                html::-webkit-scrollbar, body::-webkit-scrollbar { display: none !important; }
                @keyframes colorShift {
                    0%, 100% { filter: hue-rotate(0deg) brightness(1); }
                    33% { filter: hue-rotate(30deg) brightness(1.1); }
                    66% { filter: hue-rotate(-20deg) brightness(1.05); }
                }
            `}</style>
        </div>
    );
}
