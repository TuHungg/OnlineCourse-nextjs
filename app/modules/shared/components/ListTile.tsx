import { Avatar, BoxProps, Heading, HStack, Stack } from '@chakra-ui/react'
import React from 'react'
import { TSize } from '../types/size.type'
import Subtitle from './Subtitle'

export interface ListTileProps extends BoxProps {
    alt: string
    thumb: string
    thumbSize?: TSize
    title?: string
    subtitle?: string
}
export default function ListTile({ alt, thumb, title, subtitle, thumbSize = 'sm' }: ListTileProps) {
    return (
        <HStack spacing={thumbSize == 'xs' ? 0 : 2}>
            <Avatar ignoreFallback src={thumb} size={thumbSize}>
                {' '}
            </Avatar>
            <Stack flexDir={'column'} flex={1} pl={1}>
                <Heading fontSize={'sm'}>{title}</Heading>
                {subtitle && <Subtitle fontSize={'sm'}>{subtitle}</Subtitle>}
            </Stack>
        </HStack>
    )
}
