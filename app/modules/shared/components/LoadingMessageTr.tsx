import { Tr, Td } from '@chakra-ui/react'
import React from 'react'
import MyCircularProgress from './MyCircularProgress'

export default function LoadingMessageTr() {
    return (
        <Tr>
            <Td colSpan={1000} textAlign='center'>
                <MyCircularProgress />
            </Td>
        </Tr>
    )
}
