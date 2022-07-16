import { Skeleton, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import moment from 'moment'
import React, { useCallback } from 'react'
import DateHelper from '../../../../../utils/helpers/date.helper'
import TdAvatar from '../../../../admin/components/TdAvatar'
import Price from '../../../../shared/components/Price'
import IPaymentTransaction from '../../../interfaces/payment-transaction.interface'
//

const Row = ({ item }: { item: IPaymentTransaction }) => {
    const date = moment(new Date(item.timestamps.createdAt)).format('MMM DD, YYYY')
    const customer = item.customer
    return (
        <Tr>
            <Td
                textAlign={'right'}
                title={DateHelper.getLongDate(new Date(item.timestamps.createdAt))}
            >
                <Text>{date}</Text>
            </Td>
            <Td>
                <TdAvatar
                    alt={customer.profile.fullName || ''}
                    title={customer.profile.fullName || ''}
                    thumbSize="md"
                    thumb={customer.profile.avatar || ''}
                />
            </Td>
            <Td>
                <Text>{item.course.basicInfo.title}</Text>
            </Td>
            <Td textAlign={'right'}>
                <Price value={item.salePrice} />
            </Td>
            <Td textAlign={'right'}>
                <Price value={item.earnings} />
            </Td>
        </Tr>
    )
}

//
export interface TransactionTableProps {
    data?: IPaymentTransaction[]
    isLoading: boolean
}
export default function TransactionTable(props: TransactionTableProps) {
    const renderItem = useCallback((item: IPaymentTransaction, i: number) => {
        return <Row key={item._id} item={item} />
    }, [])
    return (
        <Skeleton isLoaded={!props.isLoading}>
            <TableContainer>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th textAlign={'right'}>Date</Th>
                            <Th>Customer</Th>
                            <Th>Course</Th>
                            <Th textAlign={'right'}>Price paid</Th>
                            <Th textAlign={'right'}>Your revenue</Th>
                        </Tr>
                    </Thead>
                    <Tbody>{props.data?.map(renderItem)}</Tbody>
                </Table>
            </TableContainer>
        </Skeleton>
    )
}
