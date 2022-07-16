import { useEffect, useState } from 'react'
import { useInfiniteQuery, UseInfiniteQueryOptions } from 'react-query'
import { countCourseReviews, fetchCourseReviews } from '../../../apis/course/course-reviews.api'
import QueryHelper from '../../../utils/helpers/QueryHelper'
import IReview from '../../shared/interfaces/models/review.interface'

const itemsPerPage = 2
export const RQK_COURSE_REVIEWS = 'course-reviews'
export const useCourseReviews = (
    courseId?: string,
    filterStar?: number,
    options?: UseInfiniteQueryOptions<IReview[]>
) => {
    const [count, setCount] = useState<number>(0)
    useEffect(() => {
        if (courseId) {
            countCourseReviews(courseId, filterStar).then((value) => {
                setCount(value)
            })
        }
    }, [courseId, filterStar])
    return useInfiniteQuery<IReview[]>(
        [RQK_COURSE_REVIEWS, courseId, itemsPerPage, filterStar],
        fetchCourseReviews,
        {
            notifyOnChangeProps: 'tracked',
            keepPreviousData: true,
            staleTime: Infinity,
            getNextPageParam: (_lastPage, pages) =>
                QueryHelper.getNextPageParams(pages.length, itemsPerPage, count),
            enabled: !!courseId,
            ...options,
        }
    )
}
