import { TModule } from '../../../../shared/types/module.type'
import CourseRatingTabContent from '../../../../stats-shared/components/TabContents/CourseRatingTabContent'
import EnrollmentTabContent from '../../../../stats-shared/components/TabContents/EnrollmentTabContent'
import RevenueTabContent from '../../../../stats-shared/components/TabContents/RevenueTabContent'
import { useCourseChartParams } from '../../../../stats-shared/providers/course-chart-params.provider'
import { useInstructorAvgCourseRatingQuery } from '../../../queries/instructor-avg-course-rating-query.hook'
import { useInstructorOverviewTotalQuery } from '../../../queries/instructor-overview-total-query.hook'

export interface RevenueTabContentProps {
    module?: TModule
}
export const InstructorRevenueTabContent = ({ ...props }: RevenueTabContentProps) => {
    const {
        state: { courseId },
    } = useCourseChartParams()
    const { isLoading: isTotalLoading, data: total } = useInstructorOverviewTotalQuery(
        'revenue',
        'all',
        courseId
    )
    const { isLoading: isTotalThisMonthLoading, data: totalThisMonth } =
        useInstructorOverviewTotalQuery('revenue', 'M', courseId)
    const isLoading = isTotalLoading || isTotalThisMonthLoading
    return <RevenueTabContent isLoading={isLoading} total={total} totalThisMonth={totalThisMonth} />
}
export const InstructorEnrollmentTabContent = () => {
    const {
        state: { courseId },
    } = useCourseChartParams()
    const { isLoading: isTotalLoading, data: total } = useInstructorOverviewTotalQuery(
        'enrollments',
        'all',
        courseId
    )
    const { isLoading: isTotalThisMonthLoading, data: totalThisMonth } =
        useInstructorOverviewTotalQuery('enrollments', 'M', courseId)
    const isLoading = isTotalLoading || isTotalThisMonthLoading
    return (
        <EnrollmentTabContent isLoading={isLoading} total={total} totalThisMonth={totalThisMonth} />
    )
}
export const InstructorCoursesRatingTabContent = () => {
    const {
        state: { courseId },
    } = useCourseChartParams()
    const { isLoading: isTotalLoading, data: total } = useInstructorAvgCourseRatingQuery(
        'all',
        courseId
    )
    const { isLoading: isTotalThisMonthLoading, data: totalThisMonth } =
        useInstructorOverviewTotalQuery('rating', 'M', courseId)
    const isLoading = isTotalLoading || isTotalThisMonthLoading
    return (
        <CourseRatingTabContent
            isLoading={isLoading}
            total={total}
            totalThisMonth={totalThisMonth}
        />
    )
}
