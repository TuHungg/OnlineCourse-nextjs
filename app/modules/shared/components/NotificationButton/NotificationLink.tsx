import { Box } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import PathHelper from '../../../../utils/helpers/path.helper'
import NextLink from '../NextLink'
import { NotificationItemProps } from './NotificationItem'

export const NotificationLink = ({
    children,
    ...props
}: NotificationItemProps & { children: ReactNode }) => {
    let link = ''
    switch (props.item.sourceType) {
        case 'new-activity':
            link = PathHelper.getActivityLogsPath()
            break
        case 'new-comment':
            link = PathHelper.getLearnCoursePath(props.item.sourceSlug!, {
                commentId: props.item.sourceId,
            })
            break
        case 'course-approval':
            link = PathHelper.getInstructorPath('courses')
            break
        case 'payment-paid':
            link = PathHelper.getInstructorRevenueReportPath()
            break
        case 'new-enrollment':
            link = PathHelper.getInstructorStudentsPath(props.item.contextId)
            break
    }
    if (!link) return <Box cursor={'default'}>{children}</Box>
    return <NextLink href={link}>{children}</NextLink>
}
