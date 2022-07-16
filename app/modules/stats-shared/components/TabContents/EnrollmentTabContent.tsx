import React from 'react'
import NumberFormat from 'react-number-format'
import { StatTabContent } from './StatTab'

export interface EnrollmentTabContentProps {
    isLoading: boolean
    total?: number
    totalThisMonth?: number
}
export default function EnrollmentTabContent(props: EnrollmentTabContentProps) {
    return (
        <StatTabContent
            title="Total enrollments"
            isLoading={props.isLoading}
            mainContent={<NumberFormat displayType="text" value={props.total} thousandSeparator />}
            subContent={
                <NumberFormat displayType="text" value={props.totalThisMonth} thousandSeparator />
            }
        />
    )
}
