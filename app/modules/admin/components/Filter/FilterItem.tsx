import { FormControl, FormLabel } from '@chakra-ui/react'
import React from 'react'
import MultiSelect, { SelectOption } from '../../../shared/components/MultiSelect'
import { ISelectItem } from '../../../shared/interfaces/select-data.interface'

export interface FilterItemProps {
    label: string
    field: string
    options?: ISelectItem<string>[]
    selectedValues?: string[]
    onChange?: (e: any) => void
}

export default function FilterItem({
    field,
    label,
    options,
    selectedValues,
    onChange,
}: FilterItemProps) {
    const placeholder = `Select ${label}`
    const selectedOptions: SelectOption[] = []
    options?.forEach((option) => {
        if (selectedValues?.includes(option.value)) {
            selectedOptions.push(option)
        }
    })
    return (
        <FormControl>
            <FormLabel htmlFor={field}>{label}</FormLabel>
            <MultiSelect
                id={field}
                onChange={onChange}
                options={options}
                placeholder={placeholder}
                name={field}
                value={selectedOptions}
            />
        </FormControl>
    )
}
