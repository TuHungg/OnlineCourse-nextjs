import React, { useState } from 'react'
import { useCourseDetailQuery } from '../../../queries/course-detail-query.hook'
import { useCourseReviews } from '../../../queries/course-reviews-query.hook'
import Reviews from './Reviews'

function CourseDetailReviews() {
    const [filterStar, setFilterStar] = useState<number>()
    const { data: course } = useCourseDetailQuery()
    const { isLoading, data, hasNextPage, fetchNextPage } = useCourseReviews(
        course?._id,
        filterStar
    )
    return (
        <Reviews
            isLoading={isLoading}
            data={data}
            filterStar={filterStar}
            setFilterStar={setFilterStar}
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
        />
    )
}

export default React.memo(CourseDetailReviews)
