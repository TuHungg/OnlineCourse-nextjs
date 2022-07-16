import { Stack, StackProps, useBreakpointValue } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { useSidebar } from '../../../../shared/providers/sidebar.provider'
import ContentSkeleton from '../../../components/ContentSkeleton'
import { LearnQuizProvider, useLearnQuiz } from '../../../providers/learn-quiz.provider'
import { LEARN_TOP_BAR_HEIGHT } from '../../LearnTopbar/LearnTopBar'
import DoingQuiz from './DoingQuiz'
import QuizBottomBar from './QuizBottomBar'
import QuizDone from './QuizDone'
import QuizWelcome from './QuizWelcome'

export interface QuizContentContainerProps extends StackProps {}
export const QuizContentContainer = ({ children, ...props }: QuizContentContainerProps) => {
    return (
        <Stack px={[2, 4, 28]} flex={1} overflow="auto" {...props}>
            {children}
        </Stack>
    )
}

const Main = () => {
    const {
        state: {
            learnQuiz: { status },
            isLoading,
            welcomeScreen,
        },
    } = useLearnQuiz()
    const { isOpen } = useSidebar()

    const height = useBreakpointValue({
        base: 'fit-content',
        xl: isOpen ? '400px' : `calc(100vh - ${LEARN_TOP_BAR_HEIGHT}px)`,
    })

    const renderContent = useMemo(() => {
        switch (status) {
            case 'doing':
                if (welcomeScreen) return <QuizWelcome type="resume" />
                return <DoingQuiz />
            default:
                return <QuizWelcome type="start" />
        }
    }, [status, welcomeScreen])

    return (
        <Stack height={height} spacing={0}>
            {status == 'done' ? (
                <Stack flex={1} overflow="auto">
                    <QuizDone />
                </Stack>
            ) : (
                <>
                    {!isLoading ? (
                        <QuizContentContainer>
                            <Stack pt={[2, 4, 10]}>{renderContent}</Stack>
                        </QuizContentContainer>
                    ) : (
                        <ContentSkeleton />
                    )}
                </>
            )}
            {status != 'idle' && <QuizBottomBar />}
        </Stack>
    )
}

export default function QuizContent() {
    return (
        <LearnQuizProvider>
            <Main />
        </LearnQuizProvider>
    )
}
