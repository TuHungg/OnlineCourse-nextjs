import { Button, ButtonGroup, Stack, StackDivider } from '@chakra-ui/react'
import React from 'react'
import { useBorderColor } from '../../../../shared/hooks/style.hook'
import IReview from '../../../../shared/interfaces/models/review.interface'
import { useCourseReviews } from '../../../queries/course-reviews-query.hook'
import ReviewExcerpt from './ReviewExcerpt'

function ReviewList({
    reviews,
    hasNextPage,
    fetchNextPage,
}: {
    fetchNextPage: () => void
    hasNextPage?: boolean
    filterStar?: number
    reviews: IReview[]
}) {
    const borderColor = useBorderColor()
    const reviewsHtml = reviews.map((item) => <ReviewExcerpt key={item._id} review={item} />)
    return (
        <Stack spacing={8} divider={<StackDivider color={borderColor} />}>
            {reviewsHtml}
            {hasNextPage && (
                <ButtonGroup justifyContent={'center'}>
                    <Button onClick={() => fetchNextPage()} variant={'ghost'} colorScheme="purple">
                        See more reviews
                    </Button>
                </ButtonGroup>
            )}
        </Stack>
    )
}

export default React.memo(ReviewList)
