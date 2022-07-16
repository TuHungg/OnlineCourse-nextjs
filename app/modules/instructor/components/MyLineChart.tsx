import {
    ArcElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js'
import React from 'react'
import { Line } from 'react-chartjs-2'
import { useMyChart } from '../../stats-shared/providers/chart-provider'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
)

export interface IMyChartDataset {
    label: string
    data: any[]
    borderColor: any
    backgroundColor: any
}
export interface MyChartProps {
    precision?: number
    title: string
    labels: string[]
    datasets: IMyChartDataset[]
}
export function MyLineChart({ precision = 0, ...props }: MyChartProps) {
    const {
        state: { chartRef },
    } = useMyChart()
    //options
    let options = {
        scales: {
            yAxes: {
                ticks: {
                    precision: precision,
                },
            },
        },
        responsive: true,
        plugins: {
            legend: {
                display: false,
                // position: 'top' as const,
            },
            title: {
                display: true,
                text: props.title,
            },
            datalabels: {
                display: false,
            },
        },
    }
    //data
    const data = {
        labels: props.labels,
        datasets: props.datasets,
    }
    return (
        <Line
            ref={chartRef}
            options={options}
            data={data}
            width="100%"
            color="#fff"
            style={{ maxHeight: '350px' }}
        />
    )
}
