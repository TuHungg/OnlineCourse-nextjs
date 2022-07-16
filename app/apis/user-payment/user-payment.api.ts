import IClientUrlParams from '../../modules/admin/interfaces/client-url-params.interface'
import IInstructorWithPayment from '../../modules/admin/interfaces/instructor-with-payment.interface'
import { axiosApiInstance } from '../../utils/axios-utils'
import UrlHelper from '../../utils/helpers/url.heper'

const prefix = 'user-payment'

export function fetchInstructorWithPayment(userId: string): Promise<IInstructorWithPayment> {
    return axiosApiInstance
        .get(`${prefix}/instructor-with-payment/${userId}`)
        .then((res) => res.data)
}

export function fetchInstructorsWithPayment({ queryKey }: any): Promise<IInstructorWithPayment[]> {
    const [_key, clientQuery]: [string, IClientUrlParams] = queryKey
    const queryString = UrlHelper.cvtObjToQueryString(clientQuery)
    return axiosApiInstance
        .get(`${prefix}/instructors-with-payment?${queryString}`)
        .then((res) => res.data)
}

export function countInstructorsWithPayment({ queryKey }: any): Promise<number> {
    const [_key, clientQuery]: [string, IClientUrlParams] = queryKey
    const queryString = UrlHelper.cvtObjToQueryString(clientQuery)
    return axiosApiInstance
        .get(`${prefix}/count-instructors-with-payment?${queryString}`)
        .then((res) => res.data)
}
