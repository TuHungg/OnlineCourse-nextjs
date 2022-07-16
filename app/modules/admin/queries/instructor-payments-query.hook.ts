import { useRouter } from 'next/router'
import { UseQueryOptions } from 'react-query'
import { useInstructorCoursesUrlParams } from '../../instructor/hooks/instructor-courses-url-params.hook'
import {
    useCountPaymentsQuery,
    usePaymentQuery,
    usePaymentsQuery,
    usePendingPaymentsQuery,
} from '../../instructor/queries/payments-query.hook'
import IPayment from '../../shared/interfaces/models/payment.interface'

export const useInstructorId = () => {
    const router = useRouter()
    return router.query.instructorId as string
}

export const useAcpInstructorPaymentsQuery = (
    page: number,
    rowsPerPage: number,
    options?: UseQueryOptions<IPayment[]>
) => {
    const clientQuery = useInstructorCoursesUrlParams()
    const instructorId = useInstructorId()
    return usePaymentsQuery(page, rowsPerPage, clientQuery, instructorId, options)
}

export const useAcpCountInstructorPaymentsQuery = () => {
    const clientQuery = useInstructorCoursesUrlParams()
    const instructorId = useInstructorId()
    return useCountPaymentsQuery(clientQuery, instructorId)
}

export const useAcpInstructorPaymentQuery = (
    paymentId?: string,
    options?: UseQueryOptions<IPayment>
) => {
    return usePaymentQuery(paymentId, options)
}

export const useAcpInstructorPendingPaymentsQuery = (options?: UseQueryOptions<IPayment[]>) => {
    const instructorId = useInstructorId()
    return usePendingPaymentsQuery(instructorId, options)
}
