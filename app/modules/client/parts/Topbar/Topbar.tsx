import { Box, Stack } from '@chakra-ui/react'
import React from 'react'
import { useIsClientMobile } from '../../hooks/is-client-mobile.hook'
import DesktopTopBar from './ClientDesktopTopBar'
import ClientMobileTopBar from './ClientMobileTopBar'
import HorizontalCategoryBar from './HorizontalCategoryBar'

const TopBar = () => {
    const isMobile = useIsClientMobile()
    return (
        <Stack spacing={0} shadow="lg">
            <Stack py={2} px={4}>
                {!isMobile ? <DesktopTopBar /> : <ClientMobileTopBar />}
            </Stack>
            <Box
                sx={{
                    display: 'none',
                    '@media only screen and (min-width: 991.98px)': {
                        display: 'block',
                    },
                }}
            >
                <HorizontalCategoryBar />
            </Box>
        </Stack>
    )
}

export default React.memo(TopBar)
