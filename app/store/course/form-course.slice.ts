import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchById, apiUpdate } from '../../apis/acp/admin.api'
import {
    apiAddCourseUnit,
    apiMoveCourseUnitToSection,
    apiSwapCourseSection,
    apiSwapCourseUnit,
    apiUpdateCourseSection,
    apiUpdateLectureVideo,
    TMoveCourseUnitToSection,
    TUpdateCourseSection,
} from '../../apis/course/course-form.api'
import {
    apiAddResource,
    apiAddResourceId,
    apiRemoveResource,
    apiUpdateLecture,
} from '../../apis/lecture.api'
import {
    apiAddQuizQuestion,
    apiDeleteQuizQuestion,
    apiUpdateQuiz,
    apiUpdateQuizQuestion,
} from '../../apis/quiz.api'
import ICourse, {
    ICourseSection,
    ICourseUnit,
} from '../../modules/shared/interfaces/models/course.interface'
import IFile from '../../modules/shared/interfaces/models/file.interface'
import ILecture from '../../modules/shared/interfaces/models/lecture.interface'
import IQuiz, { IQuestion } from '../../modules/shared/interfaces/models/quiz.interface'
import Helper from '../../utils/helpers/helper.helper'
import TypeHelper from '../../utils/helpers/type.helper'
import { RootState } from '../store'
import {
    apiAddCourseSection,
    apiDeleteCourseSection,
    apiDeleteCourseUnit,
    TAddCourseSection,
    TDeleteCourseSection,
} from '../../apis/course/course-form.api'
import { IUnitAddress } from './../../modules/course-form/interaces/unit-address.interface'
import { ISwapByIds } from './../../modules/shared/interfaces/swap.inteface'
import { IUnitSwapByIds } from './../../modules/shared/interfaces/unit-swap.interface'

export const fetchFormCourseById = createAsyncThunk(
    'courses/fetchById',
    async (courseId: string, thunkAPI): Promise<ICourse> => {
        const data = await fetchById<ICourse>('courses', courseId)
        return data
    }
)

export const updateCourseById = createAsyncThunk(
    'courses/updateById',
    async (data: Partial<ICourse>, thunkApi) => {
        const state = thunkApi.getState() as RootState
        const response = await apiUpdate('courses', state.formCourse.course!._id, data)
        return response
    }
)

export const swapCourseSection = createAsyncThunk(
    'courses/swapCourseSection',
    async (payload: ISwapByIds, thunkAPI): Promise<ICourse> => {
        const state = thunkAPI.getState() as RootState
        return apiSwapCourseSection(state.formCourse.course!._id, payload)
    }
)

export const swapCourseUnit = createAsyncThunk(
    'courses/swapCourseUnit',
    async (payload: IUnitSwapByIds, thunkAPI): Promise<ICourse> => {
        const state = thunkAPI.getState() as RootState
        return apiSwapCourseUnit(state.formCourse.course!._id, payload)
    }
)

