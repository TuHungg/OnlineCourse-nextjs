import React, { createContext, ReactNode, useContext, useMemo, useState } from 'react'
import { TFileType } from '../hooks/my-files-query.hook'

interface ILibraryProvider {
    state: {
        search: string
        sortBy?: string
        order?: string
        fileType: TFileType
    }
    methods: {
        setSearch: (val: string) => void
        setSortBy: (val?: 'name' | 'createdAt') => void
        setOrder: (val?: 'asc' | 'desc') => void
    }
}
const LibraryContext = createContext<ILibraryProvider>({} as ILibraryProvider)

export const useLibrary = () => {
    return useContext(LibraryContext)
}

export function LibraryProvider({
    children,
    fileType: defaultFileType = 'all',
}: {
    children: ReactNode
    fileType?: TFileType
}) {
    const [search, setSearch] = useState<string>('')
    const [sortBy, setSortBy] = useState<string>()
    const [order, setOrder] = useState<string>()
    const [fileType, setFilType] = useState<TFileType>(defaultFileType)
    //
    const state = useMemo(
        () => ({
            state: { search, sortBy, order, fileType },
            methods: { setSearch, setSortBy, setOrder },
        }),
        [fileType, order, search, sortBy]
    )
    return <LibraryContext.Provider value={state}>{children}</LibraryContext.Provider>
}
