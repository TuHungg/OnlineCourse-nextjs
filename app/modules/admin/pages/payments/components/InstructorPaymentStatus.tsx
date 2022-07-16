import { Badge } from '@chakra-ui/react'
import React from 'react'

export interface InstructorPaymentStatusProps {
    numPending: number
}
export default function InstructorPaymentStatus(props: InstructorPaymentStatusProps) {
    let color = 'blue'
    let label = 'No pending'
    if (props.numPending > 0) {
        color = 'yellow'
        label = `${props.numPending} pending`
    }

    return <Badge colorScheme={color}>{label}</Badge>
}
