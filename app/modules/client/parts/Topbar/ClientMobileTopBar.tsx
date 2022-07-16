import { ButtonGroup, HStack, Icon, IconButton } from '@chakra-ui/react'
import React from 'react'
import AppIcon from '../../../../utils/constants/app-icon.constant'
import NotificationButton from '../../../shared/components/NotificationButton/NotificationButton'
import SidebarToggler from '../../../shared/components/SidebarToggler'
import AppHeading from '../../components/AppHeading'
import CartButton from '../../components/CartButton'
import { useMobileSearch } from '../../providers/mobile-search-provider'

function ClientMobileTopBar() {
    const { onOpen: openMobileSearch } = useMobileSearch()
    return (
        <HStack justify={'space-between'}>
            <HStack>
                <SidebarToggler />
                <AppHeading />
            </HStack>
            <ButtonGroup spacing={0}>
                <CartButton variant="unstyled" />
                <NotificationButton variant={'unstyled'} />
                <IconButton
                    onClick={openMobileSearch}
                    aria-label="Open Search"
                    variant={'unstyled'}
                    icon={<Icon as={AppIcon.search} />}
                />
            </ButtonGroup>
        </HStack>
    )
}

export default React.memo(ClientMobileTopBar)
