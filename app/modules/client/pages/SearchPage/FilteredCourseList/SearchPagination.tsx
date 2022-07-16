import { HStack, Stack } from '@chakra-ui/react'
import React from 'react'
import Pagination from '../../../../shared/components/Pagination/Pagination'
import { useClientUrlParams } from '../../../hooks/client-url-params.hook'
import { useCountFilterCoursesQuery } from '../../../queries/filter-courses-query.hook'

const SearchPagination = () => {
    const { data: totalItems = 0 } = useCountFilterCoursesQuery()
    const { _page } = useClientUrlParams()
    const totalPage = totalItems > 0 ? Math.ceil(totalItems / 5) : 0
    if (totalPage < 2) return <></>
    return (
        <Stack justifyContent={'center'} alignItems={'center'} mt={8}>
            <HStack spacing={8}>
                <>
                    <Pagination
                        showRows={false}
                        scroll={true}
                        colorScheme={'purple'}
                        pagination={{
                            itemsPerPage: 5,
                            pageRange: 3,
                            totalItems,
                            currentPage: _page,
                        }}
                    />
                </>
            </HStack>
        </Stack>
    )
}

export default SearchPagination
