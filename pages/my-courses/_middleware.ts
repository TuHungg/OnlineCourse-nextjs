import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { authorized } from './../../app/middlewares/auth.middleware'

export function middleware(req: NextRequest, ev: NextFetchEvent) {
    return authorized(req, ev, NextResponse)
}
