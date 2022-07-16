import { Tr, Td, Alert, AlertIcon } from '@chakra-ui/react'
import React from 'react'

export default function EmptyMessageTr({ message = 'No data' }: { message?: string }) {
    return (
        <Tr>
            <Td colSpan={1000}>
                <Alert status="info" textAlign={'center'}>
                    <AlertIcon />
                    {message}
                </Alert>
            </Td>
        </Tr>
    )
}
