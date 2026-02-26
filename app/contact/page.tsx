export const metadata = {
    title: 'Contact & Experience - Simple As That AI',
    description: 'Meet our team and get in touch. Timothy Chappell — AI Training Specialist with 3+ years of LLM optimization experience.',
};

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-[#0d0521] py-20 px-4">
            <div className="max-w-5xl mx-auto">

                {/* JSON-LD Person Schema */}
                <script type="application/ld+json" dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Person",
                        "name": "Timothy Chappell",
                        "jobTitle": "AI Training Specialist & Prompt Engineer",
                        "worksFor": { "@type": "Organization", "name": "Voss Neural Research LLC" },
                        "url": "https://simple-as-that.net/contact",
                        "sameAs": "https://www.linkedin.com/in/timothy-chappell-bb311b390/",
                        "knowsAbout": ["Prompt Engineering", "LLM Optimization", "AI Model Evaluation", "Web Design", "Small Business Solutions"],
                        "address": { "@type": "PostalAddress", "addressRegion": "SC", "addressCountry": "US" }
                    })
                }} />

                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter">Experience Meets Innovation</h1>
                    <p className="text-xl text-purple-200/60 font-light">
                        Backed by years of deep-vertical research, our platform understands the technical nuances of your specific industry.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">

                    {/* Author Bio / E-E-A-T */}
                    <div className="bg-white/[0.03] border border-purple-500/20 p-8 rounded-3xl backdrop-blur-md">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-2xl font-black text-white">TC</div>
                            <div>
                                <h2 className="text-xl font-black text-white">Timothy Chappell</h2>
                                <p className="text-xs font-bold uppercase tracking-widest text-cyan-400">AI Training Specialist & Prompt Engineer</p>
                            </div>
                        </div>

                        <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
                            <p>
                                Expert in training, evaluating, and optimizing large language models (LLMs) through advanced prompt engineering and structured feedback. 3+ years specializing in identifying model limitations and driving continuous improvement in AI outputs.
                            </p>
                            <div className="space-y-2 pt-2">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-2">Core Expertise</h3>
                                <div className="flex flex-wrap gap-2">
                                    {['Prompt Engineering', 'LLM Optimization', 'AI Model Evaluation', 'Quality Assurance', 'Bias Detection', 'Cross-Domain AI Testing'].map(skill => (
                                        <span key={skill} className="px-3 py-1 rounded-full text-xs font-bold bg-purple-900/30 border border-purple-500/20 text-purple-200">{skill}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-white/5 space-y-3">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">Company Credentials</h3>
                            <ul className="text-xs text-slate-400 space-y-2">
                                <li className="flex items-center gap-2"><span className="text-cyan-400">▸</span> Founder & Research Director — Voss Neural Research LLC</li>
                                <li className="flex items-center gap-2"><span className="text-cyan-400">▸</span> Founder & Creator — crmindex.net</li>
                                <li className="flex items-center gap-2"><span className="text-cyan-400">▸</span> Independent AI Prompt Engineer — 3+ years</li>
                                <li className="flex items-center gap-2"><span className="text-cyan-400">▸</span> Columbia, South Carolina</li>
                            </ul>
                            <a href="https://www.linkedin.com/in/timothy-chappell-bb311b390/" target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-xl border border-blue-500/30 text-blue-400 text-xs font-bold hover:bg-blue-500/10 transition-colors">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                                View LinkedIn Profile
                            </a>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white/[0.03] border border-cyan-500/20 p-8 rounded-3xl backdrop-blur-md">
                        <h2 className="text-xl font-black text-white mb-6">Get in Touch</h2>

                        <div className="mb-6 space-y-3">
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Direct Contact</h3>
                                <a href="mailto:create@simple-as-that.net" className="text-cyan-400 hover:text-cyan-300 font-bold text-sm">
                                    create@simple-as-that.net
                                </a>
                            </div>
                        </div>

                        <form className="space-y-4 border-t border-white/5 pt-6">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Name</label>
                                <input type="text" className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-cyan-400/50" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Email</label>
                                <input type="email" className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-cyan-400/50" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Message</label>
                                <textarea rows={4} className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-cyan-400/50"></textarea>
                            </div>
                            <button type="button" className="w-full py-4 rounded-xl font-bold tracking-widest uppercase bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg hover:shadow-xl transition-all">
                                Send Message
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}
