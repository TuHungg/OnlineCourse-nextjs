import React, { useCallback, useMemo } from 'react'
import AppTitle from '../../../../../utils/constants/app-title.constant'
import MyHead from '../../../../shared/components/MyHead'
import { IMenuItem } from '../../../../shared/interfaces/menu-item.interface'
import { IUserCourse } from '../../../../shared/interfaces/models/user_course.interface'
import { useArchiveCourses, useLearningCourses } from '../../../queries/learning-courses-query.hook'
import MyCourseList from '../MyCourseList'
import LearningCourseExcerpt from './LearningCourseExcerpt'

export default function LearningCourses() {
    const { isLoading, data: items } = useLearningCourses()
    const { mutate: archiveCourses } = useArchiveCourses()

    const actions: IMenuItem<IUserCourse>[] = useMemo(() => {
        return [
            {
                label: 'Archive',
                onItemClick: (item) => {
                    archiveCourses([item._id])
                },
            },
        ]
    }, [archiveCourses])

    const renderItem = useCallback(
        (item: IUserCourse, i) => {
            return <LearningCourseExcerpt key={i} item={item} actions={actions} />
        },
        [actions]
    )

    return (
        <>
            <MyHead title={AppTitle.MY_COURSES} />
            <MyCourseList isLoading={isLoading} items={items || []} renderItem={renderItem} />
        </>
    )
}
