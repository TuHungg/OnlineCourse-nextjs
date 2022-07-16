import IOrderDetail from '../modules/admin/interfaces/order-detail.interface'
import { API_DOMAIN, CONTROLLER } from '../utils/constants/app.constant'
import { axiosApiInstance } from './../utils/axios-utils'

const prefix = CONTROLLER.order

export function fetchOrderDetail(id: string): Promise<IOrderDetail> {
    return axiosApiInstance.get(`${prefix}/${id}`).then((res) => res.data)
}
