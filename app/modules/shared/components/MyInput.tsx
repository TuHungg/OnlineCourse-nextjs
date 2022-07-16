import {
    FormControl,
    FormErrorMessage,
    FormHelperText,
    Input,
    InputGroup,
    InputRightElement,
    Text,
} from '@chakra-ui/react'
import React from 'react'
import { useSubtitleColor } from '../hooks/style.hook'
import { IMyInput } from '../interfaces/my-input.interface'
import PasswordInput from '../interfaces/PasswordInput'
import MyFormLabel from './MyFormLabel'

export default function MyInput({
    type = 'text',
    watch,
    maxLength,
    max,
    min,
    field,
    label,
    placeholder,
    required,
    helperText,
    error,
    onChange,
    autoFocus,
    tabIndex,
    showLabelRow = true,
    accept,
    size = 'md',
    isDisabled,
    register,
}: IMyInput) {
    const subColor = useSubtitleColor()
    const value = watch ? watch(field) : undefined
    return (
        <FormControl isInvalid={!!error}>
            {!!showLabelRow ? (
                <MyFormLabel field={field} required={required}>
                    {label}
                </MyFormLabel>
            ) : null}
            {type == 'password' ? (
                <PasswordInput
                    id={field}
                    //@ts-ignore
                    placeholder={placeholder}
                    spellCheck={false}
                    autoFocus={autoFocus}
                    tabIndex={tabIndex}
                    isDisabled={isDisabled}
                    {...register(field)}
                    // onChange={changeHandler}
                />
            ) : (
                <InputGroup>
                    <Input
                        size={size}
                        id={field}
                        type={type}
                        //@ts-ignore
                        placeholder={placeholder}
                        spellCheck={false}
                        autoFocus={autoFocus}
                        tabIndex={tabIndex}
                        maxLength={maxLength}
                        max={max}
                        min={min}
                        accept={accept}
                        isDisabled={isDisabled}
                        {...register(field)}
                    />
                    {maxLength && (
                        <InputRightElement>
                            <Text color={subColor}>{maxLength - (value?.length || 0)}</Text>
                        </InputRightElement>
                    )}
                </InputGroup>
            )}
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
            {error?.message && (
                <FormErrorMessage>
                    {label} {error.message}
                </FormErrorMessage>
            )}
        </FormControl>
    )
}
