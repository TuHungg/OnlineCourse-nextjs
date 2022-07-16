import { useDeepCompareCallback, useDeepCompareMemo } from './app.hook'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import Helper from '../../../utils/helpers/helper.helper'
import IClientUrlParams from '../../admin/interfaces/client-url-params.interface'
import { TSort } from '../types/sort.type'

export const getClientUrlParams = (
    query: any,
    defaultVal: IClientUrlParams,
    {
        defaultSearchField,
        defaultSortField,
        defaultSortOrder,
        defaultLimit = 5,
    }: {
        defaultSearchField: string
        defaultSortField: string
        defaultSortOrder: TSort
        defaultLimit?: number
    }
) => {
    const { _searchValue } = query
    if (_searchValue) {
        query._searchValue = _searchValue
        query._searchField = defaultSearchField
    } else {
        delete query._searchValue
        delete query._searchField
    }
    delete query.searchValue
    const clientQuery = standardizeClientQuery(query as IClientUrlParams, defaultVal)
    clientQuery._limit = defaultLimit
    !clientQuery._sortBy && (clientQuery._sortBy = defaultSortField)
    !clientQuery._order && (clientQuery._order = defaultSortOrder)
    return clientQuery
}
export const standardizeClientQuery = (
    clientQuery: IClientUrlParams,
    defaultVal: IClientUrlParams = {}
): IClientUrlParams => {
    let {
        _page = defaultVal._page,
        _sortBy = defaultVal._sortBy,
        _order = defaultVal._order,
        _limit = defaultVal._limit,
        _searchField = defaultVal._searchField,
        _searchValue = defaultVal._searchValue,
        ...rest
    } = clientQuery

    // page
    _page = Helper.cvtNumber(_page, 1)
    _page = _page <= 0 ? 1 : _page

    // limit
    _limit = Helper.cvtNumber(_limit, 1)
    _limit = _limit <= 0 ? 1 : _limit

    //sort
    let sortObj: any = { _sortBy, _order }
    if (!_sortBy || !_order) sortObj = {}

    //search
    let search: any = {}
    if (!!_searchField) {
        search = { _searchField, _searchValue }
    }
    return {
        ...rest,
        ...sortObj,
        ...search,
        _page,
        _limit,
    }
}

const getUrlWithQueryString = (
    query: { [key: string]: string | string[] | undefined },
    pathname: string
): string => {
    const searchParams = new URLSearchParams()
    for (let key in query) {
        const val = (query as any)[key]
        if (val.trim && val.trim() != '') searchParams.set(key, val)
        else searchParams.delete(key)
    }
    // pathname = pathname.replace(/\[\.\.\.|\]/g, '')
    return `${pathname}?${searchParams.toString()}`
}

export const useUrlHelper = () => {
    const router = useRouter()
    const getUrlWithQueryParams = useCallback(
        (params: { [key: string]: string }) => {
            const [pathname] = router.asPath.split('?')
            return getUrlWithQueryString({ ...router.query, ...params }, pathname)
        },
        [router.asPath, router.query]
    )
    return { getUrlWithQueryParams }
}
