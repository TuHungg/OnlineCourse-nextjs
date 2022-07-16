import IClientUrlParams from '../../modules/admin/interfaces/client-url-params.interface'
import IInstructorCourse from '../../modules/instructor/interfaces/instructor-course.interface'
import IPaymentTransaction from '../../modules/instructor/interfaces/payment-transaction.interface'
import IStudent from '../../modules/instructor/interfaces/student.interface'
import { TOverviewTotal } from '../../modules/instructor/types/overview-total.type'
import IPayment from '../../modules/shared/interfaces/models/payment.interface'
import IReview from '../../modules/shared/interfaces/models/review.interface'
import { IDateRange } from '../../modules/stats-shared/providers/chart-provider'
import { axiosApiInstance } from '../../utils/axios-utils'
import { CONTROLLER } from '../../utils/constants/app.constant'
import UrlHelper from '../../utils/helpers/url.heper'
import { TTotalRange } from './../../modules/instructor/types/total-range.type'
import { IReviewResponse } from './../../modules/shared/interfaces/models/review.interface'
import { IRatingStat } from './../../modules/shared/interfaces/rating-stat.interface'
import { IStat } from './../../modules/shared/interfaces/stat.interface'

const prefix = `${CONTROLLER.user}/instructor`
export function fetchInstructorCourseReviews({ queryKey, pageParam = 1 }: any): Promise<IReview[]> {
    const [_key, clientQuery, viewInstructorId]: [string, IClientUrlParams, string | undefined] =
        queryKey
    clientQuery._page = pageParam
    const queryString = UrlHelper.cvtObjToQueryString({ ...clientQuery, viewInstructorId })
    return axiosApiInstance.get(`${prefix}/reviews?${queryString}`).then((res) => res.data)
}
export function countInstructorCourseReviews({ queryKey, pageParam = 1 }: any): Promise<number> {
    const [_key, clientQuery, viewInstructorId]: [string, IClientUrlParams, string | undefined] =
        queryKey
    clientQuery._page = pageParam
    const queryString = UrlHelper.cvtObjToQueryString({ ...clientQuery, viewInstructorId })
    return axiosApiInstance.get(`${prefix}/count-reviews?${queryString}`).then((res) => res.data)
}
export function fetchStudents({ queryKey }: any): Promise<IStudent[]> {
    const [_key, clientQuery, viewInstructorId]: [string, IClientUrlParams, string | undefined] =
        queryKey
    const queryString = UrlHelper.cvtObjToQueryString({ ...clientQuery, viewInstructorId })
    return axiosApiInstance.get(`${prefix}/students?${queryString}`).then((res) => res.data)
}

export function countStudents({ queryKey }: any): Promise<number> {
    const [_key, clientQuery, viewInstructorId]: [string, IClientUrlParams, string | undefined] =
        queryKey
    const queryString = UrlHelper.cvtObjToQueryString({ ...clientQuery, viewInstructorId })
    return axiosApiInstance.get(`${prefix}/count-students?${queryString}`).then((res) => res.data)
}

export function fetchPendingPayments(viewInstructorId?: string): Promise<IPayment[]> {
    const queryString = viewInstructorId ? `viewInstructorId=${viewInstructorId}` : ''
    return axiosApiInstance.get(`${prefix}/pending-payments?${queryString}`).then((res) => res.data)
}
export function fetchPayment(paymentId: string): Promise<IPayment> {
    return axiosApiInstance.get(`${prefix}/payment/${paymentId}`).then((res) => res.data)
}
export function fetchPayments({ queryKey }: any): Promise<IPayment[]> {
    const [_key, viewInstructorId, clientQuery, _page, _limit]: [
        string,
        string | undefined,
        IClientUrlParams,
        number,
        number
    ] = queryKey
    const queryString = UrlHelper.cvtObjToQueryString({
        ...clientQuery,
        viewInstructorId,
        _limit,
        _page,
    })
    return axiosApiInstance.get(`${prefix}/payments?${queryString}`).then((res) => res.data)
}

