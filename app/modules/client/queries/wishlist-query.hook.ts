import { useMutation, useQuery, useQueryClient, UseQueryOptions } from 'react-query'
import { useAuth } from '../../auth/providers/auth.provider'
import ICourse from '../../shared/interfaces/models/course.interface'
import {
    apiAddToWishlist,
    apiDeleteFromWishlist,
    countWishlist,
    fetchWishlist,
    fetchWishlistCourseIds,
} from './../../../apis/user/user-my-courses.api'

export const RQK_WISHLIST = 'wishlist'

export const useWishlistQuery = (options?: UseQueryOptions<ICourse[]>) => {
    const {
        state: { enableAuthFetch },
    } = useAuth()
    return useQuery<ICourse[]>(RQK_WISHLIST, fetchWishlist, {
        notifyOnChangeProps: 'tracked',
        enabled: enableAuthFetch,
        ...options,
    })
}
export const useCountWishlist = () => {
    return useQuery<number>([RQK_WISHLIST, 'count'], countWishlist, {
        keepPreviousData: true,
        notifyOnChangeProps: 'tracked',
    })
}

export const RQK_WISHLIST_COURSE_IDS = 'wishlist-ids'
export const useWishlistCourseIdsQuery = (options?: UseQueryOptions<string[]>) => {
    const {
        state: { enableAuthFetch },
    } = useAuth()
    return useQuery<string[]>(RQK_WISHLIST_COURSE_IDS, fetchWishlistCourseIds, {
        notifyOnChangeProps: 'tracked',
        enabled: enableAuthFetch,
        ...options,
    })
}

export const useAddToWishlist = () => {
    const queryClient = useQueryClient()
    return useMutation(apiAddToWishlist, {
        onSuccess: (_) => {
            queryClient.invalidateQueries(RQK_WISHLIST)
            queryClient.invalidateQueries(RQK_WISHLIST_COURSE_IDS)
        },
    })
}

export const useDeleteFromWishlist = () => {
    const queryClient = useQueryClient()
    return useMutation(apiDeleteFromWishlist, {
        onSuccess: (_) => {
            queryClient.invalidateQueries(RQK_WISHLIST)
            queryClient.invalidateQueries(RQK_WISHLIST_COURSE_IDS)
        },
    })
}
