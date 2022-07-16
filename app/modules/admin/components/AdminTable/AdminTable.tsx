import { Skeleton, Table, TableContainer, VStack } from '@chakra-ui/react'
import React from 'react'
import { MyTableHeader } from '../../../shared/interfaces/my-table-header.interface'
import { useAdminUrlParams } from '../../providers/admin-query.provider'
import AdminPagination from '../AdminPagination'
import AdminTableBody from './AdminTableBody'
import { ITableColumn as ITableColumn } from '../../../shared/interfaces/table-column.interface'
import { ITableRow } from '../../../shared/interfaces/table-row.interface'

export interface AdminTableProps {
    columns: ITableColumn[]
    rows?: ITableRow[]
    isLoading?: boolean
    isError?: boolean
    hasPagination?: boolean
    hasMultiChange?: boolean
}

const TableHeader = ({
    hasMultiChange,
    columns,
}: {
    hasMultiChange: boolean
    columns: ITableColumn[]
}) => {
    const urlParams = useAdminUrlParams()
    return <MyTableHeader checkbox={hasMultiChange} columns={columns} urlParams={urlParams} />
}

const AdminTable = ({ hasPagination = true, hasMultiChange = true, ...props }: AdminTableProps) => {
    // GEN HEADER
    return (
        <Skeleton isLoaded={!props.isLoading}>
            <VStack alignItems={'stretch'} spacing={2}>
                <TableContainer minH="300px" className="my-scrollbar-1">
                    <Table variant="unstyled" fontSize={['sm', 'unset']}>
                        <TableHeader hasMultiChange={hasMultiChange} columns={props.columns} />
                        <AdminTableBody hasMultiChange={hasMultiChange} {...props} />
                    </Table>
                </TableContainer>
                {hasPagination && <AdminPagination />}
            </VStack>
        </Skeleton>
    )
}

export default React.memo(AdminTable)
