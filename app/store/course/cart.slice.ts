import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { apiAddCourseToCart, apiDeleteCourseInCart, updateMe } from '../../apis/user/user.api'
import ICourse from '../../modules/shared/interfaces/models/course.interface'
import { ICart } from '../../modules/shared/interfaces/models/user.interface'
import Helper from '../../utils/helpers/helper.helper'
import LocalStorageHelper from '../../utils/helpers/localStorage.helper'
import CourseHelper from '../../utils/helpers/model-helpers/course.helper'
import { RootState } from '../store'
interface CartSlice {
    data: ICart
}

const initialState: CartSlice = {
    data: {
        courses: [],
    },
}

// THUNKS
export const xAddCourseToCart = createAsyncThunk(
    'cart/add-course-to-cart',
    async (item: ICourse, thunkApi) => {
        thunkApi.dispatch(addCourseToCart(item))
        const data = await apiAddCourseToCart(item._id)
        return data
    }
)
export const xRemoveCourseInCart = createAsyncThunk(
    'cart/delete-course-in-cart',
    async (item: ICourse, thunkApi) => {
        thunkApi.dispatch(removeCourseInCart(item))
        const data = await apiDeleteCourseInCart(item._id)
        return data
    }
)

// SLICE
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // BASICS
        setCart: (state, action: PayloadAction<ICart>) => {
            state.data = action.payload as any
            state.data && LocalStorageHelper.setCart(state.data as any)
        },
        resetCart: (state, action: PayloadAction<void>) => {
            for (let key in initialState) {
                ;(state as any)[key] = (initialState as any)[key]
            }
            state.data && LocalStorageHelper.setCart(state.data as any)
        },
        //
        addCourseToCart: (state, action: PayloadAction<ICourse>) => {
            const existIdx = state.data?.courses.findIndex((item) => item._id == action.payload._id)
            if (existIdx == -1) state.data?.courses.push(action.payload as any)
            state.data && LocalStorageHelper.setCart(state.data)
        },
        removeCourseInCart: (state, action: PayloadAction<ICourse>) => {
            if (state.data?.courses) {
                state.data.courses = state.data.courses.filter(
                    (item) => item._id != action.payload._id
                )
                state.data && LocalStorageHelper.setCart(state.data)
            }
        },
    },
    extraReducers(builder) {},
})
// SELECTOR
export const isCartExist = (state: RootState) => {
    return !!state.cart.data
}
export const selectCoursesInCart = (state: RootState) => {
    return state.cart.data?.courses || []
}
export const selectTotalCourse = (state: RootState) => {
    return state.cart.data?.courses.length || 0
}
export const selectTotalOriginPrice = (state: RootState) => {
    let price =
        state.cart.data?.courses.reduce((prev, current) => {
            return prev + (current.basicInfo.price || 0)
        }, 0) || 0
    price = Number.parseFloat(price.toFixed(2))
    return price
}
export const selectTotalSellPrice = (state: RootState) => {
    const price = CourseHelper.getTotalSellPrice(state.cart.data)
    return price
}
export const isCourseInCart = (id: string) => (state: RootState) => {
    return !!state.cart.data?.courses.find((item) => item._id == id)
}

// ACTIONS
export const { resetCart, setCart, addCourseToCart, removeCourseInCart } = cartSlice.actions
export default cartSlice.reducer