// DETAILS
export type TUpdateCourseLectureFile = {
    lectureId: string
    data: Partial<IFile>
} & IUnitAddress
export const updateCourseLectureVideo = createAsyncThunk(
    'courses/updateCourseLectureVideo',
    async (payload: TUpdateCourseLectureFile, thunkAPI): Promise<IFile> => {
        return apiUpdateLectureVideo(payload.lectureId, payload.data)
    }
)
export const addCourseLectureResource = createAsyncThunk(
    'courses/addCourseLectureResource',
    async (payload: TUpdateCourseLectureFile, thunkAPI): Promise<IFile> => {
        return apiAddResource(payload.lectureId, payload.data)
    }
)
export const addCourseLectureResourceId = createAsyncThunk(
    'courses/addCourseLectureResourceId',
    async (payload: { lectureId: string; resourceId: string }, thunkAPI): Promise<void> => {
        return apiAddResourceId(payload.lectureId, payload.resourceId)
    }
)
export const removeCourseLectureResource = createAsyncThunk(
    'courses/removeCourseLectureResource',
    async (payload: { lectureId: string; resourceId: string }, thunkAPI): Promise<void> => {
        return apiRemoveResource(payload.lectureId, payload.resourceId)
    }
)
export const addCourseSection = createAsyncThunk(
    'courses/addCourseSection',
    async (payload: TAddCourseSection, thunkAPI): Promise<ICourseSection> => {
        const state = thunkAPI.getState() as RootState
        return apiAddCourseSection(state.formCourse.course!._id, payload)
    }
)
export const addCourseUnit = createAsyncThunk(
    'courses/addCourseUnit',
    async (
        payload: { sectionId: string; unitIdx: number; unit: Partial<ICourseUnit> },
        thunkAPI
    ): Promise<ICourseUnit> => {
        const state = thunkAPI.getState() as RootState
        return apiAddCourseUnit(state.formCourse.course!._id, {
            sectionId: payload.sectionId,
            unit: payload.unit,
            unitIndex: payload.unitIdx,
        })
    }
)
export const updateCourseSection = createAsyncThunk(
    'courses/updateCourseSection',
    async (payload: TUpdateCourseSection, thunkAPI): Promise<ICourse> => {
        const state = thunkAPI.getState() as RootState
        return apiUpdateCourseSection(state.formCourse.course!._id, payload)
    }
)

export const addLecture = createAsyncThunk(
    'courses/addLecture',
    async (
        payload: { sectionIndex: number; unitIndex: number; data: Partial<ILecture> },
        thunkAPI
    ): Promise<ILecture> => {
        const state = thunkAPI.getState() as RootState
        const val =
            state.formCourse.curriculum![payload.sectionIndex].units[payload.unitIndex].lecture
        const lecture = TypeHelper.isLecture(val) ? val : undefined
        return apiUpdateLecture(lecture!._id, payload.data)
    }
)
export const updateLecture = createAsyncThunk(
    'courses/updateLecture',
    async (
        payload: { unitAddress: IUnitAddress; data: Partial<ILecture> },
        thunkAPI
    ): Promise<ILecture> => {
        const state = thunkAPI.getState() as RootState
        const [sectionIdx, unitIdx] = selectSectionNUnitIndex(
            payload.unitAddress.sectionId,
            payload.unitAddress.unitId
        )(state)
        const val = state.formCourse.curriculum![sectionIdx].units[unitIdx].lecture
        const lecture = TypeHelper.isLecture(val) ? val : undefined
        return apiUpdateLecture(lecture!._id, payload.data)
    }
)

// QUIZ
export const updateQuiz = createAsyncThunk(
    'courses/updateQuiz',
    async (
        payload: { unitAddress: IUnitAddress; data: Partial<IQuiz> },
        thunkAPI
    ): Promise<IQuiz> => {
        const state = thunkAPI.getState() as RootState
        const [sectionIdx, unitIdx] = selectSectionNUnitIndex(
            payload.unitAddress.sectionId,
            payload.unitAddress.unitId
        )(state)
        const val = state.formCourse.curriculum![sectionIdx].units[unitIdx].quiz
        const quiz = TypeHelper.isQuiz(val) ? val : undefined
        return apiUpdateQuiz(quiz!._id, payload.data)
    }
)
export const addQuizQuestion = createAsyncThunk(
    'courses/addQuizQuestion',
    async (
        payload: { unitAddress: IUnitAddress; id: string; data: Partial<IQuestion> },
        thunkAPI
    ): Promise<IQuestion> => {
        return apiAddQuizQuestion(payload.id, payload.data)
    }
)
export const updateQuizQuestion = createAsyncThunk(
    'courses/updateQuizQuestion',
    async (
        payload: {
            unitAddress: IUnitAddress
            id: string
            questionId: string
            data: Partial<IQuestion>
        },
        thunkAPI
    ): Promise<IQuestion> => {
        return apiUpdateQuizQuestion(payload.id, payload.questionId, payload.data)
    }
)
export const deleteQuizQuestion = createAsyncThunk(
    'courses/deleteQuizQuestion',
    async (payload: {
        unitAddress: IUnitAddress
        id: string
        questionId: string
    }): Promise<IQuestion> => {
        return apiDeleteQuizQuestion(payload.id, payload.questionId)
    }
)

