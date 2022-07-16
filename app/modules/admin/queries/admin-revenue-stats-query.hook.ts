import { useQuery, UseQueryOptions } from 'react-query'
import { fetchStats } from '../../../apis/acp/performances/performances-overview.api'
import { IStat } from '../../shared/interfaces/stat.interface'
import { IDateRange } from '../../stats-shared/providers/chart-provider'

export const RQK_REVENUE_STATS = 'revenue-stats'
export const useAdminRevenueStatsQuery = (
    dateRange: IDateRange,
    courseId?: string,
    options?: UseQueryOptions<IStat[]>
) => {
    return useQuery<IStat[]>(
        [RQK_REVENUE_STATS, dateRange, courseId],
        () => fetchStats('revenue', dateRange, courseId),
        {
            staleTime: Infinity,
            notifyOnChangeProps: 'tracked',
            keepPreviousData: true,
            ...options,
        }
    )
}
