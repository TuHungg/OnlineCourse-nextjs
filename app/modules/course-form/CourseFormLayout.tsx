import { Box, Stack, useBreakpointValue } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import PageParamsProvider from '../admin/providers/page-params.provider'
import { SidebarProvider } from '../shared/providers/sidebar.provider'
import Sidebar from './components/Sidebar/Sidebar'
import MobileSubTopBar from './parts/MobileSubTopBar'
import TopBar, { COURSE_FORM_TOP_BAR_HEIGHT } from './parts/TopBar'

export default function CourseFormLayout(page: ReactElement) {
    return (
        <PageParamsProvider defaultValue={{ ctrlName: 'courses', modelName: 'course' }}>
            <SidebarProvider>
                <Box>
                    <TopBar />
                    <Box
                        flexDir={'row'}
                        mt={COURSE_FORM_TOP_BAR_HEIGHT + 10 + 'px'}
                        py={{
                            base: 2,
                            lg: 0,
                        }}
                        px={{
                            base: 2,
                            lg: 20,
                        }}
                    >
                        {/* SIDEBAR */}
                        <Box pos="fixed">
                            <Sidebar />
                        </Box>

                        {/* CONTENT */}
                        <Box
                            ml={{
                                xl: '300px',
                            }}
                        >
                            <Main page={page} />
                        </Box>
                    </Box>
                </Box>
            </SidebarProvider>
        </PageParamsProvider>
    )
}

const Main = ({ page }: { page: ReactElement }) => {
    const isMobile = useBreakpointValue({ base: true, xl: false })
    return (
        <Stack flex={1}>
            {isMobile && <MobileSubTopBar />}
            {page}
        </Stack>
    )
}
