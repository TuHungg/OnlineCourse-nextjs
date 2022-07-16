import { Text } from '@chakra-ui/react'
import React from 'react'
import { StatTabContent } from './StatTab'

export interface CourseRatingTabContentProps {
    isLoading: boolean
    total?: number
    totalThisMonth?: number
}
export default function CourseRatingTabContent(props: CourseRatingTabContentProps) {
    return (
        <StatTabContent
            title="Course rating"
            isLoading={props.isLoading}
            mainContent={<Text>{(props.total || 0).toFixed(1)}</Text>}
            subContent={<Text as="span">{props.totalThisMonth} ratings</Text>}
        />
    )
}
