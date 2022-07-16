import { Box, BoxProps, useColorModeValue } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

export interface CardProps extends BoxProps {
    children: ReactNode
}

export default function Card({ children, ...props }: CardProps) {
    const bgColor = useColorModeValue('white', 'gray.700')
    return (
        <Box
            bgColor={bgColor}
            shadow={'md'}
            borderRadius={10}
            transitionProperty="background-color"
            transitionDuration={'normal'}
            p={[4, 4, 8]}
            {...props}
        >
            {children}
        </Box>
    )
}
