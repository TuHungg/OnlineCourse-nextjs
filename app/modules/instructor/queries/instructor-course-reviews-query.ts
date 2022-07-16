import {
    useInfiniteQuery,
    UseInfiniteQueryOptions,
    useMutation,
    useQuery,
    useQueryClient,
} from 'react-query'
import {
    apiDeleteReviewResponse,
    apiUpdateReviewResponse,
    countInstructorCourseReviews,
    fetchInstructorCourseReviews,
} from '../../../apis/user/user-instructor.api'
import QueryHelper from '../../../utils/helpers/QueryHelper'
import IReview from '../../shared/interfaces/models/review.interface'
import { useInstructorParams } from '../providers/instructor-params.provider'
import { IReviewResponse } from './../../shared/interfaces/models/review.interface'
import { useInstructorCourseReviewsUrlParams } from './../hooks/instructor-course-reviews-url-params-hook'

export const RQK_INSTRUCTOR_COURSE_REVIEWS = 'instructor-course-reviews'
export const useInstructorCourseReviewsQuery = (options?: UseInfiniteQueryOptions<IReview[]>) => {
    const {
        state: { viewInstructorId },
    } = useInstructorParams()
    const clientQuery = useInstructorCourseReviewsUrlParams()
    const { data: count = 0 } = useCountInstructorCourseReviewsQuery()
    return useInfiniteQuery<IReview[]>(
        [RQK_INSTRUCTOR_COURSE_REVIEWS, clientQuery, viewInstructorId],
        fetchInstructorCourseReviews,
        {
            notifyOnChangeProps: 'tracked',
            keepPreviousData: true,
            getNextPageParam: (_lastPage, pages) =>
                QueryHelper.getNextPageParams(pages.length, 5, count),
            ...options,
        }
    )
}

export const useCountInstructorCourseReviewsQuery = () => {
    const {
        state: { viewInstructorId },
    } = useInstructorParams()
    const clientQuery = useInstructorCourseReviewsUrlParams()
    return useQuery<number>(
        [RQK_INSTRUCTOR_COURSE_REVIEWS, clientQuery, viewInstructorId, 'count'],
        countInstructorCourseReviews,
        {
            keepPreviousData: true,
            notifyOnChangeProps: 'tracked',
        }
    )
}

export const useUpdateReviewResponse = () => {
    const queryClient = useQueryClient()
    return useMutation(
        (payload: { id: string; data: Partial<IReviewResponse> }) =>
            apiUpdateReviewResponse(payload.id, payload.data),
        {
            onMutate: () => {},
            onSuccess: (result) => {
                queryClient.invalidateQueries([RQK_INSTRUCTOR_COURSE_REVIEWS])
            },
        }
    )
}
export const useDeleteReviewResponse = () => {
    const queryClient = useQueryClient()
    return useMutation(apiDeleteReviewResponse, {
        onMutate: () => {},
        onSuccess: (result) => {
            queryClient.invalidateQueries([RQK_INSTRUCTOR_COURSE_REVIEWS])
        },
    })
}
