import React, { useEffect } from 'react'
import CourseGroup from '../../components/CourseGroup/CourseGroup'
import { GroupProvider, useCourseGroup } from '../../providers/group.provider'
import { useMostPopularCoursesQuery } from '../../queries/most-popular-courses-query.hook'
const limit = 10

function Main() {
    const {
        state: { page },
    } = useCourseGroup()
    const { isLoading, hasNextPage, fetchNextPage, data } = useMostPopularCoursesQuery(limit)
    useEffect(() => {
        if (hasNextPage) {
            fetchNextPage()
        }
    }, [page, hasNextPage, fetchNextPage])
    const courses = data?.pages?.reduce((prev, current) => {
        return prev.concat(current)
    }, [])
    return (
        <CourseGroup isLoading={isLoading} title={'Most Popular Courses'} courses={courses || []} />
    )
}

function MostPopularCoursesGroup() {
    return (
        <GroupProvider limit={limit}>
            <Main />
        </GroupProvider>
    )
}

export default React.memo(MostPopularCoursesGroup)
