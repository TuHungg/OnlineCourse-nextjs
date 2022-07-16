import ICourse from '../../modules/shared/interfaces/models/course.interface'
import { axiosApiInstance } from '../../utils/axios-utils'
import { CONTROLLER } from '../../utils/constants/app.constant'

const prefix = CONTROLLER.course
export const fetchCourseBriefById = (id: string): Promise<ICourse> => {
    return axiosApiInstance.get(`${prefix}/brief/${id}`).then((res) => res.data)
}
export type TApproveStatus = 'active' | 'rejected'
export const apiApproveCourse = (id: string, status: TApproveStatus): Promise<boolean> => {
    return axiosApiInstance.patch(`${prefix}/approve/${id}`, { status }).then((res) => res.data)
}
export const apiSubmitForReview = (id: string): Promise<boolean> => {
    return axiosApiInstance.patch(`${prefix}/submit-for-review/${id}`).then((res) => res.data)
}

export const apiConvertCourseToDraft = (id: string): Promise<boolean> => {
    return axiosApiInstance.patch(`${prefix}/convert-course-to-draft/${id}`).then((res) => res.data)
}
