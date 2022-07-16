import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react'
import React from 'react'

export default function NoCoursesMessage() {
    return (
        <Alert status="info">
            <AlertTitle>You do not have any course yet!</AlertTitle>
        </Alert>
    )
}
