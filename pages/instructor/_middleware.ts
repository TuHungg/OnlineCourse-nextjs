import { NextRequest } from 'next/dist/server/web/spec-extension/request'
import { NextFetchEvent, NextResponse } from 'next/server'
import { accessICP } from './../../app/middlewares/role.middleware'

export function middleware(req: NextRequest, ev: NextFetchEvent) {
    return accessICP(req, NextResponse)
}
