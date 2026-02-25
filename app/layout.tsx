// @ts-nocheck
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '../components/ThemeProvider';
import ThemeToggle from '../components/ThemeToggle';
import FluidAI from '../components/FluidAI';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
    title: 'Simple As That | Core Network',
    description: 'Autonomous Infrastructure Deployment',
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
            <body className="antialiased min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-slate-100 font-sans transition-colors duration-500">
                <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
                    {/* Fixed Global Navigation Element for Theme Toggling */}
                    <div className="fixed top-6 right-6 z-[60] mix-blend-difference">
                        <ThemeToggle />
                    </div>
                    {children}

                    {/* Persistent Fluid Simple AI Concierge */}
                    <FluidAI />
                </ThemeProvider>
            </body>
        </html>
    );
}
