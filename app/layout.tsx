// @ts-nocheck
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '../components/ThemeProvider';
import FluidAI from '../components/FluidAI';
import PageTransition from '../components/PageTransition';
import ThemeToggle from '../components/ThemeToggle';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
    title: 'Simple As That | Core Network',
    description: 'Beautiful, fast websites for small businesses.',
    icons: {
        icon: [
            { url: '/favicon_io/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
            { url: '/favicon_io/favicon-16x16.png', sizes: '16x16', type: 'image/png' }
        ],
        apple: [
            { url: '/favicon_io/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
        ]
    }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning className={`${inter.variable}`}>
            <body className="antialiased h-screen overflow-hidden bg-slate-50 dark:bg-black text-slate-900 dark:text-slate-100 font-sans transition-colors duration-500 flex flex-col">
                <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>

                    {/* ── STATIC BLACK HEADER BAR ── */}
                    <header className="w-full px-6 md:px-10 py-4 flex justify-between items-center z-50 bg-black border-b border-white/5 shrink-0">
                        <Link href="/" className="flex items-center gap-3 cursor-pointer">
                            <img src="/favicon_io/favicon-32x32.png" alt="Logo" className="w-7 h-7" />
                            <span className="font-bold tracking-tight text-white text-sm md:text-base">Simple As That</span>
                        </Link>
                        <Link href="/auth/login" className="text-xs font-bold uppercase tracking-widest text-purple-300/60 hover:text-white transition-colors">
                            Login
                        </Link>
                    </header>

                    {/* ── MIDDLE CONTENT (fades between pages) ── */}
                    <main className="flex-1 relative overflow-hidden">
                        <PageTransition>
                            {children}
                        </PageTransition>
                    </main>

                    {/* ── STATIC BLACK FOOTER BAR ── */}
                    <footer className="w-full px-6 md:px-10 py-4 flex justify-between items-center z-50 bg-black border-t border-white/5 text-xs font-medium tracking-widest uppercase text-slate-600 shrink-0">
                        <div>©2026 Voss Neural Research LLC</div>
                        <div className="flex items-center gap-6">
                            <ThemeToggle />
                            <Link href="/onboarding" className="hover:text-purple-400 transition-colors">Get Started</Link>
                            <Link href="/privacy" className="hover:text-cyan-400 transition-colors">Privacy</Link>
                        </div>
                    </footer>

                    {/* Persistent Fluid Simple AI Concierge */}
                    <FluidAI />
                </ThemeProvider>
            </body>
        </html>
    );
}
