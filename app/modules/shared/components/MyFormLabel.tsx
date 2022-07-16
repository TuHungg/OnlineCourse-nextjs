import { Text, FormLabel } from '@chakra-ui/react'
import React from 'react'

export interface MyFormLabelProps {
    field?: string
    required?: boolean
    children?: string
}

export default function MyFormLabel(props: MyFormLabelProps) {
    return (
        <FormLabel htmlFor={props.field} >
            <Text as='span' >{props.children}</Text>
            {props.required && <Text ml={2} as='span' color='red'>*</Text>}
        </FormLabel>
    )
}
