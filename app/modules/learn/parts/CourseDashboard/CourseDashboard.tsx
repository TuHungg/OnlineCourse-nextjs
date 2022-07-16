import { Box, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import React from 'react'
import UnitComments from './UnitComments'

export default function CourseDashboard() {
    return (
        <Box>
            <Tabs size="md" variant="enclosed">
                <TabList>
                    {/* <Tab>Overview</Tab> */}
                    <Tab>Comments</Tab>
                    {/* <Tab>Reviews</Tab> */}
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <UnitComments />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}
