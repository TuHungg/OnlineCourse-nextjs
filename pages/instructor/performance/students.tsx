import { Flex, Stack } from '@chakra-ui/react'
import InstructorCourseFilter from '../../../app/modules/instructor/components/InstructorCourseFilter'
import InstructorPage from '../../../app/modules/instructor/components/InstructorPage'
import InstructorLayout from '../../../app/modules/instructor/InstructorLayout'
import InstructorPagination from '../../../app/modules/instructor/pages/courses/CoursesPage/CoursesPagination'
import { StudentCount } from '../../../app/modules/instructor/pages/performance/StudentsPage/StudentCount'
import StudentTable from '../../../app/modules/instructor/pages/performance/StudentsPage/StudentTable'
import { useCountStudentsQuery } from '../../../app/modules/instructor/queries/students-query.hook'
import MyHead from '../../../app/modules/shared/components/MyHead'
import { NextPageWithLayout } from '../../../app/types/next'
import AppTitle from '../../../app/utils/constants/app-title.constant'

const Pagination = () => {
    const { data } = useCountStudentsQuery()
    return <InstructorPagination totalItems={data} />
}

const Page: NextPageWithLayout = () => {
    return (
        <>
            <MyHead title={AppTitle.INSTRUCTOR_STUDENTS} />
            <InstructorPage title="Students">
                <Stack spacing={10}>
                    <Flex
                        justify={{ md: 'space-between' }}
                        flexDir={{ base: 'column', md: 'row' }}
                        alignItems={{ base: 'stretch', md: 'end' }}
                    >
                        <StudentCount />
                        <InstructorCourseFilter />
                    </Flex>
                    <StudentTable />
                    <Pagination />
                </Stack>
            </InstructorPage>
        </>
    )
}

Page.getLayout = InstructorLayout
export default Page
