import { useQuery, UseQueryOptions } from 'react-query'
import { fetchSelectData, fetchSelectDataWithClientQuery } from '../../../apis/acp/admin.api'
import { ISelectItem } from '../../shared/interfaces/select-data.interface'

const RQK_DOCUMENT_PERMISSION_SELECT_DATA = 'document-permission-select-data'
export function useDocumentPermissionSelectDataQuery(
    options?: UseQueryOptions<ISelectItem<string>[]>
) {
    return useQuery<ISelectItem<string>[]>(
        RQK_DOCUMENT_PERMISSION_SELECT_DATA,
        () => fetchSelectData('document-permission'),
        {
            notifyOnChangeProps: 'tracked',
            ...options,
        }
    )
}
