import {
    Avatar,
    Box,
    Button,
    Flex,
    Heading,
    HStack,
    Icon,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Stack,
    Text,
    VStack,
} from '@chakra-ui/react'
import moment from 'moment'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import AppIcon from '../../../../../utils/constants/app-icon.constant'
import lan from '../../../../../utils/constants/lan.constant'
import DateHelper from '../../../../../utils/helpers/date.helper'
import NotifyHelper from '../../../../../utils/helpers/notify.helper'
import { useSimpleDialog } from '../../../../admin/providers/simple-dialog.provider'
import { useAuth } from '../../../../auth/providers/auth.provider'
import { useAppToast } from '../../../../shared/hooks/app-toast.hook'
import { useSubtitleColor } from '../../../../shared/hooks/style.hook'
import IComment from '../../../../shared/interfaces/models/comment.interface'
import { useDeleteUnitComment } from '../../../queries/unit-comments-query.hook'
import {
    useDeleteUnitSubComment,
    useUnitSubCommentsQuery,
} from '../../../queries/unit-sub-comments-query.hook'
import CommentForm from '../CommentForm'
import CommentList from '../CommentList'

const briefLength = 180
const CommentContent = ({ comment, parentId }: CommentExcerptProps) => {
    const [isFull, setFull] = useState(false)
    useEffect(() => {
        if (comment.content.length < briefLength) {
            setFull(true)
        }
    }, [comment.content])
    const isLong = useMemo(() => {
        return comment.content.length >= briefLength
    }, [comment.content])
    return (
        <Stack>
            <Text fontSize={'md'}>
                {isFull ? comment.content : comment.content.slice(0, briefLength) + '...'}
            </Text>
            {isLong ? (
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

const CommentBottomBar = (props: CommentExcerptProps) => {
    const [isReply, setReply] = useState<boolean>(false)
    const [showSubs, setShowSubs] = useState<boolean>(false)
    const { isLoading: subCommentLoading, data: subComments } = useUnitSubCommentsQuery(
        props.comment._id,
        showSubs
    )
    //
    const onCancel = useCallback(() => {
        setReply(false)
    }, [])
    const onReply = () => {
        setReply(true)
        setShowSubs(true)
    }
    const onViewReplies = () => {
        setShowSubs(true)
    }
    return (
        <Stack spacing={5}>
            <Stack>
                <HStack>
                    <Button size={'sm'} onClick={onReply} variant={'link'} colorScheme="gray">
                        Reply
                    </Button>
                </HStack>
                {!!props.comment.hasSub && !showSubs ? (
                    <HStack>
                        <Button
                            size={'sm'}
                            onClick={onViewReplies}
                            colorScheme="purple"
                            variant="link"
                        >
                            View replies
                        </Button>
                    </HStack>
                ) : null}
            </Stack>

            {isReply ? (
                <CommentForm parentId={props.parentId || props.comment._id} onCancel={onCancel} />
            ) : null}
            {showSubs ? (
                <Box pl={[4, 0]}>
                    <CommentList
                        isLoading={subCommentLoading}
                        parentId={props.comment._id}
                        comments={subComments || []}
                    />
                </Box>
            ) : null}
        </Stack>
    )
}

const Actions = (
    props: CommentExcerptProps & { editMode: boolean; setEditMode: (val: boolean) => void }
) => {
    const toast = useAppToast()
    const simpleDialog = useSimpleDialog()
    const { mutate: deleteComment } = useDeleteUnitComment()
    const { mutate: deleteSubComment } = useDeleteUnitSubComment()
    const onDelete = async () => {
        simpleDialog.onShow({
            title: `Delete your comment?`,
            content: lan.DELETE_WARNING,
            onPositive: async () => {
                if (!props.parentId) await deleteComment(props.comment._id)
                else await deleteSubComment(props.comment._id)
                toast(NotifyHelper.success('Comment deleted'))
            },
        })
    }
    const onEdit = () => {
        props.setEditMode(true)
    }
    return (
        <Menu>
            <MenuButton
                variant="unstyled"
                as={IconButton}
                icon={<Icon as={AppIcon.moreVertical} />}
            ></MenuButton>
            <MenuList>
                <MenuItem onClick={onEdit}>Edit</MenuItem>
                <MenuItem onClick={onDelete}>Delete</MenuItem>
            </MenuList>
        </Menu>
    )
}

export interface CommentExcerptProps {
    comment: IComment
    parentId?: string
    subComments?: IComment[]
}

function CommentExcerpt({ comment, ...props }: CommentExcerptProps) {
    const {
        state: { user },
    } = useAuth()
    const subColor = useSubtitleColor()
    const [editMode, setEditMode] = useState<boolean>(false)
    //
    const fullName = comment.user.profile.fullName
    const isMyComment = user?._id == comment.user._id
    const onCancelEdit = useCallback(() => {
        setEditMode(false)
    }, [])
    return (
        <>
            {!editMode ? (
                <HStack
                    data-source-id={comment._id}
                    className="comment-excerpt"
                    align={'start'}
                    spacing={{ base: 0, sm: 4 }}
                    w="full"
                >
                    <Avatar
                        display={['none', 'inline-block']}
                        name={fullName}
                        src={comment.user.profile.avatar || ''}
                        size={'md'}
                    />
                    <Stack flex={1}>
                        <Stack spacing={1}>
                            <Flex align={'center'} justify={'space-between'}>
                                <VStack align="start" spacing={0}>
                                    <Heading fontSize={'md'}>{fullName}</Heading>
                                    <Text
                                        color={subColor}
                                        fontSize={'sm'}
                                        title={DateHelper.getLongDate(
                                            new Date(comment.timestamps.createdAt)
                                        )}
                                    >
                                        {/* {} */}
                                        {moment(comment.timestamps.createdAt).fromNow()}
                                    </Text>
                                </VStack>
                                {isMyComment ? (
                                    <Actions
                                        editMode={editMode}
                                        setEditMode={setEditMode}
                                        comment={comment}
                                        {...props}
                                    />
                                ) : null}
                            </Flex>
                            <CommentContent comment={comment} {...props} />
                        </Stack>
                        <CommentBottomBar comment={comment} {...props} />
                    </Stack>
                </HStack>
            ) : (
                <CommentForm parentId={props.parentId} comment={comment} onCancel={onCancelEdit} />
            )}
        </>
    )
}

export default React.memo(CommentExcerpt)
