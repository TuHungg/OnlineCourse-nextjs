import { useQuery, UseQueryOptions } from 'react-query'
import { fetchAvgCourseRating } from '../../../apis/acp/performances/performances-overview.api'
import { TTotalRange } from '../../instructor/types/total-range.type'

export const RQK_ADMIN_AVG_COURSE_RATING = 'admin-avg-course-rating'
export const useAdminAvgCourseRatingQuery = (
    range: TTotalRange,
    courseId?: string,
    options?: UseQueryOptions<number>
) => {
    return useQuery<number>(
        [RQK_ADMIN_AVG_COURSE_RATING, range, courseId],
        () => fetchAvgCourseRating(range, courseId),
        {
            notifyOnChangeProps: 'tracked',
            keepPreviousData: true,
            staleTime: Infinity,
            ...options,
        }
    )
}
