import { IconButton, IconButtonProps } from '@chakra-ui/react'
import React from 'react'

export default function CustomIconButton({ children, ...props }: IconButtonProps) {
    return (
        <IconButton
            className="no-focus-shadow"
            _hover={{ background: 'none' }}
            background="none"
            {...props}
        ></IconButton>
    )
}
