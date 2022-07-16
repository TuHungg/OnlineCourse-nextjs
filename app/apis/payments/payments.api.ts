import { axiosApiInstance } from '../../utils/axios-utils'

const prefix = 'payments'

export const apiPayPayment = (id: string): Promise<boolean> => {
    return axiosApiInstance.patch(`${prefix}/pay/${id}`).then((res) => res.data)
}

export const apiPayAllPayment = (userId: string): Promise<boolean> => {
    return axiosApiInstance.patch(`${prefix}/pay-all/${userId}`).then((res) => res.data)
}
