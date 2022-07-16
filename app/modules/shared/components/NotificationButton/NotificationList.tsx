import { Button, ButtonGroup, MenuItem, MenuList, Skeleton } from '@chakra-ui/react'
import React, { useCallback } from 'react'
import INotification from '../../interfaces/models/notification.interface'
import { useMyNotificationsQuery } from '../../queries/my-notification-query.hook.ts'
import { NotificationItem } from './NotificationItem'

export default function NotificationList() {
    const { isLoading, data, hasNextPage, fetchNextPage } = useMyNotificationsQuery()
    const renderItem = useCallback((item: INotification, i: number) => {
        return <NotificationItem key={item._id} item={item} i={i} />
    }, [])
    const list = data?.pages.reduce((prev, current) => prev.concat(current), []).map(renderItem)
    return (
        <Skeleton isLoaded={!isLoading} className="notification-list">
            <MenuList maxH={'500px'} overflowY="auto" w={{ lg: '400px' }}>
                {!!list && list.length > 0 ? (
                    list
                ) : (
                    <MenuItem>You do not have any notification</MenuItem>
                )}
                {hasNextPage ? (
                    <MenuItem as="div">
                        <ButtonGroup justifyContent={'center'} w="full">
                            <Button
                                onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    fetchNextPage()
                                }}
                                variant={'link'}
                            >
                                See more
                            </Button>
                        </ButtonGroup>
                    </MenuItem>
                ) : null}
            </MenuList>
        </Skeleton>
    )
}
