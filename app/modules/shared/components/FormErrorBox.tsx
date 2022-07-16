import { Text, Alert, AlertIcon, Stack, AlertTitle } from '@chakra-ui/react';
import React from 'react'

export interface FormErrorBoxProps {
    errors: {
        [key: string]: {
            message: string,
            type?: string
        }
    }
}
export default function FormErrorBox(props: FormErrorBoxProps) {
    const formErrorsArr = Object.values(props.errors);
    const formErrorHtml = formErrorsArr.map((item, i) => {
        return <Text key={i}>{item.message}</Text>
    })
    return (
        <Alert status='error'>
            <Stack px={4}>
                {formErrorHtml}
            </Stack>
        </Alert>

    )
}
