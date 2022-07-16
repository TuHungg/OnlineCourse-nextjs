import { Text, HStack, Heading } from '@chakra-ui/react'
import React from 'react'

export default function InstructorFeatureNumber(props: { value?: number; label: string }) {
    return (
        <HStack align="end">
            <HStack align="end">
                <Heading as="span" fontSize={'4xl'}>
                    {props.value}
                </Heading>
            </HStack>
            <Text pb={1} fontSize={'xl'}>
                {props.label}
            </Text>
        </HStack>
    )
}
