import { Text, HStack, Stack, StackProps, useColorModeValue } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import { useCurriculumFormBg } from '../../shared/hooks/style.hook'

export interface CurriculumFormWrapperProps extends StackProps {
    label: ReactNode,
    children: ReactNode
}

export default function CurriculumFormWrapper({ label, children, ...props }: CurriculumFormWrapperProps) {
    const bgColor = useCurriculumFormBg();
    return (
        <HStack align='start' bgColor={bgColor} p={4} border='1px solid black' {...props}>
            <Text as='strong' mt={2}>{label}</Text>
            <Stack flex={1}>
                {children}
            </Stack>
        </HStack>
    )
}
