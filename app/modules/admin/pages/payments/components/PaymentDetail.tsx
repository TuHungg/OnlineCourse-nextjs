import { Stack } from '@chakra-ui/react'
import React from 'react'
import TransactionTable from '../../../../instructor/pages/performance/RevenueReportPage/TransactionTable'
import {
    useCountPaymentTransactionsQuery,
    usePaymentTransactionsQuery,
} from '../../../../instructor/queries/payment-transactions-query.hook'
import SimplePaginationButtons from '../../../../shared/components/SimplePaginationButtons'
import {
    SimplePaginationProvider,
    useSimplePagination,
} from '../../../../shared/providers/simple-pagination.provider'

const ROWS_PER_PAGE = 5
const Main = (props: PaymentDetailProps) => {
    const {
        state: { page },
    } = useSimplePagination()
    const { isLoading: isTransactionsLoading, data: transactionsData } =
        usePaymentTransactionsQuery(page, ROWS_PER_PAGE, props.paymentId)
    return (
        <Stack>
            <TransactionTable isLoading={isTransactionsLoading} data={transactionsData} />
            <SimplePaginationButtons />
        </Stack>
    )
}

export interface PaymentDetailProps {
    paymentId?: string
}
export default function PaymentDetail(props: PaymentDetailProps) {
    const { data: totalItem } = useCountPaymentTransactionsQuery(props.paymentId)
    return (
        <SimplePaginationProvider totalItem={totalItem} rowsPerPage={ROWS_PER_PAGE}>
            <Main {...props} />
        </SimplePaginationProvider>
    )
}
