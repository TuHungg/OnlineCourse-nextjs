import { MenuButton, MenuButtonProps } from '@chakra-ui/react'
import React from 'react'

export default function CustomMenuButton({ children, ...props }: MenuButtonProps) {
    return (
        <MenuButton variant={'none'} pt={1} _active={{ bgColor: 'gray.300' }} className={'no-focus-shadow'} {...props}>
            {children}
        </MenuButton>
    )
}
