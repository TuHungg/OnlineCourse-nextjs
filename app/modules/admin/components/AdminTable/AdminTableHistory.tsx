import { HStack, VStack } from '@chakra-ui/react'
import React from 'react'
import Time from '../Time'

export interface AdminTableHistoryProps {
    name: string
    timestamp: string
    type: ''
}

export default function AdminTableHistory({ name, timestamp }: AdminTableHistoryProps) {
    return (
        <VStack align='stretch'>
            <Time timestamp={name} />
        </VStack>
    )
}
