import { Button, HStack, Text, useColorModeValue } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { nextContent } from '../../../../../store/course/learn-course.slice'
import { useBorderColor } from '../../../../shared/hooks/style.hook'
import { useLearnQuiz } from '../../../providers/learn-quiz.provider'

const DoingActions = () => {
    const {
        state: {
            lastSelected,
            selectedOption,
            learnQuiz: { currentQuestionIdx, quiz },
        },
        methods: { onCheckAnswer, onNext, onSkipQuestion },
    } = useLearnQuiz()
    if (lastSelected?.isCorrect) {
        const isLastQuestion = currentQuestionIdx == quiz!.questions.length - 1
        return (
            <>
                {isLastQuestion ? (
                    <Button size="sm" colorScheme={'purple'} onClick={onNext}>
                        See results
                    </Button>
                ) : (
                    <Button size="sm" colorScheme={'purple'} onClick={onNext}>
                        Next
                    </Button>
                )}
            </>
        )
    }
    return (
        <>
            <Button
                onClick={onSkipQuestion}
                size="sm"
                variant={'unstyled'}
                className="no-focus-shadow"
            >
                Skip question
            </Button>
            <Button
                onClick={onCheckAnswer}
                isDisabled={typeof selectedOption == 'undefined'}
                size="sm"
                colorScheme="purple"
            >
                Check answer
            </Button>
        </>
    )
}

const DoneActions = () => {
    const dispatch = useDispatch()
    const {
        methods: { onRetry },
    } = useLearnQuiz()
    const onNextContent = () => {
        dispatch(nextContent())
    }
    return (
        <>
            <Button
                onClick={onNextContent}
                size="sm"
                variant={'unstyled'}
                className="no-focus-shadow"
            >
                Continue
            </Button>
            <Button onClick={onRetry} size="sm" colorScheme="purple">
                Retry
            </Button>
        </>
    )
}

export default function QuizBottomBar() {
    const {
        state: {
            learnQuiz: { status, currentQuestionIdx, quiz },
        },
    } = useLearnQuiz()
    const bg = useColorModeValue('gray.50', 'gray.700')
    const borderColor = useBorderColor()
    const renderActions = useMemo(() => {
        switch (status) {
            case 'doing':
                return <DoingActions />
            case 'done':
                return <DoneActions />
        }
    }, [status])
    return (
        <HStack
            justify={'space-between'}
            py={2}
            px={8}
            border="1px solid"
            borderColor={borderColor}
            bg={bg}
        >
            {/* LEFT */}
            <HStack>
                <Text fontSize={['sm', 'md']}>
                    Question {currentQuestionIdx + 1} of {quiz?.questions.length}
                </Text>
            </HStack>
            {/* RIGHT */}
            <HStack spacing={4}>{renderActions}</HStack>
        </HStack>
    )
}
