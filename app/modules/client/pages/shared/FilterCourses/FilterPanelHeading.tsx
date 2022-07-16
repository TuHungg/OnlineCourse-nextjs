import { ChevronDownIcon } from '@chakra-ui/icons'
import {
    Box,
    Button,
    Flex,
    Heading,
    HStack,
    Icon,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Skeleton,
    Stack,
    Text,
} from '@chakra-ui/react'
import React from 'react'
import AppIcon from '../../../../../utils/constants/app-icon.constant'
import NextLink from '../../../../shared/components/NextLink'
import { useSubtitleColor } from '../../../../shared/hooks/style.hook'
import { useUrlHelper } from '../../../../shared/hooks/url-helper.hook'
import { useClientUrlParams } from '../../../hooks/client-url-params.hook'
import { useClientParams } from '../../../providers/client-params.provider'
import { useCountFilterCoursesQuery } from '../../../queries/filter-courses-query.hook'
import ClearFilterButton from './ClearFilterButton'

type SortItem = {
    field: string
    label: string
}

const sortData: SortItem[] = [
    {
        field: 'meta.ratingCount',
        label: 'Most Reviewed',
    },
    {
        field: 'meta.avgRatingScore',
        label: 'Highest Rated',
    },
    {
        field: 'history.createdAt',
        label: 'Newest',
    },
]

const SortMenu = () => {
    const { _sortBy, _order } = useClientUrlParams()
    const { getUrlWithQueryParams } = useUrlHelper()
    //
    const currentSortItem = sortData.find((item) => item.field == _sortBy)
    const menuItemsHtml = sortData.map((item) => {
        const url = getUrlWithQueryParams({
            _sortBy: item.field + '',
            _order: 'desc',
        })
        return (
            <NextLink href={url} key={item.field}>
                <MenuItem>{item.label}</MenuItem>
            </NextLink>
        )
    })
    return (
        <Menu>
            <MenuButton
                p={{ base: 6, md: 8 }}
                as={Button}
                rightIcon={<ChevronDownIcon />}
                variant="outline"
            >
                <Stack align="start" spacing={{ base: 1 }}>
                    <Text fontSize={'xs'} as="strong">
                        Sort By
                    </Text>
                    <Text fontWeight={'light'}>{currentSortItem?.label}</Text>
                </Stack>
            </MenuButton>
            <MenuList>{menuItemsHtml}</MenuList>
        </Menu>
    )
}

const FilterPanelHeading = () => {
    const subtitleColor = useSubtitleColor()
    const {
        methods: { toggleFilter },
    } = useClientParams()
    const { data: totalItems, isLoading } = useCountFilterCoursesQuery()
    return (
        <HStack justifyContent="space-between">
            <Flex alignItems={'end'} flex={[1, 'unset']}>
                <Button
                    onClick={toggleFilter}
                    p={{ base: 4, md: 8 }}
                    variant="outline"
                    leftIcon={<Icon as={AppIcon.filter} />}
                    flex={[1, 'unset']}
                >
                    <Text as="strong">Filter</Text>
                </Button>
                <Box ml={2} flex={[1, 'unset']}>
                    <SortMenu />
                </Box>
                <Box display={{ base: 'none', lg: 'block' }}>
                    <ClearFilterButton />
                </Box>
            </Flex>
            <Skeleton isLoaded={!isLoading} w="fit-content">
                <Heading display={['none', 'unset']} color={subtitleColor} size={'sm'} as="span">
                    {totalItems} results{' '}
                </Heading>
            </Skeleton>
        </HStack>
    )
}

export default FilterPanelHeading
