import { NextRequest } from 'next/dist/server/web/spec-extension/request'
import { NextFetchEvent, NextResponse } from 'next/server'
import { FRONTEND_DOMAIN } from '../../../app/utils/constants/app.constant'
import { apiIsValidPermissionCode } from './../../../app/apis/auth.api'

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
    const token = req.nextUrl.searchParams.get('token')
    if (!!token) {
        const isValid = await apiIsValidPermissionCode(token)
        if (isValid) {
            return NextResponse.next()
        }
    }
    return NextResponse.redirect(FRONTEND_DOMAIN + '')
}
