import { AccordionPanel, Button, Icon, Stack } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { formCourseAddUnitExpandedIndex } from '../../../../store/course/form-course.slice'
import AppIcon from '../../../../utils/constants/app-icon.constant'
import TypeHelper from '../../../../utils/helpers/type.helper'
import { LectureParamsProvider, useLectureParams } from '../../providers/lecture-params.provider'
import { useUnitParams } from '../../providers/unit-params.provider'
import CourseUnitHeader from '../CourseUnit/CourseUnitHeader'
import AddLectureContent from './AddLectureContent/AddLectureContent'
import LectureVideo from './AddLectureContent/LectureVideo'
import LectureDescription from './LectureDescription'
import LectureResource from './LectureResource/LectureResource'

const HeaderActionButton = () => {
    const dispatch = useDispatch();
    const { address: { sectionId, unitId }, state: { isEditContent }, methods: { setEditContent } } = useUnitParams();
    const { state: { lecture } } = useLectureParams();
    if (lecture?.video && !isEditContent) return <></>
    return (
        <>
            {
                !isEditContent ? (
                    <Button onClick={(e) => {
                        e.stopPropagation();
                        setEditContent(true)
                        dispatch(formCourseAddUnitExpandedIndex({ sectionId, unitId }))
                    }} size='xs' colorScheme={'blue'} leftIcon={<Icon as={AppIcon.add} />}>Content</Button>
                ) : (
                    <Button onClick={(e) => {
                        e.stopPropagation();
                        setEditContent(false)
                    }} size='xs' leftIcon={<Icon as={AppIcon.x} />}>Cancel</Button>
                )
            }
        </>
    )
}

const LectureBody = () => {
    const { state: { lecture } } = useLectureParams();
    const { state: { isEditContent } } = useUnitParams();
    const video = TypeHelper.isFile(lecture?.video) ? lecture?.video : undefined;
    return (
        <Stack spacing={4} p={2}>
            {
                !isEditContent ? (
                    <>
                        {
                            video ? <LectureVideo /> : null
                        }
                        <LectureDescription />
                        <LectureResource />
                    </>
                ) : (
                    <AddLectureContent />
                )
            }
        </Stack>
    )
}


const Main = () => {
    const { state: { lecture } } = useLectureParams();
    const action = useMemo(() => {
        return <HeaderActionButton />
    }, []);
    return <>
        {/* HEADER */}
        <CourseUnitHeader
            title={lecture.title}
            action={action}
        />
        <AccordionPanel pb={4} borderTop='1px solid black'>
            <LectureBody />
        </AccordionPanel>
    </>
}
const MainMemo = React.memo(Main);

const CourseLecture = () => {
    return (
        <LectureParamsProvider>
            <MainMemo />
        </LectureParamsProvider>
    )
}

export default React.memo(CourseLecture);