import { NextRequest } from 'next/dist/server/web/spec-extension/request'
import { NextFetchEvent, NextResponse } from 'next/server'
import { notAuthorized } from '../../app/middlewares/auth.middleware'

export function middleware(req: NextRequest, ev: NextFetchEvent) {
    return notAuthorized(req, ev, NextResponse)
}
