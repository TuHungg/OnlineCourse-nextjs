import { Heading, Stack } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectActiveUnit } from '../../../../store/course/learn-course.slice'
import CommentForm from '../../components/Comments/CommentForm'
import CommentList from '../../components/Comments/CommentList'
import { useUnitComments } from '../../queries/unit-comments-query.hook'

export default function UnitComments() {
    const unit = useSelector(selectActiveUnit)
    const { data, fetchNextPage, hasNextPage } = useUnitComments(unit?._id)
    const comments = data?.pages.reduce((prev, current) => {
        return prev.concat(current)
    }, [])
    return (
        <Stack>
            <CommentForm />
            <CommentList
                fetchNextPage={fetchNextPage}
                hasNextPage={hasNextPage}
                comments={comments || []}
            />
        </Stack>
    )
}
