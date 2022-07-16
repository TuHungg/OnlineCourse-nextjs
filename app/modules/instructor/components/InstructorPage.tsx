import { Box, Heading, HStack, Stack, StackDivider, StackProps } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import { useBorderColor } from '../../shared/hooks/style.hook'

export interface InstructorPageProps extends StackProps {
    title: string
    actionLeft?: ReactNode
    actionRight?: ReactNode
}
export default function InstructorPage({
    title,
    children,
    actionLeft,
    actionRight,
    ...props
}: InstructorPageProps) {
    const borderColor = useBorderColor()
    return (
        <Stack divider={<StackDivider color={borderColor} />} spacing={5} {...props}>
            <HStack spacing={[2, 4, 8]} justify="space-between">
                <HStack justify={{ base: 'space-between', md: 'unset' }} flex={1} spacing={8}>
                    {actionLeft}
                    <Heading fontSize={['2xl', '2xl', '4xl']}>{title}</Heading>
                </HStack>
                {actionRight}
            </HStack>
            <Box>{children}</Box>
        </Stack>
    )
}
