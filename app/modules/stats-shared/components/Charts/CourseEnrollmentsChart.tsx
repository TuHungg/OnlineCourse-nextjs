import { Stack, useTheme } from '@chakra-ui/react'
import React from 'react'
import { MyLineChart } from '../../../instructor/components/MyLineChart'

export interface CourseEnrollmentsChartProps {
    labels: any[]
    data: any[]
}
export default function CourseEnrollmentsChart(props: CourseEnrollmentsChartProps) {
    const theme = useTheme()
    const color = theme.colors.blue
    return (
        <Stack>
            <MyLineChart
                title="Enrollments Statistic"
                labels={props.labels}
                datasets={[
                    {
                        label: 'Enrollments',
                        borderColor: color[500],
                        backgroundColor: color[100],
                        data: props.data,
                    },
                ]}
            />
        </Stack>
    )
}
