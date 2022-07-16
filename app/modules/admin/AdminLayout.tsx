import { Box, VStack } from '@chakra-ui/react'
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import React, { ReactElement } from 'react'
import { useAppBg } from '../shared/hooks/style.hook'
import SettingSidebar from './parts/SettingSidebar'
import Sidebar, {
    ADMIN_SIDEBAR_EXPANDED_WIDTH,
    ADMIN_SIDEBAR_SM_WIDTH,
} from './parts/Sidebar/Sidebar'
import TopBar from './parts/TopBar'
import AdminParamsProvider from './providers/admin-params.provider'
import { AdminSidebarProvider, useAdminSidebar } from './providers/admin-sidebar.provider'
import { SettingSidebarProvider } from './providers/setting-sidebar.provider'

ChartJS.register(ArcElement, Tooltip, Legend)
ChartJS.register(ChartDataLabels)

const Main = ({ page }: { page: ReactElement }) => {
    const { navSize } = useAdminSidebar()
    const appBg = useAppBg()
    return (
        <Box
            bg={appBg}
            flexDir={{
                base: 'column',
                lg: 'row',
            }}
            transition="background .2s"
        >
            {/* MAIN SIDEBAR */}
            <Sidebar />
            {/* MAIN CONTENT */}
            <VStack
                minH={'100vh'}
                ml={{
                    lg:
                        navSize == 'small'
                            ? ADMIN_SIDEBAR_SM_WIDTH + 'px'
                            : ADMIN_SIDEBAR_EXPANDED_WIDTH + 'px',
                }}
                flex={1}
                justifyContent={'flex-start'}
                align="stretch"
                spacing={4}
            >
                <TopBar px={{ base: 2, md: 4 }} pos="sticky" zIndex="sticky" top="0" />
                {/* MAIN */}
                <Box px={{ base: 2, md: 4 }} pb={10}>
                    {page}
                </Box>
            </VStack>
            {/* SETTING SIDEBAR */}
            <SettingSidebar />
        </Box>
    )
}

export default function AdminLayout(page: ReactElement) {
    return (
        <AdminParamsProvider>
            <AdminSidebarProvider>
                <SettingSidebarProvider>
                    <Main page={page} />
                </SettingSidebarProvider>
            </AdminSidebarProvider>
        </AdminParamsProvider>
    )
}
