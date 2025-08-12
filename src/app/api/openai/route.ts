import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req: NextRequest) {
    try {
        // console.log('req',req)
        // const { input } = await req.json()
        const input = "Hello world"
        console.log(input);
        const response = await openai.responses.create({
            model: "gpt-4o-mini",
            input: [{ role: 'user', content: input }]
        });

        return NextResponse.json(response)
    } catch (error: any) {
        return NextResponse.json(
            { error: error?.message || "Something went wrong" },
            { status: 500 }
        )
    }
}