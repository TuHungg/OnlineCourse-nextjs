import { Button, Icon, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import React from 'react'
import { FiChevronDown } from 'react-icons/fi'
import NextLink from '../../shared/components/NextLink'
import IActionItem from '../../shared/interfaces/action-item.inteface'

export interface RowActionProps {
    actions: IActionItem[]
}

export default function RowActions({ actions }: RowActionProps) {
    const actionsHtml = actions.map((item) => {
        if (item.path) {
            return (
                <NextLink key={item.name} href={item.path}>
                    <MenuItem key={item.name} icon={item.icon && <Icon as={item.icon} />}>
                        {item.name}
                    </MenuItem>
                </NextLink>
            )
        }
        return (
            <MenuItem
                key={item.name}
                icon={item.icon && <Icon as={item.icon} />}
                onClick={item.onClick}
            >
                {item.name}
            </MenuItem>
        )
    })
    return (
        <Menu size={'sm'}>
            <MenuButton as={Button} rightIcon={<Icon as={FiChevronDown} />}>
                Actions
            </MenuButton>
            <MenuList>{actionsHtml}</MenuList>
        </Menu>
        // <ButtonGroup variant='outline' spacing={2} size="md">
        //     <IconButton isRound  aria-label='edit button' colorScheme='green' icon={<Icon as={FiEdit3} />}> </IconButton>
        //     <IconButton isRound  aria-label='delete button' colorScheme='red' icon={<Icon as={FiTrash} />}> </IconButton>
        // </ButtonGroup>
    )
}
