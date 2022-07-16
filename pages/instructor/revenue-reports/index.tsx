import { Stack } from '@chakra-ui/react'
import React from 'react'
import AppDialogProvider from '../../../app/modules/admin/providers/app-dialog.provider'
import InstructorPage from '../../../app/modules/instructor/components/InstructorPage'
import InstructorLayout from '../../../app/modules/instructor/InstructorLayout'
import ExportRevenueReportButton from '../../../app/modules/instructor/pages/performance/RevenueReportPage/ExportReport/ExportRevenueReportButton'
import RevenueReportTable from '../../../app/modules/instructor/pages/performance/RevenueReportPage/RevenueReportTable'
import { useInstructorAllPaymentsQuery } from '../../../app/modules/instructor/queries/instructor-all-payments-query.hook'
import { useCountInstructorPaymentsQuery } from '../../../app/modules/instructor/queries/instructor-payments-query.hook'
import AppDialog from '../../../app/modules/shared/components/AppDialog'
import MyHead from '../../../app/modules/shared/components/MyHead'
import SimplePaginationButtons from '../../../app/modules/shared/components/SimplePaginationButtons'
import {
    SimplePaginationProvider,
    useSimplePagination,
} from '../../../app/modules/shared/providers/simple-pagination.provider'
import { NextPageWithLayout } from '../../../app/types/next'
import AppTitle from '../../../app/utils/constants/app-title.constant'

export const ROWS_PER_PAGE = 5
const RevenueReportContent = () => {
    const {
        state: { page },
    } = useSimplePagination()
    const { isLoading, data } = useInstructorAllPaymentsQuery({ page, rowsPerPage: ROWS_PER_PAGE })
    return (
        <Stack>
            <RevenueReportTable isLoading={isLoading} data={data} />
            <SimplePaginationButtons />
        </Stack>
    )
}

const RevenueReport = () => {
    const { data: totalItem } = useCountInstructorPaymentsQuery()
    return (
        <SimplePaginationProvider totalItem={totalItem} rowsPerPage={ROWS_PER_PAGE}>
            <RevenueReportContent />
        </SimplePaginationProvider>
    )
}

const Page: NextPageWithLayout = () => {
    return (
        <>
            <MyHead title={AppTitle.INSTRUCTOR_REVENUE_REPORTS} />
            <AppDialogProvider>
                <InstructorPage title="Revenue Reports" actionRight={<ExportRevenueReportButton />}>
                    <RevenueReport />
                </InstructorPage>
                <AppDialog />
            </AppDialogProvider>
        </>
    )
}

Page.getLayout = InstructorLayout
export default Page
