import {
    Button,
    Skeleton,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useColorModeValue,
} from '@chakra-ui/react'
import moment from 'moment'
import React, { useCallback } from 'react'
import PathHelper from '../../../../../utils/helpers/path.helper'
import StatusBadge from '../../../../admin/components/StatusBadge'
import ExpectedPaidDate from '../../../../shared/components/ExpectedPaidDate'
import NextLink from '../../../../shared/components/NextLink'
import Price from '../../../../shared/components/Price'
import IPayment from '../../../../shared/interfaces/models/payment.interface'
//

const Row = ({ item, onPay, onViewDetail }: { item: IPayment } & Actions) => {
    const timePeriod = moment(new Date(item.history.createdAt)).format('MMM, YYYY')
    const bgColor = useColorModeValue('gray.100', 'gray.700')
    const button = (
        <Button
            onClick={() => onViewDetail && onViewDetail(item)}
            variant={'link'}
            colorScheme="purple"
        >
            {timePeriod}
        </Button>
    )
    return (
        <Tr
            // bgColor={item.status == 'pending' ? bgColor : undefined}
            sx={{
                bgColor: item.status == 'pending' ? bgColor : undefined,
            }}
        >
            <Td>
                {!onViewDetail ? (
                    <NextLink href={PathHelper.getInstructorRevenueReportPath(item._id)}>
                        {button}
                    </NextLink>
                ) : (
                    button
                )}
            </Td>
            <Td>
                <StatusBadge status={item.status} />
            </Td>
            <Td textAlign="right">
                <Price value={item.amount} />
            </Td>
            <Td textAlign="right">
                <Price value={item.commissionAmount} />
            </Td>
            <Td textAlign="right">
                <Price value={item.earnings} />
            </Td>
            <Td textAlign="right">
                {item.status == 'pending' && <ExpectedPaidDate dateStr={item.history.createdAt} />}
                {item.status == 'paid' && <ExpectedPaidDate dateStr={item.history.paidAt!} paid />}
            </Td>
            {item.status == 'pending' && onPay && (
                <Td>
                    <Button onClick={() => onPay && onPay(item)} size="sm" colorScheme={'blue'}>
                        Pay
                    </Button>
                </Td>
            )}
        </Tr>
    )
}

//
interface Actions {
    onPay?: (item: IPayment) => void
    onViewDetail?: (item: IPayment) => void
}

export interface RevenueReportTableProps {
    data?: IPayment[]
    isLoading: boolean
    showActions?: boolean
}
export default function RevenueReportTable(props: RevenueReportTableProps & Actions) {
    const renderItem = useCallback(
        (item: IPayment, i: number) => {
            return (
                <Row
                    key={item._id + item.status}
                    item={item}
                    onPay={props.onPay}
                    onViewDetail={props.onViewDetail}
                />
            )
        },
        [props.onPay, props.onViewDetail]
    )
    return (
        <Skeleton isLoaded={!props.isLoading}>
            <TableContainer>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Time period</Th>
                            <Th>Status</Th>
                            <Th textAlign={'right'}>Sale price</Th>
                            <Th textAlign={'right'}>Commission price</Th>
                            <Th textAlign={'right'}> Earnings</Th>
                            <Th textAlign={'right'}>Expected Paid At</Th>
                            {props.showActions ? <Th>Actions</Th> : <></>}
                        </Tr>
                    </Thead>
                    <Tbody>{props.data?.map(renderItem)}</Tbody>
                </Table>
            </TableContainer>
        </Skeleton>
    )
}
