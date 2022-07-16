import { Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import { FiTrash } from 'react-icons/fi'
import AdminLayout from '../../../app/modules/admin/AdminLayout'
import AdminHighlightSearchText from '../../../app/modules/admin/components/AdminHighlightSearchText'
import AdminTable from '../../../app/modules/admin/components/AdminTable/AdminTable'
import AdminTableToolbar from '../../../app/modules/admin/components/AdminTable/AdminTableToolbar'
import Filter from '../../../app/modules/admin/components/Filter/Filter'
import { FilterItemProps } from '../../../app/modules/admin/components/Filter/FilterItem'
import PageTitle from '../../../app/modules/admin/components/PageTitle'
import RowActions from '../../../app/modules/admin/components/RowAction'
import StatusBadge, { TStatus } from '../../../app/modules/admin/components/StatusBadge'
import Time from '../../../app/modules/admin/components/Time'
import RoleForm from '../../../app/modules/admin/pages/roles/forms/RoleForm'
import ViewPermissionTable from '../../../app/modules/admin/pages/roles/permission-management/ViewPermisisonTable/ViewPermissionTable'
import MainCreateButton from '../../../app/modules/admin/pages/shared/MainCreateButton'
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
import IRole from '../../../app/modules/shared/interfaces/models/role.interface'
import { ITableColumn } from '../../../app/modules/shared/interfaces/table-column.interface'
import { ITableRow } from '../../../app/modules/shared/interfaces/table-row.interface'
import { NextPageWithLayout } from '../../../app/types/next'
import AppIcon from '../../../app/utils/constants/app-icon.constant'
import AppTitle from '../../../app/utils/constants/app-title.constant'
import { CONTROLLER, MODEL } from '../../../app/utils/constants/app.constant'
import FieldLabel from '../../../app/utils/constants/field-label.constant'
import lan from '../../../app/utils/constants/lan.constant'
import { ROLE_SEARCH_MENU, ROLE_STATUS_SELECT_DATA } from '../../../app/utils/data/role.data'
import Helper from '../../../app/utils/helpers/helper.helper'
import PathHelper from '../../../app/utils/helpers/path.helper'

// DATA
export const columns: ITableColumn[] = [
    {
        header: 'Name',
        accessor: 'name',
        sortable: true,
    },
    {
        header: 'status',
        accessor: 'status',
        sortable: true,
    },
    {
        header: 'description',
        accessor: 'description',
        sortable: false,
        sx: { whiteSpace: 'normal' },
    },
    {
        header: 'Created at',
        accessor: 'createdAt',
        sortable: true,
    },
    {
        header: FieldLabel.actions,
        accessor: 'actions',
    },
]

// PAGE CONTENT
const PageContent = () => {
    const { modelName } = usePageParams()

    return (
        <Stack flexDir="column" spacing={10}>
            {/* MAIN TABLE*/}
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
        </Stack>
    )
}

const PageTableToolbar = () => {
    const router = useRouter()
    const { ctrlName } = usePageParams()
    //
    const filters: FilterItemProps[] = useMemo(() => {
        return [
            {
                field: 'status',
                label: FieldLabel['user.status'],
                options: ROLE_STATUS_SELECT_DATA,
            },
            // {
            //     field: 'role._id',
            //     label: FieldLabel['user.role'],
            //     options: rolesSDQ.data
            // },
        ]
    }, [])

    const form = useMemo(() => {
        return <RoleForm />
    }, [])

    // GEN ROWS DATA
    const actions = useMemo(() => {
        return [
            <Filter key={1} data={filters} />,
            // <ExportButton key={2} />,
            <MainCreateButton key={3} formComponent={form} />,
        ]
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ctrlName, filters, router])
    return <AdminTableToolbar searchMenu={ROLE_SEARCH_MENU} actions={actions} />
}

const PageTable = () => {
    const { onShow } = useAppDialog()
    const { onDeleteOne } = useCrudActions()
    const { ctrlName, modelName } = usePageParams()
    const rowsQ = useAdminTableRows<IRole>(ctrlName)
    const rows: ITableRow[] | undefined = useMemo(() => {
        return rowsQ.data?.map((item) => {
            return {
                _id: item._id,
                name: <AdminHighlightSearchText value={item.name + ''} fields={['name']} />,
                status: <StatusBadge status={item.status as TStatus} />,
                description: <Text> {item.description}</Text>,
                createdAt: <Time timestamp={item.createdAt} />,
                actions: (
                    <RowActions
                        actions={[
                            {
                                name: Helper.lodash.capitalize(lan.VIEW_PERMISSIONS),
                                icon: AppIcon.view,
                                onClick: () => {
                                    onShow({
                                        title: item.name + ' Permissions',
                                        body: <ViewPermissionTable roleId={item._id} />,
                                        size: '6xl',
                                    })
                                },
                            },
                            {
                                name: Helper.lodash.capitalize(lan.SET_PERMISSIONS),
                                icon: AppIcon.setPermission,
                                path: PathHelper.getSetPermissionPath(item._id),
                            },

                            {
                                name: Helper.lodash.capitalize(lan.EDIT),
                                icon: AppIcon.edit,
                                onClick: () => {
                                    onShow({
                                        title: `${Helper.lodash.upperFirst(
                                            lan.EDIT
                                        )} ${Helper.lodash.upperFirst(modelName)}`,
                                        body: <RoleForm id={item._id} />,
                                        size: '2xl',
                                    })
                                },
                            },
                            {
                                name: Helper.lodash.capitalize(lan.DELETE),
                                icon: FiTrash,
                                onClick: async () => {
                                    onDeleteOne(item._id, item.name + '', {
                                        deletionValidate: true,
                                    })
                                },
                            },
                        ]}
                    />
                ),
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rowsQ.data])
    return (
        <AdminTable
            isLoading={rowsQ.isLoading}
            isError={rowsQ.isError}
            columns={columns}
            rows={rows}
            hasMultiChange={false}
        />
    )
}

// PROVIDERS AND DEFAULT VALUES
const Index: NextPageWithLayout = (query: any) => {
    return (
        <>
            <MyHead title={AppTitle.ADMIN_ROLES} />
            <PageParamsProvider
                defaultValue={{
                    ctrlName: CONTROLLER.role,
                    modelName: MODEL.role,
                }}
            >
                <AdminUrlParamsProvider
                    defaultValue={{
                        _sortBy: 'createdAt',
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
                        <SearchProvider defaultField={'all'}>
                            <AppDialogProvider>
                                <PageContent />
                                <AppDialog />
                            </AppDialogProvider>
                        </SearchProvider>
                    </AdminPaginationProvider>
                </AdminUrlParamsProvider>
            </PageParamsProvider>
        </>
    )
}

Index.getLayout = AdminLayout
export default Index
