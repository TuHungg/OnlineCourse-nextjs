import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { apiUpdate } from '../../apis/acp/admin.api'
import { apiCompletedUnit, apiUncompletedUnit } from '../../apis/user/user-learning.api'
import { IUserCourse } from '../../modules/shared/interfaces/models/user_course.interface'
import Helper from '../../utils/helpers/helper.helper'
import SliceHelper from '../../utils/helpers/SliceHelper.tsx'
import TypeHelper from '../../utils/helpers/type.helper'
import { RootState } from '../store'
import { TAsyncStatus } from '../types/slice-status.type'
import {
    ICourseSection,
    ICourseUnit,
} from './../../modules/shared/interfaces/models/course.interface'
import { ILearnDetail } from './../../modules/shared/interfaces/models/user_course.interface'
interface IContentAddress {
    sIdx: number
    uIdx: number
}

type TActiveContent = {
    section?: ICourseSection
    unit?: ICourseUnit
}

interface LearnSlice {
    data?: IUserCourse
    activeContent?: TActiveContent
    status: TAsyncStatus
}

const initialState: LearnSlice = {
    status: 'idle',
    activeContent: undefined,
    data: undefined,
}
// THUNKS

export const updateCourseById = createAsyncThunk(
    'learn/updateById',
    async (data: Partial<IUserCourse>, thunkApi) => {
        const state = thunkApi.getState() as RootState
        const response = await apiUpdate('user-course', state.learnCourse.data!._id, data)
        return response
    }
)
//
export const nextContent = createAsyncThunk('learn/next-content', async (_, thunkApi) => {
    const { nextSIdx, nextUIdx } = selectNextContentAddress(thunkApi.getState() as RootState)
    thunkApi.dispatch(setActiveContent({ sIdx: nextSIdx, uIdx: nextUIdx }))
})
export const setActiveContent = createAsyncThunk(
    'learn/set-active-content',
    async (data: IContentAddress, thunkApi) => {
        const state = thunkApi.getState() as RootState
        const section = state.learnCourse.data?.course.details.sections?.at(data.sIdx)
        const uId = section?.units.at(data.uIdx)
        const response = await apiUpdate<IUserCourse>('user-course', state.learnCourse.data!._id, {
            learnDetail: {
                activeContentIds: [section?._id!, uId?._id!],
            } as ILearnDetail,
        })
        return response
    }
)
//
export const completedUnit = createAsyncThunk(
    'learn/completed-unit',
    async (payload: { unitId: string }, thunkApi) => {
        const state = thunkApi.getState() as RootState
        const data = await apiCompletedUnit({
            id: state.learnCourse.data?._id!,
            unitId: payload.unitId,
        })
        return data
    }
)
//
export const uncompletedUnit = createAsyncThunk(
    'learn/uncompleted-unit',
    async (payload: { unitId: string }, thunkApi) => {
        const state = thunkApi.getState() as RootState
        const data = await apiUncompletedUnit({
            id: state.learnCourse.data?._id!,
            unitId: payload.unitId,
        })
        return data
    }
)

// SLICE
export const learnCourseSlice = createSlice({
    name: 'learn',
    initialState,
    reducers: {
        // BASICS
        setLearnCourseStatus: (state, action: PayloadAction<TAsyncStatus>) => {
            state.status = action.payload
        },
        setLearnCourse: (state, action: PayloadAction<IUserCourse>) => {
            state.status = 'succeeded'
            state.data = action.payload as any
            if (!state.activeContent && state.data) {
                if (state.data?.learnDetail.activeContentIds.length > 0) {
                    const [sId, uId] = state.data?.learnDetail.activeContentIds
                    const section = state.data.course.details.sections?.find(
                        (item) => item._id == sId
                    )
                    const unit = section?.units.find((item) => item._id == uId)
                    state.activeContent = {
                        section,
                        unit,
                    }
                } else {
                    const section = state.data?.course.details.sections?.at(0)
                    state.activeContent = {
                        section,
                        unit: section?.units.at(0),
                    }
                }
            }
        },
        setActiveContent: (state, action: PayloadAction<{ sIdx: number; uIdx: number }>) => {
            const { sIdx, uIdx } = action.payload
            state.activeContent = {
                section: state.data?.course.details.sections?.at(sIdx),
                unit: state.data?.course.details.sections?.at(sIdx)?.units.at(uIdx),
            }
        },
        reset: (state) => SliceHelper.reset(state, initialState),
    },
    extraReducers(builder) {
        builder
            //fetch course
            .addCase(completedUnit.fulfilled, (state, action) => {
                const existItem = state.data?.learnDetail.learnUnits.find((item) => {
                    return item._id == action.payload._id
                })
                if (existItem) {
                    existItem.isCompleted = true
                } else {
                    state.data?.learnDetail.learnUnits.push(action.payload as any)
                }
            })
            .addCase(uncompletedUnit.fulfilled, (state, action) => {
                const existItem = state.data?.learnDetail.learnUnits.find((item) => {
                    return item._id == action.payload._id
                })
                if (existItem) {
                    existItem.isCompleted = false
                } else {
                    state.data?.learnDetail.learnUnits.push(action.payload as any)
                }
            })
            .addCase(updateCourseById.fulfilled, (state, action) => {
                Helper.lodash.merge(state.data, action.meta.arg)
            })
            .addCase(setActiveContent.pending, (state, action) => {
                const { sIdx, uIdx } = action.meta.arg
                state.activeContent = {
                    section: state.data?.course.details.sections?.at(sIdx),
                    unit: state.data?.course.details.sections?.at(sIdx)?.units.at(uIdx),
                }
            })
    },
})
// SELECTORS
export const selectLearnSections = (state: RootState) =>
    state.learnCourse.data?.course.details.sections
