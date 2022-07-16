import { Box, BoxProps, Text, TextProps, useColorModeValue } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import { useSubtitleColor } from '../hooks/style.hook'


export default function Subtitle({ children, ...props }: TextProps) {
    const color = useSubtitleColor()
    return (
        <Text sx={{ mt: '0 !important' }} color={color} {...props} >{children}</Text>
    )
}
