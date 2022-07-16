import {
    Accordion,
    Box,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    HStack,
    Stack,
    Text,
    useBreakpointValue,
} from '@chakra-ui/react'
import React, { ReactNode, useMemo } from 'react'
import { COURSE_LEVEL_SELECT_DATA } from '../../../../../utils/data/course.data'
import Rating from '../../../components/Rating'
import { useClientParams } from '../../../providers/client-params.provider'
import { useCountClientFilterQuery } from '../../../queries/count-client-filter-query.hook'
import ClearFilterButton from '../../shared/FilterCourses/ClearFilterButton'
import FilterGroup, { FilterGroupProps } from './FilterGroup'

const data: FilterGroupProps[] = [
    // {
    //     field: 'topic',
    //     title: 'Topic',
    //     data: [
    //         {
    //             value: 1,
    //             label: 'Excel',
    //             count: 221
    //         },
    //         {
    //             value: 2,
    //             label: 'Javascript',
    //             count: 1000
    //         },
    //         {
    //             value: 3,
    //             label: 'Python',
    //             count: 342
    //         },
    //     ]
    // },
    {
        field: 'basicInfo.level',
        title: 'Level',
        data: COURSE_LEVEL_SELECT_DATA,
    },
    {
        allowMultiple: false,
        field: '_rating',
        title: 'Rating',
        data: [
            {
                value: '4.5',
                label: (
                    <HStack>
                        <Rating fw={true} value={4.5} showLabel={false} />
                        <Text>4.5 and up</Text>
                    </HStack>
                ),
            },
            {
                value: '4.0',
                label: (
                    <HStack>
                        <Rating fw={true} value={4.0} showLabel={false} />
                        <Text>4.0 and up</Text>
                    </HStack>
                ),
            },
            {
                value: '3.5',
                label: (
                    <HStack>
                        <Rating fw={true} value={3.5} showLabel={false} />
                        <Text>3.5 and up</Text>
                    </HStack>
                ),
            },
            {
                value: '3.0',
                label: (
                    <HStack>
                        <Rating fw={true} value={3.0} showLabel={false} />
                        <Text>3.0 and up</Text>
                    </HStack>
                ),
            },
        ],
    },
    {
        field: '_duration',
        title: 'Video duration',
        data: [
            {
                value: '0_1',
                label: '0-1 Hour',
            },
            {
                value: '1_3',
                label: '1-3 Hour',
            },
            {
                value: '3_6',
                label: '3-6 Hour',
            },
            {
                value: '6_17',
                label: '6-17 Hour',
            },
            {
                value: '17',
                label: '17+ Hour',
            },
        ],
    },
]

const FilterPanelSidebarWrapper = ({ children }: { children: ReactNode }) => {
    const {
        state: { showFilter },
        methods: { toggleFilter },
    } = useClientParams()
    const isMobile = useBreakpointValue({ base: true, lg: false })
    const onClose = () => {
        toggleFilter()
    }
    return (
        <>
            {!isMobile ? (
                children
            ) : (
                <Drawer isOpen={!showFilter} placement="right" onClose={onClose}>
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>Filter</DrawerHeader>
                        <DrawerBody px={['5px', '16px']}>{children}</DrawerBody>
                    </DrawerContent>
                </Drawer>
            )}
        </>
    )
}

export default function FilterPanelSidebar() {
    const {
        state: { showFilter },
        methods: { toggleFilter },
    } = useClientParams()
    const countClientFilter = useCountClientFilterQuery(['basicInfo.level', '_rating', '_duration'])
    const filterGroups: FilterGroupProps[] = useMemo((): FilterGroupProps[] => {
        return data.map((filterGroup) => {
            let newData = filterGroup.data
            if (countClientFilter.data) {
                const countResult = countClientFilter.data.find(
                    (item) => item.field == filterGroup.field
                )
                newData = filterGroup.data.map((item) => {
                    const value = item.value.replace('.', '')
                    return {
                        ...item,
                        count: countResult?.data[value],
                    }
                })
            }
            return {
                ...filterGroup,
                data: newData,
            }
        })
    }, [countClientFilter.data])
    const filterGroupsHtml = filterGroups.map((item, i) => {
        return <FilterGroup key={i} {...item} />
    })
    const defaultIndexes = [...Array(data.length)].map((_, i) => i)
    return (
        <FilterPanelSidebarWrapper>
            <Box
                width={{ lg: showFilter ? '280px' : '0px' }}
                transitionProperty={'width'}
                transitionDuration={'normal'}
                overflow="hidden"
            >
                <Accordion allowMultiple defaultIndex={defaultIndexes}>
                    <Stack>
                        <HStack justify={'end'} display={{ base: 'flex', lg: 'none' }}>
                            <ClearFilterButton />
                        </HStack>
                        <Stack spacing={5}>{filterGroupsHtml}</Stack>
                    </Stack>
                </Accordion>
            </Box>
        </FilterPanelSidebarWrapper>
    )
}
