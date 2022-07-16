import { Button, HStack, Stack } from '@chakra-ui/react'
import React from 'react'
import lan from '../../../../../utils/constants/lan.constant'
import NotifyHelper from '../../../../../utils/helpers/notify.helper'
import { useSimpleDialog } from '../../../../admin/providers/simple-dialog.provider'
import { useAppToast } from '../../../../shared/hooks/app-toast.hook'
import { useInstructorCourseReview } from '../../../providers/instructor-course-review.provider'
import { useDeleteReviewResponse } from '../../../queries/instructor-course-reviews-query'

const Actions = () => {
    const simpleDialog = useSimpleDialog()
    const toast = useAppToast()
    const {
        state: { review },
        methods: { setWritingResponse: setWritingRespond },
    } = useInstructorCourseReview()
    const { mutate: deleteResponse } = useDeleteReviewResponse()
    //
    const onWritingResponse = () => {
        setWritingRespond(true)
    }
    const onDeleteResponse = () => {
        simpleDialog.onShow({
            title: `Delete your response?`,
            content: lan.DELETE_WARNING,
            onPositive: async () => {
                deleteResponse(review._id, {
                    onSuccess: () => {
                        toast(NotifyHelper.success('Response deleted'))
                    },
                })
            },
        })
    }
    if (!review.response?.content)
        return (
            <HStack>
                <Button
                    onClick={onWritingResponse}
                    variant={'outline'}
                    colorScheme="purple"
                    size="sm"
                >
                    Respond
                </Button>
            </HStack>
        )
    return (
        <HStack>
            <Button onClick={onWritingResponse} variant={'outline'} colorScheme="purple" size="sm">
                Edit response
            </Button>
            <Button onClick={onDeleteResponse} variant={'outline'} colorScheme="red" size="sm">
                Delete response
            </Button>
        </HStack>
    )
}

export const InstructorCourseReviewExcerptBottomBar = () => {
    return (
        <Stack>
            <Actions />
        </Stack>
    )
}
