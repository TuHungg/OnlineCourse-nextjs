import React, { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react'
import { CarouselInternalState } from 'react-multi-carousel'

interface IGroupProvider {
    state: {
        page: number
    }
    methods: {
        onBeforeChange: (prevSlide: number, state: CarouselInternalState) => void
    }
}
const GroupContext = createContext<IGroupProvider>({} as IGroupProvider)

export const useCourseGroup = () => {
    return useContext(GroupContext)
}

export function GroupProvider({ limit, children }: { limit: number; children: ReactNode }) {
    const [page, setPage] = useState<number>(1)
    //
    const onBeforeChange = useCallback(
        (nextSlide: number, state: CarouselInternalState) => {
            const newPage = Math.ceil((nextSlide + 1 + state.slidesToShow) / limit)
            setPage(newPage)
        },
        [limit]
    )
    //
    const state = useMemo(
        () => ({
            state: {
                page,
            },
            methods: {
                onBeforeChange,
            },
        }),
        [onBeforeChange, page]
    )
    return <GroupContext.Provider value={state}>{children}</GroupContext.Provider>
}
