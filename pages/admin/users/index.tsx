import { Stack } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { FiEdit2 } from 'react-icons/fi'
import AdminLayout from '../../../app/modules/admin/AdminLayout'
import AdminTable from '../../../app/modules/admin/components/AdminTable/AdminTable'
import AdminTableToolbar from '../../../app/modules/admin/components/AdminTable/AdminTableToolbar'
import Filter from '../../../app/modules/admin/components/Filter/Filter'
import { FilterItemProps } from '../../../app/modules/admin/components/Filter/FilterItem'
import PageTitle from '../../../app/modules/admin/components/PageTitle'
import RoleBadge from '../../../app/modules/admin/components/RoleBadge'
import RowActions from '../../../app/modules/admin/components/RowAction'
import StatusBadge, { TStatus } from '../../../app/modules/admin/components/StatusBadge'
import TdAvatar from '../../../app/modules/admin/components/TdAvatar'
import Time from '../../../app/modules/admin/components/Time'
import MainCreateButton from '../../../app/modules/admin/pages/shared/MainCreateButton'
import UserDetailForm from '../../../app/modules/admin/pages/users/forms/UserDetailForm'
import { AdminPaginationProvider } from '../../../app/modules/admin/providers/admin-pagination-provider'
import { AdminUrlParamsProvider } from '../../../app/modules/admin/providers/admin-query.provider'
import AppDialogProvider, {
    useAppDialog,
} from '../../../app/modules/admin/providers/app-dialog.provider'
import PageParamsProvider, {
    usePageParams,
} from '../../../app/modules/admin/providers/page-params.provider'
import SearchProvider from '../../../app/modules/admin/providers/search.provider'
import { useRoleSelectDataQuery } from '../../../app/modules/admin/queries/role-select-data-query.hook'
import AppDialog from '../../../app/modules/shared/components/AppDialog'
import Card from '../../../app/modules/shared/components/Card'
import MyHead from '../../../app/modules/shared/components/MyHead'
import { useAdminTableRows } from '../../../app/modules/shared/hooks/data/admin-query.hook'
import { useCrudActions } from '../../../app/modules/shared/hooks/data/crud-actions.hook'
import { transformUsers } from '../../../app/modules/shared/hooks/models/user.hook'
import IActionItem from '../../../app/modules/shared/interfaces/action-item.inteface'
import IRole, { TRoleName } from '../../../app/modules/shared/interfaces/models/role.interface'
import { IUser } from '../../../app/modules/shared/interfaces/models/user.interface'
import { ITableColumn } from '../../../app/modules/shared/interfaces/table-column.interface'
import { ITableRow } from '../../../app/modules/shared/interfaces/table-row.interface'
import { NextPageWithLayout } from '../../../app/types/next'
import AppTitle from '../../../app/utils/constants/app-title.constant'
import { CONTROLLER, MODEL } from '../../../app/utils/constants/app.constant'
import FieldLabel from '../../../app/utils/constants/field-label.constant'
import lan from '../../../app/utils/constants/lan.constant'
import { USER_SEARCH_MENU, USER_STATUS_SELECT_DATA } from '../../../app/utils/data/user.data'
import Helper from '../../../app/utils/helpers/helper.helper'

// DATA
export const columns: ITableColumn[] = [
    {
        header: FieldLabel['user.name'],
        accessor: 'profile.fullName',
        sortable: true,
    },
    {
        header: FieldLabel['user.email'],
        accessor: 'email',
        sortable: true,
        searchable: true,
    },
    {
        header: FieldLabel['user.status'],
        accessor: 'status',
        sortable: true,
    },
    {
        header: FieldLabel['user.role'],
        accessor: 'role.name',
        sortable: true,
    },
    {
        header: FieldLabel['user.createdAt'],
        accessor: 'createdAt',
        sortable: true,
    },
    {
        header: 'Last loggon',
        accessor: 'lastLoggon',
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
    const rolesSDQ = useRoleSelectDataQuery()
    //
    const filters: FilterItemProps[] = useMemo(() => {
        return [
            {
                field: 'status',
                label: FieldLabel['user.status'],
                options: USER_STATUS_SELECT_DATA,
            },
            {
                field: 'role._id',
                label: FieldLabel['user.role'],
                options: rolesSDQ.data,
            },
        ]
    }, [rolesSDQ.data])

    // GEN ROWS DATA
    const form = useMemo(() => {
        return <UserDetailForm />
    }, [])

    const actions = useMemo(() => {
        return [
            <Filter key={1} data={filters} />,
            // <ExportButton key={2} />,
            <MainCreateButton key={3} formComponent={form} />,
        ]
    }, [filters, form])
    return <AdminTableToolbar searchMenu={USER_SEARCH_MENU} actions={actions} />
}

const PageTable = () => {
    const { onShow } = useAppDialog()
    const { onDeactivate, onReactivate } = useCrudActions()
    const { ctrlName, modelName } = usePageParams()
    const rowsQ = useAdminTableRows<IUser>(ctrlName, { select: transformUsers })
    const rows: ITableRow[] | undefined = useMemo(() => {
        return rowsQ.data?.map((item) => {
            const rowActions: IActionItem[] = [
                {
                    name: Helper.lodash.capitalize(lan.EDIT),
                    icon: FiEdit2,
                    onClick: () => {
                        onShow({
                            title: `${Helper.lodash.upperFirst(
                                lan.EDIT
                            )} ${Helper.lodash.upperFirst(modelName)} Detail`,
                            body: <UserDetailForm userId={item._id} />,
                            size: '2xl',
                        })
                    },
                },
            ]
            if (['active', 'inactive'].includes(item.status)) {
                rowActions.push({
                    name: Helper.lodash.capitalize(
                        item.status == 'active' ? lan.DEACTIVATE : lan.REACTIVATE
                    ),
                    onClick: async () => {
                        if (item.status == 'active') onDeactivate(item._id, item.profile.fullName)
                        else onReactivate(item._id, item.profile.fullName)
                    },
                })
            }

            return {
                _id: item._id,
                'profile.fullName': (
                    <TdAvatar
                        alt={item.profile.fullName || ''}
                        title={item.profile.fullName || ''}
                        thumbSize="md"
                        thumb={item.profile.avatar || ''}
                        field={'profile.fullName'}
                        searchFields={['profile.fullName']}
                    />
                ),
                email: item.email,
                status: <StatusBadge status={item.status as TStatus} />,
                'role.name': <RoleBadge role={(item.role as IRole).name as TRoleName} />,
                createdAt: <Time timestamp={item.createdAt} />,
                lastLoggon: <Time timestamp={item.lastLoggon} />,
                actions: <RowActions actions={rowActions} />,
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rowsQ.data])
    return (
        <AdminTable
            hasMultiChange={false}
            isLoading={rowsQ.isLoading}
            isError={rowsQ.isError}
            columns={columns}
            rows={rows}
        />
    )
}

// PROVIDERS AND DEFAULT VALUES
const Index: NextPageWithLayout = (query: any) => {
    return (
        <>
            <MyHead title={AppTitle.ADMIN_USERS} />
            <PageParamsProvider
                defaultValue={{
                    ctrlName: CONTROLLER.user,
                    modelName: MODEL.user,
                }}
            >
                <AdminUrlParamsProvider
                    defaultValue={{
                        _sortBy: 'createdAt',
                        _order: 'desc',
                        _limit: 5,
                        ...query,
                    }}
                >
                    <AdminPaginationProvider
                        params={{
                            itemsPerPage: 5,
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
