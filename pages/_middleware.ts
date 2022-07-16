import { NextRequest } from 'next/dist/server/web/spec-extension/request'
import { NextFetchEvent, NextResponse } from 'next/server'

export function middleware(req: NextRequest, ev: NextFetchEvent) {
    const urlRefreshToken = req.nextUrl.searchParams.get('refresh-token')
    if (urlRefreshToken) {
        const entries = req.nextUrl.searchParams.entries()
    }
    return NextResponse.next()
}
