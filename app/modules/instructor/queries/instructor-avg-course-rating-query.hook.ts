import { useQuery, UseQueryOptions } from 'react-query'
import { fetchInstructorAvgCourseRating } from '../../../apis/user/user-instructor.api'
import { useInstructorParams } from '../providers/instructor-params.provider'
import { TTotalRange } from '../types/total-range.type'

export const RQK_INSTRUCTOR_AVG_COURSE_RATING = 'instructor-avg-course-rating'
export const useInstructorAvgCourseRatingQuery = (
    range: TTotalRange,
    courseId?: string,
    options?: UseQueryOptions<number>
) => {
    const {
        state: { viewInstructorId },
    } = useInstructorParams()
    return useQuery<number>(
        [RQK_INSTRUCTOR_AVG_COURSE_RATING, range, courseId],
        () => fetchInstructorAvgCourseRating(range, courseId, viewInstructorId),
        {
            notifyOnChangeProps: 'tracked',
            keepPreviousData: true,
            staleTime: Infinity,
            ...options,
        }
    )
}
