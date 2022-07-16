import {
    Text,
    AccordionItem,
    AccordionButton,
    HStack,
    AccordionIcon,
    AccordionPanel,
    Accordion,
    Icon,
} from '@chakra-ui/react'
import React, { useMemo } from 'react'
import AppIcon from '../../../../../../utils/constants/app-icon.constant'
import DateHelper from '../../../../../../utils/helpers/date.helper'
import TypeHelper from '../../../../../../utils/helpers/type.helper'
import IFile from '../../../../../shared/interfaces/models/file.interface'
import ILecture from '../../../../../shared/interfaces/models/lecture.interface'
import IQuiz from '../../../../../shared/interfaces/models/quiz.interface'
import { useCourseDetailUnit } from '../../../../queries/course-detail-query.hook'

export interface CourseUnitProps {
    sIdx: number
    uIdx: number
}

const CourseLecture = ({ lecture }: { lecture: ILecture }) => {
    const duration = (lecture.video as IFile)?.duration
    return (
        <AccordionItem border="none">
            <AccordionButton
                as="div"
                _hover={{}}
                className="no-focus-shadow"
                sx={{ cursor: 'pointer' }}
            >
                <HStack w="100%">
                    <Icon as={AppIcon.play} />
                    <HStack flex={1}>
                        <Text textAlign="left">{lecture.title}</Text>
                        {lecture.description && <AccordionIcon />}
                    </HStack>
                    {!!duration && <Text>{DateHelper.getRoundMinute(duration)} min</Text>}
                </HStack>
            </AccordionButton>
            {lecture.description && (
                <AccordionPanel pb={4}>
                    <div dangerouslySetInnerHTML={{ __html: lecture.description }}></div>
                </AccordionPanel>
            )}
        </AccordionItem>
    )
}
const CourseQuiz = ({ quiz }: { quiz: IQuiz }) => {
    return (
        <AccordionItem border="none">
            <AccordionButton
                as="div"
                _hover={{}}
                className="no-focus-shadow"
                sx={{ cursor: 'pointer' }}
            >
                <HStack w="100%">
                    <Icon as={AppIcon.quiz} />
                    <HStack flex={1}>
                        <Text textAlign="left">{quiz.title}</Text>
                        {quiz.description && <AccordionIcon />}
                    </HStack>
                    <Text>{quiz.questions.length} questions</Text>
                </HStack>
            </AccordionButton>
            {quiz.description && (
                <AccordionPanel pb={4}>
                    <div dangerouslySetInnerHTML={{ __html: quiz.description }}></div>
                </AccordionPanel>
            )}
        </AccordionItem>
    )
}

export default function CourseUnit(props: CourseUnitProps) {
    const unit = useCourseDetailUnit(props.sIdx, props.uIdx)
    const renderUnit = useMemo(() => {
        switch (unit?.type) {
            case 'lecture':
                return <CourseLecture lecture={unit.lecture as ILecture} />
            case 'quiz':
                return <CourseQuiz quiz={unit.quiz as IQuiz} />
        }
        return <></>
    }, [unit])
    return <>{renderUnit}</>
}
