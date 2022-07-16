import { Heading, Skeleton, Stack, Text } from '@chakra-ui/react'
import { ReactNode } from 'react'

export interface StatTabContentProps {
    title: string
    isLoading: boolean
    mainContent: ReactNode
    subContent: ReactNode
}
export const StatTabContent = (props: StatTabContentProps) => {
    return (
        <Skeleton isLoaded={!props.isLoading} minW="130px" h="100%">
            <Stack align="start" spacing={1}>
                <Text fontSize={'xs'}>{props.title}</Text>
                <Heading fontSize={['md', 'lg', '2xl', '3xl']} fontWeight="light">
                    {props.mainContent}
                </Heading>
                <Text fontSize={'xs'}>
                    {props.subContent}
                    <Text as="span"> this month</Text>
                </Text>
            </Stack>
        </Skeleton>
    )
}
