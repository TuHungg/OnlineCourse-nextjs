import { ChangeHandler, UseFormRegister, UseFormWatch } from 'react-hook-form'
import { TSize } from './../types/size.type'

export interface IMyInput {
    isDisabled?: boolean
    field: string
    value?: string
    label?: string
    register: UseFormRegister<any>
    maxLength?: number
    max?: number
    min?: number
    type?: 'email' | 'text' | 'password' | 'file' | 'number'
    helperText?: string
    error?: any
    placeholder?: string
    required?: boolean
    autoFocus?: boolean
    tabIndex?: number
    showLabelRow?: boolean
    onChange?: ChangeHandler
    accept?: string
    size?: TSize
    watch?: UseFormWatch<any>
}
