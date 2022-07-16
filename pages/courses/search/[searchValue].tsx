import { Stack } from '@chakra-ui/react'
import React from 'react'
import ClientLayout from '../../../app/modules/client/ClientLayout'
import ClientPageContainer from '../../../app/modules/client/components/ClientPageContainer'
import { useClientUrlParams } from '../../../app/modules/client/hooks/client-url-params.hook'
import { useHideHCatBar } from '../../../app/modules/client/hooks/hide-h-cat-bar.hook'
import SearchHeading from '../../../app/modules/client/pages/SearchPage/Section/SearchHeading'
import FilterCourses from '../../../app/modules/client/pages/shared/FilterCourses/FilterCourses'
import MyHead from '../../../app/modules/shared/components/MyHead'
import { NextPageWithLayout } from '../../../app/types/next'
import AppTitle from '../../../app/utils/constants/app-title.constant'

const SearchHead = () => {
    const { _searchValue } = useClientUrlParams()
    return <MyHead title={`${AppTitle.SEARCH} ${_searchValue}`} />
}

const SearchCoursesPage: NextPageWithLayout = () => {
    useHideHCatBar()
    return (
        <>
            <SearchHead />
            <ClientPageContainer>
                <Stack spacing={5}>
                    <SearchHeading />
                    <FilterCourses />
                </Stack>
            </ClientPageContainer>
        </>
    )
}

SearchCoursesPage.getLayout = ClientLayout
export default SearchCoursesPage
