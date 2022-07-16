import { Select } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { ChangeEventHandler, useCallback, useEffect } from 'react'
import { useUrlHelper } from '../../../../../shared/hooks/url-helper.hook'
import { ISelectItem } from '../../../../../shared/interfaces/select-data.interface'
import { usePermissionManagementParams } from '../../../../hooks/permission-management-url-params.hook'
import { usePermissionManagement } from '../../../../providers/permission-management.provider'
import { useRoleSelectDataQuery } from '../../../../queries/role-select-data-query.hook'

export const ROLE_FILTER_KEY = 'role._id_filter'
export default function RoleFilter() {
    const { getUrlWithQueryParams } = useUrlHelper()
    const { data } = useRoleSelectDataQuery()
    const router = useRouter()
    const {
        methods: { setRoleId },
    } = usePermissionManagement()
    //
    const { [ROLE_FILTER_KEY]: value = '' } = usePermissionManagementParams()
    useEffect(() => {
        setRoleId(value + '' || undefined)
    }, [setRoleId, value])
    //
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
            [ROLE_FILTER_KEY]: value,
        })
        router.replace(url)
    }
    return (
        <Select placeholder="Select role" w="fit-content" value={value} onChange={onChange}>
            {data?.map(renderOption)}
        </Select>
    )
}
