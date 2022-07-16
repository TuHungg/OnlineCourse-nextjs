import { ButtonProps, Icon, IconButton } from '@chakra-ui/react'
import React from 'react'
import { FiTrash } from 'react-icons/fi'

export interface DeleteButtonProps extends ButtonProps {}

export default function DeleteButton({ ...props }: DeleteButtonProps) {
    return <IconButton aria-label={'delete'} icon={<Icon as={FiTrash} />} {...props} />
}
