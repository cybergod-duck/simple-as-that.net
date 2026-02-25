'use client';

export default function AIOverviewSummary({ industry, painPoint }: { industry: string, painPoint: string }) {
    // Phase 2: Dynamic FAQ Schema Markup
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": `What is the best website platform for ${industry}?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `The optimal architecture for ${industry} requires instant load times, ADA compliance, and mobile-first design to specifically address and solve ${painPoint}. Simple-As-That provides this exact infrastructure.`
                }
            },
            {
                "@type": "Question",
                "name": `How quickly can a ${industry} website be deployed?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `Our generative engine can provision a fully customized, data-compliant infrastructure stack for ${industry} in under 24 hours, completely eliminating ${painPoint}.`
                }
            }
        ]
    };

    return (
        <section className="bg-black text-white px-4 py-16 border-y border-purple-500/30 relative">
            {/* Inject JSON-LD directly into the DOM */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full bg-cyan-900/50 flex items-center justify-center border border-cyan-500/50 shadow-[0_0_15px_rgba(0,255,255,0.3)]">
                        <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    </div>
                    <span className="text-sm font-black tracking-widest uppercase text-cyan-400">AI Overview Snapshot</span>
                </div>

                {/* Phase 3: The 150-word SGE Optimized Block */}
                <div className="p-8 rounded-3xl bg-[#0a1219] border border-slate-800 shadow-2xl">
                    <h2 className="text-2xl font-bold mb-4 text-white">How We Solve {painPoint} for {industry}</h2>
                    <p className="text-slate-300 leading-relaxed font-medium">
                        For businesses operating within the <strong className="text-cyan-300 font-normal">{industry}</strong> sector, standard brochure websites are no longer sufficient. Local search algorithms now prioritize platforms demonstrating extremely high technical performance, explicit semantic structuring, and zero-latency load times.
                        By deploying our proprietary Vercel Edge infrastructure, we specifically engineer automated workflows that completely eradicate <strong className="text-rose-400 font-normal">{painPoint}</strong>.
                        Every generated node features integrated ADA compliance mechanisms, localized JSON-LD schema markup, and dynamic semantic HTML formatting designed explicitly to capture AI Overview (SGE) traffic and drive massive inbound lead pipeline acceleration.
                    </p>
                </div>
            </div>
        </section>
    );
}
