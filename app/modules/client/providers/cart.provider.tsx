import lodash from 'lodash'
import React, {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react'
import { useDispatch } from 'react-redux'
import { apiCheckoutMomo } from '../../../apis/user/user.api'
import {
    addCourseToCart,
    removeCourseInCart,
    setCart,
    xAddCourseToCart,
    xRemoveCourseInCart,
} from '../../../store/course/cart.slice'
import AppMsg from '../../../utils/constants/app-messsage.constant'
import Helper from '../../../utils/helpers/helper.helper'
import LocalStorageHelper from '../../../utils/helpers/localStorage.helper'
import NotifyHelper from '../../../utils/helpers/notify.helper'
import { useAuth } from '../../auth/providers/auth.provider'
import { useClientToast } from '../../shared/hooks/client-toast.hook'
import ICourse from '../../shared/interfaces/models/course.interface'
import { useCartQuery, useUpdateCart } from '../queries/cart-query.hook'

interface ICartProvider {
    paying: boolean
    addToCart: (item: ICourse) => void
    deleteCourseInCart: (item: ICourse) => void
    onCheckout: () => void
}
const CartContext = createContext<ICartProvider>({} as ICartProvider)

export const useCart = () => {
    return useContext(CartContext)
}

export function CartProvider({ children }: { children: ReactNode }) {
    const [paying, setPaying] = useState<boolean>(false)
    const dispatch = useDispatch()
    const { mutate: updateCart } = useUpdateCart()
    const toast = useClientToast()
    const {
        state: { user },
    } = useAuth()
    const { data: userCart } = useCartQuery()

    // SET LOCAL CART
    useEffect(() => {
        const cart = LocalStorageHelper.getCart()
        if (cart) dispatch(setCart(cart))
    }, [dispatch])

    // SET USER CART
    useEffect(() => {
        if (!!userCart) {
            const localCart = LocalStorageHelper.getCart()
            const merged = Helper.mergeByKey<ICourse>(
                userCart.courses,
                localCart?.courses || [],
                '_id'
            )
            // set cart
            dispatch(setCart({ courses: merged }))
            // sync cart
            const userCartCourseIds = userCart.courses.map((item) => item._id)
            const mergeCourseIds = merged.map((item) => item._id)
            if (!lodash.isEqual(userCartCourseIds, mergeCourseIds)) {
                updateCart({ courses: mergeCourseIds as any })
            }
        }
    }, [userCart, dispatch, updateCart])
    const addToCart = useCallback(
        (item: ICourse) => {
            if (user) {
                dispatch(xAddCourseToCart(item))
            } else dispatch(addCourseToCart(item))
            toast(NotifyHelper.success('Course added to cart'))
        },
        [dispatch, toast, user]
    )
    //
    const deleteCourseInCart = useCallback(
        (item: ICourse) => {
            if (user) {
                dispatch(xRemoveCourseInCart(item))
            } else dispatch(removeCourseInCart(item))
        },
        [dispatch, user]
    )

    const onCheckout = useCallback(async () => {
        try {
            setPaying(true)
            const url = await apiCheckoutMomo()
            LocalStorageHelper.clearCart()
            location.href = url
        } catch (e: any) {
            toast(
                NotifyHelper.warning(AppMsg.TRY_AGAIN_LATER, AppMsg.PAYMENT_SERVICE_NOT_AVAILABLE)
            )
        } finally {
            setPaying(false)
        }
    }, [toast])

    const state = useMemo(
        () => ({
            paying,
            addToCart,
            deleteCourseInCart,
            onCheckout,
        }),
        [addToCart, deleteCourseInCart, onCheckout, paying]
    )

    return <CartContext.Provider value={state}>{children}</CartContext.Provider>
}
