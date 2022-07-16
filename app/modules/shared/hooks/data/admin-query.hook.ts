import { useQuery, UseQueryOptions } from 'react-query'
import {
    fetchAll,
    fetchById,
    fetchCount,
    fetchSelectDataWithClientQuery,
} from '../../../../apis/acp/admin.api'
import { CONTROLLER } from '../../../../utils/constants/app.constant'
import { TController } from '../../../../utils/data/data.type'
import IClientUrlParams from '../../../admin/interfaces/client-url-params.interface'
import { useAdminUrlParams } from '../../../admin/providers/admin-query.provider'
import { ISelectItem } from '../../interfaces/select-data.interface'

const fetchAllOptions: UseQueryOptions = {
    // keepPreviousData: true,
}

const RQK_FETCH_BY_ID = 'fetch-by-id'
export function useFetchById<T>(ctrl: TController, id?: string) {
    return useQuery<T>([RQK_FETCH_BY_ID, id], () => fetchById<T>(ctrl, id!), {
        notifyOnChangeProps: 'tracked',
        enabled: !!id,
    })
}

export function useAdminTableRows<T>(name: TController, options?: UseQueryOptions<T[]>) {
    const query = useAdminUrlParams()
    return useQuery<T[]>([name, query], fetchAll, {
        notifyOnChangeProps: 'tracked',
        ...(fetchAllOptions as any),
        ...options,
    })
}

export function useAdminTableCount(
    name: TController,
    query: IClientUrlParams,
    options?: UseQueryOptions<number>
) {
    return useQuery<number>([name, query, 'count'], fetchCount, {
        notifyOnChangeProps: 'tracked',
        ...options,
        keepPreviousData: true,
    })
}

export function useAdminSelectData(
    name: TController,
    query: IClientUrlParams,
    options?: UseQueryOptions<ISelectItem<string>[]>
) {
    return useQuery<ISelectItem<string>[]>([name, query], fetchSelectDataWithClientQuery, {
        ...(options as any),
    })
}

export function useCategorySelectData() {
    return useAdminSelectData(CONTROLLER.role, { _sortBy: 'name', _order: 'asc' })
}
