import { useQuery, UseQueryOptions } from 'react-query'
import { fetchCatsMenu } from '../../../apis/category.api'
import { ISecondLevelCatInfo } from '../providers/client-menu.provider'

export const RQK_MENU = 'menu'
export const useCatsMenuQuery = (options?: UseQueryOptions<ISecondLevelCatInfo[]>) => {
    return useQuery<ISecondLevelCatInfo[]>(RQK_MENU, fetchCatsMenu, {
        staleTime: Infinity,
        notifyOnChangeProps: ['data'],
        ...options,
    })
}
