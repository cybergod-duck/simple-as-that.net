import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export function createClient() {
    if (!supabaseUrl || !supabaseKey) {
        // Return a mock client that won't crash the page
        // Auth pages will show an error state instead of crashing
        return {
            auth: {
                getSession: async () => ({ data: { session: null }, error: null }),
                signInWithOtp: async () => ({ data: null, error: { message: 'Auth not configured. Please add Supabase environment variables.' } }),
                signInWithOAuth: async () => ({ data: null, error: { message: 'Auth not configured.' } }),
                signOut: async () => ({ error: null }),
                admin: { generateLink: async () => ({ data: null, error: { message: 'Not configured' } }) },
            },
        } as any;
    }
    return createBrowserClient(supabaseUrl, supabaseKey);
}
