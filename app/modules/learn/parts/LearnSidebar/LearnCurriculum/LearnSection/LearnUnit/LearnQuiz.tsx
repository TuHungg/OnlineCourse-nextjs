import { Text, HStack, Stack, Icon } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import {
    selectLearnQuiz,
    selectLearnUnitNo,
} from '../../../../../../../store/course/learn-course.slice'
import AppIcon from '../../../../../../../utils/constants/app-icon.constant'
import { LearnUnitProps } from './LearnUnit'

export interface LearnQuizProps extends LearnUnitProps {}
export default function LearnQuiz(props: LearnQuizProps) {
    const no = useSelector(selectLearnUnitNo(props.sIdx, props.uIdx))
    const quiz = useSelector(selectLearnQuiz(props.sIdx, props.uIdx))

    return (
        <Stack spacing={1}>
            <HStack>
                <Text>{no}.</Text>
                <Text>Quiz: {quiz?.title}</Text>
            </HStack>
            <HStack justify={'space-between'}>
                <HStack>
                    <Icon as={AppIcon.quiz} />
                    <Text as="span" fontSize={'xs'}>
                        {quiz?.questions.length} questions
                    </Text>
                </HStack>
            </HStack>
        </Stack>
    )
}
