import { Container, Heading, Stack, StackDivider, useColorModeValue } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import { useBorderColor } from '../../shared/hooks/style.hook'

export interface AuthBoxProps {
    title: string
    children: ReactNode
}
export default function AuthBox(props: AuthBoxProps) {
    const borderColor = useBorderColor()
    const border = useColorModeValue('none', '2px solid')
    return (
        <Container
            border={border}
            borderColor={borderColor}
            mx="auto"
            mt={4}
            maxW={'400px'}
            shadow="lg"
            p={{ base: undefined, md: 4, lg: 8 }}
            py={4}
        >
            <Stack spacing={{ base: 5, md: 10 }} divider={<StackDivider color={borderColor} />}>
                <Heading px={{ base: undefined, md: 4 }} fontSize={'md'}>
                    {props.title}
                </Heading>
                <Stack px={{ base: undefined, md: 4 }}>{props.children}</Stack>
            </Stack>
        </Container>
    )
}
