import { HStack } from '@chakra-ui/react'
import React from 'react'
import ThemeButton from '../../../admin/components/ThemeButton'
import { useAuth } from '../../../auth/providers/auth.provider'
import AvatarSkeleton from '../../../shared/components/AvatarSkeleton'
import NotificationButton from '../../../shared/components/NotificationButton/NotificationButton'
import ProfilePopover from '../../../shared/components/ProfileBox/ProfilePopover'
import RoleSwitchButton from '../../../shared/components/RoleSwitchButton'
import AppHeading from '../../components/AppHeading'
import { AuthButtons } from '../../components/AuthButtons'
import CartButton from '../../components/CartButton'
import MyCoursesButton from '../../components/MyCoursesButton'
import SearchBar from '../../components/SearchBar/SearchBar'
import WishlistButton from '../../components/WishlistButton'
import PopoverCategory from './PopoverCategory'
import TeachingButton from './TeachingButton'

const UserButtons = () => {
    const {
        state: { user },
    } = useAuth()
    if (!user) return <></>
    return (
        <>
            <TeachingButton />
            <MyCoursesButton />
            <WishlistButton />
        </>
    )
}

const Profile = () => {
    const {
        state: { user },
    } = useAuth()
    return (
        <>
            {!!user ? (
                <ProfilePopover size="md" />
            ) : typeof user == 'undefined' ? (
                <AvatarSkeleton />
            ) : (
                <HStack>
                    <AuthButtons />
                </HStack>
            )}
        </>
    )
}

function DesktopTopBar() {
    return (
        <HStack spacing={2}>
            <HStack spacing={4} pr={4}>
                <AppHeading />
                <PopoverCategory />
            </HStack>
            <SearchBar />
            <HStack spacing={2}>
                <UserButtons />
                <CartButton />
                <ThemeButton variant={'ghost'} />
                <NotificationButton variant={'ghost'} />
                <RoleSwitchButton />
                <Profile />
            </HStack>
        </HStack>
    )
}

export default React.memo(DesktopTopBar)
