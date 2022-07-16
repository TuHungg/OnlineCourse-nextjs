import { HStack, Select, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { ChangeEventHandler } from 'react'
import { useUrlHelper } from '../../hooks/url-helper.hook'
import { PaginationProps } from './Pagination'

export function RowsPerPage(props: PaginationProps) {
    const router = useRouter()
    const { _limit = props.pagination.itemsPerPage } = router.query
    const { getUrlWithQueryParams } = useUrlHelper()
    const onChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
        const url = getUrlWithQueryParams({
            _limit: e.target.value,
        })
        router.push(url, undefined, { scroll: false })
    }
    return (
        <HStack>
            <Text>Rows</Text>
            <Select onChange={onChange} value={_limit} w="fit-content">
                <option value={1}>1</option>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
            </Select>
        </HStack>
    )
}
