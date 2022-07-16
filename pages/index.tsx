import { Box, Stack } from '@chakra-ui/react'
import React from 'react'
import ClientLayout from '../app/modules/client/ClientLayout'
import ClientPageContainer from '../app/modules/client/components/ClientPageContainer'
import HighestRatingCoursesGroup from '../app/modules/client/pages/HomePage/HighestRatingCoursesGroup'
import HomeIntro from '../app/modules/client/pages/HomePage/HomeIntro'
import LatestCoursesGroup from '../app/modules/client/pages/HomePage/LatestCoursesGroup'
import MostPopularCoursesGroup from '../app/modules/client/pages/HomePage/MostPopularCoursesGroup'
import MyHead from '../app/modules/shared/components/MyHead'
import { NextPageWithLayout } from '../app/types/next'
import { APP_NAME } from '../app/utils/constants/app.constant'
// code somthing...

const HomePage: NextPageWithLayout = () => {
    return (
        <>
            <MyHead title={APP_NAME} ogBasics={{ title: APP_NAME, path: '' }} />
            <Box>
                <HomeIntro />
                <ClientPageContainer px={['5px', '16px']}>
                    <Stack spacing={[4, 8, 10]}>
                        <LatestCoursesGroup />
                        <MostPopularCoursesGroup />
                        <HighestRatingCoursesGroup />
                    </Stack>
                </ClientPageContainer>
            </Box>
        </>
    )
}
HomePage.getLayout = ClientLayout
export default HomePage
