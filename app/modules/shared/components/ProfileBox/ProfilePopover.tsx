import { Avatar, AvatarProps } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import PathHelper from '../../../../utils/helpers/path.helper'
import { useAuth } from '../../../auth/providers/auth.provider'
import { TModule } from '../../types/module.type'
import MyDropdown, { IMyDropdownItemGroup } from '../MyDropdown'

export interface ProfilePopoverProps extends AvatarProps {
    context?: TModule
    postLogout?: () => void
}
function ProfilePopover({ postLogout, context = 'client', ...props }: ProfilePopoverProps) {
    const {
        state: { user },
        methods: { onLogout },
    } = useAuth()
    const listGroups: IMyDropdownItemGroup[] = useMemo(() => {
        let groups: IMyDropdownItemGroup[] = [
            {
                label: 'profile',
                list: [
                    {
                        label: 'Edit profile',
                        path: PathHelper.getProfliePath(),
                    },
                    {
                        label: 'Logout',
                        onClick: async () => {
                            await onLogout()
                            // postLogout && postLogout()
                            window.location.reload()
                        },
                    },
                ],
            },
        ]
        if (context == 'client') {
            const clientGroups: IMyDropdownItemGroup[] = [
                {
                    label: 'learning',
                    list: [
                        {
                            label: 'My learning',
                            path: PathHelper.getMyCoursesPath('learning'),
                        },
                        {
                            label: 'My cart',
                            path: PathHelper.getCartPath(),
                        },
                        {
                            label: 'Wishlist',
                            path: PathHelper.getMyCoursesPath('wishlist'),
                        },
                        {
                            label: '',
                            path: '#',
                        },
                    ],
                },
            ]
            groups = clientGroups.concat(groups)
        }
        return groups
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onLogout, postLogout])
    const trigger = useMemo(() => {
        if (!user) return <></>
        return (
            <Avatar
                ignoreFallback
                sx={{ cursor: 'pointer' }}
                src={user.profile.avatar || ''}
                size={'sm'}
                {...props}
            ></Avatar>
        )
    }, [props, user])
    if (!user) return <></>
    return <MyDropdown trigger={trigger} listGroups={listGroups} />
}

export default React.memo(ProfilePopover)
