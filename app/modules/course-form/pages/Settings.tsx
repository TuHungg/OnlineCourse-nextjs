import { Text, Button, HStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectFormCourse, selectFormCourseId } from '../../../store/course/form-course.slice'
import PathHelper from '../../../utils/helpers/path.helper'
import { useCrudActions } from '../../shared/hooks/data/crud-actions.hook'
import CoursePageSection from '../parts/CoursePageSection'

function Settings() {
    const router = useRouter()
    const { onDeleteOne } = useCrudActions()
    const course = useSelector(selectFormCourse)
    const onDelete = async () => {
        try {
            await onDeleteOne(course!._id, course!.basicInfo.title, {
                ctrlName: 'courses',
                modelName: 'course',
            })
            router.push(PathHelper.getInstructorPath('courses'))
        } catch (e) {}
    }
    return (
        <CoursePageSection title={'Settings'}>
            <HStack>
                <Button onClick={onDelete} colorScheme={'red'}>
                    Delete
                </Button>
                <Text>
                    We promise students lifetime access, so courses cannot be deleted after students
                    have enrolled.
                </Text>
            </HStack>
        </CoursePageSection>
    )
}

export default React.memo(Settings)
