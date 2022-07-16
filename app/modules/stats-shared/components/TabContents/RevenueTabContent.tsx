import React from 'react'
import Price from '../../../shared/components/Price'
import { StatTabContent } from './StatTab'

export interface RevenueTabContentProps {
    isLoading: boolean
    total?: number
    totalThisMonth?: number
}
export default function RevenueTabContent(props: RevenueTabContentProps) {
    return (
        <StatTabContent
            title="Total revenue"
            isLoading={props.isLoading}
            mainContent={<Price value={props.total || 0} />}
            subContent={<Price value={props.totalThisMonth || 0} />}
        />
    )
}
