import { Accordion, Stack } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { useBorderColor } from '../../../../../shared/hooks/style.hook'
import SectionTitle from '../../../../components/SectionTitle'
import { useCourseDetailCurriculum } from '../../../../queries/course-detail-query.hook'
import CourseSection from './CourseSection'

const CourseContent = () => {
    const sections = useCourseDetailCurriculum()
    const borderColor = useBorderColor()
    const sectionsHtml = useMemo(() => {
        return sections?.map((section, i) => {
            return <CourseSection key={section._id} sIdx={i} />
        })
    }, [sections])
    if (sections?.length == 0) return <></>
    return (
        <Stack spacing={5}>
            {/* TITLE */}
            <SectionTitle>Course content</SectionTitle>
            {/* CURRICULUM */}
            <Accordion
                defaultIndex={[0]}
                allowMultiple
                border="1px solid"
                borderColor={borderColor}
            >
                {sectionsHtml}
            </Accordion>
        </Stack>
    )
}

export default React.memo(CourseContent)
