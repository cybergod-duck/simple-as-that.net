'use client';

import { useEffect, useState } from 'react';
import { createClient } from '../../utils/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface UserProfile {
    email: string;
    businessName: string;
    industry: string;
    plan: string;
    addons: string[];
}

export default function DashboardPage() {
    const supabase = createClient();
    const router = useRouter();
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push('/auth/login');
                return;
            }

            // Build profile from session metadata or defaults
            const meta = session.user.user_metadata || {};
            setUser({
                email: session.user.email || '',
                businessName: meta.business_name || 'Your Business',
                industry: meta.industry || 'General',
                plan: meta.plan || 'Starter',
                addons: meta.addons || [],
            });
            setLoading(false);
        };
        checkAuth();
    }, []);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/auth/login');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0d0521] flex items-center justify-center">
                <div className="w-12 h-12 border-2 border-purple-500/50 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0d0521] text-white">
            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-1/3 w-[600px] h-[400px] bg-purple-600/10 blur-[150px] rounded-full"></div>
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-cyan-500/5 blur-[120px] rounded-full"></div>
            </div>

            {/* Top Nav */}
            <header className="relative z-10 border-b border-purple-500/20 bg-[#0d0521]/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_#00ffff] animate-pulse"></div>
                        <div>
                            <h1 className="text-lg font-black tracking-tight">Network Operations Center</h1>
                            <p className="text-xs text-purple-300/50 font-mono tracking-widest">{user?.email}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/" className="text-sm text-purple-300/60 hover:text-white transition-colors">Home</Link>
                        <button onClick={handleSignOut} className="text-sm text-purple-300/60 hover:text-red-400 transition-colors">
                            Sign Out
                        </button>
                    </div>
                </div>
            </header>

            {/* Dashboard Content */}
            <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
                {/* Welcome */}
                <div className="mb-12">
                    <h2 className="text-3xl font-black tracking-tighter mb-2">
                        Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">{user?.businessName}</span>
                    </h2>
                    <p className="text-purple-200/50">Your {user?.industry} website is live and performing. Here's your overview.</p>
                </div>

                {/* Status Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">

                    {/* Card 1: Network Health */}
                    <div className="bg-purple-950/40 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-8 shadow-[0_0_30px_rgba(168,85,247,0.1)] hover:border-purple-400/40 transition-all duration-300">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                </div>
                                <h3 className="text-lg font-bold">Network Health</h3>
                            </div>
                            <span className="text-xs font-bold uppercase tracking-widest text-green-400 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">All Clear</span>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-2 border-b border-white/5">
                                <span className="text-sm text-purple-200/60">SSL Certificate</span>
                                <span className="text-sm font-bold text-green-400 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span> Active
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-white/5">
                                <span className="text-sm text-purple-200/60">Uptime (30 days)</span>
                                <span className="text-sm font-bold text-white">99.98%</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-white/5">
                                <span className="text-sm text-purple-200/60">Response Time</span>
                                <span className="text-sm font-bold text-cyan-400">42ms</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-sm text-purple-200/60">Last Backup</span>
                                <span className="text-sm font-bold text-white">Today, 3:00 AM</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Compliance Vault */}
                    <div className="bg-purple-950/40 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-8 shadow-[0_0_30px_rgba(168,85,247,0.1)] hover:border-purple-400/40 transition-all duration-300">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                                </div>
                                <h3 className="text-lg font-bold">Compliance Vault</h3>
                            </div>
                            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">Protected</span>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-2 border-b border-white/5">
                                <span className="text-sm text-purple-200/60">ADA Compliance</span>
                                <span className="text-sm font-bold text-green-400">Verified ✓</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-white/5">
                                <span className="text-sm text-purple-200/60">Privacy Policy</span>
                                <span className="text-sm font-bold text-green-400">Auto-Generated ✓</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-white/5">
                                <span className="text-sm text-purple-200/60">State Data Compliance</span>
                                <span className="text-sm font-bold text-cyan-400">Active</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-sm text-purple-200/60">Footer Badge</span>
                                <span className="text-sm font-bold text-white">Deployed</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 3: Asset Downloads */}
                    <div className="bg-purple-950/40 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-8 shadow-[0_0_30px_rgba(168,85,247,0.1)] hover:border-purple-400/40 transition-all duration-300">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                                </div>
                                <h3 className="text-lg font-bold">Your Assets</h3>
                            </div>
                        </div>
                        <div className="space-y-3">
                            {user?.addons.includes('logo') ? (
                                <a href="#" className="flex items-center justify-between p-4 rounded-xl bg-black/20 border border-purple-800/50 hover:border-cyan-500/50 transition-all group">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                                            <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                        </div>
                                        <div>
                                            <span className="text-sm font-bold text-white">Custom Logo Pack</span>
                                            <p className="text-xs text-purple-300/50">SVG, PNG, Favicon bundle</p>
                                        </div>
                                    </div>
                                    <svg className="w-5 h-5 text-purple-400 group-hover:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                </a>
                            ) : (
                                <div className="p-4 rounded-xl bg-black/20 border border-dashed border-purple-800/30 text-center">
                                    <p className="text-sm text-purple-300/40 mb-3">No custom logo on file.</p>
                                    <Link href="/onboarding" className="text-xs font-bold text-cyan-400 hover:text-cyan-300 uppercase tracking-widest">
                                        Add Custom Logo → $50
                                    </Link>
                                </div>
                            )}
                            <a href="#" className="flex items-center justify-between p-4 rounded-xl bg-black/20 border border-purple-800/50 hover:border-cyan-500/50 transition-all group">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                                        <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                                    </div>
                                    <div>
                                        <span className="text-sm font-bold text-white">Compliance Badge Code</span>
                                        <p className="text-xs text-purple-300/50">Copy/paste embed snippet</p>
                                    </div>
                                </div>
                                <svg className="w-5 h-5 text-purple-400 group-hover:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                            </a>
                        </div>
                    </div>

                    {/* Card 4: Billing & Plan */}
                    <div className="bg-purple-950/40 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-8 shadow-[0_0_30px_rgba(168,85,247,0.1)] hover:border-purple-400/40 transition-all duration-300">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                                </div>
                                <h3 className="text-lg font-bold">Billing & Plan</h3>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="p-4 rounded-xl bg-gradient-to-r from-purple-900/50 to-purple-800/30 border border-purple-500/30">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-xs text-purple-300/50 uppercase tracking-widest font-bold mb-1">Current Plan</p>
                                        <p className="text-2xl font-black text-white">{user?.plan}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-purple-300/50 uppercase tracking-widest font-bold mb-1">Monthly</p>
                                        <p className="text-lg font-bold text-cyan-400">$29/mo</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-white/5">
                                <span className="text-sm text-purple-200/60">Next Billing Date</span>
                                <span className="text-sm font-bold text-white">March 25, 2026</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-sm text-purple-200/60">Payment Method</span>
                                <span className="text-sm font-bold text-white">•••• 4242</span>
                            </div>
                            <a
                                href="#"
                                className="block w-full text-center py-3 border border-purple-500/30 hover:border-cyan-400/50 rounded-xl text-sm font-bold text-purple-300 hover:text-cyan-400 transition-all mt-4"
                            >
                                Manage Billing on Stripe →
                            </a>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-purple-950/40 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-8 shadow-[0_0_30px_rgba(168,85,247,0.1)]">
                    <h3 className="text-lg font-bold mb-6">Quick Actions</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Link href="/onboarding" className="p-4 rounded-xl bg-black/20 border border-purple-800/50 hover:border-cyan-500/50 transition-all text-center group">
                            <p className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">Build Another Website</p>
                            <p className="text-xs text-purple-300/40 mt-1">Start a new project</p>
                        </Link>
                        <a href="mailto:support@simple-as-that.net" className="p-4 rounded-xl bg-black/20 border border-purple-800/50 hover:border-cyan-500/50 transition-all text-center group">
                            <p className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">Contact Support</p>
                            <p className="text-xs text-purple-300/40 mt-1">We're here to help</p>
                        </a>
                        <Link href="/" className="p-4 rounded-xl bg-black/20 border border-purple-800/50 hover:border-cyan-500/50 transition-all text-center group">
                            <p className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">View Live Site</p>
                            <p className="text-xs text-purple-300/40 mt-1">See your website</p>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
