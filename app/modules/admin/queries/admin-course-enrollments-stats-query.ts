import { useQuery, UseQueryOptions } from 'react-query'
import { fetchStats } from '../../../apis/acp/performances/performances-overview.api'
import { IStat } from '../../shared/interfaces/stat.interface'
import { IDateRange } from '../../stats-shared/providers/chart-provider'

export const RQK_COURSE_ENROLLMENTS_STATS = 'course-enrollments-stats'
export const useAdminCourseEnrollmentStatsQuery = (
    dateRange: IDateRange,
    courseId?: string,
    options?: UseQueryOptions<IStat[]>
) => {
    return useQuery<IStat[]>(
        [RQK_COURSE_ENROLLMENTS_STATS, dateRange, courseId],
        () => fetchStats('enrollments', dateRange, courseId),
        {
            staleTime: Infinity,
            notifyOnChangeProps: 'tracked',
            keepPreviousData: true,
            ...options,
        }
    )
}
