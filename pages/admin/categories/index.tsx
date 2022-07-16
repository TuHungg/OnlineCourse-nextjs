import { GridItem, SimpleGrid, Stack } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { FiEdit2, FiTrash } from 'react-icons/fi'
import AdminLayout from '../../../app/modules/admin/AdminLayout'
import AdminTable from '../../../app/modules/admin/components/AdminTable/AdminTable'
import AdminTableToolbar from '../../../app/modules/admin/components/AdminTable/AdminTableToolbar'
import Filter from '../../../app/modules/admin/components/Filter/Filter'
import { FilterItemProps } from '../../../app/modules/admin/components/Filter/FilterItem'
import PageTitle from '../../../app/modules/admin/components/PageTitle'
import RowActions from '../../../app/modules/admin/components/RowAction'
import StatusBadge, { TStatus } from '../../../app/modules/admin/components/StatusBadge'
import Time from '../../../app/modules/admin/components/Time'
import {
    FormParamsProvider,
    useFormParams,
} from '../../../app/modules/admin/hooks/form-params-provider'
import CategoryForm from '../../../app/modules/admin/pages/categories/CategoryForm'
import { AdminPaginationProvider } from '../../../app/modules/admin/providers/admin-pagination-provider'
import { AdminUrlParamsProvider } from '../../../app/modules/admin/providers/admin-query.provider'
import PageParamsProvider, {
    usePageParams,
} from '../../../app/modules/admin/providers/page-params.provider'
import SearchProvider from '../../../app/modules/admin/providers/search.provider'
import Card from '../../../app/modules/shared/components/Card'
import MyHead from '../../../app/modules/shared/components/MyHead'
import { useAdminTableRows } from '../../../app/modules/shared/hooks/data/admin-query.hook'
import { useCrudActions } from '../../../app/modules/shared/hooks/data/crud-actions.hook'
import { ICategory } from '../../../app/modules/shared/interfaces/models/category.interface'
import { ITableColumn } from '../../../app/modules/shared/interfaces/table-column.interface'
import { ITableRow } from '../../../app/modules/shared/interfaces/table-row.interface'
import { NextPageWithLayout } from '../../../app/types/next'
import AppTitle from '../../../app/utils/constants/app-title.constant'
import { CONTROLLER, MODEL } from '../../../app/utils/constants/app.constant'
import FieldLabel from '../../../app/utils/constants/field-label.constant'
import lan from '../../../app/utils/constants/lan.constant'
import {
    CATEGORY_SEARCH_MENU,
    CATEGORY_STATUS_SELECT_DATA,
} from '../../../app/utils/data/category.data'
import Helper from '../../../app/utils/helpers/helper.helper'
import TypeHelper from '../../../app/utils/helpers/type.helper'

// DATA
export const columns: ITableColumn[] = [
    {
        header: 'Name',
        accessor: 'name',
        sortable: true,
        searchable: true,
    },
    {
        header: 'Parent',
        accessor: 'parent.name',
        sortable: true,
    },
    {
        header: 'status',
        accessor: 'status',
        sortable: true,
    },
    {
        header: 'Created At',
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
        <Stack flexDir="column">
            {/* MAIN TABLE*/}
            <Card>
                <FormParamsProvider>
                    <SimpleGrid columns={12} spacing={{ base: 8, md: 4 }}>
                        <GridItem colSpan={{ base: 12, md: 4, lg: 3 }}>
                            <CategoryForm />
                        </GridItem>
                        <GridItem colSpan={{ base: 12, md: 8, lg: 9 }}>
                            <Stack spacing={2} flexDir="column" alignItems={'stretch'}>
                                <PageTitle
                                    title={Helper.lodash.capitalize(
                                        Helper.pluralize.plural(modelName)
                                    )}
                                />
                                <PageTableToolbar />
                                <PageTable />
                            </Stack>
                        </GridItem>
                    </SimpleGrid>
                </FormParamsProvider>
            </Card>
        </Stack>
    )
}

const PageTableToolbar = () => {
    const filters: FilterItemProps[] = useMemo(() => {
        return [
            {
                field: 'status',
                label: 'Status',
                options: CATEGORY_STATUS_SELECT_DATA,
            },
        ]
    }, [])

    // GEN ROWS DATA
    // const form = useMemo(() => {
    //     return <UserDetailForm />;
    // }, []);

    const actions = useMemo(() => {
        return [
            <Filter key={1} data={filters} />,
            // <ExportButton key={2} />,
            // <MainCreateButton key={3} formComponent={form} />,
        ]
    }, [filters])
    return <AdminTableToolbar searchMenu={CATEGORY_SEARCH_MENU} actions={actions} />
}

const PageTable = () => {
    const {
        methods: { setEditingId },
    } = useFormParams()
    const { onDeleteOne } = useCrudActions()
    const { ctrlName } = usePageParams()
    const rowsQ = useAdminTableRows<ICategory>(ctrlName)
    const rows: ITableRow[] | undefined = useMemo(() => {
        return rowsQ.data?.map((item) => {
            return {
                _id: item._id,
                name: item.name,
                'parent.name': TypeHelper.isCategory(item.parent) ? item.parent.name : '(none)',
                status: <StatusBadge status={item.status as TStatus} />,
                createdAt: <Time timestamp={item.history.createdAt} />,
                actions: (
                    <RowActions
                        actions={[
                            {
                                name: Helper.lodash.capitalize(lan.EDIT),
                                icon: FiEdit2,
                                onClick: () => {
                                    setEditingId(item._id)
                                },
                            },
                            {
                                name: Helper.lodash.capitalize(lan.DELETE),
                                icon: FiTrash,
                                onClick: async () => {
                                    onDeleteOne(item._id, item.name, {
                                        deletionValidate: true,
                                        referenceType: 'categories',
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
            <MyHead title={AppTitle.ADMIN_CATEGORIES} />
            <PageParamsProvider
                defaultValue={{
                    ctrlName: CONTROLLER.category,
                    modelName: MODEL.category,
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
