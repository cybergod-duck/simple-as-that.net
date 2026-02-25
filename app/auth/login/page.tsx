'use client';

import { useState } from 'react';
import { createClient } from '../../../utils/supabase';
import Link from 'next/link';

export default function LoginPage() {
    const supabase = createClient();
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleMagicLink = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: `${window.location.origin}/auth/callback`,
            },
        });

        if (error) {
            setError(error.message);
        } else {
            setSent(true);
        }
        setLoading(false);
    };

    const handleGoogleLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
    };

    return (
        <div className="h-full bg-[#0d0521] flex items-center justify-center px-4 relative overflow-hidden">
            {/* Ambient Glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[200px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="w-full max-w-md relative z-10">
                {/* Logo */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-black text-white tracking-tighter mb-2">Simple As That</h1>
                    <p className="text-purple-300/60 text-sm tracking-widest uppercase font-bold">Network Operations Center</p>
                </div>

                {/* Glass Card */}
                <div className="bg-purple-950/40 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-8 shadow-[0_0_40px_rgba(168,85,247,0.15)]">

                    {sent ? (
                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 mx-auto rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                                <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                            </div>
                            <h2 className="text-2xl font-bold text-white">Check Your Email</h2>
                            <p className="text-purple-200/60">We sent a secure login link to <strong className="text-cyan-300">{email}</strong>. Click it to access your dashboard.</p>
                        </div>
                    ) : (
                        <>
                            <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
                            <p className="text-purple-200/60 text-sm mb-8">Log in to manage your website and view your network status.</p>

                            {error && (
                                <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleMagicLink} className="space-y-6">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-purple-300 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@yourbusiness.com"
                                        className="w-full bg-black/30 border border-purple-800 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl tracking-widest uppercase transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] disabled:opacity-50"
                                >
                                    {loading ? 'Sending...' : 'Send Login Link'}
                                </button>
                            </form>

                            <div className="relative my-8">
                                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-purple-800/50"></div></div>
                                <div className="relative flex justify-center text-xs uppercase"><span className="bg-purple-950/60 px-4 text-purple-400 tracking-widest font-bold">Or</span></div>
                            </div>

                            <button
                                onClick={handleGoogleLogin}
                                className="w-full py-4 bg-white/5 border border-white/10 hover:border-purple-400/50 text-white font-bold rounded-xl tracking-wide transition-all duration-300 flex items-center justify-center gap-3"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                                Continue with Google
                            </button>
                        </>
                    )}
                </div>

                <p className="text-center mt-8 text-sm text-purple-300/40">
                    Don't have an account? <Link href="/auth/signup" className="text-cyan-400 hover:text-cyan-300 font-bold">Get Started</Link>
                </p>
            </div>
        </div>
    );
}
