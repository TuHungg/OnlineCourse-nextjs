import { useMutation, useQuery, useQueryClient, UseQueryOptions } from 'react-query'
import {
    apiDeleteUserReview,
    apiUpdateUserReview,
    fetchUserReview,
} from '../../../apis/user/user-review.api'
import IReview from '../../shared/interfaces/models/review.interface'

export const RQK_USER_REVIEW = 'user-review'
export const useUserRatingQuery = (courseId: string, options?: UseQueryOptions<IReview>) => {
    return useQuery<IReview>([RQK_USER_REVIEW, courseId], () => fetchUserReview(courseId), {
        notifyOnChangeProps: 'tracked',
        ...options,
    })
}

export const useUpdateUserReview = () => {
    const queryClient = useQueryClient()
    return useMutation(
        (data: { courseId: string; data: Partial<IReview> }) =>
            apiUpdateUserReview(data.courseId, data.data),
        {
            onSuccess: (_, data) => {
                queryClient.invalidateQueries([RQK_USER_REVIEW, data.courseId])
            },
        }
    )
}
export const useDeleteUserReview = () => {
    const queryClient = useQueryClient()
    return useMutation(
        ({ reviewId }: { courseId: string; reviewId: string }) => apiDeleteUserReview(reviewId),
        {
            onSuccess: (_, data) => {
                queryClient.invalidateQueries([RQK_USER_REVIEW, data.courseId])
            },
        }
    )
}
