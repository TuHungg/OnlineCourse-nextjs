import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import moment from 'moment'
import { IUser } from '../../modules/shared/interfaces/models/user.interface'
import AppImg from '../constants/app-img.constant'
import { IReportTableData, ReportGenerator } from './report-generator.service'
export class RevenueReportGenerator extends ReportGenerator {
    genReport(data: IReportTableData, user: IUser) {
        const doc = new jsPDF({})
        doc.setFont('times')
        const pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight()
        const pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth()
        autoTable(doc, {
            columnStyles: data.columnStyles,
            columns: data.columns,
            body: data.rows,
            startY: 35,
        })
        // logo
        const img = new Image()
        img.src = AppImg.APP_LOGO
        doc.addImage(img as any, 'png', 20, 5, 15, 15)
        doc.setFontSize(12)
        doc.setFont('times', 'bold')
        doc.text('Online Course', 14, 25, {})
        doc.setFont('times', 'normal')

        // title
        doc.setFontSize(18)
        doc.setFont('times', 'bold')
        doc.text(`${user.profile.fullName} Revenue Report`, pageWidth - 15, 15, { align: 'right' })
        doc.setFont('times', 'normal')

        //
        doc.setFontSize(10)
        doc.setFont('times', 'italic')
        doc.text(`Generated at ${moment(new Date()).format('DD/MM/YYYY')}`, pageWidth - 15, 20, {
            align: 'right',
        })
        // save
        doc.save(`revenue-report.pdf`)
    }
}