export function countPayments({ queryKey }: any): Promise<number> {
    const [_key, viewInstructorId, clientQuery]: [string, string | undefined, IClientUrlParams] =
        queryKey
    const queryString = UrlHelper.cvtObjToQueryString({ ...clientQuery, viewInstructorId })
    return axiosApiInstance.get(`${prefix}/count-payments?${queryString}`).then((res) => res.data)
}
export function fetchPaymentTransactions({ queryKey }: any): Promise<IPaymentTransaction[]> {
    const [_key, clientQuery, paymentId, _page, _limit]: [
        string,
        IClientUrlParams,
        string,
        number,
        number
    ] = queryKey
    const queryString = UrlHelper.cvtObjToQueryString({
        ...clientQuery,
        _page,
        _limit,
    })
    return axiosApiInstance
        .get(`${prefix}/payment-transactions/${paymentId}?${queryString}`)
        .then((res) => res.data)
}

export function countPaymentTransactions({ queryKey }: any): Promise<number> {
    const [_key, clientQuery, paymentId]: [string, IClientUrlParams, string] = queryKey
    const queryString = UrlHelper.cvtObjToQueryString({ ...clientQuery })
    return axiosApiInstance
        .get(`${prefix}/count-payment-transactions/${paymentId}?${queryString}`)
        .then((res) => res.data)
}
export function fetchInstructorCourses({ queryKey }: any): Promise<IInstructorCourse[]> {
    const [_key, clientQuery, viewInstructorId]: [string, IClientUrlParams, string | undefined] =
        queryKey
    const queryString = UrlHelper.cvtObjToQueryString({ ...clientQuery, viewInstructorId })
    return axiosApiInstance.get(`${prefix}/courses?${queryString}`).then((res) => res.data)
}

export function countInstructorCourses({ queryKey }: any): Promise<number> {
    const [_key, clientQuery, viewInstructorId]: [string, IClientUrlParams, string | undefined] =
        queryKey
    const queryString = UrlHelper.cvtObjToQueryString({ ...clientQuery, viewInstructorId })
    return axiosApiInstance.get(`${prefix}/count-courses?${queryString}`).then((res) => res.data)
}

export function fetchPaymentDetails({ queryKey }: any): Promise<IInstructorCourse[]> {
    const [_key, clientQuery, viewInstructorId]: [string, IClientUrlParams, string | undefined] =
        queryKey
    const queryString = UrlHelper.cvtObjToQueryString({ ...clientQuery, viewInstructorId })
    return axiosApiInstance.get(`${prefix}/courses?${queryString}`).then((res) => res.data)
}

// REVIEWS
export function apiUpdateReviewResponse(
    id: string,
    data: Partial<IReviewResponse>
): Promise<boolean> {
    return axiosApiInstance
        .patch(`${prefix}/update-review-response/${id}`, data)
        .then((res) => res.data)
}
export function apiDeleteReviewResponse(id: string): Promise<boolean> {
    return axiosApiInstance.patch(`${prefix}/delete-review-response/${id}`).then((res) => res.data)
}

export function fetchInstructorStats(
    type: TOverviewTotal,
    data: IDateRange,
    courseId?: string,
    viewInstructorId?: string
): Promise<IStat[]> {
    const queryString = UrlHelper.cvtObjToQueryString({
        ...data,
        'course._id_filter': courseId,
        viewInstructorId,
    })
    return axiosApiInstance.get(`${prefix}/${type}-stats?${queryString}`).then((res) => res.data)
}

export function fetchInstructorCourseRatingStats(
    courseId?: string,
    viewInstructorId?: string
): Promise<IRatingStat[]> {
    const queryString = UrlHelper.cvtObjToQueryString({
        'course._id_filter': courseId,
        viewInstructorId,
    })
    return axiosApiInstance
        .get(`${prefix}/course-rating-stats?${queryString}`)
        .then((res) => res.data)
}

export function fetchInstructorTotal(
    type: TOverviewTotal,
    range: TTotalRange,
    courseId?: string,
    viewInstructorId?: string
): Promise<number> {
    const queryString = UrlHelper.cvtObjToQueryString({
        range: range,
        'course._id_filter': courseId,
        viewInstructorId,
    })
    return axiosApiInstance.get(`${prefix}/total-${type}?${queryString}`).then((res) => res.data)
}
export function fetchInstructorAvgCourseRating(
    range: TTotalRange,
    courseId?: string,
    viewInstructorId?: string
): Promise<number> {
    const queryString = UrlHelper.cvtObjToQueryString({
        range: range,
        'course._id_filter': courseId,
        viewInstructorId,
    })
    return axiosApiInstance
        .get(`${prefix}/avg-course-rating?${queryString}`)
        .then((res) => res.data)
}
