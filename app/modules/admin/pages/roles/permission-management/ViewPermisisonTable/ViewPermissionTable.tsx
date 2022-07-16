import { Icon, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import lodash from 'lodash'
import React, { useCallback } from 'react'
import AppIcon from '../../../../../../utils/constants/app-icon.constant'
import { TPermission } from '../../../../../../utils/constants/role.constant'
import EmptyMessageTr from '../../../../../shared/components/EmptyMessageTr'
import LoadingMessageTr from '../../../../../shared/components/LoadingMessageTr'
import { IRolePermission } from '../../../../../shared/interfaces/models/role.interface'
import { useRolePermissionsQuery } from '../../../../queries/role-permissions-query.hook'

const permissions: TPermission[] = ['create', 'read', 'update', 'delete', 'export', 'import']

const CheckIcon = (props: { hasPermission: boolean }) => {
    const icon = props.hasPermission ? AppIcon.check : AppIcon.none
    return <Icon fontSize={!props.hasPermission ? 'xs' : 'md'} as={icon} />
}

const Row = ({ item }: { item: IRolePermission }) => {
    const renderStatus = useCallback(
        (permission: TPermission, i) => {
            const hasPermission = item.enabledPermissions.includes(permission)
            return (
                <Td>
                    <CheckIcon hasPermission={hasPermission} />
                </Td>
            )
        },
        [item.enabledPermissions]
    )
    return (
        <Tr>
            <Td>{item.documentPermission.name}</Td>
            {permissions.map(renderStatus)}
            <Td>
                <CheckIcon hasPermission={item.onlyForCreator} />
            </Td>
        </Tr>
    )
}

export interface ViewPermissionTableProps {
    roleId: string
}
export default function ViewPermissionTable(props: ViewPermissionTableProps) {
    const { isLoading, data } = useRolePermissionsQuery(props.roleId)
    const renderTh = useCallback((item: TPermission, i: number) => {
        return <Th key={i}>{lodash.upperFirst(item)}</Th>
    }, [])
    const renderRow = useCallback((item: IRolePermission, i: number) => {
        return <Row key={item._id} item={item} />
    }, [])
    return (
        <TableContainer>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Document type</Th>
                        {permissions.map(renderTh)}
                        <Th>Only for creator</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {isLoading ? (
                        <LoadingMessageTr />
                    ) : data && data.length > 0 ? (
                        data
                            ?.filter((item) => item.documentPermission.type == 'document')
                            .map(renderRow)
                    ) : (
                        <EmptyMessageTr message="This role do not have any permission" />
                    )}
                </Tbody>
            </Table>
        </TableContainer>
    )
}
