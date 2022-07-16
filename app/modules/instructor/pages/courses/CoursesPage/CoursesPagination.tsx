import { HStack, Stack } from '@chakra-ui/react'
import React from 'react'
import Pagination from '../../../../shared/components/Pagination/Pagination'
import { useInstructorCoursesUrlParams } from '../../../hooks/instructor-courses-url-params.hook'

export interface InstructorPaginationProps {
    totalItems?: number
    itemsPerPage?: number
}
const InstructorPagination = ({ totalItems = 0, itemsPerPage = 5 }: InstructorPaginationProps) => {
    const { _page } = useInstructorCoursesUrlParams()
    const totalPage = totalItems > 0 ? Math.ceil(totalItems / itemsPerPage) : 0
    if (totalPage <= 1) return <></>
    return (
        <Stack justifyContent={'center'} alignItems={'center'} mt={8}>
            <HStack spacing={8}>
                <>
                    <Pagination
                        showRows={false}
                        scroll={true}
                        colorScheme={'purple'}
                        pagination={{
                            itemsPerPage: itemsPerPage,
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

export default InstructorPagination
