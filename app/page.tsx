'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#02040A] text-slate-200 font-sans selection:bg-cyan-500/30 flex flex-col justify-center items-center relative">

      {/* Immersive Cinematic Background */}
      <div className="absolute inset-0 z-0">
        {/* Deep mesh gradient base */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(10,15,30,1)_0%,_rgba(2,4,10,1)_100%)]"></div>

        {/* Animated glowing orbs */}
        <div className={`absolute top-[10%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-indigo-600/10 blur-[120px] mix-blend-screen transition-opacity duration-1000 ${mounted ? 'opacity-100 animate-[pulse_8s_ease-in-out_infinite]' : 'opacity-0'}`}></div>
        <div className={`absolute bottom-[10%] right-[20%] w-[30vw] h-[30vw] rounded-full bg-cyan-500/10 blur-[150px] mix-blend-screen transition-opacity duration-1000 delay-500 ${mounted ? 'opacity-100 animate-[pulse_10s_ease-in-out_infinite]' : 'opacity-0'}`}></div>
        <div className={`absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] rounded-full bg-violet-600/5 blur-[100px] mix-blend-screen transition-opacity duration-1000 delay-300 ${mounted ? 'opacity-100' : 'opacity-0'}`}></div>

        {/* Technical Grid Overlay */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.04] mix-blend-overlay"></div>

        {/* Scanline Effect */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-20 z-0"></div>
      </div>

      {/* Main Glassmorphic HUD Panel */}
      <main className={`relative z-10 w-full max-w-5xl px-6 flex flex-col items-center justify-center text-center transition-all duration-1000 transform ${mounted ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'}`}>

        {/* Floating Glass Container */}
        <div className="relative w-full rounded-[2.5rem] bg-[#0A0F1C]/40 backdrop-blur-3xl border border-white/5 shadow-[0_0_80px_rgba(0,0,0,0.8),inset_0_0_20px_rgba(255,255,255,0.02)] p-10 md:p-20 overflow-hidden group">

          {/* Internal Glow on Hover */}
          <div className="absolute -inset-20 bg-gradient-to-r from-cyan-500/0 via-violet-500/10 to-indigo-500/0 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

          {/* System Status Indicator */}
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-[10px] font-bold tracking-[0.3em] uppercase mb-10 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.1)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            Neural Generation Engine Active
          </div>

          {/* Title Sequence */}
          <div className="relative mb-8">
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.95] drop-shadow-2xl">
              Don't build it.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-500 filter drop-shadow-[0_0_20px_rgba(167,139,250,0.3)] select-none">
                Deploy it.
              </span>
            </h1>
          </div>

          {/* Premium Value Prop */}
          <p className="text-lg md:text-xl text-slate-300/80 max-w-2xl mx-auto mb-14 leading-relaxed font-light tracking-wide">
            Stop paying agencies $5,000 for templates. We algorithmically generate enterprise-grade, SEO-dominant digital infrastructure for your specific industry in exactly <strong className="text-white font-bold">14 seconds</strong>.
          </p>

          {/* Call to Action Array */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-20">
            {/* Primary Elite Button */}
            <Link href="/onboarding" className="group relative w-full sm:w-auto px-12 py-5 rounded-2xl bg-white text-black font-black text-sm uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] overflow-hidden">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></span>
              <span className="relative z-10 flex items-center justify-center gap-2">
                Initialize Build
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </span>
            </Link>

            {/* Secondary Technical Button */}
            <Link href="/login" className="group w-full sm:w-auto px-10 py-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/30 text-slate-300 font-bold text-sm uppercase tracking-[0.2em] transition-all backdrop-blur-md">
              <span className="group-hover:text-white transition-colors">Client Terminal</span>
            </Link>
          </div>

        </div>
      </main>

      {/* Cyberpunk UI Corner Accents */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-white/10 opacity-50 pointer-events-none"></div>
      <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-white/10 opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-white/10 opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-white/10 opacity-50 pointer-events-none"></div>

      {/* Absolute Header (Logo & Architecture) */}
      <div className="absolute top-8 w-full px-12 flex justify-between items-center text-white pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-indigo-600 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)]">
            <span className="font-black text-sm">S</span>
          </div>
          <span className="font-bold tracking-tight text-sm">Simple-As-That</span>
        </div>
        <div className="flex gap-6 pointer-events-auto text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500">
          <span className="hidden md:block">SYS_V2.0.4</span>
          <Link href="#arch" className="hover:text-cyan-400 transition-colors">Architecture</Link>
        </div>
      </div>

      {/* Absolute Footer Elements */}
      <div className="absolute bottom-8 w-full px-12 flex justify-between items-end text-[10px] text-slate-600 font-mono tracking-widest uppercase pointer-events-none">
        <div className="flex flex-col gap-1 text-left">
          <span className="text-cyan-600/50">SERVER.STATUS // NOMINAL</span>
          <span>LATENCY: &lt;12ms</span>
        </div>
        <div className="flex flex-col gap-1 text-right pointer-events-auto">
          <span>©2026 Voss Neural Research</span>
          <Link href="/privacy" className="hover:text-cyan-400 transition-colors">Compliance Matrix</Link>
        </div>
      </div>

    </div>
  );
}
