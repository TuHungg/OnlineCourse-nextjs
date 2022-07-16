import { ISelectItem } from '../../interfaces/select-data.interface'
import { ICategory } from '../../interfaces/models/category.interface'
import { useQuery, UseQueryOptions } from 'react-query'
import { fetchPrimarySelectData, fetchSubSelectData } from '../../../../apis/category.api'

export const RQK_CATEGORY_PRIMARY_SELECT_DATA = 'categories-primary-select-data'
export const useCatPrimarySelectData = (options?: UseQueryOptions<ISelectItem<string>[]>) => {
    return useQuery<ISelectItem<string>[]>(
        RQK_CATEGORY_PRIMARY_SELECT_DATA,
        fetchPrimarySelectData,
        {
            notifyOnChangeProps: ['data'],
            ...options,
        }
    )
}

export const RQK_CATEGORY_SUB_SELECT_DATA = 'categories-sub-select-data'
export const useCatSubSelectData = (
    parentId: string,
    options?: UseQueryOptions<ISelectItem<string>[]>
) => {
    return useQuery<ISelectItem<string>[]>(
        [RQK_CATEGORY_SUB_SELECT_DATA, parentId],
        () => fetchSubSelectData(parentId),
        {
            notifyOnChangeProps: ['data'],
            enabled: !!parentId,
            ...options,
        }
    )
}
