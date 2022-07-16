import { HStack, Box, Stack } from '@chakra-ui/react'
import React from 'react'
import { useClientParams } from '../../../providers/client-params.provider'
import FilteredCourseList from '../../SearchPage/FilteredCourseList/FilteredCourseList'
import FilterPanelSidebar from '../../SearchPage/FilterPanelSidebar/FilterPanelSidebar'
import FilterPanelHeading from './FilterPanelHeading'

export default function FilterCourses() {
    const {
        state: { showFilter },
    } = useClientParams()
    return (
        <Stack spacing={8}>
            <FilterPanelHeading />
            <HStack alignItems={'start'} spacing={0}>
                <Box pr={{ lg: showFilter ? 10 : undefined }}>
                    <FilterPanelSidebar />
                </Box>
                <Box flex={1}>
                    <FilteredCourseList />
                </Box>
            </HStack>
        </Stack>
    )
}
