import { Select, Skeleton } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { ChangeEventHandler, useCallback, useEffect, useState } from 'react'
import { ChangeHandler } from 'react-hook-form'
import { useUrlHelper } from '../../shared/hooks/url-helper.hook'
import { useStudentsUrlParams } from '../hooks/students.url-params.hook'
import IInstructorCourse from '../interfaces/instructor-course.interface'
import { useInstructorCoursesQuery } from '../queries/instructor-courses-query.hook'

export interface InstructorCourseFilterProps {
    isUrlFilter?: boolean
    onChange?: ChangeEventHandler<HTMLSelectElement>
}
export default function InstructorCourseFilter({
    isUrlFilter = true,
    ...props
}: InstructorCourseFilterProps) {
    const urlParams = useStudentsUrlParams()
    const [value, setValue] = useState<string>()
    const router = useRouter()
    const { getUrlWithQueryParams } = useUrlHelper()
    const { isLoading, data: courses } = useInstructorCoursesQuery({
        _limit: 10,
        _sortBy: 'timestamps.createdAt',
        _order: 'desc',
        status_filter: 'active',
    })
    //
    const { 'course._id_filter': courseIdFilter } = urlParams
    useEffect(() => {
        if (isUrlFilter) {
            const value = typeof courseIdFilter != 'undefined' ? courseIdFilter + '' : undefined
            setValue(value)
        }
    }, [courseIdFilter, isUrlFilter])
    //
    const onChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
        const value = e.target.value
        setValue(value)
        if (isUrlFilter) {
            //
            const url = getUrlWithQueryParams({
                'course._id_filter': value,
            })
            router.push(url)
        }
        props.onChange && props.onChange(e)
    }
    const renderCourseOption = useCallback((item: IInstructorCourse, i: number) => {
        return (
            <option key={item._id} value={item._id}>
                {item.basicInfo.title}
            </option>
        )
    }, [])
    return (
        <Skeleton isLoaded={!isLoading}>
            <Select placeholder="All courses" w="fit-content" onChange={onChange} value={value}>
                {courses?.map(renderCourseOption)}
            </Select>
        </Skeleton>
    )
}