//
export const selectLearnSection = (sIdx: number) => (state: RootState) =>
    selectLearnSections(state)?.at(sIdx)
//
export const selectLearnUnit = (sIdx: number, uIdx: number) => (state: RootState) =>
    selectLearnSections(state)?.at(sIdx)?.units.at(uIdx)
//
export const selectLearnLecture = (sIdx: number, uIdx: number) => (state: RootState) => {
    const unit = selectLearnUnit(sIdx, uIdx)(state)
    return TypeHelper.isLecture(unit?.lecture) ? unit?.lecture : undefined
}
//
export const selectLearnQuiz = (sIdx: number, uIdx: number) => (state: RootState) => {
    const unit = selectLearnUnit(sIdx, uIdx)(state)
    return TypeHelper.isQuiz(unit?.quiz) ? unit?.quiz : undefined
}
//
export const selectActiveLecture = (state: RootState) => {
    const unit = state.learnCourse.activeContent?.unit
    return TypeHelper.isLecture(unit?.lecture) ? unit?.lecture : undefined
}
export const selectActiveQuiz = (state: RootState) => {
    const unit = state.learnCourse.activeContent?.unit
    return TypeHelper.isQuiz(unit?.quiz) ? unit?.quiz : undefined
}
//
export const selectActiveUnit = (state: RootState) => {
    return state.learnCourse.activeContent?.unit
}
//
export const isActiveUnit = (id: string) => (state: RootState) => {
    return state.learnCourse.activeContent?.unit?._id == id
}
//
export const selectActiveSectionIdx = (state: RootState) => {
    const activeSectionId = state.learnCourse.activeContent?.section?._id
    if (activeSectionId) {
        const idx = state.learnCourse.data?.course.details.sections?.findIndex(
            (item) => item._id == activeSectionId
        )
        return idx != undefined ? idx : -1
    }
    return -1
}
export const selectActiveUnitIdx = (state: RootState) => {
    const idx = state.learnCourse.activeContent?.section?.units.findIndex(
        (item) => item._id == state.learnCourse.activeContent?.unit?._id
    )
    return typeof idx == 'undefined' ? -1 : idx
}
//
export const checkIsCompletedUnit = (id: string) => (state: RootState) => {
    const learnUnit = state.learnCourse.data?.learnDetail.learnUnits.find(
        (item) => item.unitId == id
    )
    return learnUnit?.isCompleted || false
}
//
export const selectLearnUnitNo = (sectionIdx: number, unitIdx: number) => {
    return (state: RootState) => {
        let no = 0
        for (let key in state.learnCourse.data?.course.details.sections) {
            const sIdx = Number.parseInt(key)
            if (sIdx < sectionIdx)
                no += state.learnCourse.data?.course.details.sections.at(sIdx)?.units.length || 0
            else if (sIdx == sectionIdx) {
                return no + unitIdx + 1
            } else return no
        }
    }
}
//
export const countCompletedUnit = (state: RootState) => {
    const total = state.learnCourse.data?.learnDetail.learnUnits.reduce((prev, current) => {
        return prev + (current.isCompleted ? 1 : 0)
    }, 0)
    return total
}
export const countTotalUnit = (state: RootState) => {
    const total = state.learnCourse.data?.course.details.sections?.reduce((prev, current) => {
        return prev + current.units.length
    }, 0)
    return total
}
//
export const selectLearnTitle = (state: RootState) => {
    return state.learnCourse.data?.course.basicInfo.title
}

export const selectLearnCourseSlug = (state: RootState) => {
    return state.learnCourse.data?.course.basicInfo.slug
}

export const selectLearnCourseId = (state: RootState) => {
    return state.learnCourse.data?.course._id
}
export const selectLearnId = (state: RootState) => {
    return state.learnCourse.data?._id
}
export const selectNextContentAddress = (state: RootState) => {
    const sIdx = selectActiveSectionIdx(state)
    const uIdx = selectActiveUnitIdx(state)
    let nextSIdx = sIdx,
        nextUIdx = uIdx
    const activeSection = state.learnCourse.activeContent?.section
    const activeUnit = state.learnCourse.activeContent?.unit

    if (activeSection) {
        if (uIdx < activeSection.units.length - 1) nextUIdx++
        else if (sIdx < (state.learnCourse.data?.course.details.sections?.length || 0) - 1) {
            nextSIdx++
            nextUIdx = 0
        }
    }
    return { nextSIdx, nextUIdx }
}

// ACTIONS
export const {
    setActiveContent: setStateActiveContent,
    setLearnCourseStatus,
    setLearnCourse,
    reset: resetLearnCourse,
} = learnCourseSlice.actions
export default learnCourseSlice.reducer
