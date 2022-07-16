import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { accessACP } from './../../app/middlewares/role.middleware'

export function middleware(req: NextRequest, ev: NextFetchEvent) {
    return accessACP(req, NextResponse)
}
