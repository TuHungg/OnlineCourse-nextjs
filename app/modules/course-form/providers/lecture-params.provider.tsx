import React, { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react'
import { useQueryClient } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import {
    addCourseLectureResource,
    selectFormCourseUnitByIds,
    updateCourseLectureVideo,
} from '../../../store/course/form-course.slice'
import { useAuth } from '../../auth/providers/auth.provider'
import IFile from '../../shared/interfaces/models/file.interface'
import ILecture from '../../shared/interfaces/models/lecture.interface'
import { RQK_MY_FILES } from '../hooks/my-files-query.hook'
import { useUnitParams } from './unit-params.provider'

const genProcessingFile = (name: string, type: string, size: number, userId: string) => {
    const file: IFile = {
        _id: '',
        name,
        type,
        size,
        status: 'processing',
        url: '',
        duration: 0,
        history: {
            createdAt: new Date().toISOString(),
            createdBy: userId as any,
        },
    }
    return file
}

type TContentType = 'video' | 'article' | 'resource'
interface ILectureParamsProvider {
    state: {
        contentType?: TContentType
        processingFile?: IFile
        lecture: ILecture
    }
    methods: {
        setContentType: (val: TContentType) => void
        updateVideo: (data: { data: Partial<IFile> }) => void
        addResource: (data: { data: Partial<IFile> }) => void
        reset: () => void
    }
}
const LectureParamsContext = createContext<ILectureParamsProvider>({} as ILectureParamsProvider)

export const useLectureParams = () => {
    return useContext(LectureParamsContext)
}

export function LectureParamsProvider({ children }: { children: ReactNode }) {
    const dispatch = useDispatch()
    const {
        state: { user },
    } = useAuth()
    const queryClient = useQueryClient()
    const [processingFile, setProcessingFile] = useState<IFile>()
    const [contentType, setContentType] = useState<TContentType>()
    const {
        address,
        methods: { reset: unitReset },
    } = useUnitParams()

    const lecture = useSelector(selectFormCourseUnitByIds(address.sectionId, address.unitId))
        ?.lecture as ILecture

    // RESET
    const reset = useCallback(() => {
        setContentType(undefined)
        setProcessingFile(undefined)
        unitReset()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // UPDATE VIDEO
    const updateVideo = useCallback(
        async (data: { data: Partial<IFile> }) => {
            setProcessingFile(
                genProcessingFile(
                    data.data.name || '',
                    data.data.type || '',
                    data.data.size || 0,
                    user!._id
                )
            )
            await dispatch(
                updateCourseLectureVideo({ ...data, lectureId: lecture._id, ...address })
            )
            queryClient.invalidateQueries([RQK_MY_FILES])
            //
            reset()
            // eslint-disable-next-line react-hooks/exhaustive-deps
        },
        [address, dispatch, lecture._id, queryClient, reset, user]
    )

    const addResource = useCallback(
        async (data: { data: Partial<IFile> }) => {
            setProcessingFile(
                genProcessingFile(
                    data.data.name || '',
                    data.data.type || '',
                    data.data.size || 0,
                    user!._id
                )
            )
            await dispatch(
                addCourseLectureResource({ ...data, lectureId: lecture._id, ...address })
            )
            queryClient.invalidateQueries([RQK_MY_FILES])
            reset()
        },
        [address, dispatch, lecture._id, queryClient, reset, user]
    )
    //
    const state = useMemo(
        () => ({
            state: {
                contentType,
                processingFile,
                lecture,
            },
            methods: {
                setContentType,
                updateVideo,
                addResource,
                reset,
            },
        }),
        [addResource, contentType, lecture, processingFile, reset, updateVideo]
    )

    return <LectureParamsContext.Provider value={state}>{children}</LectureParamsContext.Provider>
}
