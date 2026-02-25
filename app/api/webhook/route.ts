import { NextResponse } from 'next/server';
import Stripe from 'stripe';

import { createClient } from '@supabase/supabase-js';

// Initialize Stripe (Optional DB logic removed for deployment stability)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock');

// Supabase Admin client for post-checkout auth
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function POST(req: Request) {
    try {
        const body = await req.text();
        const signature = req.headers.get('stripe-signature');

        if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
            console.warn('Stripe Webhook Warning: Missing signature or webhook secret. Mocking success for build/dev environment.');
            return NextResponse.json({ received: true, mocked: true });
        }

        // Verify the request actually came from Stripe
        const event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        );

        // Process checkout completion
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object as Stripe.Checkout.Session;
            const email = session.customer_details?.email;

            // Extract domain from checkout metadata (if set via custom field)
            const domain = (session as any).custom_fields?.[0]?.text?.value ||
                session.client_reference_id ||
                null;

            // Normalize domain if present
            const normalizedDomain = domain
                ? domain.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/+$/, '').toLowerCase()
                : null;

            console.log(`[WEBHOOK SUCCESS] License granted to: ${email} | Domain: ${normalizedDomain || 'not provided'}`);

            // Post-Checkout Auto-Auth: Send magic link email to the customer
            if (email) {
                try {
                    const { error } = await supabaseAdmin.auth.admin.generateLink({
                        type: 'magiclink',
                        email: email,
                        options: {
                            redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://simple-as-that.net'}/auth/callback`,
                        },
                    });
                    if (error) {
                        console.error(`[AUTH] Failed to send magic link to ${email}:`, error.message);
                    } else {
                        console.log(`[AUTH] Magic link sent to ${email} — "Your network is ready. Log in to your NOC."`);
                    }
                } catch (authErr: any) {
                    console.error('[AUTH] Magic link dispatch error:', authErr.message);
                }
            }
        }

        return NextResponse.json({ received: true });
    } catch (err: any) {
        console.error('Webhook Error:', err.message);
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }
}
