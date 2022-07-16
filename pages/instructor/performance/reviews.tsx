import { Flex, Stack } from '@chakra-ui/react'
import InstructorFeatureNumber from '../../../app/modules/instructor/components/InstructorCount'
import InstructorCourseFilter from '../../../app/modules/instructor/components/InstructorCourseFilter'
import InstructorPage from '../../../app/modules/instructor/components/InstructorPage'
import InstructorLayout from '../../../app/modules/instructor/InstructorLayout'
import { ReviewCourseExcerpt } from '../../../app/modules/instructor/pages/performance/ReviewPage/InstructorCourseReviewExcerpt'
import InstructorCourseReviewList from '../../../app/modules/instructor/pages/performance/ReviewPage/InstructorCourseReviewList'
import { useInstructorBriefCourseQuery } from '../../../app/modules/instructor/queries/brief-course-query.hook'
import {
    useCountInstructorCourseReviewsQuery,
    useInstructorCourseReviewsQuery,
} from '../../../app/modules/instructor/queries/instructor-course-reviews-query'
import MyHead from '../../../app/modules/shared/components/MyHead'
import { NextPageWithLayout } from '../../../app/types/next'
import AppTitle from '../../../app/utils/constants/app-title.constant'

const Count = () => {
    const { isLoading, data } = useCountInstructorCourseReviewsQuery()
    if (isLoading) return <></>
    return <InstructorFeatureNumber value={data || 0} label="reviews" />
}

const Page: NextPageWithLayout = () => {
    const { data: courseBriefData } = useInstructorBriefCourseQuery()
    const { isLoading, data, hasNextPage, fetchNextPage } = useInstructorCourseReviewsQuery()
    return (
        <>
            <MyHead title={AppTitle.INSTRUCTOR_REVIEWS} />
            <InstructorPage title="Reviews">
                <Stack spacing={10}>
                    <Flex
                        justify={{ md: 'space-between' }}
                        flexDir={{ base: 'column', md: 'row' }}
                        alignItems={{ base: 'stretch', md: 'end' }}
                    >
                        <Count />
                        <InstructorCourseFilter />
                    </Flex>
                    <Stack spacing={20}>
                        {courseBriefData && <ReviewCourseExcerpt item={courseBriefData} />}
                        <InstructorCourseReviewList
                            isLoading={isLoading}
                            data={data}
                            hasNextPage={hasNextPage}
                            fetchNextPage={fetchNextPage}
                        />
                    </Stack>
                </Stack>
            </InstructorPage>
        </>
    )
}

Page.getLayout = InstructorLayout
export default Page
