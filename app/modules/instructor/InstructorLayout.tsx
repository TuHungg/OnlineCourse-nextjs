import { Box, Container, Stack } from '@chakra-ui/react'
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { ReactElement } from 'react'
import { SidebarProvider } from '../shared/providers/sidebar.provider'
import InstructorMobileSidebar from './components/InstructorMobileSidebar'
import { useInstructorSidebarWidth } from './hooks/instructor-sidebar-width.hook'
import { useIsInstructorMobile } from './hooks/is-instructor-mobile.hook'
import InstructorSidebar from './parts/InstructorSidebar/InstructorSidebar'
import InstructorTopBar from './parts/InstructorTopBar'
import { InstructorMenuProvider } from './providers/instructor-menu.provider'
import { InstructorParamsProvider } from './providers/instructor-params.provider'

ChartJS.register(ArcElement, Tooltip, Legend)
ChartJS.register(ChartDataLabels)

const Main = ({ page }: { page: ReactElement }) => {
    const sidebarWidth = useInstructorSidebarWidth()
    const isMobile = useIsInstructorMobile()
    return (
        <SidebarProvider>
            <Box>
                <Stack spacing={0}>
                    <InstructorTopBar />
                    {isMobile ? <InstructorMobileSidebar /> : <InstructorSidebar />}
                    <Box pl={!isMobile ? sidebarWidth + 'px' : 'unset'}>
                        <Container maxW="full">{page}</Container>
                    </Box>
                </Stack>
            </Box>
        </SidebarProvider>
    )
}

export default function InstructorLayout(page: ReactElement) {
    return (
        <InstructorParamsProvider>
            <SidebarProvider>
                <InstructorMenuProvider>
                    <Main page={page} />
                </InstructorMenuProvider>
            </SidebarProvider>
        </InstructorParamsProvider>
    )
}
