import { useQuery, UseQueryOptions } from 'react-query'
import { fetchInstructorCourseRatingStats } from '../../../apis/user/user-instructor.api'
import { IDateRange } from '../../stats-shared/providers/chart-provider'
import { IRatingStat } from '../../shared/interfaces/rating-stat.interface'
import { useInstructorParams } from '../providers/instructor-params.provider'

export const RQK_INSTRUCTOR_COURSE_RATING_STATS = 'instructor-course-rating-stats'
export const useInstructorCourseRatingStatsQuery = (
    courseId?: string,
    options?: UseQueryOptions<IRatingStat[]>
) => {
    const {
        state: { viewInstructorId },
    } = useInstructorParams()
    return useQuery<IRatingStat[]>(
        [RQK_INSTRUCTOR_COURSE_RATING_STATS, courseId],
        () => fetchInstructorCourseRatingStats(courseId, viewInstructorId),
        {
            notifyOnChangeProps: 'tracked',
            keepPreviousData: true,
            staleTime: Infinity,
            ...options,
        }
    )
}
