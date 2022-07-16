import { createContext, ReactNode, useContext, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import IClientUrlParams from '../interfaces/client-url-params.interface'
import Helper from '../../../utils/helpers/helper.helper'
import { standardizeClientQuery } from '../../shared/hooks/url-helper.hook'

const AdminUrlParamsContext = createContext<IClientUrlParams>({} as IClientUrlParams)

export const useAdminUrlParams = () => {
    return useContext(AdminUrlParamsContext)
}

export function AdminUrlParamsProvider({
    defaultValue: defaultVal,
    children,
}: {
    defaultValue?: IClientUrlParams
    children: ReactNode
}) {
    const router = useRouter()
    const clientQuery = standardizeClientQuery(router.query as IClientUrlParams, defaultVal)
    const state = useMemo(() => clientQuery, [clientQuery])
    return <AdminUrlParamsContext.Provider value={state}>{children}</AdminUrlParamsContext.Provider>
}
