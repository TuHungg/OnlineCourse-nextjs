import { useQuery, UseQueryOptions } from 'react-query'
import { fetchInstructorTotal } from '../../../apis/user/user-instructor.api'
import { useInstructorParams } from '../providers/instructor-params.provider'
import { TOverviewTotal } from '../types/overview-total.type'
import { TTotalRange } from '../types/total-range.type'

export const RQK_INSTRUCTOR_OVERVIEW_TOTAL = 'instructor-overview-total'
export const useInstructorOverviewTotalQuery = (
    type: TOverviewTotal,
    range: TTotalRange,
    courseId?: string,
    options?: UseQueryOptions<number>
) => {
    const {
        state: { viewInstructorId },
    } = useInstructorParams()
    return useQuery<number>(
        [RQK_INSTRUCTOR_OVERVIEW_TOTAL, type, range, courseId],
        () => fetchInstructorTotal(type, range, courseId, viewInstructorId),
        {
            notifyOnChangeProps: 'tracked',
            keepPreviousData: true,
            staleTime: Infinity,
            ...options,
        }
    )
}
