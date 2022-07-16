import { Stack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import AdminLayout from '../../../../app/modules/admin/AdminLayout'
import AdminTable from '../../../../app/modules/admin/components/AdminTable/AdminTable'
import AdminTableToolbar from '../../../../app/modules/admin/components/AdminTable/AdminTableToolbar'
import PageTitle from '../../../../app/modules/admin/components/PageTitle'
import RowActions from '../../../../app/modules/admin/components/RowAction'
import TdAvatar from '../../../../app/modules/admin/components/TdAvatar'
import Time from '../../../../app/modules/admin/components/Time'
import { AdminPaginationProvider } from '../../../../app/modules/admin/providers/admin-pagination-provider'
import { AdminUrlParamsProvider } from '../../../../app/modules/admin/providers/admin-query.provider'
import PageParamsProvider, {
    usePageParams,
} from '../../../../app/modules/admin/providers/page-params.provider'
import SearchProvider from '../../../../app/modules/admin/providers/search.provider'
import Card from '../../../../app/modules/shared/components/Card'
import MyHead from '../../../../app/modules/shared/components/MyHead'
import Price from '../../../../app/modules/shared/components/Price'
import { useAdminTableRows } from '../../../../app/modules/shared/hooks/data/admin-query.hook'
import { useCrudActions } from '../../../../app/modules/shared/hooks/data/crud-actions.hook'
import IOrder from '../../../../app/modules/shared/interfaces/models/order.interface'
import { ITableColumn } from '../../../../app/modules/shared/interfaces/table-column.interface'
import { ITableRow } from '../../../../app/modules/shared/interfaces/table-row.interface'
import { NextPageWithLayout } from '../../../../app/types/next'
import AppTitle from '../../../../app/utils/constants/app-title.constant'
import { CONTROLLER, MODEL } from '../../../../app/utils/constants/app.constant'
import FieldLabel from '../../../../app/utils/constants/field-label.constant'
import { ORDER_SEARCH_MENU } from '../../../../app/utils/data/order.data'
import Helper from '../../../../app/utils/helpers/helper.helper'
import PathHelper from '../../../../app/utils/helpers/path.helper'

// DATA
export const columns: ITableColumn[] = [
    {
        header: 'Order Id',
        accessor: '_id',
        sortable: false,
    },
    {
        header: 'Customer',
        accessor: 'history.createdBy.profile.fullName',
        sortable: true,
    },
    {
        header: 'Total',
        accessor: 'totalPrice',
        sortable: true,
    },
    {
        header: FieldLabel['course.createdAt'],
        accessor: 'history.createdAt',
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
    // const filters: FilterItemProps[] = useMemo(() => {
    //     return [
    //         {
    //             field: 'status',
    //             label: FieldLabel['user.status'],
    //             options: COURSE_STATUS_SELECT_DATA,
    //         },
    //         // {
    //         //     field: 'role._id',
    //         //     label: FieldLabel['user.role'],
    //         //     options: rolesSDQ.data
    //         // },
    //     ]
    // }, [])

    // GEN ROWS DATA
    const actions = useMemo(() => {
        return [
            // <Filter key={1} data={[]} />,
            // <ExportButton key={2} />,
            // <MainCreateButton onClick={() => onNew('admin')} key={3} />,
        ]
    }, [])
    return <AdminTableToolbar searchMenu={ORDER_SEARCH_MENU} />
}

const PageTable = () => {
    const router = useRouter()
    const { onDeleteOne } = useCrudActions()
    const { ctrlName, modelName } = usePageParams()
    const rowsQ = useAdminTableRows<IOrder>(ctrlName)
    const rows: ITableRow[] | undefined = useMemo(() => {
        return rowsQ.data?.map((item) => {
            const customer = item.history.createdBy
            return {
                _id: item._id,
                'history.createdBy.profile.fullName': (
                    <TdAvatar
                        alt={customer.profile.fullName || ''}
                        title={customer.profile.fullName || ''}
                        subtitle={customer.email}
                        thumbSize="md"
                        thumb={customer.profile.avatar || ''}
                        field={'history.createdBy.profile.fullName'}
                        searchFields={[
                            'history.createdBy.profile.fullName',
                            'history.createdBy.email',
                        ]}
                    />
                ),
                totalPrice: <Price value={item.totalPrice} />,
                'history.createdAt': <Time timestamp={item.history.createdAt} />,
                actions: (
                    <RowActions
                        actions={[
                            {
                                name: 'View Detail',
                                path: PathHelper.getAdminOrdersPath(item._id),
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
            <MyHead title={AppTitle.ADMIN_ORDERS} />
            <PageParamsProvider
                defaultValue={{
                    ctrlName: CONTROLLER.order,
                    modelName: MODEL.order,
                }}
            >
                <AdminUrlParamsProvider
                    defaultValue={{
                        _sortBy: 'history.createdAt',
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
                            <PageContent />
                        </SearchProvider>
                    </AdminPaginationProvider>
                </AdminUrlParamsProvider>
            </PageParamsProvider>
        </>
    )
}

Index.getLayout = AdminLayout
export default Index
