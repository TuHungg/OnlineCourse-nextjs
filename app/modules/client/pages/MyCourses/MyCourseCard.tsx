import { Box, BoxProps, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

export default function MyCourseCard({ children, ...props }: BoxProps) {
    const bgColor = useColorModeValue('unset', 'gray.700')
    return (
        <Box bgColor={bgColor} shadow="lg" pos="relative" height="full" {...props}>
            {children}
        </Box>
    )
}
