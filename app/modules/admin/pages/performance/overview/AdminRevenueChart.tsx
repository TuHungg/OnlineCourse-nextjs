import { Skeleton } from '@chakra-ui/react'
import React from 'react'
import RevenueChart from '../../../../stats-shared/components/Charts/RevenueChart'
import { useMyChart } from '../../../../stats-shared/providers/chart-provider'
import { useCourseChartParams } from '../../../../stats-shared/providers/course-chart-params.provider'
import { useAdminRevenueStatsQuery } from '../../../queries/admin-revenue-stats-query.hook'

const Main = (props: AdminRevenueChartProps) => {
    const {
        state: { courseId },
    } = useCourseChartParams()
    const {
        state: { labels, dateRange },
        methods: { standardizedDatasetData },
    } = useMyChart()
    const { isLoading, data: stats } = useAdminRevenueStatsQuery(dateRange, courseId)
    if (isLoading) return <Skeleton height={'350px'} />
    if (!stats) return <></>
    const data = standardizedDatasetData(stats)
    return <RevenueChart labels={labels} data={data} />
}

export interface AdminRevenueChartProps {}
export default function AdminRevenueChart(props: AdminRevenueChartProps) {
    return <Main {...props} />
}
