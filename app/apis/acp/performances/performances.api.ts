import IActiveCourse from '../../../modules/admin/interfaces/active-course.interface'
import IClientUrlParams from '../../../modules/admin/interfaces/client-url-params.interface'
import IInstructorWithStat from '../../../modules/admin/interfaces/instructor-with-stat.interface'
import { axiosApiInstance } from '../../../utils/axios-utils'
import UrlHelper from '../../../utils/helpers/url.heper'

const prefix = `performances`

export function fetchActiveCourses({ queryKey }: any): Promise<IActiveCourse[]> {
    const [_key, clientQuery]: [string, IClientUrlParams] = queryKey
    const queryString = UrlHelper.cvtObjToQueryString(clientQuery)
    return axiosApiInstance.get(`${prefix}/active-courses?${queryString}`).then((res) => res.data)
}

export function countActiveCourses({ queryKey }: any): Promise<number> {
    const [_key, clientQuery]: [string, IClientUrlParams] = queryKey
    const queryString = UrlHelper.cvtObjToQueryString(clientQuery)
    return axiosApiInstance
        .get(`${prefix}/count-active-courses?${queryString}`)
        .then((res) => res.data)
}

export function fetchInstructors({ queryKey }: any): Promise<IInstructorWithStat[]> {
    const [_key, clientQuery]: [string, IClientUrlParams] = queryKey
    const queryString = UrlHelper.cvtObjToQueryString(clientQuery)
    return axiosApiInstance.get(`${prefix}/instructors?${queryString}`).then((res) => res.data)
}

export function countInstructors({ queryKey }: any): Promise<number> {
    const [_key, clientQuery]: [string, IClientUrlParams] = queryKey
    const queryString = UrlHelper.cvtObjToQueryString(clientQuery)
    return axiosApiInstance
        .get(`${prefix}/count-instructors?${queryString}`)
        .then((res) => res.data)
}
