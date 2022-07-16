import React from 'react'
import CourseRatingChart from '../../../../stats-shared/components/Charts/CourseRatingChart'
import { useCourseChartParams } from '../../../../stats-shared/providers/course-chart-params.provider'
import { useAdminCourseRatingStatsQuery } from '../../../queries/admin-course-rating-stats-query.hook copy'
import { useAdminOverviewTotalQuery } from '../../../queries/admin-overview-total-query.hook'

export interface AdminCourseRatingChartProps {}
export function AdminCourseRatingChart(props: AdminCourseRatingChartProps) {
    const {
        state: { courseId },
    } = useCourseChartParams()
    const { data: total } = useAdminOverviewTotalQuery('rating', 'all', courseId)
    const { isLoading: isStatsLoading, data: ratingStats } =
        useAdminCourseRatingStatsQuery(courseId)
    return <CourseRatingChart isLoading={isStatsLoading} data={ratingStats} total={total} />
}
