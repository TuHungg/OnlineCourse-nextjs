import { HStack, ListIcon, ListItem, Text } from '@chakra-ui/react'
import React from 'react'
import { FiCircle } from 'react-icons/fi'
import NextLink from '../../../shared/components/NextLink'
import { useSubtitleColor } from '../../../shared/hooks/style.hook'
import { IAdminNavItem } from '../../interfaces/admin-nav-item.interface'
import { useAdminParams } from '../../providers/admin-params.provider'
import { useAdminSidebar } from '../../providers/admin-sidebar.provider'

export default function NavItem({
    navItem,
    active = false,
}: {
    navItem: IAdminNavItem
    active?: boolean
}) {
    const { onClose } = useAdminSidebar()
    const { page } = useAdminParams()
    const isActive = page?.toLowerCase().indexOf(navItem.link) > -1
    const subtitleColor = useSubtitleColor()
    return (
        <ListItem>
            <NextLink passHref href={navItem.link} linkProps={{ _hover: { textDecor: 'none' } }}>
                <HStack onClick={onClose}>
                    <ListIcon as={FiCircle} color={isActive ? 'teal.500' : 'transparent'} />
                    <Text
                        color={!isActive ? subtitleColor : undefined}
                        fontWeight={isActive ? 'bold' : 'normal'}
                    >
                        {navItem.title}
                    </Text>
                </HStack>
            </NextLink>
        </ListItem>
    )
}
