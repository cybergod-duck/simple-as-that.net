'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Home() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Ensure we don't render theming mismatches on the server
  if (!mounted) return null;

  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center font-sans">

      {/* Zero UI Fluid Background System */}
      <div className={`absolute inset-0 transition-colors duration-1000 ${isDark ? 'bg-[#000000]' : 'bg-[#FAFAFA]'}`}></div>

      {/* Dynamic, extremely subtle fluid gradient (10% Accent Rule) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full blur-[120px] mix-blend-normal transition-opacity duration-1000 ${mounted ? 'opacity-100 animate-[spin_20s_linear_infinite]' : 'opacity-0'
          } ${isDark ? 'bg-indigo-500/10' : 'bg-indigo-500/5'}`}></div>

        <div className={`absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full blur-[150px] mix-blend-normal transition-opacity duration-1000 delay-300 ${mounted ? 'opacity-100 animate-[spin_25s_linear_infinite_reverse]' : 'opacity-0'
          } ${isDark ? 'bg-violet-500/10' : 'bg-violet-500/5'}`}></div>
      </div>

      {/* Neo-Minimalist Navigation Header */}
      <header className="absolute top-0 w-full px-8 md:px-12 py-8 flex justify-between items-center z-40">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm tracking-tighter transition-colors ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}>
            S
          </div>
          <span className={`font-bold tracking-tight text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>Simple-As-That</span>
        </div>
        {/* ThemeToggle is injected via app/layout.tsx globally */}
      </header>

      {/* Stark, Centered Hero Content */}
      <main className={`relative z-10 w-full max-w-4xl px-6 flex flex-col justify-center items-center text-center transition-all duration-1000 transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>

        {/* 60% White Space Focus Area */}
        <div className="space-y-8 mb-16">
          <h1 className={`text-6xl md:text-8xl font-black tracking-tighter leading-[1.05] ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Zero UI.<br />
            <span className="text-indigo-500">Total Output.</span>
          </h1>

          <p className={`text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed tracking-wide ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Bypass the agency. We algorithmically compile high-performance, SEO-dominant digital infrastructure specific to your industry.
          </p>
        </div>

        {/* 30% Contrast Interaction Layer */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link href="/onboarding" className={`group relative w-full sm:w-auto px-10 py-5 rounded-2xl font-bold text-sm tracking-widest uppercase transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.03] active:scale-[0.98] overflow-hidden ${isDark
              ? 'bg-white text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]'
              : 'bg-[#09090B] text-white hover:shadow-[0_10px_40px_rgba(9,9,11,0.2)]'
            }`}>
            <span className="relative z-10 flex items-center justify-center gap-2">
              Initialize Concierge
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </span>
          </Link>

          <Link href="/login" className={`w-full sm:w-auto px-10 py-5 rounded-2xl border font-bold text-sm tracking-widest uppercase transition-colors duration-300 ${isDark
              ? 'border-white/10 text-white hover:bg-white/5'
              : 'border-slate-200 text-slate-900 hover:bg-slate-50'
            }`}>
            Access Terminal
          </Link>
        </div>
      </main>

      {/* Minimalist Footer */}
      <footer className="absolute bottom-0 w-full px-8 md:px-12 py-8 flex justify-between items-center text-xs font-medium tracking-widest uppercase z-40">
        <div className={isDark ? 'text-slate-500' : 'text-slate-400'}>
          ©2026 Voss Neural Research
        </div>
        <div className="flex gap-6">
          <Link href="#architecture" className={`transition-colors ${isDark ? 'text-slate-500 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}>Architecture</Link>
          <Link href="/privacy" className={`transition-colors ${isDark ? 'text-slate-500 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}>Compliance</Link>
        </div>
      </footer>

    </div>
  );
}
