import { UseQueryOptions, useQuery } from 'react-query'
import {
    countInstructorsWithPayment,
    fetchInstructorsWithPayment,
} from '../../../apis/user-payment/user-payment.api'
import IClientUrlParams from '../interfaces/client-url-params.interface'
import IInstructorWithPayment from '../interfaces/instructor-with-payment.interface'
import { useAdminUrlParams } from '../providers/admin-query.provider'

export const RQK_INSTRUCTORS_WITH_PAYMENT = 'instructors-with-payment'
export function useInstructorsWithPaymentQuery(
    options?: UseQueryOptions<IInstructorWithPayment[]>
) {
    const query = useAdminUrlParams()
    return useQuery<IInstructorWithPayment[]>(
        [RQK_INSTRUCTORS_WITH_PAYMENT, query],
        fetchInstructorsWithPayment,
        {
            keepPreviousData: true,
            notifyOnChangeProps: 'tracked',
            ...options,
        }
    )
}

export function useCountInstructorsWithPayment(
    query: IClientUrlParams,
    options?: UseQueryOptions<number>
) {
    return useQuery<number>(
        [RQK_INSTRUCTORS_WITH_PAYMENT, query, 'count'],
        countInstructorsWithPayment,
        {
            keepPreviousData: true,
            notifyOnChangeProps: 'tracked',
            ...options,
        }
    )
}
