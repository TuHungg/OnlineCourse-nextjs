import { useEffect, useState } from 'react'
import { useInfiniteQuery } from 'react-query'
import { countLatestItems, fetchLatestCourses } from '../../../apis/course/client-course.api'
import ICourse from '../../shared/interfaces/models/course.interface'

export const RQK_LATEST_COURSES = 'latest-courses'
export const useLatestCoursesQuery = (limit: number) => {
    const [count, setCount] = useState<number>(0)
    useEffect(() => {
        countLatestItems().then((value) => {
            setCount(value)
        })
    }, [])

    return useInfiniteQuery<ICourse[]>([RQK_LATEST_COURSES, limit], fetchLatestCourses, {
        keepPreviousData: true,
        staleTime: Infinity,
        getNextPageParam: (_lastPage, pages) => {
            if (pages.length < count) {
                return pages.length + 1
            } else return undefined
        },
    })
}
