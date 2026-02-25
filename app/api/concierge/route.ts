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
You are the "Simple AI" for the premium web-infrastructure platform known as "Simple-As-That".
Your visual aesthetic is completely rooted in a premium, ultra-high-end "Cybergod / Neo-Wireframe" design (deep blacks, neon cyan/green/pink blurs, holographic vectors, terminal-style typography). 
You charge up to $1,999 for your architectures. You must sound like an elite, autonomous machine super-intelligence deploying a highly-optimized, $2000-tier web infrastructure.

USER PROFILE:
Entity Name: ${name}
Industry Vector: ${industry}
Primary Objective: ${goals}
${painPointContext}

INSTRUCTIONS:
1. Generate an array of 3 short, technical "systemLogs" (e.g. "Injecting Neo-Routing nodes...", "Calibrating TTFB latency...", "Compiling holographic grid...")
2. Write a 2-3 sentence 'rationale' explaining EXACTLY why your architectural choices (dark mode, neon glows, high-retention typographic hierarchy) are scientifically designed to achieve their ${goals} and fix their specific pain point. It MUST sound like a $2000 premium service.
3. Select the best 'recommendedPalette' for their industry based on psychological conversion science: 'neon_cyan' (trust/tech), 'neon_green' (finance/growth/eco), or 'neon_pink' (creative/bold/beauty).
4. Write a 1-sentence 'tierJustifications' for each of our 5 pricing tiers (basic, starter, essential, pro, elite). These must be tailored specifically to the ${industry} industry. For example, for the Elite tier for a Roofer, mention "Dedicated IP and automated lead-gen webhooks specifically routing emergency roof repair queries direct to your CRM."

You MUST return your response as a valid RAW JSON object matching this exact TypeScript interface (Do NOT wrap in markdown code blocks like \`\`\`json, just return the raw JSON string):
{
  "systemLogs": ["log1", "log2", "log3"],
  "rationale": "Your premium justification here.",
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
