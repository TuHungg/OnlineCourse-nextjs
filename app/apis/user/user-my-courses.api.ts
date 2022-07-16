import ICourse from '../../modules/shared/interfaces/models/course.interface'
import { IUserCourse } from '../../modules/shared/interfaces/models/user_course.interface'
import { axiosApiInstance } from '../../utils/axios-utils'
import { CONTROLLER } from '../../utils/constants/app.constant'

const prefix = `${CONTROLLER.user}/my-courses`

export const fetchLearningCourses = (): Promise<IUserCourse[]> => {
    return axiosApiInstance.get(`/${prefix}/learning`).then((res) => res.data)
}

export const fetchLearningCourseIds = (): Promise<string[]> => {
    return axiosApiInstance.get(`/${prefix}/learning-course-ids`).then((res) => res.data)
}

export const fetchArchivedCourses = (): Promise<IUserCourse[]> => {
    return axiosApiInstance.get(`/${prefix}/archived`).then((res) => res.data)
}

export function apiArchiveCourses(userCourseIds: string[]): Promise<void> {
    return axiosApiInstance
        .patch(`${prefix}/archive`, {
            userCourseIds,
        })
        .then((res) => res.data)
}

export function apiUnArchiveCourses(userCourseIds: string[]): Promise<void> {
    return axiosApiInstance
        .patch(`${prefix}/unarchive`, {
            userCourseIds,
        })
        .then((res) => res.data)
}
// wishlist
export const fetchWishlist = (): Promise<ICourse[]> => {
    return axiosApiInstance.get(`/${prefix}/wishlist`).then((res) => res.data)
}

export const countWishlist = (): Promise<number> => {
    return axiosApiInstance.get(`/${prefix}/count-wishlist`).then((res) => res.data)
}

export const fetchWishlistCourseIds = (): Promise<string[]> => {
    return axiosApiInstance.get(`/${prefix}/wishlist-course-ids`).then((res) => res.data)
}

export function apiAddToWishlist(courseIds: string[]): Promise<void> {
    return axiosApiInstance
        .patch(`${prefix}/add-to-wishlist`, {
            courseIds,
        })
        .then((res) => res.data)
}
export function apiDeleteFromWishlist(courseIds: string[]): Promise<void> {
    return axiosApiInstance
        .patch(`${prefix}/delete-from-wishlist`, {
            courseIds,
        })
        .then((res) => res.data)
}
