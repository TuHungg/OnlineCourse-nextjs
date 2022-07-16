import router from 'next/router'
import React, { createContext, ReactNode, useCallback, useContext, useMemo } from 'react'
import { apiCreate } from '../../../apis/acp/admin.api'
import PathHelper from '../../../utils/helpers/path.helper'
import { useNotificationDialog } from '../../admin/providers/notification-dialog.provider'
import { useAuth } from '../../auth/providers/auth.provider'
import ICourse from '../interfaces/models/course.interface'
import { IHistory } from '../interfaces/models/shared.interface'
import { TModule } from '../types/module.type'

interface ICourseActionsProvider {
    onNew: (module?: TModule) => void
}
const CourseActionsContext = createContext<ICourseActionsProvider>({} as ICourseActionsProvider)

export const useCourseActions = () => {
    return useContext(CourseActionsContext)
}

export function CourseActionsProvider({ children }: { children: ReactNode }) {
    const {
        state: { user },
    } = useAuth()
    const { onShow } = useNotificationDialog()
    const onNew = useCallback(
        async (module: TModule = 'instructor') => {
            const item = await apiCreate<ICourse>('courses', {
                history: {
                    createdBy: user?._id as any,
                } as IHistory,
            })
            const url =
                module == 'admin'
                    ? PathHelper.getAdminCourseFormPath(item._id)
                    : PathHelper.getInstructorCourseFormPath(item._id)
            await router.push(url).then(() => {
                onShow({
                    title: 'Course created',
                    content: 'Now you can start editing your course!',
                })
            })
        },
        [onShow, user?._id]
    )

    const state: ICourseActionsProvider = useMemo(
        () => ({
            onNew,
        }),
        [onNew]
    )
    return <CourseActionsContext.Provider value={state}>{children}</CourseActionsContext.Provider>
}
