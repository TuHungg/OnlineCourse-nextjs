import { ButtonGroup } from '@chakra-ui/react'
import React from 'react'
import { ExportExcelRevenueReport } from './ExportExcelRevenueReport'
import { ExportPdfRevenueReport } from './ExportPdfRevenueReport'

export default function ExportReportDialogContent() {
    return (
        <ButtonGroup justifyContent={'center'}>
            <ExportExcelRevenueReport />
            <ExportPdfRevenueReport />
        </ButtonGroup>
    )
}
