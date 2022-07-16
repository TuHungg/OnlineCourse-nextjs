import { Skeleton, Stack, StackDivider } from '@chakra-ui/react'
import React, { useCallback } from 'react'
import { InfiniteData } from 'react-query'
import InfiniteMoreButton from '../../../../shared/components/InfiniteList/InfiniteMoreButton'
import { useBorderColor } from '../../../../shared/hooks/style.hook'
import IReview from '../../../../shared/interfaces/models/review.interface'
import InstructorCourseReviewExcerpt from './InstructorCourseReviewExcerpt'

export interface InstructorCourseReviewListProps {
    data?: InfiniteData<IReview[]>
    isLoading: boolean
    fetchNextPage: () => void
    hasNextPage?: boolean
}
export default function InstructorCourseReviewList(props: InstructorCourseReviewListProps) {
    const borderColor = useBorderColor()

    const items = props.data?.pages.reduce((prev, current) => {
        return prev.concat(current)
    }, [])
    const renderItem = useCallback(
        (item: IReview, i: number) => {
            const prevId =
                i > 0 && !!items?.at(i - 1)?.course ? items!.at(i - 1)!.course._id : undefined
            return (
                <InstructorCourseReviewExcerpt key={item._id} item={item} prevCourseId={prevId} />
            )
        },
        [items]
    )
    if (props.isLoading)
        return (
            <Stack spacing={10}>
                {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} height="100px" />
                ))}
            </Stack>
        )
    return (
        <Stack spacing={10} divider={<StackDivider color={borderColor} />} pb={10}>
            {items?.map(renderItem)}
            <InfiniteMoreButton
                hasNextPage={props.hasNextPage}
                fetchNextPage={props.fetchNextPage}
                title="See more Reviews"
            />
        </Stack>
    )
}
