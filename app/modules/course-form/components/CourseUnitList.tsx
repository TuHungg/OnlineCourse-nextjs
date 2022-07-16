import { Accordion, Alert, AlertIcon, Stack } from '@chakra-ui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formCourseSetUnitExpandedIndexes, selectFormCourseSectionById, selectFormCourseUnitExpandedIndexes } from '../../../store/course/form-course.slice';
import AddCourseUnit from './CourseUnit/AddUnit/AddCourseUnit';
import CourseLecture from './CourseLecture/CourseLecture';
import CourseUnit from './CourseUnit';

export interface CourseUnitListProps {
    sectionId: string
}

export default function CourseUnitList({ sectionId }: CourseUnitListProps) {
    const dispatch = useDispatch();
    const section = useSelector(selectFormCourseSectionById(sectionId))!;
    const unitExpandedIndexes = useSelector(selectFormCourseUnitExpandedIndexes(section._id));;
    const unitListHtml = section?.units?.map((item, index) => {
        return <CourseUnit key={item._id} unitId={item._id} sectionId={section._id} unitIdx={index} />
    })
    return (
        <Accordion allowMultiple index={unitExpandedIndexes} onChange={(values) => {
            dispatch(formCourseSetUnitExpandedIndexes({ sectionId: section!._id, indexes: values as number[] }))
        }}>
            <Stack spacing={0} >
                {
                    section.units.length > 0 ? unitListHtml : (
                        <Alert status='info'>
                            <AlertIcon />
                            No units yet!
                        </Alert>
                    )

                }
                <AddCourseUnit sectionId={sectionId} unitId='' unitIdx={section.units.length} />
            </Stack>
        </Accordion>
    )
}
