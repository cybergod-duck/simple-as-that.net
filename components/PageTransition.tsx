'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [fadeKey, setFadeKey] = useState(0);

    useEffect(() => {
        setFadeKey(prev => prev + 1);
    }, [pathname]);

    return (
        <div
            key={fadeKey}
            className="w-full h-full animate-[pageIn_0.5s_ease-in-out]"
        >
            {children}
        </div>
    );
}
