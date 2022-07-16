import IClientUrlParams from '../modules/admin/interfaces/client-url-params.interface'
import INotification from '../modules/shared/interfaces/models/notification.interface'
import { axiosApiInstance } from '../utils/axios-utils'
import { CONTROLLER } from '../utils/constants/app.constant'
import UrlHelper from '../utils/helpers/url.heper'
const prefix = `${CONTROLLER.notification}/me`

export const fetchMyNotifications = ({
    queryKey,
    pageParam: _page,
}: any): Promise<INotification[]> => {
    const [_key, _limit]: [string, number] = queryKey

    const query: IClientUrlParams = {
        _limit,
        _page,
    }
    const queryString = UrlHelper.cvtObjToQueryString(query)
    return axiosApiInstance.get(`${prefix}?${queryString}`).then((res) => res.data)
}
export const countMyNotifications = (): Promise<number> => {
    return axiosApiInstance.get(`${prefix}/count?`).then((res) => res.data)
}

export const countMyUnreadNotifications = (): Promise<number> => {
    return axiosApiInstance.get(`${prefix}/count-unread?`).then((res) => res.data)
}

export const countMyNewNotifications = (): Promise<number> => {
    return axiosApiInstance.get(`${prefix}/count-new?`).then((res) => res.data)
}

// actions
export const apiReachNewNotifications = (): Promise<number> => {
    return axiosApiInstance.patch(`${prefix}/reach-new?`).then((res) => res.data)
}

export const apiReadNotification = (notificationId: string): Promise<number> => {
    return axiosApiInstance.patch(`${prefix}/read/${notificationId}?`).then((res) => res.data)
}
