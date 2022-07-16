import React, { useCallback, useMemo } from 'react'
import AppTitle from '../../../../../utils/constants/app-title.constant'
import MyHead from '../../../../shared/components/MyHead'
import { IMenuItem } from '../../../../shared/interfaces/menu-item.interface'
import { IUserCourse } from '../../../../shared/interfaces/models/user_course.interface'
import {
    useArchivedCoursesQuery,
    useUnarchiveCourses,
} from '../../../queries/archived-courses-query'
import MyCourseList from '../MyCourseList'
import ArchivedCourseExcerpt from './ArchivedCourseExcerpt'

export default function ArchivedCourses() {
    const { isLoading, data: items } = useArchivedCoursesQuery()
    const { mutate: unarchiveCourses } = useUnarchiveCourses()

    const actions: IMenuItem<IUserCourse>[] = useMemo(() => {
        return [
            {
                label: 'Unarchive',
                onItemClick: (item) => {
                    unarchiveCourses([item._id])
                },
            },
        ]
    }, [unarchiveCourses])

    const renderItem = useCallback(
        (item: IUserCourse, i) => {
            return <ArchivedCourseExcerpt key={i} item={item} actions={actions} />
        },
        [actions]
    )

    return (
        <>
            <MyHead title={AppTitle.ARCHIVED_COURSES} />
            <MyCourseList isLoading={isLoading} items={items || []} renderItem={renderItem} />
        </>
    )
}
