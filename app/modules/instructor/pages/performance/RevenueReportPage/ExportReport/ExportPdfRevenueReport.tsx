import { Button, Icon } from '@chakra-ui/react'
import lodash from 'lodash'
import moment from 'moment'
import React, { useCallback, useEffect, useState } from 'react'
import AppIcon from '../../../../../../utils/constants/app-icon.constant'
import DateHelper from '../../../../../../utils/helpers/date.helper'
import CourseHelper from '../../../../../../utils/helpers/model-helpers/course.helper'
import {
    IReportTableColumn,
    IReportTableRow,
} from '../../../../../../utils/services/report-generator.service'
import { RevenueReportGenerator } from '../../../../../../utils/services/revenue-report-generator.service'
import { useAppDialog } from '../../../../../admin/providers/app-dialog.provider'
import { useAuth } from '../../../../../auth/providers/auth.provider'
import { useInstructorAllPaymentsQuery } from '../../../../queries/instructor-all-payments-query.hook'

const columns: IReportTableColumn[] = [
    {
        header: 'Time Period',
        dataKey: 'timePeriod',
    },
    {
        header: 'Status',
        dataKey: 'status',
    },
    {
        header: 'Sale Price',
        dataKey: 'salePrice',
    },
    {
        header: 'Commission Price',
        dataKey: 'commissionPrice',
    },
    {
        header: 'Earnings',
        dataKey: 'earnings',
    },
    {
        header: 'Expected Paid At',
        dataKey: 'expectedPaidAt',
    },
]
export const ExportPdfRevenueReport = () => {
    const { onClose } = useAppDialog()
    const [enabled, setEnabled] = useState(false)
    const {
        state: { user },
    } = useAuth()
    const { isLoading, data } = useInstructorAllPaymentsQuery(
        {
            page: 1,
            rowsPerPage: 1000,
        },
        {
            staleTime: Infinity,
            enabled,
        }
    )

    useEffect(() => {
        if (enabled && !isLoading && !!data) {
            const rp = new RevenueReportGenerator()
            const rows: IReportTableRow[] = data.map((item) => {
                const expectedPaidDate = item.history.paidAt
                    ? new Date(item.history.paidAt)
                    : DateHelper.getExpectedPaidDate(new Date(item.history.createdAt))
                return {
                    timePeriod: moment(item.history.createdAt).format('MMM, YYYY'),
                    status: lodash.upperFirst(item.status),
                    salePrice: {
                        content: CourseHelper.formatPrice(item.amount),
                        styles: {
                            fontStyle: 'bold',
                            halign: 'right',
                        },
                    },
                    commissionPrice: {
                        content: CourseHelper.formatPrice(item.commissionAmount),
                        styles: {
                            fontStyle: 'bold',
                            halign: 'right',
                        },
                    },
                    earnings: {
                        content: CourseHelper.formatPrice(item.earnings),
                        styles: {
                            fontStyle: 'bold',
                            halign: 'right',
                        },
                    },
                    expectedPaidAt: {
                        content: moment(expectedPaidDate).format('MMM DD, YYYY'),
                        styles: {
                            halign: 'right',
                        },
                    },
                }
            })
            rp.genReport({ columns, rows }, user!)
            //
            onClose()
            setEnabled(false)
        }
    }, [enabled, data, user, onClose, isLoading])

    const onExport = useCallback(() => {
        setEnabled(true)
    }, [])
    return (
        <Button leftIcon={<Icon as={AppIcon.pdf} />} onClick={onExport} colorScheme={'red'}>
            Pdf
        </Button>
    )
}
