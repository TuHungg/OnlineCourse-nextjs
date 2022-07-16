import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'
import IClientUrlParams from '../../admin/interfaces/client-url-params.interface'
import { useUrlHelper } from './url-helper.hook'

export interface IFilter {
    [key: string]: string[]
}

export const useFilter = (query: IClientUrlParams) => {
    const router = useRouter()
    const { getUrlWithQueryParams } = useUrlHelper()
    const filters = useMemo(() => {
        const filters: IFilter = {}
        for (let key in query) {
            if (key.match(/_filter$/)) {
                const field: string = key.slice(0, key.indexOf('_filter'))
                const value: string[] = (query[key] + '').split(',')
                filters[field] = value
            }
        }
        return filters
    }, [query])

    const runFilter = useCallback(
        (filters: IFilter) => {
            const obj: any = {}
            for (let key in filters) {
                const field = key + '_filter'
                const val = filters[key].join(',')
                obj[field] = val.replace(/^,/, '')
            }
            const url = getUrlWithQueryParams({ ...obj, _page: '1' })
            router.push(url, undefined, { scroll: false })
        },
        [getUrlWithQueryParams, router]
    )

    const updateFilters = useCallback(
        (filters: IFilter) => {
            runFilter(filters)
        },
        [runFilter]
    )

    const updateFilter = useCallback(
        (field: string, val: string[]) => {
            let newFilters = {
                ...filters,
                [field]: val,
            }
            runFilter(newFilters)
        },
        [filters, runFilter]
    )

    const reset = useCallback(() => {
        const clearObj: any = {}
        for (let key in filters) {
            clearObj[`${key}_filter`] = ''
        }
        const url = getUrlWithQueryParams(clearObj)
        router.push(url, undefined, { scroll: false })
    }, [filters, getUrlWithQueryParams, router])
    return { filters, updateFilters, updateFilter, reset }
}
