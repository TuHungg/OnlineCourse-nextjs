import React from 'react'
import { useAuth } from '../../../auth/providers/auth.provider'
import ListTile from '../ListTile'

export const ProfileTile = () => {
    const {
        state: { user },
    } = useAuth()
    if (!user) return <></>
    const roleName = user.role.name === 'Student' ? 'Student' : user.role.name
    return (
        <ListTile
            alt={user.profile.firstName}
            thumb={user.profile.avatar || ''}
            title={user.profile.fullName || ''}
            thumbSize="md"
            subtitle={roleName}
        />
    )
}
