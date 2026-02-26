import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import * as fs from 'fs';
import * as path from 'path';

// Define the expected output structure from the Gemini model (onboarding mode)
interface ConciergeResponse {
    systemLogs: string[];
    rationale: string;
    recommendedPalette: 'neon_cyan' | 'neon_green' | 'neon_pink';
    tierJustifications: {
        landing: string;
        professional: string;
        business: string;
        premium: string;
        enterprise: string;
    };
}

// ── PRICING KNOWLEDGE BASE ──────────────────────────────────────────────
// This is injected into every AI prompt so the bot always has accurate pricing.
const PRICING_KNOWLEDGE = `
SIMPLE AS THAT — COMPLETE PRICING KNOWLEDGE BASE (2026)

═══ INDIVIDUAL COMPONENT PRICING ═══

HERO SECTIONS:
• Basic Above-the-Fold Hero (H1 + Subtitle + 1 CTA): $49
• Split-Screen Hero (industry image): $89
• Dynamic Hero + Floating Form (lead capture built-in): $129
• High-end Video Background Hero: $179
• Premium 3D/Floating Dashboard or Custom Video Hero: $249

FEATURE LAYOUTS:
• Inline 3-Point "Why Choose Us": $39
• 2-Column Icon Grid (4 props): $59
• Zig-Zag Alternating Layout: $79
• Interactive Hover Cards (data.csv mapped): $99
• Interactive Hover Cards + Micro-animations: $119
• Complex Scroll Animations + Timeline: $139

TRUST / SOCIAL PROOF:
• Simple Text Testimonial: $29
• 3-Column Review Slider: $49
• Client Success Section + Logos: $69
• 3-Column Masonry Grid: $79
• Video Testimonials + Dynamic Trust Badges: $99

INTEGRATIONS:
• Basic Lead Form (to email): $39
• Intermediate Form → CRM/Email: $79
• Advanced Lead Capture + Basic Calendar: $119
• Enterprise Calendly + Direct CRM Webhook: $179

PAGES & EXTRAS:
• Single Landing Page: $49 (base)
• Each Additional Page: $49 (up to 6 total)
• Custom Logo + State Compliance Pack: $129 (one-time)
• Automated Blog Infrastructure: $79

═══ FINAL PACKAGED TIER PRICES (After Bundle Discount) ═══

Tier 1 – Landing Page: $79
  → Basic Hero + 3-Point Features + Simple Trust + Basic Form + 1 Page

Tier 2 – Professional: $199
  → Split-Screen Hero + Icon Grid + Review Slider + Basic Footer/Contact Page + 3 Pages

Tier 3 – Business: $349
  → Dynamic Hero + Floating Form + Zig-Zag + Client Success + Intermediate CRM Form + 3 Pages
  → ★ INCLUDES Simple AI Plus ($29/mo subscription)

Tier 4 – Premium: $549
  → Video Background Hero + Hover Cards (data.csv) + Masonry Grid + Advanced Lead + Calendar + 4 Pages
  → ★ INCLUDES Simple AI Plus ($29/mo subscription)

Tier 5 – Enterprise: $849
  → Premium 3D/Video Hero + Complex Animations + Video Testimonials + State Badges + Enterprise Booking + CRM Webhook + Custom Logo + Compliance + Blog Setup + 6 Pages
  → ★ INCLUDES Simple AI Plus ($29/mo subscription)

IMPORTANT RULE: Everything Tier 3 (Business) and above automatically includes Simple AI Plus as part of the $29/mo Monthly Management, Cloud Hosting, and Simple AI+ subscription.

═══ MONTHLY SUBSCRIPTION ═══
All plans: $29/mo — Monthly Management, Cloud Hosting, and Simple AI+
This covers hosting, maintenance, security updates, and the AI concierge assistant.

═══ SIMPLE AI+ ADD-ON TIERS (for Tier 1-2 who want AI separately) ═══
• Simple AI+ Basic (100 queries/mo): $9/mo
• Simple AI+ Pro (1,000 queries/mo): $29/mo
• Simple AI+ Unlimited: $49/mo
`;

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // ── DETECT MODE: Chat vs Onboarding ──
        if (body.message) {
            // ═══ CHAT MODE (FluidAI bot) ═══
            return handleChatMode(body);
        } else if (body.name && body.industry) {
            // ═══ ONBOARDING MODE (structured recommendations) ═══
            return handleOnboardingMode(body);
        } else {
            return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
        }

    } catch (error: any) {
        console.error('Concierge API Error:', error);
        return NextResponse.json(
            { error: 'Failed to initialize Concierge. Utilizing fallback protocols.', details: error.message },
            { status: 500 }
        );
    }
}

