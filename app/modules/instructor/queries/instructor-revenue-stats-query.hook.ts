import { IDateRange } from '../../stats-shared/providers/chart-provider'
import { useQuery, UseQueryOptions } from 'react-query'
import { fetchInstructorStats } from '../../../apis/user/user-instructor.api'
import { IStat } from '../../shared/interfaces/stat.interface'
import { useInstructorParams } from '../providers/instructor-params.provider'

export const RQK_INSTRUCTOR_REVENUE_STATS = 'instructor-revenue-stats'
export const useInstructorRevenueStatsQuery = (
    dateRange: IDateRange,
    courseId?: string,
    options?: UseQueryOptions<IStat[]>
) => {
    const {
        state: { viewInstructorId },
    } = useInstructorParams()
    return useQuery<IStat[]>(
        [RQK_INSTRUCTOR_REVENUE_STATS, dateRange, courseId],
        () => fetchInstructorStats('revenue', dateRange, courseId, viewInstructorId),
        {
            staleTime: Infinity,
            notifyOnChangeProps: 'tracked',
            keepPreviousData: true,
            ...options,
        }
    )
}
