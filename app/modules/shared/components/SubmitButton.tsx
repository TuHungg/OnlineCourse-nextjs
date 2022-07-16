import { Button, ButtonProps } from '@chakra-ui/react'
import React from 'react'

export interface SubmitButtonProps extends ButtonProps {}
export default function SubmitButton({ children = 'Submit', ...props }: SubmitButtonProps) {
    return (
        <Button type="submit" colorScheme={'blue'} {...props}>
            {children}
        </Button>
    )
}
