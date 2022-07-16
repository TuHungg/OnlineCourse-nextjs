import { useQuery, UseQueryOptions } from 'react-query'
import { fetchOverviewTotal } from '../../../apis/acp/performances/performances-overview.api'
import { TOverviewTotal } from '../../instructor/types/overview-total.type'
import { TTotalRange } from '../../instructor/types/total-range.type'

export const RQK_ADMIN_OVERVIEW_TOTAL = 'admin-overview-total'
export const useAdminOverviewTotalQuery = (
    type: TOverviewTotal,
    range: TTotalRange,
    courseId?: string,
    options?: UseQueryOptions<number>
) => {
    return useQuery<number>(
        [RQK_ADMIN_OVERVIEW_TOTAL, type, range, courseId],
        () => fetchOverviewTotal(type, range, courseId),
        {
            notifyOnChangeProps: 'tracked',
            keepPreviousData: true,
            staleTime: Infinity,
            ...options,
        }
    )
}