// DELETE
export const deleteUnit = createAsyncThunk(
    'courses/deleteUnit',
    async (payload: IUnitAddress, thunkAPI): Promise<ICourse> => {
        const state = thunkAPI.getState() as RootState
        const sectionIndex = selectSectionIndex(payload.sectionId)(state)
        return apiDeleteCourseUnit(state.formCourse.course!._id, {
            unitId: payload.unitId,
            sectionIndex,
        })
    }
)
export const deleteSection = createAsyncThunk(
    'courses/deleteSection',
    async (payload: TDeleteCourseSection, thunkAPI): Promise<ICourse> => {
        const state = thunkAPI.getState() as RootState
        return apiDeleteCourseSection(state.formCourse.course!._id, payload)
    }
)

export const moveUnitToSection = createAsyncThunk(
    'courses/moveUnitToSection',
    async (payload: TMoveCourseUnitToSection, thunkAPI): Promise<ICourse> => {
        const state = thunkAPI.getState() as RootState
        return apiMoveCourseUnitToSection(state.formCourse.course!._id, payload)
    }
)

interface IUnitExpandedIndexes {
    [key: string]: number[]
}
// Define a type for the slice state
type TStatus = 'idle' | 'loading' | 'pending' | 'succeeded' | 'failed'
interface FormCourseSlice {
    course?: ICourse
    curriculum: (ICourseSection & {})[]
    status: TStatus
    //
    sectionExpandedIndexes?: number[]
    unitExpandedIndexes: IUnitExpandedIndexes
    isSectionDragging: boolean
}

// Define the initial state using that type
const initialState: FormCourseSlice = {
    curriculum: [],
    status: 'idle',
    isSectionDragging: false,
    unitExpandedIndexes: {},
}

