import { Tr, Td, Alert, AlertIcon } from '@chakra-ui/react'
import React from 'react'
import lan from '../../../utils/constants/lan.constant'
import ErrorMessage from './ErrorMessage'

export default function EmptyMessageTr() {
    return (
        <Tr>
            <Td colSpan={1000}>
                <ErrorMessage />
            </Td>
        </Tr>
    )
}
