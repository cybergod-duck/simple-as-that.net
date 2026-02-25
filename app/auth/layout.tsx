// Force all auth pages to be dynamically rendered (not prerendered at build)
export const dynamic = 'force-dynamic';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
