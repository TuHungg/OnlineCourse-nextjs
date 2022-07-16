import { Avatar, Box, Button, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import moment from 'moment'
import React, { useEffect, useMemo, useState } from 'react'
import DateHelper from '../../../../../utils/helpers/date.helper'
import { InstructorRespondExcerpt } from '../../../../shared/components/InstructorRespondExcerpt'
import { useSubtitleColor } from '../../../../shared/hooks/style.hook'
import IReview from '../../../../shared/interfaces/models/review.interface'
import RatingStar from '../../../components/RatingStar'

const briefLength = 180
const ReviewContent = ({
    review,
    showAllContent,
}: {
    review: IReview
    showAllContent: boolean
}) => {
    const [isFull, setFull] = useState(false)
    useEffect(() => {
        if ((review.content?.length || 0) < briefLength) {
            setFull(true)
        }
    }, [review.content])
    const isLong = useMemo(() => {
        return (review.content?.length || 0) >= briefLength
    }, [review.content])
    return (
        <Stack>
            <Text fontSize={'sm'}>
                {isFull || showAllContent
                    ? review.content
                    : review.content?.slice(0, briefLength) + '...'}
            </Text>
            {!showAllContent && isLong ? (
                !isFull ? (
                    <Button
                        onClick={() => setFull(true)}
                        variant={'outline'}
                        colorScheme="purple"
                        size="xs"
                        alignSelf={'start'}
                    >
                        Show more
                    </Button>
                ) : (
                    <Button
                        onClick={() => setFull(false)}
                        variant={'outline'}
                        colorScheme="purple"
                        size="xs"
                        alignSelf={'start'}
                    >
                        Show less
                    </Button>
                )
            ) : null}
        </Stack>
    )
}

function ReviewExcerpt({
    review,
    timeType = 'short',
    showAllContent = false,
    showResponse = true,
}: {
    showAllContent?: boolean
    review: IReview
    timeType?: 'short' | 'long'
    showResponse?: boolean
}) {
    const subColor = useSubtitleColor()
    const fullName = review.user.profile.fullName
    return (
        <Stack spacing={5}>
            <HStack align={'start'} spacing={{ base: 0, sm: 4 }}>
                <Avatar
                    display={['none', 'inline-block']}
                    name={fullName}
                    src={review.user.profile.avatar || ''}
                    size="md"
                />
                <Stack flex={1}>
                    <HStack justify={'space-between'}>
                        <Heading size="sm">{fullName}</Heading>
                        <Text
                            color={subColor}
                            fontSize="sm"
                            title={DateHelper.getLongDate(new Date(review.timestamps.createdAt))}
                        >
                            {moment(review.timestamps.createdAt).fromNow()}
                        </Text>
                    </HStack>
                    <RatingStar value={review.rating} w={'20px'} />
                    <ReviewContent review={review} showAllContent={showAllContent} />
                </Stack>
            </HStack>
            {showResponse && review.response?.content ? (
                <Box pl={[0, 8]}>
                    <InstructorRespondExcerpt item={review.response} />
                </Box>
            ) : null}
        </Stack>
    )
}
export default React.memo(ReviewExcerpt)
