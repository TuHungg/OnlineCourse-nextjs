import { useRouter } from 'next/router'
import IClientUrlParams from '../../admin/interfaces/client-url-params.interface'
import { standardizeClientQuery } from '../../shared/hooks/url-helper.hook'

export const useClientUrlParams = (defaultVal: IClientUrlParams = {}) => {
    const router = useRouter()
    const query = { ...router.query }
    const { searchValue } = query
    if (searchValue) {
        query._searchValue = searchValue
        query._searchField = 'basicInfo.title'
    } else {
        delete query._searchValue
        delete query._searchField
    }
    delete query.searchValue
    const clientQuery = standardizeClientQuery(query as IClientUrlParams, defaultVal)
    clientQuery._limit = 5
    !clientQuery._sortBy && (clientQuery._sortBy = 'meta.ratingCount')
    !clientQuery._order && (clientQuery._order = 'desc')
    return clientQuery
}
