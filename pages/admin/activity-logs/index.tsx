import { Box, Stack } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import AdminLayout from '../../../app/modules/admin/AdminLayout'
import AdminHighlightSearchText from '../../../app/modules/admin/components/AdminHighlightSearchText'
import AdminTable from '../../../app/modules/admin/components/AdminTable/AdminTable'
import AdminTableToolbar from '../../../app/modules/admin/components/AdminTable/AdminTableToolbar'
import PageTitle from '../../../app/modules/admin/components/PageTitle'
import TdAvatar from '../../../app/modules/admin/components/TdAvatar'
import Time from '../../../app/modules/admin/components/Time'
import ClientInfo from '../../../app/modules/admin/pages/activity-logs/ClientInfo'
import DeviceInfo from '../../../app/modules/admin/pages/activity-logs/DeviceInfo'
import GeolocationInfo from '../../../app/modules/admin/pages/activity-logs/GeolocationInfo'
import OsInfo from '../../../app/modules/admin/pages/activity-logs/OsInfo'
import { AdminPaginationProvider } from '../../../app/modules/admin/providers/admin-pagination-provider'
import { AdminUrlParamsProvider } from '../../../app/modules/admin/providers/admin-query.provider'
import AppDialogProvider, {
    useAppDialog,
} from '../../../app/modules/admin/providers/app-dialog.provider'
import PageParamsProvider, {
    usePageParams,
} from '../../../app/modules/admin/providers/page-params.provider'
import SearchProvider from '../../../app/modules/admin/providers/search.provider'
import AppDialog from '../../../app/modules/shared/components/AppDialog'
import Card from '../../../app/modules/shared/components/Card'
import MyHead from '../../../app/modules/shared/components/MyHead'
import { useAdminTableRows } from '../../../app/modules/shared/hooks/data/admin-query.hook'
import { useCrudActions } from '../../../app/modules/shared/hooks/data/crud-actions.hook'
import { IActivityLog } from '../../../app/modules/shared/interfaces/models/activity-log.interface'
import { ITableColumn } from '../../../app/modules/shared/interfaces/table-column.interface'
import { ITableRow } from '../../../app/modules/shared/interfaces/table-row.interface'
import { NextPageWithLayout } from '../../../app/types/next'
import AppTitle from '../../../app/utils/constants/app-title.constant'
import { CONTROLLER, MODEL } from '../../../app/utils/constants/app.constant'
import { ACTIVITY_LOGS_SEARCH_MENU } from '../../../app/utils/data/activity-logs.data'
import Helper from '../../../app/utils/helpers/helper.helper'

// DATA
export const columns: ITableColumn[] = [
    {
        header: 'Viewer info',
        accessor: 'user.profile.fullName',
        sortable: true,
        searchable: true,
    },
    {
        header: 'Route',
        accessor: 'content',
        sortable: true,
    },
    {
        header: 'Device',
        accessor: 'device',
    },
    {
        header: 'Client',
        accessor: 'client',
    },
    {
        header: 'Os',
        accessor: 'os',
    },
    {
        header: 'Geolocation',
        accessor: 'geolocation',
    },
    {
        header: 'Timestamp',
        accessor: 'timestamp',
        sortable: true,
    },
]

// PAGE CONTENT
const PageContent = () => {
    const { modelName } = usePageParams()

    return (
        <Card>
            <Stack spacing={2} flexDir="column" alignItems={'stretch'}>
                <PageTitle
                    title={Helper.lodash.capitalize(Helper.pluralize.plural(modelName))}
                    mb={{ lg: 4 }}
                />
                <PageTableToolbar />
                <PageTable />
            </Stack>
        </Card>
    )
}

const PageTableToolbar = () => {
    return <AdminTableToolbar searchMenu={ACTIVITY_LOGS_SEARCH_MENU} />
}

const PageTable = () => {
    const { onShow } = useAppDialog()
    const { onDeleteOne } = useCrudActions()
    const { ctrlName, modelName } = usePageParams()
    const rowsQ = useAdminTableRows<IActivityLog>(ctrlName)
    const rows: ITableRow[] | undefined = useMemo(() => {
        return rowsQ.data?.map((item) => {
            return {
                _id: item._id,
                'user.profile.fullName': (
                    <TdAvatar
                        alt={item.user?.profile.fullName || ''}
                        title={item.user?.profile.fullName || ''}
                        subtitle={item.user?.email}
                        thumbSize="md"
                        thumb={item.user?.profile.avatar || ''}
                        field={'user.profile.fullName'}
                        searchFields={['user.profile.fullName', 'user.email']}
                    />
                ),
                device: <DeviceInfo activityLog={item} />,
                client: <ClientInfo activityLog={item} />,
                os: <OsInfo activityLog={item} />,
                geolocation: <GeolocationInfo activityLog={item} />,
                content: (
                    <AdminHighlightSearchText
                        title={item.content}
                        maxW={'220px'}
                        display={'inline-block'}
                        fields={['content']}
                        whiteSpace="initial"
                        value={item.content}
                        noOfLines={3}
                    />
                ),
                timestamp: <Time timestamp={item.timestamp} type="long" />,
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rowsQ.data])
    return (
        <Box fontSize={'sm'}>
            <AdminTable
                isLoading={rowsQ.isLoading}
                isError={rowsQ.isError}
                columns={columns}
                rows={rows}
            />
        </Box>
    )
}

// PROVIDERS AND DEFAULT VALUES
const Index: NextPageWithLayout = (query: any) => {
    return (
        <>
            <MyHead title={AppTitle.ADMIN_ACTIVITY_LOGS} />
            <PageParamsProvider
                defaultValue={{
                    ctrlName: CONTROLLER['activity log'],
                    modelName: MODEL['activity log'],
                }}
            >
                <AdminUrlParamsProvider
                    defaultValue={{
                        _sortBy: 'timestamp',
                        _order: 'desc',
                        _limit: 10,
                        ...query,
                    }}
                >
                    <AdminPaginationProvider
                        params={{
                            itemsPerPage: 10,
                            pageRange: 3,
                            totalItems: 0,
                        }}
                    >
                        <AppDialogProvider>
                            <SearchProvider defaultField={'all'}>
                                <PageContent />
                                <AppDialog />
                            </SearchProvider>
                        </AppDialogProvider>
                    </AdminPaginationProvider>
                </AdminUrlParamsProvider>
            </PageParamsProvider>
        </>
    )
}

Index.getLayout = AdminLayout
export default Index
