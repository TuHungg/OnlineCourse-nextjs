import { useRouter } from 'next/router'
import React, {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react'
import { useQueryClient } from 'react-query'
import {
    apiLogin,
    apiLogout,
    apiSignUp,
    apiVerifyEmail,
    verifyRecaptcha,
} from '../../../apis/auth.api'
import CookieHelper from '../../../utils/helpers/cookie.helper'
import Helper from '../../../utils/helpers/helper.helper'
import UrlHelper from '../../../utils/helpers/url.heper'
import { IUser } from '../../shared/interfaces/models/user.interface'
import { IUserSignUp } from '../interfaces/user-sign-up.interface'
import { RQK_AUTH_USER, useAuthUser } from '../queries/auth-user-query.hook'
interface IAuthProvider {
    state: {
        user?: IUser | null
        enableAuthFetch: boolean
    }
    methods: {
        onLogout: () => void
        onLoginWithEmailAndPassword: (email: string, password: string) => void
        onSignUp: (data: IUserSignUp) => void
        setEnableAuthFetch: (val: boolean) => void
        isHuman: (recaptchaToken: string) => Promise<boolean>
    }
}
const AuthContext = createContext<IAuthProvider>({} as IAuthProvider)

export const useAuth = () => {
    return useContext(AuthContext)
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const queryClient = useQueryClient()
    const [user, setUser] = useState<IUser | null>()
    const [enableAuthFetch, setEnableAuthFetch] = useState<boolean>(false)
    const {
        isError: isAuthUserError,
        isLoading: isAuthUserLoading,
        data: authUser,
    } = useAuthUser({
        enabled: enableAuthFetch,
    })
    const router = useRouter()

    // HANDLE SOCIAL LOGGED RESULT
    const { ['logged-token']: loggedToken } = router.query
    useEffect(() => {
        if (!!loggedToken) {
            CookieHelper.setAuthRefreshToken(loggedToken.toString())
            const url = UrlHelper.delQueryParam(router.asPath, 'logged-token')
            router.replace(url, undefined, { shallow: true }).then(() => {
                setEnableAuthFetch(true)
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedToken])
    //
    useEffect(() => {
        const { accessToken } = CookieHelper.getAuthTokens()
        if (accessToken) {
            setEnableAuthFetch(true)
            return
        }
        setUser(null)
    }, [])

    // set user
    useEffect(() => {
        if (authUser) {
            setUser(authUser)
        }
    }, [authUser])

    // handle error
    useEffect(() => {
        isAuthUserError && setUser(null)
    }, [isAuthUserError])

    // expire tokens
    useEffect(() => {
        if (enableAuthFetch && !isAuthUserError && !isAuthUserLoading && !authUser) {
            CookieHelper.removeAuthTokens()
        }
    }, [enableAuthFetch, isAuthUserError, isAuthUserLoading, authUser])

    //
    const onLogout = useCallback(async () => {
        await apiLogout()
        CookieHelper.removeAuthTokens()
        setUser(null)
    }, [])

    const onLoginWithEmailAndPassword = useCallback(
        async (email: string, password: string) => {
            const encryptedPassword = Helper.md5(password)
            const data = await apiLogin(email, encryptedPassword)
            CookieHelper.setAuthTokens(data)
            setEnableAuthFetch(true)
            queryClient.invalidateQueries(RQK_AUTH_USER)
        },
        [queryClient]
    )

    const onSignUp = useCallback(async (data: IUserSignUp) => {
        await apiSignUp({
            ...data,
            password: Helper.md5(data.password),
        })
    }, [])

    const verifyEmail = useCallback(async (code: string) => {
        await apiVerifyEmail(code)
    }, [])

    const isHuman = useCallback(async (recaptchaToken: string) => {
        const data = await verifyRecaptcha({
            secret: process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY!,
            response: recaptchaToken,
        })
        return data
    }, [])
    //
    const state: IAuthProvider = useMemo(() => {
        return {
            state: {
                user,
                enableAuthFetch,
            },
            methods: {
                onLoginWithEmailAndPassword,
                onLogout,
                onSignUp,
                setEnableAuthFetch,
                isHuman,
            },
        }
    }, [enableAuthFetch, isHuman, onLoginWithEmailAndPassword, onLogout, onSignUp, user])

    return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
}
