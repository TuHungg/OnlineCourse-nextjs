import { FormControl, FormLabel, Select } from '@chakra-ui/react'
import React, { ChangeEventHandler, useCallback } from 'react'
import { IDateRange, useMyChart } from '../../../../stats-shared/providers/chart-provider'

type TOption = { label: string; value: string }
const optionData: TOption[] = [
    {
        label: 'Last 7 days',
        value: JSON.stringify({
            value: 7,
            timeUnit: 'd',
        }),
    },
    {
        label: 'Last 30 days',
        value: JSON.stringify({
            value: 30,
            timeUnit: 'd',
        }),
    },
    {
        label: 'Last 12 months',
        value: JSON.stringify({
            value: 12,
            timeUnit: 'M',
        }),
    },
]

export default function DateRangeFilter() {
    const {
        state: { dateRange },
        methods: { setDateRange },
    } = useMyChart()
    //
    const onChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
        if (e.target.value) {
            const value = JSON.parse(e.target.value) as IDateRange
            setDateRange(value)
        }
    }

    const renderOption = useCallback((item: TOption, i: number) => {
        return (
            <option key={i} value={item.value}>
                {item.label}
            </option>
        )
    }, [])
    return (
        <FormControl w="fit-content" display={'flex'} alignItems="center">
            <FormLabel whiteSpace={'nowrap'} htmlFor="dateRange">
                Date range
            </FormLabel>
            <Select
                id="dateRange"
                w="fit-content"
                onChange={onChange}
                value={JSON.stringify(dateRange)}
            >
                {optionData?.map(renderOption)}
            </Select>
        </FormControl>
    )
}
