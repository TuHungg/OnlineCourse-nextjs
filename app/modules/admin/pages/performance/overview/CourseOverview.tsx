import { Box, HStack, Stack, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { useState } from 'react'
import DateRangeFilter from '../../../../instructor/pages/performance/OverviewPage/DateRangeFilter'
import { MyChartProvider } from '../../../../stats-shared/providers/chart-provider'
import { CourseChartParamsProvider } from '../../../../stats-shared/providers/course-chart-params.provider'
import AdminCourseEnrollmentsChart from './AdminCourseEnrollmentsChart'
import { AdminCourseRatingChart } from './AdminCourseRatingChart'
import AdminRevenueChart from './AdminRevenueChart'
import {
    AdminCourseEnrollmentTabContent,
    AdminCourseRatingTabContent,
    AdminRevenueTabContent,
} from './OverviewTabList'

const Main = () => {
    const [index, setIndex] = useState<number>(0)
    return (
        <Stack>
            <HStack>
                <Box>{index != 2 && <DateRangeFilter />}</Box>
            </HStack>
            <Tabs isLazy variant="line" onChange={setIndex} index={index}>
                <TabList overflowX={'auto'} p={1} borderBottom={'none'}>
                    <Tab px={6}>
                        <AdminRevenueTabContent />
                    </Tab>
                    <Tab px={6}>
                        <AdminCourseEnrollmentTabContent />
                    </Tab>
                    <Tab px={6}>
                        <AdminCourseRatingTabContent />
                    </Tab>
                </TabList>

                <TabPanels>
                    <TabPanel px={0}>
                        <AdminRevenueChart />
                    </TabPanel>
                    <TabPanel px={0}>
                        <AdminCourseEnrollmentsChart />
                    </TabPanel>
                    <TabPanel px={0}>
                        <AdminCourseRatingChart />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Stack>
    )
}

export interface OverviewProps {
    courseId?: string
}
export default function CourseOverview(props: OverviewProps) {
    return (
        <CourseChartParamsProvider courseId={props.courseId}>
            <MyChartProvider>
                <Main />
            </MyChartProvider>
        </CourseChartParamsProvider>
    )
}
