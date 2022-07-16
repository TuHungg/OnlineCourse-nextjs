import {
    apiArchiveCourses,
    apiUnArchiveCourses,
    fetchArchivedCourses,
} from './../../../apis/user/user-my-courses.api'
import { useMutation, useQuery, useQueryClient, UseQueryOptions } from 'react-query'
import { useAuth } from '../../auth/providers/auth.provider'
import { IUserCourse } from '../../shared/interfaces/models/user_course.interface'

export const RQK_ARCHIVED_COURSES = 'archived-courses'

export const useArchivedCoursesQuery = (options?: UseQueryOptions<IUserCourse[]>) => {
    const {
        state: { enableAuthFetch },
    } = useAuth()
    return useQuery<IUserCourse[]>(RQK_ARCHIVED_COURSES, fetchArchivedCourses, {
        notifyOnChangeProps: 'tracked',
        enabled: enableAuthFetch,
        ...options,
    })
}

export const useUnarchiveCourses = () => {
    const queryClient = useQueryClient()
    return useMutation(apiUnArchiveCourses, {
        onSuccess: (_) => {
            queryClient.invalidateQueries(RQK_ARCHIVED_COURSES)
        },
    })
}
