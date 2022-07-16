export interface IReportTableColumn {
    header: string
    dataKey: string
}
export interface IReportTableRow {
    [key: string]:
        | {
              content: string
              colSpan?: number
              rowSpan?: number
              styles?: any
          }
        | string
}
export interface IReportTableData {
    columnStyles?: {
        [key: number]: any
    }
    columns: IReportTableColumn[]
    rows: IReportTableRow[]
}

export class ReportGenerator {}
