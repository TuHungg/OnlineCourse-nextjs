import { Stack } from '@chakra-ui/react'
import React from 'react'
import ClientLayout from '../../app/modules/client/ClientLayout'
import { useHideHCatBar } from '../../app/modules/client/hooks/hide-h-cat-bar.hook'
import MyCoursesTabs from '../../app/modules/client/pages/MyCourses/MyCoursesTabs'
import { NextPageWithLayout } from '../../app/types/next'

const MyCoursesPage: NextPageWithLayout = () => {
    useHideHCatBar()
    return (
        <Stack w="full">
            <MyCoursesTabs />
        </Stack>
    )
}

MyCoursesPage.getLayout = ClientLayout
export default MyCoursesPage
