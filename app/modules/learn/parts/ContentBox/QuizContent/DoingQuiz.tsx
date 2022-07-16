import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    HStack,
    Radio,
    RadioGroup,
    Stack,
    Text,
} from '@chakra-ui/react'
import React from 'react'
import { useBorderColor, useHoverColor } from '../../../../shared/hooks/style.hook'
import { IAnswerOption } from '../../../../shared/interfaces/models/quiz.interface'
import { useLearnQuiz } from '../../../providers/learn-quiz.provider'

const AnswerCard = ({ answer }: { answer: IAnswerOption }) => {
    const {
        state: { selectedOptions, lastSelected },
    } = useLearnQuiz()
    const borderColor = useBorderColor()
    const hoverColor = useHoverColor()
    const isSelected = selectedOptions.includes(answer.optionNo)
    const isDisabled = lastSelected?.isCorrect
        ? answer.optionNo != lastSelected.option.optionNo
        : isSelected
    return (
        <HStack
            border="1px solid"
            borderColor={borderColor}
            _hover={
                !isSelected
                    ? {
                          bgColor: hoverColor,
                      }
                    : undefined
            }
        >
            <Radio value={answer.optionNo + ''} spacing={4} p={2} flex={1} isDisabled={isDisabled}>
                <Text
                    as="div"
                    dangerouslySetInnerHTML={{ __html: answer.answerContent || '' }}
                ></Text>
            </Radio>
        </HStack>
    )
}

const Message = () => {
    const {
        state: { selectedOptions, lastSelected },
    } = useLearnQuiz()
    if (selectedOptions.length == 0) return <></>
    const title = lastSelected?.isCorrect ? 'Good Job!' : 'Incorrect answer. Please try again.'
    return (
        <Stack>
            <Alert status={lastSelected?.isCorrect ? 'success' : 'error'}>
                <AlertIcon />
                <Box>
                    <AlertTitle>{title}</AlertTitle>
                    {lastSelected?.option?.description && (
                        <AlertDescription>{lastSelected.option.description}</AlertDescription>
                    )}
                </Box>
            </Alert>
        </Stack>
    )
}

export default function DoingQuiz() {
    const {
        state: {
            selectedOption,
            learnQuiz: { quiz, currentQuestionIdx },
        },
        methods: { setSelectedOption },
    } = useLearnQuiz()
    const no = currentQuestionIdx + 1
    const question = quiz?.questions[currentQuestionIdx]
    //
    const answers = question?.answerOptions?.filter((item) => item.answerContent.trim() != '')
    const answersHtml = answers?.map((item, i) => {
        return <AnswerCard key={item.optionNo} answer={item} />
    })
    return (
        <Stack flex={1} spacing={8} py={10}>
            <Message />
            <Stack>
                <Text>Question {no}:</Text>
                <Text
                    as="div"
                    dangerouslySetInnerHTML={{ __html: question?.questionContent || '' }}
                ></Text>
            </Stack>
            <RadioGroup
                onChange={(val) => setSelectedOption(Number.parseInt(val))}
                value={selectedOption + ''}
            >
                <Stack>{answersHtml}</Stack>
            </RadioGroup>
        </Stack>
    )
}
