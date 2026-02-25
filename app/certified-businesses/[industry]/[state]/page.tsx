import type { Metadata } from 'next';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: { industry: string, state: string } }): Promise<Metadata> {
    const { industry, state } = params;
    return {
        title: `Certified ${industry} in ${state} | Simple-As-That Directory`,
        description: `Verified directory of ADA compliant and state data regulated ${industry} businesses operating within ${state}.`
    };
}

export default function CertifiedBusinessDirectory({ params }: { params: { industry: string, state: string } }) {
    const { industry, state } = params;

    // Reverse URL slugs to human-readable strings
    const formattedIndustry = industry.replace(/-/g, ' ');
    const formattedState = state.replace(/-/g, ' ');

    return (
        <div className="min-h-screen py-24 px-6 md:px-12 max-w-7xl mx-auto transition-colors duration-1000 bg-black text-white">

            {/* SEO Header Array */}
            <header className="text-center mb-20 relative">
                {/* Background ambient lighting */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-purple-600/20 blur-[100px] pointer-events-none rounded-full"></div>

                <div className="inline-flex items-center gap-3 px-4 py-2 border border-purple-500/50 rounded-full bg-purple-900/40 text-purple-200 text-xs font-bold tracking-widest uppercase mb-8 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    Global Backlink Directory
                </div>

                <h1 className="text-4xl md:text-6xl font-black mb-6 capitalize tracking-tighter">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 drop-shadow-[0_0_15px_rgba(0,255,255,0.4)]">Certified</span> {formattedIndustry} <br />
                    <span className="opacity-50 font-light text-3xl">in</span> {formattedState}
                </h1>

                <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                    These localized businesses have successfully implemented the high-tier digital infrastructure required to meet 2026 <strong className="text-cyan-300 font-normal">State Data Privacy Laws</strong> and ADA Accessibility standards.
                </p>
            </header>

            {/* Programmatic Matrix Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                {/* Placeholder Programmatic Entry #1 */}
                <div className="p-8 rounded-3xl bg-[#0f2129]/50 border border-cyan-500/20 hover:border-cyan-400/80 hover:-translate-y-2 transition-all duration-300 group shadow-[0_0_15px_rgba(0,255,255,0.05)] hover:shadow-[0_10px_40px_rgba(0,255,255,0.2)]">
                    <div className="w-14 h-14 bg-[#152e39] text-cyan-400 flex items-center justify-center rounded-2xl mb-6 border border-cyan-500/50 shadow-[inset_0_0_15px_rgba(0,255,255,0.3)]">
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors capitalize">Example {formattedIndustry} Group</h3>
                        <p className="text-xs uppercase tracking-widest text-slate-500 font-mono">Certificate: <span className="text-cyan-500/80">SAT-9481A</span></p>

                        <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                            <span className="text-sm font-semibold text-slate-400 capitalize">{formattedState} Region</span>
                            <a href="#" className="text-white hover:text-cyan-300 text-sm font-bold uppercase tracking-widest inline-flex items-center gap-2 group/btn">
                                Verify <svg className="w-4 h-4 translate-x-0 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Simulated empty slot for data injection */}
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center opacity-50 hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full border border-dashed border-slate-500 mb-4 flex items-center justify-center text-slate-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path></svg>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Database Linked. Awaiting Record.</span>
                </div>

            </div>

            {/* Upsell Engine Capture Context */}
            <div className="mt-24 text-center p-12 bg-purple-950/40 rounded-[2.5rem] border border-purple-500/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>
                <div className="relative z-10">
                    <h3 className="text-3xl font-black mb-4 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Are you out of compliance?</h3>
                    <p className="text-lg text-purple-200/80 mb-8 max-w-2xl mx-auto font-light leading-relaxed">
                        If you operate a <span className="text-cyan-400 font-bold capitalize">{formattedIndustry}</span> metric in <span className="text-cyan-400 font-bold capitalize">{formattedState}</span> and are currently missing your 2026 Verified Data Compliance badge, your business logic is vulnerable.
                    </p>
                    <Link href="/onboarding" className="inline-block px-10 py-5 bg-purple-600 hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_30px_rgba(0,255,255,0.4)] text-white rounded-2xl font-bold tracking-widest uppercase transition-all duration-300">
                        Deploy Secure Infrastructure
                    </Link>
                </div>
            </div>

        </div>
    );
}
