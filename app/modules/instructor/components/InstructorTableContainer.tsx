import { HStack, Alert, AlertIcon, TableContainer } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import MyCircularProgress from '../../shared/components/MyCircularProgress'

export default function InstructorTableContainer({
    isLoading,
    length,
    children,
}: {
    isLoading: boolean
    length?: number
    children: ReactNode
}) {
    if (isLoading)
        return (
            <HStack justify={'center'}>
                <MyCircularProgress />
            </HStack>
        )
    if ((length || 0) == 0)
        return (
            <Alert status="info" textAlign={'center'}>
                <AlertIcon />
                No data
            </Alert>
        )
    return <TableContainer>{children}</TableContainer>
}
