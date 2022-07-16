import { useMutation, useQuery, useQueryClient, UseQueryOptions } from 'react-query'
import { fetchAuthUser } from '../../../apis/auth.api'
import { IUser } from '../../shared/interfaces/models/user.interface'
import { apiSwitchToInstructor } from './../../../apis/user/user.api'

export const RQK_AUTH_USER = 'auth-user'
export const useAuthUser = (options?: UseQueryOptions<IUser>) => {
    return useQuery<IUser>([RQK_AUTH_USER], () => fetchAuthUser(), {
        notifyOnChangeProps: ['data', 'error'],
        retry: false,
        staleTime: Infinity,
        ...options,
    })
}

export const useSwitchToInstructor = () => {
    const queryClient = useQueryClient()
    return useMutation(() => apiSwitchToInstructor(), {
        onSuccess: (_) => {
            queryClient.invalidateQueries(RQK_AUTH_USER)
        },
    })
}
