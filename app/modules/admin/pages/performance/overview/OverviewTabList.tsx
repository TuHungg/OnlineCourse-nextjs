import { TModule } from '../../../../shared/types/module.type'
import CourseRatingTabContent from '../../../../stats-shared/components/TabContents/CourseRatingTabContent'
import EnrollmentTabContent from '../../../../stats-shared/components/TabContents/EnrollmentTabContent'
import RevenueTabContent from '../../../../stats-shared/components/TabContents/RevenueTabContent'
import { useCourseChartParams } from '../../../../stats-shared/providers/course-chart-params.provider'
import { useAdminAvgCourseRatingQuery } from '../../../queries/admin-avg-course-rating-query.hook'
import { useAdminOverviewTotalQuery } from '../../../queries/admin-overview-total-query.hook'

export const AdminRevenueTabContent = () => {
    const {
        state: { courseId },
    } = useCourseChartParams()
    const { isLoading: isTotalLoading, data: total } = useAdminOverviewTotalQuery(
        'revenue',
        'all',
        courseId
    )
    const { isLoading: isTotalThisMonthLoading, data: totalThisMonth } = useAdminOverviewTotalQuery(
        'revenue',
        'M',
        courseId
    )
    const isLoading = isTotalLoading || isTotalThisMonthLoading
    return <RevenueTabContent isLoading={isLoading} total={total} totalThisMonth={totalThisMonth} />
}
export const AdminCourseEnrollmentTabContent = () => {
    const {
        state: { courseId },
    } = useCourseChartParams()
    const { isLoading: isTotalLoading, data: total } = useAdminOverviewTotalQuery(
        'enrollments',
        'all',
        courseId
    )
    const { isLoading: isTotalThisMonthLoading, data: totalThisMonth } = useAdminOverviewTotalQuery(
        'enrollments',
        'M',
        courseId
    )
    const isLoading = isTotalLoading || isTotalThisMonthLoading
    return (
        <EnrollmentTabContent isLoading={isLoading} total={total} totalThisMonth={totalThisMonth} />
    )
}
export const AdminCourseRatingTabContent = () => {
    const {
        state: { courseId },
    } = useCourseChartParams()
    const { isLoading: isTotalLoading, data: total } = useAdminAvgCourseRatingQuery('all', courseId)
    const { isLoading: isTotalThisMonthLoading, data: totalThisMonth } = useAdminOverviewTotalQuery(
        'rating',
        'M',
        courseId
    )
    const isLoading = isTotalLoading || isTotalThisMonthLoading
    return (
        <CourseRatingTabContent
            isLoading={isLoading}
            total={total}
            totalThisMonth={totalThisMonth}
        />
    )
}
