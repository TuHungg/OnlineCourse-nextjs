import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import { createContext, useContext, ReactNode, useMemo } from 'react'

type TAdminParams = {
    subPaths: string[]
    page: string
    params: ParsedUrlQuery
}
const AdminParamsContext = createContext<TAdminParams>({} as TAdminParams)
export const useAdminParams = () => {
    return useContext(AdminParamsContext)
}
export default function AdminParamsProvider({ children }: { children: ReactNode }) {
    const router = useRouter()
    const subPaths = router.pathname.split('/').slice(1)
    const state = useMemo(
        () => ({
            subPaths,
            page: router.pathname,
            params: router.query,
        }),
        [router.pathname, router.query, subPaths]
    )
    return <AdminParamsContext.Provider value={state}>{children}</AdminParamsContext.Provider>
}
