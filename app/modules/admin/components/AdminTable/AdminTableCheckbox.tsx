import { Checkbox, CheckboxProps } from '@chakra-ui/react'
import React from 'react'

export interface AdminTableCheckbox extends CheckboxProps {

}
export default function AdminTableCheckbox({ children, ...props }: AdminTableCheckbox) {
    return (
        <Checkbox {...props}>{children}</Checkbox>
    )
}
