import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Helper from '../../utils/helpers/helper.helper'
import SliceHelper from '../../utils/helpers/SliceHelper.tsx'
import { RootState } from '../store'

// Define a type for the slice state
interface MultiChangeState {
    ids: string[]
    total: number
}

// Define the initial state using that type
const initialState: MultiChangeState = {
    ids: [],
    total: 0,
}

export const multiChangeSlice = createSlice({
    name: 'multiChange',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        addMany: (state, action: PayloadAction<string[]>) => {
            state.ids = Helper.lodash.union(state.ids, action.payload)
        },
        deleteMany: (state, action: PayloadAction<string[]>) => {
            state.ids = Helper.lodash.difference(state.ids, action.payload)
        },
        add: (state, action: PayloadAction<string>) => {
            state.ids.push(action.payload)
        },
        delete: (state, action: PayloadAction<string>) => {
            state.ids = state.ids.filter((id) => id != action.payload)
        },
        deleteAll: (state) => {
            state.ids = []
        },
        sync: (state, action: PayloadAction<{ ids: string[]; total: number }>) => {
            state.ids = Helper.lodash.intersection(state.ids, action.payload.ids)
            state.total = action.payload.total
        },
        updateTotal: (state, action: PayloadAction<number>) => {
            state.total = action.payload
        },
        reset: (state) => SliceHelper.reset(state, initialState),
    },
})

export const {
    add: multiChangeAddOne,
    delete: multiChangeDeleteOne,
    deleteAll: multiChangeDeleteAll,
    addMany: multiChangeAddMany,
    deleteMany: multiChangeDeleteMany,
    sync: multiChangeSyncData,
    reset: multiChangeResetData,
} = multiChangeSlice.actions

export const selectIsAllItemsSelected = (state: RootState) => {
    const length = state.multiChange.ids.length
    return length != 0 && length == state.multiChange.total
}
export const selectMultiChangeIds = (state: RootState) => state.multiChange.ids
export const selectSelectedQty = (state: RootState) => state.multiChange.ids.length
export const selectIsItemSelected = (id: string) => {
    return (state: RootState) => state.multiChange.ids.indexOf(id) > -1
}

export default multiChangeSlice.reducer
