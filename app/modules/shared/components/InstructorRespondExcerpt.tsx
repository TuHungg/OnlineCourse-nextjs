import { Avatar, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import DateHelper from '../../../utils/helpers/date.helper'
import UserHelper from '../../../utils/helpers/model-helpers/user.helper.'
import { useSubtitleColor } from '../hooks/style.hook'
import { IReviewResponse } from '../interfaces/models/review.interface'

const Time = (props: InstructorRespondExcerptProps) => {
    const subColor = useSubtitleColor()
    const timeDiffText =
        DateHelper.getTimeDiffStringFromNow(new Date(props.item.timestamp)) || '...'
    return (
        <Text color={subColor} fontSize="sm">
            Posted {timeDiffText} ago
        </Text>
    )
}

export interface InstructorRespondExcerptProps {
    item: IReviewResponse
}
export const InstructorRespondExcerpt = (props: InstructorRespondExcerptProps) => {
    return (
        <HStack align={'start'} spacing={{ base: 0, sm: 4 }}>
            <Avatar
                display={['none', 'inline-block']}
                name={props.item.user.profile.fullName}
                src={props.item.user.profile.avatar || ''}
                size="md"
            />
            <Stack flex={1}>
                <HStack>
                    <Heading size="sm">Instructor</Heading>
                    <Time {...props} />
                </HStack>
                <Text fontSize={'sm'}>{props.item.content}</Text>
            </Stack>
        </HStack>
    )
}
