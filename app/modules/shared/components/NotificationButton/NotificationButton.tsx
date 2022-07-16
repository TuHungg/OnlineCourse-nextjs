import { Badge, Button, ButtonProps, HStack, Icon, Menu, MenuButton } from '@chakra-ui/react'
import React, { useCallback } from 'react'
import { FiBell } from 'react-icons/fi'
import { useAuth } from '../../../auth/providers/auth.provider'
import {
    useCountMyNewNotificationQuery,
    useReachMyNotifications,
} from '../../queries/my-notification-query.hook.ts'
import NotificationList from './NotificationList'

const UnreadBadge = () => {
    const { isLoading, data } = useCountMyNewNotificationQuery()
    if (isLoading || !data) return <></>
    return <Badge colorScheme={'purple'}>{data}</Badge>
}

export interface NotificationButtonProps extends ButtonProps {}
function NotificationButton(props: NotificationButtonProps) {
    const {
        state: { user },
    } = useAuth()
    const { mutate: reachNew } = useReachMyNotifications()
    const { data: newNotificationQty } = useCountMyNewNotificationQuery()
    const onReach = useCallback(() => {
        if (typeof newNotificationQty != 'undefined' && newNotificationQty > 0) {
            reachNew()
        }
    }, [newNotificationQty, reachNew])
    if (!user) return <></>
    return (
        <Menu>
            <MenuButton onClick={onReach} as={Button} _active={{ bgColor: 'gray.300' }} {...props}>
                <HStack spacing={1} justify="center">
                    <Icon as={FiBell} />
                    <UnreadBadge />
                </HStack>
            </MenuButton>
            <NotificationList />
        </Menu>
    )
}

export default React.memo(NotificationButton)
