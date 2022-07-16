import { useBreakpointValue, useDisclosure } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react'
import { IconType } from 'react-icons'
import AppIcon from '../../../utils/constants/app-icon.constant'
import { TInstructorSection } from '../types/instructor-section.type'
import { useInstructorParams } from './instructor-params.provider'

export interface INavItem {
    label: string
    path: string
}

export interface INavGroup {
    label: string
    path: TInstructorSection
    icon: IconType
    items?: INavItem[]
}

export const INSTRUCTOR_MENU_DATA: INavGroup[] = [
    {
        label: 'Courses',
        icon: AppIcon.course,
        path: 'courses',
    },
    // {
    //     label: 'Communication',
    //     icon: AppIcon.communication,
    //     path: 'communication',
    //     items: [
    //         {
    //             label: 'Messages',
    //             path: 'messages',
    //         },
    //         {
    //             label: 'Comments',
    //             path: 'comments',
    //         },
    //     ],
    // },
    {
        label: 'Performance',
        icon: AppIcon.performance,
        path: 'performance',
        items: [
            {
                label: 'Overview',
                path: 'overview',
            },
            {
                label: 'Students',
                path: 'students',
            },
            {
                label: 'Reviews',
                path: 'reviews',
            },
        ],
    },
]

interface IInstructorMenuProvider {
    state: {
        activeNavGroup?: INavGroup
    }
    methods: {}
}
const InstructorMenuContext = createContext<IInstructorMenuProvider>({} as IInstructorMenuProvider)

export const useInstructorMenu = () => {
    return useContext(InstructorMenuContext)
}

export function InstructorMenuProvider({ children }: { children: ReactNode }) {
    const [activeNavGroup, setActiveNavGroup] = useState<INavGroup>()
    const {
        state: {
            urlParams: { section },
        },
    } = useInstructorParams()
    useEffect(() => {
        setActiveNavGroup((currentNavGroup) => {
            if (currentNavGroup?.path == section) return currentNavGroup
            const navGroup = INSTRUCTOR_MENU_DATA.find((item) => item.path == section)
            return navGroup
        })
    }, [section])
    //
    const state: IInstructorMenuProvider = useMemo(() => {
        return {
            state: {
                activeNavGroup,
            },
            methods: {},
        }
    }, [activeNavGroup])
    return <InstructorMenuContext.Provider value={state}>{children}</InstructorMenuContext.Provider>
}
