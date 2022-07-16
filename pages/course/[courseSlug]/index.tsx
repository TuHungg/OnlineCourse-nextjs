import { Box, Container, HStack, Stack } from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { dehydrate, QueryClient } from 'react-query'
import { fetchCourseBySlug } from '../../../app/apis/course/client-course.api'
import ClientLayout from '../../../app/modules/client/ClientLayout'
import { useShowPreviewCourse } from '../../../app/modules/client/hooks/show-preview-course.hook'
import CourseDetailReviews from '../../../app/modules/client/pages/CourseDetail/Reviews/CourseDetailReviews'
import CourseDetailReviewsStat from '../../../app/modules/client/pages/CourseDetail/Reviews/CourseDetailReviewsStat'
import CourseContent from '../../../app/modules/client/pages/CourseDetail/Sections/CourseContent/CourseContent'
import CourseDescription from '../../../app/modules/client/pages/CourseDetail/Sections/CourseDescription'
import CourseIntro from '../../../app/modules/client/pages/CourseDetail/Sections/CourseIntro'
import CourseObjective from '../../../app/modules/client/pages/CourseDetail/Sections/CourseObjective'
import CourseRequirement from '../../../app/modules/client/pages/CourseDetail/Sections/CourseRequirement'
import CourseSuitableLearner from '../../../app/modules/client/pages/CourseDetail/Sections/CourseSuitableLearner'
import CoursePreview from '../../../app/modules/client/pages/CourseDetail/Sections/CoursePreview'
import {
    getCourseDetailSlug,
    RQK_COURSE_DETAIL,
    useCourseDetailQuery,
} from '../../../app/modules/client/queries/course-detail-query.hook'
import MyCircularProgress from '../../../app/modules/shared/components/MyCircularProgress'
import MyHead from '../../../app/modules/shared/components/MyHead'
import { NextPageWithLayout } from '../../../app/types/next'
import PathHelper from '../../../app/utils/helpers/path.helper'

const CoursePage: NextPageWithLayout = () => {
    const { data: course } = useCourseDetailQuery()
    const router = useRouter()
    const show = useShowPreviewCourse()
    return (
        <>
            <MyHead
                title={course?.basicInfo.title}
                author={course?.history.createdBy.profile.fullName}
                ogBasics={{
                    title: course?.basicInfo.title,
                    path: PathHelper.getCourseDetailPath(course?.basicInfo.slug || ''),
                    description: course?.basicInfo.subtitle,
                    type: 'article',
                }}
                ogImage={{
                    url: course?.basicInfo.image || undefined,
                    width: 240,
                    height: 135,
                }}
            />
            <Stack>
                {router.isFallback ? (
                    <HStack justify={'center'} py={10}>
                        <MyCircularProgress />
                    </HStack>
                ) : (
                    <>
                        <CourseIntro />
                        <HStack justify={'start'}>
                            <Container maxW={'container.lg'}>
                                <Box maxW={'700px'} margin={show ? 'unset' : 'auto'}>
                                    <Stack spacing={8}>
                                        <CourseObjective />
                                        <CourseContent />
                                        <CourseRequirement />
                                        <CourseDescription />
                                        <CourseSuitableLearner />
                                        <CourseDetailReviewsStat />
                                        <CourseDetailReviews />
                                        <CoursePreview />
                                    </Stack>
                                </Box>
                            </Container>
                        </HStack>
                    </>
                )}
            </Stack>
        </>
    )
}

CoursePage.getLayout = ClientLayout

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: 'blocking', // false or 'blocking'
    }
}
export default CoursePage
export const getStaticProps: GetStaticProps = async (context) => {
    const queryClient = new QueryClient()
    const slug = getCourseDetailSlug(context.params)
    await queryClient.prefetchQuery([RQK_COURSE_DETAIL, slug], () => fetchCourseBySlug(slug + ''))
    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
        revalidate: 10 * 60,
    }
}
