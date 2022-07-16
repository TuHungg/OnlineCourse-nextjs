import { ICart, IUser } from '../../modules/shared/interfaces/models/user.interface'
import { axiosApiInstance } from '../../utils/axios-utils'
import { CONTROLLER } from '../../utils/constants/app.constant'

const prefix = `${CONTROLLER.user}`

export const updateMe = (user: Partial<IUser>): Promise<void> => {
    return axiosApiInstance.patch(`/${prefix}/me`, user).then((res) => res.data)
}

export const apiSwitchToInstructor = (): Promise<void> => {
    return axiosApiInstance.patch(`/${prefix}/me/switch-to-instructor`).then((res) => res.data)
}

export const apiUpdateCart = (cart: ICart): Promise<void> => {
    return axiosApiInstance.patch(`/${prefix}/cart`, cart).then((res) => res.data)
}
export const apiAddCourseToCart = (courseId: string): Promise<void> => {
    return axiosApiInstance
        .post(`/${prefix}/cart`, {
            courseId,
        })
        .then((res) => res.data)
}

export const apiDeleteCourseInCart = (courseId: string): Promise<void> => {
    return axiosApiInstance.delete(`/${prefix}/cart/${courseId}`).then((res) => res.data)
}

export const apiCheckoutMomo = (): Promise<string> => {
    return axiosApiInstance.post(`/${prefix}/cart/checkout-momo`).then((res) => res.data)
}

export const fetchCart = (): Promise<ICart> => {
    return axiosApiInstance.get(`/${prefix}/cart`).then((res) => res.data)
}

export const apiEditProfile = (data: Partial<IUser>): Promise<IUser> => {
    return axiosApiInstance.patch(`/${prefix}/me/profile`, data).then((res) => res.data)
}
