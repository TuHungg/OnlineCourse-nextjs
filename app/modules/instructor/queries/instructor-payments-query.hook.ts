import { UseQueryOptions } from 'react-query'
import IPayment from '../../shared/interfaces/models/payment.interface'
import { useInstructorCoursesUrlParams } from '../hooks/instructor-courses-url-params.hook'
import { useInstructorParams } from '../providers/instructor-params.provider'
import {
    useCountPaymentsQuery,
    usePaymentQuery,
    usePaymentsQuery,
    usePendingPaymentsQuery,
} from './payments-query.hook'

export const useInstructorPaymentsQuery = (
    page: number,
    rowsPerPage: number,
    options?: UseQueryOptions<IPayment[]>
) => {
    const {
        state: { viewInstructorId },
    } = useInstructorParams()
    const clientQuery = useInstructorCoursesUrlParams()
    return usePaymentsQuery(page, rowsPerPage, clientQuery, viewInstructorId, options)
}

export const useCountInstructorPaymentsQuery = () => {
    const {
        state: { viewInstructorId },
    } = useInstructorParams()
    const clientQuery = useInstructorCoursesUrlParams()
    return useCountPaymentsQuery(clientQuery, viewInstructorId)
}

export const useInstructorPayment = (paymentId?: string, options?: UseQueryOptions<IPayment>) => {
    return usePaymentQuery(paymentId, options)
}

export const useInstructorPendingPayments = (options?: UseQueryOptions<IPayment[]>) => {
    const {
        state: { viewInstructorId },
    } = useInstructorParams()
    return usePendingPaymentsQuery(viewInstructorId, options)
}
