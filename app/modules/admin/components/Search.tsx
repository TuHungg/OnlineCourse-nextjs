/* eslint-disable react/jsx-no-undef */
import {
    Button,
    Flex,
    Input,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    useDisclosure,
} from '@chakra-ui/react'
import React from 'react'
import { useDevice } from '../../shared/hooks/app.hook'
import { useSearch } from '../providers/search.provider'

export type SearchItem = {
    title: string
    field: string
}

const Search = ({
    searchMenu,
    defaultField,
}: {
    searchMenu: SearchItem[]
    defaultField: string
}) => {
    const { isOpen: isMenuOpen, onOpen: onMenuOpen, onClose: onMenuClose } = useDisclosure()
    const { isMobile } = useDevice()
    const { value, field: searchField, onFieldChange: onSearchFieldChange, onSearch } = useSearch()
    const currentSearchField = searchField || defaultField
    const currentItem = searchMenu.find((item) => item.field == currentSearchField) || searchMenu[0]

    // handler
    const onSearchItemClick = (item: SearchItem) => {
        if (item.field != searchField) {
            onSearchFieldChange(item.field)
        }
    }

    // gen html
    const menuListItemsHtml = searchMenu.map((item) => {
        return (
            <MenuItem onClick={() => onSearchItemClick(item)} key={item.field}>
                {item.title}
            </MenuItem>
        )
    })
    return (
        <Flex
            align="center"
            justify={'flex-end'}
            flex={{
                base: 1,
                lg: 'unset',
            }}
        >
            {currentItem ? (
                <Menu onClose={onMenuClose} onOpen={onMenuOpen}>
                    <MenuButton as={Button} whiteSpace="normal">
                        {currentItem.title}
                    </MenuButton>
                    <MenuList>{menuListItemsHtml}</MenuList>
                </Menu>
            ) : null}
            <Input
                colorScheme="blue"
                w={{
                    lg: value != '' ? '400px' : '280px',
                }}
                sx={{
                    flex: isMobile ? 1 : undefined,
                    '&:focus': {
                        w: !isMobile ? '400px' : undefined,
                    },
                }}
                value={value}
                onChange={(e) => onSearch(e.target.value)}
                placeholder="Search ..."
                transitionProperty="width"
                transitionDuration={'normal'}
                ml={1}
            />
        </Flex>
    )
}

export default React.memo(Search)
