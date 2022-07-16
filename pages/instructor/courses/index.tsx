import { Stack } from '@chakra-ui/react'
import InstructorPage from '../../../app/modules/instructor/components/InstructorPage'
import InstructorLayout from '../../../app/modules/instructor/InstructorLayout'
import InstructorPagination from '../../../app/modules/instructor/pages/courses/CoursesPage/CoursesPagination'
import CourseTable from '../../../app/modules/instructor/pages/courses/CoursesPage/CourseTable'
import CoursesToolbar from '../../../app/modules/instructor/pages/courses/CoursesPage/CourseToolbar'
import { useCountInstructorCoursesQuery } from '../../../app/modules/instructor/queries/instructor-courses-query.hook'
import MyHead from '../../../app/modules/shared/components/MyHead'
import { CourseActionsProvider } from '../../../app/modules/shared/providers/course-actions.provider'
import { NextPageWithLayout } from '../../../app/types/next'
import AppTitle from '../../../app/utils/constants/app-title.constant'

const Pagination = () => {
    const { data } = useCountInstructorCoursesQuery()
    return <InstructorPagination totalItems={data} />
}

const Page: NextPageWithLayout = () => {
    return (
        <>
            <MyHead title={AppTitle.INSTRUCTOR_COURSES} />
            <CourseActionsProvider>
                <InstructorPage title="Courses">
                    <Stack>
                        <CoursesToolbar />
                        <CourseTable />
                        <Pagination />
                    </Stack>
                </InstructorPage>
            </CourseActionsProvider>
        </>
    )
}

Page.getLayout = InstructorLayout
export default Page
