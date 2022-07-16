import { Stack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import NumberFormat from 'react-number-format'
import AdminLayout from '../../../app/modules/admin/AdminLayout'
import AdminHighlightSearchText from '../../../app/modules/admin/components/AdminHighlightSearchText'
import AdminTable from '../../../app/modules/admin/components/AdminTable/AdminTable'
import AdminTableToolbar from '../../../app/modules/admin/components/AdminTable/AdminTableToolbar'
import PageTitle from '../../../app/modules/admin/components/PageTitle'
import RowActions from '../../../app/modules/admin/components/RowAction'
import { SearchItem } from '../../../app/modules/admin/components/Search'
import StatusBadge, { TStatus } from '../../../app/modules/admin/components/StatusBadge'
import Time from '../../../app/modules/admin/components/Time'
import CourseOverview from '../../../app/modules/admin/pages/performance/overview/CourseOverview'
import {
    AdminUrlParamsProvider,
    useAdminUrlParams,
} from '../../../app/modules/admin/providers/admin-query.provider'
import AppDialogProvider, {
    useAppDialog,
} from '../../../app/modules/admin/providers/app-dialog.provider'
import SearchProvider from '../../../app/modules/admin/providers/search.provider'
import {
    useActiveCoursesQuery,
    useCountActiveCoursesQuery,
} from '../../../app/modules/admin/queries/active-courses-query.hook'
import AppDialog from '../../../app/modules/shared/components/AppDialog'
import Card from '../../../app/modules/shared/components/Card'
import MyHead from '../../../app/modules/shared/components/MyHead'
import NextLink from '../../../app/modules/shared/components/NextLink'
import Pagination from '../../../app/modules/shared/components/Pagination/Pagination'
import Price from '../../../app/modules/shared/components/Price'
import { ITableColumn } from '../../../app/modules/shared/interfaces/table-column.interface'
import { ITableRow } from '../../../app/modules/shared/interfaces/table-row.interface'
import { NextPageWithLayout } from '../../../app/types/next'
import AppIcon from '../../../app/utils/constants/app-icon.constant'
import AppTitle from '../../../app/utils/constants/app-title.constant'
import FieldLabel from '../../../app/utils/constants/field-label.constant'
import PathHelper from '../../../app/utils/helpers/path.helper'

const COURSE_SEARCH_MENU: SearchItem[] = [
    {
        title: FieldLabel['course.title'],
        field: 'basicInfo.title',
    },
    {
        title: 'Instructor',
        field: 'history.createdBy.profile.fullName',
    },
]

// DATA
export const columns: ITableColumn[] = [
    {
        header: FieldLabel['course.title'],
        accessor: 'basicInfo.title',
        sortable: true,
        searchable: true,
        minW: '300px',
    },
    {
        header: FieldLabel['course.status'],
        accessor: 'status',
        sortable: false,
        searchable: false,
    },
    {
        header: 'Total sales',
        accessor: 'totalSales',
        sortable: true,
        searchable: false,
    },
    {
        header: 'Students',
        accessor: 'numStudent',
        sortable: true,
        searchable: false,
    },
    {
        header: 'Course rating',
        accessor: 'meta.avgRatingScore',
        sortable: true,
        searchable: false,
    },
    {
        header: 'published at',
        accessor: 'history.publishedAt',
        sortable: true,
        searchable: false,
    },
    {
        header: 'Instructor',
        accessor: 'history.createdBy',
        sortable: false,
        searchable: false,
    },
    {
        header: FieldLabel.actions,
        accessor: 'actions',
    },
]

// PAGE CONTENT
const PageContent = () => {
    return (
        <Stack flexDir="column" spacing={10}>
            {/* MAIN TABLE*/}
            <Card>
                <Stack spacing={2} flexDir="column" alignItems={'stretch'}>
                    <PageTitle title={'Active Courses'} mb={{ lg: 4 }} />
                    <PageTableToolbar />
                    <PageTable />
                </Stack>
            </Card>
        </Stack>
    )
}

const PageTableToolbar = () => {
    return <AdminTableToolbar searchMenu={COURSE_SEARCH_MENU} />
}

const ITEMS_PER_PAGE = 10
const ActiveCoursesPagination = () => {
    const query = useAdminUrlParams()
    const { data: totalItems = 0 } = useCountActiveCoursesQuery(query)
    const { _limit = ITEMS_PER_PAGE } = query
    const totalPage = totalItems > 0 ? Math.ceil(totalItems / _limit) : 0
    if (totalPage < 2) return <></>
    return (
        <Pagination
            scroll={true}
            colorScheme={'purple'}
            pagination={{
                itemsPerPage: _limit,
                pageRange: 3,
                totalItems,
                currentPage: query._page,
            }}
        />
    )
}

const PageTable = () => {
    const router = useRouter()
    const { onShow } = useAppDialog()
    const { isLoading, isError, data } = useActiveCoursesQuery()
    const rows: ITableRow[] | undefined = useMemo(() => {
        return data?.map((item) => {
            return {
                _id: item._id,
                'basicInfo.title': (
                    <NextLink href={PathHelper.getCourseDetailPath(item.basicInfo.slug)}>
                        <AdminHighlightSearchText
                            value={item.basicInfo.title}
                            fields={['basicInfo.title']}
                        />
                    </NextLink>
                ),
                status: <StatusBadge status={item.status as TStatus} />,
                totalSales: <Price value={item.totalSales} />,
                numStudent: item.numStudent,
                'meta.avgRatingScore': (
                    <NumberFormat
                        displayType="text"
                        value={item.meta.avgRatingScore}
                        decimalScale={1}
                    />
                ),
                'history.publishedAt': <Time timestamp={item.history.publishedAt!} />,
                'history.createdBy': (
                    <AdminHighlightSearchText
                        fields={['history.createdBy.profile.fullName']}
                        value={item.history.createdBy.profile.fullName || ''}
                    />
                ),
                // 'history.updatedAt': item.history.updatedAt ? (
                //     <Time type="long" timestamp={item.history.updatedAt} />
                // ) : null,
                actions: (
                    <RowActions
                        actions={[
                            {
                                name: 'View',
                                icon: AppIcon.view,
                                onClick: () => {
                                    onShow({
                                        title: item.basicInfo.title,
                                        body: <CourseOverview courseId={item._id} />,
                                        size: '6xl',
                                    })
                                },
                            },
                        ]}
                    />
                ),
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])
    return (
        <Stack>
            <AdminTable
                hasMultiChange={false}
                hasPagination={false}
                isLoading={isLoading}
                isError={isError}
                columns={columns}
                rows={rows}
            />
            <ActiveCoursesPagination />
        </Stack>
    )
}

// PROVIDERS AND DEFAULT VALUES
const ActiveCoursesPage: NextPageWithLayout = (query: any) => {
    return (
        <>
            <MyHead title={AppTitle.ADMIN_ACTIVE_COURSES} />
            <AdminUrlParamsProvider
                defaultValue={{
                    _sortBy: 'history.publishedAt',
                    _order: 'desc',
                    _limit: 10,
                    ...query,
                }}
            >
                <SearchProvider defaultField={'all'}>
                    <AppDialogProvider>
                        <PageContent />
                        <AppDialog />
                    </AppDialogProvider>
                </SearchProvider>
            </AdminUrlParamsProvider>
        </>
    )
}

ActiveCoursesPage.getLayout = AdminLayout
export default ActiveCoursesPage
