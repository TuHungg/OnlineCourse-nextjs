import { Alert, HStack, Stack, StackDivider } from '@chakra-ui/react'
import React from 'react'
import ErrorMessage from '../../../../shared/components/ErrorMessage'
import MyCircularProgress from '../../../../shared/components/MyCircularProgress'
import { useFilterCoursesQuery } from '../../../queries/filter-courses-query.hook'
import FilteredCourseExcerpt from './FilteredCourseExcerpt'
import FilteredCourseSeketon from './FilteredCourseSeketon'
import SearchPagination from './SearchPagination'

const EmptyMessage = () => {
    return <Alert status="info">No course found. Please try another key words!</Alert>
}

const FilteredCourseList = () => {
    const { isLoading, isError, data } = useFilterCoursesQuery()
    const coursesHtml = data?.map((item) => {
        return <FilteredCourseExcerpt key={item._id} course={item} />
    })
    if (isLoading) return <FilteredCourseSeketon />
    if (isLoading) return <FilteredCourseSeketon />
    if (isError) return <ErrorMessage />
    if (data && data.length == 0) return <EmptyMessage />
    return (
        <Stack>
            <Stack divider={<StackDivider />} spacing={5}>
                {coursesHtml}
            </Stack>
            <SearchPagination />
        </Stack>
    )
}

export default FilteredCourseList
