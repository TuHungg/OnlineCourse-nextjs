import { useMutation, useQuery, useQueryClient } from 'react-query'
import { fetchById } from '../../../apis/acp/admin.api'
import { CONTROLLER } from '../../../utils/constants/app.constant'
import ICourse from '../../shared/interfaces/models/course.interface'
import {
    apiApproveCourse,
    apiSubmitForReview,
    fetchCourseBriefById,
    TApproveStatus,
} from './../../../apis/course/course.api'

export const RQK_COURSE = 'course'
export const useCourseQuery = (id?: string) => {
    return useQuery<ICourse>([RQK_COURSE, id], () => fetchById<ICourse>('courses', id!), {
        notifyOnChangeProps: 'tracked',
        enabled: !!id,
    })
}

export const RQK_COURSE_BRIEF = 'course-brief'
export const useCourseBriefQuery = (id?: string) => {
    return useQuery<ICourse>([RQK_COURSE_BRIEF, id], () => fetchCourseBriefById(id!), {
        notifyOnChangeProps: 'tracked',
        enabled: !!id,
    })
}

export const useSubmitForReview = () => {
    const queryClient = useQueryClient()
    return useMutation((id: string) => apiSubmitForReview(id), {
        onMutate: () => {},
        onSuccess: (_) => {
            queryClient.invalidateQueries(CONTROLLER.course)
        },
    })
}

export const useApproveCourse = () => {
    const queryClient = useQueryClient()
    return useMutation(
        (payload: { id: string; status: TApproveStatus }) =>
            apiApproveCourse(payload.id, payload.status),
        {
            onMutate: () => {},
            onSuccess: (_) => {
                queryClient.invalidateQueries(CONTROLLER.course)
            },
        }
    )
}
