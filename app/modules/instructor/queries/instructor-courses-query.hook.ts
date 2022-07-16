import { useMutation, useQuery, useQueryClient, UseQueryOptions } from 'react-query'
import { apiConvertCourseToDraft } from '../../../apis/course/course.api'
import {
    countInstructorCourses,
    fetchInstructorCourses,
} from '../../../apis/user/user-instructor.api'
import IClientUrlParams from '../../admin/interfaces/client-url-params.interface'
import IInstructorCourse from '../interfaces/instructor-course.interface'
import { useInstructorParams } from '../providers/instructor-params.provider'
import { useInstructorCoursesUrlParams } from './../hooks/instructor-courses-url-params.hook'

export const RQK_INSTRUCTOR_COURSES = 'instructor-courses'
export const useInstructorCoursesQuery = (
    inputClientQuery?: IClientUrlParams,
    options?: UseQueryOptions<IInstructorCourse[]>
) => {
    const {
        state: { viewInstructorId },
    } = useInstructorParams()
    const clientQuery = useInstructorCoursesUrlParams()
    return useQuery<IInstructorCourse[]>(
        [RQK_INSTRUCTOR_COURSES, inputClientQuery || clientQuery, viewInstructorId],
        fetchInstructorCourses,
        {
            notifyOnChangeProps: 'tracked',
            ...options,
        }
    )
}

export const useCountInstructorCoursesQuery = () => {
    const {
        state: { viewInstructorId },
    } = useInstructorParams()
    const clientQuery = useInstructorCoursesUrlParams()
    return useQuery<number>(
        [RQK_INSTRUCTOR_COURSES, clientQuery, viewInstructorId, 'count'],
        countInstructorCourses,
        {
            keepPreviousData: true,
        }
    )
}

export const useConvertCourseToDraft = () => {
    const queryClient = useQueryClient()
    const {
        state: { viewInstructorId },
    } = useInstructorParams()
    const clientQuery = useInstructorCoursesUrlParams()
    return useMutation((id: string) => apiConvertCourseToDraft(id), {
        onSuccess: (_) => {
            queryClient.invalidateQueries([RQK_INSTRUCTOR_COURSES, clientQuery, viewInstructorId])
        },
    })
}
