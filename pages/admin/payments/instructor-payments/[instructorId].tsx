import { Button, GridItem, HStack, SimpleGrid, Skeleton, Stack, Text } from '@chakra-ui/react'
import moment from 'moment'
import { ReactNode, useCallback, useMemo } from 'react'
import AdminLayout from '../../../../app/modules/admin/AdminLayout'
import PageTitle from '../../../../app/modules/admin/components/PageTitle'
import TdAvatar from '../../../../app/modules/admin/components/TdAvatar'
import PaymentDetail from '../../../../app/modules/admin/pages/payments/components/PaymentDetail'
import AppDialogProvider, {
    useAppDialog,
} from '../../../../app/modules/admin/providers/app-dialog.provider'
import { useSimpleDialog } from '../../../../app/modules/admin/providers/simple-dialog.provider'
import { useAdminInstructorWithPayment } from '../../../../app/modules/admin/queries/admin-instructor-query.hook'
import {
    useAcpCountInstructorPaymentsQuery,
    useAcpInstructorPaymentsQuery,
    useAcpInstructorPendingPaymentsQuery,
} from '../../../../app/modules/admin/queries/instructor-payments-query.hook'
import RevenueReportTable from '../../../../app/modules/instructor/pages/performance/RevenueReportPage/RevenueReportTable'
import {
    usePayAllPayment,
    usePayPayment,
} from '../../../../app/modules/instructor/queries/payments-query.hook'
import AppDialog from '../../../../app/modules/shared/components/AppDialog'
import Card from '../../../../app/modules/shared/components/Card'
import MyHead from '../../../../app/modules/shared/components/MyHead'
import Price from '../../../../app/modules/shared/components/Price'
import SimplePaginationButtons from '../../../../app/modules/shared/components/SimplePaginationButtons'
import { useAppToast } from '../../../../app/modules/shared/hooks/app-toast.hook'
import IPayment from '../../../../app/modules/shared/interfaces/models/payment.interface'
import {
    SimplePaginationProvider,
    useSimplePagination,
} from '../../../../app/modules/shared/providers/simple-pagination.provider'
import { NextPageWithLayout } from '../../../../app/types/next'
import NotifyHelper from '../../../../app/utils/helpers/notify.helper'

const ROWS_PER_PAGE = 5
const Table = () => {
    const toast = useAppToast()
    const { mutate: pay } = usePayPayment()
    const { onShow: onShowSimpleDialog } = useSimpleDialog()
    const { onShow: onShowAppDialog } = useAppDialog()
    const { isLoading: isPendingPaymentLoading, data: pendingPaymentData } =
        useAcpInstructorPendingPaymentsQuery()
    const {
        state: { page },
    } = useSimplePagination()
    const { isLoading: isPaymentsLoading, data: paymentsData } = useAcpInstructorPaymentsQuery(
        page,
        ROWS_PER_PAGE
    )
    const data = useMemo(() => {
        if (paymentsData && pendingPaymentData) {
            return pendingPaymentData.concat(paymentsData)
        }
        return paymentsData
    }, [paymentsData, pendingPaymentData])
    const onViewDetail = useCallback(
        (item: IPayment) => {
            onShowAppDialog({
                title: moment(item.history.createdAt).format('MMM, YYYY') + ' Revenue',
                body: <PaymentDetail paymentId={item._id} />,
                size: '6xl',
                contentSx: {
                    minH: '500px',
                },
            })
        },
        [onShowAppDialog]
    )
    const onPay = useCallback(
        (item: IPayment) => {
            onShowSimpleDialog({
                title: 'Pay Payment',
                content: 'Do you want to pay this payment?',
                colorScheme: 'blue',
                onPositive: () => {
                    pay(item._id, {
                        onSuccess: () => {
                            toast(NotifyHelper.success('Paid success'))
                        },
                    })
                },
            })
        },
        [onShowSimpleDialog, pay, toast]
    )

    return (
        <Stack>
            <RevenueReportTable
                showActions={pendingPaymentData && pendingPaymentData.length > 0}
                onViewDetail={onViewDetail}
                onPay={onPay}
                isLoading={isPaymentsLoading || isPendingPaymentLoading}
                data={data}
            />
            <SimplePaginationButtons />
        </Stack>
    )
}

const InfoColumn = ({ children }: { children: ReactNode }) => {
    return (
        <Stack justify={'center'} alignItems={{ base: 'center', md: 'stretch' }}>
            {children}
        </Stack>
    )
}

const InfoLine = (props: { label: string; content: ReactNode }) => {
    return (
        <HStack>
            <Text>{props.label}</Text>
            <Text as="strong">{props.content}</Text>
        </HStack>
    )
}

const InstructorInfo = () => {
    const { isLoading, data } = useAdminInstructorWithPayment()
    const { onShow } = useSimpleDialog()
    const { mutate: payAll } = usePayAllPayment()
    const toast = useAppToast()
    const onPayAll = useCallback(() => {
        onShow({
            title: 'Pay All',
            content: 'Do you want to pay all pending payments?',
            colorScheme: 'blue',
            onPositive: () => {
                payAll(data!._id, {
                    onSuccess: () => {
                        toast(NotifyHelper.success('Paid all success'))
                    },
                })
            },
        })
    }, [data, onShow, payAll, toast])
    return (
        <Skeleton isLoaded={!isLoading}>
            <SimpleGrid
                maxW={'800px'}
                columns={{
                    base: 1,
                    md: 3,
                }}
                spacingY={4}
            >
                <GridItem colSpan={1}>
                    <InfoColumn>
                        {data && (
                            <TdAvatar
                                alt={data.profile.fullName}
                                thumb={data.profile.avatar || undefined}
                                title={data.profile.fullName}
                                subtitle={data.email}
                                thumbSize="md"
                            />
                        )}
                    </InfoColumn>
                </GridItem>
                <GridItem colSpan={1}>
                    <InfoColumn>
                        <InfoLine label={'Phone'} content={data?.profile.phone} />
                        <InfoLine
                            label={'Pending amount'}
                            content={<Price value={data?.pendingAmount} />}
                        />
                    </InfoColumn>
                </GridItem>
                {data?.pendingAmount ? (
                    <GridItem colSpan={1}>
                        <InfoColumn>
                            <Button
                                onClick={onPayAll}
                                px={10}
                                size="sm"
                                w="fit-content"
                                colorScheme={'blue'}
                            >
                                Pay all
                            </Button>
                        </InfoColumn>
                    </GridItem>
                ) : null}
            </SimpleGrid>
        </Skeleton>
    )
}

const Title = () => {
    const { isLoading, data } = useAdminInstructorWithPayment()
    return (
        <>
            <MyHead title={data?.profile.fullName + ' | ' + 'Payment'} />
            <Skeleton isLoaded={!isLoading}>
                <PageTitle title={`${data?.profile.fullName} Payments`} mb={{ lg: 4 }} />
            </Skeleton>
        </>
    )
}

const Page: NextPageWithLayout = () => {
    const { data: totalItem } = useAcpCountInstructorPaymentsQuery()

    return (
        <AppDialogProvider>
            <Card>
                <Stack spacing={5}>
                    <Title />
                    <Stack spacing={10}>
                        <InstructorInfo />
                        <SimplePaginationProvider rowsPerPage={ROWS_PER_PAGE} totalItem={totalItem}>
                            <Table />
                        </SimplePaginationProvider>
                    </Stack>
                </Stack>
                <AppDialog />
            </Card>
        </AppDialogProvider>
    )
}

Page.getLayout = AdminLayout
export default Page
