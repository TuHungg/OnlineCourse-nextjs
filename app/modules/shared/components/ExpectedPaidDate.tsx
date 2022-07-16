import { Text } from '@chakra-ui/react'
import moment from 'moment'
import React from 'react'
import DateHelper from '../../../utils/helpers/date.helper'

export interface ExpectedPaidDateProps {
    dateStr?: string
    paid?: boolean
}
export default function ExpectedPaidDate({ paid = false, ...props }: ExpectedPaidDateProps) {
    if (!props.dateStr) return <></>
    const date = paid
        ? new Date(props.dateStr)
        : DateHelper.getExpectedPaidDate(new Date(props.dateStr))
    return <Text>{moment(date).format('MMM DD, YYYY')}</Text>
}
