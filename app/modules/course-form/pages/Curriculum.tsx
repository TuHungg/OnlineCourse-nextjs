import { Accordion, Stack, Text } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    formCourseSetSectionExpandedIndexes,
    selectFormCourseCurriculum,
    selectFormCourseSectionExpandedIndexes,
} from '../../../store/course/form-course.slice'
import MyCircularProgress from '../../shared/components/MyCircularProgress'
import AddCourseSection from '../components/AddCourseSection'
import CourseSection from '../components/CourseSection'
import CoursePageSection from '../parts/CoursePageSection'

function Curriculum() {
    const dispatch = useDispatch()
    const expandedIndexes = useSelector(selectFormCourseSectionExpandedIndexes)
    const sections = useSelector(selectFormCourseCurriculum)
    const sectionListHtml = useMemo(() => {
        return sections.map((item, index) => {
            return <CourseSection key={item._id} sectionId={item._id} sectionIndex={index} />
        })
    }, [sections])

    return (
        <CoursePageSection
            title={'Curriculum'}
            // titleRight={isSaving && <SavingProgress />}
        >
            <Text>
                If you’re intending to offer your course for free, the total length of video content
                must be less than 2 hours.{' '}
            </Text>
            <Stack>
                {!sections ? (
                    <MyCircularProgress />
                ) : (
                    <Accordion
                        index={expandedIndexes}
                        allowMultiple
                        onChange={(indexes) =>
                            dispatch(formCourseSetSectionExpandedIndexes(indexes as number[]))
                        }
                    >
                        <Stack spacing={0}>
                            {sectionListHtml}
                            <AddCourseSection sectionIndex={sections.length} />
                        </Stack>
                    </Accordion>
                )}
            </Stack>
        </CoursePageSection>
    )
}

export default React.memo(Curriculum)
