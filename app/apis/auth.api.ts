import axios from 'axios'
import { IUserSignUp } from '../modules/auth/interfaces/user-sign-up.interface'
import { IUser } from '../modules/shared/interfaces/models/user.interface'
import { axiosApiInstance } from '../utils/axios-utils'
import { CONTROLLER } from '../utils/constants/app.constant'
import { IAuthTokens } from '../utils/helpers/cookie.helper'
import { API_DOMAIN } from './../utils/constants/app.constant'

const prefix = `${CONTROLLER.auth}`
export const apiRefreshToken = async (refreshToken: string) => {
    return fetch(`${API_DOMAIN}/${prefix}/refresh-token`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            refreshToken,
        }),
    }).then((res) => {
        if (res.ok) return res.text()
        throw res.json()
    })
}

export const apiIsValidPermissionCode = async (code: string) => {
    return fetch(`${API_DOMAIN}/${prefix}/is-valid-permission-code?code=${code}`).then((res) => {
        if (res.ok) return res.json()
        throw res.json()
    })
}

export const fetchUserWithAccessToken = async (accessToken: string): Promise<IUser> => {
    const data = await fetch(`${API_DOMAIN}/${prefix}/user`, {
        method: 'get',
        headers: new Headers({
            Authorization: `Bearer ${accessToken}`,
        }),
    }).then((res) => {
        if (res.ok) return res.json()
        throw res.json()
    })
    return data
}
export const fetchAuthUser = (): Promise<IUser> => {
    return axiosApiInstance.get(`${prefix}/user`).then((res) => res.data)
}
export const verifyRecaptcha = (data: { secret: string; response: string }): Promise<boolean> => {
    return axiosApiInstance.post(`${prefix}/verify-recaptcha`, data).then((res) => res.data)
}
export const apiLogin = (email: string, password: string): Promise<IAuthTokens> => {
    return axios.post(`${API_DOMAIN}/${prefix}/login`, { email, password }).then((res) => res.data)
}
export const apiLogout = (): Promise<IUser> => {
    return axiosApiInstance.get(`${prefix}/logout`).then((res) => res.data)
}

export function apiSignUp(data: IUserSignUp): Promise<void> {
    return axios.post(`${API_DOMAIN}/${prefix}/sign-up`, data).then((res) => res.data)
}

export const apiForgotPassword = (email: string): Promise<void> => {
    return axios.post(`${API_DOMAIN}/${prefix}/forgot-password`, { email }).then((res) => res.data)
}

export const apiResetPassWord = (token: string, password: string): Promise<void> => {
    return axios
        .put(`${API_DOMAIN}/${prefix}/reset-password`, { token, password })
        .then((res) => res.data)
}

export function apiVerifyEmail(code: string): Promise<void> {
    return axios.post(`${API_DOMAIN}/${prefix}/verify-email`, { code }).then((res) => res.data)
}
