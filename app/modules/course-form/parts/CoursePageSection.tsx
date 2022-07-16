import { Stack, Box, Heading, Divider, StackProps, HStack } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

export interface CoursePageSectionProps extends StackProps {
    title: string
    titleRight?: ReactNode
    children: ReactNode
}

function CoursePageSection({ title, titleRight, children, ...props }: CoursePageSectionProps) {
    return (
        <Stack spacing={4} {...props}>

            <HStack p={{
                base: 2,
                lg: 5
            }} justify='space-between'>
                <Heading fontSize={'2xl'}>{title}</Heading>
                {titleRight}
            </HStack>
            <Divider />
            <Stack spacing={5} p={{
                base: 2,
                lg: 5
            }}>
                {children}
            </Stack>
        </Stack>
    )
}

export default React.memo(CoursePageSection);