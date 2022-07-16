import { useQuery, UseQueryOptions } from 'react-query'
import {
    countPaymentTransactions,
    fetchPaymentTransactions,
} from '../../../apis/user/user-instructor.api'
import { useInstructorTransactionsUrlParams } from '../hooks/instructor-transactions-url-params.hook'
import IPaymentTransaction from '../interfaces/payment-transaction.interface'

export const RQK_PAYMENT_TRANSACTIONS = 'payment-transactions'
export const usePaymentTransactionsQuery = (
    page: number,
    rowsPerPage: number,
    paymentId?: string,
    options?: UseQueryOptions<IPaymentTransaction[]>
) => {
    const clientQuery = useInstructorTransactionsUrlParams()
    return useQuery<IPaymentTransaction[]>(
        [RQK_PAYMENT_TRANSACTIONS, clientQuery, paymentId, page, rowsPerPage],
        fetchPaymentTransactions,
        {
            enabled: !!paymentId,
            notifyOnChangeProps: 'tracked',
            ...options,
        }
    )
}

export const useCountPaymentTransactionsQuery = (paymentId?: string) => {
    const clientQuery = useInstructorTransactionsUrlParams()
    return useQuery<number>(
        [RQK_PAYMENT_TRANSACTIONS, clientQuery, paymentId, 'count'],
        countPaymentTransactions,
        {
            enabled: !!paymentId,
            notifyOnChangeProps: 'tracked',
            keepPreviousData: true,
        }
    )
}
