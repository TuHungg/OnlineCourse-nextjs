import { Skeleton } from '@chakra-ui/react'
import React from 'react'
import CourseEnrollmentsChart from '../../../../stats-shared/components/Charts/CourseEnrollmentsChart'
import { useMyChart } from '../../../../stats-shared/providers/chart-provider'
import { useCourseChartParams } from '../../../../stats-shared/providers/course-chart-params.provider'
import { useAdminCourseEnrollmentStatsQuery } from '../../../queries/admin-course-enrollments-stats-query'

const Main = (props: AdminCourseEnrollmentChartProps) => {
    const {
        state: { courseId },
    } = useCourseChartParams()
    const {
        state: { labels, dateRange },
        methods: { standardizedDatasetData },
    } = useMyChart()
    const { isLoading, data: stats } = useAdminCourseEnrollmentStatsQuery(dateRange, courseId)
    if (isLoading) return <Skeleton height={'350px'} />
    if (!stats) return <></>
    const data = standardizedDatasetData(stats)
    return <CourseEnrollmentsChart labels={labels} data={data} />
}

export interface AdminCourseEnrollmentChartProps {}
export default function AdminCourseEnrollmentsChart(props: AdminCourseEnrollmentChartProps) {
    return <Main {...props} />
}
