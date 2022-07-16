import { useRouter } from 'next/router'
import IClientUrlParams from '../../admin/interfaces/client-url-params.interface'
import { getClientUrlParams } from '../../shared/hooks/url-helper.hook'

export const useStudentsUrlParams = (defaultVal: IClientUrlParams = {}) => {
    const router = useRouter()
    const query = { ...router.query }
    return getClientUrlParams(query, defaultVal, {
        defaultSearchField: 'profile.firstName',
        defaultSortField: 'timestamps.createdAt',
        defaultSortOrder: 'desc',
    })
}
