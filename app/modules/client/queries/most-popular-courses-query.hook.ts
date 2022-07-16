import { useEffect, useState } from 'react'
import { useInfiniteQuery } from 'react-query'
import {
    countMostPopularItems,
    fetchMostPopularItems,
} from '../../../apis/course/client-course.api'
import ICourse from '../../shared/interfaces/models/course.interface'

export const RQK_MOST_POPULAR_COURSES = 'most-popular-courses'
export const useMostPopularCoursesQuery = (limit: number) => {
    const [count, setCount] = useState<number>(0)
    useEffect(() => {
        countMostPopularItems().then((value) => {
            setCount(value)
        })
    }, [])

    return useInfiniteQuery<ICourse[]>([RQK_MOST_POPULAR_COURSES, limit], fetchMostPopularItems, {
        keepPreviousData: true,
        staleTime: Infinity,
        getNextPageParam: (_lastPage, pages) => {
            if (pages.length < count) {
                return pages.length + 1
            } else return undefined
        },
    })
}
