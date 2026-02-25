'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="w-10 h-10 rounded-full bg-slate-200/20 backdrop-blur-md border border-white/10 animate-pulse"></div>;
    }

    const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    return (
        <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="group relative flex items-center justify-center w-12 h-12 rounded-full backdrop-blur-3xl overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] hover:scale-105 active:scale-95"
            aria-label="Toggle Theme"
        >
            {/* Dynamic Interactive Background */}
            <div className={`absolute inset-0 transition-opacity duration-500 ${isDark ? 'bg-white/10 border-white/20' : 'bg-slate-900/10 border-slate-900/20'}`}></div>

            {/* Border glow */}
            <div className={`absolute inset-0 border-2 rounded-full transition-colors duration-500 ${isDark ? 'border-white/10 group-hover:border-white/30' : 'border-slate-900/5 group-hover:border-slate-900/15'}`}></div>

            {/* Icons Context */}
            <div className="relative z-10 w-full h-full flex items-center justify-center overflow-hidden">
                <div className={`absolute transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${isDark ? 'translate-y-0 opacity-100 rotate-0' : '-translate-y-8 opacity-0 rotate-90'}`}>
                    {/* Moon Icon (Dark Mode Active) */}
                    <svg className="w-5 h-5 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
                </div>

                <div className={`absolute transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${!isDark ? 'translate-y-0 opacity-100 rotate-0' : 'translate-y-8 opacity-0 -rotate-90'}`}>
                    {/* Sun Icon (Light Mode Active) */}
                    <svg className="w-5 h-5 text-slate-900 drop-shadow-[0_0_8px_rgba(0,0,0,0.2)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                </div>
            </div>
        </button>
    );
}
