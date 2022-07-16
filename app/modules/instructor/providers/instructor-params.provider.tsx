import { useBreakpointValue } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react'
import { TInstructorSection } from '../types/instructor-section.type'

interface IInstructorParamsProvider {
    state: {
        viewMode: boolean
        viewInstructorId?: string
        isMobile: boolean
        urlParams: {
            section: TInstructorSection
            sub?: string
        }
    }
    methods: {}
}
const InstructorParamsContext = createContext<IInstructorParamsProvider>(
    {} as IInstructorParamsProvider
)

export const useInstructorParams = () => {
    return useContext(InstructorParamsContext)
}

export function InstructorParamsProvider({
    viewInstructorId: defaultViewInstructorId,
    children,
}: {
    viewInstructorId?: string
    children: ReactNode
}) {
    const isMobile = useBreakpointValue({ base: true, md: false })
    const router = useRouter()
    const [viewInstructorId, setViewInstructorId] = useState<string | undefined>(
        defaultViewInstructorId
    )

    // SET VIEW INSTRUCTOR IF EXIST
    let { viewInstructorId: instructorId } = router.query
    const vInstructorId = typeof instructorId != 'undefined' ? instructorId.toString() : undefined
    useEffect(() => {
        setViewInstructorId((value) => {
            if (!value) {
                return vInstructorId
            }
            return value
        })
    }, [vInstructorId])
    //
    const params = router.pathname.split('/').slice(2)
    const [section, sub]: [TInstructorSection, string | undefined] = useMemo(() => {
        if (!params) return ['courses', undefined]
        return params as [TInstructorSection, string | undefined]
    }, [params])
    //
    const state: IInstructorParamsProvider = useMemo(() => {
        return {
            state: {
                viewMode: !!viewInstructorId,
                viewInstructorId,
                isMobile: isMobile || false,
                urlParams: {
                    section,
                    sub,
                },
            },

            methods: {},
        }
    }, [isMobile, section, sub, viewInstructorId])
    return (
        <InstructorParamsContext.Provider value={state}>
            {children}
        </InstructorParamsContext.Provider>
    )
}
