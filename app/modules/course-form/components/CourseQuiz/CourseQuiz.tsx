import { AccordionPanel, Button, HStack, Icon, Stack } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { formCourseAddUnitExpandedIndex } from '../../../../store/course/form-course.slice'
import AppIcon from '../../../../utils/constants/app-icon.constant'
import TypeHelper from '../../../../utils/helpers/type.helper'
import { useLectureParams } from '../../providers/lecture-params.provider'
import { QuizParamsProvider, useQuizParams } from '../../providers/quiz-params.provider'
import { useUnitParams } from '../../providers/unit-params.provider'
import CourseUnitHeader from '../CourseUnit/CourseUnitHeader'
import QuizContentForm from './AddQuizContent/QuizQuestionForm'
import QuestionExcerpt from './QuestionExcerpt'

const HeaderActionButton = () => {
    const dispatch = useDispatch();
    const { address: { sectionId, unitId }, state: { isEditContent }, methods: { setEditContent } } = useUnitParams();
    const { state: { quiz, } } = useQuizParams();
    if (quiz.questions.length > 0 && !isEditContent) return <></>
    return (
        <>
            {
                !isEditContent ? (
                    <Button onClick={(e) => {
                        e.stopPropagation();
                        setEditContent(true)
                        dispatch(formCourseAddUnitExpandedIndex({ sectionId, unitId }))
                    }} size='xs' colorScheme={'blue'} leftIcon={<Icon as={AppIcon.add} />}>Question</Button>
                ) : (
                    <Button onClick={(e) => {
                        e.stopPropagation();
                        setEditContent(false);
                    }} size='xs' leftIcon={<Icon as={AppIcon.x} />}>Cancel</Button>
                )
            }
        </>
    )
}

const QuestionList = () => {
    const { state: { quiz } } = useQuizParams();
    const questionsHtml = quiz.questions.map((item, i) => {
        return (
            <QuestionExcerpt key={i} question={item} index={i} />
        )
    })
    return (
        <Stack>
            {questionsHtml}
        </Stack>
    )
}

const QuizBody = () => {
    const { state: { isEditContent }, methods: { setEditContent } } = useUnitParams();
    const onAddQuestion = () => {
        setEditContent(true);
    }
    return (
        <Stack spacing={4} p={2}>
            {
                !isEditContent ? (
                    <Stack spacing={10}>
                        <HStack justify={'space-between'}>
                            <Button onClick={onAddQuestion} size='sm' colorScheme={'blue'} leftIcon={<Icon as={AppIcon.add} />}>Question</Button>
                            <Button size='sm' colorScheme={'orange'} >Preview</Button>
                        </HStack>
                        <QuestionList />
                    </Stack>
                ) : (
                    <QuizContentForm />
                )
            }
        </Stack>
    )
}


const Main = () => {
    const { state: { quiz } } = useQuizParams();
    const action = useMemo(() => {
        return <HeaderActionButton />
    }, []);
    return <>
        {/* HEADER */}
        <CourseUnitHeader
            title={quiz.title}
            action={action}
        />
        <AccordionPanel pb={4} borderTop='1px solid black'>
            <QuizBody />
        </AccordionPanel>
    </>
}
const MainMemo = React.memo(Main);

const CourseQuiz = () => {
    return (
        <QuizParamsProvider>
            <MainMemo />
        </QuizParamsProvider>
    )
}

export default React.memo(CourseQuiz);