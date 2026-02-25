import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 font-sans selection:bg-teal-500/30 overflow-hidden">
      {/* Dynamic Ambient Background */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-900/20 via-[#030712] to-[#030712]"></div>
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-teal-600/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>

      {/* Navigation */}
      <nav className="fixed w-full z-50 border-b border-white/5 bg-[#030712]/50 backdrop-blur-xl transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-indigo-500 flex items-center justify-center shadow-[0_0_20px_rgba(45,212,191,0.3)]">
              <span className="text-white font-black text-xl tracking-tighter">S</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Simple-As-That</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="#features" className="text-slate-400 hover:text-white transition-colors">Architecture</Link>
            <Link href="#pricing" className="text-slate-400 hover:text-white transition-colors">Pricing</Link>
            <Link href="/onboarding" className="px-5 py-2.5 rounded-full bg-white text-black hover:bg-teal-50 transition-all font-bold hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              Start Building
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative pt-40 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-300 text-xs font-bold tracking-widest uppercase mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"></span>
            Version 2.0 Engine Live
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[1.05] mb-8">
            Stop coding.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-indigo-400 to-purple-400">
              Deploy infrastructure.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            We algorithmically generate SEO-optimized, industry-specific web platforms in seconds. Complete with automated state compliance, programmatic lead capture, and instant domain routing.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/onboarding" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-400 hover:to-indigo-500 text-white font-bold text-lg transition-all shadow-[0_0_30px_rgba(45,212,191,0.3)] hover:shadow-[0_0_40px_rgba(45,212,191,0.5)] hover:-translate-y-1">
              Initialize Platform Builder &rarr;
            </Link>
            <Link href="#features" className="w-full sm:w-auto px-8 py-4 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/5 text-white font-medium text-lg transition-all">
              View Architecture
            </Link>
          </div>
        </div>

        {/* Dashboard Preview Mockup */}
        <div className="mt-24 max-w-6xl mx-auto relative group perspective-1000">
          <div className="absolute inset-x-10 -bottom-10 inset-y-10 bg-gradient-to-r from-teal-500/20 to-indigo-500/20 blur-3xl rounded-[3rem] -z-10 group-hover:opacity-70 transition-opacity duration-700"></div>
          <div className="rounded-2xl border border-white/10 bg-[#0B0F19]/90 backdrop-blur-2xl overflow-hidden shadow-2xl relative transform transition-all duration-700 hover:scale-[1.02]">
            {/* macOS window controls */}
            <div className="h-10 border-b border-white/5 bg-white/[0.02] flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
            </div>
            {/* Mockup Body */}
            <div className="p-8 grid md:grid-cols-3 gap-6 h-[400px]">
              <div className="col-span-1 space-y-4">
                <div className="h-8 w-1/2 bg-white/5 rounded-lg animate-pulse"></div>
                <div className="h-4 w-3/4 bg-white/5 rounded-lg"></div>
                <div className="h-4 w-2/3 bg-white/5 rounded-lg"></div>
                <div className="h-32 w-full bg-gradient-to-br from-teal-500/10 rounded-xl border border-teal-500/20 mt-8 flex items-center justify-center text-teal-500/50 font-mono text-sm">
                  [GENERATION MODULE]
                </div>
              </div>
              <div className="col-span-2 space-y-4">
                <div className="h-48 w-full bg-white/5 rounded-xl overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0B0F19]"></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-24 bg-white/5 rounded-xl"></div>
                  <div className="h-24 bg-white/5 rounded-xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-white/5 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between text-sm text-slate-500">
          <p>© 2026 Simple-As-That. Infrastructure by VNR.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy & Compliance</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact Engineering</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
