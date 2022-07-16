import { useRouter } from 'next/router'
import { useQuery, UseQueryOptions } from 'react-query'
import { fetchOrderDetail } from '../../../apis/order.api'
import IOrderDetail from '../interfaces/order-detail.interface'
import { useAdminUrlParams } from '../providers/admin-query.provider'

export const RQK_ADMIN_ORDER_DETAIL = 'admin-order-detail'
export function useAdminOrderDetailQuery(options?: UseQueryOptions<IOrderDetail>) {
    const query = useAdminUrlParams()
    const router = useRouter()
    const { orderId } = router.query
    return useQuery<IOrderDetail>(
        [RQK_ADMIN_ORDER_DETAIL, query],
        () => fetchOrderDetail(orderId as string),
        {
            keepPreviousData: true,
            notifyOnChangeProps: 'tracked',
            ...options,
        }
    )
}
