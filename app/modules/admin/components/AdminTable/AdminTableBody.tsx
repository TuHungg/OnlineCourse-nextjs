import { Tbody, Td, Tr } from '@chakra-ui/react'
import React, { ChangeEvent } from 'react'
import { useSelector } from 'react-redux'
import {
    multiChangeAddOne,
    multiChangeDeleteOne,
    selectIsItemSelected,
} from '../../../../store/admin/multi-change.slice'
import { useAppDispatch } from '../../../../store/hooks'
import EmptyMessageTr from '../../../shared/components/EmptyMessageTr'
import ErrorMessageTr from '../../../shared/components/ErrorMessageTr'
import IModel from '../../../shared/interfaces/models/model.interface'
import AdminHighlightSearchText from '../AdminHighlightSearchText'
import { AdminTableProps } from './AdminTable'
import { ITableRow } from '../../../shared/interfaces/table-row.interface'
import AdminTableCheckbox from './AdminTableCheckbox'
import { ITableColumn } from '../../../shared/interfaces/table-column.interface'

const AdminTableBody = ({ isLoading, isError, rows = [], columns, ...props }: AdminTableProps) => {
    const bodyHtml =
        rows?.length > 0 ? (
            // HAS DATA
            rows.map((row, i) => {
                const colsHtml = columns.map((col) => {
                    return <ColValue key={col.accessor} col={col} row={row} />
                })
                return (
                    <Tr key={i}>
                        {props.hasMultiChange && <SelectCol {...row} />}
                        {colsHtml}
                    </Tr>
                )
            })
        ) : (
            <EmptyMessageTr />
        )

    return <Tbody overflowX={'auto'}>{isError ? <ErrorMessageTr /> : bodyHtml}</Tbody>
}

function SelectCol({ _id }: IModel) {
    const isSelected = useSelector(selectIsItemSelected(_id))
    const dispatch = useAppDispatch()
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked
        if (checked) {
            dispatch(multiChangeAddOne(_id))
        } else {
            dispatch(multiChangeDeleteOne(_id))
        }
    }
    return (
        <Td w={'fit-content'} px={2}>
            <AdminTableCheckbox onChange={onChange} isChecked={isSelected} />
        </Td>
    )
}

export function ColValue({ col, row }: { col: ITableColumn; row: ITableRow }): JSX.Element {
    return (
        <Td key={col.accessor} isNumeric={col.isNumeric} sx={col.sx}>
            {col.searchable && typeof row[col.accessor + ''] == 'string' ? (
                <AdminHighlightSearchText
                    fields={[col.accessor + '']}
                    value={row[col.accessor + ''] + ''}
                />
            ) : (
                row[col.accessor + '']
            )}
        </Td>
    )
}

export default AdminTableBody
