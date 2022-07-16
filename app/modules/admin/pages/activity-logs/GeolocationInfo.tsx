import { Button, Icon, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import NextLink from '../../../shared/components/NextLink'
import { IActivityLog } from '../../../shared/interfaces/models/activity-log.interface'

export interface GeolocationInfoProps {
    activityLog: IActivityLog
}
export default function GeolocationInfo({ activityLog }: GeolocationInfoProps) {
    const { geolocation, message } = activityLog.deviceInfo.geolocationInfo
    const mapLink = `https://www.google.com/maps/search/?api=1&query=${geolocation?.lat}, ${geolocation?.long}`
    return (
        <Stack>
            {!!geolocation && (
                <NextLink href={mapLink} linkProps={{ target: '_blank' }}>
                    <Button colorScheme={'green'} leftIcon={<Icon as={FaMapMarkerAlt} />} size="sm">
                        View map
                    </Button>
                </NextLink>
            )}
            {!!message && <Text>{message}</Text>}
        </Stack>
    )
}
