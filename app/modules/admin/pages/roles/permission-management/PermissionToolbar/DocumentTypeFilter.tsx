import { Select } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { ChangeEventHandler, useCallback, useEffect } from 'react'
import { useUrlHelper } from '../../../../../shared/hooks/url-helper.hook'
import { ISelectItem } from '../../../../../shared/interfaces/select-data.interface'
import { usePermissionManagementParams } from '../../../../hooks/permission-management-url-params.hook'
import { usePermissionManagement } from '../../../../providers/permission-management.provider'
import { useDocumentPermissionSelectDataQuery } from '../../../../queries/document-permission-query.hook'

export const DOCUMENT_TYPE_FILTER_KEY = 'documentType._id_filter'
export default function DocumentTypeFilter() {
    const { getUrlWithQueryParams } = useUrlHelper()
    const { data } = useDocumentPermissionSelectDataQuery()
    const router = useRouter()
    const {
        methods: { setDocumentPermissionId },
    } = usePermissionManagement()
    //
    const { [DOCUMENT_TYPE_FILTER_KEY]: value = '' } = usePermissionManagementParams()
    useEffect(() => {
        setDocumentPermissionId(value + '' || undefined)
    }, [setDocumentPermissionId, value])
    const renderOption = useCallback((item: ISelectItem<string>, i: number) => {
        return (
            <option key={i} value={item.value}>
                {item.label}
            </option>
        )
    }, [])

    const onChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
        const value = e.target.value
        //
        const url = getUrlWithQueryParams({
            [DOCUMENT_TYPE_FILTER_KEY]: value,
        })
        router.replace(url)
    }
    return (
        <Select
            placeholder="Select document type"
            w="fit-content"
            onChange={onChange}
            value={value}
        >
            {data?.map(renderOption)}
        </Select>
    )
}
