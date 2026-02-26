'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import ThemeToggle from '../components/ThemeToggle';

export default function Home() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <div className={`relative w-full h-full min-h-[calc(100vh-120px)] overflow-hidden flex flex-col items-center justify-center font-sans transition-colors duration-1000 ${isDark ? 'bg-[#0d0521]' : 'bg-slate-50'}`}>

      {/* Background */}
      <div className={`absolute inset-0 z-0 transition-colors duration-1000 ${isDark ? 'bg-[#0d0521]' : 'bg-[#FAFAFA]'}`}></div>

      {/* Ambient Glows */}
      <div className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${isDark ? 'opacity-100' : 'opacity-70'}`}>
        <div className={`absolute top-[-10%] left-[20%] w-[40vw] h-[40vw] rounded-full blur-[100px] animate-[pulse_6s_ease-in-out_infinite] ${isDark ? 'mix-blend-screen bg-purple-600/20' : 'mix-blend-multiply bg-purple-500/10'}`}></div>
        <div className={`absolute top-[30%] left-[50%] -translate-x-1/2 w-[50vw] h-[50vw] rounded-full blur-[120px] animate-[pulse_8s_ease-in-out_infinite_delay-2s] ${isDark ? 'mix-blend-screen bg-cyan-500/10' : 'mix-blend-multiply bg-cyan-500/10'}`}></div>
        <div className={`absolute bottom-[-10%] right-[20%] w-[40vw] h-[40vw] rounded-full blur-[100px] animate-[pulse_7s_ease-in-out_infinite_delay-1s] ${isDark ? 'mix-blend-screen bg-purple-500/15' : 'mix-blend-multiply bg-purple-500/10'}`}></div>

        {/* Grid Overlay */}
        <div className={`absolute inset-0 bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)] ${isDark
          ? 'bg-[linear-gradient(rgba(168,85,247,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.03)_1px,transparent_1px)]'
          : 'bg-[linear-gradient(rgba(168,85,247,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.08)_1px,transparent_1px)]'
          }`}></div>
      </div>

      {/* Hero Content */}
      <main className={`relative z-10 w-full max-w-4xl px-6 flex flex-col justify-center items-center text-center transition-all duration-1000 transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>

        {/* Status Badge */}
        <div className={`inline-flex items-center gap-3 px-4 py-1.5 rounded-full border text-xs font-bold tracking-[0.2em] uppercase mb-12 transition-colors ${isDark ? 'border-purple-500/30 bg-purple-500/10 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.2)]' : 'border-purple-500/50 bg-purple-50 text-purple-700'
          }`}>
          <span className={`w-2 h-2 rounded-full animate-pulse transition-all ${isDark ? 'bg-cyan-400 shadow-[0_0_8px_rgba(0,255,255,0.8)]' : 'bg-purple-500 shadow-[0_2px_6px_rgba(168,85,247,0.8)]'
            }`}></span>
          Now Accepting New Clients
        </div>

        <div className="space-y-6 mb-16 relative">
          <h1 className={`text-6xl md:text-8xl font-black tracking-tighter leading-[1.05] transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Your Business<br />
            <span className={`text-transparent bg-clip-text bg-gradient-to-b from-purple-400 via-cyan-400 to-purple-500 transition-all ${isDark ? 'drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]' : 'drop-shadow-[0_4px_15px_rgba(168,85,247,0.2)]'}`}>
              Online Today.
            </span>
          </h1>

          <p className={`text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed tracking-wide transition-colors ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            We build beautiful, fast websites for small businesses. Tell us what you need and our AI handles the rest — it's simple as that.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
          <Link href="/onboarding" className="group relative w-full sm:w-auto px-10 py-5 rounded-2xl font-bold text-sm tracking-widest uppercase transition-all duration-500 ease-out overflow-hidden">
            <div className={`absolute inset-0 border-2 rounded-2xl border-transparent [background:linear-gradient(to_bottom,#A855F7,#06B6D4,#A855F7)_border-box] [mask:linear-gradient(#fff_0_0)_padding-box,linear-gradient(#fff_0_0)] [-webkit-mask-composite:destination-out] [mask-composite:exclude] transition-shadow ${isDark ? 'group-hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]' : 'group-hover:shadow-[0_4px_20px_rgba(168,85,247,0.3)]'}`}></div>
            <div className={`absolute inset-0 transition-opacity opacity-0 group-hover:opacity-100 ${isDark ? 'bg-gradient-to-b from-purple-500/20 via-cyan-500/20 to-purple-500/20' : 'bg-gradient-to-b from-purple-500/10 via-cyan-500/10 to-purple-500/10 bg-white/50 backdrop-blur-sm'}`}></div>
            <span className={`relative z-10 flex items-center justify-center gap-3 transition-colors ${isDark ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'text-slate-900 drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)] group-hover:text-black'}`}>
              Build My Website
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </span>
          </Link>

          <Link href="/auth/login" className={`w-full sm:w-auto px-10 py-5 rounded-2xl border-2 font-bold text-sm tracking-widest uppercase transition-colors duration-300 ${isDark
            ? 'border-purple-800 text-purple-300 hover:border-purple-500 hover:text-white hover:bg-purple-500/10'
            : 'border-purple-300 text-purple-500 hover:border-purple-400 hover:text-purple-900 hover:bg-purple-50'
            }`}>
            Client Login
          </Link>
        </div>
      </main>

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Simple As That",
          "url": "https://simple-as-that.net",
          "logo": "https://simple-as-that.net/favicon_io/apple-touch-icon.png",
          "description": "AI-powered website design for small businesses. Beautiful, fast websites starting at $99.",
          "founder": { "@type": "Person", "name": "Timothy Chappell", "sameAs": "https://www.linkedin.com/in/timothy-chappell-bb311b390/" },
          "parentOrganization": { "@type": "Organization", "name": "Voss Neural Research LLC" },
          "contactPoint": { "@type": "ContactPoint", "email": "create@simple-as-that.net", "contactType": "sales" },
          "sameAs": ["https://github.com/cybergod-duck/simple-as-that.net"]
        })
      }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "How much does a website cost for a small business?", "acceptedAnswer": { "@type": "Answer", "text": "Our plans start at $99 for a single landing page, $199 for a 3-page Starter site, $499 for a full Pro site with 5+ pages, and $999 for an unlimited Elite package. All plans include hosting at $29/month." } },
            { "@type": "Question", "name": "How long does it take to build a website?", "acceptedAnswer": { "@type": "Answer", "text": "Most websites are built and deployed within 24-48 hours after you complete our onboarding questionnaire. Complex sites with e-commerce or custom features may take 3-5 business days." } },
            { "@type": "Question", "name": "Do I need a domain name?", "acceptedAnswer": { "@type": "Answer", "text": "We help you find and register the perfect domain during onboarding. You can also bring your own domain and we'll map it for you at no extra cost." } },
            { "@type": "Question", "name": "What is included in a website package?", "acceptedAnswer": { "@type": "Answer", "text": "Every package includes a contact form, basic SEO, mobile-responsive design, and dark/light mode support. Higher tiers add features like AI chatbot, blog, booking system, e-commerce, custom logo, and state compliance packs." } },
            { "@type": "Question", "name": "Can I update my website myself?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! Our dashboard gives you access to update content, images, and settings. For Pro and Elite plans, you can also manage your blog, testimonials, and product listings directly." } }
          ]
        })
      }} />

      {/* FAQ Section (visible) */}
      <section className={`relative z-10 w-full max-w-3xl px-6 mt-16 mb-12 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        <h2 className={`text-2xl font-black tracking-tighter mb-8 text-center ${isDark ? 'text-white' : 'text-slate-900'}`}>Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: 'How much does a website cost?', a: 'Plans start at $99 for a landing page, up to $999 for an unlimited Elite package. All include $29/mo hosting.' },
            { q: 'How long does it take?', a: 'Most sites deploy in 24-48 hours. Complex builds with e-commerce take 3-5 business days.' },
            { q: 'Do I need a domain name?', a: "We help you find one during onboarding, or bring your own — we'll map it for free." },
            { q: "What's included?", a: 'Contact form, SEO, mobile design, and dark/light mode in every plan. Higher tiers add AI chatbot, blog, booking, and more.' },
            { q: 'Can I update it myself?', a: 'Yes! Our dashboard lets you edit content, images, and settings. Pro+ plans include blog and product management.' },
          ].map((faq, i) => (
            <details key={i} className={`group rounded-2xl border p-5 transition-colors ${isDark ? 'bg-white/[0.02] border-purple-500/15 hover:border-purple-500/30' : 'bg-white/80 border-slate-200 hover:border-purple-300'}`}>
              <summary className={`cursor-pointer font-bold text-sm list-none flex items-center justify-between ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {faq.q}
                <span className={`text-lg transition-transform group-open:rotate-45 ${isDark ? 'text-cyan-400' : 'text-purple-500'}`}>+</span>
              </summary>
              <p className={`mt-3 text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

    </div>
  );
}

