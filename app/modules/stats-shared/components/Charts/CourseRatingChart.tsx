import { Skeleton, useTheme } from '@chakra-ui/react'
import React from 'react'
import { Pie } from 'react-chartjs-2'
import { IRatingStat } from '../../../shared/interfaces/rating-stat.interface'

export interface CourseRatingChartProps {
    isLoading: boolean
    total?: number
    data?: IRatingStat[]
}
export default function CourseRatingChart(props: CourseRatingChartProps) {
    const themeColors = useTheme().colors
    //
    const ratingData = [...Array(5)].map((_, i) => {
        const stat = props.data?.find((item) => item.rating == 5 - i)
        if (stat) return stat.count
        return 0
    })
    const data = {
        labels: ['5 stars', '4 stars', '3 stars', '2 stars', '1 star'],
        datasets: [
            {
                datalabels: {},
                label: '# of Votes',
                data: ratingData,
                backgroundColor: [
                    themeColors.green[100],
                    themeColors.blue[100],
                    themeColors.purple[100],
                    themeColors.orange[100],
                    themeColors.red[100],
                ],
                borderColor: [
                    themeColors.green[500],
                    themeColors.blue[500],
                    themeColors.purple[500],
                    themeColors.orange[500],
                    themeColors.red[500],
                ],
                borderWidth: 1,
            },
        ],
    }
    let chartTitle = 'Ratings Statistic'
    if (typeof props.total != 'undefined') chartTitle += ` (${props.total} ratings)`
    return (
        <Skeleton isLoaded={!props.isLoading} height="350px">
            <Pie
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'bottom' as const,
                        },
                        title: {
                            display: true,
                            text: chartTitle,
                        },
                        datalabels: {
                            display: true,
                            formatter: (value) => {
                                if (props.total != undefined && props.total > 0) {
                                    const percent = Number.parseFloat(
                                        ((value / props.total) * 100).toFixed(1)
                                    )

                                    return `${percent}%`
                                }
                                return value
                            },
                        },
                    },
                }}
                data={data}
                style={{ maxHeight: '350px' }}
            />
        </Skeleton>
    )
}
