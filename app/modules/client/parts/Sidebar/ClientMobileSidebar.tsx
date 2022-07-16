import {
    Button,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    HStack,
    Icon,
    Stack,
    StackDivider,
} from '@chakra-ui/react'
import React from 'react'
import AppIcon from '../../../../utils/constants/app-icon.constant'
import PathHelper from '../../../../utils/helpers/path.helper'
import ThemeButton from '../../../admin/components/ThemeButton'
import { useAuth } from '../../../auth/providers/auth.provider'
import LogoutButton from '../../../shared/components/LogoutButton'
import NextLink from '../../../shared/components/NextLink'
import { ProfileTile } from '../../../shared/components/ProfileBox/ProfileTile'
import RoleSwitchButton from '../../../shared/components/RoleSwitchButton'
import { useBorderColor } from '../../../shared/hooks/style.hook'
import { useSidebar } from '../../../shared/providers/sidebar.provider'
import { AuthButtons } from '../../components/AuthButtons'
import MyCoursesButton from '../../components/MyCoursesButton'
import { ClientMenuProvider, useClientMenu } from '../../providers/client-menu.provider'
import TeachingButton from '../Topbar/TeachingButton'
import SidebarCategory, { SidebarSubCatList } from './SidebarCategory'

const WishlistButton = () => {
    const { onClose } = useSidebar()
    return (
        <NextLink href={PathHelper.getMyCoursesPath('wishlist')}>
            <Button
                onClick={onClose}
                variant={'link'}
                leftIcon={<Icon as={AppIcon.favoriteOutline} />}
            >
                My wishlist
            </Button>
        </NextLink>
    )
}

const CartButton = () => {
    const { onClose } = useSidebar()
    return (
        <NextLink href={PathHelper.getCartPath()}>
            <Button onClick={onClose} variant={'link'} leftIcon={<Icon as={AppIcon.cart} />}>
                My cart
            </Button>
        </NextLink>
    )
}

const Content = () => {
    const { onClose } = useSidebar()
    const {
        state: { user },
    } = useAuth()
    const borderColor = useBorderColor()
    return (
        <Stack spacing={4} divider={<StackDivider color={borderColor} />}>
            {!user && (
                <Stack>
                    <AuthButtons />
                </Stack>
            )}

            <Stack spacing={4}>
                {!!user && (
                    <>
                        <TeachingButton
                            variant={'link'}
                            justifyContent="start"
                            leftIcon={<Icon as={AppIcon.edit} />}
                        />
                        <RoleSwitchButton onClick={onClose} variant={'link'} size="md" />
                        <MyCoursesButton
                            onClick={onClose}
                            variant={'link'}
                            leftIcon={<Icon as={AppIcon.course} />}
                        />
                        <WishlistButton />
                        <CartButton />
                    </>
                )}
            </Stack>
            <SidebarCategory />
            <Stack>
                <LogoutButton />
            </Stack>
        </Stack>
    )
}

const Main = () => {
    const { onClose, isOpen } = useSidebar()
    const {
        state: { user },
    } = useAuth()
    const {
        state: { hoveredPrimaryCat },
    } = useClientMenu()
    return (
        <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
                {!hoveredPrimaryCat ? (
                    <>
                        {!!user && (
                            <DrawerHeader borderBottomWidth="1px">
                                <HStack justify={'space-between'}>
                                    <ProfileTile />
                                    <ThemeButton size="sm" variant={'unstyled'} />
                                </HStack>
                            </DrawerHeader>
                        )}
                        <DrawerBody>
                            <Content />
                        </DrawerBody>
                    </>
                ) : (
                    <>
                        <DrawerBody>
                            <SidebarSubCatList />
                        </DrawerBody>
                    </>
                )}
            </DrawerContent>
        </Drawer>
    )
}

export default function ClientMobileSidebar() {
    return (
        <ClientMenuProvider>
            <Main />
        </ClientMenuProvider>
    )
}
