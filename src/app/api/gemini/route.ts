import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
})
export async function POST(req: NextRequest) {
    try {
        const { input } = await req.json()
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            // contents: [
            //     { role: "user", parts: [{ text   : "What's the capital of France?" }] },
            //     { role: "model", parts: [{ text: "Paris." }] },
            //     { role: "user", parts: [{ text: "And what about Germany?" }]}
            // ],
            contents: input,
            config: {
                thinkingConfig: {
                    thinkingBudget: 0, // Disables thinking
                },
            }
        });
        return NextResponse.json(response.candidates?.at(-1)?.content?.parts?.at(-1)?.text)
    } catch (error: any) {
        return NextResponse.json(
            {
                error: error?.message || "Something went wroong"
            }, { status: 500 }
        )
    }

}