export const formCourseSlice = createSlice({
    name: 'formCourse',
    initialState,
    reducers: {
        setStatus: (state, action: PayloadAction<TStatus>) => {
            state.status = action.payload
        },
        setSectionExpandedIndexes: (state, action: PayloadAction<number[]>) => {
            state.sectionExpandedIndexes = action.payload
        },
        setFormCourse: (state, action: PayloadAction<ICourse>) => {
            state.status = 'succeeded'
            state.course = action.payload as any
            state.curriculum = action.payload.details.sections as any
            if (Object.keys(state.unitExpandedIndexes).length == 0) {
                state.curriculum?.forEach((item) => {
                    state.unitExpandedIndexes[item._id] = []
                })
            }
            if (!state.sectionExpandedIndexes) {
                state.sectionExpandedIndexes = [
                    ...Array(action.payload.details.sections?.length || 0),
                ].map((_, i) => i)
            }
        },
        //
        setSectionDragging: (state, action: PayloadAction<boolean>) => {
            state.isSectionDragging = action.payload
        },
        setUnitExpandedIndexes: (
            state,
            action: PayloadAction<{ sectionId: string; indexes: number[] }>
        ) => {
            state.unitExpandedIndexes[action.payload.sectionId] = action.payload.indexes
        },
        addUnitExpandedIndex: (state, action: PayloadAction<IUnitAddress>) => {
            const { sectionId, unitId } = action.payload
            const [_, unitIdx] = getSectionNUnitIdx(sectionId, unitId)(state as any)
            if (state.unitExpandedIndexes[sectionId]) {
                if (state.unitExpandedIndexes[sectionId].indexOf(unitIdx) == -1) {
                    state.unitExpandedIndexes[sectionId].push(unitIdx)
                }
            } else {
                state.unitExpandedIndexes[sectionId] = [unitIdx]
            }
        },
        //
    },
    extraReducers(builder) {
        builder
            //fetch course
            .addCase(fetchFormCourseById.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchFormCourseById.fulfilled, (state, action: PayloadAction<ICourse>) => {
                state.status = 'succeeded'
                state.course = action.payload as ICourse
                if (!state.unitExpandedIndexes) {
                    state.curriculum?.forEach((item, i) => {
                        state.unitExpandedIndexes[item._id] = []
                    })
                }
            })
            .addCase(fetchFormCourseById.rejected, (state, action) => {
                state.status = 'failed'
            })
            // UPDATE
            .addCase(updateCourseById.fulfilled, (state, action) => {
                Helper.lodash.merge(state.course, action.meta.arg)
            })
            //CURRICULUM
            // details
            .addCase(addCourseSection.fulfilled, (state, action) => {
                const { sectionIndex } = action.meta.arg
                const section: ICourseSection = action.payload
                state.curriculum?.splice(sectionIndex, 0, section)
            })
            .addCase(addCourseUnit.fulfilled, (state, action) => {
                const { sectionId, unitIdx } = action.meta.arg
                const sectionIdx = getSectionIdx(sectionId)(state)
                state.curriculum[sectionIdx].units.splice(unitIdx, 0, action.payload as any)
            })

            .addCase(updateCourseSection.fulfilled, (state, action) => {
                const ids = state.curriculum?.map((item) => item._id)
                let sectionIdx = state.curriculum!.findIndex(
                    (item) => item._id == action.meta.arg.sectionId
                )
                if (sectionIdx > -1) {
                    state.curriculum![sectionIdx] = {
                        ...state.curriculum![sectionIdx],
                        ...action.meta.arg.data,
                    }
                }
            })
            .addCase(updateLecture.fulfilled, (state, action) => {
                const {
                    unitAddress: { sectionId, unitId },
                    data,
                } = action.meta.arg
                const [sectionIdx, unitIdx] = getSectionNUnitIdx(sectionId, unitId)(state)
                const item = state.curriculum![sectionIdx].units[unitIdx].lecture
                state.curriculum![sectionIdx].units[unitIdx].lecture = Object.assign(item, data)
            })
            .addCase(updateCourseLectureVideo.fulfilled, (state, action) => {
                const { sectionId, unitId } = action.meta.arg
                const [sectionIdx, unitIdx] = getSectionNUnitIdx(sectionId, unitId)(state)
                const item = state.curriculum![sectionIdx].units[unitIdx].lecture
                ;(state.curriculum![sectionIdx].units[unitIdx].lecture as ILecture).video =
                    action.payload
            })
            .addCase(addCourseLectureResource.fulfilled, (state, action) => {
                const { sectionId, unitId } = action.meta.arg
                const [sectionIdx, unitIdx] = getSectionNUnitIdx(sectionId, unitId)(state)
                const lecture = state.curriculum![sectionIdx].units[unitIdx].lecture
                if (TypeHelper.isLecture(lecture as any)) {
                    ;((lecture as ILecture).resources as IFile[]).push(action.payload)
                }
            })
            // QUIZ
            .addCase(updateQuiz.fulfilled, (state, action) => {
                const {
                    unitAddress: { sectionId, unitId },
                    data,
                } = action.meta.arg
                const [sectionIdx, unitIdx] = getSectionNUnitIdx(sectionId, unitId)(state)
                const item = state.curriculum![sectionIdx].units[unitIdx].quiz
                state.curriculum![sectionIdx].units[unitIdx].quiz = Object.assign(item, data)
            })
            .addCase(addQuizQuestion.fulfilled, (state, action) => {
                const {
                    unitAddress: { sectionId, unitId },
                } = action.meta.arg
                const question = action.payload
                const [sectionIdx, unitIdx] = getSectionNUnitIdx(sectionId, unitId)(state)
                const item = state.curriculum![sectionIdx].units[unitIdx].quiz
                TypeHelper.isQuiz(item) && item.questions.push(question)
            })
            .addCase(updateQuizQuestion.fulfilled, (state, action) => {
                const {
                    unitAddress: { sectionId, unitId },
                    questionId,
                } = action.meta.arg
                const [sectionIdx, unitIdx] = getSectionNUnitIdx(sectionId, unitId)(state)
                const item = state.curriculum![sectionIdx].units[unitIdx].quiz
                const quiz = TypeHelper.isQuiz(item) ? item : undefined
                if (quiz) {
                    const questionIdx = quiz.questions.findIndex((item) => item._id == questionId)
                    quiz.questions[questionIdx] = action.payload
                }
            })
            .addCase(deleteQuizQuestion.fulfilled, (state, action) => {
                const {
                    unitAddress: { sectionId, unitId },
                    questionId,
                } = action.meta.arg
                const [sectionIdx, unitIdx] = getSectionNUnitIdx(sectionId, unitId)(state)
                const item = state.curriculum![sectionIdx].units[unitIdx].quiz
                const quiz = TypeHelper.isQuiz(item) ? item : undefined
                if (quiz) {
                    const questionIdx = quiz.questions.findIndex((item) => item._id == questionId)
                    quiz.questions.splice(questionIdx, 1)
                }
            })
            // DELETE
            .addCase(deleteUnit.fulfilled, (state, action) => {
                const { sectionId, unitId } = action.meta.arg
                const sectionIdx = getSectionIdx(sectionId)(state)
                state.curriculum![sectionIdx].units = state.curriculum![sectionIdx].units.filter(
                    (item) => item._id != unitId
                )
            })
            .addCase(deleteSection.fulfilled, (state, action) => {
                const { sectionId } = action.meta.arg
                state.curriculum = state.curriculum!.filter((item) => item._id != sectionId)
            })
            .addCase(moveUnitToSection.pending, (state, action) => {
                const { sectionId, unitAddress } = action.meta.arg
                if (state.curriculum) {
                    const toSectionIdx = state.curriculum.findIndex((item) => item._id == sectionId)
                    const fromSectionIdx = state.curriculum.findIndex(
                        (item) => item._id == unitAddress.sectionId
                    )
                    const fromUnitIdx = state.curriculum[fromSectionIdx].units.findIndex(
                        (item) => item._id == unitAddress.id
                    )
                    const [fromUnit] = state.curriculum[fromSectionIdx].units.splice(fromUnitIdx, 1)
                    if (fromSectionIdx < toSectionIdx) {
                        state.curriculum[toSectionIdx].units.unshift(fromUnit)
                    } else {
                        state.curriculum[toSectionIdx].units.push(fromUnit)
                    }
                }
            })
            .addCase(swapCourseUnit.pending, (state, action) => {
                const { parentAId, parentBId, aId, bId } = action.meta.arg
                if (state.curriculum) {
                    const parentAIdx = state.curriculum.findIndex((item) => item._id == parentAId)
                    const parentBIdx = state.curriculum.findIndex((item) => item._id == parentBId)
                    if (parentAIdx > -1 && parentBIdx > -1) {
                        const aIdx = state.curriculum[parentAIdx].units.findIndex(
                            (item) => item._id == aId
                        )
                        const bIdx = state.curriculum[parentBIdx].units.findIndex(
                            (item) => item._id == bId
                        )
                        if (aIdx > -1 && bIdx > -1 && (aIdx != bIdx || parentAIdx != parentBIdx)) {
                            ;[
                                state.curriculum[parentAIdx].units[aIdx],
                                state.curriculum[parentBIdx].units[bIdx],
                            ] = [
                                state.curriculum[parentBIdx].units[bIdx],
                                state.curriculum[parentAIdx].units[aIdx],
                            ]
                        }
                    }
                }
            })

            .addCase(swapCourseSection.pending, (state, action) => {
                const { aId, bId } = action.meta.arg
                if (state.curriculum) {
                    const aIdx = state.curriculum.findIndex((item) => item._id == aId)
                    const bIdx = state.curriculum.findIndex((item) => item._id == bId)
                    if (aIdx > -1 && bIdx > -1 && aIdx != bIdx) {
                        ;[state.curriculum[aIdx], state.curriculum[bIdx]] = [
                            state.curriculum[bIdx],
                            state.curriculum[aIdx],
                        ]
                    }
                }
            })
    },
})
const getSectionIdx = (id: string) => (state: FormCourseSlice) => {
    return state.curriculum.findIndex((item) => item._id == id)
}
const getSectionNUnitIdx = (sectionId: string, unitId: string) => (state: FormCourseSlice) => {
    const sectionIdx = getSectionIdx(sectionId)(state)
    const unitIdx = state.curriculum[sectionIdx]?.units.findIndex((item) => item._id == unitId)
    return [sectionIdx, unitIdx]
}
const getUnitIdxWithSectionIdx =
    (sectionIdx: number, unitId: string) => (state: FormCourseSlice) => {
        return state.curriculum[sectionIdx].units.findIndex((item) => item._id == unitId)
    }

