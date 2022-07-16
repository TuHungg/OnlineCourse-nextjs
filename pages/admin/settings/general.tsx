import { Stack } from '@chakra-ui/react'
import AdminLayout from '../../../app/modules/admin/AdminLayout'
import InstructorCommissionForm from '../../../app/modules/admin/pages/settings/generals/InstructorComissionForm'
import PriceTiersForm from '../../../app/modules/admin/pages/settings/generals/PriceTiersForm'
import Card from '../../../app/modules/shared/components/Card'
import MyHead from '../../../app/modules/shared/components/MyHead'
import { NextPageWithLayout } from '../../../app/types/next'
import AppTitle from '../../../app/utils/constants/app-title.constant'

const GeneralPage: NextPageWithLayout = () => {
    return (
        <>
            <MyHead title={AppTitle.ADMIN_SETTING_GENERAL} />
            <Stack spacing={2} flexDir="column" alignItems={'stretch'}>
                {/* <PageTitle title={'General Settings'} mb={{ lg: 4 }} /> */}
                <Stack spacing={5}>
                    <Card>
                        <PriceTiersForm />
                    </Card>
                    <Card>
                        <InstructorCommissionForm />
                    </Card>
                </Stack>
            </Stack>
        </>
    )
}

GeneralPage.getLayout = AdminLayout

export default GeneralPage
