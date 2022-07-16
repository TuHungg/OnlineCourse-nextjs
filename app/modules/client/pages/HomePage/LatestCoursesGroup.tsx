import React, { useEffect } from 'react'
import CourseGroup from '../../components/CourseGroup/CourseGroup'
import { GroupProvider, useCourseGroup } from '../../providers/group.provider'
import { useLatestCoursesQuery } from '../../queries/latest-courses-query.hook'
const limit = 10

function Main() {
    const {
        state: { page },
    } = useCourseGroup()
    const { isLoading, hasNextPage, fetchNextPage, data } = useLatestCoursesQuery(limit)
    useEffect(() => {
        if (hasNextPage) {
            fetchNextPage()
        }
    }, [page, hasNextPage, fetchNextPage])
    const courses = data?.pages?.reduce((prev, current) => {
        return prev.concat(current)
    }, [])
    return <CourseGroup isLoading={isLoading} title={'Latest Courses'} courses={courses || []} />
}

function LatestCoursesGroup() {
    return (
        <GroupProvider limit={limit}>
            <Main />
        </GroupProvider>
    )
}

export default React.memo(LatestCoursesGroup)
