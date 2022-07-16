import { Stack } from '@chakra-ui/react'
import AdminLayout from '../../../app/modules/admin/AdminLayout'
import PageTitle from '../../../app/modules/admin/components/PageTitle'
import CourseOverview from '../../../app/modules/admin/pages/performance/overview/CourseOverview'
import Card from '../../../app/modules/shared/components/Card'
import MyHead from '../../../app/modules/shared/components/MyHead'
import { NextPageWithLayout } from '../../../app/types/next'
import AppTitle from '../../../app/utils/constants/app-title.constant'

const OverviewPage: NextPageWithLayout = () => {
    return (
        <>
            <MyHead title={AppTitle.ADMIN_OVERVIEW} />
            <Card>
                <Stack>
                    <PageTitle title="Overview" />
                    <CourseOverview />
                </Stack>
            </Card>
        </>
    )
}

OverviewPage.getLayout = AdminLayout
export default OverviewPage
