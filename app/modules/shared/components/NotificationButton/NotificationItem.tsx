import { Avatar, Box, HStack, MenuDivider, MenuItem, Stack, Text } from '@chakra-ui/react'
import moment from 'moment'
import React, { useCallback } from 'react'
import AppImg from '../../../../utils/constants/app-img.constant'
import { useSubtitleColor } from '../../hooks/style.hook'
import INotification from '../../interfaces/models/notification.interface'
import { useReadNotification } from '../../queries/my-notification-query.hook.ts'
import { NotificationLink } from './NotificationLink'

const UnreadDot = () => {
    return (
        <Box
            pos="absolute"
            bgColor={'blue.500'}
            sx={{
                right: '10px',
                bottom: '10px',
                w: '10px',
                h: '10px',
                borderRadius: '5px',
            }}
        ></Box>
    )
}

const Time = ({ item }: { item: INotification }) => {
    const subColor = useSubtitleColor()
    return (
        <Text
            fontSize={'sm'}
            fontWeight={!item.isRead ? 'bold' : 'normal'}
            color={!item.isRead ? 'blue.500' : subColor}
        >
            {moment(item.createdAt).fromNow()}
        </Text>
    )
}

export interface NotificationItemProps {
    item: INotification
    i: number
}
export const NotificationItem = (props: NotificationItemProps) => {
    const { mutate: read } = useReadNotification()
    const onRead = useCallback(() => {
        if (!props.item.isRead) {
            read(props.item._id)
        }
    }, [props.item._id, props.item.isRead, read])
    return (
        <>
            {props.i > 0 && <MenuDivider my={0} />}
            <NotificationLink {...props}>
                <MenuItem onClick={onRead} bg={!props.item.isRead ? 'blue.50' : undefined}>
                    <HStack
                        align="start"
                        spacing={{
                            base: 2,
                            md: 4,
                        }}
                        py={2}
                        pos="relative"
                    >
                        <Avatar
                            size="md"
                            src={props.item.thumb || AppImg.APP_LOGO}
                            bgColor="white"
                        />
                        <Stack spacing={0}>
                            <Text
                                as="div"
                                dangerouslySetInnerHTML={{ __html: props.item.content }}
                            ></Text>
                            <Time item={props.item} />
                        </Stack>
                        {!props.item.isRead && <UnreadDot />}
                    </HStack>
                </MenuItem>
            </NotificationLink>
        </>
    )
}
