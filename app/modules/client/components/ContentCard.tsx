import { Stack, StackProps } from '@chakra-ui/react'
import React from 'react'
import { useBorderColor } from '../../shared/hooks/style.hook'
import SectionTitle from './SectionTitle'

export interface ContentCardProps extends StackProps {
    title?: string
}

export default function ContentCard({ children, ...props }: ContentCardProps) {
    const borderColor = useBorderColor()
    return (
        <Stack border="1px solid" borderColor={borderColor} p={4} spacing={5} {...props}>
            {props.title && <SectionTitle>{props.title}</SectionTitle>}
            {children}
        </Stack>
    )
}
