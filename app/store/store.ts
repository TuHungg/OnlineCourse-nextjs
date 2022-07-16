import { configureStore } from '@reduxjs/toolkit'
import multiChangeReducer from './admin/multi-change.slice'
import cartReducer from './course/cart.slice'
import formCourseReducer from './course/form-course.slice'
import learnCourseReducer from './course/learn-course.slice'
// ...

export const store = configureStore({
    reducer: {
        multiChange: multiChangeReducer,
        formCourse: formCourseReducer,
        learnCourse: learnCourseReducer,
        cart: cartReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