// SELECTORS
export const selectSectionIndex = (id: string) => (state: RootState) =>
    getSectionIdx(id)(state.formCourse)
export const selectSectionNUnitIndex = (sectionId: string, unitId: string) => (state: RootState) =>
    getSectionNUnitIdx(sectionId, unitId)(state.formCourse)
//
export const selectFormCourse = (state: RootState) => state.formCourse.course
export const selectFormCourseStatus = (state: RootState) => state.formCourse.status
export const selectFormCourseIsSectionDragging = (state: RootState) =>
    state.formCourse.isSectionDragging
export const selectFormCourseId = (state: RootState) => state.formCourse.course?._id
export const selectFormCourseObjectives = (state: RootState) =>
    state.formCourse.course?.details.objectives
export const selectFormCourseRequirements = (state: RootState) =>
    state.formCourse.course?.details.requirements
export const selectFormCourseSuitableLearners = (state: RootState) =>
    state.formCourse.course?.details.suitableLearner
// CURRICULUMNk
export const selectFormCourseCurriculum = (state: RootState) => state.formCourse.curriculum
export const selectFormCourseUnitExpandedIndexes = (sectionId: string) => (state: RootState) =>
    state.formCourse.unitExpandedIndexes[sectionId]
export const selectFormCourseSectionExpandedIndexes = (state: RootState) =>
    state.formCourse.sectionExpandedIndexes
