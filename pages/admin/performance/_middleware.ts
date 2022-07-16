import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { accessPerformances } from './../../../app/middlewares/role.middleware'

export function middleware(req: NextRequest, ev: NextFetchEvent) {
    return accessPerformances(req, NextResponse)
}
