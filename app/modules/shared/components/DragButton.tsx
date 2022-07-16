import { ButtonProps, Icon, IconButton } from '@chakra-ui/react'
import React from 'react'
import { FiMenu } from 'react-icons/fi'

export interface DragButtonProps extends ButtonProps {}

export default function DragButton({ ...props }: DragButtonProps) {
    return (
        <IconButton
            variant={'unstyled'}
            aria-label={'drag'}
            icon={<Icon as={FiMenu} />}
            {...props}
        />
    )
}
