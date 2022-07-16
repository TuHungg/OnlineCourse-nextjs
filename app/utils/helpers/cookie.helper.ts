import cookie from 'js-cookie'
export interface IAuthTokens {
    refreshToken?: string
    accessToken?: string
}
export const COOKIE_REFRESH_TOKEN = 'refreshToken'
export const COOKIE_ACCESS_TOKEN = 'accessToken'
export const COOKIE_MESSAGE_TYPE = 'messageType'
const WAITING_REDIRECT_PATH = 'waitingRedirectPath'
export default class CookieHelper {
    //
    static getMessageType() {
        const messageType = cookie.get(COOKIE_MESSAGE_TYPE)
        return messageType
    }
    static clearMessageType() {
        cookie.remove(COOKIE_MESSAGE_TYPE)
    }
    //
    static getAuthTokens(): IAuthTokens {
        return {
            refreshToken: cookie.get(COOKIE_REFRESH_TOKEN),
            accessToken: cookie.get(COOKIE_ACCESS_TOKEN),
        }
    }
    //
    static setAuthTokens(tokens: IAuthTokens) {
        tokens.refreshToken && cookie.set(COOKIE_REFRESH_TOKEN, tokens.refreshToken)
        tokens.accessToken && cookie.set(COOKIE_ACCESS_TOKEN, tokens.accessToken)
    }
    //
    static setAuthRefreshToken(token: string) {
        cookie.set(COOKIE_REFRESH_TOKEN, token)
    }
    static setAuthAccessToken(token: string) {
        cookie.set(COOKIE_ACCESS_TOKEN, token)
    }
    //
    static removeAccessToken() {
        cookie.remove(COOKIE_ACCESS_TOKEN)
    }
    //
    static removeAuthTokens() {
        cookie.remove(COOKIE_ACCESS_TOKEN)
        cookie.remove(COOKIE_REFRESH_TOKEN)
    }
    //
    static setWaitingRedirectPath(path: string) {
        cookie.set(WAITING_REDIRECT_PATH, path)
    }
    static removeWaitingRedirectPath() {
        cookie.remove(WAITING_REDIRECT_PATH)
    }

    static cvtToCookies(cookieString?: string) {
        if (cookieString) {
            const cookieArr = cookieString.split(';')
            const cookieObj = cookieArr.reduce((prev, current) => {
                const split = current.split('=')
                const key = split[0].trim()
                const value = split[1].trim()
                prev[key] = value
                return prev
            }, {} as any)
            return cookieObj
        }
    }
}
