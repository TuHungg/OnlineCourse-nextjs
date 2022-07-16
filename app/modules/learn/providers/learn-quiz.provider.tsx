import update from 'immutability-helper'
import React, {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react'
import { useSelector } from 'react-redux'
import { updateLearnUnit } from '../../../apis/user/user-learning.api'
import { selectActiveUnit, selectLearnId } from '../../../store/course/learn-course.slice'
import { IAnswerOption } from '../../shared/interfaces/models/quiz.interface'
import { ILearnQuiz, TLearnQuizStatus } from '../../shared/interfaces/models/user_course.interface'
import { useLearnUnit } from '../queries/learn-unit-query.hook'

interface LearnQuizProvider {
    state: {
        welcomeScreen: boolean
        learnQuiz: ILearnQuiz
        selectedOption?: number
        selectedOptions: number[]
        lastSelected?: { option: IAnswerOption; isCorrect: boolean }
        isLoading: boolean
    }
    methods: {
        setCurrentQuestionIdx: (val: number) => void
        onStart: () => void
        onResume: () => void
        onRetry: () => void
        setSelectedOption: (val?: number) => void
        onCheckAnswer: () => void
        onNext: () => void
        onSkipQuestion: () => void
    }
}
const LearnQuizContext = createContext<LearnQuizProvider>({} as LearnQuizProvider)

export const useLearnQuiz = () => {
    return useContext(LearnQuizContext)
}

export function LearnQuizProvider({ children }: { children: ReactNode }) {
    const [welcomeScreen, setWelcomeScreen] = useState<boolean>(true)
    const [selectedOption, setSelectedOption] = useState<number>()
    const [selectedOptions, setSelectedOptions] = useState<number[]>([])
    const [learnQuiz, setLearnQuiz] = useState<ILearnQuiz>({
        currentQuestionIdx: 0,
        questionAnswers: [],
        skipQuestions: [],
        status: 'idle',
    })

    const learnId = useSelector(selectLearnId)!
    const unit = useSelector(selectActiveUnit)!
    const { isLoading, data: learnUnit } = useLearnUnit(unit?._id)
    // change quiz
    useEffect(() => {
        setSelectedOption(undefined)
        setSelectedOptions([])
        setWelcomeScreen(true)
    }, [unit._id])
    //
    useEffect(() => {
        if (learnUnit) {
            if (learnUnit.learnQuiz) setLearnQuiz(learnUnit.learnQuiz)
        } else {
            setLearnQuiz((item) =>
                update(item, {
                    quiz: {
                        $set: unit.quiz,
                    },
                    currentQuestionIdx: { $set: 0 },
                    questionAnswers: { $set: [] },
                    skipQuestions: { $set: [] },
                    status: { $set: 'idle' },
                })
            )
        }
    }, [learnUnit, unit])
    //
    const setCurrentQuestionIdx = useCallback((val: number) => {
        setLearnQuiz((learnQuiz) => {
            return update(learnQuiz, {
                currentQuestionIdx: {
                    $set: val,
                },
            })
        })
    }, [])
    // ACTIONS
    const onStart = useCallback(() => {
        setLearnQuiz((learnQuiz) =>
            update(learnQuiz, {
                currentQuestionIdx: {
                    $set: 0,
                },
                status: {
                    $set: 'doing',
                },
            })
        )
        // update
        updateLearnUnit(learnId, unit._id, {
            learnQuiz: {
                quiz: learnQuiz.quiz?._id,
                currentQuestionIdx: 0,
                status: 'doing',
            } as ILearnQuiz,
        })
        setWelcomeScreen(false)
    }, [learnId, learnQuiz.quiz?._id, unit._id])
    const onResume = useCallback(() => {
        setWelcomeScreen(false)
    }, [])

    const onRetry = useCallback(() => {
        setLearnQuiz((learnQuiz) =>
            update(learnQuiz, {
                currentQuestionIdx: {
                    $set: 0,
                },
                questionAnswers: {
                    $set: [],
                },
                skipQuestions: {
                    $set: [],
                },
                status: {
                    $set: 'idle',
                },
            })
        )
        setSelectedOptions([])
        setSelectedOption(undefined)
        // update
        updateLearnUnit(learnId, unit._id, {
            learnQuiz: {
                currentQuestionIdx: 0,
                questionAnswers: [],
                skipQuestions: [],
                status: 'idle',
            } as ILearnQuiz,
        })
    }, [learnId, unit._id])

    const onCheckAnswer = useCallback(() => {
        const question = learnQuiz.quiz?.questions.at(learnQuiz.currentQuestionIdx)
        if (question && selectedOptions.length == 0) {
            setLearnQuiz((item) =>
                update(item, {
                    questionAnswers: {
                        $push: [
                            {
                                answerNo: selectedOption!,
                                question: question._id,
                            },
                        ],
                    },
                    // currentQuestionIdx: {
                    //     $set: getNextCurrentQuestionIdx(),
                    // },
                    // status: {
                    //     $set: getNextStatus(),
                    // },
                })
            )
            // update
            updateLearnUnit(learnId, unit._id, {
                learnQuiz: {
                    // currentQuestionIdx: getNextCurrentQuestionIdx(),
                    // status: getNextStatus(),
                    questionAnswers: learnQuiz.questionAnswers.concat({
                        answerNo: selectedOption!,
                        question: question._id,
                    }),
                } as ILearnQuiz,
            })
        }
        setSelectedOptions((item) =>
            update(item, {
                $push: [selectedOption!],
            })
        )
        if (question?.correctOptionNo != selectedOption) setSelectedOption(undefined)
    }, [
        learnId,
        learnQuiz.currentQuestionIdx,
        learnQuiz.questionAnswers,
        learnQuiz.quiz?.questions,
        selectedOption,
        selectedOptions.length,
        unit._id,
    ])

    const getNextCurrentQuestionIdx = useCallback(() => {
        return learnQuiz.currentQuestionIdx < learnQuiz.quiz!.questions.length - 1
            ? learnQuiz.currentQuestionIdx + 1
            : learnQuiz.currentQuestionIdx
    }, [learnQuiz.currentQuestionIdx, learnQuiz.quiz])

    const getNextStatus = useCallback((): TLearnQuizStatus => {
        return learnQuiz.currentQuestionIdx == learnQuiz.quiz!.questions.length - 1
            ? 'done'
            : 'doing'
    }, [learnQuiz.currentQuestionIdx, learnQuiz.quiz])

    const onNext = useCallback(() => {
        setLearnQuiz((item) =>
            update(item, {
                currentQuestionIdx: {
                    $set: getNextCurrentQuestionIdx(),
                },
                status: {
                    $set: getNextStatus(),
                },
            })
        )
        setSelectedOptions([])
        setSelectedOption(undefined)
        // update
        updateLearnUnit(learnId, unit._id, {
            learnQuiz: {
                currentQuestionIdx: getNextCurrentQuestionIdx(),
                status: getNextStatus(),
            } as ILearnQuiz,
        })
    }, [getNextCurrentQuestionIdx, getNextStatus, learnId, unit._id])

    const onSkipQuestion = useCallback(() => {
        setLearnQuiz((item) =>
            update(item, {
                currentQuestionIdx: {
                    $set: getNextCurrentQuestionIdx(),
                },
                status: {
                    $set: getNextStatus(),
                },
                skipQuestions: {
                    $push: [learnQuiz.quiz!.questions.at(learnQuiz.currentQuestionIdx)!._id],
                },
            })
        )
        setSelectedOptions([])
        setSelectedOption(undefined)
        // update
        updateLearnUnit(learnId, unit._id, {
            learnQuiz: {
                currentQuestionIdx: getNextCurrentQuestionIdx(),
                status: getNextStatus(),
                skipQuestions: learnQuiz.skipQuestions.concat(
                    learnQuiz.quiz!.questions.at(learnQuiz.currentQuestionIdx)!._id
                ),
            } as ILearnQuiz,
        })
    }, [
        getNextCurrentQuestionIdx,
        getNextStatus,
        learnId,
        learnQuiz.currentQuestionIdx,
        learnQuiz.quiz,
        learnQuiz.skipQuestions,
        unit._id,
    ])
    //
    const lastSelected = useMemo(() => {
        if (selectedOptions.length == 0) return undefined
        const question = learnQuiz.quiz?.questions.at(learnQuiz.currentQuestionIdx)
        const lastOption = question?.answerOptions?.at(selectedOptions[selectedOptions.length - 1])
        return {
            option: lastOption!,
            isCorrect: question?.correctOptionNo == lastOption?.optionNo,
        }
    }, [learnQuiz.currentQuestionIdx, learnQuiz.quiz?.questions, selectedOptions])

    //
    const state: LearnQuizProvider = useMemo(
        () => ({
            state: {
                isLoading,
                learnQuiz,
                selectedOption,
                selectedOptions,
                lastSelected,
                welcomeScreen,
            },
            methods: {
                setCurrentQuestionIdx,
                onStart,
                onRetry,
                setSelectedOption,
                onCheckAnswer,
                onNext,
                onSkipQuestion,
                onResume,
            },
        }),
        [
            isLoading,
            learnQuiz,
            selectedOption,
            selectedOptions,
            lastSelected,
            welcomeScreen,
            setCurrentQuestionIdx,
            onStart,
            onRetry,
            onCheckAnswer,
            onNext,
            onSkipQuestion,
            onResume,
        ]
    )
    return <LearnQuizContext.Provider value={state}>{children}</LearnQuizContext.Provider>
}
