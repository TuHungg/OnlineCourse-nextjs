import { SelectProps } from '@chakra-ui/react'
import { OptionsOrGroups, Select } from 'chakra-react-select'
import React from 'react'

export interface SelectOption {
    value: string,
    label: string
}

export interface MultiSelectProps {
    id: string
    options?: SelectOption[]
    value?: SelectOption[]
    [key: string]: any

}

export default function MultiSelect({ id, options, value, ...props }: MultiSelectProps) {
    // const transform = (item: SelectOption) => {
    //     return {
    //         value: item.key,
    //         label: item.value
    //     }
    // }
    return (
        <Select
            isMulti
            instanceId={id}
            options={options}
            closeMenuOnSelect={false}
            selectedOptionStyle="check"
            hideSelectedOptions={false}
            value={value}
            {...props}
        />
    )
}
