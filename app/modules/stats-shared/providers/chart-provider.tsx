import moment from 'moment'
import React, {
    createContext,
    MutableRefObject,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react'
import { IStat } from '../../shared/interfaces/stat.interface'

type TTimeUnit = 'd' | 'M' | 'all'
const timeUnits: string[] = ['d', 'M', 'all']
export interface IDateRange {
    value: number
    timeUnit: TTimeUnit
}
interface IMyChartProvider {
    state: {
        labels: string[]
        dateRange: IDateRange
        chartRef: MutableRefObject<any>
    }
    methods: {
        setDateRange: (val: IDateRange) => void
        standardizedDatasetData: (stats: IStat[]) => any[]
    }
}
const MyChartContext = createContext<IMyChartProvider>({} as IMyChartProvider)

export const useMyChart = () => {
    return useContext(MyChartContext)
}

export function MyChartProvider({ children }: { children: ReactNode }) {
    const [dateRange, setDateRange] = useState<IDateRange>({ value: 12, timeUnit: 'M' })
    const [labels, setLabels] = useState<string[]>([])
    const chartRef = useRef(null)

    // const router = useRouter()
    // const { _dateRange = dateRange.value, _dateRangeUnit = dateRange.timeUnit } = router.query

    // useEffect(() => {
    //     if (typeof _dateRange == 'string' && _dateRangeUnit == 'string') {
    //         const urlDateRange = Number.parseInt(_dateRange)
    //         if (Number.isInteger(urlDateRange) && timeUnits.includes(_dateRangeUnit))
    //             setDateRange((_) => ({
    //                 value: urlDateRange,
    //                 timeUnit: _dateRangeUnit as TTimeUnit,
    //             }))
    //     }
    // }, [_dateRange, _dateRangeUnit])
    const standardizedDatasetData = useCallback(
        (stats: IStat[]) => {
            let data: any[]
            const statObj: Record<string, any> = {}
            stats.forEach((item) => {
                statObj[item.date] = item.value
            })
            let iterateDate = new Date()
            iterateDate.setHours(0)
            iterateDate.setSeconds(0)
            iterateDate.setMilliseconds(0)
            switch (dateRange.timeUnit) {
                case 'd':
                    iterateDate.setDate(iterateDate.getDate() - dateRange.value + 1)
                    data = labels.map((_) => {
                        const key = moment(iterateDate).format('YYYY-MM-DD')
                        let value = statObj[key] ? statObj[key] : 0
                        iterateDate.setDate(iterateDate.getDate() + 1)
                        return value
                    })
                    return data
                case 'M':
                    iterateDate.setMonth(iterateDate.getMonth() - dateRange.value + 1)
                    iterateDate.setDate(1)
                    data = labels.map((_) => {
                        const key = moment(iterateDate).format('YYYY-MM')
                        let value = statObj[key] ? statObj[key] : 0
                        iterateDate.setMonth(iterateDate.getMonth() + 1)
                        return value
                    })
                    return data
                default:
                    return labels.map((item) => undefined)
            }
        },
        [dateRange.timeUnit, dateRange.value, labels]
    )

    useEffect(() => {
        let labels: any[]
        let iterateDate = new Date()
        switch (dateRange.timeUnit) {
            case 'd':
                iterateDate.setDate(iterateDate.getDate() - dateRange.value + 1)
                labels = [...Array(dateRange.value)].map((_) => {
                    const label = moment(iterateDate).format('MMM D')
                    iterateDate.setDate(iterateDate.getDate() + 1)
                    return label
                })
                setLabels(labels)
                break
            case 'M':
                iterateDate.setMonth(iterateDate.getMonth() - dateRange.value + 1)
                iterateDate.setDate(1)
                labels = [...Array(dateRange.value)].map((_) => {
                    const label = moment(iterateDate).format('MMM')
                    iterateDate.setMonth(iterateDate.getMonth() + 1)
                    return label
                })
                setLabels(labels)
                break
        }
    }, [dateRange])
    //
    const state: IMyChartProvider = useMemo(
        () => ({
            state: {
                labels,
                dateRange,
                chartRef,
            },
            methods: {
                setDateRange,
                standardizedDatasetData,
            },
        }),
        [dateRange, labels, standardizedDatasetData]
    )
    return <MyChartContext.Provider value={state}>{children}</MyChartContext.Provider>
}
