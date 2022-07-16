import React from 'react'
import { useCourseDetailQuery } from '../../../queries/course-detail-query.hook'
import ReviewsStat from '../ReviewsStat/StudentStat'

function CourseDetailReviewsStat() {
    const { data } = useCourseDetailQuery()
    return <ReviewsStat meta={data?.meta} />
}

export default React.memo(CourseDetailReviewsStat)
