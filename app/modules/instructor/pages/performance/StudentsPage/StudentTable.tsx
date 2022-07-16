import { Table, Tbody, Td, Tr } from '@chakra-ui/react'
import React, { useCallback } from 'react'
import DateHelper from '../../../../../utils/helpers/date.helper'
import TdAvatar from '../../../../admin/components/TdAvatar'
import { IUser } from '../../../../shared/interfaces/models/user.interface'
import { MyTableHeader } from '../../../../shared/interfaces/my-table-header.interface'
import { ITableColumn } from '../../../../shared/interfaces/table-column.interface'
import InstructorTableContainer from '../../../components/InstructorTableContainer'
import { useStudentsUrlParams } from '../../../hooks/students.url-params.hook'
import IStudent from '../../../interfaces/student.interface'
import { useStudentsQuery } from '../../../queries/students-query.hook'

const columns: ITableColumn[] = [
    {
        header: 'Name',
        accessor: 'user.profile.firstName',
        sortable: true,
    },
    {
        header: 'Email',
        accessor: 'user.email',
        sortable: true,
    },
    {
        header: 'Phone',
        accessor: 'user.profile.phone',
        sortable: false,
    },
    {
        header: 'Enrolled',
        accessor: 'timestamps.createdAt',
        sortable: true,
    },
]

const Row = ({ item }: { item: IStudent }) => {
    const user = item.user as IUser
    return (
        <Tr>
            <Td>
                <TdAvatar
                    alt={user.profile.fullName || ''}
                    title={user.profile.fullName || ''}
                    thumbSize="md"
                    thumb={user.profile.avatar || ''}
                />
            </Td>
            <Td>{user.email}</Td>
            <Td>{user.profile.phone}</Td>
            <Td>{DateHelper.getLongDate(new Date(item.timestamps.createdAt))}</Td>
        </Tr>
    )
}

const RowMemo = React.memo(Row)

function StudentTable() {
    const { isLoading, data } = useStudentsQuery()
    const urlParams = useStudentsUrlParams()
    const renderItem = useCallback((item: IStudent, i: number) => {
        return <RowMemo key={item._id} item={item} />
    }, [])
    return (
        <InstructorTableContainer isLoading={isLoading} length={data?.length}>
            <Table variant="simple">
                <MyTableHeader columns={columns} urlParams={urlParams} />
                <Tbody>{data?.map(renderItem)}</Tbody>
            </Table>
        </InstructorTableContainer>
    )
}

export default React.memo(StudentTable)
