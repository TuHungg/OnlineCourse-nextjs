import React from 'react'
import CourseRatingChart from '../../../../stats-shared/components/Charts/CourseRatingChart'
import { useCourseChartParams } from '../../../../stats-shared/providers/course-chart-params.provider'
import { useInstructorCourseRatingStatsQuery } from '../../../queries/instructor-course-rating-stats-query.hook'
import { useInstructorOverviewTotalQuery } from '../../../queries/instructor-overview-total-query.hook'

export interface RatingChartProps {}
export function RatingChart(props: RatingChartProps) {
    const {
        state: { courseId },
    } = useCourseChartParams()
    const { data: total } = useInstructorOverviewTotalQuery('rating', 'all', courseId)
    const { isLoading: isStatsLoading, data: ratingStats } =
        useInstructorCourseRatingStatsQuery(courseId)
    return <CourseRatingChart isLoading={isStatsLoading} data={ratingStats} total={total} />
}
