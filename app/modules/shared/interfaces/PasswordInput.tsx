import {
    InputGroup,
    Input,
    InputRightElement,
    Button,
    InputProps,
    IconButton,
    Icon,
} from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'

export interface PasswordInput extends InputProps {}

const PasswordInput = React.forwardRef(({ ...props }: PasswordInput, ref: any) => {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    return (
        <InputGroup size="md">
            <Input
                ref={ref}
                pr="4.5rem"
                type={show ? 'text' : 'password'}
                placeholder="Enter password"
                {...props}
            />
            <InputRightElement>
                <IconButton
                    tabIndex={-1}
                    onClick={handleClick}
                    aria-label=""
                    icon={<Icon as={!show ? FiEye : FiEyeOff} />}
                    size="sm"
                />
            </InputRightElement>
        </InputGroup>
    )
})
PasswordInput.displayName = 'PasswordInput'
export default PasswordInput