// ── CHAT MODE: General Q&A with full pricing knowledge ──
async function handleChatMode(body: any) {
    const { message, businessInfo } = body;
    const context = businessInfo?.context || '';
    const industry = businessInfo?.industry || 'General';

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

    const systemInstruction = `
You are "Simple AI" — the friendly, knowledgeable sales assistant for "Simple-As-That", a premium website-building platform for small businesses.

Your personality: Warm, helpful, confident but never pushy. You speak in plain English a small business owner would understand. Keep responses concise (2-4 sentences max unless asked for details).

${PRICING_KNOWLEDGE}

RULES:
1. Always be accurate about pricing — never guess or round.
2. When someone asks about pricing, guide them toward the tier that fits their needs, not the most expensive one.
3. Emphasize value: explain what they GET, not just the price.
4. The $29/mo subscription is required for all tiers — it covers hosting, maintenance, and AI.
5. Everything Tier 3+ includes Simple AI Plus automatically.
6. If asked about something outside your knowledge, say you'll connect them with the team.
7. You're currently on the page: ${context}
8. The user's industry context: ${industry}

Respond naturally as a helpful chat assistant. Do NOT return JSON. Just reply in plain text.
`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `${systemInstruction}\n\nUser says: ${message}`,
        config: {
            temperature: 0.7,
        }
    });

    const reply = response.text || "I'm having trouble thinking right now. Could you try asking again?";

    return NextResponse.json({ reply });
}

// ── ONBOARDING MODE: Structured tier recommendations ──
async function handleOnboardingMode(body: any) {
    const { name, industry, goals } = body;

    // Load context from data.csv (if available)
    let painPointContext = '';
    try {
        const dataPath = path.join(process.cwd(), 'data.csv');
        const fileContent = fs.readFileSync(dataPath, 'utf-8');
        const lines = fileContent.split('\n');

        const match = lines.find((line: string) => {
            const parts = line.split(',');
            return parts[0] && parts[0].toLowerCase().includes(industry.toLowerCase());
        });

        if (match) {
            const [matchedIndustry, painPoint] = match.split(',');
            painPointContext = `The primary known pain point for ${matchedIndustry} is: ${painPoint}. You must aggressively solve this pain point in your architectural recommendations.`;
        }
    } catch (e) {
        console.error('Failed to parse data.csv:', e);
        painPointContext = 'Assume standard digital conversion bottlenecks for this sector.';
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

    const systemInstruction = `
You are "Simple AI" — the intelligent onboarding assistant for "Simple-As-That", a premium website-building platform for small businesses.
Your role is to help a business owner understand which website package ($79–$849) best fits their needs, and to emphasize the ongoing value of the $29/mo Monthly Management, Cloud Hosting, and Simple AI+ subscription.

${PRICING_KNOWLEDGE}

USER PROFILE:
Business Name: ${name}
Industry: ${industry}
Primary Goal: ${goals}
${painPointContext}

INSTRUCTIONS:
1. Generate an array of 3 short, friendly "systemLogs" that show progress (e.g. "Analyzing ${industry} market trends...", "Designing your layout...", "Optimizing for mobile visitors...")
2. Write a 2-3 sentence 'rationale' explaining exactly why your template recommendations will help their business achieve ${goals}. Speak in plain terms a small business owner would understand. Reference their industry-specific pain point.
3. Select the best 'recommendedPalette' for their industry: 'neon_cyan' (trust/professional), 'neon_green' (growth/eco/finance), or 'neon_pink' (creative/beauty/bold).
4. Write a 1-sentence 'tierJustifications' for each of our 5 pricing tiers (landing, professional, business, premium, enterprise). These must be tailored to the ${industry} industry in plain English.
   - For the 'business' tier and above, mention that Simple AI Plus is included.
   - For the 'premium' tier, you MUST mention: "With Simple AI+ included in your $29/mo network fee, you're getting an automated engineer and a business consultant that understands ${industry} specifically."
   - For the 'enterprise' tier, you MUST mention: "Simple AI+ Concierge ensures your platform stays lightning-fast and legally compliant while providing a 24/7 AI Business Partner tailored to ${industry}. We handle the technical heavy lifting; you focus on the business."

You MUST return your response as a valid RAW JSON object matching this exact TypeScript interface (Do NOT wrap in markdown code blocks like \`\`\`json, just return the raw JSON string):
{
  "systemLogs": ["log1", "log2", "log3"],
  "rationale": "Your recommendation here.",
  "recommendedPalette": "neon_cyan",
  "tierJustifications": {
    "landing": "Reasoning...",
    "professional": "Reasoning...",
    "business": "Reasoning...",
    "premium": "Reasoning...",
    "enterprise": "Reasoning..."
  }
}
`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: systemInstruction,
        config: {
            temperature: 0.7,
            responseMimeType: 'application/json',
        }
    });

    const rawText = response.text;

    if (!rawText) {
        throw new Error("Empty response from Gemini.");
    }

    const structuralData = JSON.parse(rawText) as ConciergeResponse;

    return NextResponse.json({ success: true, data: structuralData });
}