export const selectFormCourseSection = (index: number) => (state: RootState) =>
    state.formCourse.curriculum ? state.formCourse.curriculum[index] : undefined
export const selectFormCourseSectionById = (id: string) => (state: RootState) =>
    state.formCourse.curriculum
        ? state.formCourse.curriculum.find((item) => item._id == id)
        : undefined

export const selectFormCourseUnitByIds =
    (sectionId: string, unitId: string) => (state: RootState) => {
        if (state.formCourse.curriculum) {
            const section = state.formCourse.curriculum.find((item) => item._id == sectionId)
            if (section) {
                return section.units.find((item) => item._id == unitId)
            }
        }
        return undefined
    }

export const selectFormCourseLectureByIndexes =
    (sectionIdx: number, unitIdx: number) => (state: RootState) => {
        const unit = selectFormCourseUnitByIndexes(sectionIdx, unitIdx)(state)
        return TypeHelper.isLecture(unit?.lecture) ? unit?.lecture : undefined
    }
export const selectFormCourseUnitByIndexes =
    (sectionIdx: number, unitIdx: number) => (state: RootState) => {
        if (state.formCourse.curriculum) {
            if (state.formCourse.curriculum[sectionIdx]?.units) {
                return state.formCourse.curriculum[sectionIdx].units[unitIdx]
            }
        }
        return undefined
    }

export const selectFormCourseUnitNo = (sectionId: string, unitId: string) => {
    return (state: RootState) => {
        let no = 0
        const [sectionIdx, unitIdx] = selectSectionNUnitIndex(sectionId, unitId)(state)
        for (let key in state.formCourse.curriculum) {
            const sIdx = Number.parseInt(key)
            if (sIdx < sectionIdx) no += state.formCourse.curriculum[sIdx].units.length
            else if (sIdx == sectionIdx) {
                return no + unitIdx + 1
            } else return no
        }
        return no
    }
}
//
export const {
    setSectionDragging: formCourseSetSectionDragging,
    setSectionExpandedIndexes: formCourseSetSectionExpandedIndexes,
    setUnitExpandedIndexes: formCourseSetUnitExpandedIndexes,
    addUnitExpandedIndex: formCourseAddUnitExpandedIndex,
    setFormCourse: setFormCourse,
    setStatus: formCourseSetStatus,
} = formCourseSlice.actions
export default formCourseSlice.reducer
