import { Heading, Image, Stack } from '@chakra-ui/react'
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
import MainCreateButton from '../../../app/modules/admin/pages/shared/MainCreateButton'
import SliderForm from '../../../app/modules/admin/pages/sliders/forms/SliderForm'
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
import ISlider from '../../../app/modules/shared/interfaces/models/slider.interface'
import { ITableColumn } from '../../../app/modules/shared/interfaces/table-column.interface'
import { ITableRow } from '../../../app/modules/shared/interfaces/table-row.interface'
import { NextPageWithLayout } from '../../../app/types/next'
import AppTitle from '../../../app/utils/constants/app-title.constant'
import { CONTROLLER, MODEL } from '../../../app/utils/constants/app.constant'
import FieldLabel from '../../../app/utils/constants/field-label.constant'
import lan from '../../../app/utils/constants/lan.constant'
import { SLIDER_SEARCH_MENU, SLIDER_STATUS_SELECT_DATA } from '../../../app/utils/data/slider.data'
import Helper from '../../../app/utils/helpers/helper.helper'

// DATA
export const columns: ITableColumn[] = [
    {
        header: 'Name',
        accessor: 'name',
        sortable: true,
    },
    {
        header: 'Status',
        accessor: 'status',
        sortable: true,
    },
    {
        header: 'Description',
        accessor: 'description',
        sortable: false,
        searchable: false,
    },
    {
        header: 'Created at',
        accessor: 'history.createdAt',
        sortable: true,
    },
    {
        header: 'Updated at',
        accessor: 'history.updatedAt',
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
    //
    const filters: FilterItemProps[] = useMemo(() => {
        return [
            {
                field: 'status',
                label: 'Status',
                options: SLIDER_STATUS_SELECT_DATA,
            },
        ]
    }, [])

    // GEN ROWS DATA
    const form = useMemo(() => {
        return <SliderForm />
    }, [])

    const actions = useMemo(() => {
        return [
            <Filter key={1} data={filters} />,
            // <ExportButton key={2} />,
            <MainCreateButton size="5xl" key={3} formComponent={form} />,
        ]
    }, [filters, form])
    return <AdminTableToolbar searchMenu={SLIDER_SEARCH_MENU} actions={actions} />
}

const PageTable = () => {
    const { onShow } = useAppDialog()
    const { onDeleteOne } = useCrudActions()
    const { ctrlName, modelName } = usePageParams()
    const rowsQ = useAdminTableRows<ISlider>(ctrlName)
    const rows: ITableRow[] | undefined = useMemo(() => {
        return rowsQ.data?.map((item) => {
            return {
                _id: item._id,
                name: (
                    <Stack>
                        <Image src={item.picture || ''} alt="" minW={'100px'} />
                        <Heading textAlign={'right'} fontSize={['sm', 'md', 'lg']}>
                            {item.name}
                        </Heading>
                    </Stack>
                ),
                status: <StatusBadge status={item.status as TStatus} />,
                description: item.description,
                'history.createdAt': <Time timestamp={item.history.createdAt} />,
                'history.updatedAt': <Time timestamp={item.history.updatedAt} />,
                actions: (
                    <RowActions
                        actions={[
                            {
                                name: Helper.lodash.capitalize(lan.EDIT),
                                icon: FiEdit2,
                                onClick: () => {
                                    onShow({
                                        title: `${Helper.lodash.upperFirst(
                                            lan.EDIT
                                        )} ${Helper.lodash.upperFirst(modelName)} Detail`,
                                        body: <SliderForm id={item._id} />,
                                        size: '5xl',
                                    })
                                },
                            },
                            {
                                name: Helper.lodash.capitalize(lan.DELETE),
                                icon: FiTrash,
                                onClick: async () => {
                                    onDeleteOne(item._id, item.name)
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
        />
    )
}

// PROVIDERS AND DEFAULT VALUES
const Index: NextPageWithLayout = (query: any) => {
    return (
        <>
            <MyHead title={AppTitle.ADMIN_SLIDERS} />
            <PageParamsProvider
                defaultValue={{
                    ctrlName: CONTROLLER.slider,
                    modelName: MODEL.slider,
                }}
            >
                <AdminUrlParamsProvider
                    defaultValue={{
                        _sortBy: 'history.createdAt',
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
