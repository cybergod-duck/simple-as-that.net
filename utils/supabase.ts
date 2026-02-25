import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

export function createClient() {
    if (!supabaseUrl || !supabaseKey) {
        // Return a mock client that won't crash the page
        return {
            auth: {
                getSession: async () => ({ data: { session: null }, error: null }),
                signInWithOtp: async () => ({ data: null, error: { message: 'Auth not configured. Please add Supabase environment variables.' } }),
                signInWithOAuth: async () => ({ data: null, error: { message: 'Auth not configured.' } }),
                signOut: async () => ({ error: null }),
            },
        } as any;
    }
    return createBrowserClient(supabaseUrl, supabaseKey);
}
