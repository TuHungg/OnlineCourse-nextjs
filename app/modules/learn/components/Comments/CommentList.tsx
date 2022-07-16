import { Button, ButtonGroup, Stack, StackDivider } from '@chakra-ui/react'
import React, { useCallback } from 'react'
import MyCircularProgress from '../../../shared/components/MyCircularProgress'
import { useBorderColor } from '../../../shared/hooks/style.hook'
import IComment from '../../../shared/interfaces/models/comment.interface'
import CommentExcerpt from './CommentExcerpt/CommentExcerpt'

function CommentList({
    comments,
    parentId,
    fetchNextPage,
    hasNextPage,
    isLoading,
}: {
    fetchNextPage?: () => void
    hasNextPage?: boolean
    parentId?: string
    comments: IComment[]
    isLoading?: boolean
}) {
    const borderColor = useBorderColor()
    //
    const renderItem = useCallback(
        (item: IComment) => {
            return <CommentExcerpt key={item._id} parentId={parentId} comment={item} />
        },
        [parentId]
    )
    if (isLoading) return <MyCircularProgress />
    return (
        <Stack
            spacing={!!parentId ? 4 : 8}
            divider={!parentId ? <StackDivider color={borderColor} /> : undefined}
        >
            {comments.map(renderItem)}
            {!!hasNextPage && !!fetchNextPage ? (
                <ButtonGroup justifyContent={'center'}>
                    <Button onClick={() => fetchNextPage()} variant={'ghost'} colorScheme="purple">
                        See more comments
                    </Button>
                </ButtonGroup>
            ) : null}
        </Stack>
    )
}

export default React.memo(CommentList)
