'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [visible, setVisible] = useState(false);
    const [displayChildren, setDisplayChildren] = useState(children);

    useEffect(() => {
        // Fade out, swap content, fade in
        setVisible(false);
        const timer = setTimeout(() => {
            setDisplayChildren(children);
            setVisible(true);
        }, 250);
        return () => clearTimeout(timer);
    }, [pathname, children]);

    // Initial mount
    useEffect(() => {
        setVisible(true);
    }, []);

    return (
        <div
            className={`w-full h-full transition-opacity duration-300 ease-in-out ${visible ? 'opacity-100' : 'opacity-0'}`}
        >
            {displayChildren}
        </div>
    );
}
