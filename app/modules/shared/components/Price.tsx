import React from 'react'
import NumberFormat from 'react-number-format'
import { TCourseCurrency } from '../interfaces/models/course.interface'

export interface PriceProps {
    value?: number
    currency?: TCourseCurrency
    style?: any
}
function Price({ style, value, currency = 'vnd' }: PriceProps) {
    if (typeof value == 'undefined') return <></>
    if (currency == 'vnd') value = Math.floor(value)
    return (
        <NumberFormat style={style} displayType="text" value={value} thousandSeparator suffix="đ" />
    )
}

export default React.memo(Price)
