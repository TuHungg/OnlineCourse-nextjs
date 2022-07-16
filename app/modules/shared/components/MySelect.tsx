import {
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Select,
    Text,
} from '@chakra-ui/react'
import React from 'react'
import { IMyInput } from '../interfaces/my-input.interface'
import { ISelectItem } from '../interfaces/select-data.interface'
import MyFormLabel from './MyFormLabel'

export interface MySelectProps extends IMyInput {
    options?: ISelectItem<string | number>[]
}
export default function MySelect({
    field,
    label,
    placeholder,
    required,
    register,
    helperText,
    error,
    options,
    showLabelRow = true,
}: MySelectProps) {
    const optionsHtml = options?.map((item) => {
        return (
            <option key={item.value} value={item.value}>
                {item.label}
            </option>
        )
    })
    placeholder = placeholder ? placeholder : !showLabelRow ? label : placeholder
    return (
        <FormControl isInvalid={!!error}>
            {showLabelRow ? (
                <MyFormLabel field={field} required={required}>
                    {label}
                </MyFormLabel>
            ) : null}
            <Select placeholder={placeholder} {...register(field)}>
                {optionsHtml}
            </Select>
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
            {error?.message && (
                <FormErrorMessage>
                    {label} {error.message}
                </FormErrorMessage>
            )}
        </FormControl>
    )
}
