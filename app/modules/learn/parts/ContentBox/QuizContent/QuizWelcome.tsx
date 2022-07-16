import { Button, Heading, HStack, Stack, Text, useBreakpointValue } from '@chakra-ui/react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { nextContent } from '../../../../../store/course/learn-course.slice'
import { useLearnQuiz } from '../../../providers/learn-quiz.provider'

export default function QuizWelcome({ type }: { type: 'start' | 'resume' }) {
    const dispatch = useDispatch()
    const {
        state: {
            learnQuiz: { quiz },
        },
        methods: { onStart, onResume },
    } = useLearnQuiz()
    const onSkip = () => {
        dispatch(nextContent())
    }
    const size = useBreakpointValue({ base: 'md', md: 'lg' })
    return (
        <Stack w="full" spacing={[4, 8, 20]} py={10}>
            <Stack>
                <Heading fontSize={['2xl', '2xl', '3xl', '4xl']}>{quiz?.title}</Heading>
                <HStack>
                    <Text>{quiz?.questions.length} questions</Text>
                </HStack>
            </Stack>

            <HStack spacing={8}>
                {type == 'start' ? (
                    <Button onClick={onStart} colorScheme={'purple'} size={size}>
                        Start quiz
                    </Button>
                ) : (
                    <Button onClick={onResume} colorScheme={'purple'} size={size}>
                        Resume quiz
                    </Button>
                )}
                <Button className="no-focus-shadow" size="lg" variant={'unstyled'} onClick={onSkip}>
                    Skip quiz
                </Button>
            </HStack>
        </Stack>
    )
}
