import { Heading, HeadingProps } from '@chakra-ui/react'
import React from 'react'

export interface SectionTitleProps extends HeadingProps {
    title?: string
}
export default function SectionTitle(props: SectionTitleProps) {
    return (
        <Heading fontSize="2xl">{props.children}</Heading>
    )
}
