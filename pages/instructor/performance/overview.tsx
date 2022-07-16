import { Box, Flex, Stack, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { ChangeEventHandler, useCallback, useState } from 'react'
import InstructorCourseFilter from '../../../app/modules/instructor/components/InstructorCourseFilter'
import InstructorPage from '../../../app/modules/instructor/components/InstructorPage'
import InstructorLayout from '../../../app/modules/instructor/InstructorLayout'
import DateRangeFilter from '../../../app/modules/instructor/pages/performance/OverviewPage/DateRangeFilter'
import InstructorCourseEnrollmentsChart from '../../../app/modules/instructor/pages/performance/OverviewPage/InstructorCourseEnrollmentsChart'
import { RatingChart } from '../../../app/modules/instructor/pages/performance/OverviewPage/InstructorCourseRatingChart'
import InstructorRevenueChart from '../../../app/modules/instructor/pages/performance/OverviewPage/InstructorRevenueChart'
import {
    InstructorCoursesRatingTabContent,
    InstructorEnrollmentTabContent,
    InstructorRevenueTabContent,
} from '../../../app/modules/instructor/pages/performance/OverviewPage/OverviewTabList'
import MyHead from '../../../app/modules/shared/components/MyHead'
import { MyChartProvider } from '../../../app/modules/stats-shared/providers/chart-provider'
import {
    CourseChartParamsProvider,
    useCourseChartParams,
} from '../../../app/modules/stats-shared/providers/course-chart-params.provider'
import { NextPageWithLayout } from '../../../app/types/next'
import AppTitle from '../../../app/utils/constants/app-title.constant'

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
                <TabList overflowX={'auto'} borderBottom={'none'} p={1}>
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
                    <TabPanel px={0}>
                        <InstructorRevenueChart />
                    </TabPanel>
                    <TabPanel px={0}>
                        <InstructorCourseEnrollmentsChart />
                    </TabPanel>
                    <TabPanel px={0}>
                        <RatingChart />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Stack>
    )
}

const Page: NextPageWithLayout = () => {
    return (
        <>
            <MyHead title={AppTitle.INSTRUCTOR_OVERVIEW} />
            <CourseChartParamsProvider>
                <InstructorPage title="Overview">
                    <MyChartProvider>
                        <Main />
                    </MyChartProvider>
                </InstructorPage>
            </CourseChartParamsProvider>
        </>
    )
}

Page.getLayout = InstructorLayout
export default Page
