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

  if (!mounted) return null;

  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <div className={`relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center font-sans transition-colors duration-1000 ${isDark ? 'bg-[#0d0521]' : 'bg-slate-50'}`}>

      {/* Background */}
      <div className={`absolute inset-0 z-0 transition-colors duration-1000 ${isDark ? 'bg-[#0d0521]' : 'bg-[#FAFAFA]'}`}></div>

      {/* Ambient Glows (Deep Purple + Cyan) */}
      <div className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${isDark ? 'opacity-100' : 'opacity-70'}`}>
        <div className={`absolute top-[-10%] left-[20%] w-[40vw] h-[40vw] rounded-full blur-[100px] animate-[pulse_6s_ease-in-out_infinite] ${isDark ? 'mix-blend-screen bg-purple-600/20' : 'mix-blend-multiply bg-purple-500/10'
          }`}></div>
        <div className={`absolute top-[30%] left-[50%] -translate-x-1/2 w-[50vw] h-[50vw] rounded-full blur-[120px] animate-[pulse_8s_ease-in-out_infinite_delay-2s] ${isDark ? 'mix-blend-screen bg-cyan-500/10' : 'mix-blend-multiply bg-cyan-500/10'
          }`}></div>
        <div className={`absolute bottom-[-10%] right-[20%] w-[40vw] h-[40vw] rounded-full blur-[100px] animate-[pulse_7s_ease-in-out_infinite_delay-1s] ${isDark ? 'mix-blend-screen bg-purple-500/15' : 'mix-blend-multiply bg-purple-500/10'
          }`}></div>

        {/* Grid Overlay */}
        <div className={`absolute inset-0 bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)] ${isDark
          ? 'bg-[linear-gradient(rgba(168,85,247,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.03)_1px,transparent_1px)]'
          : 'bg-[linear-gradient(rgba(168,85,247,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.08)_1px,transparent_1px)]'
          }`}></div>
      </div>

      {/* Header */}
      <header className={`absolute top-0 w-full px-8 md:px-12 py-8 flex justify-between items-center z-40 border-b backdrop-blur-md transition-colors ${isDark ? 'border-white/5 bg-black' : 'border-slate-200/50 bg-white/50'
        }`}>
        <div className="flex items-center gap-4">
          <div className="relative w-10 h-10 flex items-center justify-center">
            <img
              src="/favicon_io/android-chrome-192x192.png"
              alt="Simple-As-That Logo"
              className={`w-8 h-8 absolute object-contain transition-all ${isDark
                ? 'drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]'
                : 'drop-shadow-[0_2px_10px_rgba(168,85,247,0.5)] invert filter brightness-0'
                }`}
            />
          </div>
          <span className={`font-bold tracking-tight text-lg transition-colors ${isDark ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]' : 'text-slate-900 drop-shadow-[0_2px_10px_rgba(0,0,0,0.1)]'
            }`}>Simple As That</span>
        </div>
        <Link href="/auth/login" className={`text-sm font-bold uppercase tracking-widest transition-colors ${isDark ? 'text-purple-300/60 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}>
          Login
        </Link>
      </header>

      {/* Hero */}
      <main className={`relative z-10 w-full max-w-4xl px-6 flex flex-col justify-center items-center text-center transition-all duration-1000 transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>

        {/* Status Badge */}
        <div className={`inline-flex items-center gap-3 px-4 py-1.5 rounded-full border text-xs font-bold tracking-[0.2em] uppercase mb-12 transition-colors ${isDark ? 'border-purple-500/30 bg-purple-500/10 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.2)]' : 'border-purple-500/50 bg-purple-50 text-purple-700'
          }`}>
          <span className={`w-2 h-2 rounded-full animate-pulse transition-all ${isDark ? 'bg-cyan-400 shadow-[0_0_8px_rgba(0,255,255,0.8)]' : 'bg-purple-500 shadow-[0_2px_6px_rgba(168,85,247,0.8)]'
            }`}></span>
          Now Accepting New Clients
        </div>

        <div className="space-y-6 mb-16 relative">
          <h1 className={`text-6xl md:text-8xl font-black tracking-tighter leading-[1.05] transition-colors ${isDark ? 'text-white' : 'text-slate-900'
            }`}>
            Your Business<br />
            <span className={`text-transparent bg-clip-text bg-gradient-to-b from-purple-400 via-cyan-400 to-purple-500 transition-all ${isDark ? 'drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]' : 'drop-shadow-[0_4px_15px_rgba(168,85,247,0.2)]'
              }`}>
              Online Today.
            </span>
          </h1>

          <p className={`text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed tracking-wide transition-colors ${isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
            We build beautiful, fast websites for small businesses. Tell us what you need and our AI handles the rest — it's simple as that.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
          <Link href="/onboarding" className="group relative w-full sm:w-auto px-10 py-5 rounded-2xl font-bold text-sm tracking-widest uppercase transition-all duration-500 ease-out overflow-hidden">
            {/* Neon Border */}
            <div className={`absolute inset-0 border-2 rounded-2xl border-transparent [background:linear-gradient(to_bottom,#A855F7,#06B6D4,#A855F7)_border-box] [mask:linear-gradient(#fff_0_0)_padding-box,linear-gradient(#fff_0_0)] [-webkit-mask-composite:destination-out] [mask-composite:exclude] transition-shadow ${isDark ? 'group-hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]' : 'group-hover:shadow-[0_4px_20px_rgba(168,85,247,0.3)]'
              }`}></div>

            {/* Hover Fill */}
            <div className={`absolute inset-0 transition-opacity opacity-0 group-hover:opacity-100 ${isDark ? 'bg-gradient-to-b from-purple-500/20 via-cyan-500/20 to-purple-500/20' : 'bg-gradient-to-b from-purple-500/10 via-cyan-500/10 to-purple-500/10 bg-white/50 backdrop-blur-sm'
              }`}></div>

            <span className={`relative z-10 flex items-center justify-center gap-3 transition-colors ${isDark ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'text-slate-900 drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)] group-hover:text-black'
              }`}>
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

      {/* Corner Accents */}
      <div className={`absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 pointer-events-none transition-all ${isDark ? 'border-purple-500/30 opacity-50 drop-shadow-[0_0_5px_rgba(168,85,247,0.5)]' : 'border-purple-500/40 opacity-40 shadow-[0_2px_10px_rgba(168,85,247,0.2)]'
        }`}></div>
      <div className={`absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 pointer-events-none transition-all ${isDark ? 'border-cyan-500/30 opacity-50 drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]' : 'border-cyan-500/40 opacity-40 shadow-[0_2px_10px_rgba(0,255,255,0.2)]'
        }`}></div>

      {/* Footer */}
      <footer className={`absolute bottom-0 w-full px-8 md:px-12 py-8 flex justify-between items-center text-xs font-medium tracking-widest uppercase z-40 transition-colors ${isDark ? 'text-slate-600 bg-black border-t border-white/5' : 'text-slate-500'
        }`}>
        <div>
          ©2026 Voss Neural Research LLC
        </div>
        <div className="flex gap-6">
          <Link href="/onboarding" className={`transition-colors ${isDark ? 'hover:text-purple-400' : 'hover:text-purple-600'}`}>Get Started</Link>
          <Link href="/privacy" className={`transition-colors ${isDark ? 'hover:text-cyan-400' : 'hover:text-cyan-600'}`}>Privacy</Link>
        </div>
      </footer>

    </div>
  );
}
