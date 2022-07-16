import jwt from '@tsndr/cloudflare-worker-jwt'
import { apiRefreshToken } from '../apis/auth.api'
import IJwtUser from '../modules/auth/interfaces/jwt-user.interface'
import { FRONTEND_DOMAIN } from '../utils/constants/app.constant'
import { TDocumentName, TPermission } from '../utils/constants/role.constant'
import { hasPermission } from '../utils/helpers/model-helpers/user.helper.'
import { LOGIN_PATH } from './middleware.constant'

// HELPER FUNCTIONS
export const decodeJwtUser = async (accessToken?: string): Promise<IJwtUser | null> => {
    if (accessToken) {
        const secretKey = (process.env as any).JWT_SECRET_TOKEN
        const verified = await jwt.verify(accessToken, secretKey)
        if (verified) {
            const data = await jwt.decode(accessToken)
            return (data as any)?.sub
        }
    }
    return null
}
export const isAuthenticated = async (req: any, ev: any, res: any) => {
    const user = await decodeJwtUser(req.cookies.accessToken)
    return !!user
}

// MIDDLEWARE
export const canAccess = async (
    req: any,
    res: any,
    documentName: TDocumentName,
    permission: TPermission,
    onlyForCreator: boolean = false
) => {
    let accessToken = req.cookies.accessToken
    const refreshToken = req.cookies.refreshToken
    let refreshed = false
    try {
        if (!accessToken) {
            if (!refreshToken) return res.redirect(`${FRONTEND_DOMAIN}${LOGIN_PATH}`)
            refreshed = true
            accessToken = await apiRefreshToken(refreshToken)
        }
        let user = await decodeJwtUser(accessToken)
        if (!user && !refreshed && !!refreshToken) {
            accessToken = await apiRefreshToken(refreshToken)
            user = await decodeJwtUser(accessToken)
        }
        // has user
        if (!!user) {
            // has permission
            if (hasPermission(user.role.permissions, documentName, permission, onlyForCreator)) {
                return res.next().cookie('accessToken', accessToken)
            }
        }
        return res.redirect(FRONTEND_DOMAIN)
    } catch (e: any) {
        return res.redirect(FRONTEND_DOMAIN)
    }
}

export const authorized = async (req: any, ev: any, res: any) => {
    const isLogged = await isAuthenticated(req, ev, res)
    if (!isLogged) {
        const url = `${FRONTEND_DOMAIN}${LOGIN_PATH}`
        return res.redirect(url)
    }
    return res.next()
}

export const notAuthorized = async (req: any, ev: any, res: any) => {
    const isLogged = await isAuthenticated(req, ev, res)
    if (isLogged) {
        const url = `${FRONTEND_DOMAIN}`
        return res.redirect(url)
    }
    return res.next()
}
