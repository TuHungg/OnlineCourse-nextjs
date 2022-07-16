import React, {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react'
import { useQueryClient } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { selectFormCourseUnitByIds } from '../../../store/course/form-course.slice'
import IQuiz, { IQuestion } from '../../shared/interfaces/models/quiz.interface'
import { useUnitParams } from './unit-params.provider'

interface IQuizParamsProvider {
    state: {
        quiz: IQuiz
        editingQuestion?: IQuestion
    }
    methods: {
        reset: () => void
        setEditingQuestion: (val?: IQuestion) => void
    }
}
const QuizParamsContext = createContext<IQuizParamsProvider>({} as IQuizParamsProvider)

export const useQuizParams = () => {
    return useContext(QuizParamsContext)
}

export function QuizParamsProvider({ children }: { children: ReactNode }) {
    const [editingQuestion, setEditingQuestion] = useState<IQuestion | undefined>()
    const {
        address,
        state: { isEditContent },
        methods: { setEditContent, reset: unitReset },
    } = useUnitParams()

    const quiz = useSelector(selectFormCourseUnitByIds(address.sectionId, address.unitId))
        ?.quiz as IQuiz

    // RESET
    const reset = useCallback(() => {
        unitReset()
    }, [unitReset])

    useEffect(() => {
        if (editingQuestion) {
            setEditContent(true)
        }
    }, [editingQuestion, setEditContent])

    useEffect(() => {
        if (!isEditContent) {
            setEditingQuestion(undefined)
        }
    }, [isEditContent])
    //
    const state = useMemo(
        () => ({
            state: {
                quiz,
                editingQuestion,
                // video
            },
            methods: {
                reset,
                setEditingQuestion,
            },
        }),
        [editingQuestion, quiz, reset]
    )

    return <QuizParamsContext.Provider value={state}>{children}</QuizParamsContext.Provider>
}
