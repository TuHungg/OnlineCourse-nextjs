import { Stack } from '@chakra-ui/react'
import React, { useCallback } from 'react'
import { Control, Controller, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MyFormLabel from './MyFormLabel';


export interface MyDatePickerProps {
    field: string
    label?: string
    required?: boolean
    control: Control<any>
    showTimeSelect?: boolean
}
export default function MyDatePicker({ field, label, required, control, showTimeSelect }: MyDatePickerProps) {
    return (
        <Stack spacing={0}>
            {label && <MyFormLabel>{label}</MyFormLabel>}
            <Controller
                name={field}
                control={control}
                render={({ field }) => {
                    return (
                        <DatePicker selected={field.value} onChange={field.onChange} showTimeSelect={showTimeSelect} />
                    )
                }}
            />
        </Stack>
    )
}
