import { Icon, IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import React, { useCallback } from 'react'
import AppIcon from '../../../utils/constants/app-icon.constant'
import { IMenuItem } from '../interfaces/menu-item.interface'
import IModel from '../interfaces/models/model.interface'
import NextLink from './NextLink'

export interface MyMenuProps<T extends IModel> {
    item: T
    actions: IMenuItem<T>[]
}
export const MyMenu = <T extends IModel>({ item, actions }: MyMenuProps<T>) => {
    const renderItem = useCallback(
        (menuItem: IMenuItem<T>, i) => {
            const content = menuItem.label
            return (
                <MenuItem key={i} onClick={menuItem.onItemClick?.bind(this, item)}>
                    {menuItem.path ? <NextLink href={menuItem.path}>{content}</NextLink> : content}
                </MenuItem>
            )
        },
        [item]
    )

    return (
        <Menu>
            <MenuButton as={IconButton} icon={<Icon as={AppIcon.moreVertical} />}></MenuButton>
            <MenuList>{actions.map(renderItem)}</MenuList>
        </Menu>
    )
}
