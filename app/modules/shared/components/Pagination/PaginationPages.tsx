import { ButtonGroup, HStack, Icon, IconButton } from '@chakra-ui/react'
import React from 'react'
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'
import { useUrlHelper } from '../../hooks/url-helper.hook'
import NextLink from '../NextLink'
import { MorePage } from './MorePage'
import { PaginationProps } from './Pagination'
import PaginationPageItem from './PaginationPageItem'

const genStartPage = (pageRange: number, page: number, totalPage: number) => {
    let startAt: number
    let temp: number = Math.ceil(pageRange / 2) // 1

    if (page <= temp) startAt = 1
    else if (page > totalPage - (temp - 1)) {
        startAt = totalPage - temp
    } else startAt = page - temp + 1
    return startAt
}

const genTotalPage = (totalItems: number, itemsPerPage: number) => {
    return Math.ceil(totalItems / itemsPerPage)
}

// PAGES
export const PaginationPages = (props: PaginationProps) => {
    const totalPage = genTotalPage(props.pagination.totalItems!, props.pagination.itemsPerPage)
    const start = genStartPage(props.pagination.pageRange, props.pagination.currentPage!, totalPage)
    const downProps: PaginationProps = {
        ...props,
        pagination: {
            ...props.pagination,
            totalPage,
            start,
        },
    }
    const { getUrlWithQueryParams } = useUrlHelper()
    const pagesHtml = [...Array(props.pagination.pageRange)].map((_, index) => {
        const page = index + start
        return <PaginationPageItem key={index} page={page} {...downProps} />
    })
    let startColor, startDisable, endColor, endDisabled, startUrl, endUrl
    startUrl = getUrlWithQueryParams({ _page: 1 + '' })
    endUrl = getUrlWithQueryParams({ _page: totalPage + '' })
    startColor = endColor = 'gray'
    startDisable = endDisabled = false
    if (props.pagination.currentPage == 1) {
        startColor = 'gray'
        startDisable = true
    }
    if (props.pagination.currentPage! >= totalPage) {
        endColor = 'gray'
        endDisabled = true
    }
    return (
        <HStack
            justifyContent={{
                base: undefined,
                lg: 'flex-end',
            }}
        >
            <ButtonGroup variant="outline" spacing={2} size="sm">
                <NextLink href={startUrl} passHref enabled={!startDisable} scroll={props.scroll}>
                    <IconButton
                        aria-label="start"
                        icon={<Icon as={FiChevronsLeft} />}
                        colorScheme={startColor}
                        disabled={startDisable}
                        isRound
                        variant="solid"
                    />
                </NextLink>
                {pagesHtml}
                <MorePage {...downProps} />
                <NextLink href={endUrl} passHref enabled={!endDisabled} scroll={props.scroll}>
                    <IconButton
                        aria-label="end"
                        icon={<Icon as={FiChevronsRight} />}
                        colorScheme={endColor}
                        disabled={endDisabled}
                        isRound
                        variant="solid"
                    />
                </NextLink>
            </ButtonGroup>
        </HStack>
    )
}
