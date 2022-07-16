import { Avatar, AvatarProps } from '@chakra-ui/react'
import React from 'react'
import { useAuth } from '../../auth/providers/auth.provider'

export interface AuthUserAvatarProps extends AvatarProps {}
export default function AuthUserAvatar(props: AuthUserAvatarProps) {
    const {
        state: { user },
    } = useAuth()
    if (!user) return <></>
    return (
        <Avatar
            ignoreFallback
            sx={{ cursor: 'pointer' }}
            src={user.profile.avatar || ''}
            name={user.profile.fullName}
            size={'sm'}
            {...props}
        ></Avatar>
    )
}
