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
    title: 'Simple As That | Beautiful Websites for Small Business — Website Design 2026',
    description: 'We build beautiful, fast websites for small businesses. AI-powered design, instant deployment, starting at $99. Get your business online today.',
    keywords: ['website design', 'small business website', 'web design 2026', 'affordable website', 'website builder', 'AI website', 'simple as that'],
    metadataBase: new URL('https://simple-as-that.net'),
    alternates: {
        canonical: 'https://simple-as-that.net',
    },
    openGraph: {
        title: 'Simple As That | Beautiful Websites for Small Business',
        description: 'AI-powered website design for small businesses. Tell us what you need, we build it — starting at $99.',
        url: 'https://simple-as-that.net',
        siteName: 'Simple As That',
        type: 'website',
        locale: 'en_US',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Simple As That | Website Design for Small Business',
        description: 'AI-powered website design starting at $99. Beautiful, fast, deployed today.',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
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
            <head>
                <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&true)){document.documentElement.classList.add('dark')}}catch(e){}})()` }} />
            </head>
            <body className="antialiased h-screen overflow-hidden bg-black dark:bg-black text-slate-900 dark:text-slate-100 font-sans transition-colors duration-500 flex flex-col" style={{ backgroundColor: '#000000' }}>
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
                    <main className="flex-1 relative overflow-y-auto">
                        <PageTransition>
                            {children}
                        </PageTransition>
                    </main>

                    {/* ── FLOATING THEME TOGGLE (bottom-left, above footer) ── */}
                    <div className="fixed bottom-16 left-6 z-50">
                        <ThemeToggle />
                    </div>

                    {/* ── STATIC BLACK FOOTER BAR ── */}
                    <footer className="w-full px-6 md:px-10 py-4 flex justify-between items-center z-50 bg-black border-t border-white/5 text-xs font-medium tracking-widest uppercase text-slate-600 shrink-0">
                        <div>©2026 Voss Neural Research LLC</div>
                        <div className="flex items-center gap-6">
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
