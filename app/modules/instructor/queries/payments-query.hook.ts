import { useMutation, useQuery, useQueryClient, UseQueryOptions } from 'react-query'
import {
    countPayments,
    fetchPayment,
    fetchPayments,
    fetchPendingPayments,
} from '../../../apis/user/user-instructor.api'
import IClientUrlParams from '../../admin/interfaces/client-url-params.interface'
import { RQK_ADMIN_INSTRUCTOR_WITH_PAYMENT } from '../../admin/queries/admin-instructor-query.hook'
import IPayment from '../../shared/interfaces/models/payment.interface'
import { apiPayAllPayment, apiPayPayment } from './../../../apis/payments/payments.api'
import { useInstructorId } from './../../admin/queries/instructor-payments-query.hook'

export const RQK_PAYMENTS = 'payments'
export const usePaymentsQuery = (
    page: number,
    rowsPerPage: number,
    clientQuery: IClientUrlParams,
    viewInstructorId?: string,
    options?: UseQueryOptions<IPayment[]>
) => {
    return useQuery<IPayment[]>(
        [RQK_PAYMENTS, viewInstructorId, clientQuery, page, rowsPerPage],
        fetchPayments,
        {
            notifyOnChangeProps: 'tracked',
            ...options,
        }
    )
}

export const useCountPaymentsQuery = (
    clientQuery?: IClientUrlParams,
    viewInstructorId?: string
) => {
    return useQuery<number>(
        [RQK_PAYMENTS, viewInstructorId, clientQuery, , 'count'],
        countPayments,
        {
            keepPreviousData: true,
        }
    )
}

export const RQK_PAYMENT = 'payment'
export const usePaymentQuery = (paymentId?: string, options?: UseQueryOptions<IPayment>) => {
    return useQuery<IPayment>(RQK_PAYMENT, () => fetchPayment(paymentId!), {
        notifyOnChangeProps: 'tracked',
        enabled: !!paymentId,
        ...options,
    })
}
export const RQK_PENDING_PAYMENTS = 'pending-payments'
export const usePendingPaymentsQuery = (
    viewInstructorId?: string,
    options?: UseQueryOptions<IPayment[]>
) => {
    return useQuery<IPayment[]>(
        [RQK_PENDING_PAYMENTS, viewInstructorId],
        () => fetchPendingPayments(viewInstructorId),
        {
            notifyOnChangeProps: 'tracked',
            ...options,
        }
    )
}

export const usePayPayment = () => {
    const queryClient = useQueryClient()
    const instructorId = useInstructorId()
    return useMutation((id: string) => apiPayPayment(id), {
        onSuccess: () => {
            queryClient.invalidateQueries([RQK_PAYMENTS, instructorId])
            queryClient.invalidateQueries([RQK_PENDING_PAYMENTS, instructorId])
            queryClient.invalidateQueries([RQK_ADMIN_INSTRUCTOR_WITH_PAYMENT, instructorId])
        },
    })
}
export const usePayAllPayment = () => {
    const queryClient = useQueryClient()
    const instructorId = useInstructorId()
    return useMutation((id: string) => apiPayAllPayment(id), {
        onSuccess: () => {
            queryClient.invalidateQueries([RQK_PAYMENTS, instructorId])
            queryClient.invalidateQueries([RQK_PENDING_PAYMENTS, instructorId])
            queryClient.invalidateQueries([RQK_ADMIN_INSTRUCTOR_WITH_PAYMENT, instructorId])
        },
    })
}
