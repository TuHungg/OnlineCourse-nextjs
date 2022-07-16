import { useQuery, UseQueryOptions } from 'react-query'
import {
    countActiveCourses,
    fetchActiveCourses,
} from '../../../apis/acp/performances/performances.api'
import IActiveCourse from '../interfaces/active-course.interface'
import IClientUrlParams from '../interfaces/client-url-params.interface'
import { useAdminUrlParams } from '../providers/admin-query.provider'

export const RQK_ACTIVE_COURSES = 'active-courses'
export function useActiveCoursesQuery(options?: UseQueryOptions<IActiveCourse[]>) {
    const query = useAdminUrlParams()
    return useQuery<IActiveCourse[]>([RQK_ACTIVE_COURSES, query], fetchActiveCourses, {
        keepPreviousData: true,
        notifyOnChangeProps: 'tracked',
        ...options,
    })
}

export function useCountActiveCoursesQuery(
    query: IClientUrlParams,
    options?: UseQueryOptions<number>
) {
    return useQuery<number>([RQK_ACTIVE_COURSES, query, 'count'], countActiveCourses, {
        keepPreviousData: true,
        notifyOnChangeProps: 'tracked',
        ...options,
    })
}
