import { useMutation, useQuery, useQueryClient, UseQueryOptions } from 'react-query'
import { fetchCart } from '../../../apis/user/user.api'
import { useAuth } from '../../auth/providers/auth.provider'
import { ICart } from '../../shared/interfaces/models/user.interface'
import { apiUpdateCart } from './../../../apis/user/user.api'

export const RQK_CART = 'cart'
export const useCartQuery = (options?: UseQueryOptions<ICart>) => {
    const {
        state: { enableAuthFetch },
    } = useAuth()
    return useQuery<ICart>(RQK_CART, fetchCart, {
        notifyOnChangeProps: ['data'],
        enabled: enableAuthFetch,
        ...options,
    })
}

export const useUpdateCart = () => {
    const queryClient = useQueryClient()
    return useMutation((data: ICart) => apiUpdateCart(data), {
        onSuccess: (_) => {
            queryClient.invalidateQueries(RQK_CART)
        },
    })
}
