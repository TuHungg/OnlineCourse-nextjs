import { Box, Flex, Stack, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React, { ChangeEventHandler, useCallback, useState } from 'react'
import { MyChartProvider } from '../../../../stats-shared/providers/chart-provider'
import {
    CourseChartParamsProvider,
    useCourseChartParams,
} from '../../../../stats-shared/providers/course-chart-params.provider'
import InstructorCourseFilter from '../../../components/InstructorCourseFilter'
import InstructorPage from '../../../components/InstructorPage'
import DateRangeFilter from './DateRangeFilter'
import InstructorCourseEnrollmentsChart from './InstructorCourseEnrollmentsChart'
import {
    InstructorEnrollmentTabContent,
    InstructorCoursesRatingTabContent,
    InstructorRevenueTabContent,
} from './OverviewTabList'
import { RatingChart } from './InstructorCourseRatingChart'
import InstructorRevenueChart from './InstructorRevenueChart'

const Main = () => {
    const [index, setIndex] = useState<number>(0)
    const {
        state: { courseId },
        methods: { setCourseId },
    } = useCourseChartParams()
    const onCourseFilterChange: ChangeEventHandler<HTMLSelectElement> = useCallback(
        (e) => {
            setCourseId(e.target.value)
        },
        [setCourseId]
    )
    return (
        <Stack>
            <Flex flexDir={{ base: 'column', lg: 'row' }} justify={'space-between'} align="end">
                <Box>{index != 2 && <DateRangeFilter />}</Box>
                <Box pl={{ base: 0, lg: 2 }} pt={{ base: 2, lg: 0 }}>
                    <InstructorCourseFilter isUrlFilter={false} onChange={onCourseFilterChange} />
                </Box>
            </Flex>
            <Tabs isLazy variant="line" onChange={setIndex} index={index}>
                <TabList>
                    <Tab px={6}>
                        <InstructorRevenueTabContent />
                    </Tab>
                    <Tab px={6}>
                        <InstructorEnrollmentTabContent />
                    </Tab>
                    <Tab px={6}>
                        <InstructorCoursesRatingTabContent />
                    </Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <InstructorRevenueChart />
                    </TabPanel>
                    <TabPanel>
                        <InstructorCourseEnrollmentsChart />
                    </TabPanel>
                    <TabPanel>
                        <RatingChart />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Stack>
    )
}

export default function OverviewPage() {
    return (
        <CourseChartParamsProvider>
            <InstructorPage title="Overview">
                <MyChartProvider>
                    <Main />
                </MyChartProvider>
            </InstructorPage>
        </CourseChartParamsProvider>
    )
}
