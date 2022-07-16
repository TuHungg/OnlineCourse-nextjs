import axios, { AxiosError } from 'axios'
import { API_DOMAIN } from './constants/app.constant'
import CookieHelper from './helpers/cookie.helper'

const refreshAccessToken = async (): Promise<string | undefined> => {
    const { refreshToken } = CookieHelper.getAuthTokens()
    if (refreshToken) {
        return axios
            .post(`${API_DOMAIN}/auth/refresh-token`, {
                refreshToken,
            })
            .then((res) => res.data)
            .catch((e: AxiosError) => {
                const errorObj: any = e.toJSON()
                if (errorObj.status == 401) {
                    CookieHelper.removeAuthTokens()
                }
            })
    }
    return undefined
}

// Request interceptor for API calls
export const axiosApiInstance = axios.create({ baseURL: API_DOMAIN })
axiosApiInstance.interceptors.request.use(
    async (config) => {
        const { accessToken } = CookieHelper.getAuthTokens()
        config.headers = {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
        return config
    },
    (error) => {
        Promise.reject(error)
    }
)

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use(
    (response) => {
        return response
    },
    async function (error) {
        const originalRequest = error.config
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true
            try {
                const accessToken = await refreshAccessToken()
                if (accessToken) {
                    CookieHelper.setAuthAccessToken(accessToken)
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken
                    return axiosApiInstance(originalRequest)
                }
            } catch (e) {
                return Promise.reject(error)
            }
        }
        return Promise.reject(error)
    }
)
