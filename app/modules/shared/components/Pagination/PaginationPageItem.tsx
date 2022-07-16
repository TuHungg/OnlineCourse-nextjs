import { Button } from '@chakra-ui/react'
import React from 'react'
import { useUrlHelper } from '../../hooks/url-helper.hook'
import NextLink from '../NextLink'
import { PaginationProps } from './Pagination'

const PaginationPageItem = ({
    page,
    colorScheme,
    pagination,
    scroll,
}: PaginationProps & { page: number }) => {
    const { getUrlWithQueryParams } = useUrlHelper()
    const isDisabled = page > pagination.totalPage!
    const isActive = pagination.currentPage == page
    const color = isDisabled ? 'gray' : isActive ? colorScheme : colorScheme
    const url = getUrlWithQueryParams({ _page: page + '' })
    return (
        <NextLink href={url} passHref enabled={!isActive} scroll={scroll}>
            <Button
                isActive={isActive}
                isDisabled={isDisabled}
                colorScheme={isActive ? color : 'gray'}
                variant="solid"
                borderRadius={100}
            >
                {page}
            </Button>
        </NextLink>
    )
}

export default React.memo(PaginationPageItem)
