import { useMutation, useQuery, useQueryClient, UseQueryOptions } from 'react-query'
import { apiArchiveCourses, fetchLearningCourses } from '../../../apis/user/user-my-courses.api'
import { fetchLearningCourseIds } from './../../../apis/user/user-my-courses.api'
import { useAuth } from './../../auth/providers/auth.provider'
import { IUserCourse } from './../../shared/interfaces/models/user_course.interface'

export const RQK_LEARNING_COURSES = 'learning-courses'

export const useLearningCourses = (options?: UseQueryOptions<IUserCourse[]>) => {
    const {
        state: { enableAuthFetch },
    } = useAuth()
    return useQuery<IUserCourse[]>(RQK_LEARNING_COURSES, fetchLearningCourses, {
        notifyOnChangeProps: 'tracked',
        enabled: enableAuthFetch,
        ...options,
    })
}

export const RQK_LEARNING_COURSE_IDS = 'learning-course-ids'
export const useLearningCourseIdsQuery = (options?: UseQueryOptions<string[]>) => {
    const {
        state: { enableAuthFetch },
    } = useAuth()
    return useQuery<string[]>(RQK_LEARNING_COURSE_IDS, fetchLearningCourseIds, {
        notifyOnChangeProps: 'tracked',
        enabled: enableAuthFetch,
        ...options,
    })
}
//
export const useArchiveCourses = () => {
    const queryClient = useQueryClient()
    return useMutation(apiArchiveCourses, {
        onSuccess: (_) => {
            queryClient.invalidateQueries(RQK_LEARNING_COURSES)
        },
    })
}
