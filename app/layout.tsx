// @ts-nocheck
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '../components/ThemeProvider';
import ThemeToggle from '../components/ThemeToggle';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
    title: 'Simple As That | Zero UI Concierge',
    description: 'Neo-Minimalist AI Platform Generation',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning className={inter.variable}>
            <body className="antialiased min-h-screen bg-slate-50 text-slate-900 dark:bg-[#000000] dark:text-slate-100 transition-colors duration-500 font-sans">
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    {/* Fixed Global Navigation Element for Theme Toggling */}
                    <div className="fixed top-6 right-6 z-50 mix-blend-difference">
                        <ThemeToggle />
                    </div>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
