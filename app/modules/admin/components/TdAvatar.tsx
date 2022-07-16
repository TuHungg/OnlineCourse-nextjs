import { Avatar, BoxProps, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { TSize } from '../../shared/types/size.type'
import AdminHighlightSearchText from './AdminHighlightSearchText'

export interface TdAvatarProps extends BoxProps {
    alt: string
    thumb?: string
    field?: string
    title: string
    subtitle?: string
    searchFields?: string[]
    thumbSize?: TSize
}
export default function TdAvatar({
    alt,
    thumb,
    title,
    subtitle,
    thumbSize = 'sm',
    searchFields,
}: TdAvatarProps) {
    return (
        <HStack>
            <Avatar ignoreFallback src={thumb} name={alt} size={thumbSize} />
            <Stack flexDir={'column'} flex={1} pl={1} w="fit-content" minW={'100px'}>
                <Heading fontSize={'sm'}>
                    <AdminHighlightSearchText fields={searchFields || []} value={title} />
                </Heading>
                <Text fontSize={'sm'}>
                    <AdminHighlightSearchText fields={searchFields || []} value={subtitle} />
                </Text>
            </Stack>
        </HStack>
    )
}
