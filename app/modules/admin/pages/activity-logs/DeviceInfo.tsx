import { Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { IActivityLog } from '../../../shared/interfaces/models/activity-log.interface'

export interface DeviceInfoProps {
    activityLog: IActivityLog
}
export default function DeviceInfo({ activityLog }: DeviceInfoProps) {
    const { ip, device } = activityLog.deviceInfo
    return (
        <Stack>
            <Text>Ip: {ip}</Text>
            <Text>Type: {device.type}</Text>
            {!!device.brand && <Text>Brand: {device.brand}</Text>}
            {!!device.model && <Text>Model: {device.model}</Text>}
        </Stack>
    )
}
