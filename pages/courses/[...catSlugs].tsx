import { Heading, Skeleton, Stack } from '@chakra-ui/react'
import ClientLayout from '../../app/modules/client/ClientLayout'
import ClientPageContainer from '../../app/modules/client/components/ClientPageContainer'
import FilterCourses from '../../app/modules/client/pages/shared/FilterCourses/FilterCourses'
import { useCatDetailQuery } from '../../app/modules/client/queries/cat-detail-query.hook'
import MyHead from '../../app/modules/shared/components/MyHead'
import { NextPageWithLayout } from '../../app/types/next'
import Helper from '../../app/utils/helpers/helper.helper'

const CategoryPage: NextPageWithLayout = () => {
    const { data, isLoading } = useCatDetailQuery()
    return (
        <>
            <MyHead title={data?.name} />
            <ClientPageContainer>
                <Stack spacing={10}>
                    {/* HEADING */}
                    <Skeleton isLoaded={!isLoading} w="fit-content">
                        <Heading>{Helper.lodash.startCase(data?.name)} Courses</Heading>
                    </Skeleton>
                    <FilterCourses />
                </Stack>
            </ClientPageContainer>
        </>
    )
}

CategoryPage.getLayout = ClientLayout
export default CategoryPage
