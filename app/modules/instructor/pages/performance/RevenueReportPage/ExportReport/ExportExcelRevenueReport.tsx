import { Button, Icon } from '@chakra-ui/react'
import { ExportToCsv, Options } from 'export-to-csv'
import lodash from 'lodash'
import React, { useCallback, useEffect, useState } from 'react'
import AppIcon from '../../../../../../utils/constants/app-icon.constant'
import DateHelper from '../../../../../../utils/helpers/date.helper'
import { useAppDialog } from '../../../../../admin/providers/app-dialog.provider'
import { useAuth } from '../../../../../auth/providers/auth.provider'
import { useInstructorAllPaymentsQuery } from '../../../../queries/instructor-all-payments-query.hook'

const options: Options = {
    filename: 'revenue-report',
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'Revenue Report',
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
}

export const ExportExcelRevenueReport = () => {
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
            //
            const rows = data.map((item) => {
                const expectedPaidDate = item.history.paidAt
                    ? new Date(item.history.paidAt)
                    : DateHelper.getExpectedPaidDate(new Date(item.history.createdAt))
                return {
                    'Time Period': new Date(item.history.createdAt).toLocaleDateString(),
                    Status: lodash.upperFirst(item.status),
                    'Sale Price': item.amount,
                    'Commission Price': item.commissionAmount,
                    Earnings: item.earnings,
                    'Expected Paid At': expectedPaidDate.toLocaleDateString(),
                }
            })
            const csvExporter = new ExportToCsv(options)
            csvExporter.generateCsv(rows)
            //
            onClose()
            setEnabled(false)
        }
    }, [data, enabled, isLoading, onClose])
    const onExport = useCallback(() => {
        setEnabled(true)
    }, [])
    return (
        <Button leftIcon={<Icon as={AppIcon.excel} />} onClick={onExport} colorScheme={'green'}>
            Excel
        </Button>
    )
}
