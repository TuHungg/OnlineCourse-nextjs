import { Tr, Td, Alert, AlertIcon } from '@chakra-ui/react'
import React from 'react'
import lan from '../../../utils/constants/lan.constant'

export default function ErrorMessage() {
    return (
        <Alert status='error' textAlign={'center'}>
            <AlertIcon />{lan.SOMETHING_WENT_WRONG}
        </Alert>
    )
}
