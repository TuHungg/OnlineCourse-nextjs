import { StyleProps } from '@chakra-ui/react'

export interface ITableColumn {
    header: string
    accessor: string | number
    isNumeric?: boolean
    sortable?: boolean
    searchable?: boolean
    minW?: any
    sx?: StyleProps
}
