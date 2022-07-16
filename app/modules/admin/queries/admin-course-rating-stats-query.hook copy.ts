import { useQuery, UseQueryOptions } from 'react-query'
import { fetchInstructorCourseRatingStats } from '../../../apis/user/user-instructor.api'
import { IDateRange } from '../../stats-shared/providers/chart-provider'
import { IRatingStat } from '../../shared/interfaces/rating-stat.interface'
import { fetchCourseRatingStats } from '../../../apis/acp/performances/performances-overview.api'

export const RQK_ADMIN_COURSE_RATING_STATS = 'admin-course-rating-stats'
export const useAdminCourseRatingStatsQuery = (
    courseId?: string,
    options?: UseQueryOptions<IRatingStat[]>
) => {
    return useQuery<IRatingStat[]>(
        [RQK_ADMIN_COURSE_RATING_STATS, courseId],
        () => fetchCourseRatingStats(courseId),
        {
            notifyOnChangeProps: 'tracked',
            keepPreviousData: true,
            staleTime: Infinity,
            ...options,
        }
    )
}
