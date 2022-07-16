import { useEffect, useState } from 'react'
import { useInfiniteQuery } from 'react-query'
import {
    countHighestRatingItems,
    fetchHighestRatingItems,
} from '../../../apis/course/client-course.api'
import ICourse from '../../shared/interfaces/models/course.interface'

export const RQK_HIGHEST_RATING_COURSES = 'highest-rating-courses'
export const useHighestRatingCoursesQuery = (limit: number) => {
    const [count, setCount] = useState<number>(0)
    useEffect(() => {
        countHighestRatingItems().then((value) => {
            setCount(value)
        })
    }, [])

    return useInfiniteQuery<ICourse[]>(
        [RQK_HIGHEST_RATING_COURSES, limit],
        fetchHighestRatingItems,
        {
            keepPreviousData: true,
            staleTime: Infinity,
            getNextPageParam: (_lastPage, pages) => {
                if (pages.length < count) {
                    return pages.length + 1
                } else return undefined
            },
        }
    )
}
