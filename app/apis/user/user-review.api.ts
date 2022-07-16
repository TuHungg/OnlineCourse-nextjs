import IReview from '../../modules/shared/interfaces/models/review.interface'
import { axiosApiInstance } from '../../utils/axios-utils'

const prefix = `reviews`

export const apiCreateUserReview = (data: Partial<IReview>): Promise<IReview> => {
    return axiosApiInstance.post(`${prefix}`, data).then((res) => res.data)
}

export const fetchUserReview = (courseId: string): Promise<IReview> => {
    return axiosApiInstance.get(`${prefix}/user-review/${courseId}`).then((res) => res.data)
}

export const apiDeleteUserReview = (courseId: string): Promise<IReview[]> => {
    return axiosApiInstance.delete(`${prefix}/${courseId}`).then((res) => res.data)
}

export const apiUpdateUserReview = (courseId: string, data: Partial<IReview>) => {
    return axiosApiInstance.patch(`${prefix}/user-review/${courseId}`, data).then((res) => res.data)
}
