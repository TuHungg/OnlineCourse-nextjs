import { Stack } from '@chakra-ui/react'
import React from 'react'
import { CourseActionsProvider } from '../../../../shared/providers/course-actions.provider'
import InstructorPage from '../../../components/InstructorPage'
import { useCountInstructorCoursesQuery } from '../../../queries/instructor-courses-query.hook'
import InstructorPagination from './CoursesPagination'
import CourseTable from './CourseTable'
import CoursesToolbar from './CourseToolbar'

const Pagination = () => {
    const { data } = useCountInstructorCoursesQuery()
    return <InstructorPagination totalItems={data} />
}

export default function CoursesPage() {
    return (
        <CourseActionsProvider>
            <InstructorPage title="Courses">
                <Stack>
                    <CoursesToolbar />
                    <CourseTable />
                    <Pagination />
                </Stack>
            </InstructorPage>
        </CourseActionsProvider>
    )
}
