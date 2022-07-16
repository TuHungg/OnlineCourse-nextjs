import axios from 'axios'
import { API_DOMAIN } from '../utils/constants/app.constant'
import CookieHelper from '../utils/helpers/cookie.helper'
import { IGeolocationInfo } from './../modules/shared/interfaces/models/activity-log.interface'
const prefix = `${API_DOMAIN}/activity-logs`

export const apiCreateActivityLog = (data: {
    geolocationInfo: IGeolocationInfo
    content: string
}) => {
    const authTokens = CookieHelper.getAuthTokens()
    return axios.post<void>(`${prefix}/handle-activity`, {
        ...data,
        authTokens,
    })
}
