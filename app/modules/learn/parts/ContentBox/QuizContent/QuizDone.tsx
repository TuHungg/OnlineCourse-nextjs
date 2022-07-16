import {
    Text,
    Heading,
    Stack,
    useColorModeValue,
    HStack,
    Divider,
    Icon,
    Box,
} from '@chakra-ui/react'
import update from 'immutability-helper'
import React, { useMemo } from 'react'
import { IconType } from 'react-icons'
import AppIcon from '../../../../../utils/constants/app-icon.constant'
import Helper from '../../../../../utils/helpers/helper.helper'
import { useIColor } from '../../../../shared/hooks/style.hook'
import { IQuestion } from '../../../../shared/interfaces/models/quiz.interface'
import { TColorScheme } from '../../../../shared/types/color-scheme.type'
import { useLearnQuiz } from '../../../providers/learn-quiz.provider'
import { QuizContentContainer } from './QuizContent'

const ResultList = (props: {
    icon?: IconType
    iconColor?: TColorScheme
    title: string
    questions: IQuestion[]
}) => {
    const listHtml = props.questions.map((item, i) => (
        <Text key={i}>{Helper.cvtHtmlToText(item.questionContent)}</Text>
    ))
    return (
        <HStack align="start" spacing={4}>
            {props.iconColor && props.icon && (
                <Box>
                    <Icon fontSize={'25px'} color={props.iconColor} as={props.icon} />
                </Box>
            )}
            <Stack spacing={4}>
                <Heading fontSize={'xl'}>{props.title}</Heading>
                <Stack spacing={3}>{listHtml}</Stack>
            </Stack>
        </HStack>
    )
}

const DoneHeading = (props: { nCorrect: number; nTotal: number }) => {
    const isPassed = props.nCorrect == props.nTotal
    const title = isPassed
        ? `Great job! You are ready to move on to the next lecture.`
        : 'Review the course materials to expand your learning.'
    const subtitle = `You got ${props.nCorrect} out of ${props.nTotal} correct.`
    const bg = useColorModeValue(
        isPassed ? 'green.300' : 'yellow.300',
        isPassed ? 'green.500' : 'gray.600'
    )
    return (
        <Stack bgColor={bg} py={10}>
            <QuizContentContainer>
                {isPassed ? (
                    <HStack>
                        <Divider flex={1} borderWidth="2px" borderColor={'white'} />
                        <Box w="100px" textAlign={'center'}>
                            <Icon color="white" fontSize={'60px'} as={AppIcon.rating} />
                        </Box>
                        <Divider flex={1} borderWidth="2px" borderColor={'white'} />
                    </HStack>
                ) : null}

                <Stack spacing={4}>
                    <Heading fontSize={'3xl'}>{title}</Heading>
                    <Text>{subtitle}</Text>
                </Stack>
            </QuizContentContainer>
        </Stack>
    )
}

export default function QuizDone() {
    const {
        state: { learnQuiz },
    } = useLearnQuiz()
    const totalQuestion = learnQuiz.quiz!.questions.length
    const result = useMemo(() => {
        const questionObj = Helper.cvtArrayToKV<IQuestion>(learnQuiz.quiz!.questions, '_id')
        let correctQuestions: IQuestion[] = []
        let incorrectQuestion: IQuestion[] = []
        let skipQuestions: IQuestion[] = []
        learnQuiz.questionAnswers.forEach((questionAnswer) => {
            const question = questionObj[questionAnswer.question]
            if (question.correctOptionNo == questionAnswer.answerNo) correctQuestions.push(question)
            else incorrectQuestion.push(question)
        })
        skipQuestions = learnQuiz.skipQuestions.map((item) => questionObj[item])
        return {
            correctQuestions,
            incorrectQuestion,
            skipQuestions,
        }
    }, [learnQuiz.questionAnswers, learnQuiz.quiz, learnQuiz.skipQuestions])
    return (
        <Stack spacing={0} pb={10}>
            <DoneHeading nCorrect={result.correctQuestions.length} nTotal={totalQuestion} />
            <QuizContentContainer py={5} spacing={8}>
                {result.correctQuestions.length > 0 && (
                    <ResultList
                        icon={AppIcon.check}
                        iconColor="green"
                        title="What you know"
                        questions={result.correctQuestions}
                    />
                )}
                {result.incorrectQuestion.length > 0 && (
                    <ResultList
                        icon={AppIcon.x}
                        iconColor="red"
                        title="What you should review"
                        questions={result.incorrectQuestion}
                    />
                )}
                {result.skipQuestions.length > 0 && (
                    <ResultList
                        icon={AppIcon.skip}
                        iconColor="black"
                        title="What you skipped"
                        questions={result.skipQuestions}
                    />
                )}
            </QuizContentContainer>
        </Stack>
    )
}
