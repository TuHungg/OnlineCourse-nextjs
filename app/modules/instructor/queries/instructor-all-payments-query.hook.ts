import { useMemo } from 'react'
import { UseQueryOptions } from 'react-query'
import IPayment from '../../shared/interfaces/models/payment.interface'
import {
    useInstructorPaymentsQuery,
    useInstructorPendingPayments,
} from './instructor-payments-query.hook'

export const useInstructorAllPaymentsQuery = (
    options: { page: number; rowsPerPage: number },
    queryOptions?: UseQueryOptions<IPayment[]>
) => {
    const { isLoading: isPendingPaymentLoading, data: pendingPaymentData } =
        useInstructorPendingPayments(queryOptions)
    const { isLoading: isPaymentsLoading, data: paymentsData } = useInstructorPaymentsQuery(
        options.page,
        options.rowsPerPage,
        queryOptions
    )

    const data = useMemo(() => {
        if (typeof paymentsData != 'undefined' && typeof pendingPaymentData != 'undefined') {
            return (pendingPaymentData || []).concat(paymentsData)
        }
        return undefined
    }, [paymentsData, pendingPaymentData])
    return { isLoading: isPendingPaymentLoading || isPaymentsLoading, data }
}
