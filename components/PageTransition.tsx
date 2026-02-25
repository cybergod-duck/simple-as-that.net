'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [phase, setPhase] = useState<'visible' | 'fading-out' | 'fading-in'>('visible');
    const [displayChildren, setDisplayChildren] = useState(children);
    const prevPathname = useRef(pathname);

    useEffect(() => {
        // Only transition on actual route changes
        if (pathname === prevPathname.current) {
            setDisplayChildren(children);
            return;
        }
        prevPathname.current = pathname;

        // Phase 1: Fade out current content (400ms)
        setPhase('fading-out');

        const swapTimer = setTimeout(() => {
            // Phase 2: Swap content while invisible
            setDisplayChildren(children);

            // Phase 3: Fade in new content (400ms)
            requestAnimationFrame(() => {
                setPhase('fading-in');
                setTimeout(() => setPhase('visible'), 400);
            });
        }, 400);

        return () => clearTimeout(swapTimer);
    }, [pathname, children]);

    const opacity =
        phase === 'fading-out' ? 'opacity-0' :
            phase === 'fading-in' ? 'opacity-100' :
                'opacity-100';

    return (
        <div className={`w-full h-full transition-opacity duration-[400ms] ease-in-out ${opacity}`}>
            {displayChildren}
        </div>
    );
}
