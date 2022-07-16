import { Button, useBreakpointValue } from '@chakra-ui/react'
import React, { useCallback } from 'react'
import { useAppDialog } from '../../../../../admin/providers/app-dialog.provider'
import ExportReportDialogContent from './ExportReportDialogContent'

function ExportRevenueReportButton() {
    const { onShow } = useAppDialog()
    const onExport = useCallback(() => {
        onShow({
            title: 'Export Revenue Report',
            body: <ExportReportDialogContent />,
        })
    }, [onShow])
    const size = useBreakpointValue({ base: 'sm', md: 'md' })
    return (
        <Button onClick={onExport} colorScheme={'blue'} size={size}>
            Export Report
        </Button>
    )
}
export default React.memo(ExportRevenueReportButton)
