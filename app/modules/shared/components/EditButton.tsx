import { ButtonProps, Icon, IconButton } from '@chakra-ui/react'
import React from 'react'
import { FiEdit2 } from 'react-icons/fi'

export interface EditButtonProps extends ButtonProps {}

export default function EditButton({ ...props }: EditButtonProps) {
    return <IconButton aria-label={'edit'} icon={<Icon as={FiEdit2} />} {...props} />
}
