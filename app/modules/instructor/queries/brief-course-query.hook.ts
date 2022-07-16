import { useCourseBriefQuery } from '../../course-form/hooks/course-query.hook'
import { useInstructorCourseReviewsUrlParams } from '../hooks/instructor-course-reviews-url-params-hook'

export const RQK_BRIEF_COURSE = 'brief-course'
export const useInstructorBriefCourseQuery = () => {
    const { 'course._id_filter': courseIdFilter } = useInstructorCourseReviewsUrlParams()
    const value = typeof courseIdFilter != 'undefined' ? courseIdFilter + '' : undefined
    return useCourseBriefQuery(value)
}
