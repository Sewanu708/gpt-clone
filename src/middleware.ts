import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
    const unknownRoute = req.nextUrl.pathname.endsWith('/chats');
    if (unknownRoute) return NextResponse.redirect(new URL('/', req.url))
    return NextResponse.next()
}

export const config = {
    matcher:["/chats"]
}