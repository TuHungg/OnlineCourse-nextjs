import { Alert, AlertIcon, Stack } from '@chakra-ui/react'
import AdminLayout from '../../app/modules/admin/AdminLayout'
import PageTitle from '../../app/modules/admin/components/PageTitle'
import PermissionTable from '../../app/modules/admin/pages/roles/permission-management/PermissionTable'
import PermissionToolbar from '../../app/modules/admin/pages/roles/permission-management/PermissionToolbar/PermissionToolbar'
import AppDialogProvider from '../../app/modules/admin/providers/app-dialog.provider'
import {
    PermissionManagementProvider,
    usePermissionManagement,
} from '../../app/modules/admin/providers/permission-management.provider'
import AppDialog from '../../app/modules/shared/components/AppDialog'
import Card from '../../app/modules/shared/components/Card'
import MyHead from '../../app/modules/shared/components/MyHead'
import { NextPageWithLayout } from '../../app/types/next'
import AppTitle from '../../app/utils/constants/app-title.constant'

const Content = () => {
    const {
        state: { isRuleChanged },
    } = usePermissionManagement()
    return (
        <Card>
            <Stack spacing={4} flexDir="column" alignItems={'stretch'}>
                <PageTitle title={'Rules Management'} mb={{ lg: 4 }} />
                {isRuleChanged && (
                    <Alert status="info">
                        <AlertIcon />
                        Your changes will take 10 minutes to start working properly
                    </Alert>
                )}
                <Stack spacing={4}>
                    <PermissionToolbar />
                    <PermissionTable />
                </Stack>
            </Stack>
        </Card>
    )
}

// PROVIDERS AND DEFAULT VALUES
const PermissionManagementPage: NextPageWithLayout = (query: any) => {
    return (
        <>
            <MyHead title={AppTitle.ADMIN_PERMISSION_MANAGEMENT} />
            <Stack flexDir="column" spacing={5}>
                {/* MAIN TABLE*/}
                <PermissionManagementProvider>
                    <AppDialogProvider>
                        <Content />
                        <AppDialog />
                    </AppDialogProvider>
                </PermissionManagementProvider>
            </Stack>
        </>
    )
}
PermissionManagementPage.getLayout = AdminLayout
export default PermissionManagementPage
