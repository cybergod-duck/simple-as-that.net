import Link from 'next/link';

export default function Home() {
  return (
    <div className="h-screen w-screen overflow-hidden bg-[#030712] text-slate-200 font-sans selection:bg-teal-500/30 flex flex-col justify-center items-center relative">

      {/* Absolute Ambient Background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-900/10 via-[#030712] to-[#030712]"></div>
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-teal-600/5 rounded-full blur-[100px] mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-indigo-600/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02] z-0 pointer-events-none mix-blend-overlay"></div>

      {/* Tightly Centered HUD Container */}
      <main className="relative z-10 w-full max-w-4xl px-8 flex flex-col items-center justify-center text-center">

        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/5 bg-white/[0.02] text-teal-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-10 shadow-sm backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-[pulse_3s_ease-in-out_infinite]"></span>
          VNR Automated Pipeline
        </div>

        {/* Core Branding */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-indigo-600 flex items-center justify-center shadow-[0_0_30px_rgba(45,212,191,0.2)] mb-8">
          <span className="text-white font-black text-3xl tracking-tighter">S</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[1.1] mb-6">
          Simple As That.
        </h1>

        <p className="text-lg text-slate-400 max-w-xl mx-auto mb-12 leading-relaxed font-light tracking-wide">
          Algorithmic infrastructure deployment. We compile industry-specific, SEO-optimized web platforms dynamically at the edge.
        </p>

        {/* Primary Action Array */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Link href="/onboarding" className="group relative w-full sm:w-auto px-10 py-4 rounded-xl bg-white text-black font-extrabold text-sm uppercase tracking-wider transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]">
            <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-teal-400 to-indigo-500 opacity-50 group-hover:opacity-100 transition-opacity rounded-b-xl"></span>
            Initialize Build
          </Link>
          <Link href="/login" className="w-full sm:w-auto px-10 py-4 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/5 text-white font-bold text-sm uppercase tracking-wider transition-all">
            Access Terminal
          </Link>
        </div>
      </main>

      {/* Absolute Footer Elements (Anchored to exact bottom) */}
      <div className="absolute bottom-8 w-full px-12 flex justify-between items-end text-[10px] text-slate-600 font-mono tracking-widest uppercase">
        <div className="flex flex-col gap-1 text-left">
          <span>Server: Nominal</span>
          <span>Latency: &lt;12ms</span>
        </div>
        <div className="flex flex-col gap-1 text-right">
          <span>©2026 Voss Neural Research</span>
          <Link href="/privacy" className="hover:text-teal-500 transition-colors">Privacy Policy</Link>
        </div>
      </div>

    </div>
  );
}
