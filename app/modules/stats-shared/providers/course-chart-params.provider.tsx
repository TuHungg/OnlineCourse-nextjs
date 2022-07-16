import { useDisclosure } from '@chakra-ui/react'
import React, { createContext, ReactNode, useContext, useMemo, useState } from 'react'

interface ICourseChartParamsProvider {
    state: {
        courseId?: string
    }
    methods: {
        setCourseId: (val?: string) => void
    }
}
const CourseChartContext = createContext<ICourseChartParamsProvider>(
    {} as ICourseChartParamsProvider
)

export const useCourseChartParams = () => {
    return useContext(CourseChartContext)
}

export function CourseChartParamsProvider({
    courseId: defaultCourseId,
    children,
}: {
    children: ReactNode
    courseId?: string
}) {
    const [courseId, setCourseId] = useState<string | undefined>(defaultCourseId)
    //
    const state: ICourseChartParamsProvider = useMemo(
        () => ({
            state: {
                courseId,
            },
            methods: {
                setCourseId,
            },
        }),
        [courseId]
    )
    return <CourseChartContext.Provider value={state}>{children}</CourseChartContext.Provider>
}
