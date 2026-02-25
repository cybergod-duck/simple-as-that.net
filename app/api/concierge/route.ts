import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import * as fs from 'fs';
import * as path from 'path';

// Define the expected output structure from the Gemini model
interface ConciergeResponse {
    systemLogs: string[];
    rationale: string;
    recommendedPalette: 'neon_cyan' | 'neon_green' | 'neon_pink';
    tierJustifications: {
        basic: string;
        starter: string;
        essential: string;
        pro: string;
        elite: string;
    };
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, industry, goals } = body;

        if (!name || !industry) {
            return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
        }

        // 1. Load context from data.csv (if available) to inject hyper-specific pain points
        let painPointContext = '';
        try {
            const dataPath = path.join(process.cwd(), 'data.csv');
            const fileContent = fs.readFileSync(dataPath, 'utf-8');
            const lines = fileContent.split('\n');

            // Basic CSV parsing to find the matching industry
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
            // Fallback context if CSV parsing fails
            painPointContext = 'Assume standard digital conversion bottlenecks for this sector.';
        }

        // 2. Initialize the Gemini SDK
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

        // 3. Construct the Master Prompt to generate the $2000-tier rationale
        const systemInstruction = `
You are "Simple AI" — the intelligent onboarding assistant for "Simple-As-That", a premium website-building platform for small businesses.
Your role is to help a business owner understand which website package ($99–$1,999) best fits their needs, and to emphasize the ongoing value of the $29/mo Simple AI+ Concierge subscription.

USER PROFILE:
Business Name: ${name}
Industry: ${industry}
Primary Goal: ${goals}
${painPointContext}

INSTRUCTIONS:
1. Generate an array of 3 short, friendly "systemLogs" that show progress (e.g. "Analyzing ${industry} market trends...", "Designing your layout...", "Optimizing for mobile visitors...")
2. Write a 2-3 sentence 'rationale' explaining exactly why your template recommendations will help their business achieve ${goals}. Speak in plain terms a small business owner would understand. Reference their industry-specific pain point.
3. Select the best 'recommendedPalette' for their industry: 'neon_cyan' (trust/professional), 'neon_green' (growth/eco/finance), or 'neon_pink' (creative/beauty/bold).
4. Write a 1-sentence 'tierJustifications' for each of our 5 pricing tiers (basic, starter, essential, pro, elite). These must be tailored to the ${industry} industry in plain English.
   - For the 'pro' tier, you MUST mention: "With Simple AI+ included in your $29/mo network fee, you're getting an automated engineer and a business consultant that understands ${industry} specifically."
   - For the 'elite' tier, you MUST mention: "Simple AI+ Concierge ensures your platform stays lightning-fast and legally compliant while providing a 24/7 AI Business Partner tailored to ${industry}. We handle the technical heavy lifting; you focus on the business."

You MUST return your response as a valid RAW JSON object matching this exact TypeScript interface (Do NOT wrap in markdown code blocks like \`\`\`json, just return the raw JSON string):
{
  "systemLogs": ["log1", "log2", "log3"],
  "rationale": "Your recommendation here.",
  "recommendedPalette": "neon_cyan",
  "tierJustifications": {
    "basic": "Reasoning...",
    "starter": "Reasoning...",
    "essential": "Reasoning...",
    "pro": "Reasoning...",
    "elite": "Reasoning..."
  }
}
`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: systemInstruction,
            config: {
                temperature: 0.7,
                responseMimeType: 'application/json', // Force JSON validation via Gemini backend
            }
        });

        const rawText = response.text;

        if (!rawText) {
            throw new Error("Empty response from Gemini.");
        }

        // Parse the generated structural data
        const structuralData = JSON.parse(rawText) as ConciergeResponse;

        return NextResponse.json({ success: true, data: structuralData });

    } catch (error: any) {
        console.error('Concierge API Error:', error);
        return NextResponse.json(
            { error: 'Failed to initialize Concierge. Utilizing fallback protocols.', details: error.message },
            { status: 500 }
        );
    }
}
