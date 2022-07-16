import { useQuery, UseQueryOptions } from 'react-query'
import { fetchSelectData, fetchSelectDataWithClientQuery } from '../../../apis/acp/admin.api'
import { ISelectItem } from '../../shared/interfaces/select-data.interface'

const RQK_ROLE_SELECT_DATA = 'role-select-data'
export function useRoleSelectDataQuery(options?: UseQueryOptions<ISelectItem<string>[]>) {
    return useQuery<ISelectItem<string>[]>(RQK_ROLE_SELECT_DATA, () => fetchSelectData('roles'), {
        notifyOnChangeProps: 'tracked',
        ...options,
    })
}
