import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
})
export async function POST(req: NextRequest) {
    try {
        const {chats } = await req.json()
        const data = format(chats)
        const modelinputs = [...data, { role: 'user', parts: [{ text: 'return a concise title for this chat. maximum of seven words. Return just one' }] }]
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: modelinputs,
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

interface chat {
    id: string,
    user: string,
    model: string
}
const format = (chats: chat[]) => {
    const formatted = chats.reduce((accum, chat) => {
        const user = { role: 'user', parts: [{ text: chat.user }] }
        const model = { role: 'model', parts: [{ text: chat.model }] }
        accum.push(user, model)
        return accum
    }, [] as {role:string, parts:{}[]}[])

    return formatted
}




