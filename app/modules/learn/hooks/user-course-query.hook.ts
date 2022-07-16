import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { fetchUserCourseBySlug } from '../../../apis/user/user-learning.api'
import { useAuth } from '../../auth/providers/auth.provider'
import { IUserCourse } from '../../shared/interfaces/models/user_course.interface'
import { getCourseDetailSlug } from './../../client/queries/course-detail-query.hook'

export const RQK_LEARN_COURSE = 'learn-course'
export const useLearnCourseQuery = () => {
    const {
        state: { user },
    } = useAuth()
    const router = useRouter()
    const courseSlug = getCourseDetailSlug(router.query)
    return useQuery<IUserCourse>(
        [RQK_LEARN_COURSE, user?._id, courseSlug],
        () => fetchUserCourseBySlug(courseSlug),
        {
            notifyOnChangeProps: ['data'],
            enabled: !!user?._id,
            // staleTime: Infinity,
        }
    )
}
