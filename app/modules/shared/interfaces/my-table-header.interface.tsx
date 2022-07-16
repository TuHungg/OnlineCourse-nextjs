import { Button, Icon, Th, Thead, Tr } from '@chakra-ui/react'
import React, { ChangeEvent, useEffect } from 'react'
import { FaSort } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import {
    multiChangeAddMany,
    multiChangeDeleteAll,
    multiChangeResetData,
    multiChangeSyncData,
    selectIsAllItemsSelected,
} from '../../../store/admin/multi-change.slice'
import { useAppDispatch } from '../../../store/hooks'
import AppIcon from '../../../utils/constants/app-icon.constant'
import AdminTableCheckbox from '../../admin/components/AdminTable/AdminTableCheckbox'
import { ITableColumn } from './table-column.interface'
import IClientUrlParams from '../../admin/interfaces/client-url-params.interface'
import { usePageParams } from '../../admin/providers/page-params.provider'
import NextLink from '../components/NextLink'
import { useDeepCompareEffect } from '../hooks/app.hook'
import { useAdminTableRows } from '../hooks/data/admin-query.hook'
import { useSubtitleColor } from '../hooks/style.hook'
import { useUrlHelper } from '../hooks/url-helper.hook'
import IModel from './models/model.interface'

export interface MyTableHeaderProps {
    columns: ITableColumn[]
    checkbox?: boolean
    urlParams: IClientUrlParams
}
export const MyTableHeader = ({
    columns,
    checkbox = false,
    urlParams: clientUrlParams,
}: MyTableHeaderProps) => {
    const { getUrlWithQueryParams } = useUrlHelper()
    const subtitleColor = useSubtitleColor()
    const headerHtml = columns.map(({ header, isNumeric = false, sortable, accessor, minW: w }) => {
        let sortIcon = FaSort
        if (clientUrlParams._sortBy == accessor) {
            sortIcon = clientUrlParams._order == 'asc' ? AppIcon.sortUp : AppIcon.sortDown
        }
        const newOrder =
            clientUrlParams._sortBy == accessor
                ? clientUrlParams._order == 'asc'
                    ? 'desc'
                    : 'asc'
                : 'asc'
        let url = ''
        if (sortable) {
            url = getUrlWithQueryParams({
                _sortBy: accessor + '',
                _order: newOrder,
            })
        }
        return (
            <Th
                minW={w}
                textAlign={'left'}
                key={header}
                isNumeric={isNumeric}
                color={subtitleColor}
            >
                {sortable ? (
                    <NextLink href={url} scroll={false}>
                        <Button
                            size="xs"
                            fontWeight={'bold'}
                            onClick={() => {}}
                            variant="unstyled"
                            leftIcon={<Icon as={sortIcon} />}
                        >
                            {header.toUpperCase()}
                        </Button>
                    </NextLink>
                ) : (
                    header
                )}
            </Th>
        )
    })
    return (
        <Thead>
            <Tr>
                {checkbox && <SelectAllCol />}
                {headerHtml}
            </Tr>
        </Thead>
    )
}
function SelectAllCol() {
    const dispatch = useAppDispatch()
    const isSelected = useSelector(selectIsAllItemsSelected)
    const { ctrlName } = usePageParams()
    const { data } = useAdminTableRows<IModel>(ctrlName)
    useDeepCompareEffect(() => {
        if (data) {
            const ids = data.map((item) => item._id)
            dispatch(multiChangeSyncData({ ids, total: data.length }))
        } else {
            dispatch(multiChangeResetData())
        }
    }, [data, dispatch])

    useEffect(() => {
        return () => {
            dispatch(multiChangeResetData())
        }
    }, [dispatch])

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const checked: boolean = e.target.checked
        if (checked) {
            const ids = data?.map((item) => item._id)
            ids && dispatch(multiChangeAddMany(ids))
        } else {
            dispatch(multiChangeDeleteAll())
        }
    }
    return (
        <Th w={'fit-content'} px={2}>
            <AdminTableCheckbox isChecked={isSelected} onChange={onChange} />
        </Th>
    )
}
