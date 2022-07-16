import {
    FormControl,
    FormErrorMessage,
    FormHelperText,
    InputGroup,
    InputRightElement,
    Text,
    Textarea,
} from '@chakra-ui/react'
import React from 'react'
import { useSubtitleColor } from '../hooks/style.hook'
import { IMyInput } from '../interfaces/my-input.interface'
import MyFormLabel from './MyFormLabel'

export interface IMyTextArea extends IMyInput {
    rows?: number
}
export default function MyTextArea({
    rows,
    watch,
    maxLength,
    field,
    label,
    placeholder,
    required,
    register,
    helperText,
    error,
    onChange,
    autoFocus,
    tabIndex,
    showLabelRow = true,
    size = 'md',
}: IMyTextArea) {
    const subColor = useSubtitleColor()
    const value = watch ? watch(field) : undefined
    return (
        <FormControl isInvalid={!!error}>
            {!!showLabelRow ? (
                <MyFormLabel field={field} required={required}>
                    {label}
                </MyFormLabel>
            ) : null}
            <InputGroup>
                <Textarea
                    rows={rows}
                    size={size}
                    id={field}
                    //@ts-ignore
                    placeholder={placeholder}
                    spellCheck={false}
                    autoFocus={autoFocus}
                    tabIndex={tabIndex}
                    maxLength={maxLength}
                    {...register(field)}
                    pr={maxLength ? '70px' : undefined}
                    // onChange={changeHandler}
                />
                {maxLength && (
                    <InputRightElement>
                        <Text mr="10" color={subColor}>
                            {maxLength - (value?.length || 0)}
                        </Text>
                    </InputRightElement>
                )}
            </InputGroup>
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
            {error?.message && (
                <FormErrorMessage>
                    {label} {error.message}
                </FormErrorMessage>
            )}
        </FormControl>
    )
}
