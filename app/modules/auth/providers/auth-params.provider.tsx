import React, { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react'
import CookieHelper from '../../../utils/helpers/cookie.helper'

interface IAuthParamsProvider {
    state: {
        waitingRedirectPath?: string
    }
    methods: {
        setWaitingRedirectPath: (path?: string) => void
    }
}
const AuthParamsContext = createContext<IAuthParamsProvider>({} as IAuthParamsProvider)

export const useAuthParams = () => {
    return useContext(AuthParamsContext)
}

export function AuthParamsProvider({ children }: { children: ReactNode }) {
    const [waitingRedirectPath, setWaitingPath] = useState<string>()

    const setWaitingRedirectPath = useCallback((path?: string) => {
        setWaitingPath(path)
        path ? CookieHelper.setWaitingRedirectPath(path) : CookieHelper.removeWaitingRedirectPath()
    }, [])
    //
    const state = useMemo(
        () => ({
            state: {
                waitingRedirectPath,
            },
            methods: {
                setWaitingRedirectPath,
            },
        }),
        [setWaitingRedirectPath, waitingRedirectPath]
    )
    return <AuthParamsContext.Provider value={state}>{children}</AuthParamsContext.Provider>
}
