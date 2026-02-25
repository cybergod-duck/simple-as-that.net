// Force dashboard to be dynamically rendered (not prerendered at build)
export const dynamic = 'force-dynamic';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
