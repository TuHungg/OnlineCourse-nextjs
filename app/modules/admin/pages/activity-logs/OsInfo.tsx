import { Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { IActivityLog } from '../../../shared/interfaces/models/activity-log.interface'

export interface OsInfoProps {
    activityLog: IActivityLog
}
export default function OsInfo({ activityLog }: OsInfoProps) {
    return (
        <Stack>
            <Text>Name: {activityLog.deviceInfo.os.name}</Text>
            <Text>Version: {activityLog.deviceInfo.os.version}</Text>
        </Stack>
    )
}
