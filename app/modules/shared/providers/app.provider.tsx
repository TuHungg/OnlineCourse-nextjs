import { useRouter } from 'next/router'
import React, { ReactNode, useEffect } from 'react'
import { apiCreateActivityLog } from '../../../apis/activity-logs.api'

export function AppProvider({ children }: { children: ReactNode }) {
    const router = useRouter()
    const { asPath } = router
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                const lat = position.coords.latitude
                const long = position.coords.longitude
                apiCreateActivityLog({
                    geolocationInfo: { geolocation: { lat, long } },
                    content: asPath,
                })
            },
            (e) => {
                let message
                switch (e.code) {
                    case e.PERMISSION_DENIED:
                        message = 'denied'
                        break
                    case e.POSITION_UNAVAILABLE:
                        message = 'unavailable'
                        break
                    case e.TIMEOUT:
                        message = 'timeout'
                        break
                    default:
                        message = 'unknown'
                        break
                }
                apiCreateActivityLog({ geolocationInfo: { message }, content: asPath })
            }
        )
    }, [asPath])
    return <>{children}</>
}
