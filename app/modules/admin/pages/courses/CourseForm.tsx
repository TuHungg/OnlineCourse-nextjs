import React, { useCallback, useEffect } from 'react'
import { formCourseSetStatus, setFormCourse } from '../../../../store/course/form-course.slice'
import { useAppDispatch } from '../../../../store/hooks'
import AppTitle from '../../../../utils/constants/app-title.constant'
import { useCourseFormParams } from '../../../course-form/hooks/course-form-params.hook'
import { useCourseQuery } from '../../../course-form/hooks/course-query.hook'
import Basics from '../../../course-form/pages/Basics'
import Curriculum from '../../../course-form/pages/Curriculum'
import IntendedLearners from '../../../course-form/pages/IntendedLearners'
import Messages from '../../../course-form/pages/Messages'
import Pricing from '../../../course-form/pages/Pricing'
import Promotions from '../../../course-form/pages/Promotions'
import Settings from '../../../course-form/pages/Settings'
import { TCourseFormSection } from '../../../course-form/types/course-form-sectiontype'
import Card from '../../../shared/components/Card'
import MyHead from '../../../shared/components/MyHead'

export default function CourseForm() {
    const { id, section } = useCourseFormParams()
    const { isLoading, data } = useCourseQuery(id)
    //
    const dispatch = useAppDispatch()

    // form course
    useEffect(() => {
        if (data) {
            dispatch(setFormCourse(data))
        }
    }, [dispatch, data])

    // status
    useEffect(() => {
        const status = isLoading ? 'loading' : 'succeeded'
        dispatch(formCourseSetStatus(status))
    }, [dispatch, isLoading])

    const renderSection = useCallback((section?: TCourseFormSection) => {
        switch (section) {
            case 'goal':
                return <IntendedLearners />
            case 'curriculum':
                return <Curriculum />
            case 'basics':
                return <Basics />
            case 'pricing':
                return <Pricing />
            case 'messages':
                return <Messages />
            case 'promotions':
                return <Promotions />
            case 'settings':
                return <Settings />
        }
        return null
    }, [])

    const title = data?.basicInfo.title ? `${data?.basicInfo.title} | ` : ''
    return (
        <>
            <MyHead title={`${title}${AppTitle.COURSE_FORM}`} />
            <Card>{renderSection(section)}</Card>
        </>
    )
}
