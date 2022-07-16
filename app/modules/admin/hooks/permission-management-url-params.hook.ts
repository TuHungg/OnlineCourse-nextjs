import { useRouter } from 'next/router'
import IClientUrlParams from '../interfaces/client-url-params.interface'
import { getClientUrlParams } from '../../shared/hooks/url-helper.hook'

export const usePermissionManagementParams = (defaultVal: IClientUrlParams = {}) => {
    const router = useRouter()
    const query = { ...router.query }
    return getClientUrlParams(query, defaultVal, {
        defaultSearchField: '',
        defaultSortField: 'name',
        defaultSortOrder: 'desc',
        defaultLimit: 1000,
    })
}
