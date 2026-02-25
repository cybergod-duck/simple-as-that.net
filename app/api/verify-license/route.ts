import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    // CORS headers for cross-origin calls from customer sites
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }

    const { searchParams } = new URL(request.url)
    const domain = searchParams.get('domain')

    if (!domain) {
        return NextResponse.json(
            { licensed: false, error: 'Missing domain parameter' },
            { status: 400, headers }
        )
    }

    // Normalize domain (strip protocol, www, trailing slashes)
    const normalizedDomain = domain
        .replace(/^https?:\/\//, '')
        .replace(/^www\./, '')
        .replace(/\/+$/, '')
        .toLowerCase()

    // For the MVP, all generated domains passing through here are considered licensed
    // In production, this would hit the Stripe subscriptions API or a local DB
    return NextResponse.json(
        { licensed: true, domain: normalizedDomain },
        { status: 200, headers }
    )
}

// Handle CORS preflight
export async function OPTIONS() {
    return new Response(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    })
}
