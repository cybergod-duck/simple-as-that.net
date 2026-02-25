'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(true);
    const [currentChildren, setCurrentChildren] = useState(children);
    const [currentPath, setCurrentPath] = useState(pathname);

    useEffect(() => {
        if (pathname !== currentPath) {
            // New page detected — fade out
            setIsVisible(false);

            // After fade-out completes, swap content and fade in
            const timer = setTimeout(() => {
                setCurrentChildren(children);
                setCurrentPath(pathname);
                // Small delay to ensure DOM updates before fade-in
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        setIsVisible(true);
                    });
                });
            }, 350);

            return () => clearTimeout(timer);
        } else {
            // Same path, just update children (e.g. state changes within page)
            setCurrentChildren(children);
        }
    }, [pathname, children, currentPath]);

    return (
        <div
            style={{
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 350ms ease-in-out',
                width: '100%',
                height: '100%',
            }}
        >
            {currentChildren}
        </div>
    );
}
