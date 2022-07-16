import { Button, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { useUrlHelper } from '../../hooks/url-helper.hook'
import NextLink from '../NextLink'
import { PaginationProps } from './Pagination'

export const MorePage = (props: PaginationProps) => {
    const { getUrlWithQueryParams } = useUrlHelper()
    const temp = Math.ceil(props.pagination.pageRange / 2)
    if (
        props.pagination.currentPage! > props.pagination.totalPage! - temp ||
        props.pagination.totalPage! <= props.pagination.pageRange
    )
        return <></>
    let moreIcon = (
        <Text as="span" fontSize="lg">
            ...
        </Text>
    )

    const url = getUrlWithQueryParams({ _page: props.pagination.totalPage + '' })
    return (
        <HStack>
            {props.pagination.currentPage! < props.pagination.totalPage! - temp ? moreIcon : null}
            <NextLink href={url} passHref scroll={false}>
                <Button colorScheme={'gray'} variant="solid" borderRadius={100}>
                    {props.pagination.totalPage}
                </Button>
            </NextLink>
        </HStack>
    )
}
