import { Text, Box, Heading, HStack, Icon, Stack, StackDivider, Skeleton } from '@chakra-ui/react'
import React, { ReactNode, useCallback } from 'react'
import { IconType } from 'react-icons'
import Card from '../../../../shared/components/Card'
import {
    useBorderColor,
    useMutedColor,
    useSubtitleColor,
} from '../../../../shared/hooks/style.hook'

type TItem = {
    icon: IconType
    label: string
    content: ReactNode
}

export interface OrderCardProps {
    isLoading: boolean
    title: string
    data: TItem[]
}
export default function OrderCard({ data, title, ...props }: OrderCardProps) {
    const mutedColor = useMutedColor()
    const borderColor = useBorderColor()
    const renderContent = useCallback(
        (item: TItem, i) => {
            return (
                <HStack justify={'space-between'} color={mutedColor}>
                    <HStack>
                        <Icon fontSize={'xl'} as={item.icon} />
                        <Text>{item.label}</Text>
                    </HStack>
                    <Box fontWeight={'bold'}>{item.content}</Box>
                </HStack>
            )
        },
        [mutedColor]
    )
    return (
        <Card h="full">
            <Skeleton isLoaded={!props.isLoading}>
                <Stack spacing={6}>
                    <Heading fontSize={'xl'}>{title}</Heading>
                    <Stack spacing={4} divider={<StackDivider color={borderColor} />}>
                        {data.map(renderContent)}
                    </Stack>
                </Stack>
            </Skeleton>
        </Card>
    )
}
