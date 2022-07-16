import { Button, ButtonProps } from '@chakra-ui/react'
import React from 'react'

export interface SubmitButtonProps extends ButtonProps {}
export default function CancelButton({ children = 'Cancel', ...props }: SubmitButtonProps) {
    return <Button {...props}>{children}</Button>
}
