import {
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    HStack,
    Icon,
    List,
    Text,
} from '@chakra-ui/react'
import React, { memo } from 'react'
import { IconType } from 'react-icons'
import { IAdminNavItem } from '../../interfaces/admin-nav-item.interface'
import { useAdminSidebar } from '../../providers/admin-sidebar.provider'
import NavItem from './NavItem'

function NavGroupItem({
    title,
    active = false,
    icon,
    navItems,
}: {
    title: string
    active?: boolean
    icon: IconType
    navItems: IAdminNavItem[]
}) {
    const { navSize, toggleNavSize } = useAdminSidebar()
    const navItemsHtml = navItems.map((item) => {
        return <NavItem key={item.key} navItem={item} />
    })
    return (
        <>
            <AccordionItem mb={5} border={'none'}>
                <AccordionButton
                    onClick={() => navSize == 'small' && toggleNavSize()}
                    className="no-focus-shadow"
                    _hover={{ background: undefined }}
                    px={2}
                    _expanded={{
                        bgColor: 'teal.400',
                        color: 'white',
                    }}
                    borderRadius={5}
                >
                    <HStack
                        justifyContent={{
                            base: 'flex-start',
                            lg: navSize == 'small' ? 'center' : 'flex-start',
                        }}
                        flex="1"
                    >
                        <Icon as={icon} />
                        <Text
                            display={{
                                base: 'flex',
                                lg: navSize == 'small' ? 'none' : 'flex',
                            }}
                            ml={2}
                        >
                            {title}
                        </Text>
                    </HStack>
                    <AccordionIcon
                        display={{
                            base: 'flex',
                            lg: navSize == 'small' ? 'none' : 'flex',
                        }}
                    />
                </AccordionButton>
                <AccordionPanel
                    display={{
                        base: 'flex',
                        lg: navSize == 'small' ? 'none' : 'flex',
                    }}
                    pb={4}
                >
                    <List w="full" spacing={4}>
                        {navItemsHtml}
                    </List>
                </AccordionPanel>
            </AccordionItem>
        </>
    )
}

export default memo(NavGroupItem)
