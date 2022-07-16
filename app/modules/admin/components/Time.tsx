import { HStack, Icon, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { FiClock } from 'react-icons/fi'
import DateHelper from '../../../utils/helpers/date.helper'

export type TTimeType = 'short' | 'long'

export interface TimeProps {
    timestamp?: string
    showIcon?: boolean
    type?: TTimeType
}
export default function Time({ showIcon = true, timestamp, type = 'short' }: TimeProps) {
    if (!timestamp) return <></>
    const date = new Date(timestamp)
    const dateText = type == 'short' ? DateHelper.getShortDate(date) : DateHelper.getLongDate(date)
    if (!showIcon) return <Text>{dateText}</Text>
    return (
        <HStack spacing={2} title={DateHelper.getLongDate(date)}>
            {showIcon && <Icon as={FiClock} />}
            <Text>{dateText}</Text>
        </HStack>
    )
}
