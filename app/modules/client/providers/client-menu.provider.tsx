import React, { createContext, ReactNode, useContext, useMemo, useState } from 'react'
import { useCatsMenuQuery } from '../queries/cats-menu-query.hook'

export interface ICatInfo {
    name: string
    slug: string
}

export interface ISecondLevelCatInfo extends ICatInfo {
    subCats: ICatInfo[]
}

interface ClientMenuProvider {
    state: {
        isLoading: boolean
        cats: ISecondLevelCatInfo[]
        hoveredPrimaryCat?: ISecondLevelCatInfo
    }
    methods: {
        setHoveredPrimaryCat: (val?: ISecondLevelCatInfo) => void
    }
}
const ClientMenuContext = createContext<ClientMenuProvider>({} as ClientMenuProvider)

export const useClientMenu = () => {
    return useContext(ClientMenuContext)
}

export function ClientMenuProvider({ children }: { children: ReactNode }) {
    const catsMenu = useCatsMenuQuery()
    const [hoveredPrimaryCat, setHoveredPrimaryCat] = useState<ISecondLevelCatInfo>()
    //
    const state = useMemo(
        () => ({
            state: {
                isLoading: catsMenu.isLoading,
                cats: catsMenu.data || [],
                hoveredPrimaryCat,
            },
            methods: {
                setHoveredPrimaryCat,
            },
        }),
        [catsMenu.data, catsMenu.isLoading, hoveredPrimaryCat]
    )
    return <ClientMenuContext.Provider value={state}>{children}</ClientMenuContext.Provider>
}
