import React, { createContext, ReactNode, useContext, useMemo, useState } from 'react'
import IReview from '../../shared/interfaces/models/review.interface'

interface IInstructorCourseReviewProvider {
    state: {
        review: IReview
        writingResponse: boolean
    }
    methods: {
        setWritingResponse: (val: boolean) => void
    }
}
const InstructorCourseReviewContext = createContext<IInstructorCourseReviewProvider>(
    {} as IInstructorCourseReviewProvider
)

export const useInstructorCourseReview = () => {
    return useContext(InstructorCourseReviewContext)
}

export function InstructorCourseReviewProvider({
    review,
    children,
}: {
    review: IReview
    children: ReactNode
}) {
    const [writingResponse, setWritingResponse] = useState<boolean>(false)
    //
    const state: IInstructorCourseReviewProvider = useMemo(
        () => ({
            state: {
                review,
                writingResponse,
            },
            methods: {
                setWritingResponse,
            },
        }),
        [review, writingResponse]
    )
    return (
        <InstructorCourseReviewContext.Provider value={state}>
            {children}
        </InstructorCourseReviewContext.Provider>
    )
}
