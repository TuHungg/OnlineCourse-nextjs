import { Stack, useTheme } from '@chakra-ui/react'
import React from 'react'
import { MyLineChart } from '../../../instructor/components/MyLineChart'
import { useMyChart } from '../../providers/chart-provider'

export interface RevenueChartProps {
    labels: any[]
    data: any[]
}
export default function RevenueChart(props: RevenueChartProps) {
    const theme = useTheme()
    const color = theme.colors.blue
    return (
        <Stack>
            <MyLineChart
                title="Revenue Statistic"
                labels={props.labels}
                datasets={[
                    {
                        label: 'Revenue',
                        borderColor: color[500],
                        backgroundColor: color[100],
                        data: props.data,
                    },
                ]}
            />
        </Stack>
    )
}
