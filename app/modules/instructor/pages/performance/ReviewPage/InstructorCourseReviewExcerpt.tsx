import { Box, Heading, HStack, Stack, StackDivider } from '@chakra-ui/react'
import React from 'react'
import PathHelper from '../../../../../utils/helpers/path.helper'
import Rating from '../../../../client/components/Rating'
import ReviewExcerpt from '../../../../client/pages/CourseDetail/Reviews/ReviewExcerpt'
import CourseImage from '../../../../shared/components/CourseImage'
import NextLink from '../../../../shared/components/NextLink'
import { useBorderColor } from '../../../../shared/hooks/style.hook'
import ICourse from '../../../../shared/interfaces/models/course.interface'
import IReview from '../../../../shared/interfaces/models/review.interface'
import InstructorRespondForm from '../../../components/ReviewResponseForm'
import {
    InstructorCourseReviewProvider,
    useInstructorCourseReview,
} from '../../../providers/instructor-course-review.provider'
import { useInstructorParams } from '../../../providers/instructor-params.provider'
import { InstructorCourseReviewExcerptBottomBar } from './IntructorCourseReviewExcerptBottomBar'

export const ReviewCourseExcerpt = ({ item }: { item: ICourse }) => {
    return (
        <NextLink href={PathHelper.getCourseDetailPath(item.basicInfo.slug)}>
            <HStack align="start" spacing={4}>
                <CourseImage src={item.basicInfo.image || ''} w="150px" />
                <Stack>
                    <Heading fontSize={'xl'}>{item.basicInfo.title}</Heading>
                    <Rating value={item.meta.avgRatingScore || 0} />
                </Stack>
            </HStack>
        </NextLink>
    )
}
const Main = ({ prevCourseId }: InstructorCourseReviewExcerptProps) => {
    const borderColor = useBorderColor()
    const {
        state: { viewMode },
    } = useInstructorParams()
    const {
        state: { writingResponse, review },
    } = useInstructorCourseReview()
    return (
        <Stack divider={<StackDivider color={borderColor} />} spacing={8}>
            {/* course */}
            {prevCourseId != review?.course?._id && !!review.course ? (
                <ReviewCourseExcerpt item={review.course} />
            ) : null}

            {/* review */}
            <Stack spacing={5}>
                <ReviewExcerpt
                    showResponse={!writingResponse}
                    showAllContent={true}
                    review={review}
                    timeType="long"
                />
                {!viewMode && (
                    <Box pl={[0, 8]}>
                        {!writingResponse ? (
                            <InstructorCourseReviewExcerptBottomBar />
                        ) : (
                            <InstructorRespondForm />
                        )}
                    </Box>
                )}
            </Stack>
        </Stack>
    )
}

export interface InstructorCourseReviewExcerptProps {
    item: IReview
    prevCourseId?: string
}
const InstructorCourseReviewExcerpt = (props: InstructorCourseReviewExcerptProps) => {
    return (
        <InstructorCourseReviewProvider review={props.item}>
            <Main {...props} />
        </InstructorCourseReviewProvider>
    )
}
export default React.memo(InstructorCourseReviewExcerpt)
