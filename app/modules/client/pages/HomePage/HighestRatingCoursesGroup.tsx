import React, { useEffect } from 'react'
import CourseGroup from '../../components/CourseGroup/CourseGroup'
import { GroupProvider, useCourseGroup } from '../../providers/group.provider'
import { useHighestRatingCoursesQuery } from '../../queries/highest-rating-courses-query.hook'
const limit = 10

function Main() {
    const {
        state: { page },
    } = useCourseGroup()
    const { isLoading, hasNextPage, fetchNextPage, data } = useHighestRatingCoursesQuery(limit)
    useEffect(() => {
        if (hasNextPage) {
            fetchNextPage()
        }
    }, [page, hasNextPage, fetchNextPage])
    const courses = data?.pages?.reduce((prev, current) => {
        return prev.concat(current)
    }, [])
    return (
        <CourseGroup
            isLoading={isLoading}
            title={'Highest Rating Courses'}
            courses={courses || []}
        />
    )
}

function HighestRatingCoursesGroup() {
    return (
        <GroupProvider limit={limit}>
            <Main />
        </GroupProvider>
    )
}

export default React.memo(HighestRatingCoursesGroup)
