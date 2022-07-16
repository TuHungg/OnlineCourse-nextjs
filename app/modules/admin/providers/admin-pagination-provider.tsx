import { useRouter } from 'next/router'
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react'
import { useAdminTableCount } from '../../shared/hooks/data/admin-query.hook'
import { IPagination } from '../../shared/interfaces/pagination.interface'
import { useAdminUrlParams } from './admin-query.provider'
import { usePageParams } from './page-params.provider'

const AdminPaginationContext = createContext<IPagination>({} as IPagination)

export const useAdminPagination = () => {
    return useContext(AdminPaginationContext)
}

const genStartPage = (pageRange: number, page: number, totalPage: number) => {
    let startAt: number
    let temp: number = Math.ceil(pageRange / 2) // 1

    if (page <= temp) startAt = 1
    else if (page > totalPage - (temp - 1)) {
        startAt = totalPage - temp
    } else startAt = page - temp + 1
    return startAt
}

const calcNewParams = (itemsPerPage: number, totalItems: number, page: number) => {
    const totalPage = Math.ceil(totalItems / itemsPerPage) || -1
    const currentPage = page > totalPage ? totalPage : page || -1
    return { totalPage, currentPage }
}

export function AdminPaginationProvider({
    params,
    children,
}: {
    params: IPagination
    children: ReactNode
}) {
    const [pagination, setPagination] = useState<IPagination>({
        ...params,
        currentPage: params.currentPage == undefined ? -1 : 1,
        totalPage: params.currentPage == undefined ? -1 : 0,
    })

    const router = useRouter()
    const clientQuery = useAdminUrlParams()
    const { ctrlName } = usePageParams()
    const { data: totalItems } = useAdminTableCount(ctrlName, { ...clientQuery })

    // ON COUNT CHANGE
    useEffect(() => {
        if (totalItems != undefined) {
            const { totalPage, currentPage } = calcNewParams(
                clientQuery._limit!,
                totalItems,
                pagination.currentPage!
            )
            setPagination((pagination) => {
                return {
                    ...pagination,
                    totalItems,
                    currentPage,
                    totalPage,
                }
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [totalItems])

    // SYNC AND GEN PAGINATION DATA
    useEffect(() => {
        const { totalPage, currentPage } = calcNewParams(
            clientQuery._limit!,
            pagination.totalItems!,
            clientQuery._page!
        )
        const start = genStartPage(pagination.pageRange, currentPage, totalPage)

        setPagination((pagination) => {
            return {
                ...pagination,
                totalPage,
                currentPage,
                itemsPerPage: clientQuery._limit!,
                start,
            }
        })
    }, [clientQuery._limit, clientQuery._page, pagination.pageRange, pagination.totalItems])

    // CHECK PAGE > TOTAL PAGE => REDIRECT TO MAX PAGE
    useEffect(() => {
        if (clientQuery._page! > -1 && pagination.totalPage! > -1) {
            if (clientQuery._page! > pagination.totalPage!) {
                router.replace({
                    pathname: router.pathname,
                    query: {
                        ...router.query,
                        _page: pagination.totalPage,
                    },
                })
            }
        }
    }, [pagination.totalPage, clientQuery._page, router])

    const state = useMemo(() => pagination, [pagination])

    return (
        <AdminPaginationContext.Provider value={state}>{children}</AdminPaginationContext.Provider>
    )
}
