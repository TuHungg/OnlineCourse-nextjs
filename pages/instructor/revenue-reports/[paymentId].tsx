import { Button, Icon, Skeleton } from '@chakra-ui/react'
import moment from 'moment'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import PaymentDetail from '../../../app/modules/admin/pages/payments/components/PaymentDetail'
import InstructorPage from '../../../app/modules/instructor/components/InstructorPage'
import InstructorLayout from '../../../app/modules/instructor/InstructorLayout'
import { useInstructorPayment } from '../../../app/modules/instructor/queries/instructor-payments-query.hook'
import { useCountPaymentTransactionsQuery } from '../../../app/modules/instructor/queries/payment-transactions-query.hook'
import MyHead from '../../../app/modules/shared/components/MyHead'
import NextLink from '../../../app/modules/shared/components/NextLink'
import { SimplePaginationProvider } from '../../../app/modules/shared/providers/simple-pagination.provider'
import { NextPageWithLayout } from '../../../app/types/next'
import AppIcon from '../../../app/utils/constants/app-icon.constant'
import PathHelper from '../../../app/utils/helpers/path.helper'

export const TRANSACTION_ROWS_PER_PAGE = 5
const Main = () => {
    const router = useRouter()
    const { paymentId } = router.query

    const { isLoading: isPaymentLoading, data: paymentData } = useInstructorPayment(
        paymentId as string
    )
    const action = useMemo(() => {
        return (
            <NextLink href={PathHelper.getInstructorRevenueReportPath()}>
                <Button leftIcon={<Icon as={AppIcon.back} />} colorScheme="gray">
                    Back
                </Button>
            </NextLink>
        )
    }, [])
    const title = paymentData
        ? moment(paymentData.history.createdAt).format('MMM, YYYY') + ' Revenue'
        : ''
    return (
        <>
            <MyHead title={title} />
            <Skeleton isLoaded={!isPaymentLoading}>
                <InstructorPage title={title} actionLeft={action}>
                    <PaymentDetail paymentId={paymentId as string} />
                </InstructorPage>
            </Skeleton>
        </>
    )
}

const Page: NextPageWithLayout = () => {
    const router = useRouter()
    const { paymentId } = router.query
    const { data: totalItem } = useCountPaymentTransactionsQuery(paymentId as string)
    return (
        <SimplePaginationProvider totalItem={totalItem} rowsPerPage={TRANSACTION_ROWS_PER_PAGE}>
            <Main />
        </SimplePaginationProvider>
    )
}

Page.getLayout = InstructorLayout
export default Page
