import React, { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react'
import QueryHelper from '../../../utils/helpers/QueryHelper'

interface ISimplePaginationProvider {
    state: {
        page: number
        hasNextPage: boolean
        hasPreviousPage: boolean
    }
    methods: {
        setPage: (val: number) => void
        onNextPage: () => void
        onPreviousPage: () => void
    }
}
const SimplePaginationContext = createContext<ISimplePaginationProvider>(
    {} as ISimplePaginationProvider
)

export const useSimplePagination = () => {
    return useContext(SimplePaginationContext)
}

export function SimplePaginationProvider({
    rowsPerPage = 5,
    totalItem = 0,
    children,
}: {
    rowsPerPage?: number
    totalItem?: number
    children: ReactNode
}) {
    const [page, setPage] = useState<number>(1)
    const onNextPage = useCallback(() => {
        setPage(page + 1)
    }, [page])
    const onPreviousPage = useCallback(() => {
        setPage(page - 1)
    }, [page])
    //
    const totalPage = QueryHelper.getTotalPage(rowsPerPage, totalItem)
    const hasPreviousPage = page > 1 && totalPage > 1
    const hasNextPage = totalPage > page
    //
    const state: ISimplePaginationProvider = useMemo(
        () => ({
            state: {
                page,
                hasNextPage,
                hasPreviousPage,
            },
            methods: {
                setPage,
                onNextPage,
                onPreviousPage,
            },
        }),
        [hasNextPage, hasPreviousPage, onNextPage, onPreviousPage, page]
    )
    return (
        <SimplePaginationContext.Provider value={state}>
            {children}
        </SimplePaginationContext.Provider>
    )
}
